<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.all_properties}}</span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">
            <div class="filter-count">
              <span class="filter-text">{{rs.showing}}</span>
              <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend" placeholder="" style="width: 90px;"  size="mini">
                <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
                <!-- <el-option v-for=" d in 3" :label="d" :value="d"></el-option> -->
                </el-select>
              <span class="filter-unit">{{rs.properties}}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">
            <div class="filter">
              <span class="filter-text">{{rs.category}} :</span>
              <el-select
              @change="getData('0')"
              style="min-width:180px;"
              v-model="CatetoryValue"
              multiple
              size="mini"
              placeholder="">
                <el-option
                v-for="item in CatetoryOptions"
                :key="item.value"
                :label="item.value"
                :value="item.code">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">
            <div class="filter">
              <span class="filter-text">{{rs.contract_status}} :</span>
              <el-select
              @change="getData('0')"
              clearable
              multiple
              style="min-width:100px;"
              v-model="saleStatus"
              size="mini"
              placeholder="">
                <el-option
                v-for="item in orderStatus"
                :key="item.value"
                :label="item.value"
                :value="item.code">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">
            <div class="filter">
              <span class="filter-text">{{rs.show_to_agents}}:</span>
              <el-select
              @change="getData('0')"
              style="width:30%;"
              v-model="data.isshowtoagents"
              size="mini"
              placeholder="">
                <el-option
                v-for="item in showtoagents"
                :key="item.value"
                :label="item.value"
                :value="item.code">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="4" :xl="4">
            <div class="filter-search ">
              <el-input @change="getData('0')" @keyup.enter='changeData' :placeholder="rs.search_properties"
                v-model="data.fullname" class="input-key" clearable size='mini'>
                <el-button @click="getData('0')" slot="append" icon="el-icon-search"></el-button>
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
            :row-class-name="tableRowClassName"
            :default-sort = "{prop: 'shortname', order: 'ascending'}"
            :empty-text ="rs.no_data"
            :data="allPropertyList"
            tooltip-effect="light"
            width='100%'
            size="mini">
            <el-table-column
              prop="shortname"
              width="150"
              sortable
              :label="rs.project_name"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.shortname}}<i class="fa fa-share-alt fr " style="color:#409EFF;" v-if="scope.row.isshared==1?1:0 "></i></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="lotnumber"
              sortable
              :label="rs.lot"
              width="70">
            </el-table-column>
            <el-table-column
              prop="unitnumber"
              sortable
              :label="rs.unit"
              :show-overflow-tooltip="true"
              width="75">
            </el-table-column>
            <el-table-column
              prop="bedroomqty"
              sortable
              label="fa fa-bed"
              align="center"
              width="60"
              :render-header="renderHeader">
            </el-table-column>
            <el-table-column
              prop="bathroomqty"
              sortable
              label="fa fa-bath"
              align="center"
              width="60"
              :render-header="renderHeader">
            </el-table-column>
            <el-table-column
              prop="studymediaqty"
              label="fa fa-book"
              sortable
              align="center"
              width="60"
              :render-header="renderHeader">
            </el-table-column>
            <el-table-column
              prop="carspaceqty"
              sortable
              label="fa fa-car"
              align="center"
              width="60"
              :render-header="renderHeader">
            </el-table-column>
            <el-table-column
              prop="internalarea"
              :label="rs.internal"
              sortable
              width="92">
            </el-table-column>
            <el-table-column
              prop="externalarea"
              :label="rs.external"
              sortable
              width="97">
            </el-table-column>
            <!-- <el-table-column
              prop="aspect"
              :label="rs.aspect"
              width="80">
              <template slot-scope="scope">
                {{AspectObj[scope.row.aspect]}}
              </template>
            </el-table-column> -->
            <el-table-column
              prop="price"
              :label="rs.price"
              sortable
              width="120">
              <template slot-scope="scope">
                {{scope.row.price?'$':''}}{{setNumber(scope.row.price)}}
              </template>
            </el-table-column>
              <!-- <el-table-column
              prop="depositstatus"
              :show-overflow-tooltip="true"
              sortable
              :label="rs.deposit"
              width="100">
              <template slot-scope="scope">
                {{depositPayObj[scope.row.depositstatus]}}
              </template>
            </el-table-column> -->
            <!-- {{scope.row.depositstatus == '00'?rs.unpaid:scope.row.depositstatus == '01'?'部分':scope.row.depositstatus == '02'?rs.paid:''}} -->

            <el-table-column
              prop="salestatus"
              :show-overflow-tooltip="true"
              sortable
              min-width="100"
              :label="rs.contract_status">
              <template slot-scope="scope">
                {{statusObj[scope.row.salestatus]}}
              </template>
            </el-table-column>

            <el-table-column
              :label="rs.action"
              fixed="right"
              width="180">
              <template slot-scope="scope">
                <span class="btntext" v-if="readonly || scope.row.isfulledit=='0'" @click="handleShow(scope.row)">{{rs.detail}}</span>
                <span class="btntext" v-else @click="handleEdit(scope.row)">{{rs.edit}}</span>
                <span class="btntext" @click="goRouter('/sale_manage/saleAdvice',scope.row)">{{scope.row.salestatus?rs.sales:rs.reserve}}</span>
                <!-- <span class="btntext" @click="handleSetHoldingflag(scope.row)" v-if="readonly?false:scope.row.isrunning=='1'?false:true">{{scope.row.holdingflag == '1'?rs.open:rs.hold}}</span> -->
              </template>
            </el-table-column>
          </el-table>
          </div>
          <div class="table_footer" v-if="total">
            <el-row >
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="data-counter">{{rs.showing}} {{stasize}} to {{endsize}} of {{total}} {{rs.properties}}</div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div v-if="total">
                  <el-pagination
                  @current-change="getData('1')"
                  :current-page.sync="data.pagenum"
                  :page-size="data.pagesize"
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
    </div>
  </div>
