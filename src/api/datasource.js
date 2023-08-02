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

export const deleteDatasource = (id) => {
  return axios.request({
    url: `datasource/delete/${id}`,
    method: 'delete'
  })
}
