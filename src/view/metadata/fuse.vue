<template>
  <div>
    <Select v-model="model" style="width:200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <div style='height:calc(80vh - 50px); margin-top: 8px'>
      <RelationGraph ref='seeksRelationGraph' :options='graphOptions' :on-node-click='onNodeClick' :on-line-click='onLineClick' />
    </div>
  </div>
</template>

<script>
// relation-graph也支持在main.js文件中使用Vue.use(RelationGraph);这样，你就不需要下面这一行代码来引入了。
import RelationGraph from 'relation-graph'
export default {
  name: 'fuse',
  components: { RelationGraph },
  data () {
    return {
      cityList: [
        {
          value: '设计域',
          label: '设计域'
        },
        {
          value: '制造域',
          label: '制造域'
        },
        {
          value: '运维域',
          label: '运维域'
        }
      ],
      model: '',
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
      }
    }
  },
  mounted () {
    this.showSeeksGraph()
  },
  methods: {
    showSeeksGraph () {
      const __graph_json_data = {
        rootId: 'a',
        nodes: [
          {
            id: 'a',
            text: '制造域',
            color: 'red'
          },
          {
            id: '64cca4955cf83a70c4959dc4',
            text: 'production0802',
            color: '#F68A08'
          },
          {
            id: '64dc7af3444414660ee4fcea',
            text: 'products',
            color: '#B1BB96'
          },
          {
            id: '64dc7af3444414660ee4fceamanufacturer_id',
            text: 'manufacturer_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceacategory_id',
            text: 'category_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceaprice',
            text: 'price',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceaproduct_id',
            text: 'product_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceaproduct_name',
            text: 'product_name',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceb',
            text: 'categories',
            color: '#B1BB96'
          },
          {
            id: '64dc7af3444414660ee4fcebcategory_name',
            text: 'category_name',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcebcategory_id',
            text: 'category_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcec',
            text: 'manufacturers',
            color: '#B1BB96'
          },
          {
            id: '64dc7af3444414660ee4fceccountry',
            text: 'country',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcecmanufacturer_id',
            text: 'manufacturer_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcecmanufacturer_name',
            text: 'manufacturer_name',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fced',
            text: 'orders',
            color: '#B1BB96'
          },
          {
            id: '64dc7af3444414660ee4fcedorder_date',
            text: 'order_date',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcedtotal_amount',
            text: 'total_amount',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcedcustomer_id',
            text: 'customer_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcedorder_id',
            text: 'order_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcee',
            text: 'order_details',
            color: '#B1BB96'
          },
          {
            id: '64dc7af3444414660ee4fceequantity',
            text: 'quantity',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceesubtotal',
            text: 'subtotal',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceeproduct_id',
            text: 'product_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceedetail_id',
            text: 'detail_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fceeorder_id',
            text: 'order_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcef',
            text: 'department',
            color: '#B1BB96'
          },
          {
            id: '64dc7af3444414660ee4fcefname',
            text: 'name',
            color: '#65A3B7'
          },
          {
            id: '64dc7af3444414660ee4fcefid',
            text: 'id',
            color: '#65A3B7'
          },
          {
            id: '64cca4bd5cf83a70c4959dc5',
            text: 'manufacture0803',
            color: '#F68A08'
          },
          {
            id: '64dc7ad0444414660ee4fce6',
            text: 'department',
            color: '#B1BB96'
          },
          {
            id: '64dc7ad0444414660ee4fce6name',
            text: 'name',
            color: '#65A3B7'
          },
          {
            id: '64dc7ad0444414660ee4fce6id',
            text: 'id',
            color: '#65A3B7'
          },
          {
            id: '64dc7ad0444414660ee4fce7',
            text: 'employee',
            color: '#B1BB96'
          },
          {
            id: '64dc7ad0444414660ee4fce7department_id',
            text: 'department_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7ad0444414660ee4fce7name',
            text: 'name',
            color: '#65A3B7'
          },
          {
            id: '64dc7ad0444414660ee4fce7id',
            text: 'id',
            color: '#65A3B7'
          },
          {
            id: '64dc7ad0444414660ee4fce8',
            text: 'employeeproject',
            color: '#B1BB96'
          },
          {
            id: '64dc7ad0444414660ee4fce8project_id',
            text: 'project_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7ad0444414660ee4fce8employee_id',
            text: 'employee_id',
            color: '#65A3B7'
          },
          {
            id: '64dc7ad0444414660ee4fce9',
            text: 'project',
            color: '#B1BB96'
          },
          {
            id: '64dc7ad0444414660ee4fce9name',
            text: 'name',
            color: '#65A3B7'
          },
          {
            id: '64dc7ad0444414660ee4fce9id',
            text: 'id',
            color: '#65A3B7'
          }
        ],
        lines: [
          {
            from: '64cca4955cf83a70c4959dc4',
            to: '64dc7af3444414660ee4fcea',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcea',
            to: '64dc7af3444414660ee4fceamanufacturer_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcea',
            to: '64dc7af3444414660ee4fceacategory_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcea',
            to: '64dc7af3444414660ee4fceaprice',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcea',
            to: '64dc7af3444414660ee4fceaproduct_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcea',
            to: '64dc7af3444414660ee4fceaproduct_name',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4955cf83a70c4959dc4',
            to: '64dc7af3444414660ee4fceb',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fceb',
            to: '64dc7af3444414660ee4fcebcategory_name',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fceb',
            to: '64dc7af3444414660ee4fcebcategory_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4955cf83a70c4959dc4',
            to: '64dc7af3444414660ee4fcec',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcec',
            to: '64dc7af3444414660ee4fceccountry',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcec',
            to: '64dc7af3444414660ee4fcecmanufacturer_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcec',
            to: '64dc7af3444414660ee4fcecmanufacturer_name',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4955cf83a70c4959dc4',
            to: '64dc7af3444414660ee4fced',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fced',
            to: '64dc7af3444414660ee4fcedorder_date',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fced',
            to: '64dc7af3444414660ee4fcedtotal_amount',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fced',
            to: '64dc7af3444414660ee4fcedcustomer_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fced',
            to: '64dc7af3444414660ee4fcedorder_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4955cf83a70c4959dc4',
            to: '64dc7af3444414660ee4fcee',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcee',
            to: '64dc7af3444414660ee4fceequantity',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcee',
            to: '64dc7af3444414660ee4fceesubtotal',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcee',
            to: '64dc7af3444414660ee4fceeproduct_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcee',
            to: '64dc7af3444414660ee4fceedetail_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcee',
            to: '64dc7af3444414660ee4fceeorder_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4955cf83a70c4959dc4',
            to: '64dc7af3444414660ee4fcef',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcef',
            to: '64dc7af3444414660ee4fcefname',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7af3444414660ee4fcef',
            to: '64dc7af3444414660ee4fcefid',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: 'a',
            to: '64cca4955cf83a70c4959dc4',
            text: '包含数据库',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4bd5cf83a70c4959dc5',
            to: '64dc7ad0444414660ee4fce6',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce6',
            to: '64dc7ad0444414660ee4fce6name',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce6',
            to: '64dc7ad0444414660ee4fce6id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4bd5cf83a70c4959dc5',
            to: '64dc7ad0444414660ee4fce7',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce7',
            to: '64dc7ad0444414660ee4fce7department_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce7',
            to: '64dc7ad0444414660ee4fce7name',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce7',
            to: '64dc7ad0444414660ee4fce7id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4bd5cf83a70c4959dc5',
            to: '64dc7ad0444414660ee4fce8',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce8',
            to: '64dc7ad0444414660ee4fce8project_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce8',
            to: '64dc7ad0444414660ee4fce8employee_id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64cca4bd5cf83a70c4959dc5',
            to: '64dc7ad0444414660ee4fce9',
            text: '包含数据表',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce9',
            to: '64dc7ad0444414660ee4fce9name',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: '64dc7ad0444414660ee4fce9',
            to: '64dc7ad0444414660ee4fce9id',
            text: '包含属性',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          },
          {
            from: 'a',
            to: '64cca4bd5cf83a70c4959dc5',
            text: '包含数据库',
            color: '#D2C0A5',
            fontColor: '#D2C0A5'
          }
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
