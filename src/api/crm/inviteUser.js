import request from '@/utils/request'

// 列表数据
export function getUserList(query) {
  return request({
    url: '/api/admin/crm/user/list',
    method: 'get',
    params: query
  })
}

// 分销等级
export function disGradeList() {
  return request({
    url: '/api/admin/distribution/disGrade/list',
    method: 'get'
  })
}
// 代理等级
export function agentGradeList() {
  return request({
    url: '/api/admin/distribution/agentGrade/list',
    method: 'get'
  })
}
// 设置代理商等级
export function changeDisGradeLevel(ids, gradeId) {
  return request({
    url: `/api/admin/crm/user/changeDisGradeLevel?ids=${ids}&gradeId=${gradeId}`,
    method: 'get'
  })
}
// 设置分销等级
export function changeAgentGradeLevel(ids, gradeId) {
  return request({
    url: `/api/admin/crm/user/changeAgentGradeLevel?ids=${ids}&gradeId=${gradeId}`,
    method: 'get'
  })
}

// 用户分组
export function getGroupList(query) {
  return request({
    url: '/api/admin/user/group/list',
    method: 'get',
    params: query
  })
}
// 用户等级
export function getLevelList(query) {
  return request({
    url: '/api/admin/distribution/disGrade/disGradeList',
    method: 'get',
    params: query
  })
}
// 用户标签
export function getTagList(query) {
  return request({
    url: '/api/admin/user/level/list',
    method: 'get',
    params: query
  })
}

// 用户押金
export function updateDeposit(query) {
  return request({
    url: `/api/admin/crm/user/updateDeposit`,
    method: 'get',
    params: query
  })
}


// 设置分组
export function postUserGroup(data) {
  return request({
    url: '/api/admin/crm/user/group',
    method: 'post',
    params: data
  })
}
// 设置标签
export function postUserTag(data) {
  return request({
    url: '/api/admin/crm/user/tag',
    method: 'post',
    params: data
  })
}
// 设置用户等级
export function postUserLevel(data) {
  return request({
    url: '/api/admin/crm/user/level',
    method: 'post',
    params: data
  })
}


// 经销商列表数据
export function getUserDistributor(query) {
  return request({
    url: '/api/admin/crm/user/distributor',
    method: 'get',
    params: query
  })
}
// 代理商列表数据
export function getUserAgent(query) {
  return request({
    url: '/api/admin/crm/user/agent',
    method: 'get',
    params: query
  })
}