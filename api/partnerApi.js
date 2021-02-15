import request from './request.js'

export function insertBroker(data){
  return request({
    url: 'partner/insert',
    method: 'post',
    params: data
  });
}
// broker/update 
export function updateBroker(data){
  return request({
    url: 'partner/update',
    method: 'post',
    params: data
  });
}
export function deleteBroker(data){
  return request({
    url: 'partner/delete',
    method: 'post',
    params: data
  });
}
// broker/getData 
export function getBroker(data){
  return request({
    url: 'partner/getData',
    method: 'post',
    params: data
  });
}
// brokerfirm/insert
export function insertBrokerFirm(data){
  return request({
    url: 'partnerfirm/insert',
    method: 'post',
    params: data
  });
}
// /brokerfirm/update
export function updateBrokerFirm(data){
  return request({
    url: 'partnerfirm/update',
    method: 'post',
    params: data
  });
}
// brokerfirm/delete
export function deleteBrokerFirm(data){
  return request({
    url: 'partnerfirm/delete',
    method: 'post',
    params: data
  });
}
// /brokerfirm/getData
export function getBrokerFirm(data){
  return request({
    url: 'partnerfirm/getData',
    method: 'post',
    params: data
  });
}

// license/getBrokerLicenseData  点击授权按钮弹出下面弹出框
export function getBrokerLicenseData(data){
  return request({
    url: 'license/getBrokerLicenseData',
    method: 'post',
    params: data
  });
}
// 点击授权后向——userlicense/brokerUserlicenseinsert 参数：brokerid,licenseid,usertype=3
export function brokerUserlicenseinsert(data){
  return request({
    url: 'partnerUserlicense/brokerUserlicenseinsert',
    method: 'post',
    params: data
  });
}
// 点击回收授权，弹出提示对话框userlicense/delete?ids=1788303119
export function deleteUserlicense(data){
  return request({
    url: 'userlicense/delete',
    method: 'post',
    params: data
  });
}
//  点击重置密码，生成6位随机密码，并发邮件给Broker。——接口userlicense/brokerReset?brokerid=1
export function brokerReset(data){
  return request({
    url: 'userlicense/brokerReset',
    method: 'post',
    params: data
  });
}
// broker/getBrokerData?languagetype=02&pagenum=1&pagesize=20   选择框接口
export function getBrokerList(data){
  return request({
    url: 'partner/getBrokerData',
    method: 'post',
    params: data
  });
}