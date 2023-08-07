<template>
  <div>
    <div style="height:calc(100vh - 50px);">
      <Select v-model="selectItem" style="width:200px" @on-change="selectedMethod">
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div style="padding-top: 4px">
        <div class="left">
          <DataGraph :graph_json_data="graph_json_data" />
        </div>
        <div class="right">
          <Card>
            xxx
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DataGraph from '_c/data-graph/data-graph'
import { getMetadataGraph, getSelectDatasourceList } from '@/api/datasource'
export default {
  name: 'metadata-graph',
  components: { DataGraph },
  data () {
    return {
      selectList: {
        type: Array, // 假设 selectList 的类型是数组
        default: () => [] // 设置默认值，根据实际需要
      },
      selectItem: '',
      graph_json_data: {}
      // graph_json_data: {
      //   rootId: 'a',
      //   nodes: [
      //     { id: 'a', text: 'A', borderColor: 'yellow' },
      //     { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
      //     { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
      //     { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
      //   ],
      //   lines: [
      //     { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
      //     { from: 'a', to: 'c', text: '关系2' },
      //     { from: 'a', to: 'e', text: '关系3' },
      //     { from: 'b', to: 'e', color: '#67C23A' }
      //   ]
      // }
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
