<template>
  <div class="wrapper clearfix">
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.project_detail}} - {{project_name}}</span>
      </div>
      <div class="tools">
        <el-button class="bg_save_btn" v-if="!readonly" @click="handleSave" size="small">{{rs.save}}</el-button>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row>
        <el-col :span="24">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="title">
                    <img src="../../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.base_information}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="40">
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.full_name}} <span class="required">*</span></div>
                      <div class="content">
                        <el-input v-model="formData.fullnameShow" size="small"  :disabled="readonly" @blur="validatorBlur('fullnameShow')" maxlength="100" @input="change($event)">
                          <el-button slot="append"  @click="fullnameShow =true" v-if="!readonly"><i class="fa fa-globe" style="color:#3c8dbc"></i></el-button>
                        </el-input>
                        <p class="curtail" v-show="validatorSave.fullnameShow.flg">{{rs[validatorSave.fullnameShow.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.short_name}} <span class="required">*</span></div>
                      <div class="content">
                        <el-input v-model="formData.shortnameShow" size="small" :disabled="readonly" @blur="validatorBlur('shortnameShow')" maxlength="30" @input="change($event)">
                            <el-button slot="append"  @click="shortnameShow=true" v-if="!readonly"><i class="fa fa-globe" style="color:#3c8dbc"></i></el-button>
                          </el-input>
                          <p class="curtail" v-show="validatorSave.shortnameShow.flg">{{rs[validatorSave.shortnameShow.msg]}}</p>
                        <!-- <el-input v-model="formData.shortnameShow"   size="small" maxlength="30"  :disabled="readonly" @input="change($event)">
                          <el-button slot="append"  @click="shortnameShow = true" v-if="!readonly"><i class="fa fa-globe" style="color:#3c8dbc"></i></el-button>
                        </el-input> -->
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.estimated_completion}}</div>
                      <div class="content">
                        <el-date-picker
                          v-model="formData.estimatedcompletion"
                          :disabled="readonly"
                          style="width:100%"
                          type="date"
                          format="dd/MM/yyyy"
                          value-format="yyyy-MM-dd"
                          clearable
                          placeholder=""
                          size="small">
                        </el-date-picker>
                      </div>
                    </div>
                  </el-col>
                  
                </el-row>
                <el-row :gutter="40">
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.min_price}}</div>
                      <div class="content">
                        <el-input disabled  v-model="formData.minprice"  clearable size="small" maxlength="10" ></el-input>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.max_price}}</div>
                      <div class="content">
                        <el-input v-model="formData.maxprice" disabled clearable  size="small" maxlength="10" ></el-input>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.deposit}}</div>
                      <div class="content">
                        <el-input v-model="formData.deposit" placeholder=""  :disabled="readonly" clearable size="small" maxlength="10" @blur="validatorBlur('deposit')"></el-input>
                        <p class="curtail" v-show="validatorSave.deposit.flg">{{rs[validatorSave.deposit.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="40">
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.vendor}} <span class="required">*</span></div>
                      <div class="content">
                         <el-input v-model="vendorName" size="small" :disabled="true" clearable  @blur="validatorBlur('vendorid')">
                            <el-button slot="append"  @click="getVendorName" :disabled="readonly" ><i class="fa fa-list-ul" style="color:#3c8dbc"></i>
                            </el-button>
                          </el-input>
                        <!-- <el-select v-model="formData.vendorid" slot="prepend" size="small"
                          filterable clearable placeholder="" :disabled="readonly" style="width:100%" @blur="validatorBlur('vendorid')">
                          <el-option
                            v-for="(d,key,index) in VendorList"
                            :key="index"
                            :label="d.fullname"
                            :value="d.vendorid">
                          </el-option>
                        </el-select> -->
                        <p class="curtail" v-show="validatorSave.vendorid.flg">{{rs[validatorSave.vendorid.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.vendor_solicitor}}</div>
                      <div class="content">
                        <el-input v-model="solicitorName" size="small" :disabled="true" clearable >
                            <el-button slot="append"  @click="getSolicitiorName" v-if="!readonly"><i class="fa fa-list-ul" style="color:#3c8dbc"></i></el-button>
                        </el-input>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.builder}}</div>
                      <div class="content">
                       <el-input v-model="builderName" size="small" :disabled="true" clearable >
                            <el-button slot="append"  @click="getBuilderName" :disabled="readonly"><i class="fa fa-list-ul" style="color:#3c8dbc"></i>
                            </el-button>
                          </el-input>
                      </div>
                    </div>
                  </el-col>
                 
                </el-row>
                <el-row :gutter="40">
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.category}}<span class="required">*</span></div>
                      <div class="content">
                        <el-select v-model="formData.category" slot="prepend" size="small" clearable placeholder="" :disabled="readonly">
                          <el-option
                            v-for="(d,key,index) in categoryList"
                            :key="index"
                            :label="d.value "
                            :value="d.code">
                          </el-option>
                        </el-select>
                        <p class="curtail" v-show="validatorSave.category.flg">{{rs[validatorSave.category.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-if="isPlatform!='1'">
                    <div class="form-group ">
                      <div class="content " style="padding-top:54px;">
                          <el-checkbox v-model="formData.isshowtoagents" :disabled="readonly" true-label='1'
                          false-label='0' size="small">{{rs.show_to_agents}}</el-checkbox>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group ">
                      <div class="content " style="padding-top:54px;">
                          <el-checkbox v-model="formData.isactived" :disabled="readonly" true-label='1'
                          false-label='0' size="small">{{rs.set_as_active}}</el-checkbox>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" >
                      <!-- <div class="form-group ">
                      <div class="content " style="padding-top:54px;">
                        <el-checkbox v-model="formData.isfeatured" :disabled="readonly"
                          true-label='1' false-label='0' size="small">{{rs.set_as_featured}}
                        </el-checkbox>
                      </div>
                    </div> -->
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="form-group">
                      <div class="sub-title">{{rs.special}}</div>
                      <div class="content">
                        <el-select size="small" v-model="specialList" multiple placeholder="" :disabled="readonly"  style="width:100%" clearable>
                          <el-option
                          v-for="item in specialSelect"
                          :key="item.code"
                          :label="item.value"
                          :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="2">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/Address_icon_wz@2x.png" alt=""><span>{{rs.address}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                <el-row :gutter="20" >
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <address-area :formData="formData" :validatorSave='validatorSave' :readonly="readonly"></address-area>
                    <div class="form-group">
                      <div class="sub-title">{{rs.coordinate}}  <span class="required">*</span></div>
                      <div class="content">
                        <el-row :gutter="20">
                          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                            <el-input v-model="formData.longitude" placeholder=""  :disabled="true" size="small" @blur="validatorBlur('longitude')"></el-input>
                              <p class="curtail" v-show="validatorSave.longitude.flg">{{rs[validatorSave.longitude.msg]}}</p>
                          </el-col>
                          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                            <el-input v-model="formData.latitude" placeholder=""  :disabled="true" size="small" @blur="validatorBlur('latitude')"></el-input>
                              <p class="curtail" v-show="validatorSave.latitude.flg">{{rs[validatorSave.latitude.msg]}}</p>
                          </el-col>
                          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                            <div class="content">
                              <el-button   class="small bg_blue" size="small" @click="setmap" v-if="!readonly">{{rs.get_coordinate}}</el-button>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <bing-map-layer
                      :singleAddress="singleaddress"
                      :isCoordinate="mod"
                      :callback="showDailog"
                      @getLocationNums="getLocationNums"
                      :onInitSuccess="init"
                      :isClickable='true'
                      style="height:320px;width:100%;margin:10px 10px 5px 0;">
                      >
                    </bing-map-layer>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row> 
       <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="5">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="title">
                    <span class="quill_text_color">{{rs.short_description}}</span>
                    <img :src="languageImgShort" alt="" class="languageLogo"  @click.stop="langtoggleShort = !langtoggleShort" >
                    <ul class="lag language" v-show="langtoggleShort" >
                      <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionTypeShort(d)">
                        <img :src="d.countryflag" alt=""  class="user-image"  ><span style="font-size: 12px;padding-left:10px">{{d.languagename}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <div class="form-group">
                      <div style="padding: 10px 0">{{rs.sensitive_info}}</div>
                      <div class="content" >
                        <quill-editor :options="editorOption" :disabled="readonly " @change="alertValue3($event,'strValue',3000)" v-model="shortdescription[shortdescriptiontype]">
                        </quill-editor>
                          <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength3),'%2',SurplusLength3)}}</div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="6">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <span class="quill_text_color">{{rs.description}}</span>
                    <img :src="languageImg" alt="" class="languageLogo" @click.stop="langtoggle = !langtoggle" >
                    <ul class="lag language" v-show="langtoggle">
                      <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionType(d)">
                        <img :src="d.countryflag" alt=""  class="user-image"  ><span style="font-size: 12px;padding-left:10px">{{d.languagename}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <div class="form-group">
                      <div style="padding: 10px 0">{{rs.sensitive_info}}</div>
                      <div class="content" >
                        <quill-editor :options="editorOption" :disabled="readonly" @change="alertValue4($event,'strValue',5000)" v-model="description[descriptiontype]">
                        </quill-editor>
                          <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength4),'%2',SurplusLength4)}}</div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="3">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <span class="quill_text_color">{{rs.how_to_sell}}</span>
                      <img :src="languageImgShort1" alt="" class="languageLogo"  @click.stop="langtoggleShort1 = !langtoggleShort1" >
                      <ul class="lag language" v-show="langtoggleShort1" >
                        <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionTypeShort1(d)">
                          <img :src="d.countryflag" alt=""  class="user-image"  ><span style="font-size: 12px;padding-left:10px">{{d.languagename}}</span>
                        </li>
                      </ul>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="content" >
                        <quill-editor :options="editorOption" :disabled="readonly" @change="alertValue1($event,'strValue',500)" v-model="shortdescription1[shortdescriptiontype1]"  ></quill-editor>
                        <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength1),'%2',SurplusLength1)}}</div>

                        <!-- <h3 class="append_note">{{rs.append_note}}</h3>

                        <quill-editor :options="editorOption" @change="alertValue5($event,'strValue',500)" v-model="shortdescription3[shortdescriptiontype3]"  :disabled="readonly"></quill-editor>
                        <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength5),'%2',SurplusLength5)}}</div> -->
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="4">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="title">
                    <span class="quill_text_color">{{rs.office_use}}</span>
                    <img :src="languageImgShort2" alt="" class="languageLogo"  @click.stop="langtoggleShort2 = !langtoggleShort2" >
                    <ul class="lag language" v-show="langtoggleShort2" >
                      <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionTypeShort2(d)">
                        <img :src="d.countryflag" alt=""  class="user-image"  ><span style="font-size: 12px;padding-left:10px">{{d.languagename}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="content" >
                        <quill-editor :options="editorOption" :disabled="readonly" @change="alertValue2($event,'strValue',500)" v-model="shortdescription2[shortdescriptiontype2]"  ></quill-editor>
                        <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength2),'%2',SurplusLength2)}}</div>

                        <!-- <h3 class="append_note">{{rs.append_note}}</h3>
                        <quill-editor :options="editorOption" :disabled="readonly" @change="alertValue6($event,'strValue',500)" v-model="shortdescription4[shortdescriptiontype4]"  ></quill-editor>
                        <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength6),'%2',SurplusLength6)}}</div> -->
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
     
    </div>
    </form>
    <select-solicitor :sync="solicitorShow" @select="setSolicitorName" @update:sync="solicitorShow=false"></select-solicitor>
    <select-vendor :sync="vendorShow" @select="setVendorName" @update:sync="vendorShow=false"></select-vendor>
    <select-builder :sync="builderShow" @select="setBuilderName" @update:sync="builderShow=false"></select-builder>
    <language-name :sync="fullnameShow" labelName='fullname' :nameData='fullnameObj'  @update:sync="fullnameShow=false"></language-name>
    <language-name :sync="shortnameShow" labelName='shortname' :nameData='shortnameObj'  @update:sync="shortnameShow=false"></language-name>
  </div>
