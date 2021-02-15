import request from './request.js'

// /notification/getData
export function getNotificationList(data) {
  return request({
    url: 'notification/getData',
    method: 'post',
    params: data
  });

}
export function insertNotification(data) {
  return request({
    url: 'notification/insert ',
    method: 'post',
    params: data
  });
}
export function updateNotification(data) {
  return request({
    url: 'notification/update',
    method: 'post',
    params: data
  });
}

export function deleteNotification(data){
  return request({
    url: 'notification/delete ',
    method: 'post',
    params: data
  });
}
  
export function resendNotification(data){
  return request({
    url: 'notification/resend',
    method: 'post',
    params: data
  });
}
  
  