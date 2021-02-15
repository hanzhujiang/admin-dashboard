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
                <img src="../../../assets/imgs/page/pictures_1.png" alt="">
                <span>{{rs.pictures}}</span>
              </div>
            </div>
            <div class="box-body">
              <div class="upload_box">
                <el-row :gutter="10" v-if="!readonly" style="margin-bottom: 10px;">
                  <el-col :span="24">
                    <div class="upload_area" style="text-align: left;">
                      <el-upload
                      drag
                      :show-file-list="false"
                      :on-success="LightImg"
                      :before-upload="beforeAvatarUpload"
                      :on-progress="uploadVideoProcess"
                      :multiple="false"
                      accept="image/gif,image/bmp,image/jpeg,image/png,.mp4"
                      :action="actionUrl">
                        <i class="el-icon-upload" v-if="!videoFlag"></i>
                        <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                        <div class="el-upload__text"  v-if="!videoFlag">{{rs.drop_file_here_or_click}}</div>
                        <div class="el-upload__text"  v-if="!videoFlag">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png,.mp4</div>
                      </el-upload>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="24">
                    <div class="file_list_area">
                      <ul>
                        <!-- <li v-for="(d,i) in pictureList" :key="i" v-dragging="{ item: d, list: pictureList, group:d }"> -->
                        <li v-for="(d,i) in pictureList" :key="i">
                          <div class="handle fl">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span>{{i+1}}</span>
                            <el-popover
                              placement="left"
                              width="300"
                              trigger="click">
                              <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                              <template slot="reference"><span><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                              style=" vertical-align: middle;cursor: pointer;"/></span></template>
                            </el-popover>
                            <span >{{d.displayname}}</span>
                          </div>
                          <div class="fr">
                            <span class="btntext" @click="handleDelet(d)" v-if="!readonly">{{rs.delete}}</span>
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
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
              <div class="title">
                <img src="../../../assets/imgs/page/attendanceResults_5.png" alt=""><span>{{rs.edm_logo}}</span>
              </div>
            </div>
            <div class="box-body">
              <div class="table_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="(d,i) in projectLogoList" :key="i">
                    <div class="form-group">
                      <div class="sub-title">{{d.value}}</div>
                      <div class="content">
                        <el-upload
                        class="avatar-uploader"
                        :action='actionUrl1'
                        :disabled="readonly"
                        :show-file-list="false"
                        :data="{'code': d.code,'projectid':projectId}"
                        :on-success="LightImg1"
                        :on-progress="progress"
                        accept="image/gif,image/bmp,image/jpeg,image/png"
                        :before-upload="beforeAvatarUpload1">
                        <img v-if="logoimagelight[d.code]" :src="logoimagelight[d.code]" style="width:100%;height:140px" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
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

