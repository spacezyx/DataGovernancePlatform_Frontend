import axios from '@/libs/api.request'

export const createTopic = (dto) => {
  return axios.request({
    url: '/topic/create',
    method: 'post',
    data: dto
  })
}

export const deleteTopic = (id) => {
  return axios.request({
    url: `topic/${id}`,
    method: 'delete'
  })
}
