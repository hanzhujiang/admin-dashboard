export default{
  RESOURCE_LIST(state,arr){
    state.resourcelist= arr
  },
  SALES_RESOURCE_LIST(state,arr){
    state.salesresourcelist = arr;
  },
  SELECT_LIST(state,arr){
    state.selectlist= arr
  },
  LANGUAGE_TYPE(state,str){
    state.languagetype= str
  },
  CONTROL(state,obj){
    state.control= obj
  },
  CONTROL_ROUTER(state,obj){
    state.controlrouter= obj
  },
  // reserve
  SALE_ADVICE_DATA(state,data){
    state.saleAdviceData = data
  },
  // 判断按钮
  BTN_STATUS(state,obj){
    state.btnStatus = obj
  },
  NAV_PATH_LIST_ADD(state,obj){
    // if ( state.navPathList.length>0) {
    //   for(var i=0;i<state.navPathList.length;i++){
    //     if(state.navPathList[i].name==obj.name){
    //       state.navPathList.remove(state.navPathList[i])
    //       // return
    //     }else{
    //       state.navPathList.push(obj);
    //       // return
    //     }
    //   }
    // }else{
    //   state.navPathList.push(obj);
    // }
    state.navPathList.push(obj);
  },
  NAV_PATH_LIST_REMOVE(state,num){
    if(state.navPathList){
      state.navPathList = state.navPathList.slice(0, num-1);
    }
  },
  WAITING_TOTAL(state,total){ //等待审批数量,小红点
    state.waitingTotal = total
  },
  CHANNEL_WAITING_TOTAL(state,total){ //等待审批数量,小红点(渠道)
    state.channelWaitingTotal = total
  },

  SET_SHOW_LOADING(state,obr){
    state.show_loading = obr
  },

}
