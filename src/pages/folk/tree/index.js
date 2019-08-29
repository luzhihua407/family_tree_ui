import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { OrgDiagram } from 'basicprimitivesreact'
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
    const photos = {
      a:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxICRTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dhls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0eut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr65tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxtiPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII=',
    }
    const { location, dispatch, tree, loading, i18n } = this.props
    const { query, pathname } = location
    this.setState({ items: this.props.tree.list })
    const handleRefresh = newQuery => {
      dispatch({
        type: 'tree/query',
        payload: newQuery,
      })
    }

    const listProps = {
      loading: loading.effects['tree/query'],
    }

    const config = {
      ...this.state,
      pageFitMode: primitives.common.PageFitMode.AutoSize,
      buttonsPanelSize: 40,
    }
    return (
      <div className="placeholder">
        <OrgDiagram centerOnCursor={true} config={config} />
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
