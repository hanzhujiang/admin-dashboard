import request from './request.js'

export function getcategory(data) {
  return request({
    url: 'category/getData',
    method: 'post',
    params: data    
  });
}
export function updateCategory(data) {
  return request({
    url: 'category/update',
    method: 'post',
    params: data    
  });
}
export function insertCategory(data) {
  return request({
    url: 'category/insert',
    method: 'post',
    params: data    
  });
}
export function deleteCategory(data) {
  return request({
    url: 'category/delete',
    method: 'post',
    params: data    
  });
}
export function getItemList(data) {
  return request({
    url: 'faq/getData',
    method: 'post',
    params: data    
  });
}
export function updateItem(data) {
  return request({
    url: 'faq/update',
    method: 'post',
    params: data    
  });
}
export function insertItem(data) {
  return request({
    url: 'faq/insert',
    method: 'post',
    params: data    
  });
}
export function deleteItem(data) {
  return request({
    url: 'faq/delete',
    method: 'post',
    params: data    
  });
}

export function getFaqCategoryList(data) {
  return request({
    url: 'faq/getDataByCode',
    method: 'post',
    params: data    
  });
}

export function getVideoCategoryList(data) {
  return request({
    url: 'video/getDataByCode',
    method: 'post',
    params: data    
  });
}

export function getVideoList(data) {
  return request({
    url: 'video/getData',
    method: 'post',
    params: data    
  });

}
export function updateVideo(data) {
  return request({
    url: 'video/update',
    method: 'post',
    params: data    
  });

}
export function insertVideo(data) {
  return request({
    url: 'video/insert',
    method: 'post',
    params: data    
  });

}
export function deleteVideo(data) {
  return request({
    url: 'video/delete',
    method: 'post',
    params: data    
  });

}
export function updateOrderVideo(data) {
  return request({
    url: 'video/updateOrder',
    method: 'post',
    params: data    
  });
}
