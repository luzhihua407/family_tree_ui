/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'

const {
  queryCategoryContentByPage,
  queryCategoryContentById,
  createCategoryContent,
  removeCategoryContent,
  updateCategoryContent,
  removeCategoryContentList,
} = api

export default modelExtend(pageModel, {
  namespace: 'categoryContent',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    editorContent: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/folk/categoryContent', location.pathname)) {
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
      const data = yield call(queryCategoryContentByPage, payload)
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
      const data = yield call(removeCategoryContent, { ids: [payload] })
      const { selectedRowKeys } = yield select(_ => _.categoryContent)
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
      const data = yield call(removeCategoryContentList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createCategoryContent, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(
        ({ categoryContent }) => categoryContent.currentItem.id
      )
      const newCategoryContent = { ...payload, id }
      const data = yield call(updateCategoryContent, newCategoryContent)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    get: function*({ state, payload }, { call, put, select }) {
      const resp = yield call(queryCategoryContentById, { id: payload })
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
      const { content } = payload.currentItem
      const contentBlock = htmlToDraft(content)
      let editorState = null
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        )
        editorState = EditorState.createWithContent(contentState)
      }
      return {
        ...state,
        ...payload,
        modalVisible: true,
        editorContent: editorState,
      }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
