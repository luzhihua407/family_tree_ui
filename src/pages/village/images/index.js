import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Empty, Card } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
@withI18n()
@connect(({ villageImage, loading }) => ({ villageImage, loading }))
class VillageImage extends PureComponent {
  render() {
    const { Meta } = Card
    const { location, dispatch, villageImage, loading, i18n } = this.props
    const { images } = villageImage
    let empty
    if (images.length == 0) {
      empty = <Empty />
    }

    return (
      <Page inner>
        {empty}
        {images.map(d => (
          <Card
            key={d.id}
            hoverable={true}
            style={{ width: d.width, marginTop: 16 }}
            cover={<img alt="#" src={d.path} />}
          >
            <Meta title="图片描述" description={d.brief} />
          </Card>
        ))}
      </Page>
    )
  }
}

VillageImage.propTypes = {
  villageImage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default VillageImage
