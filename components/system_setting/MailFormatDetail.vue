<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.detail}}</span>
          <span class="sub_text" v-if="isUpdate==undefined?false:true" v-show="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
        </div>
        <div class="tools">
          <el-button   v-if="!readonly" class="bg_save_btn" size="small" @click="handleSave">{{rs.save}}</el-button>
        </div>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="box">
              <div class="box-body">
                <el-row :gutter="10">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="sub-title-first">{{rs.format_id}} <span class="required">*</span></div>
                      <div class="content">
                          <el-input :disabled="!isUpdate" v-model="formData.formatid" clearable size="small" maxlength="200" @blur="validatorBlur('formatid')">
                          </el-input>
                          <p class="curtail" v-show="validatorSave.formatid.flg">{{rs[validatorSave.formatid.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="sub-title">{{rs.title}} <span class="required">*</span> </div>
                      <div class="content">
                          <el-input v-model="formData.title" clearable size="small" maxlength="500" @blur="validatorBlur('title')">
                          </el-input>
                          <p class="curtail" v-show="validatorSave.title.flg">{{rs[validatorSave.title.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="sub-title">{{rs.content}} <span class="required">*</span> </div>
                      <div class="content">
                          <el-input
                              type="textarea"
                              maxlength="2000"
                              :autosize="{ minRows: 8, maxRows: 25}"
                              placeholder=""
                              v-model="formData.content" @blur="validatorBlur('content')">
                          </el-input>
                          <p class="curtail" v-show="validatorSave.content.flg">{{rs[validatorSave.content.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <!-- <el-row :gutter="10">
                    <el-col :span="24">
                        <div class="form-group">
                        <div class="sub-title">{{rs.content}} 2 </div>
                        <div class="content">
                            <el-input
                                type="textarea"
                                maxlength="2000"
                                :autosize="{ minRows: 3, maxRows: 15}"
                                placeholder=""
                                v-model="formData.content2">
                            </el-input>
                        </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <div class="form-group">
                        <div class="sub-title">{{rs.content}} 3 </div>
                        <div class="content">
                            <el-input
                                type="textarea"
                                maxlength="2000"
                                :autosize="{ minRows: 3, maxRows: 15}"
                                placeholder=""
                                v-model="formData.content3">
                            </el-input>
                        </div>
                        </div>
                    </el-col>
                </el-row>  -->
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
  </div>
</template>
<script>
import { insertMail, getMailInfo, updateMail } from '@/api/systemSettingApi.js'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
export default{
  data() {
    return {
      activeNames:['1'],
      formData:{
        systemtype:'0',
        title:'',
        formatid:'',
        content:'',
        content2:'',
        content3:''
      },
      validatorSave:{
        formatid:{
          vaid:['noNull'],
          flg:false
        },
        title:{
          vaid:['noNull'],
          flg:false
        },
        content:{
          vaid:['noNull'],
          flg:false
        },
      },
      pageUrl:''
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    ErrorMsgStr(arr){
      let str=''
    //   arr.forEach(element => {
    //     str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
    //   });
      return str
    },
    goRouter(path){
      this.$router.push({path})
    },
    // 转换成提交数组
    setActionArr(data){
      let actionArr=[]
      for (var Key in data){
        actionArr.push({type:Key,content:data[Key]})
      }
      return actionArr
    },
    handleSave(){
      // 如果验证有一个没有通过.那么就不提交
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      if(this.isUpdate){
        insertMail(this.formData).then(res =>{
          if(res.data.success){
            this.goRouter(this.pageUrl)
            this.$message.success(this.rs.info_msg_insert_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        updateMail(this.formData).then(res =>{
          if(res.data.success){
            this.goRouter(this.pageUrl)
            this.$message.success(this.rs.info_msg_insert_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
      
    },
    getFormatInfo(data){
      getMailInfo(data).then(res =>{
        if(res.data.success){
          this.formData = res.data.data;
        }
      })
    }
  },
  created(){
    //   save0,update0 代表从后台管理设置的地方进来，
    //   save1,update1 代表从App管理设置的地方进来，
    if(this.$route.params.id == 'save0' || this.$route.params.id == 'save1'){
      this.isUpdate= true;//给保存按钮识别是新增还是修改
      if(this.$route.params.id == 'save0'){
          this.formData.systemtype = '0'
          this.pageUrl ='/system_setting/back_end/mailFormat'

      }else{
          this.formData.systemtype = '1'
          this.pageUrl = '/system_setting/app_agent/mailFormat'
      }
    }
    if(this.$route.params.id == 'update0' || this.$route.params.id == 'update1'){
      this.isUpdate = false;//给保存按钮识别是新增还是修改
      if(this.$route.params.id == 'update0'){
          this.formData.systemtype = '0'
          this.pageUrl ='/system_setting/back_end/mailFormat'
      }else{
          this.formData.systemtype = '1'
          this.pageUrl = '/system_setting/app_agent/mailFormat'
      }
       if(sessionStorage.getItem('formatid')){
        this.formData.formatid = sessionStorage.getItem('formatid');
      }else{
        this.formData.formatid = this.$router.currentRoute.query.id;
        sessionStorage.setItem('formatid',this.$router.currentRoute.query.id)
      }
      this.getFormatInfo({systemtype:this.formData.systemtype,formatid:this.formData.formatid})
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.mail_format_detail ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
  },
}
</script>
