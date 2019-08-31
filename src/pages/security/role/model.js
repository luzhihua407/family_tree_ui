/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryRoleList,
  queryRole,
  createRole,
  removeRole,
  updateRole,
  removeRoleList,
  getMenuTree,
  saveRoleMenu,
  getRoleMenuByRoleId,
} = api

export default modelExtend(pageModel, {
  namespace: 'role',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    treeData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/security/role', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryRoleList, payload)
      if (data) {
        let { pageNumber, pageSize, result, total } = data.data
        yield put({
          type: 'querySuccess',
          payload: {
            list: result,
            pagination: {
              current: Number(pageNumber) || 1,
              pageSize: Number(pageSize) || 10,
              total: total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeRole, { ids: [payload] })
      const { selectedRowKeys } = yield select(_ => _.role)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeRoleList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createRole, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ role }) => role.currentItem.id)
      const newRole = { ...payload, id }
      const data = yield call(updateRole, newRole)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *saveRoleMenu({ payload }, { select, call, put }) {
      const data = yield call(saveRoleMenu, payload)
      if (data.success) {
        yield put({ type: 'hideRoleMenuModal' })
      } else {
        throw data
      }
    },

    *get({ payload }, { call, put, select }) {
      const resp = yield call(queryRole, { id: payload })
      if (resp.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: resp.data,
          },
        })
      } else {
        throw resp
      }
    },
    *getRoleMenuByRoleId({ payload }, { call, put, select }) {
      const resp = yield call(getRoleMenuByRoleId, { roleId: payload })
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: { currentRoleItem: resp.data },
        })
      } else {
        throw resp
      }
    },
    *getMenuTree({ payload }, { call, put, select }) {
      const resp = yield call(getMenuTree, { id: payload })
      if (resp.success) {
        yield put({ type: 'updateState', payload: { treeData: resp.data } })
      } else {
        throw resp
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
    showRoleMenuModal(state, { payload }) {
      return { ...state, ...payload, roleMenuModalVisible: true }
    },

    hideRoleMenuModal(state) {
      return { ...state, roleMenuModalVisible: false }
    },
  },
})
