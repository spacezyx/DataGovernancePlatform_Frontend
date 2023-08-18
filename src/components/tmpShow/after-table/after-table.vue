<template>
  <div>
    <tables ref='tables' editable searchable search-place='top' v-model='tableData' :columns='columns' @on-delete='handleDelete'/>
    <Modal
      v-model='modal'
      title='数据详细信息'
      @on-ok='ok'
      @on-cancel='cancel'>
      <p>名称: 利润</p>
      <p>字段名: profit</p>
      <p>业务域: 销售域</p>
      <p>描述: 企业利润值</p>
      <p>语义标签: 利润，销售数据，决策域</p>
      <p>数据源类型: 结构化</p>
      <p>数据类型: DOUBLE</p>
      <p>URI: data:sales/statistic/structure/postgresql://127.0.0.1:5432/manufacture/statistic/profit</p>
      <p>原始数据地址: postgresql://127.0.0.1:5432/manufacture/statistic/profit</p>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'

export default {
  name: 'after-table',
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
        { name: '营收', topic: '销售域', tag: '营收，销售数据，决策域', URI: 'data:sales/statistic/structure/postgresql://127.0.0.1:5432/manufacture/statistic/income' },
        { name: '利润', topic: '销售域', tag: '利润，销售数据，决策域', URI: 'data:sales/statistic/structure/postgresql://127.0.0.1:5432/manufacture/statistic/profit' }
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
