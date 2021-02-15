import request from './request.js'

export function updateRole(data){
  return request({
    url: 'role/update',
    method: 'post',
    params: data
  });
}

export function getRoleList(data){
  return request({
    url: 'role/getData',
    method: 'post',
    params: data
  });
}

export function deleteRole(data){
  return request({
    url: 'role/delete',
    method: 'post',
    params: data
  });
}
// /rolefunction/getFunByRoleID
export function getRoleFunctionByRoleID(data){
  return request({
    url: 'rolefunction/getFunByRoleID',
    method: 'post',
    params: data
  });
}
// 根据角色  把功能显示出来
export function getRoleFunctionList(data){
  return request({
    url: 'rolefunction/getData',
    method: 'post',
    params: data
  });
}

export function updataRoleFunction(data){
  return request({
    url: 'rolefunction/update',
    method: 'post',
    params: data,
    aes: true
  });
}

// 列表数据
export function getFunctionData(data){
  return request({
    url: 'function/getData',
    method: 'post',
    params: data
  });
}
//新增列表数据
export function insertFunctions(data){
  return request({
    url: 'function/insert',
    method: 'post',
    params: data
  });
}
//删除数据列表
export function deleteFunctions(data){
  return request({
    url: 'function/delete',
    method: 'post',
    params: data
  });
}
//修改数据
export function updateFunctions(data){
  return request({
    url: 'function/update',
    method: 'post',
    params: data
  });
}

export function insertRole(data){
  return request({
    url: 'role/insert',
    method: 'post',
    params: data
  });
}
// userid   roleid
export function updateUserRole(data){
  return request({
    url: 'userrole/update',
    method: 'post',
    params: data
  });
}
// serrole/getData   获取user列表
// 传入参数:roleid
export function getUserRoleList(data){
  return request({
    url: 'userrole/getData',
    method: 'post',
    params: data
  });
}

// userid   roleid
export function updateAgentAppUserRole(data){
  return request({
    url: 'agentappuserrole/update',
    method: 'post',
    params: data
  });
}

// serrole/getData   获取user列表
// 传入参数:roleid
export function getAgentAppUserRoleList(data){
  return request({
    url: 'agentappuserrole/getData',
    method: 'post',
    params: data
  });
}