</template>
<script>
import { insertProject, getProject, getPlatformProject, updateProject } from '@/api/projectApi.js'
import { getVendorList } from '@/api/vendorApi.js'
import { getSolicitorList } from '@/api/solicitorApi.js'
import { getBuilderList } from '@/api/builderApi.js'
import { validator, allvalidator } from '@/validator/validator.js'
import { Message } from 'element-ui'
import { toAddressString } from "@/assets/js/utility.js"
import { quillEditor } from 'vue-quill-editor'
import { mapGetters } from "vuex";
// 对日期插件英文化
import Vue from 'vue'
import { DatePicker} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
Vue.component(DatePicker)
export default{
  data() {
    return {
      editorOption:{
        modules:{
          toolbar:[
          ['bold', 'italic', 'underline',{ 'color': [] },{ 'list': 'ordered'}, { 'list': 'bullet' },'clean'],
          []
          ]
        }
      },
      singleaddress:{
        code:'',
        text:''
      },//地图地址
      mod:false,
      isFullEdit:'0',
      isPlatform:'0',
      countryObj:{},
      countryList:[],
      activeNames:['1','2','3','4','5','6'], //折叠面板
      total:0,//总条数
      start:1,//起始页
      end:10, //结束页
      solicitorShow:false,
      vendorShow:false,
      builderShow:false,
      descriptiontype:'',
      shortdescriptiontype:'',
      shortdescriptiontype1:'',
      shortdescriptiontype3:'',
      shortdescriptiontype2:'',
      shortdescriptiontype4:'',
      langtoggleShort:false,//descriptionShort
      langtoggleShort1:false,
      langtoggleShort2:false,
      langtoggle:false,//description
      languageImgShort:'',//descriptionShort
      languageImgShort1:'',
      languageImgShort2:'',
      languageImg:'',//description
      description:{},//
      shortdescription:{},//
      shortdescription1:{},
      shortdescription3:{},
      shortdescription2:{},
      shortdescription4:{},
      nowLength1:0,
      SurplusLength1:500,
      nowLength5:0,
      SurplusLength5:500,
      nowLength2:0,
      SurplusLength2:500,
       nowLength6:0,
      SurplusLength6:500,
      nowLength3:0,
      SurplusLength3:3000,
      nowLength4:0,
      SurplusLength4:5000,
      fullnameShow:false,//fullname弹出层显示
      shortnameShow:false,//shortname弹出层显示
      shortnameObj:{},//组件绑定值
      fullnameObj:{},//组件绑定值
      projectid:'',
      specialList:[],
      specialSelect:[],
      VendorList:[],//供应商
      categoryList:[],
      SolicitorList:[],//律师
      solicitorName:'',//选择的律师名
      vendorName:'',
      builderName:'',
      BuildList:[],//建筑商
      langList:[],
      project_name:'',
      getSolicitorData:{
        pagenum:1,
        pagesize:10,
        condition:'',
        isactived:'1'
      },
      formData:{
        agencyprojectid:'',
        fullnameShow:'',
        shortnameShow:'',
        fullname:'',
        shortname:'',
        minprice:'',
        maxprice:'',
        deposit:'',
        addressline:'',
        addressline2:'',
        builderid:'',
        category:'',
        country:'',
        howtosale:'',
        newhowtosale:'',
        isactived:"0",
        languagetype:"01",
        officeuse:'',
        newofficeuse:'',
        postcode:'',
        shortdescription:'',
        shortdescription1:'',
        shortdescription3:'',
        shortdescription2:'',
        shortdescription4:'',
        solicitorid:'',
        state:'',
        isshowtoagents:'',
        suburb:'',
        vendorid:'',
        special:'',
        longitude:'',
        latitude:'',
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
        deposit:{
          vaid:['Number'],
          flg:false
        },
        vendorid :{
          vaid:['noNull'],
          flg:false
        },
        postcode:{
          vaid:['Number'],
          flg:false
        },
        longitude:{
          vaid:['noNull'],
          flg:false
        },
        latitude:{
          vaid:['noNull'],
          flg:false
        },
        category:{
          vaid:['noNull'],
          flg:false
        },
      },
    }
  },
  components: {
    // 'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'language-name': resolve => require(['@/common/LanguageName'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
      'select-vendor':resolve=> require(['@/common/SelectVendor.vue'],resolve),
    'select-builder':resolve=> require(['@/common/SelectBuilder.vue'],resolve),
    'select-solicitor':resolve=> require(['@/common/SelectSolicitor.vue'],resolve),
    
    'bing-map-layer':resolve=> require(['@/common/BingMapLayer.vue'],resolve),
    // 'navigation':resolve=> require(['../edit_project/template/navigation.vue'],resolve),
    },
  methods:{
    setNumber(num) {
      return '$' + (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    replaceString(oldStr, repStr, newStr) {
      return oldStr.replace(repStr, newStr)
    },
    search(){
      this.getSolicitorData.pagenum =1;
      this.getSolicitor(this.getSolicitorData)
    },
    handleCurrentChange(val) {//第几页
      this.getSolicitorData.pagenum = val;
      this.getSolicitor(this.getSolicitorData)
    },
    alertValue1(e,strValue,decimalNum){
      e.quill.deleteText(decimalNum,1,strValue);//保留 strValue 的 前 decimalNum 位字符，
      this.nowLength1 = e.text.length-1;
      // this.SurplusLength1 = decimalNum - e.text.length+1;
      if(this.nowLength1>decimalNum){
        this.nowLength1 = decimalNum;
      }
      if(this.SurplusLength1<0){
        this.SurplusLength1 = 0;
      }
    },
    alertValue5(e,strValue,decimalNum){
      e.quill.deleteText(decimalNum,1,strValue);//保留 strValue 的 前 decimalNum 位字符，
      this.nowLength5 = e.text.length-1;
      // this.SurplusLength5 = decimalNum - e.text.length+1;
      if(this.nowLength5>decimalNum){
        this.nowLength5 = decimalNum;
      }
      if(this.SurplusLength5<0){
        this.SurplusLength5 = 0;
      }
    },
    alertValue6(e,strValue,decimalNum){
      e.quill.deleteText(decimalNum,1,strValue);//保留 strValue 的 前 decimalNum 位字符，
      this.nowLength6 = e.text.length-1;
      // this.SurplusLength6 = decimalNum - e.text.length+1;
      if(this.nowLength6>decimalNum){
        this.nowLength6 = decimalNum;
      }
      if(this.SurplusLength1<0){
        this.SurplusLength1 = 0;
      }
    },
    alertValue2(e,strValue,decimalNum){
      e.quill.deleteText(decimalNum,1,strValue);//保留 strValue 的 前 decimalNum 位字符，
      this.nowLength2 = e.text.length-1;
      // this.SurplusLength2 = decimalNum - e.text.length+1;
       if(this.nowLength2>decimalNum){
        this.nowLength2 = decimalNum;
      }
      if(this.SurplusLength2<0){
        this.SurplusLength2 = 0;
      }
    },
    alertValue3(e,strValue,decimalNum){
      e.quill.deleteText(decimalNum,1,strValue);//保留 strValue 的 前 decimalNum 位字符，
      this.nowLength3 = e.text.length-1;
      // this.SurplusLength3 = decimalNum - e.text.length+1;
       if(this.nowLength3>decimalNum){
        this.nowLength3 = decimalNum;
      }
      if(this.SurplusLength3<0){
        this.SurplusLength3 = 0;
      }
    },
    alertValue4(e,strValue,decimalNum){
      e.quill.deleteText(decimalNum,1,strValue);//保留 strValue 的 前 decimalNum 位字符，
      this.nowLength4 = e.text.length-1;
      // this.SurplusLength4 = decimalNum - e.text.length+1;
       if(this.nowLength4>decimalNum){
        this.nowLength4 = decimalNum;
      }
      if(this.SurplusLength4<0){
        this.SurplusLength4 = 0;
      }
    },
    // 地图
    getLocationNums (...data) {
      this.position = data[0];
    },
    // 回调
    showDailog(code, pos_x, pos_y, latitude, longitude) {
      this.formData.latitude = latitude;
      this.formData.longitude = longitude;
    },
    init(){
      this.mod=true;
      this.singleaddress = {
        code:'001',
        text:toAddressString(this.formData, false),
        longitude:this.formData.longitude,
        latitude:this.formData.latitude,
        category: this.formData.category
      }

    },
    //
    setmap(){
      this.mod=false;
      this.singleaddress = {
        code:'001',
        text:toAddressString(this.formData, false),
        category: this.formData.category
      }
      this.singleaddress = Object.assign({},this.singleaddress)
    },
    // 转换成提交数组
    setActionArr(data){
      let actionArr=[]
      for (var Key in data){
        actionArr.push({type:Key,content:data[Key]})
      }
      return JSON.stringify(actionArr)
    },
    setSpecialStr(data){
      let specialArr=[]
      if(data.length == 0){
        return ''
      }
      data.forEach(element => {
        specialArr.push({featuretype:element})
      });
      return JSON.stringify(specialArr)
    },
    handleSave(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      this.formData.projectid = this.projectid;
      delete this.formData.specialvalue
      delete this.formData.updatedtimestamp;
      delete this.formData.accepted;
      delete this.formData.agencyid;
      
      delete this.formData.buildername;
      delete this.formData.contactname;
      delete this.formData.contactperson;
      delete this.formData.deletedflag;
      delete this.formData.filepath;
      delete this.formData.sharedfromagencyid;
      delete this.formData.vendorname;
      delete this.formData.maxprice
      delete this.formData.minprice
      this.fullnameObj['00'] = this.formData.fullnameShow;
      this.shortnameObj['00'] = this.formData.shortnameShow;
      this.formData.special = this.setSpecialStr(this.specialList);
      this.formData.fullname = this.setActionArr(this.fullnameObj)
      this.formData.shortname = this.setActionArr(this.shortnameObj)
      this.formData.description = this.setActionArr(this.description)
      this.formData.shortdescription = this.setActionArr(this.shortdescription)
      this.formData.officeuse = this.setActionArr(this.shortdescription2)
      this.formData.howtosale = this.setActionArr(this.shortdescription1)
      this.formData.newhowtosale = this.setActionArr(this.shortdescription3)
      this.formData.newofficeuse = this.setActionArr(this.shortdescription4)
      this.formData.agencyprojectid = JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
      this.formData.deposit=this.formData.deposit;
      updateProject(this.formData).then(res=>{
        if(res.data.success){
          if(sessionStorage.getItem('isView') ==1){
            this.$router.push({path:'/project_manage/allProjects'})
          }
          if(sessionStorage.getItem('isView') ==2){
            this.$router.push({path:'/project_manage/allProjects2'})
          }
          this.$message.success(this.rs.info_msg_update_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    setName(name){
      this[name] = true;
    },
     setSolicitorName(row){
      // 获取律师ID,把律师名字显示出来,关闭弹出层
      this.formData.solicitorid =row.solicitorid;
      this.solicitorName = row.firstname+ '  ' +row.lastname;
      this.solicitorShow = false;
    },
    setVendorName(row){
      // vendorName
      // 获取开发商ID,把开发商名字显示出来,关闭弹出层
      this.formData.vendorid =row.vendorid;
      this.vendorName = row.shortname;
      this.vendorShow = false;
    },
    setBuilderName(row){
      // vendorName
      // 获取建筑商ID,把建筑商名字显示出来,关闭弹出层
      this.formData.builderid =row.builderid;
      this.builderName = row.shortname;
      this.builderShow = false;
    },
    getSolicitiorName(){
      // 显示律师弹出层
      this.solicitorShow = true;
    },
    getVendorName(){
      this.vendorShow = true;
    },
     getBuilderName(){
      this.builderShow = true;
    },
    saveName(label){
      this.formData[label+'Show'] = this[label+'List'][this.languagetype]
      this[label+'Show'] = false;
    },
    // setSolicitorName(row){
    //   this.formData.solicitorid =row.solicitorid;
    //   this.solicitorName = row.firstname+ '  ' +row.lastname;
    //   this.solicitorShow = false;
    // },
    // getSolicitiorName(){
    //   // 显示律师弹出层
    //   this.solicitorShow = true;
    // },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    getSolicitor(data){
      getSolicitorList(data).then(res=>{
        if(res.data.success){
          this.SolicitorList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    toggleDescriptionTypeShort1(d){
      this.shortdescriptiontype1 =d.languageid;
      this.shortdescriptiontype3 =d.languageid;
      this.languageImgShort1 = d.countryflag;
      this.langtoggleShort1 =false;
    },
    toggleDescriptionTypeShort2(d){
      this.shortdescriptiontype2 =d.languageid;
      this.shortdescriptiontype4 =d.languageid;
      this.languageImgShort2 = d.countryflag;
      this.langtoggleShort2 =false;
    },
      toggleDescriptionTypeShort(d){
      this.shortdescriptiontype =d.languageid;
      this.languageImgShort = d.countryflag;
      this.langtoggleShort =false;
    },
    change(e){
      this.$forceUpdate()
    },
    toggleDescriptionType(d){
      this.descriptiontype =d.languageid;
      this.languageImg = d.countryflag;
      this.langtoggle =false;
    },
    getBuild(data){
      getBuilderList(data).then(res=>{
        if(res.data.success){
          this.BuildList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getVendor(data){
      getVendorList(data).then(res=>{
        if(res.data.success){
          this.VendorList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      });
    },
    getName(){
      let text = ''
      JSON.parse(JSON.parse(sessionStorage.getItem('ProjectList')).shortname).forEach(ele => {
         if (ele.type=='00') {
          text = ele.content
        }
        if (ele.type==localStorage.getItem('languagetype')) {
          if (ele.content==''||ele.content==undefined) {
            this.project_name = text
          }else{
            this.project_name = ele.content
          }
        }
      });
    },
    getProjectData(data) {
      if (this.isPlatform == '1') {
        return getPlatformProject(data);
      } else {
        return getProject(data);
      }
    }
  },
  created(){
    this.isPlatform = sessionStorage.getItem('isPlatform');
    this.isFullEdit = sessionStorage.getItem('isFullEdit');
      // 获取语言资源表数据
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.specialSelect=JSON.parse(localStorage.getItem('selectlist')).PROJECT_FEATURE_LIST
    this.categoryList =JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST
    this.formData.languagetype=localStorage.getItem('languagetype')
    this.projectid =this.$router.currentRoute.params.id;
    this.descriptiontype= localStorage.getItem('languagetype');
    this.shortdescriptiontype= localStorage.getItem('languagetype');
    this.shortdescriptiontype1= localStorage.getItem('languagetype');
    this.shortdescriptiontype3= localStorage.getItem('languagetype');
    this.shortdescriptiontype2= localStorage.getItem('languagetype');
    this.shortdescriptiontype4= localStorage.getItem('languagetype');
    this.countryList = JSON.parse(localStorage.getItem('selectlist')).Country;
    this.countryList.forEach(element => {
      this.countryObj[element.countryid] =element.countryname;
    });
    this.countryObj = Object.assign({},this.countryObj)
    this.langList.forEach(ele=>{
      if(ele.languageid == localStorage.getItem('languagetype')){
        this.languageImg = ele.countryflag
        this.languageImgShort = ele.countryflag
        this.languageImgShort1 = ele.countryflag
        this.languageImgShort2 = ele.countryflag
      }
    })
    // getVendorList 供应商
    this.getVendor({languagetype:localStorage.getItem('languagetype'),isactived:'1'});
    // 律师
    this.getSolicitor(this.getSolicitorData);
    // 建筑商
    this.getBuild({languagetype:localStorage.getItem('languagetype'),isactived:'1'})
  //  获取该项目的信息
    this.getProjectData({projectid:this.$router.currentRoute.params.id}).then(res=>{
      if(res.data.success){
        this.formData = res.data.data;
        this.setmap();//防止地图加载完成后才获取到接口数据时候，地图图标无法显示
        this.formData.maxprice = this.setNumber(res.data.data.maxprice)
        this.formData.minprice = this.setNumber(res.data.data.minprice)
        sessionStorage.setItem('ProjectList',JSON.stringify(res.data.data))
        sessionStorage.setItem('vendorid',res.data.data.vendorid)
        this.solicitorName = res.data.data.solicitorname;
        let vendorNameObj = {};
        
        let builderNameObj = {};
        if(res.data.data.vendorname){
          JSON.parse(res.data.data.vendorname).forEach(ele=>{
            vendorNameObj[ele.type] = ele.content
          })
        this.vendorName = vendorNameObj[localStorage.getItem('languagetype')]?vendorNameObj[localStorage.getItem('languagetype')]:vendorNameObj['00'];
        }
        if(res.data.data.buildername){
           JSON.parse(res.data.data.buildername).forEach(ele=>{
            builderNameObj[ele.type] = ele.content
          })
        this.builderName = builderNameObj[localStorage.getItem('languagetype')]?builderNameObj[localStorage.getItem('languagetype')]:builderNameObj['00'];
        }
       
        res.data.data.special.forEach(element => {
          this.specialList.push(element.featuretype)
        });
        JSON.parse(res.data.data.description).forEach(element => {
          this.description[element.type] =element.content?element.content:'';
        });
        JSON.parse(res.data.data.shortdescription).forEach(element => {
          this.shortdescription[element.type] =element.content?element.content:'';
        });
        JSON.parse(res.data.data.officeuse).forEach(element => {
          this.shortdescription2[element.type] = element.content?element.content:'';
        });
        JSON.parse(res.data.data.newofficeuse).forEach(element => {
          this.shortdescription4[element.type] = element.content?element.content:'';
        });
        JSON.parse(res.data.data.howtosale).forEach(element => {
          this.shortdescription1[element.type] =element.content?element.content:'';
        });
        JSON.parse(res.data.data.newhowtosale).forEach(element => {
          this.shortdescription3[element.type] =element.content?element.content:'';
        });
        JSON.parse(this.formData.fullname).forEach(element => {
          this.fullnameObj[element.type] =element.content;
        });
        JSON.parse(this.formData.shortname).forEach(element => {
          this.shortnameObj[element.type] =element.content;
        });
        this.formData.fullnameShow = this.fullnameObj['00']
        this.formData.shortnameShow = this.shortnameObj['00'];
        this.getName();
        this.$nextTick(()=>{
          window.scrollTo(0,0);
        })

      }else{
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      }
    });

  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.project_detail ==='02' || this.isFullEdit === '0'){
        return true
      }else{
        return false
      }
    },
  },
  watch:{
    se(val){
      this.langList= val.Language;
      this.specialSelect=val.PROJECT_FEATURE_LIST
      this.categoryList = val.PROJECT_CATEGORY_LIST;
      val.Country.forEach(element => {
        this.countryObj[element.countryid] =element.countryname;
      });
    },

    languagetype(val){
      this.shortdescriptiontype =val;
      this.shortdescriptiontype1 =val;
      this.shortdescriptiontype3 =val;
      this.shortdescriptiontype2 =val;
      this.shortdescriptiontype4 =val;
      this.descriptiontype =val;
      this.getBuild({languagetype:val,isactived:'1'})
      this.getVendor({languagetype:val,isactived:'1'})
      this.langList.forEach(ele=>{
      if(ele.languageid == val){
        this.languageImg = ele.countryflag
        this.languageImgShort = ele.countryflag
        this.languageImgShort1 = ele.countryflag
        this.languageImgShort2 = ele.countryflag
      }
      });
      this.getName();
      this.$nextTick(()=>{
      window.scrollTo(0,0);
      })
    }
  },
}

</script>
<style scoped>
.title{
  position: relative;
}
.box-body {
  padding-top: 0 !important;
}
/* .lag.language> li {
    height: 35px;
    line-height: 35px;
    text-align: left;
    padding: 0 10px;
} */
.append_note{
  padding: 10px 0;
}
</style>

