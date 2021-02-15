<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.agency_project}}</span>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-condition clearfix">
      <el-row >
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <page-size :unit='rs.agency_projects' @changeSize="handleSizeChange"></page-size>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="checkbox_box">
          <el-checkbox v-model="isactived" class="filter-text" true-label="1"	false-label="0"	@change="changeActived">{{rs.only_show_activated}}</el-checkbox>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="box">
          <div class="filter-search fr" style="width: 100%;">
            <el-input :placeholder="rs.search_agency_projects" clearable v-model="getData.searchkey" class="input-key" autocomplete="off" size='mini' @change="search" @keyup.enter='search'>
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
              :data="allAgencyProjectList"
              tooltip-effect="light"
              :empty-text = rs.no_data
              style="width: 100%"
              size="mini">
              <el-table-column
                prop="projectfullname"
                :show-overflow-tooltip="true"
                :label="rs.project">
              </el-table-column>
              <el-table-column
                prop="agencyfullname"
                :show-overflow-tooltip="true"
                :label="rs.agency">
              </el-table-column>
              <el-table-column
                prop="sharedfromagencyfullname"
                :show-overflow-tooltip="true"
                :label="rs.shared_from">
              </el-table-column>
              <el-table-column
                prop="isshared"
                :label="rs.is_shared"
                width="80">
                <template slot-scope="scope">
                  {{scope.row.isshared == 1?rs.yes:rs.no}}
                </template>
              </el-table-column>
              <el-table-column
                prop="shareddatetime"
                :label="rs.shared_date"
                :show-overflow-tooltip="true"
                width="200">
              </el-table-column>
              <el-table-column
                prop="isfulledit"
                :label="rs.is_full_edit"
                width="80">
                <template slot-scope="scope">
                  <span v-if="readonly">{{scope.row.isfulledit == 1?rs.yes:rs.no}}</span>
                  <el-switch v-else
                    active-value="1"
                    inactive-value="0"
                    v-model="scope.row.isfulledit"
                    active-color="#13ce66"
                    inactive-color="#CCC"
                    @change="changeswitch(scope.row)">
                    >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="shareable"
                :label="rs.shareable"
                width="80">
                <template slot-scope="scope">
                  <span v-if="readonly">{{scope.row.shareable == 1?rs.yes:rs.no}}</span>
                  <el-switch v-else
                    active-value="1"
                    inactive-value="0"
                    v-model="scope.row.shareable"
                    active-color="#13ce66"
                    inactive-color="#CCC"
                    @change="changeswitch(scope.row)">
                    >
                  </el-switch>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table_footer"  v-if="total">
            <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.agency_projects}}</div>
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
import{ agencyProjectGetAllData, updateAgencyproject } from '@/api/projectApi.js'
import axios from 'axios'
import { Message } from 'element-ui'
import { mapGetters } from "vuex";
export default{
    data() {
    return {
      total:0,
      end:'',
      start:'',
      isactived:'1',
      getData:{
        languagetype: '',
        pagenum:1,
        pagesize:20,
        searchkey:'',
        isactived:'1',
      },
      allAgencyProjectList:[],
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve),
  },
  methods:{
    search(){
      this.getData.pagenum = 1;
      this.getAgencyProject(this.getData);
    },
    changeswitch(d) {
      updateAgencyproject({agencyprojectid:d.agencyprojectid,isfulledit:d.isfulledit,shareable:d.shareable}).then(res =>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_update_success);
          this.getAgencyProject(this.getData);
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    changeActived() {
      if(this.isactived == '0') {
        this.getData.isactived = null;
        this.getAgencyProject(this.getData);
      } else {
        this.getAgencyProject(this.getData);
      }
    },
    // 分页  clien
    handleSizeChange(val){
      this.getData.pagenum = 1;
      this.getData.pagesize = val;
      this.getAgencyProject(this.getData)
    },
    handleCurrentChange(val){
        this.getData.pagenum = val;
        this.getAgencyProject(this.getData)
    },
    getAgencyProject(data){
        agencyProjectGetAllData(data).then(res=>{
        if(res.data.success){
          this.allAgencyProjectList = res.data.data;
          this.total = res.data.total
          this.start = res.data.start;
          this.end = res.data.end
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
  },
  created(){
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.getAgencyProject(this.getData);
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.project_pf_agency_project ==='02'){
        return true
      }else{
        return false
      }
    }

  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getAgencyProject(this.getData);
    },
    isactived(val){
      this.getData.isactived = val;
      this.getAgencyProject(this.getData);
    }
  },
}
</script>
<style lang="scss">
</style>

