import request from './request.js'

export function insertBuilder(data){
  return request({
    url: 'builder/insert',
    method: 'post',
    params: data
  });
}

export function updateBuilder(data){
  return request({
    url: 'builder/update',
    method: 'post',
    params: data
  });
}
export function getBuilderList(data){
  return request({
    url: 'builder/getData',
    method: 'post',
    params: data
  });
}
export function deleteBuilder(data){
  return request({
    url: 'builder/delete',
    method: 'post',
    params: data
  });
}
