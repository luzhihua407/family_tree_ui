import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,TreeSelect } from 'antd'
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
class RoleMenuModal extends PureComponent {
  state = {
    value: undefined,
  }
  onRegionChange=(value, selectedOptions)=>{
    const {form } = this.props
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
      data.roleId=item.roleId
      onOk(data)
    })
  }
  onEditItem(item) {
    dispatch({
      type: 'user/hideModal',
    })

  }
  onSelect = (value, node, extra) => {
  }
  render() {
    const { item = {}, onOk, form, i18n, treeData,...modalProps } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
        <Input type="hidden" id="roleId" value={item.roleId}/>
        <FormItem label='角色名称' hasFeedback {...formItemLayout}>
            {getFieldDecorator('roleName', {
              initialValue: item.roleName,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />
            )}
          </FormItem>
          <FormItem label='菜单' hasFeedback {...formItemLayout}>
            {getFieldDecorator('menuIds', {
              initialValue: item.menuIds,
              rules: [
                {
                  required: true,
                },
              ],
            })(<TreeSelect
              style={{ width: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择"
              treeData={treeData}
              treeCheckable={true}
              onSelect={this.onSelect}
              treeDefaultExpandAll  
            />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

RoleMenuModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default RoleMenuModal
