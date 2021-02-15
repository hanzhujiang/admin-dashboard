import request from './request.js'

export function insertVendor(data){
  return request({
    url: 'vendor/insert',
    method: 'post',
    params: data
  });
}

export function updateVendor(data){
  return request({
    url: 'vendor/update',
    method: 'post',
    params: data
  });
}

export function getVendorList(data){
  return request({
    url: 'vendor/getData',
    method: 'post',
    params: data
  });
}
// getVendor
export function getVendor(data){
  return request({
    url: 'vendor/getVendor',
    method: 'post',
    params: data
  });
}
export function deleteVendor(data){
  return request({
    url: 'vendor/delete',
    method: 'post',
    params: data
  });
}
