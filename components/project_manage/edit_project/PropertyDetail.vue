<template>
  <div class="wrapper clearfix property">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.property_detail}}</span>
        <span class="sub_text" v-if="isUpdate==undefined?false:true" v-show="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
      </div>
      <div class="tools">
        <el-button   class="bg_save_btn" v-if="!readonly" @click="handleSave" size="small">{{rs.save}}</el-button>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.base_information}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title-first">{{rs.lot}} <span class="required">*</span></div>
                      <div class="content">
                        <el-input :disabled="readonly" v-model="formData.lotnumber"  clearable size="small" maxlength="5" @blur="validatorBlur('lotnumber')"></el-input>
                        <p class="curtail" v-show="validatorSave.lotnumber.flg">{{rs[validatorSave.lotnumber.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title-first">{{rs.unit}} <span class="required">*</span></div>
                      <div class="content">
                        <el-input :disabled="readonly"  v-model="formData.unitnumber" clearable size="small" maxlength="20" @blur="validatorBlur('unitnumber')"></el-input>
                        <p class="curtail" v-show="validatorSave.unitnumber.flg">{{rs[validatorSave.unitnumber.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title-first">{{rs.price}}</div>
                      <div class="content">
                        <el-input :disabled="readonly"  v-model="formData.price" size="small" clearable maxlength="10" @blur="validatorBlur('price')"></el-input>
                        <p class="curtail" v-show="validatorSave.price.flg">{{rs[validatorSave.price.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.aspect}}</div>
                      <div class="content">
                        <el-select v-model="formData.aspect" size="small" placeholder=" " clearable :disabled="readonly" >
                          <el-option
                            v-for="item in propertyAspect"
                            :key="item.code"
                            :label="item.value"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.internal_area}}</div>
                      <div class="content">
                        <el-input :disabled="readonly"  v-model="formData.internalarea" size="small" clearable maxlength="9" @blur="validatorBlur('internalarea')"></el-input>
                        <p class="curtail" v-show="validatorSave.internalarea.flg">{{rs[validatorSave.internalarea.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{this.category == '02'?rs.land_size : rs.external_area}}</div>
                      <div class="content">
                        <el-input :disabled="readonly"  v-model="formData.externalarea" size="small" clearable maxlength="9" @blur="validatorBlur('externalarea')"></el-input>
                        <p class="curtail" v-show="validatorSave.externalarea.flg">{{rs[validatorSave.externalarea.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" style="padding-top:15px">
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="form-group">
                      <div class="sub-title"></div>
                      <div class="content">
                        <el-input :disabled="readonly"  size="small" v-model="formData.bedroomqty" clearable maxlength="2" @blur="validatorBlur('bedroomqty')">
                          <template slot="prepend"><i class="fa fa-bed"></i></template>
                        </el-input>
                        <p class="curtail" v-show="validatorSave.bedroomqty.flg">{{rs[validatorSave.bedroomqty.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="form-group">
                      <div class="sub-title"></div>
                      <div class="content">
                        <el-input :disabled="readonly"  size="small" v-model="formData.bathroomqty" clearable maxlength="2" @blur="validatorBlur('bathroomqty')">
                          <template slot="prepend"><i class="fa fa-bath"></i></template>
                        </el-input>
                        <p class="curtail" v-show="validatorSave.bathroomqty.flg">{{rs[validatorSave.bathroomqty.msg]}}</p>
                        
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="form-group">
                      <div class="sub-title"></div>
                      <div class="content">
                        <el-input :disabled="readonly"  size="small" v-model="formData.studymediaqty" clearable maxlength="2" @blur="validatorBlur('studymediaqty')">
                          <template slot="prepend"><i class="fa fa-book"></i></template>
                        </el-input>
                        <p class="curtail" v-show="validatorSave.studymediaqty.flg">{{rs[validatorSave.studymediaqty.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="form-group">
                      <div class="sub-title"></div>
                      <div class="content">
                        <el-input :disabled="readonly"  size="small" v-model="formData.carspaceqty" clearable maxlength="2" @blur="validatorBlur('carspaceqty')">
                          <template slot="prepend"><i class="fa fa-car"></i></template>
                        </el-input>
                        <p class="curtail" v-show="validatorSave.carspaceqty.flg">{{rs[validatorSave.carspaceqty.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <div class="form-group">
                      <div class="sub-title">{{rs.vr}}</div>
                      <div class="content">
                        <el-input :disabled="readonly"  v-model="formData.vrurl" size="small" clearable maxlength="100" ></el-input>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6" style="padding-top:22px">
                    <div class="form-group">
                      <div class="sub-title"></div>
                      <div class="content fl">
                         <el-checkbox :disabled="readonly"  size="small" v-model="formData.havestorage"
                         true-label='1' false-label='0'>{{rs.have_storage}}</el-checkbox>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6" style="padding-top:22px">
                    <div class="form-group">
                      <div class="sub-title"></div>
                      <div class="content fl">
                         <el-checkbox :disabled="readonly||!isrunning" size="small" v-model="formData.holdingflag"
                         true-label='1' false-label='0'>{{rs.hold}}</el-checkbox>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-if="isrunning&&formData.holdingflag=='1'">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="sub-title">{{rs.hold_reason}}<span class="required">*</span></div>
                      <div class="content">
                        <el-input :disabled="readonly"  v-model="formData.holdreason" size="small" clearable maxlength="200" @blur="validatorBlur2('holdreason')"></el-input>
                        <p class="curtail" v-show="validatorSave2.holdreason.flg">{{rs[validatorSave2.holdreason.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="2">
              <template slot="title">
                <!-- <div class="box-header-with-collapse clearfix ">
                  <div class="back">
                    <div class="box-header">
                      <div class="box-title  ">
                        <img src="../../../assets/imgs/Base Information_icon@2x.png" alt=""><span class="latest_sales back">{{rs.address}}</span>
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/attendanceResults_2.png" alt=""><span>{{rs.address_line}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <address-area :formData="formData" :validatorSave='validatorSave' :readonly="readonly" ></address-area>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="3">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/propertyDetail_1.png" alt=""><span>{{rs.short_description}}</span>
                    <img :src="languageImg" alt="" style="padding-left:20px;height:20px;" @click.stop="langtoggle = !langtoggle" >
                    <ul class="lag" v-show="langtoggle" style="left:120px">
                      <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionType(d)">
                        <img :src="d.countryflag" alt=""  class="user-image" ><span style="font-size: 12px;">{{d.languagename}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- <div class="box-header-with-collapse clearfix ">
                  <div class="box-title" style="position:relative">
                    <i class="fa fa-th-large"><span>{{rs.short_description}}</span></i>
                    <img :src="languageImg" alt="" style="padding-left:20px;height:20px;" @click.stop="langtoggle = !langtoggle" >
                    <ul class="lag" v-show="langtoggle" style="left:120px">
                      <li v-for="(d,index) in se.Language" :key='index' @click.stop="toggleDescriptionType(d)">
                        <img :src="d.countryflag" alt=""  class="user-image" ><span style="font-size: 12px;">{{d.languagename}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="box-tools">
                    <i class="header-icon"></i>
                  </div>
                </div> -->
              </template>
              <div class="box-body">
                <el-row :gutter="10">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="content" >
                        <quill-editor :disabled="readonly" :options="editorOption" @change="alertValue1($event,'strValue',500)" v-model="description[descriptiontype]">
                        </quill-editor>
                         <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength1),'%2',SurplusLength1)}}</div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="4">
              <template slot="title">
                <!-- <div class="box-header-with-collapse clearfix ">
                  <div class="box-title">
                    <i class="fa fa-comment-o"><span>{{rs.office_comments}}</span></i>
                  </div>
                  <div class="box-tools">
                    <i class="header-icon"></i>
                  </div>
                </div> -->
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/attendanceResults_1.png" alt=""><span>{{rs.office_comments}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="10">
                  <el-col :span="24">
                    <div class="form-group">
                      <div class="content" >
                        <quill-editor  :disabled="readonly" :options="editorOption" @change="alertValue2($event,'strValue',1000)" v-model="formData.contents"></quill-editor>
                         <div class="limit">{{replaceString(replaceString(rs.info_msg_input_length,'%1',nowLength2),'%2',SurplusLength2)}}</div>
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
            <el-collapse-item name="5">
              <template slot="title">
                <!-- <div class="box-header-with-collapse clearfix ">
                  <div class="box-title">
                    <i class="fa fa-paperclip"><span>{{rs.attachment}}</span></i>
                  </div>
                  <div class="box-tools">
                    <i class="header-icon"></i>
                  </div>
                </div> -->
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/attachments_1.png" alt=""><span>{{rs.attachment}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <div class="upload_box">
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="file_list_area">
                        <ul>
                          <li v-for="(d,i) in fileList" :key="i"
                            v-dragging="{ item: d, list: fileList, group: 'color' }">
                            <el-row>
                              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" >
                                <span>
                                  <i class="fa fa-bars"></i>
                                </span>
                                <span >{{i+1}}</span>
                              </el-col>
                              <el-col :xs="18" :sm="18" :md="17" :lg="17" :xl="18">
                                <el-input :disabled="readonly"  size='mini' v-model="fileList[i].displayname" maxlength="100"></el-input>
                              </el-col>
                              <el-col :xs="3" :sm="3" :md="4" :lg="4" :xl="3" :offset="1" >
                                <el-button   class="small bg_red"  size="mini" style="color:#FFF" v-if="!readonly" @click="handleDelete(d,fileList)">
                                  
                                <span>{{rs.delete}}</span></el-button>
                              </el-col>
                            </el-row>
                          </li>
                        </ul>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="upload_area" style="margin-top:20px">
                        <el-upload
                          v-if="!readonly"
                          drag
                          :show-file-list="false"
                          :on-success="LightImg"
                          :before-upload="beforeAvatarUpload"
                          :on-progress="uploadVideoProcess"
                          :multiple="true"
                          :action="actionUrl2" >
                          <i class="el-icon-upload" v-if="!videoFlag"></i>
                          <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                          <div class="el-upload__text"  v-if="!videoFlag">{{rs.drop_file_here_or_click}}</div>
                          <div class="el-upload__text"  v-if="!videoFlag">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png,.pdf,.docx,.zip,.rar,.xlsx</div>
                        </el-upload>
                      </div>
                    </el-col>
                    
                  </el-row>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="6">
              <template slot="title">
                <!-- <div class="box-header-with-collapse clearfix ">
                  <div class="box-title">
                    <i class="fa fa-paperclip"><span>{{rs.pictures}}</span></i>
                  </div>
                  <div class="box-tools">
                    <i class="header-icon"></i>
                  </div>
                </div> -->
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/pictures_1.png" alt=""><span>{{rs.pictures}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <div class="upload_box">
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="file_list_area">
                        <ul>
                          <li v-for="(d,i) in pictureList" :key="i"
                            v-dragging="{ item: d, list: pictureList, group: 'color' }">
                            <el-row>
                              <el-col :xs="5" :sm="5" :md="6" :lg="6" :xl="5" >
                                <span>
                                  <i class="fa fa-bars"></i>
                                </span>
                                <span >{{i+1}}</span>
                                <el-popover
                                  style="padding-left:5%"
                                  placement="left"
                                  width="300"
                                  trigger="click">
                                  <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                                  <template slot="reference"><span><img :src="d.filepath+'?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                                  style=" vertical-align: middle;cursor: pointer;"/></span></template>
                                </el-popover>
                              </el-col>
                              <el-col :xs="15" :sm="15" :md="13" :lg="13" :xl="15">
                                <el-input :disabled="readonly"   size='mini' v-model="pictureList[i].displayname" maxlength="100"></el-input>
                              </el-col>
                              <el-col :xs="3" :sm="3" :md="4" :lg="4" :xl="3" :offset='1'>
                                <el-button   class="small bg_red" style="color:#FFF" size="mini" v-if="!readonly" @click="handleDelete(d,pictureList)">
                                  <span>{{rs.delete}}</span></el-button>
                              </el-col>
                            </el-row>
                          </li>
                        </ul>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="upload_area" style="margin-top:20px">
                        <el-upload
                          v-if="!readonly"
                          drag
                          :show-file-list="false"
                          :on-success="LightImgPictures"
                          :before-upload="beforeAvatarUploadPictures"
                          :on-progress="uploadVideoProcessPictures"
                          :multiple="true"
                          :action="actionUrl1" >
                          <i class="el-icon-upload" v-if="!videoFlagPictures"></i>
                          <el-progress v-if="videoFlagPictures" type="circle" :percentage="videoUploadPercentPictures" style="margin-top:30px;"></el-progress>
                          <div class="el-upload__text"  v-if="!videoFlagPictures">{{rs.drop_file_here_or_click}}</div>
                          <div class="el-upload__text"  v-if="!videoFlagPictures">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png</div>
                        </el-upload>
                      </div>
                    </el-col>
                    
                  </el-row>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
    </form>
  </div>
</template>
<script>
import { insertProperty, deleteAttachment, uptadeProperty, getProperty, getPropertyAddress, getProjectCategory } from '@/api/projectApi.js'
import { Message } from 'element-ui'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import axios from 'axios'
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
      activeNames:['1','2','3','4','5','6'], //折叠面板
      descriptiontype:'',
      description:{},
      videoFlag:false,
      videoFlagPictures:false,
      videoUploadPercentPictures:0,
      videoUploadPercent:0,
      attachmentSelect:[],
      isUpdate:'',
      fileList:[],
      pictureList:[],
      languageImg:'',
      langList:[],
      actionUrl1:'',
      actionUrl2:'',
      langtoggle:false,
      propertyAspect:[],
      nowLength1:0,
      SurplusLength1:500,
      nowLength2:0,
      SurplusLength2:1000,
      attachmentObj:{},
      category:'01',
      isrunning:false,
      formData:{
        lotnumber:'',
        unitnumber:'',
        price:'',
        aspect:'',
        internalarea:'',
        externalarea:'',
        bedroomqty:'',
        bathroomqty:'',
        studymediaqty:'',
        carspaceqty:'',
        havestorage:'0',
        holdingflag:'0',
        addressline:'',
        addressline2:'',
        suburb:'',
        state:'',
        postcode:'',
        country:'',
        description:'',
        attachmentlist:'',
        referid:'',
        vrurl:'',
      },
      validatorSave:{
        lotnumber:{
          vaid:['noNull','Number'],
          flg:false
        },
        unitnumber:{
          vaid:['noNull'],
          flg:false
        },
        price:{
          vaid:['Number'],
          flg:false
        },
        internalarea:{
          vaid:['folatNumber'],
          flg:false
        },
        externalarea:{
          vaid:['folatNumber'],
          flg:false
        },
        postcode:{
          vaid:['Number'],
          flg:false
        },
        bedroomqty:{
          vaid:['Number'],
          flg:false
        },
        bathroomqty:{
          vaid:['Number'],
          flg:false
        },
        studymediaqty:{
          vaid:['Number'],
          flg:false
        },
        carspaceqty:{
          vaid:['Number'],
          flg:false
        },
        //  bedroomqty:'',
        // bathroomqty:'',
        // studymediaqty:'',
        // carspaceqty:'',
      },
      validatorSave2:{
        holdreason:{
          vaid:['noNull'],
          flg:false
        },
      },
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    validatorBlur2(key){
      validator(this.validatorSave2,this.formData,key)
    },
    ShowName(data){
      this.shortnameShow =data.shortname;
      this.fullnameShow = data.fullname;
    },
    LightImg(res, file) {
      console.log(file,'--')
      let fileExtension = file.name.substring(file.name.lastIndexOf('.'));  
      let namestr = file.name.replace(fileExtension,'');
      let items=namestr.split(".")   
      console.log(fileExtension,'fileExtension',items.join(''))
      this.videoUploadPercent = 100;
      this.videoFlag = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      var fileData={
          displayname:file.name.replace(fileExtension,''),
          filepath:file.response.path,
          attachmenttype: "03",//文件类型
          refertype:'1',
          displayorder:this.fileList.length+1,
          referid:this.projectId
        }
      if(this.fileList.length<10){
        this.fileList.push(fileData)
      }else{
        this.$message.error('最多上传10个文件');
      }
    },
    replaceString(oldStr, repStr, newStr) {
      return oldStr.replace(repStr, newStr)
    },
    LightImgPictures(res,file){
      let fileExtension = file.name.substring(file.name.lastIndexOf('.'));  
      this.videoUploadPercentPictures = 100;
      this.videoFlagPictures = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      let fileData={
          displayname:file.name.replace(fileExtension,''),
          filepath:file.response.path,
          picturetype: "02",//文件类型
          refertype:'1',
          displayorder:this.pictureList.length+1,
          referid:this.projectId
        }
        if(this.pictureList.length<10){
        this.pictureList.push(fileData)
      }else{
        this.$message.error('最多上传10个文件');
      }

    },
    // 上传进度
    uploadVideoProcess(event, file, fileList){
      this.videoFlag = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    uploadVideoProcessPictures(event, file, fileList){
      this.videoFlagPictures = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercentPictures = parseInt(file.percentage.toFixed(0));
    },
    beforeAvatarUploadPictures(file){
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isBMP = file.type === 'image/bmp';
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      if(!isBMP && !isPNG && !isJPG && !isGIF){
        this.$message.error(this.rs.err_msg_file_type);
      }
      return  (isBMP || isJPG || isGIF || isPNG )&&isLt100M;
    },
    beforeAvatarUpload(file) {
      let fileExtension = file.name.substring(file.name.lastIndexOf('.'));  
      let namestr = file.name.replace(fileExtension,'');
      const isName = namestr.indexOf('.') == -1;
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isPdf = this.matchType(file.name,'pdf');
      const isdoc = this.matchType(file.name,'doc');
      const isdocx = this.matchType(file.name,'docx');
      const iszip = this.matchType(file.name,'zip');
      const israr = this.matchType(file.name,'rar');
      const isxls = this.matchType(file.name,'xls');
      const isxlsx = this.matchType(file.name,'xlsx');
      const isBMP = file.type === 'image/bmp';
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      if(!isName){
        this.$message.error(this.rs.upload_name_error_msg);
      }
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      if(!isPdf && !isdoc && !isdocx && !iszip && !israr && !isxls && !isxlsx&&!isBMP && !isPNG && !isJPG && !isGIF){
        this.$message.error(this.rs.err_msg_file_type);
      }
      return  (isPdf || isdoc || isdocx || iszip || israr || isxlsx || isxls||isBMP || isJPG || isGIF || isPNG )&&isLt100M&&isName;
    },
    matchType(fileName,type) {
      // 后缀获取
      var suffix = '';
      // 获取类型结果
      var result = '';
      try {
      var flieArr = fileName.split('.');
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = '';
      }
      // fileName无后缀返回 false
      if (!suffix) {
          result = false;
        return result;
      }else{
        if(suffix == type){
          return true
        }else{
          return false
        }
      }
    },
    alertValue1(e,strValue,decimalNum){
      e.quill.deleteText(decimalNum,1,strValue);//保留 strValue 的 前 decimalNum 位字符，
       this.nowLength1 = e.text.length-1;
      this.SurplusLength1 = decimalNum - e.text.length+1;
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
      this.SurplusLength2 = decimalNum - e.text.length+1;
       if(this.nowLength2>decimalNum){
        this.nowLength2 = decimalNum;
      }
      if(this.SurplusLength2<0){
        this.SurplusLength2 = 0;
      }
    },
    setActionArr(data){
      let actionArr=[]
      for (var Key in data){
        actionArr.push({type:Key,content:data[Key]})
      }
      return JSON.stringify(actionArr)
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    handleDelete(d,Data){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        Data.forEach(element => {
          if(d == element){
            Data.remove(element)
          }
        });
      }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });

    },
    handleSave(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      if (this.formData.holdingflag == '1') {
        if(allvalidator(this.validatorSave2,this.formData)){
          return
        }
      }
      this.formData.attachmentlist = JSON.stringify(this.fileList)
      this.formData.picturelist =JSON.stringify(this.pictureList)
      this.formData.description = this.setActionArr(this.description)
      delete this.formData.updatedtimestamp
      if(this.isUpdate){
        insertProperty(this.formData).then(res=>{
          if(res.data.success){
            window.history.back()
            this.$message.success(this.rs.info_msg_insert_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        uptadeProperty(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            window.history.back()
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    setName(name){
      this.dialogShow = !this.dialogShow;
      this.labelName = name;
    },
    toggleDescriptionType(d){
      this.descriptiontype =d.languageid;
      this.languageImg = d.countryflag;
      this.langtoggle =false;
    },
    getCategory(id){
      getProjectCategory({projectid:id}).then(res=>{
        if(res.data.success){
          this.category = res.data.category;
        }
      })
    }
  },
  created(){
    this.propertyAspect =JSON.parse(localStorage.getItem('selectlist')).PROPERTY_ASPECT_LIST;
    this.attachmentSelect = JSON.parse(localStorage.getItem('selectlist')).ATTACHMENT_TYPE_LIST;
    if (sessionStorage.getItem('isrunning')) {
      this.isrunning = sessionStorage.getItem('isrunning') === '1';
    }
    // 获取语言资源表数据
    if(this.$route.params.id == 'update' || this.$route.params.id == 'show'){
        this.isUpdate = false;//给保存按钮识别是修改
      if(sessionStorage.getItem('propertyid')){
        this.formData.propertyid =sessionStorage.getItem('propertyid');
      }else{
        this.formData.propertyid =this.$router.currentRoute.query.id;
        sessionStorage.setItem('propertyid',this.$router.currentRoute.query.id)
      }
      getProperty({propertyid:this.formData.propertyid,languagetype:'01'}).then(res=>{
        if(res.data.success){
          this.formData = res.data.data;
          this.getCategory(this.formData.projectid);
          this.fileList = res.data.attachmentslist;
          this.pictureList = res.data.picturelist;
          res.data.attachmentslist.forEach((element,index) => {
            this.attachmentObj[index] = element.attachmenttype
          });
          this.attachmentObj = Object.assign({},this.attachmentObj)
          this.actionUrl2 =axios.defaults.baseURL+'project/uploadFile?falg=4&projectid='+this.formData.projectid;//附件上传地址
          this.actionUrl1 =axios.defaults.baseURL+'project/uploadFile?falg=3&projectid='+this.formData.projectid;//图片上传地址
          res.data.descriptionlist.forEach(element => {
            this.description[element.type] = element.content;
          });
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    } else{
      this.isUpdate= true;//给保存按钮识别是新增
      this.formData.projectid = this.$router.currentRoute.params.id;
      this.getCategory(this.formData.projectid);
      this.actionUrl2 =axios.defaults.baseURL+'project/uploadFile?falg=4&projectid='+this.formData.projectid;//附件上传地址
      this.actionUrl1 =axios.defaults.baseURL+'project/uploadFile?falg=3&projectid='+this.formData.projectid;//图片上传地址
      getPropertyAddress({projectid:this.$router.currentRoute.params.id}).then(res=>{
        if(res.data.success){
          this.formData = Object.assign(this.formData,res.data)
        }
      })
    }
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.descriptiontype= localStorage.getItem('languagetype');
    this.langList.forEach(element => {
        if(element.languageid ==localStorage.getItem('languagetype')){
          this.languageImg = element.countryflag;
        }
      });
  },
    computed:{
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.all_properties ==='02' || this.$route.params.id === 'show'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
      se(val){
      this.langList= val.Language;
      this.propertyAspect =val.PROPERTY_ASPECT_LIST
      this.attachmentSelect = val.ATTACHMENT_TYPE_LIST;
      this.langList.forEach(element => {
          if(element.languageid == this.languagetype){
          this.languageImg = element.countryflag;
          }
      });
      },
      languagetype(val){
        this.descriptiontype =val;
      }
  },
  mounted () {
    this.$dragging.$on('dragend', () => {
      this.fileList.forEach((element,index,key) => {
        if(element == undefined){
        }else{
          element.displayorder = index+1
        }
      });
    })
  }
}

</script>

<style lang="scss">
.property {
  .el-upload-dragger{
    width:360px !important;
  }
}

.btnFloor{
  cursor:pointer
}
.attachment_danger{
  background: #00a65a;
}
.danger{
  background: #f56c6c ;
}

.attachment_danger,.danger,.default{
  color: white;
  padding:5px;
  font-size:6px;
  font-weight:bold;
  border-radius:5px;
}
.default{
  background: #d2d6de;
  padding:5px;
  font-size:6px;
  font-weight:bold;
  border-radius:5px;
}
.file_list_area li{
  height: 28px;
  line-height: 28px;
  border-radius: 2px;
  padding: 10px;
  background: #f4f4f4;
  margin-bottom: 2px;
  border-left: 2px solid #e6e7e8;
  color: #444;
  cursor: move;

}
.file_list_area .handle>span{
  padding-left:10px;
  padding-right: 10px;
}

</style>
