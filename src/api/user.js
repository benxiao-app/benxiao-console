import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: 'user/login',
    data,
    method: 'post'
  })
}

export const getUserList = params => {
  return axios.request({
    url: 'user',
    params: params,
    method: 'get'
  })
}

export const createUser = params => {
  return axios.request({
    url: 'user',
    method: 'post',
    data: params
  })
}

export const changePassword = params => {
  return axios.request({
    url: 'user/' + params.id + '/change',
    method: 'post',
    data: params
  })
}

export const getUserInfo = token => {
  return axios.request({
    url: 'user/info',
    params: {},
    method: 'get'
  })
}

export const logout = token => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
