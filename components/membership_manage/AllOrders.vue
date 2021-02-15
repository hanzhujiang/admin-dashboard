<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.all_orders}}</span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="filter-count">
              <span class="filter-text">{{rs.showing}}</span>
              <el-select @change="handleSizeChange" v-model="getData.pagesize" slot="prepend" placeholder="" style="width: 90px;"  size="mini">
                <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
                </el-select>
              <span class="filter-unit">{{rs.orders}}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="filter-search ">
              <el-input @change="search" @keyup.enter='search' :placeholder="rs.search_orders"
                v-model="getData.condition" class="input-key" clearable size='mini'>
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
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
                     <div class="table_box">
                      <el-table
                      :empty-text = rs.no_data
                      :data="purchaseList"
                      tooltip-effect="light"
                      width='100%'
                      size="mini">
                      <el-table-column
                        prop="orderno"
                        :label="rs.order_no"
                        :show-overflow-tooltip="true">
                      </el-table-column>
                      <el-table-column
                        prop="productname"
                        :label="rs.product">
                      </el-table-column>
                      <el-table-column
                        prop="shortname"
                        :label="rs.purchaser">
                      </el-table-column>
                     
                      <el-table-column
                        prop="purchasedatetime"
                        :label="rs.purchase_date_time">
                      </el-table-column>
                      <el-table-column
                        prop="usernumber"
                        :label="rs.user_num">
                        <template slot-scope="scope">
                          <div>
                            {{usernumberObj[scope.row.usernumber]}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="monthnumber"
                        :label="rs.license_month">
                        <template slot-scope="scope">
                          <div>
                            {{monthnumberObj[scope.row.monthnumber]}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="standardprice"
                        :label="rs.price">
                        <template slot-scope="scope">
                          <div>
                           {{scope.row.discountprice?"$":''}}{{setNumber(scope.row.discountprice)}}
                          </div>
                        </template>
                      </el-table-column>
                       <el-table-column
                        prop="licenseno"
                        :label="rs.license_no">
                      </el-table-column>
                       <el-table-column
                        prop="paymentstatus"
                        :label="rs.status">
                        <template slot-scope="scope">
                          <div>
                            {{scope.row.paymentstatus==1?rs.paid:scope.row.paymentstatus==2?rs.pay_failed:scope.row.paymentstatus==3?rs.expire_soon:rs.unpaid}}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!--  -->
              <div class="table_footer"  v-if="total">
                <el-row >
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="data-counter">{{rs.showing}} {{stasize}} to {{endsize}} of {{total}} {{rs.all_orders}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div v-if="total">
                      <el-pagination
                      @current-change="handleCurrentChange"
                      :current-page.sync="getData.pagenum"
                      :page-size="getData.pagesize"
                      layout="prev, pager, next"
                      :total="total"
                      class="fr">
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
// membershipManageApi
import { getPurchase } from'@/api/membershipManageApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      purchaseList:[],
      pageList:[],

      getData:{
        condition:'',  //搜索关键字 
        pagesize : 1, //分页
        pagenum :1, //页码
        languagetype:'',
      },
      usernumberObj:{},
      monthnumberObj:{},

      total:0,
      pagesize:1,
      pagenum:5,
      endsize:'',
      stasize:'',
      
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
    created(){
      this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
      // 默认页码
      this.getData.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
       JSON.parse(localStorage.getItem('selectlist')).USERNUMBER_LIST.forEach(element => {
      this.usernumberObj[element.code] = element.value;
      });
      this.usernumberObj['99'] = this.rs.unlimited;
      //  月数 MONTHNUMBER_LIST
      JSON.parse(localStorage.getItem('selectlist')).MONTHNUMBER_LIST.forEach(element => {
        this.monthnumberObj[element.code] = element.value;
      });
      this.getData.languagetype = localStorage.getItem('languagetype')
      this.getPurchaseList(this.getData)
    },
  watch:{
    se(val){
      val.USERNUMBER_LIST.forEach(element => {
      this.usernumberObj[element.code] = element.value;
    });
    //  月数 MONTHNUMBER_LIST
    val.MONTHNUMBER_LIST.forEach(element => {
      this.monthnumberObj[element.code] = element.value;
    });
    },
    rs(val){
      this.usernumberObj['99'] = val.unlimited;
    },
  },
  methods:{
    getPurchaseList(data){
      getPurchase(data).then(res =>{
        if(res.data.success){
          this.purchaseList = res.data.data;
          this.total = res.data.total;
          this.endsize = res.data.end;
          this.stasize = res.data.start;

        }
      })
    },
    handleSizeChange(val) {
      this.getData.pagenum = 1;
      this.getData.pagesize = val;
      this.getPurchaseList(this.getData)
    },
    handleCurrentChange(val) {
      this.getData.pagenum = val;  
      this.getPurchaseList(this.getData)
    },
    // ----
    search(){
      this.getData.pagenum =1;
        this.getPurchaseList(this.getData)
    },
    // getOption
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    setNumber(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
  },
    computed: {
    ...mapGetters(['rs','se','languagetype','control']),
    // all_properties
    readonly(){
      if(this.control.all_orders ==='02'){
        return true
      }else{
        return false
      }
    }
  },
}
</script>
