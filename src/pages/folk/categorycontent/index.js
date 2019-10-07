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
@connect(({ categoryContent, loading }) => ({ categoryContent, loading }))
class CategoryContent extends PureComponent {
  render() {
    const { location, dispatch, categoryContent, loading, i18n } = this.props
    const { query, pathname } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      selectedRowKeys,
      editorContent,
      categoryListData,
    } = categoryContent

    const handleRefresh = newQuery => {
      dispatch({
        type: 'categoryContent/query',
        payload: newQuery,
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      editorContent: editorContent,
      maskClosable: false,
      categoryListData: categoryListData,
      confirmLoading: loading.effects[`categoryContent/${modalType}`],
      title: `${modalType === 'create' ? '创建分类内容' : '更新分类内容'}`,
      width: '80%',
      centered: true,
      onOk(data) {
        dispatch({
          type: `categoryContent/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'categoryContent/hideModal',
        })
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['categoryContent/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          pageNumber: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'categoryContent/delete',
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
          type: 'categoryContent/getCategoryList',
          payload: {},
        }).then(() => {
          dispatch({
            type: 'categoryContent/get',
            payload: item.id,
          })
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'categoryContent/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
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
          type: 'categoryContent/getCategoryList',
          payload: {},
        }).then(() => {
          dispatch({
            type: 'categoryContent/showModal',
            payload: {
              modalType: 'create',
            },
          })
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'categoryContent/multiDelete',
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

CategoryContent.propTypes = {
  categoryContent: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CategoryContent
