import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar, Button } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handlePeopleClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props
    if (e === '1') {
      onEditItem(record)
    } else if (e === '2') {
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
        title: '全名',
        dataIndex: 'fullName',
        key: 'fullName',
        width: '15%',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: '10%',
      },
      {
        title: '出生年月',
        dataIndex: 'birth',
        key: 'birth',
        width: '10%',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: '10%',
      },
      {
        title: '第几世',
        dataIndex: 'generations',
        key: 'generations',
        width: '10%',
      },
      {
        title: '是否结婚',
        dataIndex: 'isMarried',
        key: 'isMarried',
        width: '10%',
      },
      {
        title: '学历',
        dataIndex: 'education',
        key: 'education',
        width: '15%',
      },
      {
        title: '启用',
        dataIndex: 'valid',
        key: 'valid',
        width: '10%',
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <Button.Group>
              <Button
                icon="edit"
                onClick={e => this.handlePeopleClick(record, '1')}
                size={'small'}
              >
                更新
              </Button>
              <Button
                icon="delete"
                onClick={e => this.handlePeopleClick(record, '2')}
                size={'small'}
              >
                删除
              </Button>
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
