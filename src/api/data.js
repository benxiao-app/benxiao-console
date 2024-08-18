import axios from '@/libs/api.request'

export const getStorageList = () => {
  return axios.request({
    url: 'bucket',
    method: 'get',
    params: {}
  })
}

export const createStorage = params => {
  return axios.request({
    url: 'bucket/',
    method: 'post',
    data: params
  })
}

export const editStorage = params => {
  return axios.request({
    url: 'bucket/' + params.id + '/',
    method: 'put',
    data: params
  })
}

export const getCostomerList = params => {
  return axios.request({
    url: 'ztx/costomer/',
    method: 'get',
    params: params
  })
}

export const createCostomer = params => {
  return axios.request({
    url: 'ztx/costomer/',
    method: 'post',
    data: params
  })
}

export const editCostomer = params => {
  return axios.request({
    url: 'ztx/costomer/' + params.id + '/',
    method: 'put',
    data: params
  })
}

export const rechargeCostomer = params => {
  return axios.request({
    url: 'ztx/recharge',
    method: 'post',
    data: params
  })
}

export const userCostomer = params => {
  return axios.request({
    url: 'ztx/user',
    method: 'post',
    data: params
  })
}

export const getConsumeSummary = params => {
  return axios.request({
    url: 'user',
    method: 'get',
    data: params
  })
}

export const getRechargeSummary = params => {
  return axios.request({
    url: 'ztx/recharge',
    method: 'get',
    data: params
  })
}

export const getTradeList = params => {
  return axios.request({
    url: 'ztx/trade/',
    method: 'get',
    params: params
  })
}

export const getIncomeList = params => {
  return axios.request({
    url: 'ztx/income/',
    method: 'get',
    params: params
  })
}
