<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.project_detail}}</span>
          <span class="sub_text">[{{rs.add}}]</span>
        </div>
        <div class="tools">
          <el-button   class="bg_save_btn" @click="handleSave" size="small">{{rs.save}}</el-button>
        </div>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="40">
          <el-col :span="24">
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/page/addProject_1.png" alt="">
                      <span>{{rs.base_information}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="form-group">
                        <div class="sub-title-first">{{rs.full_name}} <span class="required">*</span></div>
                        <div class="content">
                          <el-input v-model="formData.fullnameShow" clearable  size="small" @blur="validatorBlur('fullnameShow')" maxlength="100"  @input="change($event)">
                            <el-button slot="append"  @click="fullnameShow=true" :disabled="readonly" ><i class="fa fa-globe" style="color:#3c8dbc"></i></el-button>
                          </el-input>
                          <p class="curtail" v-show="validatorSave.fullnameShow.flg">{{rs[validatorSave.fullnameShow.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="form-group">
                        <div class="sub-title-first">{{rs.short_name}}<span class="required">*</span></div>
                        <div class="content">
                          <el-input v-model="formData.shortnameShow" clearable  size="small" maxlength="30" @blur="validatorBlur('shortnameShow')"  @input="change($event)">
                            <el-button slot="append"  @click="shortnameShow=true" :disabled="readonly"><i class="fa fa-globe" style="color:#3c8dbc"></i>
                               </el-button>
                          </el-input>
                          <p class="curtail" v-show="validatorSave.shortnameShow.flg">{{rs[validatorSave.shortnameShow.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="form-group">
                        <div class="sub-title-first">{{rs.estimated_completion}}</div>
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
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="form-group">
                        <div class="sub-title">{{rs.deposit}}</div>
                        <div class="content">
                          <el-input v-model="formData.deposit" placeholder=""  :disabled="readonly" clearable size="small" maxlength="10" @blur="validatorBlur('deposit')"></el-input>
                          <p class="curtail" v-show="validatorSave.deposit.flg">{{rs[validatorSave.deposit.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="form-group">
                        <div class="sub-title">{{rs.vendor}} <span class="required">*</span></div>
                        <div class="content">
                          <el-input v-model="vendorName" size="small" :disabled="true" clearable  @blur="validatorBlur('vendorid')">
                            <el-button slot="append"  @click="getVendorName" :disabled="readonly"><i class="fa fa-list-ul" style="color:#3c8dbc"></i>
                            </el-button>
                          </el-input>
                           <p class="curtail" v-show="validatorSave.vendorid.flg">{{rs[validatorSave.vendorid.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="form-group">
                        <div class="sub-title">{{rs.vendor_solicitor}}</div>
                        <div class="content">
                          <el-input v-model="solicitorName" size="small" :disabled="true" clearable >
                            <el-button slot="append"  @click="getSolicitiorName" :disabled="readonly"><i class="fa fa-list-ul" style="color:#3c8dbc"></i>
                            </el-button>
                          </el-input>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="form-group">
                        <div class="sub-title">{{rs.builder}}</div>
                        <div class="content">
                          <el-input v-model="builderName" size="small" :disabled="true" clearable >
                            <el-button slot="append"  @click="getBuilderName"  :disabled="readonly"><i class="fa fa-list-ul" style="color:#3c8dbc"></i>
                            </el-button>
                          </el-input>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="form-group">
                        <div class="sub-title">{{rs.status}}<span class="required">*</span></div>
                        <div class="content">
                          <el-select v-model="formData.status" slot="prepend" clearable size="small" :disabled="readonly" style="width:100%"
                            placeholder="" >
                            <el-option :label="rs.on_market" value="01"></el-option>
                            <el-option :label="rs.off_market" value="02"></el-option>
                          </el-select>
                          <p class="curtail" v-show="validatorSave.status.flg">{{rs[validatorSave.status.msg]}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
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
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="form-group">
                        <div class="content fl" style="padding-top:54px;">
                          <el-checkbox v-model="formData.isfeatured"   :disabled="readonly"
                            true-label='1' false-label='0' size="small">{{rs.set_as_featured}}
                          </el-checkbox>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
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
        <el-row>
          <el-col :span="24">
            <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
              <el-collapse-item name="2">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/page/addProject_2.png" alt=""><span>{{rs.address}}</span>
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
                              <el-input v-model="formData.longitude" placeholder="" :disabled="true" size="small" @blur="validatorBlur('longitude')"></el-input>
                                <p class="curtail" v-show="validatorSave.longitude.flg">{{rs[validatorSave.longitude.msg]}}</p>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                              <el-input v-model="formData.latitude" placeholder="" :disabled="true" size="small"  @blur="validatorBlur('latitude')"></el-input>
                                <p class="curtail" v-show="validatorSave.latitude.flg">{{rs[validatorSave.latitude.msg]}}</p>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8"> 
                              <div class="content">
                                <el-button   class="small bg_blue" size="small" @click="setmap" >{{rs.get_coordinate}}</el-button>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                      <!-- <el-row :gutter="20" style="padding-top:54px;">
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <el-input v-model="formData.longitude" placeholder="" :disabled="true" size="small" @blur="validatorBlur('longitude')"></el-input>
                            <p class="curtail" v-show="validatorSave.longitude.flg">{{rs[validatorSave.longitude.msg]}}</p>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <el-input v-model="formData.latitude" placeholder="" :disabled="true" size="small"  @blur="validatorBlur('latitude')"></el-input>
                            <p class="curtail" v-show="validatorSave.latitude.flg">{{rs[validatorSave.latitude.msg]}}</p>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8"> 
                          <div class="content">
                            <el-button class="small bg_blue" size="small" @click="setmap" >{{rs.get_coordinate}}</el-button>
                          </div>
                        </el-col>
                      </el-row> -->
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <bing-map-layer
                        :singleAddress="singleaddress"
                        :isCoordinate="mod"
                        :callback="showDailog"
                        @getLocationNums="getLocationNums"
                        :isClickable='true'
                        style="height:320px;width:100%;margin:10px 10px 5px 0;">
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
                    <div class="title" style="position:relative">
                      <span class="quill_text_color">{{rs.short_description}}</span>
                      <img :src="languageImgShort" alt="" class="languageLogo"  @click.stop="langtoggleShort = !langtoggleShort" >
                      <ul class="lag" v-show="langtoggleShort" style="left:80px">
                        <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionTypeShort(d)">
                          <img :src="d.countryflag" alt=""  class="user-image"  ><span style="font-size: 12px;padding-left:10px">{{d.languagename}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <el-row>
                    <el-col :span="24">
                      <div class="form-group">
                        <div class="content" >
                          <quill-editor :options="editorOption" @change="alertValue3($event,'strValue',3000)" v-model="shortdescription[shortdescriptiontype]" :disabled="readonly">
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
                  <div class="box-header-with-collapse clearfix ">
                    <div class="title" style="position:relative">
                      <span class="quill_text_color">{{rs.description}}</span>
                      <img :src="languageImg" alt="" class="languageLogo"  @click.stop="langtoggle = !langtoggle" >
                      <ul class="lag" v-show="langtoggle" style="left:80px">
                        <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionType(d)">
                          <img :src="d.countryflag" alt=""  class="user-image" ><span style="font-size: 12px;padding-left:10px">{{d.languagename}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <el-row>
                    <el-col :span="24">
                      <div class="form-group">
                        <div class="content" >
                          <quill-editor :options="editorOption"  @change="alertValue4($event,'strValue',5000)" v-model="description[descriptiontype]" :disabled="readonly">
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
                  <div class="box-header-with-collapse clearfix ">
                    <div class="title" style="position:relative">
                      <span class="quill_text_color">{{rs.how_to_sell}}</span>
                      <img :src="languageImgShort1" alt="" class="languageLogo"  @click.stop="langtoggleShort1 = !langtoggleShort1" >
                      <ul class="lag" v-show="langtoggleShort1" style="left:80px">
                        <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionTypeShort1(d)">
                          <img :src="d.countryflag" alt=""  class="user-image" ><span style="font-size: 12px; padding-left:10px">{{d.languagename}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <el-row>
                    <el-col :span="24">
                      <div class="form-group">
                        <div class="content" >
                          <quill-editor :options="editorOption"  @change="alertValue1($event,'strValue',500)"  v-model="shortdescription1[shortdescriptiontype1]" :disabled="readonly"></quill-editor>
                          <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength1),'%2',SurplusLength1)}}</div>
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
                    <div class="title" style="position:relative">
                      <span class="quill_text_color">{{rs.office_use}}</span>
                      <img :src="languageImgShort2" alt="" class="languageLogo"  @click.stop="langtoggleShort2 = !langtoggleShort2" >
                      <ul class="lag" v-show="langtoggleShort2" style="left:80px">
                        <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionTypeShort2(d)">
                          <img :src="d.countryflag" alt=""  class="user-image" ><span style="font-size: 12px;padding-left:10px">{{d.languagename}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <el-row>
                    <el-col :span="24">
                      <div class="form-group">
                        <div class="content" >
                          <quill-editor :options="editorOption"  @change="alertValue2($event,'strValue',500)" v-model="shortdescription2[shortdescriptiontype2]" :disabled="readonly"></quill-editor>
                          <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength2),'%2',SurplusLength2)}}</div>
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
     <!-- ========================================= -->
     <!-- 弹出层 -->
    <select-solicitor :sync="solicitorShow" @select="setSolicitorName" @update:sync="solicitorShow=false"></select-solicitor>
    <select-vendor :sync="vendorShow" @select="setVendorName" @update:sync="vendorShow=false"></select-vendor>
    <select-builder :sync="builderShow" @select="setBuilderName" @update:sync="builderShow=false"></select-builder>
    <language-name :sync="fullnameShow" labelName='fullname' :nameData='fullnameObj' @update:sync="fullnameShow=false"></language-name>
    <language-name :sync="shortnameShow" labelName='shortname' :nameData='shortnameObj' @update:sync="shortnameShow=false"></language-name>
  </div>
</template>
<script>
import { insertProject } from '@/api/projectApi.js'
import { Message } from 'element-ui'
import { quillRedefine } from 'vue-quill-editor-upload'
import { quillEditor } from 'vue-quill-editor'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import { toAddressString } from "@/assets/js/utility.js"
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
    specialSelect:[],
    specialList:[],
    editorOption:{
      placeholder: 'Insert text here ...',
      modules:{
        toolbar:[
        ['bold', 'italic', 'underline',{ 'color': [] },{ 'list': 'ordered'}, { 'list': 'bullet' },'clean'],
        []
        ]
      }
    },
    singleaddress:{},//地图地址
    nowLength1:0,
    SurplusLength1:500,
    nowLength2:0,
    SurplusLength2:500,
    nowLength3:0,
    SurplusLength3:3000,
    nowLength4:0,
    SurplusLength4:5000,
    mod:false,
    descriptiontype:'',
    solicitorName:'',
    vendorName:'',
    builderName:'',
    description:{},
    shortdescriptiontype:'',
    shortdescription:{},
    shortdescription1:{},
    shortdescription2:{},
    total:0,//总条数
    start:1,//起始页
    end:10, //结束页
    activeNames:['1','2','3','4','5','6'], //折叠面板
    fullnameShow:false,//fullname弹出层显示
    shortnameShow:false,//shortname弹出层显示
    shortnameObj:{},//组件绑定值
    fullnameObj:{},//组件绑定值
    solicitorShow:false,
    vendorShow:false,
    builderShow:false,
    countryList:[],//国际区域
    countryObj:{},
    langtoggle:false,//description
    languageImg:'',//description
    descriptionType:'',//description
    langtoggleShort:false,//descriptionShort
    langtoggleShort1:false,
    langtoggleShort2:false,
    languageImgShort:'',//descriptionShort
    SolicitorList:[],//律师
    labelName:'',//标签名
    langList:[],
    categoryList:[],
    formData:{
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
      category:'01',
      country:'',
      description:'',
      howtosale:'',
      isfeatured:'0',
      isactived:'0',
      officeuse:'',
      postcode:'',
      shortdescription:'',
      shortdescription1:'',
      shortdescription2:'',
      solicitorid:'',
      state:'',
      status:'01',
      suburb:'',
      vendorid:'',
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
      // shortnameShow
      minprice:{
        vaid:['Number'],
        flg:false
      },
      vendorid :{
        vaid:['noNull'],
        flg:false
      },
      maxprice:{
        vaid:['Number'],
        flg:false
      },
      deposit:{
        vaid:['Number'],
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
      status:{
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
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'language-name': resolve => require(['@/common/LanguageName'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    'select-solicitor':resolve=> require(['@/common/SelectSolicitor.vue'],resolve),
    'select-vendor':resolve=> require(['@/common/SelectVendor.vue'],resolve),
    'select-builder':resolve=> require(['@/common/SelectBuilder.vue'],resolve),
    'bing-map-layer':resolve=> require(['@/common/BingMapLayer.vue'],resolve)
    },
  methods:{
    replaceString(oldStr, repStr, newStr) {
      return oldStr.replace(repStr, newStr)
    },
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
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
    setmap(){
      this.singleaddress = { code:'001', text:toAddressString(this.formData, false),category: '01'}
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    toggleDescriptionTypeShort2(d){
      this.shortdescriptiontype2 =d.languageid;
      this.languageImgShort2 = d.countryflag;
      this.langtoggleShort2 =false;
    },
    toggleDescriptionTypeShort1(d){
      this.shortdescriptiontype1 =d.languageid;
      this.languageImgShort1 = d.countryflag;
      this.langtoggleShort1 =false;
    },
      toggleDescriptionTypeShort(d){
      this.shortdescriptiontype =d.languageid;
      this.languageImgShort = d.countryflag;
      this.langtoggleShort =false;

    },
    toggleDescriptionType(d){
      this.descriptiontype =d.languageid;
      this.languageImg = d.countryflag;
      this.langtoggle =false;
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
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      this.fullnameObj['00'] = this.formData.fullnameShow;
      this.shortnameObj['00'] = this.formData.shortnameShow;
      this.formData.special = this.setSpecialStr(this.specialList);
      this.formData.fullname = JSON.stringify(this.setActionArr(this.fullnameObj))
      this.formData.shortname = JSON.stringify(this.setActionArr(this.shortnameObj))
      this.formData.description = JSON.stringify(this.setActionArr(this.description))
      this.formData.shortdescription = JSON.stringify(this.setActionArr(this.shortdescription))
      this.formData.howtosale = JSON.stringify(this.setActionArr(this.shortdescription1))
      this.formData.officeuse = JSON.stringify(this.setActionArr(this.shortdescription2))
      insertProject(this.formData).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_insert_success);
          sessionStorage.setItem('shareable','1');
          this.$router.push({path:'/project_manage/edit_project/baseInformation/'+res.data.projectid})
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
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
    change(e){
      this.$forceUpdate()
    },
  },
  created(){
    this.specialSelect=JSON.parse(localStorage.getItem('selectlist')).PROJECT_FEATURE_LIST
    // 获取语言资源表数据
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.countryList = JSON.parse(localStorage.getItem('selectlist')).Country;

    this.countryList.forEach(element => {
      this.countryObj[element.countryid] =element.countryname;
    });
    this.countryObj = Object.assign({},this.countryObj)
    this.categoryList =JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST
    this.formData.languagetype = localStorage.getItem('languagetype');
    this.descriptiontype= localStorage.getItem('languagetype');
    this.shortdescriptiontype= localStorage.getItem('languagetype');
    this.shortdescriptiontype1= localStorage.getItem('languagetype');
    this.shortdescriptiontype2= localStorage.getItem('languagetype');
    this.langList.forEach(ele=>{
      if(ele.languageid == localStorage.getItem('languagetype')){
        this.languageImg = ele.countryflag
        this.languageImgShort = ele.countryflag
        this.languageImgShort1 = ele.countryflag
        this.languageImgShort2 = ele.countryflag
      }
    })

  },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.add_project ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    se(val){
      this.langList= val.Language;
      this.countryList = val.Country;
      this.specialSelect=val.PROJECT_FEATURE_LIST
        val.Country.forEach(element => {
        this.countryObj[element.countryid] =element.countryname;
      });
      this.categoryList = val.PROJECT_CATEGORY_LIST;
      this.langList.forEach(ele=>{
      })
    },
    languagetype(val){
      this.shortdescriptiontype =val;
      this.descriptiontype =val;
      this.getBuild({languagetype:val,isactived:'1'})
      this.getVendor({languagetype:val,isactived:'1'})
      this.langList.forEach(ele=>{
        if(ele.languageid == val){
          this.languageImg = ele.countryflag
          this.languageImgShort = ele.countryflag
          this.languageImgShort1= ele.countryflag
          this.languageImgShort2= ele.countryflag
        }
      })
    }
  },
}
</script>


