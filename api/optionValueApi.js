import request from './request.js'

// 列表数据
export function getOption(data){
  return request({
    url: 'option/getData',
    method: 'post',
    params: data
  });
}

export function getOptionData1(data){
  return request({
    url: 'option/getData1',
    method: 'post',
    params: data
  });
}

//新增列表数据
export function insertOption(data){
  return request({
    url: 'option/insert',
    method: 'post',
    params: data
  });
}
//删除数据列表
export function deleteOption(data){
  return request({
    url: 'option/delete',
    method: 'post',
    params: data
  });
}
//修改数据
export function updateOption(data){
  return request({
    url: 'option/update',
    method: 'post',
    params: data
  });
}
