import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Radio, Select, TreeSelect, Row, Col } from 'antd'

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
      optPermissionListData,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="菜单编码" {...formItemLayout}>
            {getFieldDecorator('code', {
              initialValue: item.code,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="菜单名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="图标" {...formItemLayout}>
            {getFieldDecorator('icon', {
              initialValue: item.icon,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="类型" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: item.type == null ? '菜单' : item.type,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Radio.Group>
                <Radio value={'目录'}>目录</Radio>
                <Radio value={'可见菜单'}>可见菜单</Radio>
                <Radio value={'不可见菜单'}>不可见菜单</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="路径" {...formItemLayout}>
            {getFieldDecorator('url', {
              initialValue: item.url,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="上级菜单" {...formItemLayout}>
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
                allowClear={true}
              >
                {parentMenusData.map(d => (
                  <Select.Option key={d.id}>{d.name}</Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="启用" {...formItemLayout}>
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
          <FormItem label="备注" {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  required: false,
                },
              ],
            })(<TextArea rows={3} />)}
          </FormItem>
          <FormItem label="操作权限" {...formItemLayout}>
            {getFieldDecorator('menuRights', {
              initialValue: item.menuRights,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select
                labelInValue={true}
                placeholder="请选择"
                style={{ width: '100%' }}
                allowClear={true}
                mode={'multiple'}
              >
                {optPermissionListData.map(d => (
                  <Select.Option key={d.code}>{d.name}</Select.Option>
                ))}
              </Select>
            )}
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
