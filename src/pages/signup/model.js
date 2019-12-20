import modelExtend from 'dva-model-extend'
import api from 'api'
import router from 'umi/router'
import { message } from 'antd'
const { signUp, getVillageName, forgotPassword } = api

export default {
  namespace: 'signUp',

  state: { data: [] },

  effects: {
    *signUp({ payload }, { call, put }) {
      const result = yield call(signUp, payload)
      const { success, data, msg } = result
      if (success) {
        message.info('注册成功，正在跳转到登录页')
        router.push('/login')
      } else {
        message.error(msg)
      }
    },
    *getVillageName({ payload }, { call, put }) {
      const result = yield call(getVillageName, payload)
      const { success, data, msg } = result

      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            data: data,
          },
        })
      }
    },
    *forgotPassword({ payload }, { call, put }) {
      console.log(1111)
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
}
