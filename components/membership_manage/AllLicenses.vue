<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.all_licenses}}</span>
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
              <span class="filter-unit">{{rs.licenses}}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="filter-search ">
              <el-input @change="search" @keyup.enter='search' :placeholder="rs.search_licenses"
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
                      :data="licenseList"
                      tooltip-effect="light"
                      width='100%'
                      size="mini">
                      <el-table-column
                        prop="licenseno"
                        :label="rs.license_no">
                      </el-table-column>
                      <el-table-column
                        prop="productname"
                        :label="rs.product">
                      </el-table-column>
                      <el-table-column
                        prop="purchasedatetime"
                        :label="rs.sold_date">
                      </el-table-column>
                      <el-table-column
                        prop="usednumber"
                        :label="rs.user_license_number">
                        <template slot-scope="scope">
                          <div>
                            {{scope.row.usednumber}}/{{scope.row.usernumber=='10000'?rs.unlimited:scope.row.usernumber}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="isactived"
                        :label="rs.status">
                        <template slot-scope="scope">
                          <div>
                            {{scope.row.isactived == '0'?rs.inactive:scope.row.isactived == '1'?rs.actived:scope.row.isactived == '2'?rs.expire_soon:scope.row.isactived == '3'?rs.pastdue:scope.row.isactived == '4'?rs.expired:'-'}}

                            <!-- {{scope.row.isactived == '1'?rs.actived:rs.inactive}} -->
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="startdatetime"
                        :label="rs.actived_date">
                      </el-table-column>
                      <el-table-column
                        prop="enddatetime"
                        :label="rs.license_expiry_date">
                      </el-table-column>
                       <el-table-column
                        prop="shortname"
                        :label="rs.grant_to">
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
                    <div class="data-counter">{{rs.showing}} {{stasize}} to {{endsize}} of {{total}} {{rs.licenses}}</div>
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
import { getAllLicense } from'@/api/membershipManageApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      licenseList:[],
      pageList:[],
      total:0,
      pagesize:1,
      pagenum:5,
      endsize:'',
      stasize:'',
      getData:{
        condition:'',  //搜索关键字
        pagesize : 1, //分页
        pagenum :1, //页码
        languagetype:'',
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
  },
  created(){
    this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
    // 默认页码
    this.getData.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.getLicenseList(this.getData)
  },
  methods:{
    getLicenseList(data){
     getAllLicense(data).then(res =>{
       if(res.data.success){
          this.licenseList = res.data.data;
          this.stasize = res.data.start
          this.endsize = res.data.end
          this.total = res.data.total
       }
     })
    },
    handleSizeChange(val) {
      this.getData.pagenum = 1;
      this.getData.pagesize = val;
      this.getLicenseList(this.getData)
    },
    handleCurrentChange(val) {
      this.getData.pagenum = val;  
      this.getLicenseList(this.getData)
    },
    // ----
    search(){
      this.getData.pagenum =1;
      this.getLicenseList(this.getData)
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
  },
    computed: {
    ...mapGetters(['rs','se','languagetype','control']),
    readonly(){
      if(this.control.all_licenses ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
   
  },
}
</script>

