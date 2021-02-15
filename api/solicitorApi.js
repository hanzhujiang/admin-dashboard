import request from './request.js'

export function insertSolicitor(data){
  return request({
    url: 'solicitor/insert',
    method: 'post',
    params: data
  });
}

export function updateSolicitor(data){
  return request({
    url: 'solicitor/update',
    method: 'post',
    params: data
  });
}
export function getSolicitorList(data){
  return request({
    url: 'solicitor/getData',
    method: 'post',
    params: data
  });
}
export function deleteSolicitor(data){
  return request({
    url: 'solicitor/delete',
    method: 'post',
    params: data
  });
}

export function insertSolicitorfirm(data){
  return request({
    url: 'solicitorfirm/insert',
    method: 'post',
    params: data
  });
}

export function updateSolicitorfirm(data){
  return request({
    url: 'solicitorfirm/update',
    method: 'post',
    params: data
  });
}
export function getSolicitorfirmList(data){
  return request({
    url: 'solicitorfirm/getData',
    method: 'post',
    params: data
  });
}
export function deleteSolicitorfirm(data){
  return request({
    url: 'solicitorfirm/delete',
    method: 'post',
    params: data
  });
}
