<template>
  <Card>
    <Button type="primary" @click="modal = true">新建主题域</Button>
    <Modal
      v-model="modal"
      title="新建主题域"
      @on-ok="handleAddTopic"
      @on-cancel="cancel">
      <Form ref="formCustom" :model="formCustom" :label-width="80">
        <FormItem label="名称" prop="name">
          <Input clearable v-model="formCustom.name"></Input>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input clearable type="textarea" :rows="4"  v-model="formCustom.description"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Divider>主题域列表</Divider>
    <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"  style="white-space: pre-line"/>
  </Card>
</template>

<script>
import Tables from '_c/tables'
import PopConfirmButton from '_c/pop-confirm-button'
import { createTopic, deleteTopic, getAllTopics } from '@/api/assets'

export default {
  name: 'topic',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '名称', key: 'name', editable: true },
        { title: '描述', key: 'description', editable: true },
        {
          title: '操作',
          key: 'operation',
          width: 180,
          render: (h, { row }) => {
            const deleteButton = h(PopConfirmButton, {
              props: {
                buttonProps: {
                  size: 'small', type: 'primary'
                },
                style: {
                  marginRight: '1%'
                },
                buttonText: '删除',
                popTipTitle: '确定要删除这个主题域？',
                ok: () => this.handleDelete(row.initRowIndex)
              }
            })
            const buttons = [deleteButton]
            return h('div', buttons)
          }
        }
      ],
      tableData: [],
      modal: false,
      formCustom: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    handleDelete (index) {
      const id = this.tableData[index].id
      deleteTopic(id).then(response => {
        const res = response.data
        if (res.code === 0) {
          this.$Notice.success({
            title: 'Success',
            desc: '主题域' + this.tableData[index].name + '成功删除',
            duration: 15
          })
          this.refreshList()
        } else {
          this.$Notice.error({
            title: 'Failure',
            desc: '发生未知错误,请核验信息后重试',
            duration: 15
          })
        }
      })
    },
    // TODO: 设置表格可修改
    handleAddTopic () {
      console.log(this.formCustom)
      createTopic(this.formCustom).then(response => {
        const res = response.data
        console.log(res)
        if (res.code === 0) {
          this.$Notice.success({
            title: 'Success',
            desc: res.data,
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
            desc: '发生未知错误,请核验配置信息后重试',
            duration: 15
          })
        }
      })
    },
    cancel () {
      this.modal = false
    },
    refreshList () {
      getAllTopics().then(res => {
        this.tableData = res.data
      })
    }
  },
  mounted () {
    getAllTopics().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style scoped>

</style>
