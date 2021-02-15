import request from './request.js'

export function getSaleSyncData(data){
  return request({
    url: 'syncdata/getSaleSyncData',
    method: 'post',
    params: data
  });
}

export function getSaleOneSyncData(data){
  return request({
    url: 'syncdata/getSaleOneSyncData',
    method: 'post',
    params: data
  });
}
export function getProjectSyncData(data){
  return request({
    url: 'syncdata/getProjectSyncData',
    method: 'post',
    params: data
  });
}

export function getProjectOneSyncData(data){
  return request({
    url: 'syncdata/getProjectOneSyncData',
    method: 'post',
    params: data
  });
}
export function getPropertySyncData(data){
  return request({
    url: 'syncdata/getPropertySyncData',
    method: 'post',
    params: data
  });
}

export function getPropertyOneSyncData(data){
  return request({
    url: 'syncdata/getPropertyOneSyncData',
    method: 'post',
    params: data
  });
}
export function getClientSyncData(data){
  return request({
    url: 'syncdata/getClientSyncData',
    method: 'post',
    params: data
  });
}

export function getClientOneSyncData(data){
  return request({
    url: 'syncdata/getClientOneSyncData',
    method: 'post',
    params: data
  });
}
