<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"  style="white-space: pre-line"/>
      <!--      <Button style="margin: 20px 0;" type="primary" @click="exportExcel" >导出为Csv文件</Button>-->
    </Card>
    <Modal
      v-model="modal"
      title="元数据融合"
      @on-ok="handleMetaFuse"
      @on-cancel="cancel">
<!--      <template v-if="hasTrueFuseFlag===false">-->
<!--        <Radio v-model="single">融合图谱中不存在数据，此数据源将作为初始数据</Radio>-->
<!--      </template>-->
      <Divider>
        选择主题域
      </Divider>
      <Select v-model="selectTopic">
        <Option v-for="item in topics" :key="item.id" :value="item.id">{{ item.name }}</Option>
      </Select>
      <Divider>
        信息填充
      </Divider>
      <Form ref="formValidate" :model="formValidate" >
        <FormItem label="中文名" prop="name">
          <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="描述" prop="mail">
          <Input v-model="formValidate.mail"></Input>
        </FormItem>
        <FormItem label="所有者" prop="mail">
          <Input v-model="formValidate.mail"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="checkModal"
      title="融合信息调整"
      footer-hide="true">
      <Divider>
        元数据融合调整
      </Divider>
      <CheckInfoTable></CheckInfoTable>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import PopConfirmButton from '_c/pop-confirm-button'
import { extractMetadata, fuseTest, getDatasourceList } from '@/api/datasource'
import { getAllTopics } from '@/api/assets'
import CheckInfoTable from '_c/check-info-table/check-info-table'
export default {
  name: 'datasource',
  components: {
    CheckInfoTable,
    Tables
  },
  data () {
    return {
      checkModal: false,
      formValidate: {},
      modal: false,
      selectTopic: '',
      single: true,
      fuseId: '',
      checkColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Type',
          key: 'newFlag'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      columns: [
        {
          type: 'expand',
          width: 50,
          // TODO:这个位置会产生前端报错（indexOf）
          render: (h, { row: { extractFlag, fuseFlag, comment, lastFuseTime, lastExtractTime } }) => {
            if (extractFlag) {
              this.tableExpandData.lastExtractTime = lastExtractTime
            } else {
              this.tableExpandData.lastExtractTime = '此数据源尚未抽取'
            }
            if (fuseFlag) {
              this.tableExpandData.lastFuseTime = lastFuseTime
            } else {
              this.tableExpandData.lastFuseTime = '此数据源尚未融合'
            }

            let data = `上次抽取时间: ${this.tableExpandData.lastExtractTime}\n上次融合时间: ${this.tableExpandData.lastFuseTime}\n数据源描述: ${comment}`
            return h('div', data)
          }
        },
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
          title: '数据源地址',
          key: 'address',
          tooltip: true
        },
        {
          title: '抽取状态',
          key: 'extractFlag'
        },
        {
          title: '融合状态',
          key: 'fuseFlag'
        },
        {
          title: '操作',
          key: 'operation',
          width: 180,
          render: (h, { row }) => {
            const extractButton = h(PopConfirmButton, {
              props: {
                buttonProps: {
                  size: 'small', type: 'primary'
                },
                style: {
                  marginRight: '1%'
                },
                buttonText: '抽取',
                popTipTitle: '确定要抽取这个数据源的元数据信息？',
                ok: () => this.handleExtract(row.initRowIndex)
              }
            })
            const fuseButton = h(PopConfirmButton, {
              props: {
                buttonProps: {
                  size: 'small', type: 'success'
                },
                style: {
                  marginRight: '1%'
                },
                buttonText: '融合',
                popTipTitle: '确定要融合这个数据源的元数据信息？',
                ok: () => this.handleFuseClick(row.initRowIndex)
              }
            })
            const notFuseButton = h('Button',
              {
                props: {
                  size: 'small',
                  disabled: true
                },
                style: {
                  marginRight: '1%'
                }
              },
              '融合'
            )
            const viewButton = h('Button',
              {
                props: {
                  size: 'small',
                  type: 'info'
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
            if (row.extractFlag) {
              const buttons = [viewButton, extractButton, fuseButton]
              return h('div', buttons)
            } else {
              const buttons = [viewButton, extractButton, notFuseButton]
              return h('div', buttons)
            }
          }
        }
      ],
      tableData: [],
      tableExpandData: {
        lastExtractTime: '',
        lastFuseTime: ''
      },
      hasTrueFuseFlag: false,
      topics: []
    }
  },
  methods: {
    show (index) {
      if (this.tableData[index].extractFlag === false) {
        this.tableData[index].lastExtractTime = '此数据源尚未抽取'
      }
      if (this.tableData[index].fuseFlag === false) {
        this.tableData[index].lastFuseTime = '此数据源尚未融合'
      }
      this.$Modal.info({
        title: '数据源ID: ' + this.tableData[index].id,
        content: `数据源名称: ${this.tableData[index].name}<br>数据源类型: ${this.tableData[index].dataType}<br>连接方式: ${this.tableData[index].databaseType}` +
          `<br>Host: ${this.tableData[index].host}<br>Port: ${this.tableData[index].port}<br>用户名: ${this.tableData[index].user}` +
          `<br>数据源抽取状态: ${this.tableData[index].extractFlag}<br>数据源上次抽取时间: ${this.tableData[index].lastExtractTime}` +
          `<br>数据源融合状态: ${this.tableData[index].fuseFlag}<br>数据源上次融合时间: ${this.tableData[index].lastFuseTime}` +
          `<br>数据库名称: ${this.tableData[index].database}<br>数据源描述: ${this.tableData[index].comment}`
      })
    },
    refreshList () {
      getDatasourceList().then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
    },
    handleExtract (initRowIndex) {
      extractMetadata(this.tableData[initRowIndex].id).then(response => {
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
    handleFuseClick (initRowIndex) {
      this.modal = true
      this.hasTrueFuseFlag = this.tableData.some(item => item.fuseFlag === true)
      this.fuseId = this.tableData[initRowIndex].id
      this.getTopics()
    },
    cancel () {
      this.modal = false
    },
    handleMetaFuse () {
      this.modal = false
      let body = { 'id': this.fuseId, 'topicAreaId': this.selectTopic }
      fuseTest(body).then(response => {
        const res = response.data
        console.log(res)
      })
      this.checkModal = true
      this.refreshList()
    },
    handleFuseConfirm () {
      // TODO: 确认融合
    },
    getTopics () {
      getAllTopics().then(res => {
        this.topics = res.data
      })
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    }
  },
  mounted () {
    getDatasourceList().then(res => {
      this.tableData = res.data
      console.log(this.tableData)
    })
  }
}
</script>

<style>

</style>
