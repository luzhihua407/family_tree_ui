import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  DatePicker,
  Select,
  Upload,
  Icon,
  message,
  Row,
  Col,
} from 'antd'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { FamDiagram } from 'basicprimitivesreact'
import primitives from 'basicprimitives'
@withI18n()
@connect(({ tree, loading }) => ({ tree, loading }))
@Form.create()
class Tree extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cursorItem: 0,
      highlightItem: 0,
      items: [],
    }
  }

  render() {
    const {
      location,
      dispatch,
      tree,
      loading,
      i18n,
      form,
      tree: { branchListData = [] },
    } = this.props
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
    const handleSelectChange = value => {
      console.log(value)
      dispatch({
        type: 'tree/query',
        payload: { branch: value },
      })
    }
    this.setState(this.props.tree.list)

    const config = {
      ...this.state,
      pageFitMode: primitives.common.PageFitMode.AutoSize,
      buttonsPanelSize: 40,
      hasSelectorCheckbox: primitives.common.Enabled.False,
    }
    return (
      <div>
        <div>
          <Form layout="horizontal">
            <FormItem label="房支" hasFeedback {...formItemLayout}>
              {getFieldDecorator('peopleBranch', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
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
              )}
            </FormItem>
          </Form>
        </div>
        <div className="placeholder">
          <FamDiagram centerOnCursor={true} config={config} />
        </div>
      </div>
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
