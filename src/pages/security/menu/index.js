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
@connect(({ menu, loading }) => ({ menu, loading }))
class menu extends PureComponent {
  render() {
    const { location, dispatch, menu, loading, i18n } = this.props
    const { query, pathname } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      selectedRowKeys,
      parentMenusData,
    } = menu

    const handleRefresh = newQuery => {
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          { arrayFormat: 'repeat' }
        ),
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`menu/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`Create menu` : i18n.t`Update menu`
      }`,
      centered: true,
      parentMenusData:parentMenusData,
      onOk(data) {
        dispatch({
          type: `menu/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'menu/hideModal',
        })
      },

    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['menu/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          pageNumber: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'menu/delete',
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
          type: 'menu/getParentMenus',
        }).then(() => {
          dispatch({
            type: 'menu/get',
            payload: item.id,
          })
        })
  
  
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'menu/updateState',
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
          type: 'menu/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'menu/multiDelete',
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

menu.propTypes = {
  menu: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default menu
