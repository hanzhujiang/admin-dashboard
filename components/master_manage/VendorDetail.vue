<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.vendor_detail}}</span>
        <span class="sub_text" v-if="isUpdate==undefined?false:true" v-show="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
      </div>
      <div class="tools">
        <el-button   class="bg_save_btn" v-if="!readonly"  @click="handleSave" size="small">{{rs.save}}</el-button>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-content clearfix">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" >
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/Base Information_icon@2x.png" alt="">
                      <span>{{rs.vendor}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <el-row :gutter="10" class="">
                    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.full_name}}<span class="required">*</span></div>
                            <div class="content">
                              <!-- <p>{{this.fullnameObj}}</p> -->
                              <el-input :disabled="readonly" v-model="formData.fullnameShow" size="small" clearable maxlength="100"  @input="change($event)"  @blur="validatorBlur('fullnameShow')">
                                <el-button v-if="!readonly" slot="append"  @click="fullnameShow=true"><i class="fa fa-globe" style="color:#3c8dbc"></i>
                                </el-button>
                              </el-input>
                              <p class="curtail" v-show="validatorSave.fullnameShow.flg">{{rs[validatorSave.fullnameShow.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.short_name}}<span class="required">*</span></div>
                            <div class="content">
                              <el-input v-model="formData.shortnameShow" :disabled="readonly" clearable maxlength="30" size="small"   @input="change($event)"  @blur="validatorBlur('shortnameShow')">
                                <el-button slot="append" v-if="!readonly"  @click="shortnameShow=true"><i class="fa fa-globe" style="color:#3c8dbc"></i>
                                </el-button>
                              </el-input>
                              <p class="curtail" v-show="validatorSave.shortnameShow.flg">{{rs[validatorSave.shortnameShow.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.principal}}</div>
                            <div class="content">
                              <el-input v-model="formData.principal" :disabled="readonly"  size="small" clearable>
                              </el-input>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.corporate_license}}</div>
                            <div class="content">
                              <el-input v-model="formData.corporatelicense" :disabled="readonly" size="small" clearable>
                              </el-input>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.abn}}</div>
                            <div class="content">
                              <el-input v-model="formData.abn" size="small" :disabled="readonly" clearable>
                              </el-input>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="form-group">
                            <div class="sub-title">{{rs.email}}</div>
                            <div class="content">
                              <el-input maxlength="100" :disabled="readonly" v-model="formData.email" size="small" clearable @blur="validatorBlur('email')"></el-input>
                              <p class="curtail" v-show="validatorSave.email.flg">{{rs[validatorSave.email.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.contact_person}}</div>
                            <div class="content">
                              <el-input v-model="formData.contactperson" size="small" clearable :disabled="readonly">
                              </el-input>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.contact_number}}</div>
                            <div class="content">
                              <el-input maxlength="20" v-model="formData.contactnumber" size="small" :disabled="readonly" clearable @blur="validatorBlur('contactnumber')"></el-input>
                              <p class="curtail" v-show="validatorSave.contactnumber.flg">{{rs[validatorSave.contactnumber.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.office_telephone}}</div>
                            <div class="content">
                              <el-input maxlength="20" v-model="formData.officetelephone" size="small" :disabled="readonly" clearable  @blur="validatorBlur('officetelephone')"></el-input>
                              <p class="curtail" v-show="validatorSave.officetelephone.flg">{{rs[validatorSave.officetelephone.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.office_fax}}</div>
                            <div class="content">
                              <el-input maxlength="20" v-model="formData.officefax" size="small" :disabled="readonly" clearable @blur="validatorBlur('officefax')"></el-input>
                              <p class="curtail" v-show="validatorSave.officefax.flg">{{rs[validatorSave.officefax.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title"></div>
                            <div class="content fl">
                              <el-checkbox v-model="formData.isactived" true-label='1' :disabled="readonly" false-label='0' size="small">
                              {{rs.set_as_active}}</el-checkbox>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title"></div>
                            <div class="content fl">
                              <el-checkbox v-model="formData.isrunning" true-label='1' :disabled="readonly" false-label='0' size="small">
                              {{rs.is_running}}</el-checkbox>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                      <div class="form-group">
                        <div class="sub-title-first">{{rs.logo}}</div>
                        <div class="content">
                          <el-upload
                          class="avatar-uploader"
                          :action='actionUrl'
                          :show-file-list="false"
                          :on-success="LightImg"
                          :on-progress="progress"
                          :disabled="readonly"
                          accept="image/gif,image/bmp,image/jpeg,image/png"
                          :before-upload="beforeAvatarUpload">
                          <div v-if="formData.logoimage"  style="height: 100%;">
                            <div style=" width: 100%;height: 100%;overflow: hidden;">
                              <div class="zoomImage" :style="{backgroundImage:'url('+formData.logoimage+')'}"></div>
                            </div>
                          </div>
                          <!-- <img v-if="formData.logoimage" :src="formData.logoimage" style="width:100%;height:160px" class="avatar"> -->
                          <img src="../../assets/imgs/no_images.png" alt="" style="width:100%;height:160px"  v-else-if="!isUpdate">
                          <i  class="el-icon-plus avatar-uploader-icon" v-else></i>
                          </el-upload>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="sub-title">{{rs.small_logo}}</div>
                        <div class="content">
                          <el-upload
                          class="avatar-uploader"
                          :action='actionUrl'
                          :show-file-list="false"
                          :on-success="logoImg"
                          :on-progress="progress"
                          :disabled="readonly"
                          accept="image/gif,image/bmp,image/jpeg,image/png"
                          :before-upload="beforeAvatarUpload">
                          <div v-if="formData.logoimagemini"  style="height: 100%;">
                            <div style=" width: 100%;height: 100%;overflow: hidden;">
                              <div class="zoomImage" :style="{backgroundImage:'url('+formData.logoimagemini+')'}"></div>
                            </div>
                          </div>
                          <!-- <img v-if="formData.logoimagemini" :src="formData.logoimagemini" style="width:100%;height:160px" class="avatar"> -->
                          <img src="../../assets/imgs/no_images.png" alt="" style="width:100%;height:160px"  v-else-if="!isUpdate">
                          <i  class="el-icon-plus avatar-uploader-icon" v-else></i>
                          </el-upload>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" style="height: 140px;">
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-collapse v-model="activeNames" class="box">
                  <el-collapse-item name="2">
                    <template slot="title">
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/page/attendanceResults_2.png" alt="">
                          <span>{{rs.address}}</span>
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
                <el-collapse v-model="activeNames" class="box" style="margin-top: 10px;">
                  <el-collapse-item name="3">
                    <template slot="title">
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/page/clientDetail_1.png" alt="">
                          <span>{{rs.trust_account_details}}</span>
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
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="box" style="margin-top: 10px">
              <div class="box-header clearfix">
                <div class="title">
                  <img src="../../assets/imgs/common/common_2.png" alt="">
                  <span>{{rs.channel_commission_rate}}({{rs.default}})</span>
                </div>
                <div class="tools" @click ="handleAddOption">
                  <span class="btn_text" v-if="!readonly">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_new_option}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :data="commissions"
                    :empty-text = rs.no_data
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    size="mini">
                    <el-table-column
                      prop="level"
                      :label="rs.commission_option"
                      width='160'
                      align='center'>
                      <template slot-scope="scope">
                        <span class="leveltext">{{optionObj[scope.row.option]}} {{setOption(scope.$index+1,scope.row)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="exchange_commission"
                      :label="rs.exchange_commission"
                      align="center">
                      <template slot-scope="scope">
                        <el-row :gutter="10">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;">
                              {{rs.commission_rate}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-input size="small" v-model="scope.row.exchange.commissionrate" :disabled="readonly"></el-input>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-select size="small" v-model="scope.row.exchange.ratetype" :disabled="readonly">
                              <el-option :value="d.code" :label="d.value" v-for="(d,i) in rateTypeList" :key="i"></el-option>
                            </el-select>
                          </el-col>  
                        </el-row>  
                        <el-row :gutter="10" style="padding-top:5px;">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;">
                            +&nbsp;&nbsp;{{rs.bonus}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-input size="small" v-model="scope.row.exchange.bonus" :disabled="readonly"></el-input>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-select size="small" v-model="scope.row.exchange.bonustype" :disabled="readonly">
                              <el-option :value="d.code" :label="d.value" v-for="(d,i) in rateTypeList" :key="i"></el-option>
                            </el-select>
                          </el-col>  
                        </el-row>  
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="settle_commission"
                      :label="rs.settle_commission"
                      align="center">
                      <template slot-scope="scope">
                        <el-row :gutter="10">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;">
                              {{rs.commission_rate}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-input size="small" v-model="scope.row.settled.commissionrate" :disabled="readonly"></el-input>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-select size="small"  v-model="scope.row.settled.ratetype" :disabled="readonly">
                              <el-option :value="d.code" :label="d.value" v-for="(d,i) in rateTypeList" :key="i"></el-option>
                            </el-select>
                          </el-col>  
                        </el-row>  
                        <el-row :gutter="10" style="padding-top:5px;">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;">
                              +&nbsp;&nbsp;{{rs.bonus}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-input size="small" v-model="scope.row.settled.bonus" :disabled="readonly"></el-input>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <el-select size="small" v-model="scope.row.settled.bonustype" :disabled="readonly">
                              <el-option :value="d.code" :label="d.value" v-for="(d,i) in rateTypeList" :key="i"></el-option>
                            </el-select>
                          </el-col>  
                        </el-row>  
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="100">
                      <template slot-scope="scope">
                        <span class="btntext" @click="handleDelete(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>  
    <!-- 弹出层 中英文 -->
    <language-name :sync="fullnameShow" labelName='fullname' :nameData='fullnameObj' @update:sync="fullnameShow=false"></language-name>
    <language-name :sync="shortnameShow" labelName='shortname' :nameData='shortnameObj' @update:sync="shortnameShow=false"></language-name>
  </div>
</template>

<script>
import { insertVendor, updateVendor, getVendor } from '@/api/vendorApi.js'
import axios from 'axios'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
  export default{
     data() {
      return {
        optionObj:{
         
        },
        activeNames:['1','2','3'], //折叠面板
        fullnameShow:false,//fullname弹出层显示
        shortnameShow:false,//shortname弹出层显示
        shortnameObj:{},//组件绑定值
        fullnameObj:{},//组件绑定值
        countryList:[],
        formData:{
          fullnameShow:'',
          shortnameShow:'',
          fullname:'',
          shortname:'',
          principal:'',
          corporatelicense:'',
          abn:'',
          email:'',
          contactperson:'',
          contactnumber:'',
          officetelephone:'',
          officefax:'',
          isactived:'0',
          languagetype:'',
          logoimage:'',
          logoimagemini:'',
          addressline:'',
          addressline2:'',
          suburb:'',
          state:'',
          postcode:'',
          country:'',
          bankname:'',
          accountname:'',
          bsb:'',
          accountnumber:''
        },
        validatorSave:{
          fullnameShow:{
            vaid:['noNull'],
            flg:false
          },
          shortnameShow:{
            vaid:['noNull'],
            flg:false
          },
          email:{
            vaid:['Email'],
            flg:false
          },
          contactnumber:{
            vaid:['phoneNumber'],
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
          accountnumber:{
            vaid:['Number'],
            flg:false
          },
        },
        isUpdate:false,
        actionUrl:'',
        commissions: []
      }
    },
    components: {
      'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
      'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
      'account-area': resolve => require(['@/common/AccountArea.vue'], resolve),
      'language-name': resolve => require(['@/common/LanguageName'], resolve),
     },
    methods:{
       validatorBlur(key){
        validator(this.validatorSave,this.formData,key)
      },
       change(e){
        this.$forceUpdate()
      },
      handleAddOption(){
        if(this.commissions.length>4){
          return
        }
        this.commissions.push({
          exchange:{
            ratetype:'01',
            commissionrate:'',
            bonustype:'02',
            bonus:''
          },
          settled:{
            ratetype:'01',
            commissionrate:'',
            bonustype:'02',
            bonus:''
          },
          option:'01'
        })
      },
      setOption(d,data){
        data.option = '0' + d;
        return ''
      },
      languageDialog(name){
        this[name] = true;
      },
      saveName(label){
        this.formData[label+'Show'] = this[label+'List'][this.languagetype]
        this[label+'Show'] = false;
      },
      onEditorBlur(e){
          // console.log(e.container.innerHTML);//一大推东西，你也可以输出e，看看里面的结构
      },
      progress(event, file, fileList){
        this.$store.commit('SET_SHOW_LOADING',true)
      },
      handleDelete(row){
        this.commissions.splice(this.commissions.indexOf(row),1);
      },
      validatorOption(data){
       let re = new RegExp(/\d/);
        let flag = false;
        data.forEach(ele =>{
          if(re.test(ele.exchange.commissionrate)&&re.test(ele.exchange.bonus)&&re.test(ele.settled.commissionrate)&&re.test(ele.settled.bonus)){
            if(ele.exchange.commissionrate<0||ele.exchange.bonus<0||ele.settled.commissionrate<0||ele.settled.bonus<0){
              flag = this.rs.err_msg_commission_minus
            }else{
              if(ele.exchange.commissionrate == 0&&ele.exchange.bonus==0){
                flag = this.rs.err_msg_commission_zero
              }
              if(ele.settled.commissionrate ==0 && ele.settled.bonus == 0){
                flag = this.rs.err_msg_commission_zero
              }
            }
          }else{
          flag = this.rs.err_msg_commission_format
          }
        })
        return flag
      },
      LightImg(res, file) {
        this.$store.commit('SET_SHOW_LOADING',false)
        this.formData.logoimage = file.response.path;
      },
      logoImg(res, file){
        this.$store.commit('SET_SHOW_LOADING',false)
        this.formData.logoimagemini = file.response.path;
      },
      goRouter(path){
        this.$router.push({path})
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
        delete this.formData.updatedtimestamp
        // 新增或者修改
        if(allvalidator(this.validatorSave,this.formData)){
          return
        }
        if(this.validatorOption(this.commissions)){
          this.$message.error(this.validatorOption(this.commissions));
          return
        }
        //提交转换数组字符
        this.fullnameObj['00'] = this.formData.fullnameShow;
        this.shortnameObj['00'] = this.formData.shortnameShow;
        this.formData.commissions = JSON.stringify(this.commissions)
        this.formData.fullname = JSON.stringify(this.setActionArr(this.fullnameObj))
        this.formData.shortname = JSON.stringify(this.setActionArr(this.shortnameObj))
        if(this.isUpdate){
          insertVendor(this.formData).then(res=>{
            if(res.data.success){
              this.goRouter('/master_manage/vendors')
              this.$message.success(this.rs.info_msg_insert_success)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }else{
          updateVendor(this.formData).then(res=>{
            if(res.data.success){
              this.goRouter('/master_manage/vendors')
              this.$message.success(this.rs.info_msg_update_success)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }
      }
    },
    created(){
      // OPTION_LIST 选项列表
      JSON.parse(localStorage.getItem('selectlist')).OPTION_LIST.forEach(ele =>{
        this.optionObj[ele.code] = ele.value;
      })
      // RATE_TYPE_LIST 百分百列表
      this.rateTypeList = JSON.parse(localStorage.getItem('selectlist')).RATE_TYPE_LIST;
      this.actionUrl =axios.defaults.baseURL+'vendor/uploadFile';
      // 判断页面是从新增还是修改功能进来;
      if(this.$route.params.id == 'save'){
        this.isUpdate= true;//给保存按钮识别是新增还是修改
      }
      if(this.$route.params.id == 'update'){
        this.isUpdate = false;//给保存按钮识别是新增还是修改
         if(sessionStorage.getItem('vendorid')){
          this.formData.vendorid =sessionStorage.getItem('vendorid');
        }else{
          this.formData.vendorid =this.$router.currentRoute.query.id;
          sessionStorage.setItem('vendorid',this.$router.currentRoute.query.id)
        }
        getVendor({vendorid:this.formData.vendorid}).then(res=>{
          if(res.data.success){
            var arr = res.data.data;
            this.commissions = res.data.commissions?res.data.commissions:[];
            this.formData = res.data.data;
            JSON.parse(this.formData.fullname).forEach(element => {
              this.fullnameObj[element.type] =element.content;
            });
            JSON.parse(this.formData.shortname).forEach(element => {
              this.shortnameObj[element.type] =element.content;
            });
            this.formData.fullnameShow = this.fullnameObj['00']
            this.formData.shortnameShow = this.shortnameObj['00']
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })

      }
      // 获取语言资源表数据
      var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
      this.countryList =JSON.parse(localStorage.getItem('selectlist')).Country;

    },
     computed: {
      ...mapGetters(['se','rs','languagetype','control']),
       readonly(){
        if(this.control.vendor ==='02'){
          return true
        }else{
          return false
        }
      }
    },
    watch:{
      se(val){
        this.countryList = val.Country
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>