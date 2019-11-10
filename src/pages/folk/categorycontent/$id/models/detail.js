import { pathMatchRegexp } from 'utils'
import api from 'api'
const { queryCategoryContentById } = api

export default {
  namespace: 'categoryContentDetail',
  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/folk/categorycontent/:id', pathname)
        if (match) {
          dispatch({ type: 'view', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *view({ payload }, { call, put }) {
      const result = yield call(queryCategoryContentById, payload)
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
}
