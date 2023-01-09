import request from '@/utils/request'

// 查询分销方案列表
export function listDisScheme(query) {
  return request({
    url: '/api/admin/distribution/disScheme/list',
    method: 'get',
    params: query
  })
}

// 查询分销方案详细
export function getDisScheme(id) {
  return request({
    url: '/api/admin/distribution/disScheme/' + id,
    method: 'get'
  })
}

// 新增分销方案
export function addDisScheme(data) {
  return request({
    url: '/api/admin/distribution/disScheme',
    method: 'post',
    data: data
  })
}

// 修改分销方案
export function updateDisScheme(data) {
  return request({
    url: '/api/admin/distribution/disScheme',
    method: 'put',
    data: data
  })
}

// 修改分销状态
export function changeStatus(data) {
  return request({
    url: '/api/admin/distribution/disScheme/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除分销方案
export function delDisScheme(id) {
  return request({
    url: '/api/admin/distribution/disScheme/' + id,
    method: 'delete'
  })
}
