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
import ResetPasswordModal from './components/ResetPasswordModal'
import MenuModal from './components/MenuModal'

@withI18n()
@connect(({ user, loading }) => ({ user, loading }))
class User extends PureComponent {
  render() {
    const { location, dispatch, user, loading, i18n } = this.props
    const { query, pathname } = location

    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      resetPasswordModalVisible,
      menuModalVisible,
      modalType,
      selectedRowKeys,
      rolesData,
      userId,
      treeData,
    } = user

    const handleRefresh = newQuery => {
      dispatch({
        type: 'user/query',
        payload: newQuery,
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`user/${modalType}`],
      rolesData: rolesData,
      title: `${modalType === 'create' ? '创建用户' : '更新用户'}`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `user/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'user/hideModal',
        })
      },
    }

    const resetPasswordModalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: resetPasswordModalVisible,
      userId: userId,
      maskClosable: false,
      confirmLoading: loading.effects[`user/${modalType}`],
      title: `重设密码`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `user/resetPassword`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'user/hideResetPasswordModal',
        })
      },
    }
    const menuModalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: menuModalVisible,
      userId: userId,
      treeData: treeData,
      maskClosable: false,
      confirmLoading: loading.effects[`user/${modalType}`],
      title: `分配菜单`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `user/configMenu`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'user/hideMenuModal',
        })
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          pageNumber: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'user/delete',
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
          type: 'user/getRoles',
        }).then(() => {
          dispatch({
            type: 'user/get',
            payload: item.id,
          })
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'user/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
      onResetPassword(userId) {
        dispatch({
          type: 'user/updateState',
          payload: {
            userId: userId,
          },
        }),
          dispatch({
            type: 'user/showResetPasswordModal',
            payload: {
              modalType: 'create',
            },
          })
      },
      onConfigMenu(userId) {
        dispatch({
          type: 'user/updateState',
          payload: {
            userId: userId,
          },
        }),
          dispatch({
            type: 'user/showMenuModal',
            payload: {
              modalType: 'create',
            },
          })
        dispatch({
          type: 'user/getMenuTree',
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
          type: 'user/getRoles',
        }).then(() => {
          dispatch({
            type: 'user/showModal',
            payload: {
              modalType: 'create',
            },
          })
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'user/multiDelete',
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
        {resetPasswordModalVisible && (
          <ResetPasswordModal {...resetPasswordModalProps} />
        )}
        {menuModalVisible && <MenuModal {...menuModalProps} />}
      </Page>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default User
