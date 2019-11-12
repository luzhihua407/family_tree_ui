import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Page } from 'components'
import Modal from './components/Modal'
import { Form, Select, Input, Row, Col, Button, Icon } from 'antd'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { FamDiagram } from 'basicprimitivesreact'
import primitives from 'basicprimitives'
import styles from './index.less'
import { isAllowed } from '../../auth'
import PeopleModal from '../people/components/Modal'
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}
const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@withI18n()
@connect(({ tree, loading }) => ({ tree, loading }))
@connect(({ people, loading }) => ({ people, loading }))
@Form.create()
class Tree extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      config: {
        items: [],
        pageFitMode: primitives.common.PageFitMode.AutoSize,
        cursorItem: 0,
        hasSelectorCheckbox: primitives.common.Enabled.False,
        /* Intervals */
        normalLevelShift: 50,
        dotLevelShift: 100,
        lineLevelShift: 10,
        normalItemsInterval: 10,
        dotItemsInterval: 7,
        lineItemsInterval: 5,
        cousinsIntervalMultiplier: 0,
        hasButtons: primitives.common.Enabled.True,
        buttonsPanelSize: 40,
        onButtonsRender: ({ context: itemConfig }) => {
          return (
            <>
              <button
                key="1"
                className=""
                onClick={event => {
                  event.stopPropagation()
                  this.onView(itemConfig)
                }}
              >
                <Icon type="eye" />
              </button>
              <button
                key="2"
                className=""
                onClick={event => {
                  event.stopPropagation()
                  this.onAdd()
                }}
              >
                <Icon type="form" />
              </button>
            </>
          )
        },
        /* Connectors */
        // arrowsDirection: primitives.common.GroupByType.Children,
        // showExtraArrows: false,
        // extraArrowsMinimumSpace: 30,
        // connectorType: primitives.common.ConnectorType.Curved,
        // elbowType: primitives.common.ElbowType.None,
        // bevelSize: 4,
        // elbowDotSize: 4,
        // linesType: primitives.common.LineType.Solid,
        // linesWidth: 1,
        defaultTemplateName: 'customTemplate',
        templates: [
          {
            name: 'customTemplate',
            itemSize: { width: 132, height: 72 },
            cursorBorderWidth: 2,
            highlightPadding: { left: 4, top: 4, right: 4, bottom: 4 },
            onCursorRender: ({ context: itemConfig }) => {
              return <div className={styles.CursorFrame}></div>
            },

            // minimizedItemSize: { width: 3, height: 3 },
            // highlightPadding: { left: 2, top: 2, right: 2, bottom: 2 },
            onItemRender: ({ context: itemConfig }) => {
              return (
                <div className={styles.border}>
                  <div
                    className="ContactTitleBackground"
                    style={{
                      backgroundColor: primitives.common.Colors.RoyalBlue,
                    }}
                  >
                    <div className={styles.title}>
                      {itemConfig.title}-{itemConfig.sex}
                    </div>
                  </div>
                  <div className={styles.content}>
                    <div>{itemConfig.generations}</div>
                    <div>{itemConfig.description}</div>
                    <div>{itemConfig.remark}</div>
                    <div className={styles.label}>{itemConfig.label}</div>
                  </div>
                </div>
              )
            },
          },
        ],
      },
    }
  }
  onView = itemConfig => {
    const { dispatch } = this.props
    dispatch({
      type: 'tree/getBranchList',
      payload: {},
    })
    dispatch({
      type: 'tree/view',
      payload: itemConfig.peopleId,
    }).then(() => {
      dispatch({
        type: 'tree/getSubDictListByParentCode',
        payload: { parentCode: 'education' },
      })
    })
  }
  onAdd = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'tree/getSubDictListByParentCode',
      payload: { parentCode: 'education' },
    }).then(() => {
      dispatch({
        type: 'tree/showModal',
        payload: {
          modalType: 'create',
        },
      })
    })
    dispatch({
      type: 'tree/getBranchList',
      payload: {},
    })
    dispatch({
      type: 'tree/getProdTeam',
      payload: {},
    })
  }
  handleFields = fields => {
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    fields = { param: fields }
    onFilterChange(fields)
    dispatch({
      type: 'tree/query',
      payload: { branch: value },
    })
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  update(itemid) {
    const { config } = this.state
    this.setState({
      // highlightItem: itemid,
      config: {
        ...config,
        cursorItem: itemid,
      },
    })
  }

  render() {
    const {
      location,
      dispatch,
      tree,
      people,
      loading,
      i18n,
      form,
      tree: { branchListData = [], namesData = [], items },
    } = this.props
    this.state.config.items = items
    const onChange = value => {
      const { config } = this.state
      this.setState({ value, config: { ...config, cursorItem: value } })
    }
    const {
      modalVisible,
      peopleModalVisible,
      currentItem,
      educationListData,
      prodTeamListData,
      modalType,
    } = tree
    const { getFieldDecorator } = form
    const { query, pathname } = location
    const FormItem = Form.Item
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    }
    const onCursorChanged = (event, data) => {}
    const handleSearch = value => {
      if (value.length > 1) {
        dispatch({
          type: 'tree/getNames',
          payload: { name: value },
        })
      }
    }

    const handleSelectChange = value => {
      dispatch({
        type: 'tree/query',
        payload: { branch: value },
      })
    }
    const peopleModalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: peopleModalVisible,
      maskClosable: false,
      educationListData: educationListData,
      prodTeamListData: prodTeamListData,
      branchListData: branchListData,
      confirmLoading: loading.effects[`people/${modalType}`],
      title: `${modalType === 'create' ? '创建族谱' : '更新族谱'}`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `people/${modalType}`,
          payload: data,
        }).then(() => {
          // handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'people/hideModal',
        })
      },
    }
    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`people/${modalType}`],
      title: `查看个人信息`,
      width: '70%',
      centered: true,
      okButtonProps: { disabled: true },
      cancelButtonProps: { disabled: true },
      onOk(data) {
        dispatch({
          type: 'tree/hideModal',
        })
      },
      onCancel() {
        dispatch({
          type: 'tree/hideModal',
        })
      },
    }

    const onViewItem = value => {
      dispatch({
        type: 'tree/get',
        payload: value,
      })
    }

    return (
      <Page inner>
        <div>
          <Row gutter={24}>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
              <FormItem label="姓名" hasFeedback {...formItemLayout}>
                <Select
                  showSearch
                  value={this.state.value}
                  labelInValue={false}
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  allowClear={true}
                  onSearch={handleSearch}
                  onChange={onChange}
                >
                  {namesData.map(d => (
                    <Select.Option key={d.id}>{d.full_name}</Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
              <FormItem label="房支" hasFeedback {...formItemLayout}>
                <Select
                  labelInValue={false}
                  placeholder="请选择"
                  style={{ width: 120 }}
                  allowClear={true}
                  onChange={handleSelectChange}
                >
                  {branchListData.map(d => (
                    <Select.Option key={d.name}>{d.name}</Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col
              {...TwoColProps}
              xl={{ span: 10 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
            >
              <Row type="flex" align="middle" justify="space-between">
                <div>
                  <Button
                    type="primary"
                    className="margin-right"
                    icon="search"
                    onClick={this.handleSubmit}
                  >
                    搜索
                  </Button>
                  <Button className="margin-right" onClick={this.handleReset}>
                    重置
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={styles.placeholder}>
          <FamDiagram
            centerOnCursor={true}
            config={this.state.config}
            onCursorChanged={onCursorChanged}
          />
        </div>
        {modalVisible && <Modal {...modalProps} />}
        {peopleModalVisible && <PeopleModal {...peopleModalProps} />}
      </Page>
    )
  }
}

Tree.propTypes = {
  tree: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Tree
