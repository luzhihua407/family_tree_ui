import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, Select, Input, Spin, Form } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../login/index.less'
import { GlobalFooter } from 'ant-design-pro'
const { Option } = Select
const FormItem = Form.Item
import { Link } from 'umi'
@withI18n()
@connect(({ signUp, loading }) => ({ signUp, loading }))
@Form.create()
class SignUp extends PureComponent {
  state = {
    data: [],
    value: [],
  }
  fetchUser = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'signUp/getVillageName',
      payload: { name: value },
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
      dispatch({ type: 'signUp/signUp', payload: data })
    })
  }

  render() {
    const { location, dispatch, signUp, loading, form } = this.props
    const { query, pathname } = location
    const { getFieldDecorator } = form
    const { fetching, data, value } = this.state
    this.setState({ data: signUp.data })
    return (
      <Fragment>
        <div className={styles.form}>
          <Form>
            <Row>
              <Link to={'/login'}>返回登录</Link>
            </Row>
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="请输入用来激活账户的邮箱" />)}
            </FormItem>
            <FormItem label="密码">
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
            <FormItem label="村名">
              {getFieldDecorator('villageName', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select
                  showSearch
                  value={value}
                  placeholder="请选择村名，如搜索不到则新建输入的村名"
                  notFoundContent={null}
                  filterOption={false}
                  onSearch={this.fetchUser}
                  style={{ width: '100%' }}
                >
                  {data.map(d => (
                    <Option key={d}>{d}</Option>
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

SignUp.propTypes = {
  signUp: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default SignUp
