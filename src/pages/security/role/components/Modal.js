import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
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
@withI18n()
@Form.create()
class RoleModal extends PureComponent {
  onRegionChange = (value, selectedOptions) => {
    const { form } = this.props
    let [province, city, district] = selectedOptions
    form.setFieldsValue({ province: province.id })
    form.setFieldsValue({ city: city.id })
    form.setFieldsValue({ district: district.id })
  }
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
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="角色编码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('code', {
              initialValue: item.code,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="角色名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="超级管理员" hasFeedback {...formItemLayout}>
            {getFieldDecorator('admin', {
              initialValue: item.admin == null ? '否' : item.admin,
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
          <FormItem label="启用" hasFeedback {...formItemLayout}>
            {getFieldDecorator('valid', {
              initialValue: item.valid == null ? '否' : item.valid,
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
          <FormItem label="备注" hasFeedback {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input.TextArea />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

RoleModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default RoleModal
