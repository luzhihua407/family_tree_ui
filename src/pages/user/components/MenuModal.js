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
    const { item = {}, onOk, form, userId } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      data.userId = userId
      data.menuIds = this.state.checkedKeys
      onOk(data)
    })
  }
  state = {
    checkedKeys: [],
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ checkedKeys: nextProps.item.menuIds })
  }
  onCheck = (checkedKeys, e) => {
    this.setState({ checkedKeys })
    this.props.item.menuIds = checkedKeys
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
          <FormItem label="系统菜单" {...formItemLayout}>
            {
              <Tree
                checkable
                checkedKeys={this.state.checkedKeys}
                defaultExpandAll={true}
                autoExpandParent={true}
                onCheck={this.onCheck}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>
            }
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
