<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.members_detail}}</span>
          <span class="sub_text" v-if="isUpdate==undefined?false:true" v-show="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
        </div>
        <div class="tools">
          <el-button class="medium bg_blue"   @click="addAgent" v-if="!readonly">{{rs.save}}</el-button>
        </div>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-collapse v-model="activeNames" class="box">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.base_information}}</span>
                        </div>
                      </div>
                    </template>
                    <div class="box-body">
                      <el-row :gutter="10" class="">
                        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
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
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                              <div class="form-group">
                                <div class="sub-title">{{rs.job_title}}</div>
                                <div class="content">
                                  <el-input maxlength="100" v-model="formData.jobtitle" :disabled="readonly" size="small" clearable></el-input>
                                  <!-- <p class="curtail" v-show="validatorSave.jobtitle.flg">{{rs[validatorSave.jobtitle.msg]}}</p> -->
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.abn}}</div>
                                <div class="content">
                                  <el-input maxlength="20" v-model="formData.abn" size="small" :disabled="readonly" clearable></el-input>
                                </div>
                              </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.tfn}}</div>
                                <div class="content">
                                  <el-input maxlength="20" v-model="formData.tfn"  size="small" :disabled="readonly" clearable></el-input>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.photo}}</div>
                            <div class="content">
                              <el-upload
                              class="avatar-uploader"
                              :action="actionUrl1"
                              :show-file-list="false"
                              :disabled="readonly"
                              :on-success="handleAvatarSuccess"
                              :on-progress="handleprogress"
                              accept="image/gif,image/bmp,image/jpeg,image/png"
                              :before-upload="beforeAvatarUpload">
                              <img v-if="formData.photo" :src="formData.photo" class="avatar">
                              <img v-else src="../../assets/imgs/no_photo.jpg" alt="">
                              <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                              </el-upload>
                            </div>
                          </div>
                          <span style="font-size:12px;color:#818998">(*Recommended size: 140 x 175 pixels)</span>

                        </el-col>
                      </el-row>
                      <el-row :gutter="10" class="">
                        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                          <el-row :gutter="10">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.email}}<span class="required">*</span></div>
                                <div class="content">
                                  <el-input maxlength="100" :disabled="readonly"  v-model="formData.email" size="small" clearable @blur="validatorBlur('email')" ></el-input>
                                  <p class="curtail" v-show="validatorSave.email.flg">{{rs[validatorSave.email.msg]}}</p>
                                </div>
                              </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.date_of_birth}}</div>
                                <div class="content">
                                  <el-date-picker
                                    :disabled="readonly"
                                    v-model="formData.dateofbirth"
                                    type="date"
                                    format="dd/MM/yyyy"
                                    value-format="yyyy-MM-dd"
                                    placeholder=""
                                    size="small"
                                    :width="40">
                                  </el-date-picker>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.phone_number}}</div>
                                <div class="content">
                                  <el-input v-model="formData.phonenumber" :disabled="readonly" size="small" clearable @blur="validatorBlur('phonenumber')"></el-input>
                                  <p class="curtail" v-show="validatorSave.phonenumber.flg">{{rs[validatorSave.phonenumber.msg]}}</p>
                                </div>
                              </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.mobile_number}}</div>
                                <div class="content">
                                  <el-input v-model="formData.mobilenumber" :disabled="readonly" size="small" clearable></el-input>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.gender}}</div>
                                <div class="content">
                                  <el-select v-model="formData.gender" slot="prepend" size="small" :disabled="readonly" @change="validatorBlur('gender')" >
                                    <el-option :label="rs.male" value="0"></el-option>
                                    <el-option :label="rs.female" value="1"></el-option>
                                  </el-select>
                                  <p class="curtail" v-show="validatorSave.gender.flg">{{rs[validatorSave.gender.msg]}}</p>
                                </div>
                              </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.general_language}}</div>
                                <div class="content fl">
                                  <el-select v-model="formData.languageid" slot="prepend" placeholder=" " size="small" :disabled="readonly" @change="validatorBlur('gender')" >
                                    <el-option  v-for="(d,i) in langList" :key="i" :value="d.languageid" :label="d.languagename"></el-option>
                                  </el-select>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.license_number}}</div>
                                <div class="content">
                                  <el-input :disabled="readonly" v-model="formData.licensenumber" size="small" clearable></el-input>
                                </div>
                              </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.license_expiry}}</div>
                                <div class="content">
                                  <el-date-picker
                                    :disabled="readonly"
                                    v-model="formData.expireddate"
                                    type="date"
                                    format="dd/MM/yyyy"
                                    value-format="yyyy-MM-dd"
                                    placeholder=""
                                    size="small"
                                    :width="40">
                                  </el-date-picker>
                                </div>
                              </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="sub-title">{{rs.commission_level}}</div>
                                <div class="content">
                                  <el-select v-model="formData.commissionlevel" placeholder=" " slot="prepend" size="small" :disabled="readonly" clearable>
                                    <el-option
                                      v-for="item in commissionlevelList"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.code" >
                                    </el-option>
                                  </el-select>
                                  <p class="curtail" v-show="validatorSave.commissionlevel.flg">{{rs[validatorSave.commissionlevel.msg]}}</p>
                                </div>
                              </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                              <div class="form-group">
                                <div class="content fl" style="margin-top:56px;">
                                  <el-checkbox v-model="checked" size="small" :disabled="readonly" @change="ischeckedchange">{{rs.set_as_active}}</el-checkbox>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                          <el-row :gutter="10">
                            <el-col :span="24">
                              <div class="form-group">
                                <div class="sub-title">{{rs.qrcode}}</div>
                                <div class="content">
                                  <el-upload
                                  class="avatar-uploader"
                                  :action="actionUrl2"
                                  :show-file-list="false"
                                  :disabled="readonly"
                                  :on-success="handleQrcodeSuccess"
                                  :on-progress="handleMinprogress"
                                  accept="image/gif,image/bmp,image/jpeg,image/png"
                                  :before-upload="beforeAvatarUpload">
                                  <img v-if="formData.qrcode" :src="formData.qrcode" class="avatar">
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                  </el-upload>
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
            <el-row :gutter="10">
              <el-col :span="24">
                <el-collapse v-model="activeNames" class="box" style="margin-top:10px;">
                  <el-collapse-item name="2">
                    <template slot="title">
                      <!-- <div class="box-header-with-collapse clearfix ">
                        <div class="box-title">
                          <i class="fa fa-recycle"><span>{{rs.approver}}</span></i>
                        </div>
                        <div class="box-tools">
                          <i class="header-icon"></i>
                        </div>
                      </div> -->
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/page/agentDetail_1.png" alt=""><span>{{rs.approver}}</span>
                        </div>
                      </div>
                    </template>
                    <div class="box-body">
                      <div class="table_box">
                        <el-table
                          :data="tableData"
                          :empty-text = rs.no_data
                          style="width: 100%"
                          :show-overflow-tooltip="true"
                          size="mini">
                          <el-table-column
                            prop="value"
                            :label="rs.approval_route"
                            >
                          </el-table-column>
                          <el-table-column
                            prop="organization"
                            :label="rs.approval_organizations"
                            >
                            <template slot-scope="scope">
                              <el-select v-model="valueList[scope.$index]" size="small" clearable placeholder=""
                                @change="gainCh(scope,scope.row,valueList[scope.$index])"
                                :disabled="readonly"
                                @clear="delAudit(scope.row)"
                                @visible-change = "changeOption(scope.row,scope,valueList[scope.$index])">
                                <el-option
                                v-for="(item,i) in approverData"
                                :label="item.organizationname"
                                :value="item.organizationname"
                                size="small" :key="i" >
                                </el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-collapse v-model="activeNames" class="box">
                  <el-collapse-item name="3">
                    <template slot="title">
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/page/attendanceResults_2.png" alt=""><span>{{rs.address}}</span>
                        </div>
                      </div>
                    </template>
                    <div class="box-body">
                      <address-area :formData="formData" :validatorSave='validatorSave' :readonly="readonly"></address-area>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-collapse v-model="activeNames" class="box" style="margin-top:10px;">
                  <el-collapse-item name="4">
                    <template slot="title">
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/page/clientDetail_1.png" alt=""><span>{{rs.trust_account_details}}</span>
                        </div>
                      </div>
                    </template>
                    <div class="box-body">
                      <account-area :formData="formData" :validatorSave='validatorSave' :readonly="readonly"></account-area>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-collapse v-model="activeNames" class="box" style="margin-top:10px;">
                  <el-collapse-item name="5">
                    <template slot="title">
                      <!-- <div class="box-header-with-collapse clearfix">
                        <div class="box-title">
                          <i class="fa fa-wechat"><span>{{rs.social_media}}</span></i>
                        </div>
                        <div class="box-tools">
                          <i class="header-icon"></i>
                        </div>
                      </div> -->
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/page/agentDetail_2.png" alt=""><span>{{rs.social_media}}</span>
                        </div>
                      </div>
                    </template>
                    <div class="box-body">
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.linkedin_id}}</div>
                            <div class="content" >
                              <el-input maxlength="30" v-model="formData.linkedinid"  :disabled="readonly" size="small"></el-input>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.facebook_id}}</div>
                            <div class="content" >
                              <el-input maxlength="30" v-model="formData.facebookid" :disabled="readonly" size="small"></el-input>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.twitter_id}}</div>
                            <div class="content" >
                              <el-input maxlength="30" v-model="formData.twitterid" :disabled="readonly" size="small"></el-input>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.wechat_id}}</div>
                            <div class="content" >
                              <el-input maxlength="30" v-model="formData.wechatid" :disabled="readonly" size="small"></el-input>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.instagram_id}}</div>
                            <div class="content" >
                              <el-input maxlength="30" v-model="formData.instagramid" :disabled="readonly" size="small"></el-input>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </form>
  </div>
