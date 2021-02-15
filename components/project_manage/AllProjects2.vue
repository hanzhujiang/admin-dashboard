<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <form autocomplete="on">
      <div class="wrapper-header clearfix">
        <ul class="clearfix list_view_ul">
         <li :class="[active=='1'?'fl list_view':'fl active_list_views']" @click="goRouter('/project_manage/allProjects','','','1')">all Projects</li>
        <!-- <li :class="[active=='2'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('allProjects2','','','2')">{{rs.list_view}}</li> -->
        <li :class="[active=='3'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/project_manage/allProjects/SharedByAgency','','','2')">Shared by Agency</li>
        <li :class="[active=='4'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/project_manage/allProjects/SharedByOthers','','','3')">Shared by Others</li>
        <li :class="[active=='2'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/project_manage/allProjects2','','','4')">inactive Projects</li>
        </ul>
      </div>
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :span="6">
            <div class="filter-count">
              <span class="filter-text">{{rs.showing}}</span>
              <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend" style="width: 90px;"  size="mini">
                <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
                <!-- <el-option v-for=" d in 3" :label="d" :value="d"></el-option> -->
              </el-select>
              <span class="filter-unit">{{rs.projects}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="filter">
              <span class="filter-text">{{rs.category}}:</span>
              <el-select
              @change="getData('0')"
              style="width:70%;"
              v-model="CatetoryValue"
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
          <el-col :span="6">
            <div class="filter">
              <span class="filter-text">{{rs.status}}:</span>
              <el-select
              @change="getData('0')"
              clearable
              style="width:70%;"
              v-model="data.status"
              size="mini"
              placeholder="">
                <el-option
                v-for="item in MacketOptions"
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
                :placeholder="rs.search_projects" v-model="data.fullname" class="input-key" clearable size='mini'>
                <el-button @click="getData('0')" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper-content clearfix">
        <div class="box">
          <div class="box-body">
            <div class="table_box">
              <el-table
                :empty-text = rs.no_data
                :data="list"
                tooltip-effect="light"
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  :label="rs.name"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column >
                  <template slot-scope="scope">
                    <span v-show="scope.row.feature=='1'" class="tag" style="background:rgb(255,116,79);">{{rs.feature}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="category"
                  :label="rs.category"
                  :show-overflow-tooltip="true">
                  <template  slot-scope="scope">
                    <span>{{categoryObj[scope.row.category]}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="province"
                  :label="rs.price_range"
                  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span>{{scope.row.minprice?'$':''}}{{toMoney(+scope.row.minprice/1000)+'  '+'k'}}</span>
                    <span class="nbsp">{{scope.row.minprice||scope.row.maxprice?'-':''}}</span>
                    <span>{{scope.row.maxprice?'$':''}}{{toMoney(+scope.row.maxprice/1000)+'  '+'k'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="vendor"
                  :label="rs.vendor"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  prop="keycontacts"
                  :label="rs.contact"
                  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                     <p v-for="(d,i) in scope.row.agentnamelist" :key="i">
                      {{d.firstname}}<span class='nbsp'></span>{{d.lastname}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="is_actived"
                  :label="rs.is_actived"
                  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                   {{scope.row.isactived==0?rs.no:rs.yes}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="special"
                  :label="rs.special">
                  <template slot-scope="scope">
                    <p v-for=" (item) in scope.row.special" :key="item.featuretype" :class="color[parseFloat(item.featuretype)%12]">
                      {{Special[item.featuretype]}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <span class="sendoredit" @click="goRouter('/project_manage/editProject',scope.row.projectid,scope.row,'')">{{!readonly?rs.edit:rs.detail}}</span>
                    <span v-if="!readonly" class="sendoredit" @click="send(scope.row)">{{rs.send}}</span>
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
    </form>
  </div>
</template>
<script>
import { getProjectList, pushNewProject } from'@/api/projectApi.js'
import { mapGetters } from "vuex";
import { getOption } from'@/api/optionValueApi.js'
export default{
  data() {
    return {
      active:'1',
      color:['bg_blue tag', 'bg_orange tag', 'bg_red tag', 'bg_purple tag', 'bg_grey tag', 'bg_green tag',
          'bg_cyan tag', 'bg_olivedrab tag', 'bg_plum tag', 'bg_yellow tag', 'bg_gold tag', 'bg_brown tag'],
      categoryObj:{},
      list:[],
      select:'',
      Special:{},
      total:0,
      endsize:'',
      MacketOptions: [],
      CatetoryOptions:[],
      CatetoryValue:'',
      pageList:[],
      stasize:'',
      describeList:[],
      data:{
        fullname:'',  //搜索关键字
        pagesize : 1, //分页
        pagenum :1, //页码
        category:'',
        status:'',
        languagetype:'',
        ifmore:''
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
    created(){
      if (sessionStorage.getItem('PROJECTSINDEX')) {
        this.active = sessionStorage.getItem('PROJECTSINDEX')
      }
      
    //描述
     
      //下拉框数据
      this.getOptionData('05','01')
      this.getOptionData('05','02')
      this.getOptionData('03','03')
      //获取下拉列表页码
      this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
      this.project_setlect =JSON.parse(localStorage.getItem('selectlist')).PROJECT_FEATURE_LIST
      this.project_setlect.forEach(element => {
        this.Special[element.code] = element.value;
      });
      this.Special = Object.assign({}, this.Special)
    this.filterOptions = JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST

    this.filterOptions.forEach(val => {
      this.categoryObj[val.code] = val.value
    });
        this.categoryObj = Object.assign({}, this.categoryObj)
    // 默认页码
    this.data.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
    this.data.languagetype = localStorage.getItem('languagetype')
    if(this.$route.query.ifmore!=undefined){
      this.data.ifmore = '1'
    }
    // this.allProjects(this.data)

    },
  methods:{
    send(row){
      this.$confirm(this.rs.info_msg_new_project, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        let data={
          projectid:row.projectid,
          languagetype:localStorage.getItem('languagetype'),
        }
        pushNewProject(data).then(res=>{
          if (res.data.success) {
            this.$message.success(this.rs.send_success);
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });

    },
    toMoney(num){
      num = num.toFixed(2);
      num = parseFloat(num)
      num = num.toLocaleString();
      return num;//返回的是字符串23,245.12保留2位小数
    },
    restoration(){
      this.data.pagenum = 1;
      // this.data.category = this.CatetoryValue.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)
    },
    getData(type){
      if(type=='1'){
        this.data.category = this.CatetoryValue== '99'?null:this.CatetoryValue,
        // this.data.category = this.CatetoryValue.join(','),
        this.allProjects(this.data)
      }else{
        this.data.category = this.CatetoryValue== '99'?null:this.CatetoryValue,
        this.restoration()
      }
    },
    goRouter(name,id,obj,index){
      if(id){
        // sessionStorage.removeItem('isView')
        this.$router.push({
          path:name+'/'+id,
          })
        sessionStorage.setItem('isView','2')
        sessionStorage.setItem('ProjectList',JSON.stringify(obj))
      }else{
        this.active = index 
        sessionStorage.setItem('PROJECTSINDEX',index)
          if (this.$route.query.ifmore) {
            this.$router.push({
              path:name,
              query: {
                  ifmore: 'ifmore'
              }
          })
          }else{
           
            this.$router.push({path:name})
          }
          
      }
    },
    //所有楼盘信息
    allProjects(projectList){
      getProjectList(projectList).then(res=>{
        if (res.data.success) {
        
          this.stasize = res.data.stasize
          this.endsize = res.data.endsize
          this.total = res.data.total
          this.list = res.data.data
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
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
          if (keyid2=='01') {
            this.CatetoryOptions = res.data.data;
            this.CatetoryOptions.push({code:'99',value:this.rs.all})
          } else if(keyid2=='02'){
            this.MacketOptions = res.data.data
            this.data.status = res.data.data[0].code
            this.allProjects(this.data)
          }else{
            this.describeList = res.data.data
          }
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
  },
    computed: {
    ...mapGetters(['rs','languagetype','se','control']),
    readonly(){
      if(this.control.all_projects ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getOptionData('05','01')
      this.getOptionData('05','02')
      this.getOptionData('03','03')
      // this.data.category = this.CatetoryValue.join(','),
      this.data.languagetype = val
      this.allProjects(this.data)
    },
    se(val){
      this.filterOptions = val.PROJECT_CATEGORY_LIST
      this.project_setlect =val.PROJECT_FEATURE_LIST
      this.filterOptions.forEach(val => {
        this.categoryObj[val.code] = val.value
      });
      this.project_setlect.forEach(element => {
        this.Special[element.code] = element.value;
      });
    }
  }
}
</script>
<style scoped>
.featuretype{
  font-size:14px;
  font-family:SFUIDisplay-Medium;
  font-weight:500;
  color:rgba(85,91,103,1);
  padding: 2px 0;
}
.sendoredit{
  font-size:15px;
  font-family:SFUIDisplay-Medium;
  font-weight:600;
  color:rgb(76,75,213);
  padding: 0 8px ;
}
.sendoredit:hover{
  color:#0026C3;
  cursor:pointer;
}
</style>

