import { pathMatchRegexp } from 'utils'
import api from 'api'
const { queryCemeteryById } = api

export default {
  namespace: 'cemeteryDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/folk/cemetery/:id', pathname)
        if (match) {
          dispatch({ type: 'get', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *get({ payload }, { call, put }) {
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
}
