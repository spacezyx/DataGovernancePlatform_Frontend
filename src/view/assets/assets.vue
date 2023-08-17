<template>
  <Card>
    <Divider>数据资产目录检索</Divider>
    <Row type='flex' align='middle' class='row'>
      <Col span='4' style="padding: 8px">
        <label class="select-label">关键词查询</label>
        <Input v-model='input1' placeholder='Input 1' />
      </Col>
      <Col span='4' style="padding: 8px">
        <label class="select-label">按业务域分类过滤</label>
        <Select v-model='select2' style='width: 100%;'>
          <Option value='设计域'>设计域</Option>
          <Option value='制造域'>制造域</Option>
          <Option value='运维域'>运维域</Option>
          <!-- 其他选项 -->
        </Select>
      </Col>
      <Col span='4' style="padding: 8px">
        <label class="select-label">按数据源类型过滤</label>
        <Select v-model='select1' style='width: 100%;'>
          <Option value='结构化'>结构化</Option>
          <Option value='非结构化'>非结构化</Option>
          <Option value='半结构化'>半结构化</Option>
          <!-- 其他选项 -->
        </Select>
      </Col>
      <Col span='12' style="padding: 8px">
        <label class="select-label">根据语义标签过滤</label>
        <Select v-model='select3' style='width: 100%;' multiple>
          <Option value='决策层'>决策层</Option>
          <Option value='感知层'>感知层</Option>
          <Option value='用户信息'>用户信息</Option>
          <Option value='产品信息'>产品信息</Option>
          <!-- 其他选项 -->
        </Select>
      </Col>
    </Row>
    <Divider>数据资产目录</Divider>
    <div class="image-container">
      <img src="../../assets/images/img_1.png" alt="PNG Image" />
    </div>
  </Card>
</template>

<script>
export default {
  name: 'assets',
  select1: '',
  select2: '',
  select3: '',
  input1: '',
  input2: ''
}
</script>

<style scoped>
.image-container {
  max-width: 100%; /* 限制最大宽度 */
  max-height: 100%; /* 限制最大高度 */
  overflow: hidden; /* 隐藏溢出部分 */
}
.image-container img {
  width: 100%; /* 让图片充满容器 */
  height: auto; /* 保持宽高比 */
}

</style>
