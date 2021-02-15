<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.my_requests}}</span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <div class="filter-count">
              <page-size :unit='rs.requests' @changeSize="handleSizeChange"></page-size>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="filter-search ">
              <el-input :placeholder="rs.search_requests" v-model="getData.condition" 
                  class="input-key" clearable size='mini' @change="search" @keyup.enter='search' >
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
                    <el-table
                      :data="requestList"
                      :empty-text = "rs.no_data"
                      :row-class-name="tableRowClassName"
                      tooltip-effect="light"
                      style="width:100%;"
                      size="mini">
                      <el-table-column
                        prop="routename"
                        :show-overflow-tooltip="true"
                        width="130"
                        :label="rs.request_type">
                      </el-table-column>
                      <el-table-column
                        prop="requestdatetime"
                        width="120"
                        :label="rs.date">
                      </el-table-column>
                      <el-table-column
                        prop="approveresult"
                        :show-overflow-tooltip="true"
                        :label="rs.status">
                        <template slot-scope="scope">
                          {{rs[setStatus(scope.row)]}}
                          <el-popover
                            placement="right"
                            trigger="click">
                            <el-table :data="resultData">
                              <el-table-column width="60" property="approveorder" label="NO"></el-table-column>
                              <el-table-column width="140"  :label="rs.authorisation">
                                <template slot-scope="scope">
                                  {{scope.row.firstname}}&nbsp;{{scope.row.lastname}}
                                </template>
                              </el-table-column>
                                <el-table-column width="200"  :label="rs.email">
                                <template slot-scope="scope">
                                  {{scope.row.email}}
                                </template>
                              </el-table-column>
                              <el-table-column width="80" :label="rs.result">
                                <template slot-scope="scope">
                                  {{scope.row.approveresult == 1?rs.ok:scope.row.approveresult == 2?rs.ng:scope.row.approveresult == 3?'--':''}}
                                </template>
                              </el-table-column>
                              <el-table-column width="100" property="approvedatetime" :label="rs.date"></el-table-column>
                            </el-table>
                            <p v-if="reasonlist.length!=0" class="reason-title">{{rs.reject_reason}}:</p>
                            <p v-for="(d,index) in reasonlist" :key="index" class="reason-line">({{index+1}})&nbsp;&nbsp;{{d.content}}&nbsp;</p>
                            <span slot="reference" @click='alertRequest(scope.row)' ><i class="fa fa-th-list"></i></span>
                          </el-popover>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="rs.authorisation"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <span>{{scope.row.approvefirstname}} {{scope.row.approvelastname}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="approvedatetime"
                        width="100"
                        :label="rs.date">
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
                        prop="deposit"
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
                          <span class="btntext" @click="goRouter('/sale_manage/saleAdvice',scope.row)">{{rs.sales_advice}}</span>
                        <!-- <el-button size="mini" class="small bg_blue" @click="goRouter('/sale_manage/saleAdvice',scope.row)" >
                          <i class="fa fa-arrow-right" style="padding:0"></i>
                        </el-button> -->
                        </template>
                      </el-table-column>
                      
                    </el-table>
                  </el-col>
                </el-row>
              </div>
              
              <div class="table_footer" v-if="total">
                <el-row >
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="data-counter">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.requests}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div>
                      <el-pagination 
                      :background="false"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      layout="prev, pager, next"
                      :page-size="getData.pagesize"
                      :total="total" class="fr">
                      </el-pagination>
                    </div>
                  </el-col>
                </el-row>
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
import { getMyRequestList, getResultList } from '@/api/saleApi.js'
export default{
  data() {
    return {
      StatusObj:{},
      total:0,
      start:1,
      end:10, 
      resultData:[],
      reasonlist:[],
      getData:{
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
      },
      requestList:[],
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve)
  },
  created(){
    this.getData.languagetype=localStorage.getItem('languagetype');
    this.getData.pagesize = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue; 
    this.getRequest(this.getData);
  },
  methods:{
      // 分页方法
    handleSizeChange(val) {
      this.getData.pagesize = val;
      this.getRequest(this.getData)
    },
    handleCurrentChange(val) {
        this.getData.pagenum = val;  
        this.getRequest(this.getData)
    },
    // ----
    search(){
      this.getData.pagenum =1;
        this.getRequest(this.getData)
    },
    alertRequest(row){
      this.resultData =[];
      getResultList({requestid:row.requestid}).then(res=>{
        if(res.data.success){
            this.resultData = res.data.data;
            this.reasonlist = res.data.reasonlist;
        }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })

      // this.
    },
    // 转千位符
    setNumber(num){
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    tableRowClassName({row}) {
      if(row.approveresult == 2){
        return 'bg_red'
      }else if(row.approveresult == 1){
          return 'bg_green'
      }else{
        return ''
      }
      // Approved 已审核  01  lightgreen
      // Refuse  拒绝 红色 02
      // Confirmed 
      
    },
    renderHeader(createElement, { column, _self }) {
      let className = column.label;
      return createElement('i',{'class': className});
    },
    getRequest(data){
      getMyRequestList(data).then(res=>{
        if(res.data.success){
          this.requestList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
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
    setStatus(row){
      switch (row.routetype)
      {
        case '01':
          switch(row.status){
            case '1':
              return 'confirming'
            case '2':
              return 'confirmed'
            case '3':
              return 'rejected'
          }
        case '02':
          switch(row.status){
            case '1':
              return 'confirming'
            case '2':
              return 'received'
            case '3':
              return 'unreceived'
          }
        case '03':
          switch(row.status){
            case '1':
              return 'confirming'
            case '2':
              return 'confirmed'
            case '3':
              return 'rejected'
          }
        case '04':
          switch(row.status){
            case '1':
              return 'approving'
            case '2':
              return 'agreed'
            case '3':
              return 'rejected'
          }
        case '05':
          switch(row.status){
            case '1':
              return 'approving'
            case '2':
              return 'agreed'
            case '3':
              return 'rejected'
          }
        case '06':
          switch(row.status){
            case '1':
              return 'approving'
            case '2':
              return 'agreed'
            case '3':
              return 'rejected'
          }  
        case '07':
          switch(row.status){
            case '1':
              return 'approving'
            case '2':
              return 'agreed'
            case '3':
              return 'rejected'
          }
        default:
          return ''
      }
    },
    goRouter(path,row){
        sessionStorage.removeItem('isFalg');
        this.$router.push({path:path});
        sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'my_request',agencyprojectid:row.agencyprojectid,isChannel:0}))
      },
  },
  computed: {
    ...mapGetters(['rs','languagetype'])
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getRequest(this.getData);
    }
  }
}
</script>
<style>
 .reason-title {
    margin-left: 10px;
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
 }

 .reason-line {
    margin-left: 10px;
    margin-top: 5px;
    font-size: 12px;
    color: red;
    font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
 }
</style>
