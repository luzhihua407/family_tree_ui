import { Descriptions } from 'antd'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import styles from './index.less'

@connect(({ cemeteryDetail }) => ({ cemeteryDetail }))
class CemeteryDetail extends PureComponent {
  render() {
    const {
      cemeteryDetail: { data },
    } = this.props
    return (
      <Page inner>
        <Descriptions title="" column={1}>
          <Descriptions.Item label="祖名">{data.name}</Descriptions.Item>
          <Descriptions.Item label="葬地点">{data.address}</Descriptions.Item>
          <Descriptions.Item label="宝地形状">{data.shape}</Descriptions.Item>
          <Descriptions.Item label="备注">{data.remark}</Descriptions.Item>
        </Descriptions>
      </Page>
    )
  }
}
CemeteryDetail.propTypes = {
  cemeteryDetail: PropTypes.object,
}

export default CemeteryDetail
