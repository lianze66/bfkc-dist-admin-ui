import request from '@/utils/request'

/**
 * @description 经销商等级分布
 */
export function selectAgentGradeStatistics() {
  return request({
    url: '/api/admin/statistics/selectAgentGradeStatistics',
    method: 'get'
  })
}

/**
 * @description 代理商等级分布
 */
export function selectDisGradeStatistics() {
  return request({
    url: '/api/admin/statistics/selectDisGradeStatistics',
    method: 'get'
  })
}

/**
 * @description 经销商业绩情况
 */
export function selectDisSalesAmount() {
  return request({
    url: '/api/admin/statistics/selectDisSalesAmount',
    method: 'get'
  })
}

/**
 * @description 代理商业绩情况
 */
export function selectAgentSalesAmount() {
  return request({
    url: '/api/admin/statistics/selectAgentSalesAmount',
    method: 'get'
  })
}

/**
 * @description 代理商业绩排名
 */
export function selectAgentBrokerage() {
  return request({
    url: '/api/admin/statistics/selectAgentBrokerage',
    method: 'get'
  })
}

/**
 * @description 新增生态信息
 */
export function selectAdminByUserId() {
  return request({
    url: '/api/admin/statistics/selectAdminByUserId',
    method: 'get'
  })
}

/**
 * @description 数量
 */
export function selectUserNumByUserId() {
  return request({
    url: '/api/admin/statistics/selectUserNumByUserId',
    method: 'get'
  })
}

/**
 * @description 地图数据
 */
export function selectDisByArea(userType) {
  return request({
    url: `/api/admin/statistics/selectDisByArea/${userType}`,
    method: 'get'
  })
}