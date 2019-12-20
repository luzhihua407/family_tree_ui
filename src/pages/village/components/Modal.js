import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  Cascader,
  Select,
  Button,
  Upload,
  Icon,
  message,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
const FormItem = Form.Item

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
  console.log(file)
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
class VillageModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  render() {
    const fileList = []
    const props = {
      action: 'http://localhost:7000/api/v1/file_upload/upload',
      listType: 'picture',
      defaultFileList: [...fileList],
    }
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="乡村编码" {...formItemLayout}>
            {getFieldDecorator('code', {
              initialValue: item.code,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="乡村名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="地址" {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: item.address,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="经度" {...formItemLayout}>
            {getFieldDecorator('longitude', {
              initialValue: item.longitude,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="纬度" {...formItemLayout}>
            {getFieldDecorator('latitude', {
              initialValue: item.latitude,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="图片" {...formItemLayout}>
            {getFieldDecorator('file', {
              initialValue: item.file,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem label="备注" {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input.TextArea rows={6} />)}
          </FormItem>
          <FormItem label="启用" {...formItemLayout}>
            {getFieldDecorator('valid', {
              initialValue: item.valid == null ? '是' : item.valid,
              rules: [
                {
                  required: false,
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

VillageModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default VillageModal
