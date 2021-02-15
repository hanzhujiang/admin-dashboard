<template>
  <div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <div class="filter-search fr" style="width:30%;">
          <el-input :placeholder="rs.search_properties" v-model="getData.condition" 
              class="input-key" clearable size='mini' @change="search" @keyup.enter='search'>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </div>
    </form>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-table
                  :data="cancellList"
                  :empty-text = rs.no_data
                  style="width: 100%"
                  tooltip-effect="light"
                  size="mini">
                  <el-table-column
                    prop="shortname"
                    width="130"
                    sortable
                    :show-overflow-tooltip="true"
                    :label="rs.project_name">
                  </el-table-column>
                  <el-table-column
                    prop="lotnumber"
                    sortable
                    width="80"
                    :label="rs.lot">
                  </el-table-column>
                  <el-table-column
                    prop="unitnumber"
                    sortable
                    width="80"
                    :label="rs.unit">
                  </el-table-column>
                  <el-table-column
                    prop="bedroomqty"
                    sortable
                    label="fa fa-bed"
                    align="center"
                    width="70"
                    :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column
                    prop="bathroomqty"
                    sortable
                    label="fa fa-bath"
                    align="center"
                    width="70"
                    :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column
                    prop="studymediaqty"
                    sortable
                    label="fa fa-book"
                    align="center"
                    width="70"
                    :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column
                    prop="carspaceqty"
                    sortable
                    label="fa fa-car"
                    align="center"
                    width="70"
                    :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column
                    prop="internalarea"
                    sortable
                    width="100"
                    :label="rs.internal">
                  </el-table-column>
                  <el-table-column
                    prop="externalarea"
                    sortable
                    width="100"
                    :label="rs.external">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    sortable
                    width="110"
                    :label="rs.price">
                    <template slot-scope="scope">
                      {{scope.row.price?'$':''}}{{setNumber(scope.row.price)}}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    prop="status"
                    :show-overflow-tooltip="true"
                    :label="rs.status">
                    <template slot-scope="scope">
                      {{StatusObj[scope.row.status]}}
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    prop="agentname"
                    sortable
                    :show-overflow-tooltip="true"
                    :label="rs.agent">
                  </el-table-column>
                   <el-table-column
                    prop="deposit"
                    sortable
                    :show-overflow-tooltip="true"
                    :label="rs.paid">
                     <template slot-scope="scope">
                      {{scope.row.confirmeddeposit?'$':''}}{{setNumber(scope.row.confirmeddeposit)}}
                    </template>
                  </el-table-column>
                   <el-table-column
                    prop="refund"
                    sortable
                    width="110"
                    :show-overflow-tooltip="true"
                    :label="rs.refunded">
                     <template slot-scope="scope">
                      {{scope.row.refund?'$':''}}{{setNumber(scope.row.refund)}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="cancelleddate"
                    sortable
                     width="140"
                    :label="rs.cancelled_date">
                     <template slot-scope="scope">
                      <p>{{setformatDate(scope.row.cancelleddate)}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                   :label="rs.action"
                   fixed="right"
                    width="70">
                    <template slot-scope="scope">
                      <!-- <span class="btntext"  @click="goRouter('/sale_manage/saleAdvice',scope.row)">{{rs.sales_advice}}</span> -->
                      <!-- <el-button size="mini" class="small bg_red"  @click="goRouter('/sale_manage/saleAdvice',scope.row)" >
                        <i class="fa fa-shopping-cart"></i>{{rs.sales_advice}}</el-button> -->
                      <el-button size="mini" class="small bg_blue" @click="goRouter('/sale_manage/saleAdvice',scope.row)">
                        <img src="@/assets/imgs/page/right.png" alt="" class="icon">
                      </el-button>
                    </template> 
                  </el-table-column>
                </el-table>
              </div>
              
              <div class="table_footer"  v-if="total">
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
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
        salestatus:'99'
      },
      cancellList:[],
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve)
    },
  methods:{
    handleSizeChange(val) {
      this.getData.pagesize = val;
      this.getData.pagenum = 1;
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
          this.cancellList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 转千位符
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
      
      sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'all_cancelled',propertyid:row.propertyid,agencyprojectid:row.agencyprojectid,isChannel:0}))
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
