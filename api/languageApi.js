import request from './request.js'

export function insertLanguage(data){
  return request({
    url: 'language/insert',
    method: 'post',
    params: data
  });
}
// 查询语言种类列表
// language/getData  不需要插入数据
export function getLanguageList(data){
  return request({
    url: 'language/getData',
    method: 'post',
    params: data
  });
}
// language/delete  删除语言类型
export function deleteLanguage(data){
  return request({
    url: 'language/delete',
    method: 'post',
    params: data
  });
}

//language/update 更新语言类型
export function updateLanguage(data){
  return request({
    url: 'language/update',
    method: 'post',
    params: data
  });
}

