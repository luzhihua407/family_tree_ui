import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import router from 'umi/router'
import { message } from 'antd'
const { forgotPassword, getVillageName } = api

export default modelExtend(pageModel, {
  namespace: 'forgotPassword',

  state: { data: [] },

  effects: {
    *forgotPassword({ payload }, { call, put }) {
      const result = yield call(forgotPassword, payload)
      const { success, data, msg } = result
      if (success) {
        message.info('注册成功，正在跳转到登录页')
        router.push('/login')
      } else {
        message.error(msg)
      }
    },
  },

  reducers: {},
})
