<template>
  <div>
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.create_invoice}}</span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix" >
        <el-row >
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <div class="filter-count">
              <page-size :unit='rs.properties' @changeSize="handleSizeChange"></page-size>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="filter-search ">
              <el-input :placeholder="rs.search_orders" v-model="getData.condition" class="input-key" size='mini' clearable @change="search" @keyup.enter='search'>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>  
    <div class="wrapper-content clearfix">
      <div class="box">
        <div class="box-body">
          <div class="table_box">
            <el-table
              :data="createList"
              :empty-text = rs.no_data
              style="width: 100%"
              tooltip-effect="light"
              size="mini">
              <el-table-column
                prop="shortname"
                :show-overflow-tooltip="true"
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
              <el-table-column
                prop="agentname"
                :show-overflow-tooltip="true"
                :label="rs.agent">
              </el-table-column>
              <el-table-column
                width="70"
                :label="rs.action">
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
import { getSaleList2 } from '@/api/saleApi.js'
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
        salestatus:'30,40,50'
      },
      createList:[],
    }
  },
  created(){
    this.Property(this.getData);
  },
  methods: {
     Property(data){
      getSaleList2(data).then(res=>{
        if(res.data.success){
          this.createList = res.data.data;
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
      this.Property(this.getData);
    },
    handleCurrentChange(val) {
      this.getData.pagenum = val;  
      this.Property(this.getData);
    },
    // ----
    search(){
      this.getData.pagenum =1;
      this.Property(this.getData);
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
      sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'create_invoice',agencyprojectid:row.agencyprojectid,isChannel:0}))
    },
  },
  computed: {
  ...mapGetters(['rs','languagetype'])
  },
  components:{
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve)
  }
}
</script>

<style>
</style>





