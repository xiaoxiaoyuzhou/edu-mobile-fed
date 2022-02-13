import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储用户登录数据
    user: JSON.parse(window.localStorage.getItem('edu-mobile-fed-user') || null)
  },
  mutations: {
    // 用于修改 user
    setUser (state, payload) {
      // payload 为请求到的⽤户数据，JSON 格式不便操作，转换为对象存储
      state.user = JSON.parse(payload)
      // 将数据存储到本地
      window.localStorage.setItem('edu-mobile-fed-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
