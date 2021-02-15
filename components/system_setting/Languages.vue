<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.language_manage}}</span>
      </div>
      <div class="tools">
        <span @click="dialogVisible('save')" class="btn_text" v-if="!readonly">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_language}}</span>
        </span>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-table
                  :data="languageList"
                  style="width: 100%"
                  :empty-text = rs.no_data
                  size="mini">
                  <template slot="empty">
                    {{rs.no_data}}
                  </template>
                  <el-table-column
                    prop="languageid"
                    :label="rs.language_id">
                  </el-table-column>
                  <el-table-column
                    prop="languagenameShow"
                    :label="rs.language_name">
                  </el-table-column>
                  <el-table-column
                    prop="languageculture"
                    :label="rs.culture">
                  </el-table-column>
                  <el-table-column
                    prop="countryflag"
                    :label="rs.flag">
                    <template slot-scope="scope">
                      <img :src="scope.row.countryflag" style="width: 40px;height:20px">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="isactived"
                    :label="rs.is_actived"  >
                    <template slot-scope="scope">
                      <span>{{scope.row.isactived == '1'?rs.yes:rs.no}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="displayorder"
                    :label="rs.display_order">
                  </el-table-column>
                  <el-table-column
                    :label="rs.action"
                    width="160px">
                    <template slot-scope="scope">
                      <span class="btntext" @click="updateRow(scope.row)"  v-if="!readonly">{{!readonly?rs.edit:rs.detail}}</span>
                      <span class="btntext" @click="deleteRow(scope.row.languageid)" v-if="!readonly">{{rs.delete}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      :close-on-click-modal='false'
      :title="rs.language"
      :visible.sync="dialogShow"
      width='50%'>
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.language}}
            <span>[{{saveUpdate?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <form autocomplete="on">
        <div class="dialog-body">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title-first">{{rs.language_id}}<span class="required">*</span></div>
                    <div class="content">
                      <el-input v-model="formData.languageid" :disabled="idVisible" size="small" maxlength="2" clearable @blur="validatorBlur('languageid')"></el-input>
                      <p class="curtail" v-show="validatorSave.languageid.flg">{{rs[validatorSave.languageid.msg]}}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title-first">{{rs.culture}}<span class="required">*</span></div>
                    <div class="content">
                      <el-input v-model="formData.languageculture" size="small" :disabled="readonly"  maxlength="10" clearable @blur="validatorBlur('languageculture')"></el-input>
                      <p class="curtail" v-show="validatorSave.languageculture.flg">{{rs[validatorSave.languageculture.msg]}}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="form-group">
                    <div class="sub-title">{{rs.display_order}}<span class="required">*</span></div>
                    <div class="content">
                      <el-input v-model="formData.displayorder" size="small" :disabled="readonly" maxlength="11" clearable @blur="validatorBlur('displayorder')" ></el-input>
                      <p class="curtail" v-show="validatorSave.displayorder.flg">{{rs[validatorSave.displayorder.msg]}}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="form-group">
                <div class="sub-title-first">{{rs.flag}}</div>
                <div class="content">
                  <el-upload
                    class="avatar-uploader"
                    :action="actionUrl"
                    :show-file-list="false"
                    :disabled="readonly"
                    :on-success="setFlag"
                    :on-progress="uploadProcess"
                    accept="image/gif,image/bmp,image/jpeg,image/png"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="countryflag" :src="countryflag"
                        class="avatar" style="width:50px;height:50px">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-for="(d,index) in langList" :key="d.type">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="form-group">
                <div class="sub-title">{{d.languagename}}</div>
                <div class="content">
                  <el-input v-model="labeData[index].content" size="small" maxlength="30" :disabled="readonly" clearable></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row >
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
              <div class="form-group">
                <div class="sub-title"></div>
                <div class="content">
                  <el-checkbox v-model="formData.isactived" true-label="1" :disabled="readonly" false-label="0">{{rs.set_as_active}}</el-checkbox>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </form>       
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button style="color:#000;" class="small" @click="dialogVisible">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="saveLanguage" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { insertLanguage, getLanguageList, updateLanguage, deleteLanguage } from '@/api/languageApi.js'
import { validator, allvalidator } from '@/validator/validator.js'
import { mapGetters } from "vuex";
import axios from 'axios';
export default{
  data() {
    return {
      actionUrl:'',//图片上传路径
      countryflag:'',
      languagenameShow:'',
      formData:{
        languageid:'',
        languagename:'',
        languageculture:'',
        isactived:0,
        displayorder:'',
        countryflag:''
      },
      validatorSave:{
          languageid:{
            vaid:['noNull'],
            flg:false,
            msg:''
          },
          languageculture:{
            vaid:['noNull'],
            flg:false,
            msg:''
          },
          displayorder:{
            vaid:['noNull','Number'],
            flg:false,
            msg:''
          }
        },
      dialogShow:false,//弹出层显示隐藏
      saveUpdate:true,//区分新增和更新按钮
      idVisible:false,//区分ID时候可以修改
      labeData:[],
      languageList:[]
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
  },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    dialogVisible(mode){
      this.validatorSave={
          languageid:{
            vaid:['noNull'],
            flg:false,
          },
          languageculture:{
            vaid:['noNull'],
            flg:false,
          },
          displayorder:{
            vaid:['noNull','Number'],
            flg:false,
            msg:''
          }
        };
      this.dialogShow =!this.dialogShow;
      if(mode == 'save'){
         this.saveUpdate = true;
         this.countryflag =''
      }else{
         this.saveUpdate = false;
      }
      this.formData={
        languageid:'',
        languagename:'',
        languageculture:'',
        isactived:0,
        displayorder:'',
        countryflag:''
      };
      this.labeData.forEach(element => {
          element.content ='';
        });
      if(mode=='update'){
        this.idVisible=true;
      }else{
        this.idVisible =false;
      }
    },
    // 删除语言条目
    deleteRow(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
        }).then(() => {
            deleteLanguage({ids:row}).then(res=>{
            if(res.data.success){
              this.getList(this.languagetype);
              this.$message.success(this.rs.info_msg_delete_success)
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
    // 新增语言条目
    saveLanguage(){
       if(allvalidator(this.validatorSave,this.formData)){
          return
        }
      this.formData.languagename = JSON.stringify(this.labeData);
      if(this.countryflag != ''){
        this.formData.countryflag = this.countryflag;
      }
      if(this.saveUpdate){
        insertLanguage(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_insert_success)
            this.getList(this.languagetype);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
          this.dialogShow =!this.dialogShow;
        })
      } else {
          updateLanguage(this.formData).then(res=>{
            if(res.data.success){
              this.dialogShow =!this.dialogShow;
              this.getList(this.languagetype);
              this.$message.success(this.rs.info_msg_update_success)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
        })
      }
    },
    // 查询语言
    getList(languagetype){
        getLanguageList({languagetype}).then(res=>{
        if(res.data.success){
          this.languageList = res.data.data;
          this.languageList.forEach(element => {
             element.languagenameShow = element.languagename;
           });

        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 修改
    updateRow(row){
      this.dialogVisible('update');
      this.formData=row;
      getLanguageList({languageid:row.languageid}).then(res=>{
        if(res.data.success){
          var arr = res.data.data;
          this.labeData.forEach((ele,index)=>{
            arr.forEach(element => {
              if(ele.type == element.languagetype){
                ele.content = element.languagename
              }
              if(this.formData.languagetype == element.languagetype){
                this.countryflag = element.countryflag;
              }
            });
          })
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    uploadProcess(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
    setFlag(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.countryflag  =file.response.path;
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
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
    }
  },
  created(){
    // 获取语言资源表数据
    this.$store.commit('SELECT_LIST',JSON.parse(localStorage.getItem('selectlist')))
    this.$store.commit('RESOURCE_LIST',JSON.parse(localStorage.getItem('resourcelist')))
    this.$store.commit('LANGUAGE_TYPE',localStorage.getItem('languagetype'))
    this.getList(localStorage.getItem('languagetype'));

    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    if(this.langList.length == 0){
      this.labeData.push({type:'',content:''})
    }else{
      // 转换到存储list
      this.langList.forEach(element => {
        this.labeData.push({type:element.languageid,content:''})
      });
    }
    this.actionUrl = axios.defaults.baseURL+'language/uploadFile';
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.language ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getList(val)
    }
  }
}
</script>

<style scoped>
.avatar-uploader-icon{
  width: 25px;
  height: 20px;
  line-height: 20px
}
.avatar-uploader {
  height: 105px;
  width: 200px;
  border: 1px solid #EEE;
  border-radius: 5px;
  position: relative;
}
</style>
