import Vue from 'vue'
import VueRouter from 'vue-router'

import Course from '@/views/course'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login') // 懒加载
  },
  {
    path: '/',
    name: 'course',
    component: Course
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user')
  },
  {
    path: '*',
    name: 'errorpage',
    component: () => import(/* webpackChunkName: 'errorpage' */'@/views/error-page')
  }
]

const router = new VueRouter({
  routes
})

export default router
