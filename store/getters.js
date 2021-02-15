import { get } from "http";

export default{
  rs(state){
    return state.resourcelist
  },
  salesrs(state){
    return state.salesresourcelist
  },
  se(state){
    return state.selectlist
  },
  languagetype(state){
    return state.languagetype
  },
  control(state){
    return state.control
  },
  controlrouter(state){
    return state.controlrouter
  },
  saleAdviceData(state){
    return state.saleAdviceData
  },
  btnStatus(state){
    return state.btnStatus
  },
  navPathList(state){
    return state.navPathList
  },
  watingTotal(state){ //等待审批数量,小红点
    return state.waitingTotal
  },
  channelWatingTotal(state){ //等待审批数量,小红点(渠道)
    return state.channelWaitingTotal
  },

  GET_SHOW_LOADING(state){
    return state.show_loading
  },

}
