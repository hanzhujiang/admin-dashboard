<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.shared_projects}}</span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-count">
              <span class="filter-text">{{rs.showing}}</span>
              <el-select @change="search" v-model="data.pagesize" slot="prepend" placeholder="" style="width: 90px;"  size="mini">
                      <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
                      <!-- <el-option v-for=" d in 3" :label="d" :value="d"></el-option> -->
                    </el-select>
              <span class="filter-unit">{{rs.projects}}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter">
              <span class="filter-text">{{rs.category}} :</span>
              <el-select
                @change="search"
                style="width:70%"
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
              <span class="filter-text">{{rs.show_to_agents}}:</span>
              <el-select
                @change="search"
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
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search ">
              <el-input @change="search" :placeholder="rs.search_projects" v-model="data.fullname" 
                  class="input-key" clearable size='mini'>
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
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
                prop="accepted"
                :label="rs.accepted"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column width=90>
                <template slot-scope="scope">
                  <span v-show="scope.row.isfeatured=='1'" class="bg_orange tag">{{rs.feature}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                :label="rs.name"
                :show-overflow-tooltip="true">
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
                prop="pricerange"
                :label="rs.price_range"
                :show-overflow-tooltip="true"
                width="160">
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
                :label="rs.attention"
                :show-overflow-tooltip="true"
                width="140">
                <template slot-scope="scope">
                  <p v-for="(d,i) in scope.row.agentnamelist" :key="i">
                    {{d.firstname}}<span class='nbsp'></span>{{d.lastname}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                prop="Special"
                :label="rs.special"
                width="220">
                  <template slot-scope="scope">
                  <p v-for=" (item) in scope.row.special" :key="item.featuretype"
                    :class="color[parseFloat(item.featuretype)%12]">{{Special[item.featuretype]}}</p>
                  <!-- <span  v-for=" (item) in scope.row.special" :key="item.featuretype"
                    :class="color[parseFloat(item.featuretype)%12]">{{Special[item.featuretype]}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                :label="rs.action"
                width="190">
                <template slot-scope="scope">
                  <div>
                    <span class="btntext" @click="downloadUploadingShow(scope.row)" v-if="!readonly">{{rs.agreement}}</span>
                    <span class="btntext" @click="handledel(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                  </div>
                  <div>
                    <span class="btntext" 
                      @click="goRouter('/project_manage/sharedProjects/sharedCommissionRate',scope.row)" v-if="!readonly">{{rs.commission}}</span>
                    <span class="btntext" 
                      @click="goRouter('/project_manage/sharedProjects/shareToChannel/' + scope.row.projectid, scope.row)" v-if="!readonly">{{rs.share}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table_footer clearfix"  v-if="total">
              <div class="data-counter fl">{{rs.showing}} {{stasize}} to {{endsize}} of {{total}} {{rs.projects}}</div>
              <div class="fr">
                <el-pagination
                @current-change="getData()"
                :current-page.sync="data.pagenum"
                :page-size="data.pagesize"
                layout="prev, pager, next"
                :total="total"
                class="fr">
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
                          <el-button class="small bg_orange" size="mini"  v-if="!readonly" @click="download(d)" style="color:#FFF">
                            <i class="fa fa-download"></i><span>&nbsp;{{rs.download_agreement}}</span></el-button>
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
import { mapGetters } from "vuex";
import axios from 'axios'
import { getOption } from'@/api/optionValueApi.js'
import { getSharedProjects, deleteShareto ,attachmentGetData, agencyAttachmentinsert, attachmentDelete} from'@/api/projectApi.js'
export default{
  data() {
    return {
      uploadingShow:false,
      videoFlag:false,
      agencyprojectid:'',
      actionUrl:'',
      attachmentList:[],
      color:['bg_blue tag', 'bg_orange tag', 'bg_red tag', 'bg_purple tag', 'bg_grey tag', 'bg_green tag',
          'bg_cyan tag', 'bg_olivedrab tag', 'bg_plum tag', 'bg_yellow tag', 'bg_gold tag', 'bg_brown tag'],
      Special:{},
      categoryObj:{},
      list:[],
      select:'',
      total:0,
      pagesize:1,
      endsize:'',
      showtoagents:[],
      CatetoryOptions:[],
      CatetoryValue:'',
      pageList:[],
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

  created(){
      //下拉框数据
      this.getOptionData('05','01')
      this.showtoagents = [
        {code:null, value:this.rs.all},
        {code:'1', value:this.rs.yes},
        {code:'0', value:this.rs.no}
      ];
      //获取下拉列表页码
      this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST


      JSON.parse(localStorage.getItem('selectlist')).PROJECT_FEATURE_LIST.forEach(element => {
        this.Special[element.code] = element.value;
      });
    this.Special = Object.assign({}, this.Special)
    JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST.forEach(val => {
        this.categoryObj[val.code] = val.value
      });
        this.categoryObj = Object.assign({}, this.categoryObj)
    this.filterOptions = JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST
    // 默认页码
    this.data.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
    this.data.languagetype = localStorage.getItem('languagetype')
    this.allProjects(this.data)
    },
    components:{
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
  methods:{
    getAttachment(id){
      attachmentGetData({refertype:'6',attachmenttype:'99',referid:id}).then(res=>{
        if(res.data.success){
          this.attachmentList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },

    downloadUploadingShow(row){
      this.attachmentList = {};
      this.uploadingShow = true;
      this.agencyprojectid = row.agencyprojectid;
      this.actionUrl =axios.defaults.baseURL+'agencyAttachment/uploadFile?projectid='+row.projectid+'&agencyprojectid='+row.agencyprojectid; 
      this.getAttachment(row.agencyprojectid)
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
    toMoney(num){
      num = num.toFixed(2);
      num = parseFloat(num)
      num = num.toLocaleString();
      return num;//返回的是字符串23,245.12保留2位小数
    },
    search(){
      this.data.pagenum = 1
      this.data.category = this.CatetoryValue.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)
    },
    getData(){
        this.data.category = this.CatetoryValue.join(','),
        this.allProjects(this.data)
        // this.search()
    },
    handledel(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteShareto({ids:row.agencyprojectid}).then(res=>{
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: this.rs.info_msg_delete_success
            });
            this.getData()
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      });
    },
    //所有楼盘信息
    allProjects(projectList){
      getSharedProjects(projectList).then(res=>{
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
    goRouter(name,row) {
      sessionStorage.setItem('ProjectList',JSON.stringify(row))
      sessionStorage.setItem('isFullEdit',row.isfulledit);
      sessionStorage.setItem('shareable',row.shareable);
      this.$router.push({path:name});
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
  },
    computed: {
    ...mapGetters(['rs','se','languagetype','control']),
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
      this.getOptionData('05','01')
      this.showtoagents = [
        {code:null, value:this.rs.all},
        {code:'1', value:this.rs.yes},
        {code:'0', value:this.rs.no}
      ];
      // this.getOptionData('03','03')
      this.data.category = this.CatetoryValue.join(','),
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allProjects(this.data)

    },
    se(){
        JSON.parse(localStorage.getItem('selectlist')).PROJECT_FEATURE_LIST.forEach(element => {
        this.Special[element.code] = element.value;
      });
      this.Special = Object.assign({}, this.Special)
      JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST.forEach(val => {
          this.categoryObj[val.code] = val.value
        });
        this.categoryObj = Object.assign({}, this.categoryObj)
    }
  }
}
</script>
<style scoped>
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
</style>