<template>
  <div>
    <div style="height:calc(85vh - 50px);">
      <Select v-model="selectItem" style="width:200px" @on-change="selectedMethod">
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div style="padding-top: 4px">
        <div class="left">
          <DataGraph :graph_json_data="graph_json_data" />
        </div>
        <div class="right">
          <Card style="height:calc(85vh - 50px)">
            <Divider>属性取值</Divider>
            <Row>
              <Col>
                <Select v-model="value" style="width:200px" multiple>
                  <Option v-for="item in localValue" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col style="margin-top: 10px">
                <Button type="primary" @click="searchButtonClick">确认</Button>
              </Col>
            </Row>
            <Divider>符合条件的数据</Divider>
            <Table :columns="tableColumns" :data="tableData"></Table>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DataGraph from '_c/data-graph/data-graph'
import { getMetadataGraph, getRangeValue, getSelectDatasourceList } from '@/api/datasource'
import { mapState } from 'vuex'
import { Table } from 'iview'
export default {
  name: 'metadata-graph',
  components: { DataGraph, Table },
  data () {
    return {
      value: '',
      selectList: {
        type: Array, // 假设 selectList 的类型是数组
        default: () => [] // 设置默认值，根据实际需要
      },
      selectItem: '',
      graph_json_data: {},
      tableColumns: [],
      tableData: []
    }
  },
  mounted () {
    getSelectDatasourceList().then(res => {
      this.selectList = res.data
      console.log(this.selectList)
    })
  },
  methods: {
    selectedMethod () {
      console.log(this.selectItem)
      getMetadataGraph(this.selectItem).then(res => {
        this.graph_json_data = res.data
        console.log(this.graph_json_data)
      })
    },
    searchButtonClick () {
      console.log(this.value)
      console.log(this.localRequestColumn)
      let body = {
        id: this.localRequestColumn.id,
        table: this.localRequestColumn.table,
        column: this.localRequestColumn.column,
        attr: this.value
      }
      getRangeValue(body).then(res => {
        this.tableData = res.data
        console.log(this.tableData)
        this.tableColumns = Object.keys(this.tableData[0]).map(column => ({
          title: column,
          key: column
        }))
      })
    }
  },
  computed: {
    ...mapState(['selectedNode', 'requestColumn']),
    localValue () {
      console.log(this.$store.state.app.selectedNode)
      this.value = ''
      this.tableColumns = []
      this.tableData = []
      return this.$store.state.app.selectedNode // 将映射的状态属性赋值给本地变量
    },
    localRequestColumn () {
      return this.$store.state.app.requestColumn
    }
  }
}
</script>

<style>
.left {
  float: left;
  width: 75%;
  background-color: #f2f2f2;
}

.centered-layout {
  display: flex;
  justify-content: center;
  align-items: center
}

.right {
  float: left;
  width: 25%;
  padding-left: 4px;
  background-color: #e6e6e6;
}

/* 清除浮动 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
</style>
