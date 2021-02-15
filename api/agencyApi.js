import request from './request.js'
export function insertAgency(data){
  return request({
    url: 'agency/insert',
    method: 'post',
    params: data
  });
}

export function updateAgency(data){
  return request({
    url: 'agency/update',
    method: 'post',
    params: data
  });
}
// brokerfirm/updateNeedSubscribe
export function brokerfirmUpdateNeedSubscribe(data){
  return request({
    url: 'partnerfirm/updateNeedSubscribe',
    method: 'post',
    params: data
  });
}
// agency/updateNeedSubscribe
export function updateNeedSubscribe(data){
  return request({
    url: 'agency/updateNeedSubscribe',
    method: 'post',
    params: data
  });
}
export function getAgencyList(data){
  return request({
    url: 'agency/getData',
    method: 'post',
    params: data
  });
}
export function getAgency(data){
  return request({
    url: 'agency/getAgency',
    method: 'post',
    params: data
  });
}
export function deleteAgency(data){
  return request({
    url: 'agency/delete',
    method: 'post',
    params: data
  });
}
// 删除agent 佣金等级 验证是否有人在使用该佣金等级 agent/getLevelCheck
export function getLevelCheck(data){
  return request({
    url: 'agent/getLevelCheck',
    method: 'post',
    params: data
  });
}