import { pathMatchRegexp } from 'utils'
import api from 'api'
import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
const { queryCemeteryById } = api

export default modelExtend(pageModel, {
  namespace: 'cemeteryDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/folk/cemetery/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      console.log(payload)
      const result = yield call(queryCemeteryById, payload)
      const { success, message, status, data } = result
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
})
