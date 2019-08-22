import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'components'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  Cascader,
  Select,
  Card,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

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
    this.state = {
      editorContent: null,
    }
  }
  onEditorStateChange = editorContent => {
    this.setState({
      editorContent,
    })
  }
  uploadImageCallBack = info => {
    return new Promise(function(resolve, reject) {
      let formData = new window.FormData()
      formData.append('file', info, info.name)
      Axios({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'post',
        data: formData,
        url: 'http://192.168.5.14:8081/node/file_upload',
      }).then(
        res => {
          if (res.data.code === 200) {
            let imgurl = res.data.result[0].photoBig
            let imgObj = {
              data: {
                link: 'http://192.168.5.14:8081/' + imgurl,
              },
            }
            resolve(imgObj)
          } else {
          }
        },
        err => {
          console.log('err', err)
        }
      )
    })
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
      // 转换成html，重新赋值保存到数据库
      let editorContent = draftToHtml(
        convertToRaw(this.state.editorContent.getCurrentContent())
      )
      data.content = editorContent
      onOk(data)
    })
  }

  render() {
    const { editorContent } = this.state
    const { item = {}, onOk, form, i18n, rolesData, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="类别" hasFeedback {...formItemLayout}>
            {getFieldDecorator('categoryId', {
              initialValue: item.categoryId,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="启用" hasFeedback {...formItemLayout}>
            {getFieldDecorator('valid', {
              initialValue: item.valid == null ? '否' : item.valid,
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
          <FormItem label="标题" hasFeedback {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: item.title,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="子标题" hasFeedback {...formItemLayout}>
            {getFieldDecorator('subTitle', {
              initialValue: item.subTitle,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="内容" hasFeedback {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: item.content,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Editor
                wrapperStyle={{
                  minHeight: 500,
                }}
                editorStyle={{
                  minHeight: 376,
                }}
                localization={{ locale: 'zh' }}
                toolbar={{
                  image: {
                    previewImage: true,
                    uploadEnabled: true,
                    urlEnabled: true,
                    uploadCallback: this.uploadImageCallBack,
                    alt: { present: true, mandatory: true },
                  },
                }}
                editorState={editorContent}
                onEditorStateChange={this.onEditorStateChange}
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
