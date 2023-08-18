<template>
  <div>
    <Divider>查询数据URI输入</Divider>
    <Row>
      <Col span='16' style='padding: 16px' >
        <Input v-model='value1'>
          <template #prepend>
            <span>data:</span>
          </template>
        </Input>
      </Col>
      <Col span='4' style='padding: 8px; height: 20px' >
        <Button type='primary' style='padding: 8px; height: 40px' @click='showResultFunc'>查询</Button>
      </Col>
    </Row>
    <Divider>数据血缘查询结果</Divider>
    <template v-if="showResult">
      <Tabs value='name1'>
        <TabPane label='结果图展示' name='name1'>
          <TracingGraph></TracingGraph>
        </TabPane>
        <TabPane label='字段上游血缘' name='name2'>
          <BeforeTable></BeforeTable>
        </TabPane>
        <TabPane label='字段下游血缘' name='name3'>
          <AfterTable></AfterTable>
        </TabPane>
      </Tabs>
    </template>
  </div>
</template>

<script>
import TracingGraph from '_c/tmpShow/tracing-graph'
import BeforeTable from '_c/tmpShow/before-table/before-table'
import AfterTable from '_c/tmpShow/after-table'

export default {
  name: 'tracing',
  components: {
    BeforeTable,
    TracingGraph,
    AfterTable
  },
  data () {
    return {
      value1: 'sales/order/structure/postgresql://127.0.0.1:5432/sales/order/total',
      showResult: false
    }
  },
  methods: {
    showResultFunc () {
      this.showResult = true
    }
  }
}
</script>

<style scoped>

</style>
