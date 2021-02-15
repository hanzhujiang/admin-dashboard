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
                <img src="../../../assets/imgs/page/attachments_1.png" alt=""><span>{{rs.wechat_article_links}}</span>
              </div>
              <div class="tools">
                <span @click="handleAdd(true)" class="btn_text"  v-if="!readonly">
                  <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                  <span>{{rs.add_new_article}}</span>
                </span>
              </div>
            </div>
            <div class="box-body">
              <div class="table_box">
                <el-row :gutter="25">
                  <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="(d,i) in articleList" :key="i">
                    <div class="card_box">
                      <div class="info_area">
                        <div class="title_b0x">
                          <p class="title">{{d.title}}</p>
                          <span v-if="!readonly" class="icon-right" @click="handleDelete(d)" style="padding-right:30px;">
                            <img class="icon" src="@/assets/imgs/common/common_8.png" alt="">
                            </span>
                          <span class="icon-right" @click="handleEdit(d)"><img class="icon" src="@/assets/imgs/common/common_7.png" alt="">  </span>
                        </div>
                        <p class="discription">{{d.description}}</p>
                      </div>
                      <div class="pic_area">
                        <img :src="d.thumburl" alt=""  v-if="d.thumburl">
                        <img src="../../../assets/imgs/no_images.png" alt=""  v-else>
                      </div>
                    </div>
                  </el-col>
                </el-row>  
              </div>
            </div>
          </div>
        </el-col>
      </el-row>  
      <!--  -->
      <!-- <el-row :gutter="20">
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
                        :on-success="LightImg"
                        :on-progress="progress"
                        accept="image/gif,image/bmp,image/jpeg,image/png"
                        :before-upload="beforeAvatarUpload">
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
      </el-row> -->
    </div>



    <el-dialog
    :close-on-click-modal='false'
      :title="rs.article"
      :visible.sync="dialogShow"
      width='60%'
      >
      <template slot="title">
        <!-- <div class="dialog-header">
          <i class="fa fa-link"></i>
          <span class="sub-title">{{rs.article}}
            <span class="small" v-if="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
          </span>
        </div> -->
        <div class="dialog-header">
          <span class="title">{{rs.article}}
            <span v-if="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10" class="">
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="form-group">
                  <div class="sub-title-first">{{rs.title}} <span class="required">*</span></div>
                  <div class="content">
                    <el-input maxlength="200" v-model="formDataShow.title" :disabled="readonly" clearable size="small"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="form-group">
                  <div class="sub-title">{{rs.description}}<span class="required">*</span></div>
                  <div class="content">
                    <el-input type="textarea" :disabled="readonly" v-model="formDataShow.description" rows=6 clearable maxlength="500" size="small"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="form-group">
              <div class="sub-title-first">{{rs.thumb_picture}}</div>
              <div class="content">
                <el-upload
                class="avatar-uploader"
                :action='actionUrl'
                :show-file-list="false"
                :disabled="readonly"
                :data="{'projectid':projectId}"
                :on-success="LightImg1"
                :on-progress="progress"
                accept="image/gif,image/bmp,image/jpeg,image/png"
                :before-upload="beforeAvatarUpload">
                <img v-if="formDataShow.thumburl" :src="formDataShow.thumburl" style="width:100%;height:160px" class="avatar">
                <img src="../../../assets/imgs/no_images.png" alt="" style="width:100%;height:160px"  v-else-if="!isUpdate">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="">
          <el-col :span="24">
            <div class="form-group">
              <div class="sub-title">{{rs.article_link}} <span class="required">*</span></div>
              <div class="content">
                <el-input maxlength="500" v-model="formDataShow.webpageurl" :disabled="readonly" clearable size="small"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   class="small" style="color:#000;" @click="handleClose" v-if="!readonly">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="handleSave" v-if="!readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { validator, allvalidator} from '@/validator/validator.js'
import { Message } from 'element-ui'
import { getProjectLogo ,insertProjectLogo, getProjectArticle, insertProjectArticle, updateProjectArticle, deleteProjectArticle} from '@/api/projectApi.js'
import { mapGetters } from "vuex";
import axios from 'axios'


