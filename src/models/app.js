/* global window */

import { router } from 'utils'
import { stringify } from 'qs'
import store from 'store'
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout, pathMatchRegexp } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import config from 'config'

const { queryRouteList, logoutUser, queryUserInfo } = api

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: '仪表盘',
        zhName: '仪表盘',
        route: '/security/role',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [],
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },

    setup({ dispatch }) {
      //dispatch({ type: 'router' })
      dispatch({ type: 'query' })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const {
        success,
        user,
        data: { menus },
      } = yield call(queryUserInfo, payload)

      const { locationPathname } = yield select(_ => _.app)
      if (success && menus) {
        const { list } = menus
        const { permissions } = {
          id: 0,
          username: 'admin',
          password: 'admin',
          permissions: '',
          avatar: '',
        }
        // const { permissions } = user
        let routeList = menus
        console.log(111111)
        console.log(routeList)

        // if (
        //   permissions.role === ROLE_TYPE.ADMIN ||
        //   permissions.role === ROLE_TYPE.DEVELOPER
        // ) {
        //   permissions.visit = list.map(item => item.id)
        // } else {
        //   routeList = list.filter(item => {
        //     const cases = [
        //       permissions.visit.includes(item.id),
        //       item.mpid
        //         ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
        //         : true,
        //       item.bpid ? permissions.visit.includes(item.bpid) : true,
        //     ]
        //     return cases.every(_ => _)
        //   })
        // }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            routeList,
          },
        })
        if (pathMatchRegexp(['/', '/login'], window.location.pathname)) {
          router.push({
            pathname: '/user',
          })
        }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            permissions: { visit: [] },
            menu: [
              {
                id: '1',
                icon: 'laptop',
                name: 'Dashboard',
                zhName: '仪表盘',
                router: '/dashboard',
              },
            ],
          },
        })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
