<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <ul class="clearfix list_view_ul">
         <li :class="[active=='1'?'fl list_view':'fl active_list_views']" @click="goRouter('/project_manage/allProjects','','','1')">{{rs.active_projects}}</li>
        <!-- <li :class="[active=='2'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('allProjects2','','','2')">{{rs.list_view}}</li> -->
        <li :class="[active=='2'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/project_manage/allProjects/SharedByAgency','','','2')">{{rs.shared_by_agency}}</li>
        <li :class="[active=='3'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/project_manage/allProjects/SharedByOthers','','','3')">{{rs.shared_by_others}}</li>
        <li :class="[active=='4'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/project_manage/allProjects/InActiveProjects','','','4')">{{rs.inactive_projects}}</li>
      </ul>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :span="6">
            <div class="filter-count">
              <span class="filter-text">{{rs.showing}}</span>
                  <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend"  style="width: 90px;"  size="mini">
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
              clearable 
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
          <el-col :span="6">
            <div class="filter-search ">
              <el-input @change="getData('0')"
                :placeholder="rs.search_projects" v-model="data.fullname" class="input-key" clearable size='mini'>
                <el-button slot="append" icon="el-icon-search" @click="getData('0')"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
    <div class="wrapper-content clearfix">
      <div class="box-card">
        <div class="box-body-card">
          <div class="table_box">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(d,i) in list" :key="i">
                <!-- <div class="card_box" @click="goRouter('editProject',d.projectid,d,'')"> -->
                <!-- <div class="card_box" @click="goRouter('projectDetail',d.projectid,d,'')"  v-if="d.isactived != 0"> -->
                <div class="card_box" @click="goRouter('/project_manage/projectDetail',d.projectid,d,'')" >
                  <div class="inactive" v-if="d.isactived == 0">{{rs.inactive}}</div>
                  <img style="cursor: pointer;" :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_160,w_272'" v-if="d.filepath">
                  <img style="cursor: pointer;" v-else-if="d.category == '03'" src="../../assets/imgs/c_commercial.png">
                  <img style="cursor: pointer;" v-else-if="d.category == '02'" src="../../assets/imgs/c_house.png">
                  <img style="cursor: pointer;" v-else src="../../assets/imgs/c_unit.png"  />
                  <!-- <img style="cursor: pointer;" src="../../assets/imgs/no_pictures.png" alt="" v-else> -->
                  <div class="porject_name">
                    <span class="h_hov omit" >
                      <img v-if="d.isshared == '1'" style="width:15px;height:15px;vertical-align: -7%;padding-right: 10px;" src="../../assets/imgs/common/is_share.png">
                      {{d.name}}
                    </span>
                  </div>
                  <div class="isFeaTrue" v-if="d.isfeatured==1"><img src="../../assets/imgs/common/featrue.png" alt=""></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!--  -->
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
import { getProjectPictureData} from'@/api/projectApi.js'
import { getOption } from'@/api/optionValueApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      active:'1',
      list:[],
      total:0,
      // pagesize:1,
      endsize:'',
      CatetoryValue:'99',
      pageList:[],
      showtoagents:[],
      CatetoryOptions:[],
      stasize:'',
      data:{
        fullname:'',  //搜索关键字
        pagesize : 1, //分页
        pagenum :1, //页码
        category:'',
        isactived:'1',
        isshowtoagents:null,
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
      }else{
        this.active = 1;
      }
      
      //下拉框数据
      this.getOptionData('05','01');
      this.showtoagents = [
        {code:null, value:this.rs.all},
        {code:'1', value:this.rs.yes},
        {code:'0', value:this.rs.no}
      ];
      //获取下拉列表页码
      this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST

      // this.filterOptions = JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST
      // 默认页码
      this.data.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
      this.data.languagetype = localStorage.getItem('languagetype')
      if(this.$route.query.ifmore!=undefined){
        this.data.ifmore = '1'
      }
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
        this.data.category = this.CatetoryValue== '99'?null:this.CatetoryValue,
        this.allProjects(this.data)
      }else{
        this.data.category = this.CatetoryValue== '99'?null:this.CatetoryValue,
        this.restoration()
      }
    },
    goRouter(name,id,obj,index){
      sessionStorage.setItem('isPlatform', '0');
      if (obj) {
       sessionStorage.setItem('ProjectList',JSON.stringify(obj))
      }
      if(id){
        // sessionStorage.removeItem('isView')
        this.$router.push({path:name+'/'+id,
        })
        sessionStorage.setItem('isView','1')
        
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
          } else {
            this.$router.push({path:name})
          }
          
      }
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
      getProjectPictureData(projectList).then(res=>{
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
          this.CatetoryOptions = res.data.data
          this.CatetoryOptions.push({code:'99',value:this.rs.all})
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
      this.getOptionData('05','01');
      this.showtoagents = [
        {code:null, value:this.rs.all},
        {code:'1', value:this.rs.yes},
        {code:'0', value:this.rs.no}
      ];
      // this.data.category = this.CatetoryValue.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)
    }
  }
}
</script>

<style lang="scss" scoped>

.card_box{
  height: 200px;
  box-shadow: 1px 1px 5px 0 #bbb;
  border-radius:5px; 
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  >img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .porject_name {
    width: 100%;
    position: absolute;
    height: 34px;
    line-height: 34px;
    background:rgba(32,42,71,0.8);
    bottom: 0px;
    text-align: center;
    > span {
      font-size:14px;
      font-family:SFUIDisplay-Medium;
      font-weight:500;
      color:rgb(255,255,255);
    }
  }
}
.h_hov:hover{
  color: #97ADFF;
  cursor:pointer
}
.isFeaTrue{
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  img{
    width: 100%
  }
}
</style>
