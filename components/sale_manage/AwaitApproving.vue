<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.await_approving}}</span>
      </div>
    </div>
    <div class="wrapper-content clearfix"  v-if="requestList0.length != 0">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6"  v-for="(d,index) in requestList0" style="margin-top:15px" :key="index">
          <div class="card-box">
            <div class="card-title" :class="bgClassName(d.routetype)">
              <span>{{d.routename}}</span>
            </div>
            <div class="card-body clearfix">
              <div class="fl user-img">
                <img class="head_portrait" :src="d.photo" alt="" v-if="d.photo">
                <img src="../../assets/imgs/no_photo.jpg" alt="" v-else>
              </div>
              <div class="card-content fl">
                <p class="salefirstname">{{d.salefirstname}}&nbsp;{{d.salelastname}}</p>
                <p>{{d.shortname}}</p>
                <p>Lot#: {{d.lotnumber}} Unit#: {{d.unitnumber}}</p>
                <p>Request: {{d.requestfirstname}}&nbsp;{{d.requestlastname}}</p>
              </div>
              <span @click="goRouter('/sale_manage/saleAdvice',d,true)" class="sale_detail">{{rs.sale_detail}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>  
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
            <div class="filter-count">
              <span>{{rs.all_approvals}}</span>
            </div>
          </el-col>
           <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
             <div class="filter-count">
              <el-checkbox v-model="sign" class="filter-text" true-label="0"	false-label="1"	>{{rs.show_only_my_approvals}}</el-checkbox>
             </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <page-size :unit='rs.resources' @changeSize="handleSizeChange"></page-size>
          </el-col>
          <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
            <div class="filter-search ">
              <el-input :placeholder="rs.search_requests" v-model="getData.condition" autocomplete="off" 
                  class="input-key" clearable size="mini" @change="search" @keyup.enter='search'>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20" >
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
                    <el-table
                      :data="requestList1"
                      :empty-text = rs.no_data
                      :row-class-name="tableRowClassName"
                      style="width: 100%;"
                      tooltip-effect="light"
                      size="mini">
                      <el-table-column
                        prop="routename"
                        :show-overflow-tooltip="true"
                        width="130"
                        :label="rs.request_type">
                      </el-table-column>
                        <el-table-column
                        :label="rs.applicant"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <p >{{scope.row.requestfirstname}}</p>
                          <p style="padding-left:5px">{{scope.row.requestlastname}}</p>
                          <!-- <span>{{scope.row.requestfirstname}} {{scope.row.requestlastname}}</span> -->
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="requestdatetime"
                        width="90"
                        :label="rs.date">
                         <template slot-scope="scope">
                          <p>{{setformatDate(scope.row.requestdatetime)}}</p>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="approveresult"
                        width="80"
                        :label="rs.result">
                        <template slot-scope="scope">
                          {{scope.row.approveresult==='1'?rs.ok:scope.row.approveresult==='2'?rs.ng:''}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="100"
                        :label="rs.approver">
                        <template slot-scope="scope">
                          <p >{{scope.row.approvefirstname}}</p>
                          <p style="padding-left:5px">{{scope.row.approvelastname}}</p>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="approvedatetime"
                        width="90"
                        :label="rs.date">
                         <template slot-scope="scope">
                          <p>{{setformatDate(scope.row.approvedatetime)}}</p>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="shortname"
                        :show-overflow-tooltip="true"
                        :label="rs.project">
                      </el-table-column>
                      <el-table-column
                        prop="lotnumber"
                        width="60"
                        :label="rs.lot">
                      </el-table-column>
                      <el-table-column
                        prop="unitnumber"
                        width="60"
                        :label="rs.unit">
                      </el-table-column>
                      <el-table-column
                        prop="price"
                        width="110"
                        :label="rs.price">
                        <template slot-scope="scope">
                          {{scope.row.price?'$':''}}{{setNumber(scope.row.price)}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="agent"
                        :show-overflow-tooltip="true"
                        :label="rs.agent">
                          <template slot-scope="scope">
                          <span>{{scope.row.salefirstname}} {{scope.row.salelastname}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="150"
                        :label="rs.action">
                        <template slot-scope="scope">
                          <span class="btntext" @click="goRouter('/sale_manage/saleAdvice',scope.row,false)">{{rs.sales_advice}}</span>
                        <!-- <el-button size="mini" class="small bg_blue" @click="goRouter('/sale_manage/saleAdvice',scope.row,false)">
                          <i class="fa fa-arrow-right" style="padding:0;"></i>
                        </el-button> -->
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
                <div class="table_footer"  v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.approved_requests}}</div>
                    <div class="fr">
                      <el-pagination
                      :background="false"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      layout="prev, pager, next"
                      :page-size="getData.pagesize"
                      :total="total" class="fr">
                      </el-pagination>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getMyRequestList } from '@/api/saleApi.js'
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { getOption } from '@/api/optionValueApi.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      total:0,
      end:'',
      start:'',
      getData:{
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
        flag:0,
      },
      sign:'1',
      requestList0:[],
      requestList1:[],
      bgColor:{
        '01':'bg_green',
        '02':'bg_orange',
        '03':'bg_blue',
        '04':'bg_red',
        '05': 'bg_light_blue',
        '06': 'bg_pink',
        '07': 'bg_purple'
      },
    }
  },
  methods:{
    handleSizeChange(val){
      this.getData.pagenum = 1;
      this.getData.pagesize = val;
      this.getRequest1(this.getData,this.sign)
    },
    handleCurrentChange(val){
        this.getData.pagenum = val;
        this.getRequest1(this.getData,this.sign)
    },
    getRequest0(data){
      getMyRequestList(data).then(res=>{
        if(res.data.success){
          this.requestList0 = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getRequest1(data,type){
      let strData = JSON.stringify(data);
      let submitData =JSON.parse(strData)
      submitData.flag = 1;
      submitData.sign = type;
      getMyRequestList(submitData).then(res=>{
        if(res.data.success){
          this.requestList1 = res.data.data;
          this.total = res.data.total
          this.start = res.data.start;
          this.end = res.data.end
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
   setformatDate(times){
     if(times){
        return formatDate( new Date(times),'dd/MM/yyyy hh:mm:ss')
      }else{
        return '-'
      }
    },
    ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },
    renderHeader(createElement, { column, _self }) {
        let className = column.label;
        return createElement('i',{'class': className});
    },
    // ----
    search(){
      this.getData.pagenum =1;
        this.getRequest1(this.getData,this.sign)
    },
    setNumber(num){
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    tableRowClassName({row, rowIndex}) {
      // Approved 已审核  lightgreen
      // Refuse  拒绝 红色
      if(rowIndex%2 ==0){
        return 'even';
      }else{
        return 'odd'
      }
    },
    bgClassName(type){
      return this.bgColor[type]
    },
    getOptionData(keyid1,keyid2,path){
      let data = {
        keyid1:keyid1,
        keyid2:keyid2,
        languagetype:localStorage.getItem('languagetype')
        }
        getOption(data).then(res=>{
        if (res.data.success) {
          sessionStorage.setItem('optionGetData',JSON.stringify(res.data.data))
          this.$router.push({path:path})
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
        })
    },
    ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },
    goRouter(path,row,flag){
      sessionStorage.removeItem('isFalg');
      let goRouterType ='';
      if(flag){
        switch(row.routetype){
          case '01':
            goRouterType='reservation_approval';
            this.getOptionData('04','13',path)
            break;
          case '02':
            goRouterType='deposit_approval';
            this.getOptionData('04','14',path)
            break;
          case '03':
            goRouterType='invoice_approval';
            this.getOptionData('04','15',path)
            break;
          case '04':
            goRouterType='cancel_approval';
            this.getOptionData('04','16',path)
            break;
          case '05':
            goRouterType='lock_approval';
            this.getOptionData('04','18',path)
            break;
          case '06':
            goRouterType='change_order';
            this.getOptionData('04','19',path)
            break;
          case '07':
            goRouterType='refund_order';
            this.getOptionData('04','23',path)
            break;
          }
      }else{
        goRouterType='approved_requests';
        this.$router.push({path:path})
      }
      sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:goRouterType,referid:row.referid,agencyprojectid:row.agencyprojectid,requestid:row.requestid,isChannel:2}))
      sessionStorage.setItem('allpropertiesData',JSON.stringify(row))
    },
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve),
  },
  created(){
      this.getData.languagetype=localStorage.getItem('languagetype')
      this.getRequest0(this.getData);
      this.getRequest1(this.getData,this.sign);
  },
  computed: {
    ...mapGetters(['rs','languagetype'])
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getRequest0(this.getData);
      this.getRequest1(this.getData,this.sign);
    },
    sign(val){
      this.getRequest1(this.getData,val);
    }

  }
}
</script>
<style>
  .card-box {
    height: 206px;
    background: #FFF;
    border-radius:5px;
    overflow: hidden; 
    position: relative;
  }
  .sale_detail{
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size:14px;
    /* font-family:SFUIDisplay-Bold; */
    font-weight:bold;
    color:rgba(76,75,213,1);
  }
  .sale_detail:hover{
    color: #01008E;
    cursor:pointer
  }
  .card-title{
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
  .card-title>span{
    font-size: 14px;
    font-weight:700;
    color: white;
    display: inline-block;
  }
  .user-img{
    width: 86px;
    height: 86px;
  }
  .user-img>img{
    width: 100%;
    height: 100%;
  }
  .card-body{
    height: 86px;
    margin: 15px;
  }
  .card-content{
    line-height: 21.5px;
    margin-left: 15px;
  }
  .salefirstname{
    font-size:14px;
    /* font-family:SFUIDisplay-Bold; */
    font-weight:bold;
    color:rgba(32,42,71,1);
  }
  span.el-checkbox__label{
    font-size: 12px !important;
    color: #666;
  }
  .checkbox_box {
   line-height: 27px;
  }
</style>

