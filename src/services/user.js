import request from '@/utils/request'

// 用户登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: new URLSearchParams(data).toString()
  })
}
