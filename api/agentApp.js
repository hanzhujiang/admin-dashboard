import request from './request.js'
// /appuser/getData  获取APP User
export function getAppUserList(data) {
  return request({
    url: '/appuser/getData',
    method: 'post',
    params: data
  });

}
// /appuser/insert
export function insertAppUser(data) {
  return request({
    url: '/appuser/insert',
    method: 'post',
    params: data
  });
}
export function deleteAppUser(data) {
  return request({
    url: '/appuser/delete',
    method: 'post',
    params: data
  });
}
//
export function updateAppUser(data) {
  return request({
    url: '/appuser/update',
    method: 'post',
    params: data
  });
}

// agent/getUnregiAppAgent
export function getUnregistAgent(data){
  return request({
    url: 'agent/getUnregiAppAgent',
    method: 'post',
    params: data
  });
}

// /appuser/resetPassword
export function resetPassword(data) {
  return request({
    url: '/appuser/resetPassword',
    method: 'post',
    params: data
  });
}
