import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
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
class UserModal extends PureComponent {
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
    const {
      item = {},
      onOk,
      form,
      i18n,
      userId,
      ...resetPasswordModalProps
    } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal {...resetPasswordModalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <div>
            {getFieldDecorator('userId', {
              initialValue: userId,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input hidden={true} />)}
          </div>
          <FormItem label="新密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input.Password />)}
          </FormItem>
          <FormItem label="确认密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('againPassword', {
              initialValue: item.againPassword,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input.Password />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
