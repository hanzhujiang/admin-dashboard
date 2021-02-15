import request from './request.js'

export function getAgentOutsideDepartment(data){
  return request({
    url: "agent/getNoDeptAgent",
    method: 'post',
    params: data
  });
}

// 更新员工所属部门/agentbelong/update
export function updateAgentBelong(data){
  return request({
    url: 'agentbelong/update',
    method: 'post',
    params: data
  });
}

export function insertDepartment(data){
  return request({
    url: 'depart/insert',
    method: 'post',
    params: data
  });
}

// 更新   修改树状图
export function updateDepartment(data){
  return request({
    url: 'depart/update',
    method: 'post',
    params: data
  });
}

export function getDeparmentList(data){
  return request({
    url: "depart/getData",
    method: 'post',
    params: data
  });
}

export function getDepartmentListWithMgr(data){
  return request({
    url: "departMgr/getData",
    method: 'post',
    params: data
  });
}

// 新增部门主要负责人
export function insertDepartmentMgr(data){
  return request({
    url: "departMgr/insert",
    method: 'post',
    params: data
  });
}
// 删除部门主要负责人
export function deleteDepartmentMgr(data){
  return request({
    url: "departMgr/delete",
    method: 'post',
    params: data
  });
}
// /depart/getUpLevelDept
export function getUpLevelDept(data){
  return request({
    url: "depart/getUpLevelDept ",
    method: 'post',
    params: data
  });
}

// 删除部门
export function deleteDepartment(data){
  return request({
    url: 'depart/delete',
    method: 'post',
    params: data
  });
}
// /depart/getTreeData获取树形部门
export function getDepartmentTree(data){
  return request({
    url: 'depart/getTreeData',
    method: 'post',
    params: data
  });
}

// /depart/getDataByDeptID 通过部门ID获取员工信息
export function getAgentByDeptID(data){
  return request({
    url: 'depart/getDataByDeptID',
    method: 'post',
    params: data
  });
}
