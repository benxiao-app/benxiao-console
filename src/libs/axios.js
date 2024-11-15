import Vue from 'vue'
import axios from 'axios'
import { getToken } from '@/libs/util'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Authorization': getToken()
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      if (res.code >= 400) {
        Vue.$Notice.error({
          title: res.data.msg,
          duration: 1
        })
        console.log('报错:' + res.data.msg)
      } else {
        if (res.data.data != null) return res.data.data
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.urlRouter(this.getInsideConfig(), options), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }

  urlRouter (config, options) {
    const urlconfig = {
      baseURL: config.baseURL,
      headers: config.headers
    }
    return urlconfig
  }
}
export default HttpRequest
