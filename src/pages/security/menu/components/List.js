import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定要删除这条记录吗？',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: '菜单编码',
        dataIndex: 'code',
        key: 'code',
        width: 120
      },
      {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
        width: 120,
      },
      {
        title: '目录',
        dataIndex: 'parentMenuName',
        key: 'parentMenuName',
        width: 120,
      },
      {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
        width: 120,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 120,
        render: text => <span>{text==1 ? '菜单' : '目录'}</span>,
      },
      {
        title: '路径',
        dataIndex: 'url',
        key: 'url',
        width: 120,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
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
        render: text => <span>{text ? '是' : '否'}</span>,
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: '更新' },
                { key: '2', name: '删除' },
              ]}
            />
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
        scroll={{ x: 1200 }}
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
