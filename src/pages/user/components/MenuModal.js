import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Tree, Modal } from 'antd'

const FormItem = Form.Item
const { TreeNode } = Tree

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
      console.log(data)
      onOk(data)
    })
  }
  state = {
    menuIds: [],
  }

  onCheck = (checkedKeys, e) => {
    console.log('onCheck', checkedKeys)
    console.log('onCheck', e)
    let checkedNodes = e.checkedNodes
    let menuIds = []
    for (let i = 0; i < checkedNodes.length; i++) {
      const checkedNode = checkedNodes[i]

      let value = checkedNode.props.dataRef.value
      menuIds[i] = value
    }
    this.setState({ menuIds: menuIds })
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} {...item} />
    })
  render() {
    const {
      item = {},
      onOk,
      form,
      i18n,
      userId,
      treeData,
      ...menuModalProps
    } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal {...menuModalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator('userId', {
            initialValue: userId,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input hidden={false} />)}
          <FormItem label="系统菜单" hasFeedback {...formItemLayout}>
            {getFieldDecorator('menuIds', {
              initialValue: this.state.menuIds,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Tree
                checkable
                defaultExpandAll={true}
                autoExpandParent={true}
                onCheck={this.onCheck}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>
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
