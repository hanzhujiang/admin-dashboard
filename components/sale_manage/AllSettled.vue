<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.all_settled}}</span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <div class="filter-count">
              <page-size :unit='rs.properties' @changeSize="handleSizeChange"></page-size>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="filter-search">
              <el-input :placeholder="rs.search_properties" v-model="getData.condition" 
                  class="input-key" clearable size='mini' @change="search" @keyup.enter='search'>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
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
                <el-table
                  :data="settledList"
                  :empty-text = rs.no_data
                  style="width: 100%"
                  :show-overflow-tooltip="true"
                  size="mini">
                  <el-table-column
                    prop="shortname"
                    :label="rs.project_name">
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
                    prop="bedroomqty"
                    label="fa fa-bed"
                    align="center"
                    width="40"
                    :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column
                    prop="bathroomqty"
                    label="fa fa-bath"
                    align="center"
                    width="40"
                    :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column
                    prop="studymediaqty"
                    label="fa fa-book"
                    align="center"
                    width="40"
                    :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column
                    prop="carspaceqty"
                    label="fa fa-car"
                    align="center"
                    width="40"
                    :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column
                    prop="internalarea"
                    width="90"
                    :label="rs.internal">
                  </el-table-column>
                  <el-table-column
                    prop="externalarea"
                    width="90"
                    :label="rs.external">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    width="110"
                    :label="rs.price">
                    <template slot-scope="scope">
                      {{scope.row.price?'$':''}}{{setNumber(scope.row.price)}}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    prop="status"
                    width="70"
                    :label="rs.status">
                    <template slot-scope="scope">
                      {{StatusObj[scope.row.status]}}
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    prop="agentname"
                    :show-overflow-tooltip="true"
                    :label="rs.agent">
                  </el-table-column>
                  <el-table-column
                    prop="settleddate"
                    :label="rs.settled_date">
                     <template slot-scope="scope">
                        <p>{{setformatDate(scope.row.settleddate)}}</p>
                      </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.action"
                    width="150">
                    <template slot-scope="scope">
                      <span class="btntext"  @click="goRouter('/project_manage/saleAdvice',scope.row)">{{rs.sales_advice}}</span>
                      <!-- <el-button size="mini" class="small bg_blue" 
                        @click="goRouter('saleAdvice',scope.row)" >
                        <i class="fa fa-shopping-cart"></i>{{rs.sales_advice}}</el-button> -->
                    </template> 
                  </el-table-column>
                    
                </el-table>
              </div>
              
              <div class="table_footer" v-if="total">
                <el-row >
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="data-counter">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.properties}}</div>
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
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { mapGetters } from "vuex";
import { getSaleList2 } from '@/api/saleApi.js'
export default{
  data() {
    return {
      StatusObj:{},
      total:0,
      start:1,
      end:10, 
      getData:{
        pagesize:20,
        pagenum:1,
        languagetype:'',
        condition:'',
        salestatus:'50'
      },
      settledList:[],
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve)
  },
  methods:{
    handleSizeChange(val) {
      this.getData.pagesize = val;
      this.PropertyList(this.getData)
    },
    handleCurrentChange(val) {
        this.getData.pagenum = val;  
        this.PropertyList(this.getData)
    },
    search(){
      this.getData.pagenum =1;
        this.PropertyList(this.getData)
    },
    setformatDate(times){
     if(times){
        return formatDate( new Date(times),'dd/MM/yyyy')
      }else{
        return '-'
      }
    },
    PropertyList(data){
      getSaleList2(data).then(res=>{
        if(res.data.success){
          this.settledList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    setNumber(num){
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
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
    goRouter(path,row){
      sessionStorage.removeItem('isFalg');
      this.$router.push({path:path})
      sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'all_settled',agencyprojectid:row.agencyprojectid,isChannel:0}))
    },
  },
  created(){
    this.getData.languagetype=localStorage.getItem('languagetype');
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(element => {
      this.StatusObj[element.code] = element.value;
    });
    this.StatusObj = Object.assign({},this.StatusObj)
    this.PropertyList(this.getData);
  },
    computed: {
    ...mapGetters(['rs','languagetype','se'])
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.PropertyList(this.getData);
    },
      se(val){ 
      val.ORDER_STATUS_LIST.forEach(element => {
        this.StatusObj[element.code] = element.value;
      });
    }
  }

}
</script>

