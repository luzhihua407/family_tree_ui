/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryRegionList,
  queryRegion,
  createRegion,
  removeRegion,
  updateRegion,
  removeRegionList,
} = api

export default modelExtend(pageModel, {
  namespace: 'region',

  state: {
    currentItem: {},
    modalVisible: false,
    passwordVisible: true,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/region', location.pathname)) {
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
      const result = yield call(queryRegionList, payload)
      const { success, message, status, data } = result
      if (success) {
        let { pageNumber, pageSize, result, total } = data
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
      const data = yield call(removeRegion, { ids: [payload] })
      const { selectedRowKeys } = yield select(_ => _.region)
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
      const data = yield call(removeRegionList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createRegion, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ region }) => region.currentItem.id)
      const newRegion = { ...payload, id }
      const data = yield call(updateRegion, newRegion)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *get({ payload }, { call, put, select }) {
      const resp = yield call(queryRegion, { id: payload })
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
