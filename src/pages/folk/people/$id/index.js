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

@connect(({ peopleDetail }) => ({ peopleDetail }))
class PeopleDetail extends PureComponent {
  render() {
    const {
      peopleDetail: { data },
    } = this.props
    return (
      <Page inner>
        <Descriptions title="个人详情" column={3} layout="horizontal" bordered>
          <Descriptions.Item label="全名">{data.fullName}</Descriptions.Item>
          <Descriptions.Item label="小名"> {data.nickname} </Descriptions.Item>
          <Descriptions.Item label="性别">{data.gender}</Descriptions.Item>

          <Descriptions.Item label="房支">{data.branchName}</Descriptions.Item>

          <Descriptions.Item label="世序">
            {data.generationsText}
          </Descriptions.Item>

          <Descriptions.Item label="入嗣">{data.heir}</Descriptions.Item>

          <Descriptions.Item label="生产队">
            {data.prodTeamName}
          </Descriptions.Item>

          <Descriptions.Item label="手机">{data.phoneNumber}</Descriptions.Item>

          <Descriptions.Item label="职务">{data.job}</Descriptions.Item>

          <Descriptions.Item label="身高(厘米)">
            {data.height}
          </Descriptions.Item>

          <Descriptions.Item label="体重(公斤)">
            {data.weight}
          </Descriptions.Item>

          <Descriptions.Item label="已婚">{data.isMarried}</Descriptions.Item>

          <Descriptions.Item label="已育">{data.hasChild}</Descriptions.Item>

          <Descriptions.Item label="学历">{data.education}</Descriptions.Item>

          <Descriptions.Item label="工作单位">{data.company}</Descriptions.Item>

          <Descriptions.Item label="出生年月">{data.birth}</Descriptions.Item>

          <Descriptions.Item label="逝于">{data.death}</Descriptions.Item>

          <Descriptions.Item label="简介">{data.brief}</Descriptions.Item>

          <Descriptions.Item label="备注">{data.remark}</Descriptions.Item>

          <Descriptions.Item label="启用">{data.valid}</Descriptions.Item>
        </Descriptions>
      </Page>
    )
  }
}
PeopleDetail.propTypes = {
  peopleDetail: PropTypes.object,
}

export default PeopleDetail
