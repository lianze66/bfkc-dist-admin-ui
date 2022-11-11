import request from '@/utils/request'

// 查询用户信息列表
export function listUser(query) {
  return request({
    url: '/api/admin/crm/user/list',
    method: 'get',
    params: query
  })
}
// 查询供应商列表
export function listSupplier(query) {
  return request({
    url: '/api/admin/crm/user/supplier',
    method: 'get',
    params: query
  })
}
// 查询代理商列表
export function listAgent(query) {
  return request({
    url: '/api/admin/crm/user/agent',
    method: 'get',
    params: query
  })
}
// 查询经销商列表
export function listDistributor(query) {
  return request({
    url: '/api/admin/crm/user/distributor',
    method: 'get',
    params: query
  })
}


// 查询用户信息详细
export function getInfo(userId) {
  return request({
    url: '/api/admin/crm/user/' + userId,
    method: 'get'
  })
}

