<template>
  <div>
    <Card :padding="36">
<!--      <StepsComponent :value="current"></StepsComponent>-->
      <Divider>数据源类型选择</Divider>
      <Select v-model="model" style="width:200px">
        <Option v-for="item in dataTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Divider orientation="left" plain>数据源信息</Divider>
      <template v-if="model === 'STRUCTURED'">
        <Structured/>
      </template>
      <template v-if="model === 'SEMI_STRUCTURED'">
        <SemiStructured/>
      </template>
      <template v-if="model === 'UNSTRUCTURED'">
        <Unstructured/>
      </template>
    </Card>
  </div>
</template>

<script>
import StepsComponent from '_c/steps'
import Structured from '_c/structured'
import SemiStructured from '_c/semi-structured'
import Unstructured from '_c/unstructured/unstructured'
export default {
  name: 'register',
  data () {
    return {
      current: 0,
      dataTypeList: [
        {
          value: 'STRUCTURED',
          label: '结构化数据'
        },
        {
          value: 'SEMI_STRUCTURED',
          label: '半结构化数据'
        },
        {
          value: 'UNSTRUCTURED',
          label: '非结构化数据'
        }
      ],
      model: 'STRUCTURED'
    }
  },
  components: {
    Unstructured,
    StepsComponent,
    Structured,
    SemiStructured
  },
  methods: {
    next () {
      if (this.current === 3) {
        this.current = 0
      } else {
        this.current += 1
      }
    }
  }
}
</script>

<style scoped>

</style>
