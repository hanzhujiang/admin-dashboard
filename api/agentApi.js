import request from './request.js'

export function insertAgent(data) {
    return request({
        url: 'agent/insert',
        method: 'post',
        params: data
    });
}
// agent/getAgent
export function getAgentData(data) {
    return request({
        url: 'agent/getAgent',
        method: 'post',
        params: data
    });
}
export function updateAgent(data) {
    return request({
        url: 'agent/update',
        method: 'post',
        params: data
    });
}

export function getAgentList(data) {
    return request({
        url: 'agent/getData',
        method: 'post',
        params: data
    });
}
export function deleteAgent(data) {
    return request({
        url: 'agent/delete',
        method: 'post',
        params: data
    });
}
// agent/updateLanguageID  更改语音
export function updateLanguageID(data) {
    return request({
        url: 'agent/updateLanguageID',
        method: 'post',
        params: data
    });
}
// /agent/getUnregiAgent  users弹窗数据
export function getUnregitAgent(data) {
    return request({
        url: 'agent/getUnregiAgent',
        method: 'post',
        params: data
    });
}

//

export function agentGetDefaultOrg(data) {
    return request({
        url: 'agent/getDefaultOrg',
        method: 'post',
        params: data
    });
}
// agentActivities/getEveryMonth 折线图


export function getEveryMonth(data) {
    return request({
        url: 'agentActivities/getEveryMonth',
        method: 'post',
        params: data
    });
}
// /agentActivities/getMonthlySummary  业绩对比
export function getMonthlySummary(data) {
    return request({
        url: 'agentActivities/getMonthlySummary',
        method: 'post',
        params: data
    });
}
// /project/getTopProject 项目点击率排名
export function getTopProject(data) {
    return request({
        url: 'project/getTopProject',
        method: 'post',
        params: data
    });
}
// /agentActivities/getDepartMonthData 取部门业绩三条折线接口
export function getDepartMonthData(data) {
  return request({
      url: 'agentActivities/getDepartMonthData',
      method: 'post',
      params: data
  });
}
// /agentActivities/getDepartMonthlySummary  获取部门业绩的各项数据接口以及部门排名
export function getDepartMonthlySummary(data) {
  return request({
      url: 'agentActivities/getDepartMonthlySummary',
      method: 'post',
      params: data
  });
}