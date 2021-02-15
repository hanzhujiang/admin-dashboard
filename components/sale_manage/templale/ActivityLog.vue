<template>
  <div class="box" style="margin-bottom: 15px;">
    <div class="box-header">
      <div class="box-title" @click="fn">
        <span><i class="fa fa-files-o" style="padding: 0px 10px 0px 0px;"></i>{{rs.activity_log}}</span>
      </div>
    </div>
    <div class="box-body clearfix"  >
      <div v-for="(d,i) in saleAdviceData.saleloglist" :key="i"  
        style="margin:5px;border-bottom:1px solid #dcdcdc;width:100%" class="clearfix">
        <!-- <div class="fl"><img :src="d.photo" alt="" width="30px" class="img-circle"></div> -->
        <div class="fl" style="width:100%">
          <p class="text"> <span class="fl">{{d.firstname}}&nbsp;{{d.lastname}}</span><span class="fr min_fo" style="padding-right:10px">{{setformatDate(d.logdatetime)}}</span></p>
          <p class="text">{{setStatus(d)}}</p>
          <p  class="text" v-html="d.comments">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      actioncodeObj:{}
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','saleAdviceData','salesrs'])
  },
  created(){
    JSON.parse(localStorage.getItem('selectlist')).OPERATION_TYPE_LIST.forEach(val => {
      this.actioncodeObj[val.code] = val.value
    });
    this.actioncodeObj = Object.assign({}, this.actioncodeObj)
  },
  methods:{
    fn(){
    },
    setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy hh:mm:ss')
      }else{
        return '-'
      }
    },
    setStatus(d){
      if(d.actioncode == '03'){
        return this.salesrs&&this.salesrs.btn_approve_reservation?this.salesrs.btn_approve_reservation:this.rs.btn_approve_reservation
      }else if(d.actioncode == '20'){
        return this.salesrs&&this.salesrs.btn_issue_contract?this.salesrs.btn_issue_contract:this.rs.btn_issue_contract
      }else if(d.actioncode == '30'){
        return this.salesrs&&this.salesrs.btn_conditional_exchange?this.salesrs.btn_conditional_exchange:this.rs.btn_conditional_exchange
      }else if(d.actioncode == '40'){
        return this.salesrs&&this.salesrs.btn_unconditional_exchange?this.salesrs.btn_unconditional_exchange:this.rs.btn_unconditional_exchange
      }else if(d.actioncode == '50'){
        return this.salesrs&&this.salesrs.btn_pending_settle?this.salesrs.btn_pending_settle:this.rs.btn_pending_settle
      }else if(d.actioncode == '60'){
        return this.salesrs&&this.salesrs.btn_settled?this.salesrs.btn_settled:this.rs.btn_settled
      }else{
        return this.actioncodeObj[d.actioncode]
      }
    },
  },
  watch:{
    se(){
      JSON.parse(localStorage.getItem('selectlist')).OPERATION_TYPE_LIST.forEach(val => {
        this.actioncodeObj[val.code] = val.value
      });
      this.actioncodeObj = Object.assign({}, this.actioncodeObj)
    }
  }
}
</script>

<style scoped>
.img-circle{
  border-radius:50%;
  vertical-align: sub;
}
p.text{
  padding: 10px;
  width:100%;
}
.min_fo{
  font-size: 10px;
  padding: 0px 30px;
}
.box-body.clearfix{
  max-height: 700px;
  overflow-x: hidden;
  overflow-y: auto;
}
.box-body.clearfix::-webkit-scrollbar {/*滚动条整体样式*/
  width: 2px;   /*高宽分别对应横竖滚动条的尺寸*/
  height: 2px;
}
.box-body.clearfix::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.2);
}
.box-body.clearfix::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #FFF;
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}

</style>
