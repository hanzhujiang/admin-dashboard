<template>
  <div class="wrapper clearfix">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.mail_host}}</span>
        </div>
        <div class="tools">
          <el-button   v-if="!readonly" class="bg_save_btn" @click="handleSave"  size="small">{{rs.save}}</el-button>
        </div>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box">
              <!-- <div class="box-header">
                <div class="title">
                  <img src="../../../assets/imgs/page/otherSetting_1.png" alt="">
                  <span>{{rs.setting_content}}</span>
                </div>
              </div> -->
              <div class="box-body">
                <el-row :gutter="10" class="line-first">
                  <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                    <label class="title">{{rs.mail_host}}</label><span></span>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                    <form autocomplete="on">
                      <el-input :disabled="readonly?true:ifusearcmail == '1'?true:false" placeholder="" maxlength="100" v-model="formData.mailhost" clearable size="mini"></el-input>
                    </form>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                    <label class="title">{{rs.mail_account}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                    <form autocomplete="on">
                      <el-input :disabled="readonly?true:ifusearcmail == '1'?true:false" placeholder="" maxlength="200" v-model="formData.mailaccount" clearable size="mini"></el-input>
                    </form>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                    <label class="title">{{rs.mail_password}}</label> 
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                    <form autocomplete="on">
                      <el-input type="password" :disabled="readonly?true:ifusearcmail == '1'?true:false" placeholder="" maxlength="200" v-model="formData.mailpassword" clearable size="mini"></el-input>
                    </form>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                      <!-- :disabled="readonly?true:isgold?true:false" -->
                    <el-checkbox class="title" :disabled="readonly" :label="rs.use_arc_mail_host" v-model="ifusearcmail"  size="small" true-label='1' false-label='0'></el-checkbox>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { insertMailHost, getMailHostInfo, getSystemSettingData } from '@/api/systemSettingApi.js'
export default{
  data() {
    return {
      ifusearcmail:'0',
      formData:{
          ifusearcmail:'0'
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
  },
  created(){
    this.getMailHost()
  },
  watch:{
    ifusearcmail(val){
      if(val == '1'){
        this.getArcMailHost();
        this.formData.ifusearcmail = '1';
      }else{
        this.formData.ifusearcmail = '0';
        this.getMailHost(true);
      }
    }
  },
  methods:{
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str += this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    handleSave(){
      if(this.ifusearcmail == '1'){
        this.formData.ifusearcmail = '1'
      }else{
        this.formData.ifusearcmail = '0'
      }
      insertMailHost(this.formData).then(res =>{
          this.$message.success(this.rs.info_msg_insert_success);
          this.getMailHost()
      })
    },
    getMailHost(type){
        getMailHostInfo().then(res =>{
            if(res.data.success){
                if(res.data.data){
                    this.formData = res.data.data;
                    if(!type){
                      this.ifusearcmail = this.formData.ifusearcmail;
                    }
                }
            }
        })
    },
    getArcMailHost(){
      getSystemSettingData({type:'0'}).then(res=>{
        if (res.data.success) {
           res.data.data.forEach(val => {
            if(val.id == "mail_password"){
              this.formData.mailpassword = val.value;
            }
            if(val.id == "mail_host"){
              this.formData.mailhost = val.value;
            }
            if(val.id == "mail_account"){
              this.formData.mailaccount = val.value;
            }
          });
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
  },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
        if(this.control.backend_mail_host ==='02'){
            return true
        }else{
            return false
        }
    }
  }
}
</script>