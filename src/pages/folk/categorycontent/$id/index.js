import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import {
  PageHeader,
  Descriptions,
  Dropdown,
  Icon,
  Button,
  Tag,
  Typography,
  Row,
} from 'antd'

@connect(({ categoryContentDetail }) => ({ categoryContentDetail }))
class CategoryContentDetail extends PureComponent {
  render() {
    const {
      categoryContentDetail: { data },
    } = this.props
    return (
      <Page inner>
        <PageHeader title={data.title} subTitle={data.subTitle}>
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
        </PageHeader>
      </Page>
    )
  }
}
CategoryContentDetail.propTypes = {
  categoryContentDetail: PropTypes.object,
}

export default CategoryContentDetail