import { uptadePicture, insertEdm, getEdm,deleteEdm,getProjectLogo ,insertProjectLogo } from '@/api/projectApi.js'
import { mapGetters } from "vuex";
import axios from 'axios'
export default{
  data() {
    return {
      isFullEdit:'0',
      videoFlag:false,
      videoUploadPercent:0,
      actionUrl:'',
      pictureList:[],
      projectId:'',
      project_name:'',
      projectLogoList:[],
      actionUrl1:'',
      logoimagelight:{},
    }
  },
  components: {
    // 'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    // 'navigation':resolve=> require(['../edit_project/template/navigation.vue'],resolve),
  },
  methods:{
   
    updataImg(data){
        uptadePicture(data).then(res=>{
        if(res.data.success){
          this.getEdmList(this.projectId);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    LightImg(res, file) {
      // let  testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
      this.videoUploadPercent = 100;
      this.videoFlag = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      var fileData={
          displayname:file.name,
          filepath:file.response.path,
          // attachmenttype: "0",//文件类型
          // refertype:'0',
          // picturetype:picturetype,
          // displayorder:this.pictureList.length+1,
          referid:this.projectId,
          // isvideo:isvideo
        }
      insertEdm(fileData).then(res=>{
        if(res.data.success){
          this.getEdmList(this.projectId);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    LightImg1(res, file, fileList){
      let data = {themecode:res.code,referid:this.projectId,refertype:'1',logourl:res.path};
      this.logoimagelight[res.code] = res.path;
      this.logoimagelight = Object.assign({}, this.logoimagelight);
      insertProjectLogo(data).then(res =>{
        if(res.data.success){
        }
      })
    },
    beforeAvatarUpload1(file){
      const isBMP = file.type === 'image/bmp';
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isLt100M = file.size / 1024 / 1024 < 100;
      if(!isBMP && !isPNG && !isJPG && !isGIF){
        this.$message.error(this.rs.err_msg_image_type);
      }
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      return (isBMP || isJPG || isGIF || isPNG) && isLt100M;
    },
    getProjectLogoList(data){
      getProjectLogo(data).then(res => {
        if(res.data.success){
          res.data.data.forEach(ele => {
            this.logoimagelight[ele.themecode] = ele.logourl;
            this.logoimagelight = Object.assign({}, this.logoimagelight);
          });
        }
      })
    },
    progress(){

    },
    beforeAvatarUpload(file) {
      let  testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      if(this.pictureList.length >2){
        this.$message.error(this.rs.three_files);
        return false
      }
      const isBMP = file.type === 'image/bmp';
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isLt100M = file.size / 1024 / 1024 < 100;
      if(!isBMP && !isPNG && !isJPG && !isGIF){
        this.$message.error(this.rs.err_msg_image_type);
      }
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      return (isBMP || isJPG || isGIF || isPNG) && isLt100M;
    },
    // 上传进度
    uploadVideoProcess(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoFlag = true;
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    getEdmList(id){
      getEdm({referid:id}).then(res=>{
        if(res.data.success){
          this.pictureList = res.data.data;
          // this.pictureList.forEach(ele => {
          //   if(ele.isvideo == '1'){
          //     ele.path = ele.filepath + '?x-oss-process=video/snapshot,t_1000,m_fast'
          //   }else{
          //     ele.path = ele.filepath + '?x-oss-process=image/resize,m_fixed,h_30,w_60';
          //   }
          // })
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
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
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    handleDelet(d){//删除图片
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        deleteEdm({ids:d.edmid}).then(res=>{
          if(res.data.success){
            this.getEdmList(this.projectId);
            this.$message.success(this.rs.info_msg_delete_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    },

  },
  created(){
    this.isFullEdit = sessionStorage.getItem('isFullEdit');
    this.projectLogoList = JSON.parse(localStorage.getItem('selectlist')).PROJECT_LOGO_LIST;
    this.actionUrl1 = axios.defaults.baseURL+'logo/uploadFile';//图片上传地址 Logo 上传
    this.getEdmList(this.$router.currentRoute.params.id);
    this.projectId =this.$router.currentRoute.params.id;
    this.actionUrl =axios.defaults.baseURL+'edm/uploadFile?projectid='+this.projectId;
    // 获取语言资源表数据
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.getName()
    this.getProjectLogoList({referid:this.projectId})
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.project_detail ==='02' || this.isFullEdit === '0'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(){
      this.getName()
    },
    se(val){
      this.projectLogoList = val.PROJECT_LOGO_LIST;
    }
    
  },
  mounted () {
    // this.$dragging.$on('dragend', () => {
    //     var upArr=[];
    //   this.pictureList.forEach((element,index,key) => {
    //     if(element == undefined){
    //     }else{
    //         upArr.push({pictureid:element.pictureid,displayorder:index+1})
    //     }
    //   });
    //     this.updataImg({updisplayorder:JSON.stringify(upArr)});
    // })
  }
}
</script>
<style lang="scss" scoped>
.upload_box{
  background: #FFF;
  .upload_area{
    text-align: center;
  }

  .file_list_area {
    li {
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
      padding: 10px;
      border: 1px solid #EEE;
      margin-bottom: 2px;
      border-left: 2px solid #e6e7e8;
      color: #444;
      // cursor: move;
    }
    .handle>span{
      padding-left: 10px;
      padding-right: 10px;
    }
    .aslogo{
      background: red;
      color: #FFF;
      cursor: pointer;
      padding:5px;
      font-size:6px;
      font-weight:bold;
      border-radius:5px;
      box-shadow: 2px 2px 6px #000;
    }
    .nologo{
      background: #d2d6de;
      color: #444;
      cursor: pointer;
      padding:5px;
      font-size:6px;
      font-weight:bold;
      border-radius:5px;
      box-shadow: 2px 2px 6px #000;
    }
  }
}
.el-upload-dragger{
  width: 300px !important;
}
</style>
