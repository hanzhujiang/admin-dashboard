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
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(d,i) in sharedProjectList" :key="i">
                <!-- <div class="card_box" @click="goRouter('editProject',d.projectid,d,'')"> -->
                <div class="card_box" @click="goRouter('/project_manage/projectDetail',d.projectid,d,'')">
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
                  <div class="agency_name">
                    <img src="" alt="">
                    {{d.accepted}}
                  </div>
                  <div class="actionBtn">
                    <span class="btntext fr" @click.stop="goRouterCommiss('/project_manage/sharedProjects/sharedCommissionRate',d)">{{rs.commission}}</span>
                    <span class="btntext fr" @click.stop="downloadUploadingShow(d)">{{rs.agreement}}</span>
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
     <el-dialog
      :close-on-click-modal='false'
      :title="rs.agreement"
      :visible.sync="uploadingShow"
      width="60%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.agreement}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <div class="box-body">
          <div class="upload_box">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="upload_area">
                  <el-upload
                    v-if="!readonly"
                    class="upload-demo"
                    drag
                    :show-file-list="false"
                    :on-success="LightImg"
                    :before-upload="beforeAvatarUpload"
                    :on-progress="uploadVideoProcess"
                    :multiple="true"
                    :action="actionUrl">
                    <i class="el-icon-upload" v-if="!videoFlag"></i>
                    <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                    <div class="el-upload__text"  v-if="!videoFlag">{{rs.drop_file_here_or_click}}</div>
                    <div class="el-upload__text"  v-if="!videoFlag">{{rs.only_accept}} .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                  </el-upload>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="padding-top:20px;">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="file_list_area">
                  <ul>
                    <li v-for="(d,i) in attachmentList" :key="i">
                      <div class="fl handle">
                        <span>
                          <i class="fa fa-bars"></i>
                        </span>
                        <span >{{i+1}}</span>
                        <span>{{d.displayname?d.displayname:' '}}</span>
                      </div>
                      <template >
                        <!-- <div class="fr">
                          <el-button class="small bg_orange" size="mini"  v-if="!readonly" @click="download(d)" style="color:#FFF"><i class="fa fa-download"></i><span>&nbsp;{{rs.download_agreement}}</span></el-button>
                        </div> -->
                        <div class="fr">
                           <span class="btntext" @click="download(d)"><span>&nbsp;{{rs.download}}</span></span>
                        </div>
                        <div class="fr">
                          <span class="btntext" @click="handleDelet(d)" v-if="!readonly">{{rs.delete}}</span>
                        </div>
                      </template>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getProjectPictureData, getSharedProjects, attachmentGetData, agencyAttachmentinsert, attachmentDelete} from'@/api/projectApi.js'
// import { getSharedProjects, deleteShareto ,, } from'@/api/projectApi.js'

