/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryTreeByPage,
  getFamilyTree,
  getBranchList,
  getNames,
  getSubDictListByParentCode,
  queryPeopleById,
} = api

export default modelExtend(pageModel, {
  namespace: 'tree',

  state: {
    list: [],
    modalVisible: false,
    branchListData: [],
    namesData: [],
    currentItem: {},
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/folk/tree', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload: { branch: '五房' },
          }),
            dispatch({
              type: 'getBranchList',
              payload: {},
            })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const result = yield call(getFamilyTree, payload)
      if (result) {
        let { data } = result
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
          },
        })
      }
    },
    *getNames({ payload }, { call, put, select }) {
      const resp = yield call(getNames, payload == undefined ? {} : payload)
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            namesData: resp.data,
          },
        })
      } else {
        throw resp
      }
    },
    *getSubDictListByParentCode({ payload }, { call, put, select }) {
      const resp = yield call(getSubDictListByParentCode, payload)
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            educationListData: resp.data,
          },
        })
      } else {
        throw resp
      }
    },
    *get({ payload }, { call, put, select }) {
      const resp = yield call(queryPeopleById, { id: payload })
      if (resp.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: resp.data,
          },
        })
      } else {
        throw resp
      }
    },
    *getBranchList({ payload }, { call, put, select }) {
      const resp = yield call(getBranchList, payload)
      if (resp.success) {
        yield put({
          type: 'updateState',
          payload: {
            branchListData: resp.data,
          },
        })
      } else {
        throw resp
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
