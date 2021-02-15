import request from './request.js'

export function getOrganizationTreeData(data) {
  return request({
    url: 'approveorganization/getTreeData',
    method: 'post',
    params: data
  });
}
// approveorganization/getData
export function getOrganization(data) {
  return request({
    url: 'approveorganization/getData',
    method: 'post',
    params: data
  });
}
// 新增树形结构节点
// approveorganization/insert
export function insertOrganization(data) {
  return request({
    url: 'approveorganization/insert',
    method: 'post',
    params: data
  });

}
// approveorganization/delete
export function deleteOrganization(data) {
  return request({
    url: 'approveorganization/delete',
    method: 'post',
    params: data
  });

}

// approveorganization/update
export function updateOrganization(data) {
  return request({
    url: 'approveorganization/update',
    method: 'post',
    params: data
  });
}

// route/getData
export function getRouteType(data) {
  return request({
    url: 'route/getData',
    method: 'post',
    params: data
  });

}

// 更换审批人
// /approve/update
export function updateApprover(data) {
  return request({
    url: 'approve/updateBatch',
    method: 'post',
    params: data
  });
}

export function approveorganizationGetDataByRoute(data){
  return request({
    url: 'approveorganization/getDataByRoute',
    method: 'post',
    params: data
  });
}
export function agentGetlevel(data){
  return request({
    url: 'agent/getLevel',
    method: 'post',
    params: data
  });
}
