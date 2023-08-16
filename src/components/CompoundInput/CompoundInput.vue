<template>
  <div>
    <!-- 输入框 -->
    <Input v-model="name" placeholder="请输入名称" />

    <!-- 下拉框 -->
    <Select v-model="type" placeholder="请选择类型">
      <Option value="type1">类型1</Option>
      <Option value="type2">类型2</Option>
      <!-- 添加更多选项 -->
    </Select>
  </div>
</template>

<script>
export default {
  name: "CompoundInput",
  components: {
    Input,
    Select,
    Option
  },
  props: {
    value: Object, // 绑定父组件的值，格式：{ name: '', type: '' }
  },
  data() {
    return {
      name: '',
      type: ''
    };
  },
  watch: {
    // 监听内部数据变化，更新父组件的值
    name(newName) {
      this.$emit('input', { ...this.value, name: newName });
    },
    type(newType) {
      this.$emit('input', { ...this.value, type: newType });
    }
  },
  mounted() {
    // 初始化内部数据
    this.name = this.value.name;
    this.type = this.value.type;
  }
}
</script>

<style scoped>

</style>
