<template>
  <div>
    <Card>
      <Table :columns="columns" :data="tableData" row-key="id" :selectable="true" :selected.sync="selectedRows">
        <template slot-scope="{ row, index }" slot="content">
          <Checkbox v-model="row.selected" />
          <span>{{ row.title }}</span>
          <Select v-model="row.selection" style="width: 120px; position: fixed; z-index: 1001">
            <Option value="input">输入框</Option>
            <Option value="select">下拉框</Option>
          </Select>
          <template v-if="row.selection === 'input'">
            <Input v-model="row.inputValue" />
          </template>
          <template v-else-if="row.selection === 'select'">
            <Select v-model="row.selectValue">
              <Option value="option1">选项1</Option>
              <Option value="option2">选项2</Option>
            </Select>
          </template>
        </template>
      </Table>
    </Card>
    <Divider>
      确认融合
    </Divider>
  </div>
</template>

<script>
import { Table, Checkbox, Select, Option, Input } from 'iview';

export default {
  name: 'checkInfoTable',
  components: {
    Table,
    Checkbox,
    Select,
    Option,
    Input
  },
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '二选一',
          key: 'selection',
          render: (h, params) => {
            return h('Select', {
              props: {
                value: params.row.selection,
                transfer: true
              },
              on: {
                'on-change': value => {
                  params.row.selection = value;
                }
              }
            }, [
              h('Option', { props: { value: 'input' } }, '输入框'),
              h('Option', { props: { value: 'select' } }, '下拉框')
            ]);
          }
        },
        {
          title: '值',
          key: 'value',
          render: (h, params) => {
            if (params.row.selection === 'input') {
              return h('Input', {
                props: {
                  value: params.row.inputValue
                },
                on: {
                  'on-change': value => {
                    params.row.inputValue = value;
                  }
                }
              });
            } else if (params.row.selection === 'select') {
              return h('Select', {
                props: {
                  value: params.row.selectValue,
                  transfer: true
                },
                on: {
                  'on-change': value => {
                    params.row.selectValue = value;
                  }
                }
              }, [
                h('Option', { props: { value: 'option1' } }, '选项1'),
                h('Option', { props: { value: 'option2' } }, '选项2')
              ]);
            }
          }
        }
      ],
      tableData: [
        { id: 1, title: '项目1', selection: 'input', inputValue: '' },
        { id: 2, title: '项目2', selection: 'select', selectValue: 'option1' },
        { id: 3, title: '项目3', selection: 'input', inputValue: '' }
        // 可根据需要添加更多数据
      ],
      selectedRows: []
    }
  }
};
</script>

<style scoped>
/* 自定义样式 */
.overflow-select .ivu-select-dropdown {
  position: fixed;
  z-index: 1001; /* 设置合适的 z-index 值 */
}
</style>
