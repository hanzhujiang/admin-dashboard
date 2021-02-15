<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.all_projects}}</span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :span="6">
            <div class="filter-count">
              <span class="filter-text">{{rs.showing}}</span>
                  <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend"  style="width: 90px;"  size="mini">
                    <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
                  </el-select>
              <span class="filter-unit">{{rs.projects}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="filter">
              <span class="filter-text">{{rs.category}}:</span>
              <el-select
              clearable 
              @change="getData('0')"
              style="width:70%;"
              v-model="catetoryValue"
              size="mini"
              placeholder="">
                <el-option
                v-for="item in catetoryOptions"
                :key="item.value"
                :label="item.value"
                :value="item.code">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="filter">
              <span class="filter-text">{{rs.is_actived}}:</span>
              <el-select
              @change="getData('0')"
              clearable
              style="width:70%;"
              v-model="data.isactived"
              size="mini"
              placeholder="">
                <el-option
                v-for="item in activedOptions"
                :key="item.value"
                :label="item.value"
                :value="item.code">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="filter-search ">
              <el-input @change="getData('0')"
                :placeholder="rs.search_projects" v-model="data.fullname" class="input-key" sclearable ize='mini'>
                <el-button slot="append" icon="el-icon-search" @click="getData('0')"></el-button>
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
              :data="list"
              :empty-text = rs.no_data
              tooltip-effect="light"
              style="width: 100%"
              size="mini">
              <el-table-column
                prop="name"
                :label="rs.project_name"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="vendorname"
                :label="rs.vendor"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="agencyname"
                :label="rs.created_by"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="createdtimestamp"
                :label="rs.created_date"
                :show-overflow-tooltip="true"
                width="160">
              </el-table-column>
              <el-table-column
                prop="category"
                :label="rs.category"
                :show-overflow-tooltip="true"
                width="120">
                <template slot-scope="scope">
                  <span>{{categoryObj[scope.row.category]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="isactived"
                :label="rs.is_actived"
                :show-overflow-tooltip="true"
                width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.isactived==1?rs.yes:rs.no }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="rs.action"
                width="190">
                <template slot-scope="scope">
                  <div>
                    <span class="btntext" @click="goRouter('/project_manage/platform_manage/allProjects',scope.row.projectid,scope.row,'')">{{rs.edit}}</span>
                    <span class="btntext" @click="goRouter('/project_manage/platform_manage/allProjects/viewSharing',scope.row.projectid,scope.row,'')">{{rs.view_sharing}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table_footer clearfix" v-if="total">
            <div class="data-counter fl">{{rs.showing}} {{stasize}} to {{endsize}} of {{total}} {{rs.projects}}</div>
              <div class="fr">
                <el-pagination
                @current-change="getData('1')"
                :current-page.sync="data.pagenum"
                :page-size="data.pagesize"
                layout="prev, pager, next "
                :total="total"
                class="fr" >
                </el-pagination>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllProjectData} from'@/api/projectApi.js'
import { getOption } from'@/api/optionValueApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      list:[],
      total:0,
      // pagesize:1,
      endsize:'',
      catetoryValue:'99',
      pageList:[],
      activedOptions:[],
      catetoryOptions:[],
      categoryObj:{},
      stasize:'',
      data:{
        fullname:'',  //搜索关键字
        pagesize : 1, //分页
        pagenum :1, //页码
        category:'',
        isactived:'1',
        languagetype:''
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
  },
  created(){
    //下拉框数据
    this.getOptionData('05','01')
    this.activedOptions = [
      {code:null, value:''},
      {code:'1', value:this.rs.yes},
      {code:'0', value:this.rs.no}
    ];
    //获取下拉列表页码
    this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
    JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST.forEach(val => {
      this.categoryObj[val.code] = val.value
    });
    this.categoryObj = Object.assign({}, this.categoryObj)
    // 默认页码
    this.data.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
    this.data.languagetype = localStorage.getItem('languagetype')
    this.allProjects(this.data)
  },
  methods:{
    restoration(){
      this.data.pagenum = 1
      this.data.languagetype = localStorage.getItem('languagetype');
      this.allProjects(this.data)
    },
    getData(type){
      if(type=='1'){
        this.data.category = this.catetoryValue== '99'?null:this.catetoryValue,
        this.allProjects(this.data)
      }else{
        this.data.category = this.catetoryValue== '99'?null:this.catetoryValue,
        this.restoration()
      }
    },
    goRouter(name,id,obj,index){
      sessionStorage.setItem('ProjectList',JSON.stringify(obj))
      sessionStorage.setItem('isPlatform', '1');
      sessionStorage.setItem('isFullEdit', '1');
      this.$router.push({path:name+'/'+id});
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    //所有楼盘信息
    allProjects(projectList){
      getAllProjectData(projectList).then(res=>{
        if (res.data.success) {
          this.stasize = res.data.stasize
          this.endsize = res.data.endsize
          this.total = res.data.total
          this.list = JSON.parse(JSON.stringify(res.data.data)) 
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // getOption
    getOptionData(keyid1,keyid2){
      let opData = {
        keyid1:keyid1,
        keyid2:keyid2,
        languagetype:localStorage.getItem('languagetype')
      }
      getOption(opData).then(res=>{
        if (res.data.success) {
          this.catetoryOptions = res.data.data
          this.catetoryOptions.push({code:'99',value:this.rs.all})
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
  },
  computed: {
    ...mapGetters(['rs','languagetype'])
  },
  watch:{
    languagetype(){
      this.getOptionData('05','01')
      this.activedOptions = [
        {code:null, value:''},
        {code:'1', value:this.rs.yes},
        {code:'0', value:this.rs.no}
      ];
      // this.data.category = this.catetoryValue.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)
    },
    se(){
      JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST.forEach(val => {
        this.categoryObj[val.code] = val.value
      });
      this.categoryObj = Object.assign({}, this.categoryObj)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