</template>
<script>
import { getPropertyList, updateHoldingflag } from'@/api/projectApi.js'
import { getOption } from'@/api/optionValueApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      AspectObj:{},
      statusObj:{},
      depositPayObj:{},
      saleStatus:[],
      list:[],
      total:0,
      pagesize:1,
      pagenum:5,
      endsize:'',
      MacketOptions: [],
      CatetoryOptions:[],
      CatetoryValue:'',
      pageList:[],
      stasize:'',
      orderStatus:[],
      allPropertyList:[],
      showtoagents:[],
      data:{
        fullname:'',  //搜索关键字
        pagesize : 1, //分页
        pagenum :1, //页码
        category:'',
        status:'',
        isactived:'1',
        isshowtoagents:null,
        languagetype:'',
        salestatus:'',
        salevisible:1,
        holdingflag:0
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
    created(){
      //下拉框数据
      this.getOptionData('05','01')
      //获取下拉列表页码
      this.orderStatus = JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST;
      // 下拉框去掉status 99
      this.orderStatus.forEach((element,index) => {
        if(element.code == '99'){
          this.orderStatus.splice(index,1)
        }
      });
      this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
      JSON.parse(localStorage.getItem('selectlist')).PROPERTY_ASPECT_LIST.forEach(element => {
        this.AspectObj[element.code] =element.value;
      });
      JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(element => {
      this.statusObj[element.code] =element.value;
      });
      JSON.parse(localStorage.getItem('selectlist')).DEPOSIT_PAY_STATUS_LIST.forEach(element => {
      this.depositPayObj[element.code] =element.value;
      });
      this.showtoagents = [
        {code:null, value:this.rs.all},
        {code:'1', value:this.rs.yes},
        {code:'0', value:this.rs.no}
      ];
      this.depositPayObj =Object.assign({}, this.depositPayObj)
      this.AspectObj =Object.assign({}, this.AspectObj)
      this.statusObj =Object.assign({}, this.statusObj)
    // 默认页码
    // this.data.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
    this.data.pagesize = 100;//默认100 -2019-11-14update
    this.data.languagetype = localStorage.getItem('languagetype')
    this.allProjects(this.data)

    },

  methods:{
    restoration(){
      this.data.pagenum = 1
      this.data.category = this.CatetoryValue.join(','),
      this.data.salestatus = this.saleStatus.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)
    },
    handleSetHoldingflag(row){
      updateHoldingflag({propertyid:row.propertyid,holdingflag:row.holdingflag == '0'?'1':'0',projectid:row.projectid}).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success)
          this.getData('1');
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    tableRowClassName(scope,rowIndex){
      if(scope.row.holdingflag == '1'){
        return 'bg_ccc'
      }else{
        return ''
      }
    },
    getData(type){
      if(type=='1'){
        this.data.category = this.CatetoryValue.join(','),
        this.allProjects(this.data)
      }else{
        this.restoration()
      }
    },
    setNumber(num){
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    goRouter(path,row){
      sessionStorage.removeItem('isFalg');
      this.$router.push({path:path})
      sessionStorage.setItem('isFalg',JSON.stringify({propertyid:row.propertyid,type:'all_properties',agencyprojectid:row.agencyprojectid,saleid:row.saleid,isChannel:0}))
    },
    renderHeader(createElement, { column, _self }) {
      let className = column.label;
      return createElement('i',{'class': className});
    },
    //所有房源
    allProjects(projectList){
      getPropertyList(projectList).then(res=>{
        if (res.data.success) {
          this.allPropertyList = res.data.data
          this.stasize = res.data.start
          this.endsize = res.data.end
          this.total = res.data.total
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }

      })
    },
    // getOption
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    getOptionData(keyid1,keyid2){
      let opData = {
        keyid1:keyid1,
        keyid2:keyid2,
        languagetype:JSON.parse(localStorage.getItem('userInfo')).languagetype,
      }
      getOption(opData).then(res=>{
        if (res.data.success) {
          this.CatetoryOptions = res.data.data
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    handleEdit(d){
      sessionStorage.removeItem('propertyid');
      sessionStorage.setItem('isrunning', d.isrunning);
      this.$router.push({path:'/project_manage/allProperties/propertyDetail/update',query:{id:d.propertyid}})
    },
    handleShow(d){
      sessionStorage.removeItem('propertyid');
      this.$router.push({path:'/project_manage/allProperties/propertyView/show',query:{id:d.propertyid}})
    },
  },
    computed: {
    ...mapGetters(['rs','se','languagetype','control']),
    // all_properties
    readonly(){
      if(this.control.all_properties ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    se(val){
      val.PROPERTY_ASPECT_LIST.forEach(element => {
        this.AspectObj[element.code] =element.value;
      });
      val.ORDER_STATUS_LIST.forEach(element => {
        this.statusObj[element.code] =element.value;
      });
      val.DEPOSIT_PAY_STATUS_LIST.forEach(element => {
        this.depositPayObj[element.code] =element.value;
      });
      this.orderStatus = val.ORDER_STATUS_LIST;
    },
    languagetype(){
      this.data.category = this.CatetoryValue.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)
      this.showtoagents = [
        {code:null, value:this.rs.all},
        {code:'1', value:this.rs.yes},
        {code:'0', value:this.rs.no}
      ];
    }
  },
}
</script>

