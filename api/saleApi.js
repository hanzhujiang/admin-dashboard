import request from './request.js'
//  MyRequest 页面
export function getMyRequestList(data) {
  return request({
    url: 'request/getData',
    method: 'post',
    params: data  
  });

}
// allsales 页面
// sale/getPageDepositList
export function getPageDepositList(data) {
  return request({
    url: 'sale/getPageDepositList',
    method: 'post',
    params: data  
  });

}
// /sale/getSaleList
export function getSaleList(data) {
  return request({
    url: 'sale/getSaleList',
    method: 'post',
    params: data  
  });
}
// property/getCancelledData
export function getSaleList2(data) {
  return request({
    url: 'property/getCancelledData',
    method: 'post',
    params: data  
  });
}
// sale/getSaleRefundDepositList
export function getSaleRefund(data) {
  return request({
    url: 'sale/getSaleRefundDepositList',
    method: 'post',
    params: data  
  });
}
// allReserved查询接口地址：/property/getReservedData
export function getAllReservedProperty(data) {
  return request({
    url: 'property/getReservedData',
    method: 'post',
    params: data  
  });
}
// result/getData
export function getResultList(data) {
  return request({
    url: 'result/getData',
    method: 'post',
    params: data  
  });
}
// /reject/getData  获取审批拒绝理由
export function getReject(data) {
  return request({
    url: 'reject/getData',
    method: 'post',
    params: data  
  });
}
// /request/getApproving
export function getApprovingCount(data){
  return request({
    url: 'request/getApproving',
    method: 'post',
    params: data
  });
}
// /request/getAgencyApprove 待审核(渠道)  
export function getAgencyApprove(data){
  return request({
    url: 'request/getAgencyApprove',
    method: 'post',
    params: data
  });
}
//  /request/getAgencyApproved 我的审核(渠道)
export function getAgencyApproved(data){
  return request({
    url: 'request/getAgencyApproved',
    method: 'post',
    params: data
  });
}
// /sale/insertInvoice
export function insertInvoice(data){
  return request({
    url: 'sale/insertInvoice',
    method: 'post',
    params: data
  });
}
// /sale/PdfProperty
export function PdfProperty (data){
  return request({
    url: 'sale/PdfProperty',
    method: 'post',
    params: data
  });
}
// sale/ExcelProperty
export function ExcelProperty (data){
  return request({
    url: 'sale/ExcelProperty',
    method: 'post',
    params: data
  });
}