<template>
  <div class="box" style="margin-top: 20px;">
    <div class="box-header">
      <div class="title">
        <img src="../../../assets/imgs/page/dashboard_3.png" alt="">
        <span>{{rs.latest_sales}}</span>
      </div>
      <div class="tools">
        <span class="btn_text" @click="goMoreRouter('/sale_manage/allSales/allSales','ifmore')">
          <span style="margin-right: 10px;">{{rs.more}}</span>
          <img style="width: 10px;" src="../../../assets/imgs/More_icon_gdzc@2x.png" alt="">
        </span>
      </div>
    </div>
    <div class="box-body">
      <div class="table_box">
        <el-table
        :data="RecentSalesOrdersData"
        :empty-text="rs.no_data"
        tooltip-effect="light"
        width='100%'
        size="mini">
          <el-table-column
            prop="fullname"
            :label="rs.project_name"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
            <span>{{scope.row.shortname}}<i class="fa fa-share-alt fr" style="color:#409EFF;" v-if="scope.row.isshared==1?1:0 "></i></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lotnumber"
            :label="rs.lot"
            align="center">
          </el-table-column>
          <el-table-column
            prop="unitnumber"
            :label="rs.unit"
            align="center">
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
            :label="rs.internal"
            align="center">
          </el-table-column>
          <el-table-column
            prop="externalarea"
            :label="rs.external"
            align="center">
          </el-table-column>
          <el-table-column
            prop="price"
            :label="rs.price"
            align="right">
            <template slot-scope="scope">
            {{scope.row.price?'$':''}}{{setNumber(scope.row.price)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="reserve_date"
            :label="rs.reserved_date"
            align="center">
            <template slot-scope="scope">
              {{getDate(scope.row.updatedtimestamp)}}
              <!-- {{scope.row.saledatetime}} -->
            </template>
          </el-table-column>
          <el-table-column
            prop="salestatus"
            :show-overflow-tooltip="true"
            :label="rs.status"
            align="center">
            <template slot-scope="scope">
              {{statusObjs[scope.row.salestatus]}}
            </template>
          </el-table-column>
          <el-table-column
            :label="rs.action"
            width="100">
            <template slot-scope="scope">
            <!-- <el-button> -->
            <!-- <i class="fa fa-shopping-cart" ></i></el-button> -->
            <!--  -->
            <!-- :class="scope.row.salestatus?'salestatus':'reserve'" -->
            <span v-if="!readonly" class="btntext" @click="goRouter('/sale_manage/saleAdvice',scope.row)">{{rs.view}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getLastestSalsOrderData } from '@/api/dashboard.js'
import { mapGetters } from "vuex";
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
export default {
  data(){
    return{
      RecentSalesOrdersData:[],
      statusObjs:{}
    }
  },
  created(){
    this.getData()
    JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(element => {
      this.statusObjs[element.code] = element.value;
    });
    this.statusObjs = Object.assign({},this.statusObjs)
  },
  mounted(){
  },
  methods:{
    getData(){
      getLastestSalsOrderData({pagesize:'10',pagenum:'1',languagetype:localStorage.getItem('languagetype')}).then(res=>{
        if (res.data.success) {
          this.RecentSalesOrdersData = res.data.data
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getDate(date) {
     return  formatDate(newDate(date),"dd/MM/yyyy")
    },
    goRouter(path,row){
      sessionStorage.removeItem('isFalg');
      this.$router.push({path:path})
      sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'all_reserved',agencyprojectid:row.agencyprojectid,isChannel:0}))
    },
    goMoreRouter(path,data){
      this.$router.push({
        path:path,
        query: {
          ifmore: data
        }
      })
    },
    setNumber(num){
       return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },

    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    renderHeader(createElement, { column, _self }) {
      let className = column.label;
      return createElement('i',{'class': className});
    },
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.dashboard ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    rs(){
      
      this.getData()
    },
    
    se(){
       JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(element => {
          this.statusObjs[element.code] = element.value;
        });
        this.statusObjs = Object.assign({},this.statusObjs)
    }
  }
}
</script>
