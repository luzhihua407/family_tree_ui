import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleDictClick = (record, e) => {
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
        title: '字典编码',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
      },
      {
        title: '字典编码',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '字典数值',
        dataIndex: 'numValue',
        key: 'numValue',
        width: '10%',
      },
      {
        title: '字典字符值',
        dataIndex: 'value',
        key: 'value',
        width: '10%',
      },
      {
        title: '上级',
        dataIndex: 'parentName',
        key: 'parentName',
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
              <Button
                icon="edit"
                onClick={e => this.handleDictClick(record, '1')}
                size={'small'}
              >
                更新
              </Button>
              <Button
                icon="delete"
                onClick={e => this.handleDictClick(record, '2')}
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
