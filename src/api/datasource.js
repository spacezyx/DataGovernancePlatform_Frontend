import axios from '@/libs/api.request'

export const verifyDataSource = (dto) => {
  return axios.request({
    url: 'datasource/verify',
    method: 'post',
    data: dto
  })
}

export const insertDataSource = (dto) => {
  return axios.request({
    url: 'datasource/insert',
    method: 'post',
    data: dto
  })
}

export const getManageVO = () => {
  return axios.request({
    url: 'datasource/getManageVO',
    method: 'get'
  })
}

export const getDatasourceList = () => {
  return axios.request({
    url: 'datasource/getDatasourceList',
    method: 'get'
  })
}

export const deleteDatasource = (id) => {
  return axios.request({
    url: `datasource/delete/${id}`,
    method: 'delete'
  })
}

export const getSelectDatasourceList = () => {
  return axios.request({
    url: `datasource/getSelectDatasourceList`,
    method: 'get'
  })
}

export const getMetadataGraph = (id) => {
  return axios.request({
    url: `graph/getMetadataGraph/${id}`,
    method: 'get'
  })
}

export const extractMetadata = (id) => {
  return axios.request({
    url: `datasource/extractMetadata/${id}`,
    method: 'post'
  })
}

export const getNodeTextRange = (body) => {
  return axios.request({
    url: '/graph/getNodeTextRange',
    method: 'post',
    data: body
  })
}

export const getRangeValue = (body) => {
  return axios.request({
    url: '/graph/getRangeValue',
    method: 'post',
    data: body
  })
}

export const fuseTest = (body) => {
  return axios.request({
    url: '/fuse/fuseTest',
    method: 'post',
    data: body
  })
}
