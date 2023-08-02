<template>
  <Steps :current=value>
    <Step title="选择数据类型"></Step>
    <Step title="数据源配置"></Step>
    <Step title="注册完成"></Step>
  </Steps>
</template>

<script>
export default {
  name: 'StepsComponent',
  props: {
    value: Number
  }
}
</script>

<style scoped>

</style>
