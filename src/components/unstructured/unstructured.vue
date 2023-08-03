<template>
  <Card>
    <Form>
      <FormItem label="Name">
        <Input v-model="dataInfo.name"></Input>
      </FormItem>
      <FormItem label="Comment">
        <Input v-model="dataInfo.comment" type="textarea" :autosize="true"></Input>
      </FormItem>
    </Form>
    <Select v-model="model">
      <Option v-for="item in databaseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <template v-if="model === 'address'">
      <Divider>文件地址</Divider>
      <Input placeholder="请输入文件地址">文件地址</Input>
      <Button ghost type="primary" shape="circle" icon="ios-checkbox-outline" :loading="loading" @click="toLoading" style="margin-top: 16px">
        <span v-if="!loading">Test Address</span>
        <span v-else>Test Address</span>
      </Button>
    </template>
    <template v-if="model === 'upload'">
      <Upload
        style="margin-top: 16px"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>上传文件</p>
        </div>
      </Upload>
    </template>
    <Divider>确认提交</Divider>
    <Button type="primary" shape="circle" long>提交</Button>
  </Card>
</template>

<script>
export default {
  name: 'unstructured',
  data () {
    return {
      databaseList: [
        {
          value: 'address',
          label: '地址链接'
        },
        {
          value: 'upload',
          label: '文件上传'
        }
      ],
      model: 'upload',
      dataInfo: {
        name: '',
        comment: ''
      }
    }
  },
  methods: {
    toLoading () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$Notice.success({
          title: 'Success',
          desc: 'Here is the response of database'
        })
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
