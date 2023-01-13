import request from '@/utils/request'

// 查询分销人员列表
export function listDept(query) {
  return request({
    url: '/api/admin/distribution/person/list',
    method: 'get',
    params: query
  })
}

// 查询分销人员列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 分销等级接口
export function getSchemeGrade() {
  return request({
    url: '/api/admin/distribution/disScheme/schemeGrade',
    method: 'get'
  })
}

// 查询分销人员详细
export function getDept(deptId) {
  return request({
    url: '/api/admin/distribution/person/' + deptId,
    method: 'get'
  })
}

// 查询分销人员下拉树结构
export function treeselect() {
  return request({
    url: '/system/dept/treeselect',
    method: 'get'
  })
}



export function listDeptByUserId(userId) {
  return request({
    url: '/system/dept/listDeptByUserId/' + userId,
    method: 'get'
  })
}

// 新增分销人员
export function addDept(data) {
  return request({
    url: '/api/admin/distribution/person',
    method: 'post',
    data: data
  })
}

// 修改分销人员
export function updateDept(data) {
  return request({
    url: '/api/admin/distribution/person',
    method: 'put',
    data: data
  })
}

// 删除分销人员
export function delDept(deptId) {
  return request({
    url: '/api/admin/distribution/person/' + deptId,
    method: 'delete'
  })
}

