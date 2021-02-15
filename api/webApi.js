import request from './request.js'

export function getWebInfo(data){
  return request({
    url: 'web/getWebInfo',
    method: 'post',
    params: data
  });
}
export function updateWebInfo(data){
  return request({
    url: 'web/updateWebInfo',
    method: 'post',
    params: data
  });
}
export function getWebProject(data){
  return request({
    url: 'web/getWebProject',
    method: 'post',
    params: data
  });
}
export function updateWebProject(data){
  return request({
    url: 'web/updateWebProject',
    method: 'post',
    params: data
  });
}
export function getWebBlock(data){
  return request({
    url: 'web/getWebBlock',
    method: 'post',
    params: data
  });
}
export function updateWebBlock(data){
  return request({
    url: 'web/updateWebBlock',
    method: 'post',
    params: data
  });
}
export function deleteWebBlock(data){
  return request({
    url: 'web/deleteWebBlock',
    method: 'post',
    params: data
  });
}
export function getWebNews(data){
  return request({
    url: 'web/getWebNews',
    method: 'post',
    params: data
  });
}
export function updateWebNews(data){
  return request({
    url: 'web/updateWebNews',
    method: 'post',
    params: data
  });
}
export function deleteWebNews(data){
  return request({
    url: 'web/deleteWebNews',
    method: 'post',
    params: data
  });
}
