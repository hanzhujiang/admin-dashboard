import request from './request.js'

export function getActivityData(data){
  return request({
    url: 'activity/getData',
    method: 'post',
    params: data
  });
}

export function deleteActivity(data){
  return request({
    url: 'activity/delete',
    method: 'post',
    params: data
  });
}

export function insertActivity(data){
  return request({
    url: 'activity/insert',
    method: 'post',
    params: data
  });
}

export function getActivity(data){
  return request({
    url: 'activity/getActivity',
    method: 'post',
    params: data
  });
}

export function pushMessage(data){
  return request({
    url: 'activity/pushMessage',
    method: 'post',
    params: data
  });
}

export function updateActivity(data){
  return request({
    url: 'activity/update',
    method: 'post',
    params: data
  });
}

export function getAttendanceResult(data){
  return request({
    url: 'activity/getAttendanceResult',
    method: 'post',
    params: data
  });
}

export function getActivitypunch(data){
  return request({
    url: 'activity/getActivitypunch',
    method: 'post',
    params: data
  });
}
