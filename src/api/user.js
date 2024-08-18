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

export const getUserInfo = id => {
  return axios.request({
    url: 'user/' + id,
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
