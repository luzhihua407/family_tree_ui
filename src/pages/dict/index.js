import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@withI18n()
@connect(({ dict, loading }) => ({ dict, loading }))
class Dict extends PureComponent {
  render() {
    const { location, dispatch, dict, loading, i18n } = this.props
    const { query, pathname } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      selectedRowKeys,
      parentDictData,
    } = dict

    const handleRefresh = newQuery => {
      dispatch({
        type: 'dict/query',
        payload: newQuery,
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`dict/${modalType}`],
      title: `${modalType === 'create' ? '创建字典' : '修改字典'}`,
      parentDictData: parentDictData,
      centered: true,
      onOk(data) {
        dispatch({
          type: `dict/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'dict/hideModal',
        })
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['dict/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          pageNumber: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'dict/delete',
          payload: id,
        }).then(() => {
          handleRefresh({
            pageNumber:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'dict/getParentDict',
        }).then(() => {
          dispatch({
            type: 'dict/get',
            payload: item.id,
          })
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'dict/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
      parentDictData: parentDictData,
      filter: {
        ...query,
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          pageNumber: 1,
        })
      },
      onAdd() {
        dispatch({
          type: 'dict/getParentDict',
          payload: {},
        }).then(() => {
          dispatch({
            type: 'dict/showModal',
            payload: {
              modalType: 'create',
            },
          })
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'dict/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      }).then(() => {
        handleRefresh({
          pageNumber:
            list.length === selectedRowKeys.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
        })
      })
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`选中了 ${selectedRowKeys.length} 记录 `}
              <Popconfirm
                title="你确定要删除该记录吗?"
                placement="left"
                onConfirm={handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  删除
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    )
  }
}

Dict.propTypes = {
  dict: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Dict
