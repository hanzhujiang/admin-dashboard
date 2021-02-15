<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.partner_firms}}</span>
        <span class="sub_text" v-if="isUpdate==undefined?false:true" v-show="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
      </div>
      <div class="tools">
       <el-button class="bg_save_btn"    v-if="!readonly" @click="handleSave" size="small">{{rs.save}}</el-button>
       <el-button class="bg_save_btn"    v-else disabled size="small">{{rs.save}}</el-button>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-content clearfix">
         <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix ">
                    <div class="title">
                      <img src="../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.base_information}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="form-group">
                        <div class="sub-title-first">{{rs.full_name}}<span class="required">*</span></div>
                        <div class="content">
                          <el-input v-model="formData.fullname" size="small" :disabled="readonly" clearable  @blur="validatorBlur('fullname')" maxlength="100"></el-input>
                          <p class="curtail" v-show="validatorSave.fullname.flg">{{rs[validatorSave.fullname.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                   <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="form-group">
                        <div class="sub-title">{{rs.short_name}} <span class="required">*</span></div>
                        <div class="content">
                          <el-input v-model="formData.shortname" clearable :disabled="readonly" size="small" maxlength="30"  @blur="validatorBlur('shortname')"></el-input>
                          <p class="curtail" v-show="validatorSave.shortname.flg">{{rs[validatorSave.shortname.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                     <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="form-group">
                            <div class="sub-title">{{rs.logo}}</div>
                            <div class="content">
                              <el-upload
                              class="avatar-uploader"
                              :action="actionUrl"
                              :disabled="readonly"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :on-progress="handleMinprogress"
                              accept="image/gif,image/bmp,image/jpeg,image/png"
                              :before-upload="beforeAvatarUpload">
                               <div v-if="formData.logo"  style="height: 100%;">
                                <div style=" width: 100%;height: 100%;overflow: hidden;">
                                  <div class="zoomImage" :style="{backgroundImage:'url('+formData.logo+')'}"></div>
                                </div>
                              </div>
                              <!-- <img v-if="this.formData.logo" :src="this.formData.logo" style="width:100%;height:160px" class="avatar"> -->
                              <img src="../../assets/imgs/no_images.png" alt="" style="width:100%;height:160px"  v-else-if="!isUpdate">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              </el-upload>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="form-group">
                            <div class="sub-title">Mini Logo</div>
                            <div class="content">
                              <el-upload
                              class="avatar-uploader"
                              :action="actionUrl"
                              :disabled="readonly"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess2"
                              :on-progress="handleMinprogress2"
                              accept="image/gif,image/bmp,image/jpeg,image/png"
                              :before-upload="beforeAvatarUpload2">
                              <div v-if="formData.logomini"  style="height: 100%;">
                                <div style=" width: 100%;height: 100%;overflow: hidden;">
                                  <div class="zoomImage" :style="{backgroundImage:'url('+formData.logomini+')'}"></div>
                                </div>
                              </div>
                              <!-- <img v-if="this.formData.logomini" :src="this.formData.logomini" style="width:100%;height:160px" class="avatar"> -->
                              <img src="../../assets/imgs/no_images.png" alt="" style="width:100%;height:160px"  v-else-if="!isUpdate">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              </el-upload>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                      <div class="form-group">
                        <div class="sub-title">{{rs.office_telephone}}</div>
                        <div class="content">
                          <el-input v-model="formData.officetelephone" size="small" :disabled="readonly" clearable maxlength="20" @blur="validatorBlur('officetelephone')" ></el-input>
                          <p class="curtail" v-show="validatorSave.officetelephone.flg">{{rs[validatorSave.officetelephone.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                      <div class="form-group">
                        <div class="sub-title">{{rs.office_fax}}</div>
                        <div class="content">
                          <el-input v-model="formData.officefax" maxlength="20" :disabled="readonly" clearable size="small" @blur="validatorBlur('officefax')"></el-input>
                          <p class="curtail" v-show="validatorSave.officefax.flg">{{rs[validatorSave.officefax.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="form-group">
                        <div class="sub-title">{{rs.email}}</div>
                        <div class="content">
                          <el-input v-model="formData.email" maxlength="100" :disabled="readonly" clearable size="small" ></el-input>
                          <!-- <p class="curtail" v-show="validatorSave.email.flg">{{rs[validatorSave.email.msg]}}</p> -->
                        </div>
                      </div>
                    </el-col>
                  </el-row> 
                </div>
              </el-collapse-item>
            </el-collapse>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <el-collapse v-model="activeNames" class="box" >
                <el-collapse-item name="2">
                  <template slot="title">
                    <div class="box-header-with-collapse clearfix ">
                      <div class="title">
                        <img src="../../assets/imgs/page/attendanceResults_2.png" alt=""><span>{{rs.address}}</span>
                      </div>
                    </div>
                  </template>
                  <div class="box-body">
                    <address-area :formData="formData" :validatorSave='validatorSave' :lableLine2="rs.po_box" :readonly="readonly"></address-area>
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

import { insertBrokerFirm, updateBrokerFirm, getBrokerFirm, deleteBrokerFirm } from '@/api/partnerApi.js'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import { Message } from 'element-ui'
import axios from 'axios'

export default{
  data() {
    return {
      actionUrl:'',
      activeNames:['1','2'], //折叠面板
    isUpdate:true,//区分新增和更新按钮
    formData:{
      agencyid:'',
      fullname:'',
      shortname:'',
      officetelephone:'',
      officefax:'',
      addressline:'',
      addressline2:'',
      state:'',
      suburb:'',
      postcode:'',
      dxnumber:'',
      country:'',
      logo:'',
      logomini:''
    },
    validatorSave:{
        fullname:{
          vaid:['noNull'],
          flg:false
        },
        shortname:{
          vaid:['noNull'],
          flg:false
        },
        officetelephone:{
          vaid:['phoneNumber'],
          flg:false
        },
        officefax:{
          vaid:['phoneNumber'],
          flg:false
        },
        postcode:{
          vaid:['Number'],
          flg:false
        },
      },
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
  
     handleAvatarSuccess(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.formData.logo = file.response.path;
    },
    beforeAvatarUpload(file) {
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
    handleMinprogress(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
      handleAvatarSuccess2(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.formData.logomini = file.response.path;
    },
    beforeAvatarUpload2(file) {
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
    handleMinprogress2(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    getBrokerFirmData(data) {
      getBrokerFirm({firmid:data.firmid}).then(res=>{
        if(res.data.success){
          if(res.data.data.length !=0){
            this.formData  =  res.data.data[0]
          }
        }else{this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});}
      })
    },
   
    handleSave(){
      // 保存
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      if(this.isUpdate){
        insertBrokerFirm(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_insert_success)
            this.$router.push({path:'/master_manage/partnerFirms'})
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        updateBrokerFirm(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            this.$router.push({path:'/master_manage/partnerFirms'})
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    }
  },
  created(){
    this.actionUrl =axios.defaults.baseURL+'partnerfirm/uploadFile';
     if(this.$route.params.id == 'save'){
      this.isUpdate= true;//给保存按钮识别是新增还是修改
    }
    if(this.$route.params.id == 'update'){
        this.isUpdate = false;//给保存按钮识别是新增还是修改
        this.getBrokerFirmData({firmid:this.$router.currentRoute.query.id});
    }
  },
  watch:{
   
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
      readonly(){
        if(this.control.partner_firm ==='02'){
          return true
        }else{
          return false
        }
    }
  },
}
</script>
