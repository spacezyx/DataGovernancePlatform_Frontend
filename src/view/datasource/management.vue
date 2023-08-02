<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
<!--      <Button style="margin: 20px 0;" type="primary" @click="exportExcel" >导出为Csv文件</Button>-->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import PopConfirmButton from '_c/pop-confirm-button'
import { deleteDatasource, getManageVO } from '@/api/datasource'
export default {
  name: 'management',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          title: '数据源名称',
          key: 'name'
        },
        {
          title: '数据源类型',
          key: 'dataType'
        },
        {
          title: '连接方式',
          key: 'databaseType'
        },
        {
          title: '数据源描述',
          key: 'comment'
        },
        {
          title: '操作',
          key: 'operation',
          render: (h, { row }) => {
            const deleteButton = h(PopConfirmButton, {
              props: {
                buttonProps: {
                  size: 'small', type: 'error'
                },
                buttonText: '删除',
                popTipTitle: '确定要删除这个数据源？',
                ok: () => this.handleDelete(row.initRowIndex)
              }
            })
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
                    this.show(row.initRowIndex)
                  }
                }
              },
              '详情'
            )
            const buttons = [viewButton, deleteButton]
            return h('div', buttons)
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (index) {
      console.log(index)
      const id = this.tableData[index].id
      deleteDatasource(id).then(response => {
        const res = response.data
        if (res.code === 0) {
          this.$Notice.success({
            title: 'Success',
            desc: '数据源' + this.tableData[index].name + '成功删除',
            duration: 15
          })
          this.refreshList()
        } else if (res.code === -1) {
          this.$Notice.error({
            title: 'Failure',
            desc: res.message,
            duration: 15
          })
        } else {
          this.$Notice.error({
            title: 'Failure',
            desc: '发生未知错误,请核验信息后重试',
            duration: 15
          })
        }
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    show (index) {
      this.$Modal.info({
        title: '数据源ID: ' + this.tableData[index].id,
        content: `数据源名称: ${this.tableData[index].name}<br>数据源类型: ${this.tableData[index].dataType}<br>连接方式: ${this.tableData[index].databaseType}` +
          `<br>Host: ${this.tableData[index].host}<br>Port: ${this.tableData[index].port}<br>用户名: ${this.tableData[index].user}` +
          `<br>数据库名称: ${this.tableData[index].database}<br>数据源描述: ${this.tableData[index].comment}`
      })
    },
    refreshList () {
      getManageVO().then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
    }
  },
  mounted () {
    getManageVO().then(res => {
      this.tableData = res.data
      console.log(this.tableData)
    })
  }
}
</script>

<style>

</style>
