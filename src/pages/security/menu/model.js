/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryMenu,
  queryMenuList,
  createMenu,
  removeMenu,
  updateMenu,
  removeMenuList,
  getParentMenus,
  getSubDictListByParentCode,
} = api

export default modelExtend(pageModel, {
  namespace: 'menu',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    parentMenusData: [],
    optPermissionListData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/security/menu', location.pathname)) {
          const payload = location.query || { pageNumber: 1, pageSize: 10 }
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
      const data = yield call(queryMenuList, payload)
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
      const data = yield call(removeMenu, { ids: payload })
      const { selectedRowKeys } = yield select(_ => _.menu)
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

    *get({ payload }, { call, put, select }) {
      const resp = yield call(queryMenu, { id: payload })
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
    *getParentMenus({ payload }, { call, put, select }) {
      const resp = yield call(getParentMenus, {})
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            parentMenusData: resp.data,
          },
        })
      } else {
        throw resp
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeMenuList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createMenu, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ menu }) => menu.currentItem.id)
      const newMenu = { ...payload, id }
      const data = yield call(updateMenu, newMenu)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *getSubDictListByParentCode({ payload }, { call, put, select }) {
      const resp = yield call(getSubDictListByParentCode, payload)
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            optPermissionListData: resp.data,
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
  },
})
