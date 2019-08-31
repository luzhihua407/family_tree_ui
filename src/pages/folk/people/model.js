/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryPeopleByPage,
  queryPeopleById,
  createPeople,
  removePeople,
  updatePeople,
  removePeopleList,
  getSubDictListByParentCode,
} = api

export default modelExtend(pageModel, {
  namespace: 'people',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    educationListData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/folk/people', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryPeopleByPage, payload)
      if (data) {
        let { pageNumber, pageSize, total, result } = data.data
        yield put({
          type: 'querySuccess',
          payload: {
            list: result,
            pagination: {
              current: Number(pageNumber) || 1,
              pageSize: Number(pageSize) || 10,
              total: Number(total),
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removePeople, { ids: [payload] })
      const { selectedRowKeys } = yield select(_ => _.people)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removePeopleList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createPeople, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ people }) => people.currentItem.id)
      const newPeople = { ...payload, id }
      const data = yield call(updatePeople, newPeople)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *fileUpload({ payload }, { select, call, put }) {
      const data = yield call(fileUpload, payload)
      if (data.success) {
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
