<template>
  <div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <div class="filter-search fr" style="width:30%;">
          <el-input :placeholder="rs.search_orders" v-model="getData.condition" class="input-key" size='mini' clearable @change="search" @keyup.enter='search'>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </div>
    </form>  
    <div class="wrapper-content clearfix">
      <div class="box">
        <div class="box-body">
          <div class="table_box">
            <el-table
              :data="conditionalList"
              :empty-text = rs.no_data
              style="width: 100%"
              tooltip-effect="light"
              size="mini">
              <el-table-column
                prop="shortname"
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
              <el-table-column
                prop="unpaid"
                sortable
                width="100"
                :label="rs.unpaid">
                <template slot-scope="scope"> 
                  {{scope.row.unpaid?'$':''}}{{setNumber(scope.row.unpaid)}}
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
import { mapGetters} from "vuex";
import { getSaleList } from '@/api/saleApi.js'
export default {
  name: 'payDeposit',
  data() {
    return {
      total:0,
      start:1,
      end:10, 
      getData:{
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
        salestatus:'10'
      },
      conditionalList:[],
    }
  },
  created(){
    this.Exchanged(this.getData);
  },
  methods: {
    Exchanged(data){
      getSaleList(data).then(res=>{
        if(res.data.success){
          this.conditionalList = res.data.salelist;
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
      this.Exchanged(this.getData);
    },
    handleCurrentChange(val) {
      this.getData.pagenum = val;  
      this.Exchanged(this.getData);
    },
    // ----
    search(){
      this.getData.pagenum =1;
      this.Exchanged(this.getData);
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
      sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'conditional_exchange',agencyprojectid:row.agencyprojectid,isChannel:0}))
    },
  },
  computed: {
  ...mapGetters(['rs','languagetype'])
  },
}
</script>

<style>
</style>





