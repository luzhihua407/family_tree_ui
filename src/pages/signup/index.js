import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, Select, Input, Spin, Form, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../signup/index.less'
import { GlobalFooter } from 'ant-design-pro'
import config from 'utils/config'

const { Option } = Select
const FormItem = Form.Item
import { Link } from 'umi'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
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
    let footerLinks = [
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/luzhihua407/family_tree_ui',
        blankTarget: true,
      },
    ]

    return (
      <Fragment>
        <div className={styles.form}>
          <Form layout="horizontal">
            <p>
              <span>
                <Link to={'/login'}>返回登录</Link>
              </span>
            </p>
            <FormItem label="用户名" {...formItemLayout}>
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
            <FormItem label="密码" {...formItemLayout}>
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
                  showSearch
                  value={value}
                  placeholder="请选择村名，如搜索不到则新建输入的村名"
                  notFoundContent={null}
                  filterOption={false}
                  // onSearch={this.fetchUser}
                  style={{ width: '100%' }}
                >
                  {/*{data.map(d => (*/}
                  {/*  <Option key={d}>{d}</Option>*/}
                  {/*))}*/}
                  <Option key="长岐塘">长岐塘</Option>
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
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
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
