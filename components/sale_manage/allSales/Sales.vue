<template>
  <div>
    <!-- <form autocomplete="on"  @submit.native.prevent> -->
      <el-row style="padding: 10px 20px 0;">
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <el-button class="bg_save_btn" @click="downAllsaleExcel">{{rs.all_sales_report}} (Excel)</el-button>
            <el-button class="bg_save_btn" @click="downLoadPdf">{{rs.report_pending}}(pdf)</el-button>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-checkbox v-model="getData.hidecancelledsales" class="filter-text" true-label="1" false-label="0"
                      @change="search" style="padding-top: 10px;">{{rs.hide_cancelled_sales}}</el-checkbox>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="box">
          <div class="filter-search fr">
            <el-input :placeholder="rs.search_orders" v-model="getData.condition" :autofocus="false" 
              class="input-key" size='mini' clearable @change="search" @keyup.enter='search' width="100%">
              <el-button :autofocus="false" slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row >
    <!-- </form>   -->
    <div class="wrapper-content clearfix">
      <div class="box">
        <div class="box-body">
          <div class="table_box">
            <el-table
              :data="pendingList"
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
                prop="price"
                sortable
                width="110"
                :label="rs.price">
                <template slot-scope="scope">                               
                  {{scope.row.price?'$':''}}{{setNumber(scope.row.price)}}                             
                </template>
              </el-table-column>
              <el-table-column
                prop="deposit"
                sortable
                width="110"
                :label="rs.deposit">
                <template slot-scope="scope"> 
                  {{scope.row.deposit?'$':''}}{{setNumber(scope.row.deposit)}}
                </template>
              </el-table-column>
              <el-table-column
                prop="paid"
                sortable
                width="100"
                :label="rs.paid">
                <template slot-scope="scope"> 
                  {{scope.row.paid?'$':''}}{{setNumber(scope.row.paid)}}
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="unpaid"
                sortable
                width="100"
                :label="rs.unpaid">
                <template slot-scope="scope"> 
                  {{scope.row.unpaid?'$':''}}{{setNumber(scope.row.unpaid)}}
                </template>
              </el-table-column> -->
              <el-table-column
                prop="salestatus"
                sortable
                width="160"
                :show-overflow-tooltip="true"
                :label="rs.status">
                <template slot-scope="scope"> 
                  {{setStatus(scope.row)}}
                  <!-- {{scope.row.salestatus?saleStatusObj[scope.row.salestatus]:saleStatusObj['99']}} -->
                </template>
              </el-table-column>
              <el-table-column
                prop="agentname"
                sortable
                :show-overflow-tooltip="true"
                :label="rs.agent">
              </el-table-column>
              <el-table-column
                :label="rs.action"
                fixed="right"
                width="70">
                <template slot-scope="scope">
                <el-button size="mini" class="small bg_blue" @click="goRouter('/sale_manage/saleAdvice',scope.row)">
                  <img src="@/assets/imgs/page/right.png" alt="" class="icon">
                </el-button>
                </template>
              </el-table-column>
          </el-table>
          </div>
          <div class="table_footer" v-if="total">
            <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.requests}}</div>
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
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters} from "vuex";
import { getSaleList2,PdfProperty,ExcelProperty } from '@/api/saleApi.js'
export default {
  name: 'payDeposit',
  data() {
    return {
      total:0,
      start:1,
      end:10, 
      saleStatusObj:{},
      getData:{
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
        salestatus:'01,10,20,30,40,50,90,99',
        hidecancelledsales:'1'
      },
      pendingList:[],
    }
  },
  created(){
    JSON.parse(localStorage.getItem('selectlist')).OPERATION_TYPE_LIST.forEach(val => {
      this.saleStatusObj[val.code] = val.value
    });
    this.saleStatusObj = Object.assign({}, this.saleStatusObj)
    this.AllSale(this.getData);
  },
  methods: {
    // 下载pdf
    // downLoadPdf
    downLoadPdf(e) {
      PdfProperty({salestatus:'01,10'}).then(res=>{
        let target = e.target;
        if(target.nodeName == 'SPAN' || target.nodeName == 'I'){
            target = e.target.parentNode;
        }
        target.blur();
        if(res.data.success){
          window.location.href = res.data.pdf;
        }
      })
    },
    downAllsaleExcel(e) {
       let target = e.target;
        if(target.nodeName == 'SPAN' || target.nodeName == 'I'){
            target = e.target.parentNode;
        }
        target.blur();
      window.location.href =
        axios.defaults.baseURL +
        "sale/ExcelProperty?salestatus=01,10,20,30,40,50,90,99"
    },
    setStatus(row){
      if(row.salestatus == '00'){
        return this.salesrs&&this.salesrs.sta_reservation_pending?this.salesrs.sta_reservation_pending:this.rs.sta_reservation_pending
      }else if(row.salestatus == '01'){
        return this.salesrs&&this.salesrs.sta_reservation_approved?this.salesrs.sta_reservation_approved:this.rs.sta_reservation_approved
      }else if(row.salestatus == '10'){
        return this.salesrs&&this.salesrs.sta_contract_issued?this.salesrs.sta_contract_issued:this.rs.sta_contract_issued
      }else if(row.salestatus == '20'){
        return this.salesrs&&this.salesrs.sta_conditional_exchanged?this.salesrs.sta_conditional_exchanged:this.rs.sta_conditional_exchanged
      }else if(row.salestatus == '30'){
        return this.salesrs&&this.salesrs.sta_unconditional_exchanged?this.salesrs.sta_unconditional_exchanged:this.rs.sta_unconditional_exchanged
      }else if(row.salestatus == '40'){
        return this.salesrs&&this.salesrs.sta_pending_settlement?this.salesrs.sta_pending_settlement:this.rs.sta_pending_settlement
      }else if(row.salestatus == '50'){
        return this.salesrs&&this.salesrs.sta_settled?this.salesrs.sta_settled:this.rs.sta_settled
      }else{
        return row.salestatus?this.saleStatusObj[row.salestatus]:this.saleStatusObj['99']
      }
    },
    AllSale(data){
      getSaleList2(data).then(res=>{
        if(res.data.success){
          this.pendingList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
       // 分页方法
    handleSizeChange(val) {
      this.getData.pagenum = 1;
      this.getData.pagesize = val;
      this.AllSale(this.getData);
    },
    handleCurrentChange(val) {
      this.getData.pagenum = val;  
      this.AllSale(this.getData);
    },
    // ----
    search(){
      this.getData.pagenum =1;
      this.AllSale(this.getData);
    },
    setNumber(num){
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    renderHeader(createElement, { column, _self }) {
      let className = column.label;
      return createElement('i',{'class': className});
    },
    goRouter(path,row){
      sessionStorage.removeItem('isFalg');
      this.$router.push({path:path});
      sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'Sales',agencyprojectid:row.agencyprojectid,isChannel:0}))
    },
  },
  watch:{
    se(){
      JSON.parse(localStorage.getItem('selectlist')).OPERATION_TYPE_LIST.forEach(val => {
        this.saleStatusObj[val.code] = val.value
      });
      this.saleStatusObj = Object.assign({}, this.saleStatusObj)
    }
  },
  computed: {
  ...mapGetters(['rs','languagetype','se','salesrs'])
  },
}
</script>

<style>
</style>





