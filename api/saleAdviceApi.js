import request from './request.js'

// client/getData   purchaser
export function getClientData(data){
  return request({
    url: 'client/getData',
    method: 'post',
    params: data
  });
}
// solicitor/getData
export function getSolicitorData(data){
  return request({
    url: 'solicitor/getData',
    method: 'post',
    params: data
  });
}
// sale/insert   保存按钮
export function insertSale(data){
  return request({
    url: 'sale/insert',
    method: 'post',
    params: data
  });
}
// sale/updateForUpperAgency
export function updateForUpperAgency(data){
  return request({
    url: 'sale/updateForUpperAgency',
    method: 'post',
    params: data
  });
}
// ProjectContact查询接口地址：/agencyProjectContact/getData
export function getContact(data){
  return request({
    url: 'agencyProjectContact/getData',
    method: 'post',
    params: data
  });
}
export function getContactNew(data){
  return request({
    url: 'agencyApprover/getApproverContact',
    method: 'post',
    params: data
  });
}


// SaleAdvice查询接口地址：/request/getSaleAdvice
export function getSaleAdvice(data){
  return request({
    url: 'request/getSaleAdvice',
    method: 'post',
    params: data
  });
}

// /deposit/update
export function updateDeposit(data){
  return request({
    url: 'deposit/update ',
    method: 'post',
    params: data
  });
}

// /deposit/delete
export function deleteDeposit(data){
  return request({
    url: 'deposit/delete',
    method: 'post',
    params: data
  });
}
// /deposit/insert
export function insertDeposit(data){
  return request({
    url: 'deposit/insert',
    method: 'post',
    params: data
  });
}
// sale/salesPayDeposit
export function getSaleDeposit(data){
  return request({
    url: 'sale/salesPayDeposit',
    method: 'post',
    params: data
  });
}
// refund/getData
export function getRefund(data){
  return request({
    url: 'refund/getData',
    method: 'post',
    params: data
  });
}
// refund/delete
export function deleteRefund(data){
  return request({
    url: 'refund/delete',
    method: 'post',
    params: data
  });
}
// refund/insert
export function insertRefund(data){
  return request({
    url: 'refund/insert',
    method: 'post',
    params: data
  });
}
// sale/salesStatus
export function getSaleStatus(data){
  return request({
    url: 'sale/salesStatus',
    method: 'post',
    params: data
  });
}
// checklist/insert
export function insertCheckList(data){
  return request({
    url: 'checklist/insert',
    method: 'post',
    params: data
  });
}
// sale/updateSaleComments
export function updateSaleComments(data){
  return request({
    url: 'sale/updateSaleComments',
    method: 'post',
    params: data
  });
}
// commission/getData
export function getCommissionData(data){
  return request({
    url: 'commission/getData',
    method: 'post',
    params: data
  });
}
// commissioninvoice/getData
export function getCommissionInvoice(data){
  return request({
    url: 'commissioninvoice/getData',
    method: 'post',
    params: data
  });
}
// commissioninvoice/insert
export function insertCommissionInvoice(data){
  return request({
    url: 'commissioninvoice/insert',
    method: 'post',
    params: data
  });
}
// commissioninvoice/delete
export function deleteCommissionInvoice(data){
  return request({
    url: 'commissioninvoice/delete ',
    method: 'post',
    params: data
  });
}

// commissioninvoice/update
export function updateCommissionInvoice(data){
  return request({
    url: 'commissioninvoice/update',
    method: 'post',
    params: data
  });
}
// sale/salesCommissionInvoice
export function applyCommissionInvoice(data){
  return request({
    url: 'sale/salesCommissionInvoice',
    method: 'post',
    params: data
  });
}

export function approveSaleAdvice(data){
  return request({
    url: 'request/handleAdvice',
    method: 'post',
    params: data
  });
}
export function requestHandleAgencyApprove(data){
  return request({
    url: 'request/handleAgencyApprove',
    method: 'post',
    params: data
  });
}

export function getCheckListData(data){
  return request({
    url: 'checklist/getData',
    method: 'post',
    params: data
  });
}

export function requestDownloadSalePDF(data){
  return request({
    url: 'request/downloadSalePDF',
    method: 'post',
    params: data
  });
}

export function saleDownloadDepositPDF(data){
  return request({
    url: 'sale/downloadDepositPDF',
    method: 'post',
    params: data
  });
}

export function saleAgentToLwp (data){
  return request({
    url: 'sale/agentToLwp ',
    method: 'post',
    params: data
  });
}


export function propertyUpdatePrice (data){
  return request({
    url: 'property/updatePrice ',
    method: 'post',
    params: data
  });
}


export function refundUpdate (data){
  return request({
    url: 'refund/update',
    method: 'post',
    params: data
  });
}
// saleStatusDetail/getData
export function getSaleStatusDateList (data){
  return request({
    url: 'saleStatusDetail/getData',
    method: 'post',
    params: data
  });
}
// saleStatusDetail/update
export function updateSaleStatusDetail (data){
  return request({
    url: 'saleStatusDetail/update',
    method: 'post',
    params: data
  });
}
// saleStatusDetail/getSaleStatusDetail
export function getSaleStatusDetail (data){
  return request({
    url: 'saleStatusDetail/getSaleStatusDetail',
    method: 'post',
    params: data
  });
}
// saleStatusDetail/insert
export function insertSaleStatusDetail (data){
  return request({
    url: 'saleStatusDetail/insert',
    method: 'post',
    params: data
  });
}