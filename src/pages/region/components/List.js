import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleRegionClick = (record, e) => {
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
        title: '区号',
        dataIndex: 'areaCode',
        key: 'areaCode',
        width: '15%',
      },
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
      },
      {
        title: '简称',
        dataIndex: 'shortName',
        key: 'shortName',
        width: '15%',
      },
      {
        title: '全称',
        dataIndex: 'fullName',
        key: 'fullName',
        width: '15%',
      },
      {
        title: '邮政编码',
        dataIndex: 'postCode',
        key: 'postCode',
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
              <Button
                icon="edit"
                onClick={e => this.handleRegionClick(record, '1')}
                size={'small'}
              >
                更新
              </Button>
              <Button
                icon="delete"
                onClick={e => this.handleRegionClick(record, '2')}
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
