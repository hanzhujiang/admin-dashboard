<template>
  <div class="wrapper clearfix">
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.project_detail}} - {{project_name}}</span>
      </div>
      <div class="tools">
        <el-button   class="bg_save_btn" v-if="!readonly"  @click="handleSave" size="small">{{rs.save}}</el-button>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="box">
            <div class="box-header clearfix">
              <div class="title">
                <img src="../../../assets/imgs/User Manage_icon_zjgs@2x.png" alt="">
                <span >{{rs.agency_commission_rate}}</span>
              </div>
            </div>
            <div class="help-line" v-if="isrunning == '0'">{{rs.agency_commission_rate_help}}</div>
            <div class="box-body clearfix">
              <el-row :gutter="10" v-if="isrunning== '1'">
                <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                  <div class="title">{{rs.exchange_commission}}:</div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content" style="padding-top:5px;">{{companyCommission1.express}}</div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                  <div class="title">{{rs.settle_commission}}:</div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content" style="padding-top:5px;">{{companyCommission2.express}}</div>
                </el-col>
              </el-row>    
              
              <el-row :gutter="10"  v-if="isrunning == '0'">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <div class="title">{{rs.exchange_commission}}:</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <div class="content" style="padding:10px 0; text-align:right;">
                        {{rs.commission_rate}}
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="6" :lg="6" :xl="6">
                      <div class="content">
                        <el-input size="small" v-model="companyCommission1.commissionrate" :disabled="readonly"></el-input>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="6" :lg="6" :xl="6">
                      <div class="content">
                        <el-select size="small" v-model="companyCommission1.ratetype" :disabled="readonly">
                         <el-option
                          v-for="item in optionsList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.code">
                        </el-option>
                        </el-select>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <div class="content" style="padding:10px 0; text-align:right;">
                        +&nbsp;&nbsp;{{rs.bonus}}
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="6" :lg="6" :xl="6">
                      <div class="content">
                        <el-input size="small" v-model="companyCommission1.bonus" :disabled="readonly"></el-input>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="6" :lg="6" :xl="6">
                      <div class="content">
                        <el-select size="small" v-model="companyCommission1.bonustype" :disabled="readonly">
                          <el-option
                          v-for="item in optionsList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <div class="title">{{rs.settle_commission}}:</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <div class="content" style="padding:10px 0; text-align:right;">
                        {{rs.commission_rate}}
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="6" :lg="6" :xl="6">
                      <div class="content">
                        <el-input size="small" v-model="companyCommission2.commissionrate" :disabled="readonly"></el-input>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="6" :lg="6" :xl="6">
                      <div class="content">
                        <el-select size="small" v-model="companyCommission2.ratetype" :disabled="readonly">
                          <el-option
                            v-for="item in optionsList"
                            :key="item.value"
                            :label="item.value"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <div class="content" style="padding:10px 0; text-align:right;">
                        +&nbsp;&nbsp;{{rs.bonus}}
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="6" :lg="6" :xl="6">
                      <div class="content">
                        <el-input size="small" v-model="companyCommission2.bonus" :disabled="readonly"></el-input>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="6" :lg="6" :xl="6">
                      <div class="content">
                        <el-select size="small"  v-model="companyCommission2.bonustype" :disabled="readonly">
                         <el-option
                          v-for="item in optionsList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.code">
                        </el-option>
                        </el-select>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>    
            </div>
          </div>
        </el-col>  
      </el-row>  
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="box" style="margin-top: 20px;">
            <div class="box-header clearfix">
              <div class="title">
                <img src="../../../assets/imgs/User Manage_icon_zjgs@2x.png" alt="">
                <span >{{rs.agent_commission_rate}}</span>
              </div>
              <div class="tools">
                <el-checkbox :label="rs.use_default_commission_rate" @change="changeDefault" v-model="ifdefault"  :disabled="readonly" size="small"></el-checkbox>
              </div>
            </div>
            <div class="help-line">{{rs.agent_commission_rate_help}}</div>
            <div class="box-body clearfix">
              <div class="table_box">
                <el-table
                  :data="commissionData"
                  :empty-text = rs.no_data
                  style="width: 100%"
                  :show-overflow-tooltip="true"
                  size="mini">
                  <el-table-column
                    prop="level"
                    :label="rs.commission_level"
                    width='200'
                    align='center'>
                    <template slot-scope="scope">
                      <el-row :gutter="10">
                        <el-col :span="24">
                           <span>{{levelList[scope.row.option]}}</span>
                        </el-col>  
                        <el-col :span="24">
                           <span>{{rs.exchange}}:{{scope.row.exchange.express}}</span>
                        </el-col>  
                        <el-col :span="24">
                           <span>{{rs.settlement}}:{{scope.row.settled.express}}</span>
                        </el-col>  
                      </el-row>  
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="exchange_commission"
                    :label="rs.exchange_commission"
                    align="center">
                    <template slot-scope="scope">
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <div style="padding:5px;text-align:right;">
                            {{rs.commission_rate}}
                          </div>
                        </el-col>  
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <el-input size="small" v-model="scope.row.exchange.commissionrate" :disabled="ifdefault=='1'?true:false||readonly"></el-input>
                        </el-col>  
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <el-select size="small" v-model="scope.row.exchange.ratetype" :disabled="ifdefault=='1'?true:false||readonly">
                          <el-option
                            v-for="item in optionsList"
                            :key="item.value"
                            :label="item.value"
                            :value="item.code">
                          </el-option>
                          </el-select>
                        </el-col>  
                      </el-row>  
                      <el-row :gutter="10" style="padding-top:5px;">
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <div style="padding:5px;text-align:right;">
                          +&nbsp;&nbsp;{{rs.bonus}}
                          </div>
                        </el-col>  
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <el-input size="small" v-model="scope.row.exchange.bonus" :disabled="ifdefault=='1'?true:false||readonly"></el-input>
                        </el-col>  
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <el-select size="small" v-model="scope.row.exchange.bonustype" :disabled="ifdefault=='1'?true:false||readonly">
                          <el-option
                            v-for="item in optionsList"
                            :key="item.value"
                            :label="item.value"
                            :value="item.code">
                          </el-option>
                          </el-select>
                        </el-col>  
                      </el-row>  
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="settle_commission"
                    :label="rs.settle_commission"
                    align="center">
                    <template slot-scope="scope">
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <div style="padding:5px;text-align:right;">
                            {{rs.commission_rate}}
                          </div>
                        </el-col>  
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <el-input size="small" v-model="scope.row.settled.commissionrate" :disabled="ifdefault=='1'?true:false||readonly"></el-input>
                        </el-col>  
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <el-select size="small" v-model="scope.row.settled.ratetype" :disabled="ifdefault=='1'?true:false||readonly">
                          <el-option
                            v-for="item in optionsList"
                            :key="item.value"
                            :label="item.value"
                            :value="item.code">
                          </el-option>
                          </el-select>
                        </el-col>  
                      </el-row>  
                      <el-row :gutter="10" style="padding-top:5px;">
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <div style="padding:5px;text-align:right;">
                            +&nbsp;&nbsp;{{rs.bonus}}
                          </div>
                        </el-col>  
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <el-input size="small" v-model="scope.row.settled.bonus"  :disabled="ifdefault=='1'?true:false||readonly"></el-input>
                        </el-col>  
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                          <el-select size="small" v-model="scope.row.settled.bonustype"  :disabled="ifdefault=='1'?true:false||readonly">
                            <el-option
                              v-for="item in optionsList"
                              :key="item.value"
                              :label="item.value"
                              :value="item.code">
                            </el-option>
                          </el-select>
                        </el-col>  
                      </el-row>  
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {commissionGetAgencyCommissionData,commissionGetAgentCommissionData,commissionAgencyCommissionInsert,commissionGetIfdefaultData} from '@/api/projectApi.js'
export default{
  data() {
    return {
      ifdefault:1,
      isrunning:true,
      companyCommissionData:[],
      companyCommission1:{
            ratetype:'01',
            commissionrate:0,
            bonustype:'02',
            bonus:0
            },
      companyCommission2:{
            ratetype:'01',
            commissionrate:0,
            bonustype:'02',
            bonus:0
            },
      activeNames: ['1', '2', '3'],
      commissionData: [],
      levelList:{},
      option:'00',
      project_name:''
    }
  },
  components: {
    // 'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    // 'navigation':resolve=> require(['../edit_project/template/navigation.vue'],resolve),
  },
  created(){
    this.getCompanyCommission()
    this.getAgentCommission()
    this.optionsList = JSON.parse(localStorage.getItem('selectlist')).RATE_TYPE_LIST
    JSON.parse(localStorage.getItem('selectlist')).LEVEL_LIST.forEach(ele => {
      this.levelList[ele.code] = ele.value  
    });
    this.levelList = Object.assign({},this.levelList)
    this.getName()
  },
  methods:{
    validatorOption(data){
        // /^[0-9]*$/
      let re = new RegExp(/\d/);
      let flag = false;
      data.forEach(ele =>{
        if(re.test(ele.exchange.commissionrate)&&re.test(ele.exchange.bonus)&&re.test(ele.settled.commissionrate)&&re.test(ele.settled.bonus)){
          if(ele.exchange.commissionrate<0||ele.exchange.bonus<0||ele.settled.commissionrate<0||ele.settled.bonus<0){
            flag = this.rs.err_msg_commission_minus
          }else{
            if(ele.exchange.commissionrate == 0&&ele.exchange.bonus==0){
              flag = this.rs.err_msg_commission_zero
            }
            if(ele.settled.commissionrate ==0 && ele.settled.bonus == 0){
               flag = this.rs.err_msg_commission_zero
            }
          }
        }else{
         flag = this.rs.err_msg_commission_format
        }
      })
      return flag
      },
    //保存 
    handleSave(){
      let arr = [];
      let obj = {exchange:this.companyCommission1,settled:this.companyCommission2,option:this.option}
      arr.push(obj)
      if(this.validatorOption(this.commissionData)){
        this.$message.error(this.validatorOption(this.commissionData));
        return
      }
      if(this.validatorOption(arr)){
        this.$message.error(this.validatorOption(arr));
        return
      }


      if (this.ifdefault) {
        this.ifdefault = '1'
      } else {
        this.ifdefault = '0'
      }
      let data = {
        agencycommissionlist:JSON.stringify(obj),
        agentcommissionlist:JSON.stringify(this.commissionData),
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        ifdefault:this.ifdefault,
        vendorid:JSON.parse(sessionStorage.getItem('vendorid')),
      }
     if (this.isrunning=='0') {
       delete data.vendorid
     } 
      commissionAgencyCommissionInsert(data).then(res=>{
        if (res.data.success) {
          this.getCompanyCommission()
          this.getAgentCommission()
          this.$message.success(this.rs.info_msg_insert_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getName(){
      let text = ''
      JSON.parse(JSON.parse(sessionStorage.getItem('ProjectList')).shortname).forEach(ele => {
         if (ele.type=='00') {
          text = ele.content
        }
        if (ele.type==localStorage.getItem('languagetype')) {
          if (ele.content==''||ele.content==undefined) {
            this.project_name = text
          }else{
            this.project_name = ele.content
          }
        }
      });
    },
    //公司回显
    getCompanyCommission(){
      let data = {
        vendorid:JSON.parse(sessionStorage.getItem('vendorid')),
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        commissiontype:'01',
      }
      commissionGetAgencyCommissionData(data).then(res=>{
        if(res.data.success){
          
          this.isrunning = res.data.isrunning;
          if(res.data.exchange){
            this.companyCommission1 = res.data.exchange
          }
          if(res.data.settled){
            this.companyCommission2 = res.data.settled
          }
          if (res.data.option) {
            this.option = res.data.option  
          }
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
  // 雇员回显

    getAgentCommission(){
      let data = {
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        commissiontype:'02',
      }
      commissionGetAgentCommissionData(data).then(res=>{
        if(res.data.success){
          this.ifdefault = res.data.ifdefault
          this.commissionData=res.data.agentcommissionlist
          if (res.data.agentcommissionlist.length>=res.data.commissionlevelnumber) {
            this.commissionData=[]
            res.data.agentcommissionlist.forEach((val,i) => {
              if (i+1<=res.data.commissionlevelnumber) {
                this.commissionData.push(val)
              }
            });
          }else if(res.data.agentcommissionlist.length<res.data.commissionlevelnumber){
            let len = res.data.commissionlevelnumber-res.data.agentcommissionlist.length
            for(var i=0; i<len; i++){
              this.commissionData.push({
                exchange:{
                  ratetype:'01',
                  commissionrate:0,
                  bonustype:'02',
                  bonus:0
                },
                settled:{
                  ratetype:'01',
                  commissionrate:0,
                  bonustype:'02',
                  bonus:0
                },
                option:'0'+(len+i)
              })
            }
          }
          if (res.data.ifdefault=='1') {
            this.ifdefault=true
          }else{
            this.ifdefault=false
          }
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    
    changeDefault(val){
      if (val) {
        this.ifdefault = val
        let data = {
          agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
          commissiontype:'02'
        }
        commissionGetIfdefaultData(data).then(res=>{
        if (res.data.success) {
          this.commissionData = res.data.agentcommissionlist
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
      }
      
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    
  },
  watch:{
    se(){
      this.optionsList = JSON.parse(localStorage.getItem('selectlist')).RATE_TYPE_LIST
      JSON.parse(localStorage.getItem('selectlist')).LEVEL_LIST.forEach(ele => {
        
        this.levelList[ele.code] = ele.value  
      });
      this.levelList = Object.assign({},this.levelList)
    },
    languagetype(){
      this.getName()
    } 
    
  },
  computed: {
    ...mapGetters(['rs','se','languagetype','control']),
    readonly(){
      if(this.control.project_detail ==='02'){
        return true
      }else{
        return false
      }
    },
  }
}
</script>