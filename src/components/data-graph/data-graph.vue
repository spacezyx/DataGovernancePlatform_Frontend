<template>
  <div>
    <div style="height:calc(85vh - 50px);">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" >
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// relation-graph也支持在main.js文件中使用Vue.use(RelationGraph);这样，你就不需要下面这一行代码来引入了。
import RelationGraph from 'relation-graph'
import { getNodeTextRange } from '@/api/datasource'
import { mapMutations } from 'vuex'

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
    ...mapMutations(['updateSelectedNode', 'updateRequestColumn']),
    updateV (value) {
      this.$store.commit('updateSelectedNode', value)
    },
    updataR (value) {
      this.$store.commit('updateRequestColumn', value)
    },
    showSeeksGraph (graph_json_data) {
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.seeksRelationGraph.setJsonData(graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed
      })
    },
    onNodeClick (nodeObject, $event) {
      const allLinks = this.$refs.seeksRelationGraph.getLinks()
      allLinks.forEach(link => { // 还原所有样式
        link.relations.forEach(line => {
          if (line.data.orignColor) {
            line.color = line.data.orignColor
          }
          if (line.data.orignFontColor) {
            line.fontColor = line.data.orignColor
          }
          if (line.data.orignLineWidth) {
            line.lineWidth = line.data.orignLineWidth
          }
        })
      })
      // 让与{nodeObject}相关的所有连线高亮
      allLinks.filter(link => (link.fromNode === nodeObject || link.toNode === nodeObject)).forEach(link => {
        link.relations.forEach(line => {
          line.data.orignColor = line.color
          line.data.orignFontColor = line.fontColor || line.color
          line.data.orignLineWidth = line.lineWidth || 1
          line.color = '#ff0000'
          line.fontColor = '#ff0000'
          line.lineWidth = 3
        })
      })
      // 有时候更改一些属性后，并不能马上同步到视图，这需要以下方法让视图强制根据数据同步到最新
      this.$refs.seeksRelationGraph.getInstance().dataUpdated()
      if(nodeObject.color === '#65A3B7') {
        this.searchRangeByNode(nodeObject)
      } else {
        this.updataR({})
        this.updateV([])
      }
    },
    // 查询操作
    searchRangeByNode (nodeObject) {
      let fatherNode, father
      let grandpaNode, grandpa
      const allLinks = this.$refs.seeksRelationGraph.getInstance().getLinks()
      // 找到对应的table
      allLinks.filter(link => (link.toNode === nodeObject)).forEach(link => {
        fatherNode = link.fromNode
        if (fatherNode.color === '#B1BB96') {
          console.log('fatherNode : ' + fatherNode)
          father = fatherNode
          const allFatherLinks = this.$refs.seeksRelationGraph.getLinks()
          allFatherLinks.filter(link => (link.toNode === father)).forEach(link => {
            grandpaNode = link.fromNode
            if (grandpaNode.color === '#F68A08') {
              grandpa = grandpaNode
              console.log('grandpaNode : ' + grandpaNode)
            }
          })
        }
      })
      let body = {
        id: grandpa.id,
        table: father.text,
        column: nodeObject.text
      }
      console.log('body : ' + body.id + body.table + body.column)
      getNodeTextRange(body).then((response) => {
        const res = response.data
        this.updataR(body)
        this.updateV(res)
      })
    },
    onLineClick (lineObject, $event) {
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
