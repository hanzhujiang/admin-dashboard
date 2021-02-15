<template>
  <div>
    <div style="padding:15px;">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <!-- <div style="padding:30px 0 30px 20px;">
            <span style="font-size: 40px; font-weight:500;paddin-top:30px;">
            {{rs.sales_advice}}</span>
          </div> -->
           <div style="border: 1px solid;margin-top:10px;padding:20px;font-size: 20px;">
            <p>{{rs.project_upper}} :<span style="padding-left:5px;color: #337ab7;">
              {{saleAdviceData.projectname}}</span></p>
          </div>
          <div class="states" >
            {{setStatus()}}
            <!-- {{AspectObj[saleAdviceData.salestatus]}} -->
          </div>
          <div style="padding-top:17px;">
            <span style="width:100px;font-size:12px;padding-left:20px;font-weight:bold;">
            {{rs.reservation_date}} :</span>
            <span>{{setformatDate(saleAdviceData.logdatetime)}}</span>
          </div>
          <div  style="padding-top:17px;">
            <span style="width:100px;font-size:12px;padding-left:20px; font-weight:bold;">{{saleAdviceData.isagent=='1'?rs.sales_agent:rs.agency}} :</span>
            <span v-if="saleAdviceData.isagent=='1'">
              <span v-if="saleAdviceData.agentid" style="font-size:12px;padding-right:10px;">
                <span>{{saleAdviceData.firstname+' '+saleAdviceData.lastname}},&nbsp;&nbsp;{{saleAdviceData.mobile}}</span>
              </span>
              <span v-else style="font-size:12px;padding-right:10px;">{{userFirstname+' '+userLastname}},{{userMobile}}</span>
            </span>
            <span v-else>{{saleAdviceData.firstname}},{{saleAdviceData.mobile}}</span>
              <el-button class="small block_button bg_blue" size="mini" @click="dialogShow" v-if="btnStatus.isChangeAgent&&!readonly">
              <img class="icon" src="@/assets/imgs/common/common_5.png" alt="">  {{rs.change_agent}}</el-button>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div style="height:200px;width:100%;overflow:hidden;margin-top:10px;">
          <img style="wdith:80%" :src="saleAdviceData.projectlogourl+'?x-oss-process=image/resize,m_fixed,h_160,w_272'" alt="">
          </div>
        </el-col>
      </el-row>
     
    </div>
    <select-agent :sync="dialogVisible" @select="addList" @update:sync="dialogVisible=false"></select-agent>
  </div>
</template>
<script>
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { getAgentList } from '@/api/agentApi.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      total:null,
      dialogVisible:false,
      adviceList:[],
      options:[],
      value:'',
      condition:'',
      phoneNumber:'',
      projectName:'',
      // time:null,

      userInfo:{},
      userFirstname:'',
      userLastname:'',
      userMobile:"",

      data:{
        condition:'',  //搜索关键字
        pagesize : 1, //分页
        pagenum :1, //页码
        languagetype:'',
      },
      AspectObj:{}
    }
  },
  created(){

    // this.time =  formatDate(new Date(new Date().getTime()), 'yyyy-MM-dd:ss:hh:mm')
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.userFirstname = this.userInfo.firstname
    this.userLastname = this.userInfo.lastname
    this.userMobile = this.userInfo.mobilenumber
    this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
    this.data.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)

    JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(element => {
      this.AspectObj[element.code] = element.value;
    });
    this.AspectObj =Object.assign({}, this.AspectObj)

  },
   computed: {
      ...mapGetters(['se','rs','languagetype','saleAdviceData','btnStatus','control','salesrs']),
      readonly(){
        if(this.control.sales_advice === '02'){
          return true
        }else{
          return false
        }
      }
    },
    components: {
      'select-agent': resolve => require(['@/common/SelectAgent.vue'], resolve),
     },
  methods:{
    setAgentName(row) {
        this.dialogShow =!this.dialogShow;
    },
    setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy')
      }else{
        return '-'
      }
    },
    setStatus(){
      if(this.saleAdviceData.salestatus == '00'){
        return this.salesrs&&this.salesrs.sta_reservation_pending?this.salesrs.sta_reservation_pending:this.rs.sta_reservation_pending
      }else if(this.saleAdviceData.salestatus == '01'){
        return this.salesrs&&this.salesrs.sta_reservation_approved?this.salesrs.sta_reservation_approved:this.rs.sta_reservation_approved
      }else if(this.saleAdviceData.salestatus == '10'){
        return this.salesrs&&this.salesrs.sta_contract_issued?this.salesrs.sta_contract_issued:this.rs.sta_contract_issued
      }else if(this.saleAdviceData.salestatus == '20'){
        return this.salesrs&&this.salesrs.sta_conditional_exchanged?this.salesrs.sta_conditional_exchanged:this.rs.sta_conditional_exchanged
      }else if(this.saleAdviceData.salestatus == '30'){
        return this.salesrs&&this.salesrs.sta_unconditional_exchanged?this.salesrs.sta_unconditional_exchanged:this.rs.sta_unconditional_exchanged
      }else if(this.saleAdviceData.salestatus == '40'){
        return this.salesrs&&this.salesrs.sta_pending_settlement?this.salesrs.sta_pending_settlement:this.rs.sta_pending_settlement
      }else if(this.saleAdviceData.salestatus == '50'){
        return this.salesrs&&this.salesrs.sta_settled?this.salesrs.sta_settled:this.rs.sta_settled
      }else{
        return this.AspectObj[this.saleAdviceData.salestatus]
      }
    },
    restoration(){
      this.data.pagenum = 1
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allList(this.data)
    },
    getData(type){
      if(type=='1'){
        this.data.languagetype = localStorage.getItem('languagetype')
        this.allList(this.data)
      }else{
        this.restoration()
      }
    },
    //点击按钮
    dialogShow(){
      this.dialogVisible = !this.dialogVisible
        this.allList()
    },
    //保存按钮
    addList(row){
      // debugger
      this.dialogVisible = false
        // agentid
        this.allAddList(row)

    },
    //保存的数据
    allAddList(row){
      this.saleAdviceData.mobile = row.phonenumber
      this.saleAdviceData.firstname = row.firstname
      this.saleAdviceData.lastname = row.lastname
      this.saleAdviceData.agentid = row.agentid
      // this.saleAdviceData.logdatetime = this.time
    },
    ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },
    //所有数据
    allList(data){
      getAgentList(data).then(res=>{
        if (res.data.success) {
          this.adviceList = res.data.data
          this.total = res.data.total
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
  },
  watch:{
    se(){
      JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(element => {
        this.AspectObj[element.code] = element.value;
      });
      this.AspectObj =Object.assign({}, this.AspectObj)
    }
  }
}
</script>
<style>
.states{
  padding: 30px 0px 10px 20px;
  color:  rgb(221, 75, 57);
  font-weight: 600;
  font-size: 20px;
}
</style>

