import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, Select, Input, Spin, Form } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import styles from '../login/index.less'
import { GlobalFooter } from 'ant-design-pro'
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
@withI18n()
@connect(({ signup, loading }) => ({ signup, loading }))
@Form.create()
class Signup extends PureComponent {
  state = {
    data: [],
    value: [],
  }
  fetchUser = value => {
    console.log('fetching user', value)
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }))
        this.setState({ data, fetching: false })
      })
  }
  handleOk = () => {
    const { item = {}, onOk, form, dispatch } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      dispatch({ type: 'signup/signup', payload: data })
    })
  }

  render() {
    const { location, dispatch, signup, loading, form } = this.props
    const { query, pathname } = location
    const { getFieldDecorator } = form
    const { fetching, data, value } = this.state
    return (
      <Fragment>
        <div className={styles.form}>
          <Form layout="horizontal">
            <FormItem label="登录名" {...formItemLayout}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="邮箱" {...formItemLayout}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="请输入用来激活账户的邮箱" />)}
            </FormItem>
            <FormItem label="登录密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder="请输入登录密码"
                />
              )}
            </FormItem>
            <FormItem label="村名" {...formItemLayout}>
              {getFieldDecorator('villageName', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  value={value}
                  placeholder="请选择村名，如搜索不到则新建输入的村名"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={this.fetchUser}
                  onChange={this.handleChange}
                  style={{ width: '100%' }}
                >
                  {data.map(d => (
                    <Option key={d.value}>{d.text}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={loading.effects.login}
              >
                注册
              </Button>
            </Row>
          </Form>
        </div>
      </Fragment>
    )
  }
}

Signup.propTypes = {
  signup: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Signup
