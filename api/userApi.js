import request from './request.js'

// user/insert   users保存
export function insertUser(data){
  return request({
    url: 'user/insert',
    method: 'post',
    params: data
  });
}
//user/getData  页面所有数据
export function getUser(data){
  return request({
    url: 'user/getData',
    method: 'post',
    params: data
  });
}

// user/update   更新
export function updateUser(data){
  return request({
    url: 'user/update',
    method: 'post',
    params: data
  });
}
// user/delete  删除
export function deleteUser(data){
  return request({
    url: 'user/delete',
    method: 'post',
    params: data
  });
}
// /user/resetPassword  密码重置
export function resetPassword(data){
  return request({
    url: 'user/resetPassword',
    method: 'post',
    params: data
  });
}

// userid   roleid
export function updateUserRole(data){
  return request({
    url: 'userrole/update',
    method: 'post',
    params: data
  });
}

// user/editSession
export function bindAgency(data){
  return request({
    url: 'user/editSession',
    method: 'post',
    params: data
  });
}
// user/stuntSignon   替身登录接口
export function substituteLogin (data){
  return request({
    url: 'user/stuntSignon',
    method: 'post',
    params: data
  });
}

// 登录接口
export function userLogin(data) {
  return request({
    url: 'user/login',
    method: 'post',
    params: data
  });
}
// 修改密码/user/modifyPassword

export function modifyPassword(data) {
  return request({
    url: 'user/modifyPassword',
    method: 'post',
    params: data
  });
}

// 退出接口
export function logout(data) {
  return request({
    url: 'user/logout',
    method: 'post',
    params: data
  });
}

// user/getLocalStorage
export function getSelectList(data){
  return request({
    url: 'user/getLocalStorage',
    method: 'post',
    params: data
  });
}

// /userlicense/insert 授权
export function insertUserLicense(data){
  return request({
    url: 'userlicense/insert',
    method: 'post',
    params: data
  });
}
// /userLicense/delete 解除授权
export function deleteUserLicense(data){
  return request({
    url: 'userlicense/delete',
    method: 'post',
    params: data
  });
}
// /userLicense/getData 授权列表
export function getUserLicense(data){
  return request({
    url: 'userlicense/getData',
    method: 'post',
    params: data
  });
}

// user/forgoPassword 重置验证码
export function userForgoPassword(data) {
  return request({
      url: 'user/forgoPassword',
      method: 'post',
      params: data    
  });
}
// user/forgoResetPassword  重置密码
export function userForgoResetPassword(data) {
  return request({
      url: 'user/forgoResetPassword',
      method: 'post',
      params: data    
  });
}