import request from './request.js'

// /purchase/getData   所有订单
export function getPurchase(data){
  return request({
    url: 'purchase/getData',
    method: 'post',
    params: data
  });
}
// purchase/getMyPurchaseData
export function getMyPurchaseData(data){
  return request({
    url: 'purchase/getMyPurchaseData',
    method: 'post',
    params: data
  });
}
// /license/getData  所有授权
export function getAllLicense(data){
  return request({
    url: 'license/getData',
    method: 'post',
    params: data
  });
}
//-----------------------------------------------------------------------------
// /creditCard/getData   所有会员
export function getCreditCard(data){
  return request({
    url: 'creditCard/getData',
    method: 'post',
    params: data
  });
}
// /creditCard/getCard  获取会员资料接口
export function getCreditCardInfo(data){
  return request({
    url: 'creditCard/getCard',
    method: 'post',
    params: data
  });
}
// /creditCard/update  保存会员按钮操作
export function updateCreditCard(data){
  return request({
    url: 'creditCard/update',
    method: 'post',
    params: data
  });
}
// /license/getUsedLicense 使用授权状态
export function getUsedLicense(data){
  return request({
    url: 'license/getUsedLicense',
    method: 'post',
    params: data
  });
}
// /license/getLicense  续费页面数据接口
export function getLicense(data){
  return request({
    url: 'license/getLicense',
    method: 'post',
    params: data
  });
}

// /product/getData 所有产品
export function getProduct(data){
  return request({
    url: 'product/getData',
    method: 'post',
    params: data
  });
}
// /productDetail/getClassification  选择分类
export function getProductClassification(data){
  return request({
    url: 'productDetail/getClassification',
    method: 'post',
    params: data
  });
}
// /product/insert 新增产品
export function insertProduct(data){
  return request({
    url: 'product/insert',
    method: 'post',
    params: data
  });
}
// /product/update 修改产品
export function updateProduct(data){
  return request({
    url: 'product/update',
    method: 'post',
    params: data
  });
}
// /product/delete 删除产品
export function deleteProduct(data){
  return request({
    url: 'product/delete',
    method: 'post',
    params: data
  });
}
// /productDetail/getData 查询产品接口
export function getProductDetail(data){
  return request({
    url: 'productDetail/getData',
    method: 'post',
    params: data
  });
}
// /userlicense/delete  收回授权：ids：userlicenseid
export function deleteUserLicense(data){
  return request({
    url: 'userlicense/delete',
    method: 'post',
    params: data
  });
}
// /license/update   licenseid 激活
export function updateLicense(data){
  return request({
    url: 'license/update',
    method: 'post',
    params: data
  });
}

// /product/uploadFile  上传图片，file，agencyid


// /productDetail/insert  产品规则
export function insertProductDetail(data){
  return request({
    url: 'productDetail/insert',
    method: 'post',
    params: data
  });
}
// /purchase/renew  续费
export function renewPurchase(data){
  return request({
    url: 'purchase/renew',
    method: 'post',
    params: data
  });
}

// /purchase/insert   购买
export function insertPurchase(data){
  return request({
    url: 'purchase/insert',
    method: 'post',
    params: data
  });
}


//所有会员页面  公司同步：1
// agency/synchronizeInsert
export function synchronizeInsert(data){
  return request({
    url: 'agency/synchronizeInsert',
    method: 'post',
    params: data
  });
}
// agency/synchronizeUpdate 公司 成功状态  同步
export function synchronizeUpdate(data){
  return request({
    url: 'agency/synchronizeUpdate',
    method: 'post',
    params: data
  });
}
// brokerfirm/synchronizeUpdate?fullname=Prop:T&agencyid=327247211
// agency/synchronizeUpdate 经纪人 成功状态  同步
export function brokerfirmSynchronizeUpdate(data){
  return request({
    url: 'partnerfirm/synchronizeUpdate',
    method: 'post',
    params: data
  });
}
export function brokerfirmSynchronizeInsert(data){
  return request({
    url: 'partnerfirm/synchronizeInsert',
    method: 'post',
    params: data
  });
}
// product/synchronizeAgain
// product/synchronizeAgain 所有产品页面同步
export function productSynchronizeAgain(data){
  return request({
    url: 'product/synchronizeAgain',
    method: 'post',
    params: data
  });
}
// productDetail/synchronizeAgain 产品同步
export function synchronizeAgain(data){
  return request({
    url: 'productDetail/synchronizeAgain',
    method: 'post',
    params: data
  });
}
// creditCard/getData  //信用卡list
// export function getCreditCard(data){
//   return request({
//     url: 'creditCard/getData',
//     method: 'post',
//     params: data
//   });
// }
//  product/getProductData  获取所有产品
export function getProductData(data){
  return request({
    url: 'product/getProductData',
    method: 'post',
    params: data
  });
}
// creditCard/delete
export function deleteCreditCard(data){
  return request({
    url: 'creditCard/delete',
    method: 'post',
    params: data
  });
}
