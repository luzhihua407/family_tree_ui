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
import RoleMenuModal from './components/RoleMenuModal'
@withI18n()
@connect(({ role, loading }) => ({ role, loading }))
class role extends PureComponent {
  render() {
    const { location, dispatch, role, loading, i18n } = this.props
    const { query, pathname } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      roleMenuModalVisible,
      modalType,
      roleMenuModalType,
      selectedRowKeys,
      treeData,
      menuIds,
    } = role

    const handleRefresh = newQuery => {
      dispatch({
        type: 'role/query',
        payload: newQuery,
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`role/${modalType}`],
      title: `${modalType === 'create' ? '创建角色' : '更新角色'}`,
      centered: true,
      menuIds,
      onOk(data) {
        dispatch({
          type: `role/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'role/hideModal',
        })
      },
    }
    const roleMenuModalProps = {
      item: roleMenuModalType === 'create' ? {} : currentItem,
      visible: roleMenuModalVisible,
      treeData: treeData,
      width: '40%',
      maskClosable: false,
      confirmLoading: loading.effects[`role/${roleMenuModalType}`],
      title: `${roleMenuModalType === 'create' ? '分配菜单' : '修改分配菜单'}`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `role/saveRoleMenu`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'role/hideRoleMenuModal',
        })
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['role/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          pageNumber: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'role/delete',
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
          type: 'role/get',
          payload: item.id,
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'role/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
      onAddMenu(item) {
        dispatch({
          type: 'role/showRoleMenuModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })

        dispatch({
          type: 'role/getRoleMenuByRoleId',
          payload: item.id,
        }).then(() => {
          dispatch({
            type: 'role/getMenuTree',
          })
        })
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
          type: 'role/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'role/multiDelete',
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
        {roleMenuModalVisible && <RoleMenuModal {...roleMenuModalProps} />}
      </Page>
    )
  }
}

role.propTypes = {
  role: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default role
