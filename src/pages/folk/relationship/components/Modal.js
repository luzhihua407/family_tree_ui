import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Select } from 'antd'
const FormItem = Form.Item

@withI18n()
@Form.create()
class RelationshipModal extends PureComponent {
  state = {
    husbandData: [],
    wifeData: [],
    childrenData: [],
    value: undefined,
  }

  handleSearch = value => {
    if (value) {
      fetch(value, data => this.setState({ data }))
    } else {
      this.setState({
        husbandData: [],
        wifeData: [],
        childrenData: [],
      })
    }
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
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
            {getFieldDecorator('husband', {
              initialValue: item.husband,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
              >
                {husbandOptions}
              </Select>
            )}
          </FormItem>
          <FormItem label="妻子" hasFeedback {...formItemLayout}>
            {getFieldDecorator('wife', {
              initialValue: item.wife,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
              >
                {wifeOptions}
              </Select>
            )}
          </FormItem>
          <FormItem label="孩子" hasFeedback {...formItemLayout}>
            {getFieldDecorator('children', {
              initialValue: item.children,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
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
