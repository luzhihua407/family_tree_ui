import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { model } from 'utils/model'

const { queryDashboard, queryWeather, getOverview } = api

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    numByBranch: [],
    numByGender: [],
    numByEducation: [],
    numByProTeam: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathMatchRegexp('/dashboard', pathname) ||
          pathMatchRegexp('/', pathname)
        ) {
          dispatch({ type: 'getOverview' })
        }
      })
    },
  },
  effects: {
    *getOverview({ payload }, { call, put }) {
      const data = yield call(getOverview, parse(payload))
      if (data.success) {
        const rs = data.data
        yield put({
          type: 'updateState',
          payload: rs,
        })
      }
    },
  },
})
