import request from '@/utils/request'

// 查询代理级别列表
export function listAgentGrade(query) {
  return request({
    url: '/api/admin/distribution/agentGrade/list',
    method: 'get',
    params: query
  })
}

// 查询代理级别详细
export function getAgentGrade(id) {
  return request({
    url: '/api/admin/distribution/agentGrade/' + id,
    method: 'get'
  })
}

// 新增代理级别
export function addAgentGrade(data) {
  return request({
    url: '/api/admin/distribution/agentGrade',
    method: 'post',
    data: data
  })
}

// 修改代理级别
export function updateAgentGrade(data) {
  return request({
    url: '/api/admin/distribution/agentGrade',
    method: 'put',
    data: data
  })
}
// 状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/api/admin/distribution/agentGrade/changeStatus',
    method: 'put',
    data: data
  })
}
// 删除代理级别
export function delAgentGrade(id) {
  return request({
    url: '/api/admin/distribution/agentGrade/' + id,
    method: 'delete'
  })
}
