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
class DictModal extends PureComponent {
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
      parentDictData,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="上级目录" hasFeedback {...formItemLayout}>
            {getFieldDecorator('parentId', {
              initialValue: item.parentId,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select
                labelInValue={false}
                placeholder="请选择"
                style={{ width: '100%' }}
                allowClear={true}
              >
                {parentDictData.map(d => (
                  <Select.Option key={d.id}>{d.name}</Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="编码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('code', {
              initialValue: item.code,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="数值" hasFeedback {...formItemLayout}>
            {getFieldDecorator('numValue', {
              initialValue: item.numValue,
              rules: [
                {
                  required: false,
                  type: 'number',
                },
              ],
            })(<InputNumber />)}
          </FormItem>
          <FormItem label="字符值" hasFeedback {...formItemLayout}>
            {getFieldDecorator('value', {
              initialValue: item.value,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="dis" hasFeedback {...formItemLayout}>
            {getFieldDecorator('dis', {
              initialValue: item.dis,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
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

DictModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default DictModal
