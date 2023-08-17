<template>
  <div>
    <div style='height:calc(60vh);'>
      <RelationGraph ref='seeksRelationGraph' :options='graphOptions' :on-node-click='onNodeClick' :on-line-click='onLineClick' />
    </div>
  </div>
</template>

<script>

import RelationGraph from 'relation-graph'
export default {
  name: 'tracing-graph',
  components: { RelationGraph },
  data () {
    return {
      graphOptions: {
        allowSwitchLineShape: true,
        defaultNodeBorderWidth: 0,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        // allowAutoLayoutIfSupport: true,
        // 这里可以参考'Graph 图谱'中的参数进行设置
        layouts: [
          {
            layoutName: 'force'
          }
        ]
        // 这里可以参考'Graph 图谱'中的参数进行设置
      }
    }
  },
  mounted () {
    this.showSeeksGraph()
  },
  methods: {
    showSeeksGraph () {
      const __graph_json_data = {
        rootId: 'c',
        nodes: [
          { id: 'a', text: '数量', color: '#B1BB96' },
          { id: 'b', text: '产品价格', color: '#B1BB96' },
          { id: 'c', text: '订单总额', color: '#F68A08' },
          { id: 'd', text: '收入', color: '#65A3B7' },
          { id: 'e', text: '利润', color: '#65A3B7' }
        ],
        lines: [
          { from: 'a', to: 'c' },
          { from: 'b', to: 'c' },
          { from: 'c', to: 'd' },
          { from: 'd', to: 'e' }
        ]
      }
      // 以上数据中的node和link可以参考'Node节点'和'Link关系'中的参数进行配置
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed
      })
    },
    onNodeClick (nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick (lineObject, $event) {
      console.log('onLineClick:', lineObject)
    }
  }
}
</script>

<style scoped>

</style>
