<template>
  <Card shadow title="统计数据">
    <Row type="flex" justify="space-around">
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>今日消费(对比昨日)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="consume_today"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>本周消费(对比上周)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="consume_this_week"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>本月消费(对比上月)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="consume_this_month"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>当季消费(对比上季)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="consume_this_quarter"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>当年消费(对比去年)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="consume_this_year"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>消费总计</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="consume_total"></div></Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <div style="margin-top:50px"></div>
    <Row type="flex" justify="space-around">
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>今日充值(对比昨日)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="recharge_today"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>本周充值(对比上周)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="recharge_this_week"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>本月充值(对比上月)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="recharge_this_month"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>当季充值(对比上季)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="recharge_this_quarter"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>当年充值(对比去年)</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="recharge_this_year"></div></Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Row type="flex" justify="center">
            <Col><span>充值总计</span></Col>
          </Row>
          <div style="margin-bottom:20px"></div>
          <Row type="flex" justify="center">
            <Col><div id="recharge_total"></div></Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </Card>
</template>

<script>

export default {
  name: 'home',
  components: {},
  data () {
    return {
      consumeResult: {},
      rechargeResult: {}
    }
  },
  methods: {
    getRingProgressData (currentData, lastData) {
      let returnData = {
        width: 100,
        height: 100,
        autoFit: false,
        percent: 0,
        color: ['#F4664A', '#E8EDF3'],
        innerRadius: 0.85,
        radius: 1,
        statistic: {
          title: {
            style: { color: '#363636', fontSize: '20px', lineHeight: '20px' },
            formatter: () => '¥' + currentData
          },
          content: {}
        }
      }
      if (lastData === 0) {
        returnData.statistic.content.formatter = () => '- -'
      } else {
        returnData.percent = currentData / lastData
      }
      // 按颜色分级 红橙蓝绿0.3,0.7,1
      // 大于0.3 小于0.7 橙
      // 大于等于0.7 小于1 蓝
      if (returnData.percent >= 0.7 && returnData.percent < 1) returnData.color = ['#0099CC', '#E8EDF3']
      // 小于等于 0.3 红
      else if (returnData.percent <= 0.3) returnData.color = ['#FF0033', '#E8EDF3']
      // 大于等于 1 绿
      else if (returnData.percent >= 1) returnData.color = ['#33CC33', '#E8EDF3']
      return returnData
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
