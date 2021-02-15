<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.task_setting}}</span>
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
                  <label class="title">{{rs.allow_offline_time}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input placeholder="" :disabled="readonly" v-model="obj.allow_offline_time" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.days}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.remind_attend_activity}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.remind_attend_activity" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.hours}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.interval_run_job}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.interval_run_job" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.minutes}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.remind_contact_client}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.remind_contact_client" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.days}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.remind_contact_client_2nd}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.remind_contact_client_2nd" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.days}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.remind_contact_client_list}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.remind_contact_client_list" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.days}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.remind_take_notes}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.remind_take_notes" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.hours}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.remind_update_license}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.remind_update_license" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label>{{rs.days}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.punch_start_time}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.punch_start_time" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.minutes}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.punch_distance}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.punch_distance" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.meters}}</label>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.auto_push_meeting_remind}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.auto_push_meeting_remind" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.hours}}</label>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="10" class="line">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                  <label class="title">{{rs.auto_push_new_task_reminder}}</label>
                </el-col>
                <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
                  <el-input :disabled="readonly" placeholder="" v-model="obj.auto_push_new_task_reminder" clearable size="mini"></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                  <label >{{rs.hours}}</label>
                </el-col>
              </el-row> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import{ mapGetters } from "vuex";
import{ getSystemSettingData, updateSystemSetting } from'@/api/systemSettingApi.js'
  export default{
     data() {
      return {
        obj:{},
        allList:[]
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
        updateSystemSetting({systemsetting:JSON.stringify(this.obj),systemtype:'1'}).then(res=>{
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
        if (this.control.agentapp_task_setting === "02") {
        return true;
        } else {
        return false;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.box-body {
  .unit {
    font-size: 14px;
    font-weight: 700;
  }
}
</style>

