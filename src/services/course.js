import request from '@/utils/request'

// 获取所有的广告列表
export const getAllAds = params => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params
  })
}

// 分页查询课程列表
export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/front/course/getQueryCourses',
    data
  })
}
