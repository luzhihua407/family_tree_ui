import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  DatePicker,
  Select,
  Upload,
  Icon,
  message,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import locale from 'antd/es/date-picker/locale/zh_CN'
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD'
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
@withI18n()
@Form.create()
class PeopleModal extends PureComponent {
  state = {
    loading: false,
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      )
    }
  }
  handleFields = fields => {
    const { birth, death } = fields
    if (birth != null) {
      fields.birth = moment(birth).format('YYYY-MM-DD')
    }
    if (death != null) {
      fields.death = moment(death).format('YYYY-MM-DD')
    }
    return fields
  }

  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form
    let fields = getFieldsValue()
    validateFields(errors => {
      if (errors) {
        return
      }
      fields = this.handleFields(fields)
      const data = {
        ...fields,
        key: item.key,
      }
      onOk(data)
    })
  }

  render() {
    const {
      item = {},
      onOk,
      form,
      i18n,
      educationListData,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { imageUrl } = this.state
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="全名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('fullName', {
              initialValue: item.fullName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="小名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('nickname', {
              initialValue: item.nickname,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="头像" hasFeedback {...formItemLayout}>
            {getFieldDecorator('avatar', {
              initialValue: item.avatar,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="people/fileUpload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          </FormItem>
          <FormItem label="性别" hasFeedback {...formItemLayout}>
            {getFieldDecorator('gender', {
              initialValue: item.gender,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Radio.Group>
                <Radio value={'男'}>男</Radio>
                <Radio value={'女'}>女</Radio>
                <Radio value={'不清楚'}>不清楚</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="手机" hasFeedback {...formItemLayout}>
            {getFieldDecorator('phoneNumber', {
              initialValue: item.phoneNumber,
              rules: [
                {
                  required: false,
                  pattern: /^1[34578]\d{9}$/,
                  message: '无效的手机号码',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="职务" hasFeedback {...formItemLayout}>
            {getFieldDecorator('job', {
              initialValue: item.job,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="身高(厘米)" hasFeedback {...formItemLayout}>
            {getFieldDecorator('height', {
              initialValue: item.height,
              rules: [
                {
                  required: false,
                },
              ],
            })(<InputNumber min={1} max={300} />)}
          </FormItem>
          <FormItem label="体重（公斤）" hasFeedback {...formItemLayout}>
            {getFieldDecorator('weight', {
              initialValue: item.weight,
              rules: [
                {
                  required: false,
                },
              ],
            })(<InputNumber min={1} max={300} />)}
          </FormItem>
          <FormItem label="是否结婚" hasFeedback {...formItemLayout}>
            {getFieldDecorator('isMarried', {
              initialValue: item.isMarried == null ? '是' : item.isMarried,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Radio.Group>
                <Radio value={'是'}>是</Radio>
                <Radio value={'否'}>否</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="是否有后代" hasFeedback {...formItemLayout}>
            {getFieldDecorator('hasChild', {
              initialValue: item.hasChild == null ? '是' : item.hasChild,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Radio.Group>
                <Radio value={'是'}>是</Radio>
                <Radio value={'否'}>否</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="学历" hasFeedback {...formItemLayout}>
            {getFieldDecorator('education', {
              initialValue: item.education,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                labelInValue={false}
                placeholder="请选择"
                style={{ width: 120 }}
                allowClear={true}
              >
                {educationListData.map(d => (
                  <Select.Option key={d.code}>{d.name}</Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="出生年月" hasFeedback {...formItemLayout}>
            {getFieldDecorator('birth', {
              initialValue:
                item.birth != null ? moment(item.birth, dateFormat) : null,
              rules: [
                {
                  required: true,
                },
              ],
            })(<DatePicker format={dateFormat} />)}
          </FormItem>
          <FormItem label="第几世" hasFeedback {...formItemLayout}>
            {getFieldDecorator('generations', {
              initialValue: item.generations,
              rules: [
                {
                  required: true,
                  type: 'number',
                },
              ],
            })(<InputNumber min={1} max={100} />)}
          </FormItem>
          <FormItem label="工作单位" hasFeedback {...formItemLayout}>
            {getFieldDecorator('company', {
              initialValue: item.company,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="卒于" hasFeedback {...formItemLayout}>
            {getFieldDecorator('death', {
              initialValue:
                item.death != null ? moment(item.death, dateFormat) : null,
              rules: [
                {
                  required: false,
                },
              ],
            })(<DatePicker format={dateFormat} />)}
          </FormItem>
          <FormItem label="简介" hasFeedback {...formItemLayout}>
            {getFieldDecorator('brief', {
              initialValue: item.brief,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input.TextArea rows={6} />)}
          </FormItem>
          <FormItem label="备注" hasFeedback {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input.TextArea rows={6} />)}
          </FormItem>
          <FormItem label="启用" hasFeedback {...formItemLayout}>
            {getFieldDecorator('valid', {
              initialValue: item.valid == null ? '是' : item.valid,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Radio.Group>
                <Radio value={'是'}>是</Radio>
                <Radio value={'否'}>否</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

PeopleModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default PeopleModal
