import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  InputNumber,
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
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
  },
]
@withI18n()
@Form.create()
class RoleMenuModal extends PureComponent {
  state = {
    value: undefined,
  }
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
  onEditItem(item) {
    dispatch({
      type: 'user/hideModal',
    })
  }
  onChange = value => {
    console.log(value)
    this.setState({ value })
  }
  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="角色名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <TreeSelect
                style={{ width: 300 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={this.onChange}
              />
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
            })(<Input.TextArea />)}
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
