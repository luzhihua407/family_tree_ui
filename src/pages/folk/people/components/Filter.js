/* global document */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd'
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
    const {
      onAdd,
      onSetRelationship,
      filter,
      form,
      branchListData,
    } = this.props
    const { getFieldDecorator } = form
    const { fullName, peopleBranch } = filter

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('fullName', { initialValue: fullName })(
            <Input placeholder={'输入全名'} allowClear />
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('peopleBranch', {
            initialValue: peopleBranch,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              labelInValue={false}
              placeholder="请选择房支"
              style={{ width: 120 }}
              allowClear={true}
            >
              {branchListData.map(d => (
                <Select.Option key={d.id}>{d.name}</Select.Option>
              ))}
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
              <Button className="margin-right" onClick={this.handleReset}>
                <Trans>Reset</Trans>
              </Button>
              {isAllowed('people.add') && (
                <Button
                  type="ghost"
                  className="margin-right"
                  onClick={onAdd}
                  icon="form"
                >
                  <Trans>Create</Trans>
                </Button>
              )}
              {isAllowed('people.setting_relationship') && (
                <Button
                  type="ghost"
                  className="margin-right"
                  onClick={onSetRelationship}
                  icon="form"
                >
                  设置关系
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
  onSetRelationship: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
