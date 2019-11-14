import { router, pathMatchRegexp } from 'utils'
import api from 'api'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      console.log(33333333333333444)
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query', payload: {} })
        router.push({
          pathname: '/user',
        })
        if (!pathMatchRegexp('/login', from)) {
          if (from === '/') router.push('/dashboard')
          else router.push(from)
        } else {
          router.push('/dashboard')
        }
      } else {
        throw data
      }
    },
  },
}
