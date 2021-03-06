import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'
import { isAllowed } from '../../../auth'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleRoleClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n, onAddMenu } = this.props

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
      onAddMenu(record)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: '角色编码',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
      },
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: '15%',
      },
      {
        title: '超级管理员',
        dataIndex: 'admin',
        key: 'admin',
        width: '15%',
      },
      {
        title: '创建人',
        dataIndex: 'creater',
        key: 'creater',
        width: '15%',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '15%',
      },
      {
        title: '启用',
        dataIndex: 'valid',
        key: 'valid',
        width: '15%',
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <Button.Group>
              {isAllowed('role.update') && (
                <Button
                  icon="edit"
                  onClick={e => this.handleRoleClick(record, '1')}
                  size={'small'}
                >
                  修改
                </Button>
              )}
              {isAllowed('role.delete') && (
                <Button
                  icon="delete"
                  onClick={e => this.handleRoleClick(record, '2')}
                  size={'small'}
                >
                  删除
                </Button>
              )}
              {isAllowed('role.auth_menu') && (
                <Button
                  icon="delete"
                  onClick={e => this.handleRoleClick(record, '3')}
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
        scroll={{ x: '100%' }}
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
  location: PropTypes.object,
}

export default List
