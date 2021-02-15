import request from './request.js'

export function insertClient(data) {
  return request({
    url: 'client/insert',
    method: 'post',
    params: data  
  });
}
export function updateClient(data) {
  return request({
    url: 'client/update',
    method: 'post',
    params: data  
  });
}

export function deleteClient(data) {
  return request({
    url: 'client/delete',
    method: 'post',
    params: data  
  });
}
// all client 页面
export function getClientList(data) {
  return request({
    url: 'client/getData',
    method: 'post',
    params: data  
  });
}

//
export function pushNewClient(data){
  return request({
    url: 'client/pushNewClient',
    method: 'post',
    params: data
  });
}
// /client/changeNewAgent
export function changeNewAgent(data){
  return request({
    url: 'client/changeNewAgent',
    method: 'post',
    params: data
  });
}
// client/getSaleList
export function getClientSale(data){
  return request({
    url: 'client/getSaleList',
    method: 'post',
    params: data
  });
}
// client/salesstageUpdate
export function salesStageUpdate(data){
  return request({
    url: 'client/salesstageUpdate',
    method: 'post',
    params: data
  });
}

// client/attachmentInsert
export function insertClientAttachment(data){
  return request({
    url: 'client/attachmentInsert',
    method: 'post',
    params: data
  });
}
// client/attachmentDelete
export function deleteClientAttachment(data){
  return request({
    url: 'client/attachmentDelete',
    method: 'post',
    params: data
  });
}
// client/updateComments?clientid=795118369&comments=11&brokerid=1418564426&firstname=221&lastname=221
export function updateComments(data){
  return request({
    url: 'client/updateComments',
    method: 'post',
    params: data
  });
}

export function getImportLogList(data) {
  return request({
    url: 'clientimport/getData',
    method: 'post',
    params: data  
  });
}

export function deleteImportLog(data) {
  return request({
    url: 'clientimport/delete',
    method: 'post',
    params: data  
  });
}

export function deleteAllImportLog(data) {
  return request({
    url: 'clientimport/deleteAll',
    method: 'post',
    params: data  
  });
}
