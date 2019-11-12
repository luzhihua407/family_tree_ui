import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CKEditor from 'ckeditor4-react'
import { Form, Input, Radio, Modal, Select } from 'antd'
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
class CategoryModal extends PureComponent {
  constructor(props) {
    super(props)
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
      for (var i in CKEDITOR.instances) {
        /* this retrieve the data of each instances and store it into an associative array with
            the names of the textareas as keys... */
        data.content = CKEDITOR.instances[i].getData()
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
      categoryListData,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="类别" {...formItemLayout}>
            {getFieldDecorator('categoryId', {
              initialValue: item.categoryId,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select
                labelInValue={false}
                placeholder="请选择"
                style={{ width: 160 }}
                allowClear={true}
              >
                {categoryListData.map(d => (
                  <Select.Option key={d.id}>{d.name}</Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="启用" {...formItemLayout}>
            {getFieldDecorator('valid', {
              initialValue: item.valid == null ? '是' : item.valid,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Radio.Group>
                <Radio value={'是'}>是</Radio>
                <Radio value={'否'}>否</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="标题" {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: item.title,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="子标题" {...formItemLayout}>
            {getFieldDecorator('subTitle', {
              initialValue: item.subTitle,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="内容" {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: item.content,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <CKEditor
                id="content"
                data={modalProps.editorContent}
                type="classic"
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

CategoryModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default CategoryModal
