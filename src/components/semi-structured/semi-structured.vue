<template>
  <Card>
    <Form :model="dataInfo" :label-width="80">
      <FormItem label="Data Source">
        <Select v-model="dataInfo.dataBaseType">
          <Option v-for="item in databaseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="Name">
        <Input v-model="dataInfo.name"></Input>
      </FormItem>
      <FormItem label="Comment">
        <Input v-model="dataInfo.comment" type="textarea" :autosize="true"></Input>
      </FormItem>
      <FormItem label="Host">
        <Input v-model="dataInfo.host"></Input>
      </FormItem>
      <FormItem label="Port">
        <Input v-model="dataInfo.port"></Input>
      </FormItem>
      <FormItem label="User">
        <Input v-model="dataInfo.user"></Input>
      </FormItem>
      <FormItem label="Password">
        <Input v-model="dataInfo.password"></Input>
      </FormItem>
      <FormItem label="Database">
        <Input v-model="dataInfo.database"></Input>
      </FormItem>
      <!--      <FormItem label="URL">-->
      <!--        <Input v-model="dataInfo.url"></Input>-->
      <!--      </FormItem>-->
    </Form>
    <Button ghost type="primary" shape="circle" icon="ios-checkbox-outline" :loading="loading" @click="toLoading">
      <span v-if="!loading">连接测试</span>
      <span v-else>连接测试</span>
    </Button>
    <Divider>确认提交</Divider>
    <Button type="primary" shape="circle" long>提交</Button>
  </Card>
</template>

<script>
export default {
  name: 'semi-structured',
  data () {
    return {
      dataInfo: {
        name: '',
        comment: '',
        dataBaseType: 'MongoDB',
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
      },
      loading: false,
      databaseList: [
        {
          value: 'MongoDB',
          label: 'MongoDB'
        },
        {
          value: 'Couchbase',
          label: 'Couchbase'
        }
      ]
    }
  },
  methods: {
    toLoading () {
      this.loading = true
      setTimeout(() => {
        // TODO: 改成真实的连接测试
        this.loading = false
        this.$Message.success('数据库连接成功')
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
