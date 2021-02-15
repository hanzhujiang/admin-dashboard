<template>
  <div class="wrapper clearfix">
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.project_detail}} - {{project_name}}</span>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <img src="../../../assets/imgs/page/attachments_1.png" alt="">
                <span>{{rs.project_attachment}}</span>
              </div>
            </div>
            <div class="box-body">
              <div class="upload_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="attention_info">
                        <p class="title">
                          {{rs.attention_title}}
                        </p>
                        <p class="content">
                          {{rs.attention_info}}
                        </p>
                      </div>
                    <div class="upload_area" v-if="!readonly">
                      <el-upload
                        class="upload-demo"
                        drag
                        :show-file-list="false"
                        :on-success="onSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-progress="uploadVideoProcess"
                        :multiple="true"
                        :action="actionUrl">
                        <i class="el-icon-upload" v-if="!videoFlag"></i>
                        <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                        <div class="el-upload__text"  v-if="!videoFlag">{{rs.drop_file_here_or_click}}</div>
                        <div class="el-upload__text"  v-if="!videoFlag">{{rs.only_accept}} .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx,.jpeg,.jpg</div>
                      </el-upload>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="file_list_area">
                      <ul v-if="!readonly">
                        <li v-for="(d,i) in attachmentList" :key="i"
                          v-dragging="{ item: d, list: attachmentList, group: 'color' }">
                          <div class="fl handle">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span>{{i+1}}</span>
                            <el-select v-model="attachmentObj[d.attachmentid]" placeholder=" " size="mini" @change="attachmentType(d,attachmentObj[d.attachmentid])" :disabled="readonly">
                              <el-option
                              v-for="item in attachmentSelect"
                              :key="item.code"
                              :label="item.value"
                              :value="item.code">
                              </el-option>
                            </el-select>
                            <span>{{d.displayname?d.displayname:' '}}</span>
                          </div>
                          <template >
                            <div class="fr">
                              <span class="btntext" @click="handleDelet(d)" v-if="!readonly">{{rs.delete}}</span>
                            </div>
                            <div class="fr">
                              <span class="btntext" @click="handleEdit(d)" v-if="!readonly">{{rs.edit}}</span>
                            </div>
                          </template>
                        </li>
                      </ul>
                      <ul v-else>
                        <li v-for="(d,i) in attachmentList" :key="i" style="cursor: default;">
                          <div class="fl handle">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span >{{i+1}}</span>
                            <span>{{getTypeName(attachmentObj[d.attachmentid])}}</span>
                            <span>{{d.displayname?d.displayname:' '}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="isPlatform!='1'">
        <el-col :span="24">
          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
              <div class="title">
                <img src="../../../assets/imgs/page/attachments_1.png" alt="">
                <span>{{rs.internal_attachment}}</span>
              </div>
            </div>
            <div class="help-line">{{rs.internal_attachment_help}}</div>
            <div class="box-body">
              <div class="upload_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="upload_area" v-if="!readonly2">
                      <el-upload
                        class="upload-demo"
                        drag
                        :show-file-list="false"
                        :on-success="onSuccess2"
                        :before-upload="beforeAvatarUpload"
                        :on-progress="uploadVideoProcess"
                        :multiple="true"
                        :action="actionUrl">
                        <i class="el-icon-upload" v-if="!videoFlag"></i>
                        <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                        <div class="el-upload__text"  v-if="!videoFlag">{{rs.drop_file_here_or_click}}</div>
                        <div class="el-upload__text"  v-if="!videoFlag">{{rs.only_accept}} .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx,.jpeg,.jpg</div>
                      </el-upload>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="file_list_area">
                      <ul v-if="!readonly2">
                        <li v-for="(d,i) in attachmentList2" :key="i"
                          v-dragging="{ item: d, list: attachmentList, group: 'color' }">
                          <div class="fl handle">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span >{{i+1}}</span>
                            <el-select v-model="attachmentObj2[d.attachmentid]" placeholder=" " size="mini" @change="attachmentType(d,attachmentObj2[d.attachmentid])" :disabled="readonly2">
                              <el-option
                              v-for="item in attachmentSelect"
                              :key="item.code"
                              :label="item.value"
                              :value="item.code">
                              </el-option>
                            </el-select>
                            <span>{{d.displayname?d.displayname:' '}}</span>
                          </div>
                          <template >
                            <div class="fr">
                              <span class="btntext" @click="handleDelet(d)" v-if="!readonly">{{rs.delete}}</span>
                            </div>
                            <div class="fr">
                              <span class="btntext" @click="handleEdit(d)" v-if="!readonly">{{rs.edit}}</span>
                            </div>
                          </template>
                        </li>
                      </ul>
                      <ul v-else>
                        <li v-for="(d,i) in attachmentList2" :key="i" style="cursor: default;">
                          <div class="fl handle">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span >{{i+1}}</span>
                            <span>{{getTypeName(attachmentObj2[d.attachmentid])}}</span>
                            <span>{{d.displayname?d.displayname:' '}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :close-on-click-modal='false'
        title=""
        :visible.sync="fileNameShow"
        width='50%'
        >
        <template slot="title">
          <div class="dialog-header">
            <span class="title">File Name</span>
          </div>
        </template>
        <div class="dialog-body">
          <div class="form-group">
            <!-- <div class="sub-title-first">{{rs.push_message}}</div> -->
            <div class="content">
              <el-input   v-model="filename"  clearable size="small" maxlength="100" ></el-input>
            </div>
          </div>
        </div>
        <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button   @click="fileNameShow = false" class="small" style="color:#000;">
                <!-- <i class="fa fa-close" ></i> -->
                {{rs.cancel}}</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fr">
                <el-button   class="small bg_blue" @click="handleFileNameSave">
                <!-- <i class="fa fa-save"></i> -->
                {{rs.save}}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { updateAttachment, insertAttachment, getAttachmentList, deleteAttachment } from '@/api/projectApi.js'
import { mapGetters } from "vuex";
import axios from 'axios'
export default{
  data() {
    return {
      isFullEdit:'0',
      isPlatform:'0',
      attachmentList:[],
      attachmentList2:[],
      videoFlag:false,
      videoUploadPercent:0,
      isattachmentid:'',
      projectId:'',
      actionUrl:'',
      value5:'',
      attachmentSelect:[],
      attachmentObj:{},
      attachmentObj2:{},
      project_name:'',
      fileNameShow:false,
      filename:''
    }
  },
  components: {
    // 'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    // 'navigation':resolve=> require(['../edit_project/template/navigation.vue'],resolve),
  },
  methods:{
    handleEdit(d){
      this.fileNameShow = true;
      this.filename = d.displayname;
      this.isattachmentid = d.attachmentid;
    },
    handleFileNameSave(){
      this.updateFile({attachmentid:this.isattachmentid,displayname:this.filename},true);
    },
    // 删除数据
    handleDelet(d){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        deleteAttachment({ids:d.attachmentid,path:d.filepath}).then(res=>{
          if(res.data.success){
            this.getAttachment(this.projectId);
            this.$message.success(this.rs.info_msg_delete_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    },
    // 更新文件
    updateFile(data,type){
      updateAttachment(data).then(res=>{
        if(res.data.success){
          if(type){
            this.fileNameShow = false;
            this.$message.success(this.rs.info_msg_update_success)
          }
          this.getAttachment(this.projectId);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 获取数据列表
    getAttachment(id){
      getAttachmentList({referid:id,refertype:'0'}).then(res=>{
        if(res.data.success){
          this.attachmentList = res.data.publiclist;
          res.data.publiclist.forEach(element => {
            this.attachmentObj[element.attachmentid] = element.attachmenttype
          });
          this.attachmentObj = Object.assign({},this.attachmentObj)

          this.attachmentList2 = res.data.internallist;
          res.data.internallist.forEach(element => {
            this.attachmentObj2[element.attachmentid] = element.attachmenttype
          });
          this.attachmentObj2 = Object.assign({},this.attachmentObj2)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },

    onSuccess(res, file) {
      this.uploadFile(res, file, '0');
    },

    onSuccess2(res, file) {
      this.uploadFile(res, file, '1');
    },

    // 上传图片成功时候
    uploadFile(res, file, isinternal) {
      this.videoUploadPercent = 100;
      this.videoFlag = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      let fileData={
          displayname:file.name,
          filepath:file.response.path,
          attachmenttype: "01",//文件类型
          refertype:'0',
          displayorder:this.attachmentList.length+1,
          referid:this.projectId,
          isinternal: isinternal
      }
      insertAttachment(fileData).then(res=>{
        if(res.data.success){
          this.getAttachment(this.projectId);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 上传进度
    uploadVideoProcess(event, file, fileList){
      this.videoFlag = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    // 上传图片前
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
      const isjpg = this.matchType(file.name,'jpg');
      const isjpeg = this.matchType(file.name,'jpeg');
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      if(!isPdf && !isdoc && !isdocx && !iszip && !israr && !isxls && !isxlsx && !isjpg && !isjpeg){
        this.$message.error(this.rs.err_msg_file_type);
      }
      return  (isPdf || isdoc || isdocx || iszip || israr || isxlsx || isxls || isjpg || isjpeg)&&isLt100M;
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
    attachmentType(d,type){
      this.updateFile({attachmentid:d.attachmentid,attachmenttype:type});
    },
    getName(){
      let text = ''
      JSON.parse(JSON.parse(sessionStorage.getItem('ProjectList')).shortname).forEach(ele => {
         if (ele.type=='00') {
          text = ele.content
        }
        if (ele.type==localStorage.getItem('languagetype')) {
          if (ele.content==''||ele.content==undefined) {
            this.project_name = text
          }else{
            this.project_name = ele.content 
          }
        }
      });
    },
    getTypeName(id) {
      let text = '';
      this.attachmentSelect.forEach(
        element => {
          if (element.code == id) {
            text = element.value;
          }
        }
      );
      return text;
    }
  },
  created(){
    this.isPlatform = sessionStorage.getItem('isPlatform');
    this.isFullEdit = sessionStorage.getItem('isFullEdit');
    // 初始化项目ID，获取列表
    this.projectId =this.$router.currentRoute.params.id;
    this.actionUrl =axios.defaults.baseURL+'project/uploadFile?falg=2&projectid='+this.projectId;
    this.getAttachment(this.$router.currentRoute.params.id);
    this.attachmentSelect = JSON.parse(localStorage.getItem('selectlist')).ATTACHMENT_TYPE_LIST;
    // 获取语言资源表数据
    this.getName()
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),

    readonly(){
      if(this.control.project_detail ==='02' || this.isFullEdit === '0'){
        return true
      }else{
        return false
      }
    },
    readonly2(){
      if(this.control.project_detail ==='02'){
        return true
      }else{
        return false
      }
    },
  },
  watch:{
    se(val){
      this.attachmentSelect = val.ATTACHMENT_TYPE_LIST;
    },
    languagetype(){
     this.getName()
    },
    fileNameShow(val){
      if(!val){
        this.filename = ''
      }
    }
  },
  mounted () {
    this.$dragging.$on('dragend', () => {
        var upArr=[];
      this.attachmentList.forEach((element,index,key) => {
        if(element == undefined){
        }else{
          upArr.push({attachmentid:element.attachmentid,displayorder:index+1})
        }
      });
      this.attachmentList2.forEach((element,index,key) => {
        if(element == undefined){
        }else{
          upArr.push({attachmentid:element.attachmentid,displayorder:index+1})
        }
      });
      this.updateFile({updisplayorder:JSON.stringify(upArr)});
    })
  }
}
</script>

<style scoped>
  .attention_info .title{
    font-weight: bold;
    font-size: 16px;
    padding-bottom:10px;
  }
  .attention_info .content{
    font-size: 14px;
    line-height: 18px;;
  }
  .attention_info {
    padding-bottom: 15px;
  }
.file_list_area li{
  height: 22px;
  line-height: 20px;
  border-radius: 2px;
  padding: 10px;
  border: 1px solid #EEE;
  margin-bottom: 2px;
  border-left: 2px solid #e6e7e8;
  color: #444;
  cursor: move;
}
                    
.file_list_area {
  margin-top: 15px;
}
.file_list_area .handle>span{
  padding-left: 5px;
  padding-right: 5px;
}
.floor_plate{
  background: #00a65a;
}
.attachment{
  background: #f56c6c ;
}
.floor_plate,.attachment,.default{
  color: white;
  padding:5px;
  font-size:6px;
  font-weight:bold;
  border-radius:5px;
}
.default{
  background: #d2d6de;
}
.upload_area{
  text-align: left;
}
.upload_box{
  background: #FFF;
}
</style>
