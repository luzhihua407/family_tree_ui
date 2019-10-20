import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'
import { isAllowed } from '../../auth'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleUserClick = (record, e) => {
    const {
      onDeleteItem,
      onEditItem,
      i18n,
      onResetPassword,
      onConfigMenu,
    } = this.props

    if (e === '1') {
      onEditItem(record)
    } else if (e === '2') {
      confirm({
        title: '你确定要删除这条记录吗？',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (e === '3') {
      onResetPassword(record.id)
    } else if (e === '4') {
      onConfigMenu(record.id)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: 120,
      },
      {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
        width: 120,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 120,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: 120,
      },
      {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
        width: 120,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 120,
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        width: 120,
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
        key: 'registerTime',
        width: 120,
      },
      {
        title: '用户类型',
        dataIndex: 'type',
        key: 'type',
        width: 120,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 120,
      },
      {
        title: '启用',
        dataIndex: 'valid',
        key: 'valid',
        width: 120,
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <Button.Group>
              {isAllowed('user.update') && (
                <Button
                  icon="edit"
                  onClick={e => this.handleUserClick(record, '1')}
                  size={'small'}
                >
                  更新
                </Button>
              )}
              {isAllowed('user.delete') && (
                <Button
                  icon="delete"
                  onClick={e => this.handleUserClick(record, '2')}
                  size={'small'}
                >
                  删除
                </Button>
              )}
              {isAllowed('user.reset_password') && (
                <Button
                  icon="edit"
                  onClick={e => this.handleUserClick(record, '3')}
                  size={'small'}
                >
                  重设密码
                </Button>
              )}
              {isAllowed('user.auth_menu') && (
                <Button
                  icon="edit"
                  onClick={e => this.handleUserClick(record, '4')}
                  size={'small'}
                >
                  分配菜单
                </Button>
              )}
            </Button.Group>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1500 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onResetPassword: PropTypes.func,
  onConfigMenu: PropTypes.func,
  location: PropTypes.object,
}

export default List
