<template>
  <div>
    <div style="height:calc(100vh - 50px);">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
    </div>
  </div>
</template>

<script>
// relation-graph也支持在main.js文件中使用Vue.use(RelationGraph);这样，你就不需要下面这一行代码来引入了。
import RelationGraph from 'relation-graph'
export default {
  name: 'data-graph',
  components: { RelationGraph },
  props: ['graph_json_data'],
  data () {
    return {
      graphOptions: {
        allowSwitchLineShape: true,
        defaultNodeBorderWidth: 0,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        // allowAutoLayoutIfSupport: true,
        // 这里可以参考"Graph 图谱"中的参数进行设置
        layouts: [
          {
            layoutName: 'force'
          }
        ]
      }
    }
  },
  mounted () {
    this.showSeeksGraph(this.graph_json_data)
  },
  methods: {
    showSeeksGraph (graph_json_data) {
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.seeksRelationGraph.setJsonData(graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed
      })
    },
    onNodeClick (nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick (lineObject, $event) {
      console.log('onLineClick:', lineObject)
    }
  },
  watch: {
    // 使用 watch 监听父组件的 count 值，并在 count 更新时自动运行相关函数
    graph_json_data () {
      this.showSeeksGraph(this.graph_json_data)
    }
  }
}
</script>
