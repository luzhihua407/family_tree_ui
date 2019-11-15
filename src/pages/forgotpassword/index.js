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
@connect(({ forgotPassword, loading }) => ({ forgotPassword, loading }))
@Form.create()
class ForgotPassword extends PureComponent {
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
      dispatch({ type: 'signUp/forgotPassword', payload: data })
    })
  }

  render() {
    const { location, dispatch, forgotPassword, loading, form } = this.props
    const { query, pathname } = location
    const { getFieldDecorator } = form
    const { fetching, data, value } = this.state
    this.setState({ data: forgotPassword.data })
    return (
      <Fragment>
        <div className={styles.form}>
          <Form>
            <Row>
              <Link to={'/login'}>返回登录</Link>
            </Row>
            <Row>系统将会向您的邮箱发送邮件，请在邮件的页面中重置您的密码</Row>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="请输入注册邮箱" />)}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={loading.effects.login}
              >
                找回密码
              </Button>
            </Row>
          </Form>
        </div>
      </Fragment>
    )
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default ForgotPassword
