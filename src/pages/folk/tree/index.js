import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Page } from 'components'
import Modal from '../people/components/Modal'
import { Form, Select, Input, Row, Col, Button } from 'antd'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { FamDiagram } from 'basicprimitivesreact'
import primitives from 'basicprimitives'
import styles from './index.less'
import { isAllowed } from '../../auth'
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
@Form.create()
class Tree extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      config: {},
    }
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
    console.log(fields)
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
    console.log(config)
    this.setState({
      // highlightItem: itemid,
      config: {
        ...config,
        highlightItem: itemid,
      },
    })
  }

  render() {
    this.state.config = {
      ...this.state,
      pageFitMode: primitives.common.PageFitMode.AutoSize,
      highlightItem: 0,
      hasSelectorCheckbox: primitives.common.Enabled.False,
      /* Intervals */
      normalLevelShift: 50,
      dotLevelShift: 100,
      lineLevelShift: 10,
      normalItemsInterval: 10,
      dotItemsInterval: 7,
      lineItemsInterval: 5,
      cousinsIntervalMultiplier: 0,
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
    }

    const {
      location,
      dispatch,
      tree,
      loading,
      i18n,
      form,
      tree: { branchListData = [], namesData = [] },
    } = this.props
    const { modalVisible, currentItem, modalType } = tree
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
    const onCursorChanged = (event, data) => {
      console.log(data)
      const { context } = data
      dispatch({
        type: 'tree/getBranchList',
        payload: {},
      }),
        dispatch({
          type: 'tree/get',
          payload: context.id,
        }).then(() => {
          dispatch({
            type: 'tree/getSubDictListByParentCode',
            payload: { parentCode: 'education' },
          })
        })
    }
    const handleSearch = value => {
      dispatch({
        type: 'tree/getNames',
        payload: { name: value },
      })
    }
    const handleChange = value => {
      // this.update(1408999924)
      this.setState({ value, config: { highlightItem: 1766088249 } })
    }
    const handleSelectChange = value => {
      dispatch({
        type: 'tree/query',
        payload: { branch: value },
      })
    }
    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`people/${modalType}`],
      title: `${modalType === 'create' ? '创建族谱' : '更新族谱'}`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `people/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'people/hideModal',
        })
      },
    }
    this.setState(this.props.tree.list)

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
                  onChange={handleChange}
                >
                  {namesData.map(d => (
                    <Select.Option key={d}>{d}</Select.Option>
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
