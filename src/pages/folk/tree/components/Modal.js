import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Descriptions, Modal } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import locale from 'antd/es/date-picker/locale/zh_CN'
const dateFormat = 'YYYY-MM-DD'
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
class PeopleModal extends PureComponent {
  handleFields = fields => {
    const { birth, death } = fields
    if (birth != null) {
      fields.birth = moment(birth).format('YYYY-MM-DD')
    }
    if (death != null) {
      fields.death = moment(death).format('YYYY-MM-DD')
    }
    return fields
  }

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Descriptions
          bordered
          title=""
          size={'default'}
          layout="horizontal"
          bordered
        >
          <Descriptions.Item label="全名：" span={2}>
            {item.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="小名：" span={2}>
            {item.nickname}
          </Descriptions.Item>
          <Descriptions.Item label="性别：" span={2}>
            {item.gender}
          </Descriptions.Item>
          <Descriptions.Item label="房支：" span={2}>
            {item.branchName}
          </Descriptions.Item>
          <Descriptions.Item label="世序：" span={2}>
            {item.generationsText}
          </Descriptions.Item>
          <Descriptions.Item label="生产队：" span={2}>
            {item.prodTeamName}
          </Descriptions.Item>
          <Descriptions.Item label="手机：" span={2}>
            {item.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="职务：" span={2}>
            {item.job}
          </Descriptions.Item>
          <Descriptions.Item label="身高(厘米)：" span={2}>
            {item.height}
          </Descriptions.Item>
          <Descriptions.Item label="体重(公斤)：" span={2}>
            {item.weight}
          </Descriptions.Item>
          <Descriptions.Item label="已婚：" span={2}>
            {item.isMarried}
          </Descriptions.Item>
          <Descriptions.Item label="已育：" span={2}>
            {item.hasChild}
          </Descriptions.Item>
          <Descriptions.Item label="学历：" span={2}>
            {item.education}
          </Descriptions.Item>
          <Descriptions.Item label="工作单位：" span={2}>
            {item.company}
          </Descriptions.Item>
          <Descriptions.Item label="出生年月：" span={2}>
            {item.birth}
          </Descriptions.Item>
          <Descriptions.Item label="逝于：" span={2}>
            {item.death}
          </Descriptions.Item>
          <Descriptions.Item label="享年：" span={2}>
            {item.aliveAge}
          </Descriptions.Item>
          <Descriptions.Item label="简介：" span={2}>
            {item.brief}
          </Descriptions.Item>
          <Descriptions.Item label="备注：" span={2}>
            {item.remark}
          </Descriptions.Item>
          <Descriptions.Item label="启用：" span={2}>
            {item.valid}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    )
  }
}

PeopleModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default PeopleModal
