import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Radio, Select, Card, Row, Col } from 'antd'
import EditableTable from './MenuRightList'

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
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <Row gutter={16}>
            <Col span={10}>
              <Card title="菜单详情" bordered={false}>
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
                    initialValue: item.type == null ? '菜单' : item.type,
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(
                    <Radio.Group>
                      <Radio value={'目录'}>目录</Radio>
                      <Radio value={'菜单'}>菜单</Radio>
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
                      allowClear={true}
                    >
                      {parentMenusData.map(d => (
                        <Select.Option key={d.id}>{d.name}</Select.Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem label="启用" hasFeedback {...formItemLayout}>
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
              </Card>
            </Col>
            <Col span={10}>
              <Card title="资源权限" bordered={false}>
                <EditableTable form={form} />
                />
              </Card>
            </Col>
          </Row>
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
