import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
import { Trans, withI18n } from '@lingui/react'

const FormItem = Form.Item
const TextArea = Input.TextArea
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
class MenuModal extends PureComponent {
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
      parentMenusData,
      getParentMenus,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="菜单编码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('code', {
              initialValue: item.code,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="菜单名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="图标" hasFeedback {...formItemLayout}>
            {getFieldDecorator('icon', {
              initialValue: item.icon,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="类型" hasFeedback {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: item.type == null ? 1 : item.type,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Radio.Group>
                <Radio value={0}>目录</Radio>
                <Radio value={1}>菜单</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="路径" hasFeedback {...formItemLayout}>
            {getFieldDecorator('url', {
              initialValue: item.url,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="目录" hasFeedback {...formItemLayout}>
            {getFieldDecorator('parent', {
              initialValue: item.parent,
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
              >
                {parentMenusData.map(d => (
                  <Option key={d.id}>{d.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="启用" hasFeedback {...formItemLayout}>
            {getFieldDecorator('valid', {
              initialValue: item.valid == null ? true : item.valid,
              rules: [
                {
                  required: false,
                  type: 'boolean',
                },
              ],
            })(
              <Radio.Group>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
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
            })(<TextArea rows={3} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

MenuModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default MenuModal
