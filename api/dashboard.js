import request from './request.js'

export function getSalsChartData(data){
    return request({
      url: "property/getChartData",
      method: 'post',
      params: data
    });
  }

export function getSalsPlanChartData(data){
    return request({
      url: "property/getPieData",
      method: 'post',
      params: data
    });
  }
  // property/getHousePieData
  export function getSalsPlanHouseChartData(data){
    return request({
      url: "property/getHousePieData",
      method: 'post',
      params: data
    });
  }
  // property/getAreaSale

  export function getSalsAreaChartData(data){
    return request({
      url: "property/getAreaSale",
      method: 'post',
      params: data
    });
  }



  export function getLastestSalsOrderData(data){
    return request({
      url: "property/getLatestSalesData",
      method: 'post',
      params: data
    });
  }

  
  export function getLastestAccessData(data){
    return request({
      url: "agent/getLatestAccess",
      method: 'post',
      params: data
    });
  }


  export function getProjectPVData (data){
    return request({
      url: "  project/getProjectPV",
      method: 'post',
      params: data
    });
  }


  export function  getPropertyPVData (data){
    return request({
      url: " property/getPropertyPV",
      method: 'post',
      params: data
    });
  }

  

export function  getClientContactData (data){
  return request({
    url: "client/getClientContact",
    method: 'post',
    params: data
  });
}
  
  export function  getClientResourceData (data){
    return request({
      url: "client/getClientSource",
      method: 'post',
      params: data
    });
  }

  

  export function  clientGetClientCount (data){
    return request({
      url: "client/getClientCount",
      method: 'post',
      params: data
    });
  }