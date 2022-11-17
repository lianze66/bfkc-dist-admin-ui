import request from '@/utils/request'

// 查询邀请申请列表
export function listInviter(query) {
  return request({
    url: '/user/inviter/list',
    method: 'get',
    params: query
  })
}

// 查询邀请申请详细
export function getInviter(id) {
  return request({
    url: '/user/inviter/' + id,
    method: 'get'
  })
}

// 新增邀请申请
export function addInviter(data) {
  return request({
    url: '/api/admin/crm/inviter',
    method: 'post',
    data: data
  })
}

// 修改邀请申请
export function updateInviter(data) {
  return request({
    url: '/api/admin/crm/inviter',
    method: 'put',
    data: data
  })
}

// 删除邀请申请
export function delInviter(id) {
  return request({
    url: '/api/admin/crm/inviter/' + id,
    method: 'delete'
  })
}

// 获取用户详细信息
export function getInfo(token) {
  return request({
    url: '/api/admin/getAdminInfoByToken',
    method: 'get',
    params: { token }
  })
}

// 获取邀请码
export function getInviterCode() {
  return request({
    url: '/api/admin/crm/inviter/code',
    method: 'get'
  })
}

// 生成邀请二维码
export function createQRCode(data) {
  return request({
    url: `/user/inviter/qrcode`,
    method: 'post',
    data: data
  })
}
