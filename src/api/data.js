import axios from '@/libs/api.request'

export const getStorageList = () => {
  return axios.request({
    url: 'bucket',
    method: 'get',
    params: {}
  })
}

export const getStorageUserList = (name) => {
  return axios.request({
    url: 'bucket/' + name + '/user',
    method: 'get',
    params: {}
  })
}

export const createStorage = name => {
  return axios.request({
    url: 'bucket/' + name,
    method: 'post'
  })
}

export const editStorage = params => {
  return axios.request({
    url: 'bucket/' + params.id + '/',
    method: 'put',
    data: params
  })
}
export const addStorageUser = (bucket, params) => {
  return axios.request({
    url: 'bucket/' + bucket + '/user/' + params.name + '/' + params.role,
    method: 'post'
  })
}

export const deleteStorageUser = (bucket, params) => {
  return axios.request({
    url: 'bucket/' + bucket + '/user/' + params.name + '/' + params.role,
    method: 'delete'
  })
}
