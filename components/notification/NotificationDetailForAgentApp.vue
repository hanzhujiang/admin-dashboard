<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <form autocomplete="on">
    <div class="wrapper-header">
      <div class="title">
        <span >{{rs.notification_detail_agent_app}}</span>
      </div>
      <div class="tools">
        <el-button class="medium bg_blue"   @click="handleSave" v-if="!readonly">{{rs.send}}</el-button>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.notification_information}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="10">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="sub-title-first">{{rs.title}} <span class="required">*</span></div>
                      <div class="content">
                        <el-input v-model="formData.title" clearable size="small" maxlength="200" @blur="validatorBlur('title')">
                        </el-input>
                        <p class="curtail" v-show="validatorSave.title.flg">{{rs[validatorSave.title.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="form-group">
                      <div class="sub-title">{{rs.notify_date}}</div>
                      <div class="content">
                        <el-date-picker
                          size="mini"
                          v-model="day"
                          :disabled="readonly||formData.ispushed == '1'?true:false"
                          type="date"
                          placeholder=""
                          :picker-options="pickerOptions0">
                        </el-date-picker>
                      </div>
                      <p class="curtail" v-show="hintShow">{{rs.err_msg_date_compare}}</p>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="form-group">
                      <div class="sub-title">{{rs.notify_time}}</div>
                      <div class="content">
                        <el-time-select
                          size="mini"
                          :disabled="readonly||formData.ispushed == '1'?true:false"
                          v-model="time"
                          :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '23:30'
                          }"
                          placeholder="">
                        </el-time-select>
                      </div>
                      <p class="curtail" v-show="hintShow">{{rs.err_msg_date_compare}}</p>
                    </div>
                  </el-col>
                </el-row>
                <!-- -------------------------- -->
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="form-group">
                      <div class="sub-title">{{rs.deadline_date}}</div>
                      <div class="content">
                        <el-date-picker
                          size="mini"
                          v-model="asofDay"
                          type="date"
                          placeholder=""
                          :picker-options="pickerOptions0">
                        </el-date-picker>
                        <p class="curtail" v-show="hintShow">{{rs.err_msg_date_compare}}</p>
                        <!--  -->
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="form-group">
                      <div class="sub-title">{{rs.deadline_time}}</div>
                      <div class="content">
                        <el-time-select
                          size="mini"
                          v-model="asofTime"
                          :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '23:30'
                          }"
                          placeholder="">
                        </el-time-select>
                        <p class="curtail" v-show="hintShow">{{rs.err_msg_date_compare}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="form-group">
                      <div class="sub-title">{{rs.content}}</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="form-group">
                      <div class="content" style="margin-top: 20px;">
                        <el-checkbox
                        :label="rs.send_immediately"
                        :disabled="readonly"
                        v-model="formData.ispushed" size="small"
                        true-label='1' false-label='0'></el-checkbox>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="content" >
                      <el-input
                        type="textarea"
                        maxlength="500"
                        :autosize="{ minRows: 2, maxRows: 8}"
                        placeholder=""
                        v-model="formData.contents">
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
                <el-collapse-item name="3">
                  <template slot="title">
                    <div class="box-header-with-collapse clearfix">
                      <div class="title">
                        <img src="../../assets/imgs/page/attachments_1.png" alt=""><span>{{rs.attachment}}</span>
                      </div>
                    </div>
                  </template>
                  <div class="box-body">
                    <div class="upload_box">
                      <el-row >
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="upload_area">
                            <el-upload
                              drag
                              :show-file-list="false"
                              :on-success="LightImgPictures"
                              :before-upload="beforeAvatarUploadPictures"
                              :on-progress="uploadVideoProcessPictures"
                              :multiple="true"
                              :action="actionUrl1" >
                              <i class="el-icon-upload" v-if="!videoFlagPictures"></i>
                              <el-progress v-if="videoFlagPictures" type="circle" :percentage="videoUploadPercentPictures" style="margin-top:30px;"></el-progress>
                              <div class="el-upload__text" v-if="!videoFlagPictures">{{rs.drop_file_here_or_click}}</div>
                              <div class="el-upload__text" v-if="!videoFlagPictures">{{rs.only_accept}}.gif,.bmp,.jpg,.jpeg,.png,</div>
                              <div class="el-upload__text" v-if="!videoFlagPictures">.pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                            </el-upload>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="file_list_area">
                            <ul>
                              <li v-for="(d,i) in pictureList" :key="i"
                                v-dragging="{ item: d, list: pictureList, group: 'color' }">
                                <el-row>
                                  <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
                                    <span>
                                      <i class="fa fa-bars"></i>
                                    </span>
                                    <span >{{i+1}}</span>

                                  </el-col>
                                  <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
                                    <el-input  size='mini' v-model="pictureList[i].displayname"></el-input>
                                  </el-col>
                                  <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3" :offset='1'>
                                      <el-button   class="small bg_red" size="mini" @click="handleDelete(d,pictureList)">
                                      <span style="color:#FFF">{{rs.delete}}</span></el-button>
                                  </el-col>
                                </el-row>
                              </li>
                            </ul>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-col>
          </el-row>
        </el-col>
        <!-- notificationDetailForAgentApp -->
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="2">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/page/notificationDetailForAgentApp_1.png" alt=""><span>{{rs.add_department}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-tabs type="border-card"  @tab-click="handleClick" v-model="activeName">
                  <el-tab-pane :label="rs.all_agents" name='0'>
                    <template slot="label">
                      <el-radio v-model="formData.targettype" label="0">{{rs.all_agents}}</el-radio>
                    </template>
                    <el-checkbox
                      :label="rs.all_agents"
                      :disabled="readonly"
                      v-model="formData.targettype" size="small"
                      true-label='0' false-label='1'></el-checkbox>
                  </el-tab-pane>
                  <el-tab-pane :label="rs.some_department_or_team" name='1'>
                    <template slot="label">
                      <el-radio v-model="formData.targettype" label="1">{{rs.some_department_or_team}}</el-radio>
                    </template>
                    <el-row :gutter="30" style="text-align:left">
                      <el-table
                        style="padding:0 10px"
                        ref="someDepartment"
                        :data="departList"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                        <el-table-column
                          label="Department">
                          <template slot-scope="scope">{{ scope.row.fullname }} </template>

                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="name">
                          <template slot-scope="scope">{{agentListStr(scope.row.agentlist)}}</template>
                        </el-table-column>
                      </el-table>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane :label="rs.some_agent" name='2'>
                    <template slot="label">
                      <el-radio v-model="formData.targettype" label="2">{{rs.some_agent}}</el-radio>
                    </template>
                    <el-row>
                      <div class="filter-search fr" style="width:50%" >
                        <el-input :placeholder="rs.search_agents"
                          v-model="getAgentData.condition" class="input-key" clearable size='mini' @change="search" @keyup.enter='search'>
                          <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                      </div>
                    </el-row>
                    <el-row :gutter="30" style="text-align:left">
                      <el-table
                        style="padding:0 10px"
                        ref="someAgent"
                        :data="AgentList"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                          <template></template>
                        </el-table-column>
                        <el-table-column
                          :label="rs.department">
                          <template slot-scope="scope">{{ scope.row.fullname }}</template>
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          :label="rs.agent_name">
                          <template slot-scope="scope">{{ scope.row.firstname}}&nbsp;{{scope.row.lastname}}</template>
                        </el-table-column>
                      </el-table>
                    </el-row>
                    <el-row class="dailog-footer" style="margin-top:5px" v-if="agentTotal">
                      <el-pagination
                        :background="false"
                        @size-change="handleSizeChangeAgent"
                        @current-change="handleCurrentChangeAgent"
                        :current-page="getAgentData.pagenum"
                        layout="prev, pager, next"
                        :page-size="getAgentData.pagesize"
                        :total="agentTotal" class="fr">
                      </el-pagination>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
    </form>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { DatePicker, Message } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import {formatDate , newDate} from '@/assets/js/time.js'; //时间转换插件
// 设置语言
locale.use(lang)
Vue.component(DatePicker)
import { getNotificationList, updateNotification, insertNotification } from '@/api/notificationApi.js'
import { getAgentList } from '@/api/agentApi.js'
import { getDepartmentListWithMgr } from '@/api/departmentApi.js'
import { validator, allvalidator } from '@/validator/validator.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      hintShow:false,
      pictureList:[],
      fileList:[],
      actionUrl1:'',
      videoFlagPictures:false,
      pickerOptions0: {
        disabledDate(time) {
        return time.getTime() < Date.now() - 8.64e7;  //控制日期组件不能选择当天以前的
        }
      },
      echoId:[],
      isUpdate:true,
      notificationid:'',
      radio:'',
      destinationlist:[],
      activeName:'0',//tabs
      getAgentData:{
        languagetype: '',
        pagenum:1,
        pagesize:10,
        isactived:'1',
        condition:''
      },
      AgentList:[],
      agentTotal:'',
      departList:[],

      activeNames:['1','2','3'], //折叠面板
      value1:'',
      idsList:[],
      formData:{
        title:'',
        targettype:'0',
        duepushdatetime:'',
        ispushed:'0',
        deadline:'',
        ids:'',

      },
      day:null,
      time:null,
      asofDay:null,
      asofTime:null,
      validatorSave:{
        title:{
          vaid:['noNull'],
          flg:false
        },
     
      },
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
  },
  created(){
    this.actionUrl1 = axios.defaults.baseURL+'notification/uploadFile';//图片上传地址
    if(this.$route.params.id == 'save'){
      this.isUpdate= true;//给保存按钮识别是新增还是修改
      getAgentList(this.getAgentData).then(res=>{
        if(res.data.success){
          this.AgentList = res.data.data;
          this.agentTotal = res.data.total;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
      // depart/getData
      getDepartmentListWithMgr().then(res=>{
        if (res.data.success) {
        this.departList = res.data.data;
        } else {
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
    if(this.$route.params.id == 'update'){
      this.getAgent(this.getAgentData)
      this.echo()
      this.isUpdate = false;//给保存按钮识别是新增还是修改
      // this.getData.languagetype=localStorage.getItem('languagetype')
    }
  },
  mounted(){
    this.$dragging.$on('dragend', () => {

      this.fileList.forEach((element,index,key) => {
        if(element == undefined){

        }else{
          element.displayorder = index+1
        }
      });
    })
  },
  methods:{
    handleDelete(d,Data){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        Data.forEach(element => {
          if(d == element){
            Data.remove(element)
          }
        });
      }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
    },
    
    LightImgPictures(res,file){
      this.videoUploadPercentPictures = 100;
      this.videoFlagPictures = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      let fileData={
          displayname:file.name,
          filepath:file.response.path,
          attachmenttype: "01",//文件类型
          refertype:'5',
          displayorder:this.pictureList.length+1,
      }
      if(this.pictureList.length<10){
        this.pictureList.push(fileData)
      }else{
        this.$message.error('最多上传10个文件');
      }
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
    beforeAvatarUploadPictures(file){
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isBMP = file.type === 'image/bmp';
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
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
      if(!isBMP && !isPNG && !isJPG && !isGIF && !isPdf && !isdoc && !isdocx && !iszip && !israr && !isxls && !isxlsx){
        this.$message.error(this.rs.err_msg_file_type);
      }
      return  (isBMP || isJPG || isGIF || isPNG || isPdf || isdoc || isdocx || iszip || israr || isxls || isxlsx)&&isLt100M;
    },
    uploadVideoProcessPictures(event, file, fileList){
      this.videoFlagPictures = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercentPictures = parseInt(file.percentage.toFixed(0));
    },
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },

    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {

        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    handleClick(tab, event){
        this.formData.targettype = tab.name;
        this.radio = tab.name;
    },
    getAgent(data){
      getAgentList(data).then(res=>{
        if(res.data.success){
          this.AgentList = res.data.data;
          this.agentTotal = res.data.total
          this.formData.destinationlist.forEach(val => {
          this.echoId.push(val.id)
          });
          let Arrlist=[]
          this.AgentList.forEach((val,i) => {
            this.echoId.forEach((element) => {
            if(element == val.agentid){
              Arrlist.push(val)
            }
            });
          });
          this.$nextTick(function(){
            Arrlist.forEach(row => {
            this.$refs.someAgent.toggleRowSelection(row);
            });
          })
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getDepart(){
      getDepartmentListWithMgr().then(res=>{
        if (res.data.success) {

          this.departList = res.data.data;
          this.formData.destinationlist.forEach(val => {
              this.echoId.push(val.id)
            });
          let Arrlist=[]
          this.departList.forEach((val,i) => {
            this.echoId.forEach((element) => {
              if(element == val.departmentid){
                Arrlist.push(val)
              }
            });
          });
          this.$nextTick(function(){
            Arrlist.forEach(row => {
              this.$refs.someDepartment.toggleRowSelection(row);
            });
          })
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }

      })
    },
    handleSave(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      if (this.formData.ispushed!=0) {
        this.formData.duepushdatetime = ''
      }else{
        if (this.time != null && this.day != null || this.formData.ispushed==1) {
          let date = formatDate(new Date(this.day.getTime()),"yyyy-MM-dd")+" "+ this.time
          this.formData.duepushdatetime = formatDate(new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000),"yyyy-MM-dd hh:mm:ss");
        }
      }
      if (this.asofTime != null && this.asofDay != null) {
        let asofDate = formatDate(new Date(this.asofDay.getTime()),"yyyy-MM-dd")+" "+ this.asofTime
        this.formData.deadline = formatDate(new Date(new Date(asofDate).getTime() + new Date().getTimezoneOffset() * 60000),"yyyy-MM-dd hh:mm:ss");
      }else{
        this.formData.deadline = null
      }
      if (this.time != null && this.day != null && this.asofTime != null && this.asofDay != null) {
        
        if (new Date(this.formData.deadline).getTime()<new Date(this.formData.duepushdatetime).getTime()) {
          this.hintShow = true
          return
        }
      }
      this.formData.attachmentlist = JSON.stringify(this.pictureList)
      this.formData.ids = JSON.stringify(this.idsList);
      if(this.isUpdate){
        insertNotification(this.formData).then(res=>{
          if (res.data.success) {
          this.$message.success(this.rs.info_msg_insert_success)
          this.$router.push('/notification/allNotificationsForAgentApp')
          } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }

        })
      }else{
        updateNotification(this.formData).then(res=>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_insert_success)
          this.$router.push('/notification/allNotificationsForAgentApp')
          } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    toDate(date){
      let times = formatDate( newDate(date),'yyyy-MM-dd hh:mm')
      times  = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
      return times
    },
    toTime(time) {
      
       let times = formatDate( newDate(time),'yyyy-MM-dd hh:mm')
          times = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
          times = formatDate( new Date(times),'hh:mm')
      return times;
    },
    echo(){
      getNotificationList({notificationid:this.$router.currentRoute.query.id,languagetype:localStorage.getItem('languagetype')}).then(res=>{
        if(res.data.success){
          this.pictureList = res.data.attachmentlist
          this.day = this.toDate(res.data.data[0].duepushdatetime)
          this.time = this.toTime(res.data.data[0].duepushdatetime)
          if (res.data.data[0].deadline != null ) {
            this.asofDay = this.toDate(res.data.data[0].deadline)
            this.asofTime = this.toTime(res.data.data[0].deadline)
          }

          this.formData = res.data.data[0];
          this.activeName =this.formData.targettype;
          this.radio =this.formData.targettype;
          this.getDepart()
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
      if(sessionStorage.getItem('notificationid')){
        this.notificationid = sessionStorage.getItem('notificationid');
      }else{
        this.notificationid =this.$router.currentRoute.query.id;
        sessionStorage.setItem('notificationid',this.$router.currentRoute.query.id)
      }
    },
    agentListStr(list){
      let strArr =[];
      list.forEach(element => {
        strArr.push(element.firstname +'   '+ element.lastname)
      });
      return strArr.join(',')
    },
    handleSelectionChange(val) {
      this.idsList=[];
      if(this.formData.targettype =='1'){
        val.forEach(element => {
          this.idsList.push(element.departmentid)
        });
      }
      if(this.formData.targettype =='2'){
        val.forEach(element => {
          this.idsList.push(element.agentid)
        });
      }
    },
    // 分页 Agent
    handleSizeChangeAgent(val){
      this.getAgentData.pagesize = val;
      this.getAgent(this.getAgentData)
    },
    handleCurrentChangeAgent(val){
      this.getAgentData.pagenum = val;
      this.getAgent(this.getAgentData)
    },
    search(){
      this.getAgentData.pagenum =1;
      this.getAgent(this.getAgentData)
    },
    getNotification({}){

    },
    toggleSelection(rows,refsTable) {
      if (rows) {
        rows.forEach(row => {

          this.$refs[refsTable].toggleRowSelection(row);
        });
      } else {
        this.$refs[refsTable].clearSelection();
      }
    }
  },

  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.notification_agent ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    se(val){},
    AgentList(){
      if (this.formData.destinationlist!=undefined) {
        this.formData.destinationlist.forEach(val => {

        this.echoId.push(val.id)
        });
        let Arrlist=[]
        this.AgentList.forEach((val,i) => {

        this.echoId.forEach((element) => {
          if(element == val.agentid){
          Arrlist.push(val)
          }
        });
        });
        this.$nextTick(function(){
        Arrlist.forEach(row => {
          this.$refs.someAgent.toggleRowSelection(row);
        });
        })
      }

    },
    departList(){

      if (this.formData.destinationlist!=undefined) {
        this.formData.destinationlist.forEach(val => {
        this.echoId.push(val.id)
          });
          let Arrlist=[]
          this.departList.forEach((val,i) => {
            this.echoId.forEach((element) => {
            if(element == val.departmentid){
              Arrlist.push(val)
            }
            });
          });
        this.$nextTick(function(){
        Arrlist.forEach(row => {
          this.$refs.someDepartment.toggleRowSelection(row);
        });
        })
      }

    }
  },
}
</script>

