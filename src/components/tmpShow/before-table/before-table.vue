<template>
  <div>
    <tables ref='tables' editable searchable search-place='top' v-model='tableData' :columns='columns' @on-delete='handleDelete'/>
    <Modal
      v-model='modal'
      title='数据详细信息'
      @on-ok='ok'
      @on-cancel='cancel'>
      <p>名称: 产品价格</p>
      <p>字段名: price</p>
      <p>业务域: 制造域</p>
      <p>描述: 产品价格值</p>
      <p>语义标签: 产品信息，单价</p>
      <p>数据源类型: 结构化</p>
      <p>数据类型: INTEGER</p>
      <p>URI: data:manufacture/product/structure/postgresql://127.0.0.1:5432/manufacture/product/price</p>
      <p>原始数据地址: postgresql://127.0.0.1:5432/manufacture/product/price</p>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'

export default {
  name: 'before-table',
  components: {
    Tables
  },
  data () {
    return {
      modal: false,
      columns: [
        { title: '名称', key: 'name' },
        { title: '主题域', key: 'topic' },
        { title: '语义标签', key: 'tag' },
        { title: 'URI', key: 'URI', tooltip: true },
        {
          title: '操作',
          key: 'operation',
          render: (h, { row }) => {
            const viewButton = h('Button',
              {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                  marginRight: '1%'
                },
                on: {
                  click: () => {
                    this.modal = true
                  }
                }
              },
              '详情'
            )
            const buttons = [viewButton]
            return h('div', buttons)
          }
        }
      ],
      tableData: [
        { name: '数量', topic: '销售域', tag: '订单信息，销售数据', URI: 'data:sales/order/structure/postgresql://127.0.0.1:5432/sales/order/num' },
        { name: '产品价格', topic: '制造域', tag: '产品信息，单价', URI: 'data:manufacture/product/structure/postgresql://127.0.0.1:5432/manufacture/product/price' }
      ]
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  }
}
</script>

<style scoped>

</style>
