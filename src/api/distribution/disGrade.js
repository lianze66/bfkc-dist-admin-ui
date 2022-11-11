import request from '@/utils/request'

// 查询分销等级列表
export function listDisGrade(query) {
  return request({
    url: '/api/admin/distribution/disGrade/list',
    method: 'get',
    params: query
  })
}

export function disGradeList(query) {
  return request({
    url: '/api/admin/distribution/disGrade/disGradeList',
    method: 'get',
    params: query
  })
}



// 查询分销等级详细
export function getDisGrade(id) {
  return request({
    url: '/api/admin/distribution/disGrade/' + id,
    method: 'get'
  })
}

// 新增分销等级
export function addDisGrade(data) {
  return request({
    url: '/api/admin/distribution/disGrade',
    method: 'post',
    data: data
  })
}

// 修改分销等级
export function updateDisGrade(data) {
  return request({
    url: '/api/admin/distribution/disGrade',
    method: 'put',
    data: data
  })
}

// 删除分销等级
export function delDisGrade(id) {
  return request({
    url: '/api/admin/distribution/disGrade/' + id,
    method: 'delete'
  })
}