</template>
<script>
import { approveorganizationGetDataByRoute,agentGetlevel} from '@/api/approveApi.js'
import { insertAgent, updateAgent, getAgentData ,agentGetDefaultOrg } from '@/api/agentApi.js'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import Vue from 'vue'
import { DatePicker} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
Vue.component(DatePicker)
import axios from 'axios'
  export default{
     data() {
      return {
      activeNames:['1','2','3','4','5'], //折叠面板
      approverData :[],//Approver数据
      approverList:[],
      valueList:[],
      tableData:[],
      langList:[],
      arr:[],
      checked:false,
      actionUrl1:'',
      actionUrl2:'',
      countryList:[],
      commissionlevelList:[],
      formData:{
        firstname:'',
        lastname:'',
        jobtitle:'',
        abn:'',
        tfn:'',
        photo:'',
        email:'',
        dateofbirth:null,
        phonenumber:'',
        mobilenumber:'',
        licensenumber:'',
        gender:'0',
        commissionlevel: '',
        isactived:'0',
        addressline:'',
        addressline2:'',
        suburb:'',
        state:'',
        postcode:'',
        country:'',
        bankname:'',
        accountname:'',
        bsb:'',
        accountnumber:'',
        linkedinid:'',
        facebookid:'',
        twitterid:'',
        wechatid:'',
        instagramid:'',
        organlist : [],
        isUpdate:true,
        qrcode:'',
        languageid:'',
        expireddate:""
      },
      validatorSave:{
        firstname:{
          vaid:['noNull'],
          flg:false
        },
        lastname:{
          vaid:['noNull'],
          flg:false
        },
        email:{
          vaid:['Email','noNull'],
          flg:false
        },
        gender:{
          vaid:['noNull'],
          flg:false
        },
        commissionlevel:{
          vaid:['noNull'],
          flg:false
        },
        phonenumber:{
          vaid:['phoneNumber'],
          flg:false
        },
        postcode:{
          vaid:['Number'],
          flg:false
        },
        accountnumber:{
          vaid:['Number'],
          flg:false
        },
      },
      }
    },
    components: {
      'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
      'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
      'account-area': resolve => require(['@/common/AccountArea.vue'], resolve),
     },
     created(){
      this.countryList = JSON.parse(localStorage.getItem('selectlist')).Country;
      this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
      this.tableData = JSON.parse(localStorage.getItem('selectlist')).APPROVAL_ROUTE_TYPE_LIST
      this.actionUrl1 = axios.defaults.baseURL +'agent/uploadFile?flag=0'
      this.actionUrl2 = axios.defaults.baseURL +'agent/uploadFile?flag=1'
      // this.commissionlevelList = JSON.parse(localStorage.getItem('selectlist')).LEVEL_LIST
      if(this.$router.currentRoute.query.id=='2'||this.$router.currentRoute.query.id=='3'){
        this.echoData()
        this.isUpdate= false
      }else{
        this.addData()
        this.isUpdate= true
      }
        this.dropBox()
        this.getOptien()
      },
    methods:{
      getOptien(){
        agentGetlevel().then(res=>{
          if (res.data.success) {
            this.commissionlevelList = res.data.levels  
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
          
        })
      },


      delAudit(key){
        for(var i=0;i<this.arr.length;i++){
          if (this.arr[i].routetype == key.code) {
            this.arr[i].organizationid = ''
          }
        }
      },
      //新增时审批人回显
      addData(){
        agentGetDefaultOrg({languagetype:localStorage.getItem('languagetype')}).then(res=>{
          if (res.data.success) {
            for(var i = 0;i<res.data.data.length;i++){
              this.valueList.push(res.data.data[i].organizationname)
              this.arr.push({routetype:res.data.data[i].routetype,organizationid:res.data.data[i].organizationid})
            }
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
         
        })
      },
      //回显
      echoData(){
        let data = {
          agentid:JSON.parse(sessionStorage.getItem('addagentData')).agentid,
          languagetype:localStorage.getItem('languagetype')
        }
        getAgentData(data).then(res=>{
          if (res.data.success) {
              for(var i = 0;i<res.data.approvedata.length;i++){
                this.valueList.push(res.data.approvedata[i].organizationname)
                this.arr.push({routetype:res.data.approvedata[i].routetype,organizationid:res.data.approvedata[i].organizationid})
              }
              this.formData = res.data.data
              if (this.formData.isactived=='1') {
                this.checked = true
              }else{
                this.checked = false
              }
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      },
      //下拉框数据
      dropBox(){
        approveorganizationGetDataByRoute({languagetype:localStorage.getItem('languagetype')}).then(res=>{
        if (res.data.success) {
            this.approverList = res.data.data
          } else {
             this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      },
      validatorBlur(key){
        validator(this.validatorSave,this.formData,key)
      },
      ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },
      changeOption(row,scope,arr){
        this.approverData = this.approverList[row.code]
      },
      gainCh(scope,row,name){
        for(var i=0;i<this.approverData.length;i++){
          if (this.approverData[i].organizationname == name) {
            let obj = {
              routetype : row.code,
              organizationid:this.approverData[i].organizationid,
            }
            for(var i=0;i<this.arr.length;i++){
              if (this.arr[i].routetype == obj.routetype) {
                  this.arr.remove(this.arr[i])
                this.arr.push(obj)
                return
              }
            }
          }
        }
      },
      handleQrcodeSuccess(res,file){
        this.$store.commit('SET_SHOW_LOADING',false)
        this.formData.qrcode = file.response.path
      },
      handleMinprogress(event, file, fileList){
        this.$store.commit('SET_SHOW_LOADING',true)
      },
      handleAvatarSuccess(res, file) {
        this.$store.commit('SET_SHOW_LOADING',false)
        this.formData.photo = file.response.path
      },
      handleprogress(event, file, fileList){
        this.$store.commit('SET_SHOW_LOADING',true)
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
      //判断checked
      ischeckedchange(){
        if (this.checked) {
          this.formData.isactived = '1'
        } else {
          this.formData.isactived = '0'
        }
      },
      // 保存
      addAgent(){
        // if(allvalidator(this.validatorSave,this.formData)){
        //   return
        // }
        if (this.formData.expireddate=='') {
          this.formData.expireddate = null
        }
        let data = this.formData
        this.formData.organlist = JSON.stringify(this.arr)
        if (this.$router.currentRoute.query.id=='1') {
          insertAgent(data).then(res=>{
            if (res.data.success) {
              this.$router.push({path:"/teams_manage/agents"})
              this.$message.success(this.rs.info_msg_insert_success)
            } else {
               this.$message.error(this.ErrorMsgStr(res.data.data));
            }
          })
        }else if(this.$router.currentRoute.query.id=='2'||this.$router.currentRoute.query.id=='3'){
          delete data.updatedtimestamp
          delete data.deletedflag
          updateAgent(data).then(res=>{
          if (res.data.success) {
              if (this.$router.currentRoute.query.id=='2') {
                this.$router.push({path:"/teams_manage/agents"})
              }else if (this.$router.currentRoute.query.id=='3') {
                this.$router.push({path:"/teams_manage/departments"})
              }
              this.$message.success(this.rs.info_msg_uptade_success)
            } else {
              this.$message.error(this.ErrorMsgStr(res.data.data));
            }
          })
        }
      }
    },

    computed: {
      ...mapGetters(['se','rs','languagetype','control']),
      readonly(){
        if(this.control.agent ==='02'){
          return true
        }else{
          return false
        }
      }
    },
     watch:{
       se(val){
        this.countryList = val.Country
        this.langList =val.Language;
        this.commissionlevelList = JSON.parse(localStorage.getItem('selectlist')).LEVEL_LIST
        // this.dropBox()

       },
       languagetype(){
         
         if(!this.isUpdate){
         this.echoData()
         }else{
           
           this.addData()
         }
       }
    }
  }
</script>
<style scoped>
.content img{
  width: 100%;
}
</style>

