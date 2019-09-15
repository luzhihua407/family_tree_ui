import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Select } from 'antd'
import request from 'utils/request'
const { Option } = Select
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

function fetch(value, callback) {
  const params = { name: value }
  const url = 'http://localhost:7000/api/v1/folk/people/getPeopleByName'
  request({ url, data: params }).then(result => {
    if (result.success) {
      const data = []
      result.data.forEach(r => {
        data.push({
          value: r.id,
          text: r.fullName,
        })
      })
      callback(data)
    }
  })
}
@Form.create()
class RelationshipModal extends PureComponent {
  state = {
    husbandData: [],
    wifeData: [],
    childrenData: [],
    value: undefined,
  }

  handleSearchHusband = value => {
    if (value) {
      fetch(value, husbandData => this.setState({ husbandData }))
    } else {
      this.setState({
        husbandData: [],
      })
    }
  }
  handleSearchWife = value => {
    if (value) {
      fetch(value, wifeData => this.setState({ wifeData }))
    } else {
      this.setState({
        wifeData: [],
      })
    }
  }
  handleSearchChildren = value => {
    if (value) {
      fetch(value, childrenData => this.setState({ childrenData }))
    } else {
      this.setState({
        childrenData: [],
      })
    }
  }

  handleChange = value => {
    this.setState({ value })
  }
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form
    let fields = getFieldsValue()
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...fields,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const husbandOptions = this.state.husbandData.map(d => (
      <Option key={d.value}>{d.text}</Option>
    ))
    const wifeOptions = this.state.wifeData.map(d => (
      <Option key={d.value}>{d.text}</Option>
    ))
    const childrenOptions = this.state.childrenData.map(d => (
      <Option key={d.value}>{d.text}</Option>
    ))
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label="丈夫" hasFeedback {...formItemLayout}>
            {getFieldDecorator('husbandId', {
              initialValue: item.husbandId,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                showSearch
                placeholder="输入名字搜索"
                style={this.props.style}
                defaultActiveFirstOption={true}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearchHusband}
                onChange={this.handleChange}
                notFoundContent={null}
              >
                {husbandOptions}
              </Select>
            )}
          </FormItem>
          <FormItem label="妻子" hasFeedback {...formItemLayout}>
            {getFieldDecorator('wifeId', {
              initialValue: item.wifeId,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select
                showSearch
                placeholder="输入名字搜索"
                style={this.props.style}
                defaultActiveFirstOption={true}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearchWife}
                onChange={this.handleChange}
                notFoundContent={null}
              >
                {wifeOptions}
              </Select>
            )}
          </FormItem>
          <FormItem label="孩子" hasFeedback {...formItemLayout}>
            {getFieldDecorator('childrenIds', {
              initialValue: item.childrenIds,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select
                showSearch
                placeholder="输入名字搜索"
                mode="multiple"
                style={this.props.style}
                defaultActiveFirstOption={true}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearchChildren}
                onChange={this.handleChange}
                notFoundContent={null}
              >
                {childrenOptions}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

RelationshipModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default RelationshipModal
