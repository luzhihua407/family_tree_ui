/* global document */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd'
import city from 'utils/city'
import { isAllowed } from '../../../auth'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@withI18n()
@Form.create()
class Filter extends PureComponent {
  handleFields = fields => {
    const { createTime } = fields
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    fields = { param: fields }
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, filter, form, i18n } = this.props
    const { getFieldDecorator } = form
    const { name, code, type } = filter
    const { Option } = Select
    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('code', { initialValue: code })(
            <Input placeholder={'搜索菜单编码'} allowClear />
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('name', { initialValue: name })(
            <Input placeholder={'搜索菜单名称'} allowClear />
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('type', {
            initialValue: type,
          })(
            <Select style={{ width: 120 }} placeholder={'请选择类型'}>
              <Option value={0}>目录</Option>
              <Option value={1}>可见菜单</Option>
              <Option value={2}>不可见菜单</Option>
            </Select>
          )}
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                className="margin-right"
                icon="search"
                onClick={this.handleSubmit}
              >
                <Trans>Search</Trans>
              </Button>
              <Button
                onClick={this.handleReset}
                icon="delete"
                className="margin-right"
              >
                <Trans>Reset</Trans>
              </Button>
              {isAllowed('menu.add') && (
                <Button type="ghost" onClick={onAdd} className="margin-right">
                  <Trans>Create</Trans>
                </Button>
              )}
            </div>
          </Row>
        </Col>
      </Row>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
