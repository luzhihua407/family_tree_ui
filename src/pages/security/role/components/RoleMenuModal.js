import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Transfer,
  Tree,
  Radio,
  Modal,
  Cascader,
  TreeSelect,
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
@withI18n()
@Form.create()
class RoleMenuModal extends PureComponent {
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
      data.roleId = item.roleId
      data.menuIds = this.state.menuIds
      onOk(data)
    })
  }
  onEditItem(item) {
    dispatch({
      type: 'user/hideModal',
    })
  }
  onCheck = (value, node, extra) => {
    this.state = { menuIds: value }
  }
  render() {
    const { item = {}, onOk, form, i18n, treeData, ...modalProps } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="角色名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator('roleName', {
              initialValue: item.roleName,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="菜单" hasFeedback {...formItemLayout}>
            <Tree
              treeData={treeData}
              defaultCheckedKeys={item.menuIds}
              checkable={true}
              onCheck={this.onCheck}
              autoExpandParent={true}
            />
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
