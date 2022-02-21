import Vue from 'vue'
import VueRouter from 'vue-router'

import Course from '@/views/course'
import store from '../store'

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
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */'@/views/course-info'),
    props: true
  },
  {
    path: '/lesson-video/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */'@/views/course-info/video'),
    props: true
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay'),
    meta: { requiresAuth: true },
    props: true
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

// 导航守卫进行登录检测与跳转
router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证 vuex 中的 store 是否存储了登录信息
    if (!store.state.user) {
      // 未登录，跳转登录页
      return next({
        name: 'login',
        query: {
          // 将本次路由的 fullPath 传递给 login 页面
          fromPath: to.fullPath
        }
      })
    }
    // 已经登录过了
    next()
  } else {
    next()
  }
})

export default router
