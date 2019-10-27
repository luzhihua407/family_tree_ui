/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryUserList,
  getRoles,
  queryUser,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
  resetPassword,
  configMenu,
  getMenuTree,
} = api

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    resetPasswordModalVisible: false,
    menuModalVisible: false,
    userId: '',
    passwordVisible: true,
    modalType: 'create',
    selectedRowKeys: [],
    rolesData: [],
    treeData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/user', location.pathname)) {
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
      const data = yield call(queryUserList, payload)
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
      const data = yield call(removeUser, { ids: [payload] })
      const { selectedRowKeys } = yield select(_ => _.user)
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
      const data = yield call(removeUserList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createUser, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *resetPassword({ payload }, { call, put }) {
      const data = yield call(resetPassword, payload)
      if (data.success) {
        yield put({ type: 'hideResetPasswordModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(updateUser, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *get({ payload }, { call, put, select }) {
      const resp = yield call(queryUser, { id: payload })
      if (resp.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: resp.data,
            passwordVisible: false,
          },
        })
      } else {
        throw resp
      }
    },
    *getRoles({ payload }, { call, put, select }) {
      const resp = yield call(getRoles, {})
      if (resp.success) {
        yield put({ type: 'updateState', payload: { rolesData: resp.data } })
      } else {
        throw resp
      }
    },

    *configMenu({ payload }, { call, put, select }) {
      const resp = yield call(configMenu, payload)
      if (resp.success) {
        yield put({ type: 'hideMenuModal' })
      } else {
        throw resp
      }
    },
    *getMenuTree({ payload }, { call, put, select }) {
      const resp = yield call(getMenuTree, {})
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            treeData: resp.data,
          },
        })
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
    showResetPasswordModal(state, { payload }) {
      return { ...state, ...payload, resetPasswordModalVisible: true }
    },

    hideResetPasswordModal(state) {
      return { ...state, resetPasswordModalVisible: false }
    },
    showMenuModal(state, { payload }) {
      return { ...state, ...payload, menuModalVisible: true }
    },

    hideMenuModal(state) {
      return { ...state, menuModalVisible: false }
    },
  },
})
