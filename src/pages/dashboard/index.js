import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Avatar, Select } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label } from 'bizcharts'
import {
  NumberCard,
  Quote,
  Sales,
  Weather,
  RecentSales,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
} from './components'
import styles from './index.less'
import DataSet from '@antv/data-set'
import VillageProfile from './components/village-profile'
const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, dashboard, loading }) => ({
  avatar: app.user.avatar,
  username: app.user.username,
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  render() {
    const { DataView } = DataSet
    const { avatar, username, dashboard, loading } = this.props
    const {
      villageInfo,
      numByBranch,
      numByGender,
      numByEducation,
      numByProTeam,
      genderByGenerations,
      generationsNames,
    } = dashboard
    const cols = {
      num: {
        tickInterval: 1,
      },
    }
    const ds = new DataSet()
    const dv = ds.createView().source(genderByGenerations)
    dv.transform({
      type: 'fold',
      fields: generationsNames,
      // 展开字段集
      key: '世代',
      // key字段
      value: '人数', // value字段
    })
    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <VillageProfile data={villageInfo} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Chart height={200} data={numByEducation} scale={cols} forceFit>
                <Axis name="name" />
                <Axis name="num" />
                <Tooltip
                  showTitle={false}
                  itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}人</li>'
                />
                <Geom type="interval" position="name*num" color="name" />
              </Chart>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Chart height={200} data={numByProTeam} scale={cols} forceFit>
                <Axis name="name" />
                <Axis name="num" />
                <Tooltip
                  showTitle={false}
                  itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}人</li>'
                />
                <Geom type="interval" position="name*num" color="name" />
              </Chart>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Chart
                height={200}
                data={numByGender}
                // scale={}
                forceFit
              >
                <Coord type="theta" radius={1} />
                <Axis name="num" />
                <Legend
                  position="right"
                  offsetY={-window.innerHeight / 2 + 120}
                  offsetX={-100}
                />
                <Tooltip
                  showTitle={false}
                  itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}人</li>'
                />
                <Geom
                  type="intervalStack"
                  position="num"
                  color="gender"
                  style={{
                    lineWidth: 1,
                    stroke: '#fff',
                  }}
                >
                  <Label content="gender" />
                </Geom>
              </Chart>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card
              bordered={true}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Chart
                height={200}
                data={numByBranch}
                scale={{
                  num: {
                    tickInterval: 10,
                  },
                }}
                forceFit
              >
                <Axis name="name" />
                <Axis name="num" />
                <Tooltip
                  showTitle={false}
                  itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}人</li>'
                />
                <Geom type="interval" position="name*num" color="name" />
              </Chart>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card
              bordered={true}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Chart height={400} data={dv} forceFit>
                <Axis name="世代" />
                <Axis name="人数" />
                <Legend />
                <Tooltip
                  crosshairs={{
                    type: 'y',
                  }}
                />
                <Geom
                  type="interval"
                  position="世代*人数"
                  color={'name'}
                  adjust={[
                    {
                      type: 'dodge',
                      marginRatio: 1 / 32,
                    },
                  ]}
                />
              </Chart>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

Dashboard.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard
