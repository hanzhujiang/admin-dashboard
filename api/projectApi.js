import request from './request.js'
export function insertProject(data) {
    return request({
        url: 'project/insert',
        method: 'post',
        params: data
    });
}

// 列表
export function getProjectList(data) {
    return request({
        url: 'project/getData',
        method: 'post',
        params: data
    });
}

export function updateProject(data) {
    return request({
        url: 'project/update',
        method: 'post',
        params: data
    });

}
// project/getProject
export function getProject(data) {
    return request({
        url: 'project/getProject',
        method: 'post',
        params: data
    });
}

export function deleteProject(data) {
    return request({
        url: 'project/delete',
        method: 'post',
        params: data
    });
}

// project/getDataByPrimaryKey
export function getProjectData(data) {
    return request({
        url: 'project/getDataByPrimaryKey',
        method: 'post',
        params: data
    });
}

//视图
// project/getProjectPictureData
export function getProjectPictureData(data) {
    return request({
        url: 'project/getProjectPictureData',
        method: 'post',
        params: data
    });
}

export function getAllProjectData(data) {
    return request({
        url: 'project/getAllProjectData',
        method: 'post',
        params: data
    });
}

export function getPlatformProject(data) {
    return request({
        url: 'project/getPlatformProject',
        method: 'post',
        params: data
    });
}

export function getTreeData(data) {
    return request({
        url: 'agencyproject/getTreeData',
        method: 'post',
        params: data
    });
}
// ------------------------project-contactInsert

// 新增联系人接口
export function insertAgencyProjectContact(data) {
    return request({
        url: 'agencyProjectContact/insert',
        method: 'post',
        params: data
    });
}
// 获取所以联系人接口
export function agencyProjectContactList(data) {
    return request({
        url: 'agencyProjectContact/getData',
        method: 'post',
        params: data
    });
}

// 删除联系人接口
export function deltadeAgencyProjectContact(data) {
    return request({
        url: 'agencyProjectContact/delete',
        method: 'post',
        params: data
    });
}

// -------------------------------------------------------------commissionrate
// ProjectContact查询接口地址：/commission/getData
export function getCommissionData(data) {
    return request({
        url: 'commission/getData',
        method: 'post',
        params: data
    });

}
// commission修改接口地址：/commission/update
export function updateCommissionData(data) {
    return request({
        url: 'commission/update',
        method: 'post',
        params: data
    });

}
//commission新增接口地址：/commission/insert
export function insertCommissionData(data) {
    return request({
        url: 'commission/insert',
        method: 'post',
        params: data
    });

}
// commission删除接口地址：/commission/delete
export function deleteCommissionData(data) {
    return request({
        url: 'commission/delete',
        method: 'post',
        params: data
    });

}

// ---------------all project-attachment
export function deleteAttachment(data) {
    return request({
        url: 'attachment/delete',
        method: 'post',
        params: data
    });
}

export function getAttachmentList(data) {
    return request({
        url: 'attachment/getData',
        method: 'post',
        params: data
    });
}

export function insertAttachment(data) {
    return request({
        url: 'attachment/insert',
        method: 'post',
        params: data
    });
}
// attachment/insertList
export function insertAttachmentList(data) {
    return request({
        url: 'attachment/insertList',
        method: 'post',
        params: data
    });
}

export function updateAttachment(data) {
    return request({
        url: 'attachment/update',
        method: 'post',
        params: data
    });
}

// picture/insertList
export function insertPictureList(data) {
    return request({
        url: 'picture/insertList',
        method: 'post',
        params: data
    });
}
// picture----------
export function deletePicture(data) {
    return request({
        url: 'picture/delete',
        method: 'post',
        params: data
    });
}
export function getPictureList(data) {
    return request({
        url: 'picture/getData',
        method: 'post',
        params: data
    });
}
export function insertPicture(data) {
    return request({
        url: 'picture/insert',
        method: 'post',
        params: data
    });
}
export function uptadePicture(data) {
    return request({
        url: 'picture/update',
        method: 'post',
        params: data
    });

}

// ----Property
export function deleteProperty(data) {
    return request({
        url: 'property/delete',
        method: 'post',
        params: data
    });
}
export function getPropertyList(data) {
    return request({
        url: 'property/getData',
        method: 'post',
        params: data
    });
}
export function getProperty(data) {
    return request({
        url: 'property/getProperty',
        method: 'post',
        params: data
    });
}
export function getPropertyAddress(data) {
    return request({
        url: 'project/selectAddressByPrimaryKey',
        method: 'post',
        params: data
    });
}
export function insertProperty(data) {
    return request({
        url: 'property/insert',
        method: 'post',
        params: data
    });
}
export function uptadeProperty(data) {
    return request({
        url: 'property/update',
        method: 'post',
        params: data
    });
}
// property/ExcelProperty  上传文件解析数据
export function importProperty(data) {
    return request({
        url: 'property/excelGetData',
        method: 'post',
        params: data
    });
}
// 解析数据 存库  property/excelImport
export function importPropertyData(data) {
    return request({
        url: 'property/excelImport',
        method: 'post',
        params: data
    });
}
// 批量上传模板下载  attachment/getExcelISForAs
export function getExcelISForAs(data) {
    return request({
        url: 'attachment/getExcelISForAs',
        method: 'post',
        params: data
    });
}

export function insertUpdateDisplayInfo(data) {
    return request({
        url: 'projectDisplayInfo/insertAndUpdate',
        method: 'post',
        params: data
    });
}
// projectDisplayInfo/getData，参数：projectid  展厅回显接口
export function getDisplayInfo(data) {
    return request({
        url: 'projectDisplayInfo/getData',
        method: 'post',
        params: data
    });
}
export function deleteDisplayInfo(data) {
    return request({
        url: 'projectDisplayInfo/delete',
        method: 'post',
        params: data
    });
}

// -----------------------------shareto模块
//弹窗数据
export function getSharetoPopList(data) {
    return request({
        url: 'agency/getData',
        method: 'post',
        params: data
    });
}

// agency/getShareData
// 所有数据
export function getSharetoList(data) {
    return request({
        url: 'agency/getShareData',
        method: 'post',
        params: data
    });
}
// agencyproject/insert
//增加
export function insertShareto(data) {
    return request({
        url: 'agencyproject/insert',
        method: 'post',
        params: data
    });
}
export function insertSingle(data) {
    return request({
        url: 'agencyproject/insertSingle',
        method: 'post',
        params: data
    });
}
export function getOneCommissionData(data) {
    return request({
        url: 'agencyproject/getCommissionData',
        method: 'post',
        params: data
    });
}

export function getUpperShareAgency(data) {
    return request({
        url: 'agencyproject/getUpperShareAgency',
        method: 'post',
        params: data
    });
}
// agencyproject/delete 删除
export function deleteShareto(data) {
    return request({
        url: 'agencyproject/delete',
        method: 'post',
        params: data
    });
}
export function checkExistAssociated(data) {
    return request({
        url: 'agencyproject/checkExistAssociated',
        method: 'post',
        params: data
    });
}

export function checkExistPendingApproval(data) {
    return request({
        url: 'agencyproject/checkExistPendingApproval',
        method: 'post',
        params: data
    });
}

export function pushNewProject(data) {
    return request({
        url: 'project/pushMessage',
        method: 'post',
        params: data
    });
}

// 查询共享项目详细数据接口地址：/project/getSharedProjects
export function getSharedProjects(data) {
    return request({
        url: 'project/getSharedProjects',
        method: 'post',
        params: data
    });
}


export function attachmentGetData(data) {
    return request({
        url: 'attachment/getData',
        method: 'post',
        params: data
    });
}


export function agencyAttachmentinsert(data) {
    return request({
        url: 'agency/attachmentinsert',
        method: 'post',
        params: data
    });
}


export function attachmentDelete(data) {
    return request({
        url: 'attachment/delete',
        method: 'post',
        params: data
    });
}


export function agencyApproverInsert(data) {
    return request({
        url: 'agencyApprover/insert ',
        method: 'post',
        params: data
    });
}

export function agencyApproverGetData(data) {
    return request({
        url: 'agencyApprover/getData',
        method: 'post',
        params: data
    });
}

// 佣金  
export function commissionGetAgencyCommissionData(data) {
    return request({
        url: 'commission/getAgencyCommissionData',
        method: 'post',
        params: data
    });
}

export function commissionGetAgentCommissionData(data) {
    return request({
        url: 'commission/getAgentCommissionData',
        method: 'post',
        params: data
    });
}

