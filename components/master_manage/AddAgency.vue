<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
       <div class="title">
        <span >{{rs.add_new_agency}}</span>
      </div>
      <div class="tools">
        <el-button   class="bg_save_btn" v-if="!readonly&&canSave"  @click="handleSave" size="small">{{rs.create}}</el-button>
        <el-button   class="bg_save_btn" v-else  disabled size="small">{{rs.create}}</el-button>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-content clearfix">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.base_information}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body clearfix">
                  <el-row :gutter="20" class="">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.full_name}}<span class="required">*</span></div>
                            <div class="content">
                              <el-input maxlength="100" v-model="formData.fullnameShow" :disabled="readonly"  size="small" @input="change($event)"  @blur="validatorBlur('fullnameShow')">
                                <el-button slot="append"   @click="fullnameShow=true" v-if="!readonly"><i class="fa fa-globe" style="color:#3c8dbc"></i></el-button>
                              </el-input>
                              <p class="curtail" v-show="validatorSave.fullnameShow.flg">{{rs[validatorSave.fullnameShow.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.short_name}}<span class="required">*</span></div>
                            <div class="content">
                              <el-input maxlength="30" v-model="formData.shortnameShow" size="small" @input="change($event)" :disabled="readonly"  @blur="validatorBlur('shortnameShow')">
                                <el-button   slot="append" @click="shortnameShow=true" v-if="!readonly"><i class="fa fa-globe" style="color:#3c8dbc"></i></el-button>
                              </el-input>
                              <p class="curtail" v-show="validatorSave.shortnameShow.flg">{{rs[validatorSave.shortnameShow.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 38px;">
                          <div class="form-group" >
                            <div class="content fl" style="padding-top:20px;">
                              <el-checkbox :label="rs.set_as_active" :disabled="readonly" v-model="formData.isactived" size="small" true-label='1' false-label='0'></el-checkbox>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="2">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/User Manage_icon_zjgs@2x.png" alt=""><span>{{rs.system_admin}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body clearfix">
                  <el-row :gutter="20" class="">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.first_name}}<span class="required">*</span></div>
                            <div class="content">
                              <el-input maxlength="50" :disabled="readonly" v-model="formData.firstname" size="small" clearable @blur="validatorBlur('firstname')"></el-input>
                              <p class="curtail" v-show="validatorSave.firstname.flg">{{rs[validatorSave.firstname.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.last_name}}<span class="required">*</span></div>
                            <div class="content">
                              <el-input maxlength="50" v-model="formData.lastname" :disabled="readonly"  size="small" clearable @blur="validatorBlur('lastname')"></el-input>
                              <p class="curtail" v-show="validatorSave.lastname.flg">{{rs[validatorSave.lastname.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.email}}<span class="required">*</span></div>
                            <div class="content">
                              <el-input maxlength="100" :disabled="readonly"  v-model="formData.agentemail" size="small" clearable @blur="validatorBlur('agentemail')" ></el-input>
                              <p class="curtail" v-show="validatorSave.agentemail.flg">{{rs[validatorSave.agentemail.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="content fl" style="margin-top:56px;">
                               <el-checkbox :label="rs.set_as_active" :disabled="readonly" v-model="formData.actived" size="small" true-label='1' false-label='0'></el-checkbox>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </div>
    </form>  
    <!-- 语言弹出层 -->
    <language-name :sync="fullnameShow" labelName='fullname' :nameData='fullnameObj' @update:sync="fullnameShow=false"></language-name>
    <language-name :sync="shortnameShow" labelName='shortname' :nameData='shortnameObj'  @update:sync="shortnameShow=false"></language-name>
  </div>
</template>
<script>
import{ insertAgency } from '@/api/agencyApi.js'
import axios from 'axios'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
export default{
  data() {
    return {
      fullnameShow:false,//fullname弹出层显示
      shortnameShow:false,//shortname弹出层显示
      canSave:true,
      shortnameObj:{},//组件绑定值
      fullnameObj:{},//组件绑定值
      activeNames:['1','2'], //折叠面板
      checked:false,
      formData:{
        fullnameShow:'',//页面显示值
        shortnameShow:'',//页面显示值
        fullname:'',
        shortname:'',
        isactived:0,
        languagetype:'01',
      },
      validatorSave:{
        fullnameShow:{
          vaid:['noNull'],
          flg:false,
        },
        shortnameShow:{
          vaid:['noNull'],
          flg:false
        },
        firstname:{
          vaid:['noNull'],
          flg:false
        },
        lastname:{
          vaid:['noNull'],
          flg:false
        },
        agentemail:{
          vaid:['Email','noNull'],
          flg:false
        },
      },
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'language-name': resolve => require(['@/common/LanguageName'], resolve),
    },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    // 转换成提交数组
    setActionArr(data){
      let actionArr=[]
      for (var Key in data){
        actionArr.push({type:Key,content:data[Key]})
      }
      return actionArr
    },
     change(e){
      this.$forceUpdate()
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    goRouter(path,row){
      this.$router.push({path:path});
    },
    handleSave(){
      if(!this.canSave){
          return;
        }
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      this.canSave = false;
      //提交转换数组字符
      this.fullnameObj['00'] = this.formData.fullnameShow;
      this.shortnameObj['00'] = this.formData.shortnameShow;
      this.formData.fullname = JSON.stringify(this.setActionArr(this.fullnameObj))
      this.formData.shortname = JSON.stringify(this.setActionArr(this.shortnameObj))
      insertAgency(this.formData).then(res=>{
          if(res.data.success){
          this.goRouter('/master_manage/agencies')
          this.$message.success(this.rs.info_msg_insert_success)
          this.canSave = true;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          this.canSave = true;

        }
      }).catch(error=>{
        this.canSave = true;
      })
    }
  },
  created(){
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.agency ==='02'){
        return true
      }else{
        return false
      }
    }
  },
}
</script>
