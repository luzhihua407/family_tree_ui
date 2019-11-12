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
class RegionModal extends PureComponent {
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
          <FormItem label="区号" {...formItemLayout}>
            {getFieldDecorator('areaCode', {
              initialValue: item.areaCode,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="编码" {...formItemLayout}>
            {getFieldDecorator('code', {
              initialValue: item.code,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="地区简称" {...formItemLayout}>
            {getFieldDecorator('shortName', {
              initialValue: item.shortName,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="地区全称" {...formItemLayout}>
            {getFieldDecorator('fullName', {
              initialValue: item.fullName,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="邮政编码" {...formItemLayout}>
            {getFieldDecorator('postCode', {
              initialValue: item.postCode,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
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

RegionModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default RegionModal