import axios from 'axios'
import { getOption } from'@/api/optionValueApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      actionUrl:'',
      active:'1',
      agencyprojectid:'',
      attachmentList:[],
      sharedProjectList:[],
      uploadingShow:false,
      videoFlag:false,
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
        status:'',
        isactived:'1',
        isshowtoagents:null,
        languagetype:'',
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
    this.getSharedProjectsList(this.data)
    
    },
  methods:{
    restoration(){
      this.data.pagenum = 1
      this.data.languagetype = localStorage.getItem('languagetype');
      this.getSharedProjectsList(this.data)
    },
    getData(type){
      if(type=='1'){
        this.data.category = this.CatetoryValue== '99'?null:this.CatetoryValue,
        this.getSharedProjectsList(this.data)
      }else{
        this.data.category = this.CatetoryValue== '99'?null:this.CatetoryValue,
        this.restoration()
      }
    },
    download (data) {
      window.location.href=data.filepath;
      let url= data.filepath;
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', data.displayname)
      document.body.appendChild(link)
      link.click()
    },
    handleDelet(data){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        attachmentDelete({ids:data.attachmentid,path:data.filepath}).then(res=>{
          if(res.data.success){
            this.getAttachment(this.agencyprojectid);
            this.$message.success(this.rs.info_msg_delete_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    },
    downloadUploadingShow(row){
      this.uploadingShow = true;
      this.agencyprojectid = row.agencyprojectid;
      this.actionUrl =axios.defaults.baseURL+'agencyAttachment/uploadFile?projectid='+row.projectid+'&agencyprojectid='+row.agencyprojectid; 
      this.getAttachment(row.agencyprojectid)
    },
     getAttachment(id){
      attachmentGetData({refertype:'6',attachmenttype:'99',referid:id}).then(res=>{
        if(res.data.success){
          this.attachmentList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
     LightImg(res, file) {
    this.videoUploadPercent = 100;
    this.videoFlag = false;
    this.$store.commit('SET_SHOW_LOADING',false)
    let fileData={
        displayname:file.name,
        filepath:file.response.filepath,
        agencyprojectid: this.agencyprojectid,//文件类型

      }
    agencyAttachmentinsert(fileData).then(res=>{
        if(res.data.success){
          this.getAttachment(this.agencyprojectid);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    matchType(fileName,type) {
      // 后缀获取
      var suffix = '';
      // 获取类型结果
      var result = '';
      try {
        var flieArr = fileName.split('.');
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = '';
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false;
        return result;
      }else{
        if(suffix == type){
          return true
        }else{
          return false
        }
      }
    },
    beforeAvatarUpload(file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isPdf = this.matchType(file.name,'pdf') || this.matchType(file.name,'PDF');
      const isdoc = this.matchType(file.name,'doc');
      const isdocx = this.matchType(file.name,'docx');
      const iszip = this.matchType(file.name,'zip');
      const israr = this.matchType(file.name,'rar');
      const isxls = this.matchType(file.name,'xls');
      const isxlsx = this.matchType(file.name,'xlsx');
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      if(!isPdf && !isdoc && !isdocx && !iszip && !israr && !isxls && !isxlsx){
        this.$message.error(this.rs.err_msg_file_type);
      }
      return  (isPdf || isdoc || isdocx || iszip || israr || isxlsx || isxls )&&isLt100M;
    },
     uploadVideoProcess(event, file, fileList){
      this.videoFlag = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
      //上传合同
    uploadingContract(row){
      this.uploadingShow = true;
      this.actionUrl =axios.defaults.baseURL+'agencyAttachment/uploadFile?projectid='+this.projectId+'&agencyprojectid='+row.agencyprojectid; 
      this.getAttachment(row.agencyprojectid)
      this.agencyprojectid = row.agencyprojectid
    },
    goRouterCommiss(name,d){
      sessionStorage.setItem('ProjectList',JSON.stringify(d))
      this.$router.push({path:name});
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
    getSharedProjectsList(projectList){
      getSharedProjects(projectList).then(res=>{
        if (res.data.success) {
          this.stasize = res.data.stasize
          this.endsize = res.data.endsize
          this.total = res.data.total
          this.sharedProjectList = res.data.data
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
    ...mapGetters(['rs','languagetype','control']),
    readonly(){
      if(this.control.shared_project ==='02'){
        return true
      }else{
        return false
      }
    }
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
      this.getSharedProjectsList(this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.file_list_area li{
  height: 22px;
  line-height: 20px;
  border-radius: 2px;
  padding: 10px;
  background: #f4f4f4;
  margin-bottom: 2px;
  border-left: 2px solid #e6e7e8;
  color: #444;
  cursor: move;
}
.file_list_area .handle>span{
  padding-left: 5px;
  padding-right: 5px;
}
.card_box{
  height: 250px !important;
  box-shadow: 1px 1px 5px 0 #bbb;
  border-radius:5px; 
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  >img {
    height: 80%;
    width: 100%;
  }
  .porject_name {
    width: 100%;
    position: absolute;
    height: 34px;
    line-height: 34px;
    color: #fff;
    text-shadow:0 2px 2px #000;
    text-align: left;
    // background:rgba(32,42,71,0.8);
    bottom: 50px;
    > span {
      font-size:14px;
      padding-left: 15px;
      font-family:SFUIDisplay-Medium;
      font-weight:500;
      color:rgb(255,255,255);
    }
  }
  .agency_name {
    background: #FFF;
    padding-top: 10px;
    line-height: 15px;
    padding-left: 15px;
    font-size: 14px;
    color: #555B67;
    height: 15px;
  }
  .actionBtn {
    background: #FFF;
    height: 45px;
    .btntext {
      cursor: pointer;
      color: #4C4BD5;
      padding-right: 12px;
      font-weight: Bold;
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
