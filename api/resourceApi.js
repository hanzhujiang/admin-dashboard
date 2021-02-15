import request from './request.js'

// 插入Resource   url:resource/insert
export function insertResource(data){
  return request({
    url: 'resource/insert',
    method: 'post',
    params: data
  });
}

// 获取,查询resource列表(参数resourceid,languagetype)为空查询全部
export function getResourceList(data){
  return request({
    url: 'resource/getData',
    method: 'post',
    params: data
  });
}
// /resource/getJSONData 页面中英文语言切换总接口
export function getResourceJson(data){
  return request({
    url: 'resource/getJSONData',
    method: 'post',
    params: data
  });
}
// 删除resource条目
export function deleteResource(data){
  return request({
    url: 'resource/delete',
    method: 'post',
    params: data
  });
}
//   更新修改resource条目(参数resourceid,languagetype,name)
export function updateResource(data){
  return request({
    url: 'resource/update',
    method: 'post',
    params: data
  });
}
// --------------------销售资源设置------------------------

// saleResource/getData
export function getDataSaleResource(data){
  return request({
    url: 'saleResource/getData',
    method: 'post',
    params: data
  });
}
// saleResource/update
export function updateSaleResource(data){
  return request({
    url: 'saleResource/update',
    method: 'post',
    params: data
  });
}
// saleResource/getJSONData
export function getJSONDataSaleResource(data){
  return request({
    url: 'saleResource/getJSONData',
    method: 'post',
    params: data
  });
}

// --------------------销售资源设置 -end ------------------------


