<template>
  <div>
    <Divider>分类检索 / 模糊查询</Divider>
    <Row type='flex' align='middle' class='row'>
      <Col span='4' style='padding: 8px'>
        <label class='select-label'>关键词查询</label>
        <Input v-model='input1' placeholder='Input 1' />
      </Col>
      <Col span='4' style='padding: 8px'>
        <label class='select-label'>按业务域分类过滤</label>
        <Select v-model='select2' style='width: 100%;'>
          <Option value='设计域'>设计域</Option>
          <Option value='制造域'>制造域</Option>
          <Option value='运维域'>运维域</Option>
          <!-- 其他选项 -->
        </Select>
      </Col>
      <Col span='4' style='padding: 8px'>
        <label class='select-label'>按数据源类型过滤</label>
        <Select v-model='select1' style='width: 100%;'>
          <Option value='结构化'>结构化</Option>
          <Option value='非结构化'>非结构化</Option>
          <Option value='半结构化'>半结构化</Option>
          <!-- 其他选项 -->
        </Select>
      </Col>
      <Col span='12' style='padding: 8px'>
        <label class='select-label'>根据语义标签过滤</label>
        <Select v-model='select3' style='width: 100%;' multiple>
          <Option value='决策层'>决策层</Option>
          <Option value='感知层'>感知层</Option>
          <Option value='用户信息'>用户信息</Option>
          <Option value='产品信息'>产品信息</Option>
          <!-- 其他选项 -->
        </Select>
      </Col>
    </Row>
    <Row>
      <Col span='24' style='padding: 8px'>
        <Input v-model='input2' placeholder='请输入内容进行模糊查询' />
      </Col>
    </Row>
    <Row>
      <Col span='8' style='padding: 8px' >
        <Select v-model='granularity' style='padding: 8px;width: 400px; height: 20px'>
          <Option v-for='item in granularityList' :value='item' :key='item'>{{ item }}</Option>
        </Select>
      </Col>
      <Col span='4' style='padding: 8px; height: 20px' >
        <Button type='primary' style='padding: 8px; height: 40px' @click="showTable">查询</Button>
      </Col>
    </Row>
    <Divider>查询结果</Divider>
    <template v-if="tableShow">
      <tables ref='tables' editable searchable search-place='top' v-model='tableData' :columns='columns' @on-delete='handleDelete'/>
      <Button style='margin: 10px 0;' type='primary' @click='exportExcel'>导出所有数据</Button>
    </template>
    <Modal
      v-model='modal'
      title='数据详细信息'
      @on-ok='ok'
      @on-cancel='cancel'>
      <p>业务域: 设计域</p>
      <p>名称: 产品图纸</p>
      <p>描述: 包括客户姓名、联系方式等信息的数据表</p>
      <p>语义标签: 客户信息，决策层</p>
      <p>数据源类型: 非结构化</p>
      <p>URI: data:design/drawing/unstructure/ftp://myuser:mypassword@example.com:21/paper</p>
      <p>原始数据地址: ftp://myuser:mypassword@example.com:21/</p>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'

export default {
  name: 'search',
  components: {
    Tables
  },
  data () {
    return {
      input1: '',
      input2: '',
      select1: '',
      select2: '',
      select3: '',
      modal: false,
      tableShow: false,
      granularity: '数据表级别',
      granularityList: [
        '数据源级别',
        '数据表级别',
        '属性级别'
      ],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
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
        { name: '产品图纸', topic: '设计域', tag: '客户信息，决策层', URI: 'data:design/drawing/unstructure/ftp://myuser:mypassword@example.com:21/paper' },
        { name: '订单数据', topic: '销售域', tag: '销售数据，客户信息，订单信息，决策层', URI: 'data:sales/order/structure/postgresql://127.0.0.1:5432/sales/order' },
        { name: '产品信息', topic: '制造域', tag: '产品信息，决策层', URI: 'data:manufacture/product/structure/postgresql://127.0.0.1:5432/manufacture/product' },
        { name: '客户数据', topic: '运维域', tag: '客户信息，决策层', URI: 'data:devops/customer/semistructure/mongodb://127.0.0.1:27012/devops/customer' }
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
    },
    // ok () {
    //   this.$Message.info('Clicked ok')
    // },
    // cancel () {
    //   this.$Message.info('Clicked cancel')
    // },
    showTable () {
      this.tableShow = true
    }
  }
}
</script>

<style scoped>

</style>
