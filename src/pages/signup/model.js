import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import router from 'umi/router'

const { signup } = api

export default modelExtend(pageModel, {
  namespace: 'signup',

  state: {},

  effects: {
    *signup({ payload }, { call, put }) {
      const result = yield call(signup, payload)
      const { success, data } = result
      if (success) {
        router.push('/signup')
      }
    },
  },

  reducers: {},
})
