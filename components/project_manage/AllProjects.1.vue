<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <ul class="clearfix list_view_ul">
        <li :class="[active=='1'?'fl list_view':'fl active_list_views']" @click="goRouter('/project_manage/allProjects','','','1')">{{rs.gallery_view}}</li>
        <li :class="[active=='2'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/project_manage/allProjects2','','','2')">{{rs.list_view}}</li>
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
          <el-col :span="6">
            <div class="filter">
              <span class="filter-text">{{rs.project_status}}:</span>
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
              <el-col :span="6" v-for="(d,i) in list" :key="i">
                <div class="card_box_projects" @click="goRouter('/project_manage/editProject',d.projectid,d,'')">
                  <div>
                    <div class="inactive" v-if="d.isactived == 0">{{rs.inactive}}</div>
                    <img style="cursor: pointer;" :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_160,w_272'" v-if="d.filepath">
                    <img style="cursor: pointer;" v-else-if="d.category == '03'" src="../../assets/imgs/c_commercial.png">
                    <img style="cursor: pointer;" v-else-if="d.category == '02'" src="../../assets/imgs/c_house.png">
                    <img style="cursor: pointer;" v-else src="../../assets/imgs/c_unit.png"  />
                    <!-- <img style="cursor: pointer;" src="../../assets/imgs/no_pictures.png" alt="" v-else> -->
                  </div>
                  <div>
                  <div class="porject_name"><span class="h_hov omit" >{{d.name}}</span></div>
                    <div class="special">
                      <p v-for=" (item) in d.special" :key="item.featuretype" :class="color[parseFloat(item.featuretype)%12]">
                          {{Special[item.featuretype]}}
                      </p>
                    </div>
                  </div>
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
      Special:{},
      active:'1',
      list:[],
      total:0,
      color:['bg_blue tag', 'bg_orange tag', 'bg_red tag', 'bg_purple tag', 'bg_grey tag', 'bg_green tag',
          'bg_cyan tag', 'bg_olivedrab tag', 'bg_plum tag', 'bg_yellow tag', 'bg_gold tag', 'bg_brown tag'],
      // pagesize:1,
      endsize:'',
      CatetoryValue:'',
      pageList:[],
      MacketOptions:[],
      CatetoryOptions:[],
      stasize:'',
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
      
      //下拉框数据
      this.getOptionData('05','01')
      this.getOptionData('05','02')
      //获取下拉列表页码
      this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST

    // this.filterOptions = JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST
    // 默认页码
    this.data.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
    this.data.languagetype = localStorage.getItem('languagetype')
    if(this.$route.query.ifmore!=undefined){
      this.data.ifmore = '1'
    }
    this.project_setlect =JSON.parse(localStorage.getItem('selectlist')).PROJECT_FEATURE_LIST
      this.project_setlect.forEach(element => {
        this.Special[element.code] = element.value;
      });
      this.Special = Object.assign({}, this.Special)
    this.allProjects(this.data)
    },
  methods:{
    restoration(){
      this.data.pagenum = 1
      this.data.category = this.CatetoryValue.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)
    },
    getData(type){
      if(type=='1'){
        this.data.category = this.CatetoryValue.join(','),
        this.allProjects(this.data)
      }else{
        this.restoration()
      }
    },
    goRouter(name,id,obj,index){
      
      if (obj) {
       sessionStorage.setItem('ProjectList',JSON.stringify(obj))
      }
      if(id){
        // sessionStorage.removeItem('isView')
        this.$router.push({path:name+'/'+id,
        })
        sessionStorage.setItem('isView','1')
        
      }else{
          if (this.$route.query.ifmore) {
            this.$router.push({
              path:name,
              query: {
                  ifmore: 'ifmore'
              }
          })
          } else {
            this.active = index 
            sessionStorage.setItem('PROJECTSINDEX',index)
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
          this.list = res.data.data
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
          if (keyid2=='01') {
            this.CatetoryOptions = res.data.data
          } else {
            this.MacketOptions = res.data.data
          }
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
      this.getOptionData('05','02')
      this.data.category = this.CatetoryValue.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.card_box_projects{
    background: #fff;
    height: 280px;
    position: relative;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    margin-bottom: 20px;
  
  img {
    height: 100%;
    width: 100%;
  }
  
}
.h_hov:hover{
  color: #97ADFF;
  cursor:pointer
}
.special {
    height: 60px;
    overflow-y: scroll;
}
.special::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.special::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #bebcbc;
}
.special::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
}
.porject_name {
    width: 100%;
    height: 34px;
    line-height: 34px;
    
    > span {
      font-size:14px;
      // font-family:SFUIDisplay-Bold;
      font-weight:bold;
      color:rgba(32,42,71,1);
    }
  }
</style>
