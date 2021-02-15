import request from './request.js'

export function getSystemSettingData(data){
  return request({
    url: 'systemsetting/getData',
    method: 'post',
    params: data
  });
}

export function updateSystemSetting(data){
  return request({
    url: 'systemsetting/update',
    method: 'post',
    params: data
  });
}
// /mail/insert
export function insertMail(data){
  return request({
    url: 'mail/insert',
    method: 'post',
    params: data
  });
}
// /mail/getData
export function getFormat(data){
  return request({
    url: 'mail/getData',
    method: 'post',
    params: data
  });
}
// /mail/update
export function updateMail(data){
  return request({
    url: 'mail/update',
    method: 'post',
    params: data
  });
}
// /mail/delete
export function deleteMail(data){
  return request({
    url: 'mail/delete',
    method: 'post',
    params: data
  });
}
// /mail/getMail
export function getMailInfo(data){
  return request({
    url: 'mail/getMail',
    method: 'post',
    params: data
  });
}
// /mailhost/insert  
export function insertMailHost(data){
  return request({
    url: 'mailhost/insert',
    method: 'post',
    params: data
  });
}
// /mailhost/getMail
export function getMailHostInfo(data){
  return request({
    url: 'mailhost/getMail',
    method: 'post',
    params: data
  });
}
export function getSeparateSettingData(data){
  return request({
    url: 'separatesetting/getData',
    method: 'post',
    params: data
  });
}

export function updateSeparateSetting(data){
  return request({
    url: 'separatesetting/update',
    method: 'post',
    params: data
  });
}