export default{
  data() {
    return {
      isFullEdit:'0',
      activeNames: ['1','2'], //折叠面板
      articleList: [],
      projectLogoList:[],
      dialogShow:false,
      formData:{
        title:'',
        description:'',
        thumburl:'',
        webpageurl:'',
        projectid:''

      },
      formDataShow:{},
      getData:{
        projectid:''
      },
      actionUrl1:'',
      actionUrl:'',
      isUpdate:true,
      logoimagelight:{},
      projectId:'',
      photo:'',
      project_name:''
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'navigation':resolve=> require(['../edit_project/template/navigation.vue'],resolve),
    },
  methods:{
    handleEdit(d) {
      this.isUpdate = false;
      this.dialogShow = true;
      let str  = JSON.stringify(d);
      this.formDataShow = JSON.parse(str);
    },
    handleAdd(){
      this.dialogShow = true;
      this.formDataShow ={};
      this.isUpdate = true;
    },
    LightImg(res, file, fileList){
      let data = {themecode:res.code,referid:this.projectId,refertype:'1',logourl:res.path};
      this.logoimagelight[res.code] = res.path;
      this.logoimagelight = Object.assign({}, this.logoimagelight);
      insertProjectLogo(data).then(res =>{
        if(res.data.success){
        }
      })
    },
    LightImg1(res, file){
      this.formDataShow.thumburl = res.path;
      this.formDataShow = Object.assign({}, this.formDataShow);

    },
    progress(){

    },
    beforeAvatarUpload(file){
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
    handleSave(){
      this.formData = this.formDataShow;
      this.formData.projectid = this.projectId;
      if(this.isUpdate){
        insertProjectArticle(this.formData).then(res =>{
          if(res.data.success){
            this.dialogShow = false;
            this.getProjectArticleList(this.getData);
            this.$message.success(this.rs.info_msg_insert_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        updateProjectArticle(this.formData).then(res =>{
          if(res.data.success){
            this.dialogShow = false;
            this.getProjectArticleList(this.getData);
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
      
    },
    handleDelete(d){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
         deleteProjectArticle({ids:d.articleid}).then(res =>{
          if(res.data.success){
              this.getProjectArticleList(this.getData);
              this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    },
    handleClose(){
      this.dialogShow = false;
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    getProjectArticleList(data){
      getProjectArticle(data).then(res =>{
        if(res.data.success){
          this.articleList = res.data.data;
        }
      })
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
  },
  created(){
    this.isFullEdit = sessionStorage.getItem('isFullEdit');
    // logo/uploadFile
    this.actionUrl = axios.defaults.baseURL+'projectArticle/uploadFile';//图片上传地址 微信文章图片上传
    this.actionUrl1 = axios.defaults.baseURL+'logo/uploadFile';//图片上传地址 Logo 上传
    this.getName()
    // PROJECT_LOGO_LIST
    this.projectLogoList = JSON.parse(localStorage.getItem('selectlist')).PROJECT_LOGO_LIST;
    this.projectId =this.$router.currentRoute.params.id;
    this.getData.projectid = this.$router.currentRoute.params.id;
    this.getProjectLogoList({referid:this.projectId})
    this.getProjectArticleList(this.getData)
  },
  watch:{
    languagetype(){
     this.getName()
    }
  },
  computed: {
    ...mapGetters(['rs','languagetype','control']),
    readonly(){
      if(this.control.project_detail ==='02' || this.isFullEdit === '0'){
        return true
      }else{
        return false
      }
    },
  },
}

</script>

<style scoped>
.card_box{
  background: #f7f7f7;
  height: 155px;
  margin: 10px 0px;
  position: relative;
  padding: 5px 10px 5px 10px;
}
.pic_area {
  padding-top: 25px;
  height: 125px;
  width: 30%;
  line-height: 105px;
  float: right;
}
.pic_area > img {
  height: 115px;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
}

.info_area{
  padding: 6px;
  width: 65%;
  float: left;
}
.info_area p.title {
  color: #3c8dbc;
  font-size: 15px;
  font-weight: bold;
  width:100%;
  word-break:break-all;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.info_area p.discription{
  padding-top: 5px;
  width:100%;
  word-break:break-all;
  display:-webkit-box;
  -webkit-line-clamp:10;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.info_area span.icon-right{
  position: absolute;
  right: 20px;
  top: 10px;
}
.title_b0x{
  text-align: center;
}
</style>

