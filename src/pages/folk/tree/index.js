import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { FamDiagram } from 'basicprimitivesreact'
import primitives from 'basicprimitives'
@withI18n()
@connect(({ tree, loading }) => ({ tree, loading }))
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
    const { location, dispatch, tree, loading, i18n } = this.props
    const { query, pathname } = location
    this.setState(this.props.tree.list)

    const listProps = {
      //loading: loading.effects['tree/query'],
    }

    const config = {
      ...this.state,
      pageFitMode: primitives.common.PageFitMode.AutoSize,
      buttonsPanelSize: 40,
    }
    return (
      <div className="placeholder">
        <FamDiagram centerOnCursor={true} config={config} />
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
