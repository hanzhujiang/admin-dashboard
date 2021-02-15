import { getApprovingCount,getAgencyApprove } from "@/api/saleApi.js";
export default{
  WAITING_TOTAL(state){
    getApprovingCount().then(res=>{ //等待审批数量,小红点
      if (res.data.success) {
        
        state.commit('WAITING_TOTAL',res.data.total)
      }
    })
  },
  CHANNEL_WAITING_TOTAL(state){
    getAgencyApprove().then(res=>{ //等待审批数量,小红点
      if (res.data.success) {
        state.commit('CHANNEL_WAITING_TOTAL',res.data.total)
      }
    })
  },
}
