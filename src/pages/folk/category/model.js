/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryCategoryByPage,
  queryCategoryById,
  createCategory,
  removeCategory,
  updateCategory,
  removeCategoryList,
  getCategoryList,
} = api

export default modelExtend(pageModel, {
  namespace: 'category',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    categoryListData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/folk/category', location.pathname)) {
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
      const result = yield call(queryCategoryByPage, payload)
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
              total: Number(total),
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeCategory, { ids: [payload] })
      const { selectedRowKeys } = yield select(_ => _.category)
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
      const data = yield call(removeCategoryList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createCategory, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ category }) => category.currentItem.id)
      const newCategory = { ...payload, id }
      const data = yield call(updateCategory, newCategory)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *get({ payload }, { call, put, select }) {
      const resp = yield call(queryCategoryById, { id: payload })
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            modalType: 'update',
            currentItem: resp.data,
          },
        })
      } else {
        throw resp
      }
    },
    *getCategoryList({ payload }, { call, put, select }) {
      const resp = yield call(getCategoryList, { id: payload })
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            categoryListData: resp.data,
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
