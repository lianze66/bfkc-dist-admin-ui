import request from '@/utils/request'

// 查询店铺列表
export function listStore(query) {
  return request({
    url: '/api/admin/store/store/list',
    method: 'get',
    params: query
  })
}

// 查询店铺详细
export function getStore(id) {
  return request({
    url: '/api/admin/store/store/' + id,
    method: 'get'
  })
}

// 新增店铺
export function addStore(data) {
  return request({
    url: '/api/admin/store/store',
    method: 'post',
    data: data
  })
}

// 修改店铺
export function updateStore(data) {
  return request({
    url: '/api/admin/store/store',
    method: 'put',
    data: data
  })
}

// 删除店铺
export function delStore(id) {
  return request({
    url: '/api/admin/store/store/' + id,
    method: 'delete'
  })
}
