/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const { queryTreeByPage } = api

export default modelExtend(pageModel, {
  namespace: 'tree',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/folk/tree', location.pathname)) {
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
      const result = yield call(queryTreeByPage, payload)
      if (result) {
        let { data } = result
        console.log(data)
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
          },
        })
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
