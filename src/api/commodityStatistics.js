import request from '@/utils/request'

/**
 * @description 商品销售排名
 */
export function productSalesRanking() {
  return request({
    url: '/api/admin/statistics/productSalesRanking',
    method: 'get'
  })
}

/**
 * @description 商品本年度销售额统计
 */
export function selectTopProductBySales() {
  return request({
    url: `/api/admin/statistics/selectTopProductBySales?topCount=5`,
    method: 'get'
  })
}

/**
 * @description 销售额地区分析
 */
export function trandeDataByCity(num) {
  return request({
    url: `/api/admin/statistics/trandeDataByCity?topCount=${num}`,
    method: 'get'
  })
}

/**
 * @description 销售额
 */
export function trandeDataByMonth() {
  return request({
    url: `/api/admin/statistics/trandeDataByMonth`,
    method: 'get'
  })
}

/**
 * @description 修改目标金额参数
 */
export function updateUserTargetSales(pram) {
  return request({
    url: `/api/admin/statistics/updateUserTargetSales`,
    method: 'get',
    params: pram
  })
}

/**
 * @description 交易订单
 */
export function trandeOrderList(num) {
  return request({
    url: `/api/admin/statistics/trandeOrderList?topCount=${num}`,
    method: 'get'
  })
}

/**
 * @description 商家库存预警
 */
export function selectLackStockWarn() {
  return request({
    url: `/api/admin/statistics/selectLackStockWarn`,
    method: 'get'
  })
}