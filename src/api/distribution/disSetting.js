import request from '@/utils/request'

// 查询分销设置列表
export function listDisSetting(query) {
  return request({
    url: '/api/admin/distribution/disSetting/list',
    method: 'get',
    params: query
  })
}

// 查询分销设置详细
export function getDisSetting(id) {
  return request({
    url: '/api/admin/distribution/disSetting/' + id,
    method: 'get'
  })
}

// 新增分销设置
export function addDisSetting(data) {
  return request({
    url: '/api/admin/distribution/disSetting',
    method: 'post',
    data: data
  })
}

// 修改分销设置
export function updateDisSetting(data) {
  return request({
    url: '/api/admin/distribution/disSetting',
    method: 'put',
    data: data
  })
}

// 删除分销设置
export function delDisSetting(id) {
  return request({
    url: '/api/admin/distribution/disSetting/' + id,
    method: 'delete'
  })
}

// 启动分销
export function getStartUp(data) {
  return request({
    url: '/api/admin/distribution/disSetting/changeStatus',
    method: 'put',
    data: data
  })
}


// 查询分销设置列表
export function getDisSettingInfo(query) {
  return request({
    url: '/api/admin/distribution/disSetting/info',
    method: 'get',
    params: query
  })
}// 查询分销设置列表


//提现设置详情
export function getExtractSetting() {
  return request({
    url: '/api/admin/finance/extractSetting',
    method: 'get'
  })
}

//新增修改提现设置
export function addExtractSetting(data) {
  return request({
    url: '/api/admin/finance/extractSetting',
    method: 'post',
    data
  })
}

//修改提现设置
export function editExtractSetting(data) {
  return request({
    url: '/api/admin/finance/extractSetting',
    method: 'put',
    data
  })
}
