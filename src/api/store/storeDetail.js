import request from '@/utils/request'

// 查询店铺详情列表
export function listStoreDetail(query) {
  return request({
    url: '/api/admin/store/storeDetail/list',
    method: 'get',
    params: query
  })
}

// 查询店铺详情详细
export function getStoreDetail(id) {
  return request({
    url: '/api/admin/store/storeDetail/' + id,
    method: 'get'
  })
}

// 根据用户编号获取店铺详情
export function getStoreInfo() {
  return request({
    url: '/api/admin/store/storeDetail/info',
    method: 'get'
  })
}

// 新增店铺详情
export function addStoreDetail(data) {
  return request({
    url: '/api/admin/store/storeDetail',
    method: 'post',
    data: data
  })
}

// 修改店铺详情
export function updateStoreDetail(data) {
  return request({
    url: '/api/admin/store/storeDetail',
    method: 'put',
    data: data
  })
}

// 设置结算周期
export function updateSettlementCycle(data) {
  return request({
    url: '/api/admin/store/storeDetail/settlementCycle',
    method: 'put',
    data: data
  })
}

// 删除店铺详情
export function delStoreDetail(id) {
  return request({
    url: '/api/admin/store/storeDetail/' + id,
    method: 'delete'
  })
}
