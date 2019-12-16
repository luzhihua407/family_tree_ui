import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'
import { isAllowed } from '../../auth'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleVillageClick = (record, e) => {
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
        title: '乡村编码',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
      },
      {
        title: '乡村名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width: '10%',
      },
      {
        title: '经度',
        dataIndex: 'longitude',
        key: 'longitude',
        width: '10%',
      },
      {
        title: '纬度',
        dataIndex: 'latitude',
        key: 'latitude',
        width: '10%',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
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
              {isAllowed('village.update') && (
                <Button
                  icon="edit"
                  onClick={e => this.handleVillageClick(record, '1')}
                  size={'small'}
                >
                  修改
                </Button>
              )}
              {isAllowed('village.delete') && (
                <Button
                  icon="delete"
                  onClick={e => this.handleVillageClick(record, '2')}
                  size={'small'}
                >
                  删除
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
