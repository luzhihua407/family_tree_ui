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
import RelationshipModal from './components/RelationshipModal'

@withI18n()
@connect(({ people, loading }) => ({ people, loading }))
class People extends PureComponent {
  render() {
    const { location, dispatch, people, loading, i18n } = this.props
    const { query, pathname } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      relationshipModalVisible,
      modalType,
      selectedRowKeys,
      educationListData,
      prodTeamListData,
      branchListData,
    } = people

    const handleRefresh = newQuery => {
      dispatch({
        type: 'people/query',
        payload: newQuery,
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      educationListData: educationListData,
      prodTeamListData: prodTeamListData,
      branchListData: branchListData,
      confirmLoading: loading.effects[`people/${modalType}`],
      title: `${modalType === 'create' ? '创建族谱' : '修改族谱'}`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `people/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'people/hideModal',
        })
      },
    }
    const relationshipModalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: relationshipModalVisible,
      maskClosable: false,
      branchListData: branchListData,
      confirmLoading: loading.effects[`people/${modalType}`],
      title: `${modalType === 'create' ? '创建关系' : '修改关系'}`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `people/addRelationship`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'people/hideRelationshipModal',
        })
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['people/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          pageNumber: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'people/delete',
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
          type: 'people/getBranchList',
          payload: {},
        }),
          dispatch({
            type: 'people/get',
            payload: item.id,
          }).then(() => {
            dispatch({
              type: 'people/getSubDictListByParentCode',
              payload: { parentCode: 'education' },
            })
          })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'people/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
      branchListData: branchListData,
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
          type: 'people/getSubDictListByParentCode',
          payload: { parentCode: 'education' },
        }).then(() => {
          dispatch({
            type: 'people/showModal',
            payload: {
              modalType: 'create',
            },
          })
        }),
          dispatch({
            type: 'people/getBranchList',
            payload: {},
          })
        dispatch({
          type: 'people/getProdTeam',
          payload: {},
        })
      },
      onSetRelationship() {
        dispatch({
          type: 'people/showRelationshipModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'people/multiDelete',
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
        {relationshipModalVisible && (
          <RelationshipModal {...relationshipModalProps} />
        )}
      </Page>
    )
  }
}

People.propTypes = {
  people: PropTypes.object,
  relationship: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default People
