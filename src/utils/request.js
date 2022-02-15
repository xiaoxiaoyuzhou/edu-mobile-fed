import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://edufront.lagounews.com'
})

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  // 读取 store 中的 user 数据
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 标记 token 刷新的状态
let isRefreshing = false
// 存储等待刷新的请求
let requests = []

// 设置响应拦截
request.interceptors.response.use(response => {
  return response
}, async error => {
  // 存在响应内容但是出错
  if (error.response) {
    // 检测是否是404
    if (error.response.status === 401) {
      // 检测是否存在用户的登录信息
      if (!store.state.user) {
        return Promise.reject(error)
      }
      // 发送请求前检测，是否已经存在刷新 token 的请求
      if (isRefreshing) {
        return requests.push(() => {
          // error.config 是指失败的请求对象
          request(error.config)
        })
      }
      isRefreshing = true
      // 发送请求，尝试刷新 token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
      })
      if (data.state !== 1) {
        // 刷新 token 失败
        store.commit('setUser', null)
        return Promise.reject(error)
      }
      // 刷新 token 成功
      store.commit('setUser', data.content)
      // 将 requests 中的请求重新发送
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
})

export default request
