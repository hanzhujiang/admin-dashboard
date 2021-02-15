<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.other_setting}}</span>
        </div>
        <div class="tools">
          <el-button   v-if="!readonly" class="bg_save_btn" @click="save"  size="small">{{rs.save}}</el-button>
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
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.default_init_password}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.backend_init_password" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_call}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_call" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_sms}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_sms" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_email}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_email" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_meeting}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_meeting" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_new_client}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_new_client" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_reservation}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_reservation" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_reservation_approved}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_reservation_approved" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_sale_exchange}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_sale_exchange" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_sale_settled}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_sale_settled" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.arb_agent_app_engagement}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.arb_agent_app_engagement" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.gst_rate}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.gst_rate" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <label class="title">{{rs.mail_host}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.mail_host" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <label class="title">{{rs.mail_account}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.mail_account" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <label class="title">{{rs.mail_password}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.mail_password" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <label class="title">{{rs.payee_bankname}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.payee_bankname" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <label class="title">{{rs.payee_accountname}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.payee_accountname" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.payee_bsb}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.payee_bsb" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.payee_accountnumber}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.payee_accountnumber" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                    <label class="title">{{rs.subscription_mail_bcc}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.subscription_mail_bcc" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.limit_usege_days}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.limit_usege_days" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line-first">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.repayment_rate_credit_card}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.repayment_rate_credit_card" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.annual_assessment_rate}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.annual_assessment_rate" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.eligible_limit_amount}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.eligible_limit_amount" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.factfind_email_to}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.factfind_email_to" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.support_email}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.support_email" clearable size="mini"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>  
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getSystemSettingData, updateSystemSetting } from '@/api/systemSettingApi.js'
export default{
  data() {
    return {
      obj:{}
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
  },
  created(){
    this.all()
  },
  methods:{
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
      save(){
      updateSystemSetting({systemsetting:JSON.stringify(this.obj),systemtype:'0'}).then(res=>{
      if (res.data.success) {
        this.$message.success(this.rs.info_msg_operate_success)
      } else {
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      }
      })
    },

    all(){
      getSystemSettingData({type:'0'}).then(res=>{
        if (res.data.success) {
          this.allList = res.data.data
          this.allList.forEach(val => {
          this.obj[val.id]=val.value
          });
          this.obj = Object.assign({},this.obj)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
  },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
        if(this.control.backend_other_setting ==='02'){
            return true
        }else{
            return false
        }
    }
  }
}
</script>

