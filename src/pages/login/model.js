import { router, pathMatchRegexp } from 'utils'
import api from 'api'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      payload.grant_type='password';
      payload.scope='read write';
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      
      if (data.success) {
        const { from } = locationQuery
        let access_token=data.data.access_token;
        localStorage.setItem('access_token', access_token);
        yield put({ type: 'app/query',payload:{}})
        router.push({
          pathname: '/user',
        })
       if (!pathMatchRegexp('/login', from)) {
         if (from === '/') 
         router.push('/dashboard')
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
