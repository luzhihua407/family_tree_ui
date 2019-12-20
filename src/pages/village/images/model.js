/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { parse } from 'qs'

const { getVillageImages } = api

export default modelExtend(pageModel, {
  namespace: 'villageImage',

  state: {
    images: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/village/images', pathname)) {
          dispatch({ type: 'getVillageImages' })
        }
      })
    },
  },

  effects: {
    *getVillageImages({ payload }, { call, put }) {
      const data = yield call(getVillageImages, parse(payload))
      if (data.success) {
        const rs = data.data
        yield put({
          type: 'updateState',
          payload: rs,
        })
      }
    },
  },

  reducers: {},
})
