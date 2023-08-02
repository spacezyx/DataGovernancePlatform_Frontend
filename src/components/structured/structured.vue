<template>
  <Card :autocomplete="false">
    <Form :model="dataInfo" :label-width="80">
      <FormItem label="Data Source">
        <Select v-model="dataInfo.databaseType">
          <Option v-for="item in databaseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="Name" :required="true">
        <Input v-model="dataInfo.name"></Input>
      </FormItem>
      <FormItem label="Comment" :required="true">
        <Input v-model="dataInfo.comment" type="textarea" :autosize="true"></Input>
      </FormItem>
      <FormItem label="Host" :required="true">
        <Input v-model="dataInfo.host"></Input>
      </FormItem>
      <FormItem label="Port" :required="true">
        <Input v-model="dataInfo.port"></Input>
      </FormItem>
      <FormItem label="User" :required="true">
        <Input v-model="dataInfo.user"></Input>
      </FormItem>
      <FormItem label="Password" type="password" :required="true">
        <Input v-model="dataInfo.password" type="password"></Input>
      </FormItem>
      <FormItem label="Database" :required="true">
        <Input v-model="dataInfo.database"></Input>
      </FormItem>
<!--      <FormItem label="URL">-->
<!--        <Input v-model="dataInfo.url"></Input>-->
<!--      </FormItem>-->
    </Form>
    <Button ghost type="primary" shape="circle" icon="ios-checkbox-outline" :loading="loading" @click="verifyConnection">
      <span v-if="!loading">连接测试</span>
      <span v-else>连接测试</span>
    </Button>
    <Divider>确认提交</Divider>
    <Button type="primary" shape="circle" long @click="addDatasource">提交</Button>
  </Card>
</template>

<script>
import { insertDataSource, verifyDataSource } from '@/api/datasource'

export default {
  name: 'structured',
  data () {
    return {
      dataInfo: {
        name: '',
        comment: '',
        host: '',
        port: '',
        user: '',
        password: '',
        database: '',
        dataType: 'STRUCTURED',
        databaseType: 'PostgreSQL'
      },
      loading: false,
      databaseList: [
        {
          value: 'PostgreSQL',
          label: 'PostgreSQL'
        },
        {
          value: 'MySQL',
          label: 'MySQL'
        },
        {
          value: 'SQLServer',
          label: 'SQL Server'
        }
      ]
    }
  },
  methods: {
    verifyConnection () {
      this.loading = true
      const dataInfoJson = {
        name: this.dataInfo.name,
        comment: this.dataInfo.comment,
        host: this.dataInfo.host,
        port: this.dataInfo.port,
        user: this.dataInfo.user,
        password: this.dataInfo.password,
        database: this.dataInfo.database,
        dataType: this.dataInfo.dataType,
        databaseType: this.dataInfo.databaseType
      }
      verifyDataSource(dataInfoJson).then((response) => {
        this.loading = false
        const res = response.data
        if (res.code === 0) {
          this.$Notice.success({
            title: 'Success',
            desc: '数据库可成功连接',
            duration: 15
          })
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
    addDatasource () {
      const dataInfoJson = {
        name: this.dataInfo.name,
        comment: this.dataInfo.comment,
        host: this.dataInfo.host,
        port: this.dataInfo.port,
        user: this.dataInfo.user,
        password: this.dataInfo.password,
        database: this.dataInfo.database,
        dataType: this.dataInfo.dataType,
        databaseType: this.dataInfo.databaseType
      }
      insertDataSource(dataInfoJson).then((response) => {
        const res = response.data
        console.log(res)
        if (res.code === 0) {
          this.$Notice.success({
            title: 'Success',
            desc: res.data,
            duration: 15
          })
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
    }
  }
}
</script>

<style scoped>

</style>
