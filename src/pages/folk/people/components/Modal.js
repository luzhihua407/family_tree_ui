import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  DatePicker,
  Select,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import locale from 'antd/es/date-picker/locale/zh_CN'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class PeopleModal extends PureComponent {
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
    const { item = {}, onOk, form, i18n, rolesData, ...modalProps } = this.props
    const { getFieldDecorator } = form

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
          <FormItem label="年龄" hasFeedback {...formItemLayout}>
            {getFieldDecorator('age', {
              initialValue: item.age,
              rules: [
                {
                  required: true,
                  type: 'number',
                },
              ],
            })(<InputNumber min={1} max={150} />)}
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
                  type: 'number',
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
                  type: 'number',
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
              initialValue: item.education == null ? '是' : item.education,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="出生年月" hasFeedback {...formItemLayout}>
            {getFieldDecorator('birth', {
              initialValue: item.birth,
              rules: [
                {
                  required: true,
                },
              ],
            })(<DatePicker format={'YYYY-MM-DD'} locale={locale} />)}
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
              initialValue: item.death,
              rules: [
                {
                  required: false,
                },
              ],
            })(<DatePicker format={'YYYY-MM-DD'} locale={locale} />)}
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
