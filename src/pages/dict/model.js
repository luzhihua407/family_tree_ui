/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryDictList,
  getParentDict,
  queryDict,
  createDict,
  removeDict,
  updateDict,
  removeDictList,
} = api

export default modelExtend(pageModel, {
  namespace: 'dict',

  state: {
    currentItem: {},
    modalVisible: false,
    passwordVisible: true,
    modalType: 'create',
    selectedRowKeys: [],
    parentDictData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/dict', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'getParentDict',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const result = yield call(queryDictList, payload)
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
      const data = yield call(removeDict, { ids: [payload] })
      const { selectedRowKeys } = yield select(_ => _.dict)
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
      const data = yield call(removeDictList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createDict, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ dict }) => dict.currentItem.id)
      const newDict = { ...payload, id }
      const data = yield call(updateDict, newDict)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *getParentDict({ payload }, { call, put, select }) {
      const resp = yield call(
        getParentDict,
        payload == undefined ? {} : payload
      )
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            parentDictData: resp.data,
          },
        })
      } else {
        throw resp
      }
    },
    *get({ payload }, { call, put, select }) {
      const resp = yield call(queryDict, { id: payload })
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
