<template>
  <div class="wrapper clearfix">
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
                  <el-input :disabled="readonly" placeholder="" v-model="obj.agentapp_init_password" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.version_agent_app_ios}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.version_agent_app_ios" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.min_version_agent_app_ios}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.min_version_agent_app_ios" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.version_agent_app_android}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.version_agent_app_android" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.min_version_agent_app_android}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.min_version_agent_app_android" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.version_of_agent_app_hd}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.version_of_agent_app_hd" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.min_version_of_agent_app_hd}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.min_version_of_agent_app_hd" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.show_num_first_page}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.show_num_first_page" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.load_num_per_time}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.load_num_per_time" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.reserve_change_unlock_time}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.reserve_change_unlock_time" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
                    <label class="unit">{{rs.hours}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.call_default_time}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.call_default_time" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
                    <label class="unit">{{rs.minutes}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.meeting_default_time}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.meeting_default_time" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
                    <label class="unit">{{rs.hours}}</label>
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
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.recent_search_key_count}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.recent_search_key_count" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.default_lvr_rate}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.default_lvr_rate" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.interest_rate_yearly}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.interest_rate" clearable size="mini"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.open_push_debug_mode}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <el-switch
                      style="margin-top:10px"
                      :disabled="readonly"
                      active-value="1"
                      inactive-value="0"
                      v-model="obj.open_push_debug_mode"
                      active-color="#13ce66"
                      inactive-color="#CCC"
                      >
                  </el-switch>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.set_reservation_reminder}}</label>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="2" :lg="2" :xl="2">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.remind_reserve" clearable size="mini"></el-input>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="2" :lg="2" :xl="2">
                      <label class="unit">{{rs.days}}</label>
                  </el-col>
                </el-row>
                 <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.set_contract_issue_reminder}}</label>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="2" :lg="2" :xl="2">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.remind_contract_issued" clearable size="mini"></el-input>
                  </el-col>
                   <el-col :xs="12" :sm="12" :md="2" :lg="2" :xl="2">
                      <label class="unit">{{rs.days}}</label>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">{{rs.set_exchange_reminder}}</label>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="2" :lg="2" :xl="2">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.remind_conditional_exchanged" clearable size="mini"></el-input>
                  </el-col>
                   <el-col :xs="12" :sm="12" :md="2" :lg="2" :xl="2">
                      <label class="unit">{{rs.days}}</label>
                  </el-col>
                </el-row>
                 <!--  -->
                <el-row :gutter="10" class="line">
                  <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <label class="title">Minimum Number of Projects to Use Tags View On Home Page</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input :disabled="readonly" placeholder="" v-model="obj.home_page_num" clearable size="mini"></el-input>
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
import { getSystemSettingData, updateSystemSetting } from '@/api/systemSettingApi.js'
  export default{
    data() {
      return {
        obj:{
         
        }
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
        updateSystemSetting({systemsetting:JSON.stringify(this.obj), systemtype:'1'}).then(res=>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_operate_success)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
        })
      },

      all(){
        getSystemSettingData({type:'1'}).then(res=>{
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
      readonly() {
        if (this.control.agentapp_other_setting === "02") {
          return true;
        } else {
          return false;
        }
      }
    }
  }
</script>