export function commissionGetSharedProjectCommission(data) {
    return request({
        url: 'commission/getSharedProjectCommission',
        method: 'post',
        params: data
    });
}

export function commissionGetIfdefaultData(data) {
    return request({
        url: 'commission/getIfdefaultData',
        method: 'post',
        params: data
    });
}


export function commissionAgencyCommissionInsert(data) {
    return request({
        url: 'commission/agencyCommissionInsert',
        method: 'post',
        params: data
    });
}


// 分享

export function channelGetDataByReferID(data) {
    return request({
        url: 'channel/getDataByReferID',
        method: 'post',
        params: data
    });
}


export function commissionInsertAgencyprojectCommission(data) {
    return request({
        url: 'commission/insertAgencyprojectCommission',
        method: 'post',
        params: data
    });
}

// commission/insertCommissionBy99
export function commissionInsertCommissionBy99(data) {
    return request({
        url: 'commission/insertCommissionBy99',
        method: 'post',
        params: data
    });
}

// agencyApprove/update

export function agencyApproveUpdate(data) {
    return request({
        url: 'agencyApprove/update',
        method: 'post',
        params: data
    });
}
export function agencyGetToShareAgency(data) {
    return request({
        url: 'agency/getToShareAgency',
        method: 'post',
        params: data
    });
}

// /logo/getData
export function getProjectLogo(data) {
    return request({
        url: 'logo/getData',
        method: 'post',
        params: data
    });
}
// /logo/insert 
export function insertProjectLogo(data) {
    return request({
        url: 'logo/insert',
        method: 'post',
        params: data
    });
}
// projectArticle/getData
export function getProjectArticle(data) {
    return request({
        url: 'projectArticle/getData',
        method: 'post',
        params: data
    });
}
// projectArticle/insert 
export function insertProjectArticle(data) {
    return request({
        url: 'projectArticle/insert',
        method: 'post',
        params: data
    });
}
// projectArticle/update
export function updateProjectArticle(data) {
    return request({
        url: 'projectArticle/update',
        method: 'post',
        params: data
    });
}
// /projectArticle/delete  输入参数：ids：articleid
export function deleteProjectArticle(data) {
    return request({
        url: 'projectArticle/delete',
        method: 'post',
        params: data
    });
}
// project/getCategory 查询项目类别
export function getProjectCategory(data) {
    return request({
        url: 'project/getCategory',
        method: 'post',
        params: data
    });
}
// property/updateHoldingflag   参数：propertyid，holdingflag
export function updateHoldingflag(data) {
    return request({
        url: 'property/updateHoldingflag',
        method: 'post',
        params: data
    });
}
// project/getHomeProject  查询project Edit 页面数据
export function getHomeProject(data) {
    return request({
        url: 'project/getHomeProject',
        method: 'post',
        params: data
    });
}
// agencyproject/update  修改agencyproject  热卖字段
export function updateAgencyproject(data) {
    return request({
        url: 'agencyproject/update',
        method: 'post',
        params: data
    });
}
export function updateSingle(data) {
    return request({
        url: '/agencyproject/updateSingle',
        method: 'post',
        params: data
    });
}

//   edm body 图片上传接口
export function insertEdm(data) {
    return request({
        url: 'edm/insert',
        method: 'post',
        params: data
    });
}
//   edm body 图片删除接口
export function deleteEdm(data) {
    return request({
        url: 'edm/delete',
        method: 'post',
        params: data
    });
}
//   edm body 图片查询接口
export function getEdm(data) {
    return request({
        url: 'edm/getData',
        method: 'post',
        params: data
    });
}
// project/getSharedToAgency  分享出去的项目list
export function getSharedToAgency(data) {
  return request({
      url: 'project/getSharedToAgency',
      method: 'post',
      params: data
  });
}
// 价目表pdf 下载
// property/PdfProperty
export function PdfProperty(data) {
  return request({
      url: 'property/PdfProperty',
      method: 'post',
      params: data
  });
}

// agency/getShareData
// 所有数据
export function getSharedFromAgency(data) {
    return request({
        url: 'project/getSharedFromAgency',
        method: 'post',
        params: data
    });
}

export function agencyProjectGetAllData(data) {
    return request({
        url: 'agencyproject/getAllData',
        method: 'post',
        params: data
    });
}
