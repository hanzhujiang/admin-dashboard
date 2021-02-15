<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{isUpdate?rs.add_new_client:rs.client_detail}}</span>
        <!-- add_new_client -->
        <!-- <span class="sub_text" v-if="isUpdate==undefined?false:true" v-show="!readonly">[{{isUpdate?rs.add_new_client:rs.edit}}]</span> -->
      </div>
      <div class="tools">
       <el-button   class="bg_save_btn"  v-if="!readonly&&canSave" @click="handleSave" size="small">{{rs.save}}</el-button>
       <el-button   class="bg_save_btn"  v-else disabled size="small">{{rs.save}}</el-button>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <el-row>
            <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="title">
                    <img src="../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.base_information}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="form-group">
                          <div class="sub-title-first">{{rs.first_name}}<span class="required">*</span></div>
                          <div class="content">
                            <el-input v-model="formData.firstname" :disabled="readonly" clearable maxlength="50" size="small" @blur="validatorBlur('firstname')"></el-input>
                            <p class="curtail" v-show="validatorSave.firstname.flg">{{rs[validatorSave.firstname.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="form-group">
                          <div class="sub-title-first">{{rs.last_name}}<span class="required">*</span></div>
                          <div class="content">
                            <el-input v-model="formData.lastname" :disabled="readonly" clearable maxlength="50" size="small" @blur="validatorBlur('lastname')"></el-input>
                            <p class="curtail" v-show="validatorSave.lastname.flg">{{rs[validatorSave.lastname.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="form-group">
                          <div class="sub-title">{{rs.purchaser_type}}</div>
                          <div class="content">
                            <el-select v-model="formData.purchasetype" :disabled="readonly" size="small" slot="prepend"
                              placeholder="" clearable>
                              <el-option
                              v-for="item in purchaserTypeList"
                              :key="item.code"
                              :label="item.value"
                              :value="item.code">
                              </el-option>
                            </el-select>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="form-group">
                          <div class="sub-title">{{rs.client_source}}<span class="required">*</span></div>
                          <div class="content">
                            <el-select v-model="formData.clientsource" :disabled="readonly" maxlength="2" size="small" slot="prepend"
                              @change="validatorBlur('clientsource')"
                              placeholder="" clearable>
                              <el-option
                              v-for="item in ClientSourceList"
                              :key="item.code"
                              :label="item.value"
                              :value="item.code">
                              </el-option>
                            </el-select>
                            <p class="curtail" v-show="validatorSave.clientsource.flg">{{rs[validatorSave.clientsource.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="form-group">
                          <div class="sub-title">{{rs.gender}}</div>
                          <div class="content">
                            <el-select v-model="formData.gender" slot="prepend"
                              :disabled="readonly"
                              size="small" placeholder="" clearable>
                              <el-option :label="rs.male" value="0"></el-option>
                              <el-option :label="rs.female" value="1"></el-option>
                            </el-select>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="form-group">
                          <div class="sub-title">{{rs.date_of_birth}}</div>
                          <div class="content">
                            <el-date-picker
                              v-model="formData.dateofbirth"
                              :disabled="readonly"
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
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title-first">{{rs.photo}}</div>
                      <div class="content">
                        <el-upload
                        class="avatar-uploader"
                        :action='actionUrl'
                        :show-file-list="false"
                        :disabled="readonly"
                        :on-success="LightImg"
                        :on-progress="progress"
                        accept="image/gif,image/bmp,image/jpeg,image/png"
                        :before-upload="beforeAvatarUpload">

                         <img v-if="formData.photo" :src="formData.photo" style="width:100%;height:160px" class="avatar">
                         <img src="../../assets/imgs/no_photo.jpg" alt="" style="width:100%;height:160px"  v-else-if="!isUpdate">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                    </div>
                    <span style="font-size:12px;color:#818998">(*Recommended size: 300 x 320 pixels)</span>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                        <div class="form-group">
                          <div class="sub-title">{{rs.phone_number}}</div>
                          <div class="content">
                          <el-input v-model="formData.phonenumber" clearable maxlength="20" :disabled="readonly" size="small" @blur="validatorBlur('phonenumber')"></el-input>
                          <p class="curtail" v-show="validatorSave.phonenumber.flg">{{rs[validatorSave.phonenumber.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                        <div class="form-group">
                          <div class="sub-title">{{rs.mobile_number}}</div>
                          <div class="content">
                          <el-input v-model="formData.mobilenumber" clearable maxlength="20" :disabled="readonly" size="small" @blur="validatorBlur('mobilenumber')"></el-input>
                          <p class="curtail" v-show="validatorSave.mobilenumber.flg">{{rs[validatorSave.mobilenumber.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                        <div class="form-group">
                          <div class="sub-title">{{rs.fax_number}}</div>
                          <div class="content">
                          <el-input v-model="formData.faxnumber" clearable maxlength="20" :disabled="readonly" size="small" @blur="validatorBlur('faxnumber')"></el-input>
                          <p class="curtail" v-show="validatorSave.faxnumber.flg">{{rs[validatorSave.faxnumber.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.email}}</div>
                      <div class="content">
                        <el-input v-model="formData.email" :disabled="readonly" clearable size="small" maxlength="100" @blur="validatorBlur('email')"></el-input>
                        <p class="curtail" v-show="validatorSave.email.flg">{{rs[validatorSave.email.msg]}}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.tfn}}</div>
                      <div class="content">
                      <el-input v-model="formData.tfn" :disabled="readonly" clearable size="small" maxlength="20"></el-input>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.budget}}</div>
                      <div class="content">
                        <el-select v-model="formData.budget" :disabled="readonly"  size="small" slot="prepend" maxlength="10"
                          placeholder="" clearable>
                          <el-option
                          v-for="item in budgetTypeList"
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
                      <div class="sub-title">{{rs.rating}}</div>
                      <div class="content">
                         <el-rate
                          v-model="formData.rating"
                          :colors="colors">
                        </el-rate>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.contact_agent}}</div>
                      <div class="content">
                      <el-input v-model="agentName" size="small"  clearable :disabled="true">
                        <template slot="append" >
                          <el-button   slot="append" class="fa fa-list-ul" :disabled="readonly" @click="getAgentName"></el-button>
                        </template>
                      </el-input>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title">{{rs.partner_contact}}</div>
                      <div class="content">
                      <el-input v-model="brokerName" size="small"  clearable :disabled="true">
                        <template slot="append" >
                          <el-button slot="append"   class="fa fa-list-ul" :disabled="formData.brokerfirmid?true:readonly" @click="getBrokerName"></el-button>
                        </template>
                      </el-input>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                        <div class="sub-title">{{rs.sales_stage}}</div>
                      <div class="content stage_warp">
                        <el-select v-model="formData.salesstage" :disabled="readonly" maxlength="2" size="small" slot="prepend" class="stage"
                        :style="{background:stageColor[formData.salesstage],color:'#FFF'}"
                          placeholder="" clearable>
                          <el-option
                          v-for="item in SalesStageList"
                          :key="item.code"
                          :style="{background:item.extvalue,margin:'6px',color:'#FFF',borderRadius:'4px'}"
                          :label="item.value"
                          :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <div class="form-group">
                      <div class="sub-title">{{rs.comments}} </div>
                      <div class="content">
                        <el-input type="textarea" rows=6 :disabled="readonly" class="tex-bor" clearable maxlength="500" v-model="formData.comments" size="small">
                        </el-input>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title"></div>
                      <div class="content fl">
                        <!-- readonly&&isgold -->
                        <el-checkbox :label="rs.gold_client"  :disabled="readonly?true:isgold?true:false" v-model="formData.isgoldclient" size="small" true-label='1' false-label='0'></el-checkbox>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="form-group">
                      <div class="sub-title"></div>
                      <div class="content fl" >
                        <el-checkbox :label="rs.firb_required" :disabled="readonly" v-model="formData.firbrequired" size="small" true-label='1' false-label='0'></el-checkbox>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
          </el-row>
          <el-row v-if="!isUpdate"> 
            <el-collapse v-model="activeNames" style="margin-top:20px" class="box">
                <el-collapse-item name="4">
                  <template slot="title">
                    <div class="box-header-with-collapse clearfix ">
                      <div class="title">
                        <img src="../../assets/imgs/page/attendanceResults_2.png" alt=""><span>Related Properties</span>
                      </div>
                    </div>
                  </template>
                  <div class="box-body">
                    <!-- saleList -->
                     <el-table
                      :empty-text ="rs.no_data"
                      :data="saleList"
                      tooltip-effect="light"
                      width='100%'
                      size="mini">
                      <el-table-column
                        prop="shortname"
                        width="150"
                        :label="rs.project_name"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <!-- <span>{{scope.row.shortname}}<i class="fa fa-share-alt fr " style="color:#409EFF;" v-if="scope.row.isshared==1?1:0 "></i></span> -->
                          <span>{{scope.row.shortname}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="lotnumber"
                        :label="rs.lot"
                        width="60">
                      </el-table-column>
                      <el-table-column
                        prop="unitnumber"
                        :label="rs.unit"
                        :show-overflow-tooltip="true"
                        width="60">
                      </el-table-column>
                      <el-table-column
                        prop="salestatus"
                        :show-overflow-tooltip="true"
                        width="240"
                        :label="rs.contract_status">
                        <template slot-scope="scope">
                          {{statusObj[scope.row.salestatus]}}
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="rs.action"
                        >
                        <template slot-scope="scope">
                          <span class="btntext" @click="handleEdit(scope.row)">{{!readonly?rs.edit:rs.detail}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!-- <address-area :formData="formData" :validatorSave='validatorSave' :readonly="readonly"></address-area> -->
                  </div>
                </el-collapse-item>
              </el-collapse>
          </el-row>
          <el-row v-if="!isUpdate">
            <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="5">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/page/attachments_1.png" alt=""><span>{{rs.attachments}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <div class="upload_box">
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="file_list_area">
                        <el-table
                          :empty-text ="rs.no_data"
                          :data="attachmentList"
                          tooltip-effect="light"
                          width='100%'
                          size="mini">
                          <el-table-column
                          label="NO"
                            type="index" >
                          </el-table-column>
                          <el-table-column
                            prop="displayname"
                            :label="rs.file_name"
                            >
                          </el-table-column>
                          <el-table-column
                            :label="rs.action"
                            width="175"
                            >
                            <template slot-scope="scope">
                                <span class="btntext" style="padding:0 20px 0 0"  @click="download(scope.row)">{{rs.download}}</span>
                                <span class="btntext" style="padding:0 20px 0 0" @click="handleDelete(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                            </template>
                          </el-table-column>
                        </el-table>
                        <!-- <ul>
                          <li v-for="(d,i) in attachmentList" :key="i">
                            v-dragging="{ item: d, list: attachmentList, group: 'color' }"
                            <el-row>
                              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5" >
                                <span>
                                  <i class="fa fa-bars"></i>
                                </span>
                                <span >{{i+1}}</span>
                                <el-popover
                                  placement="left"
                                  width="300"
                                  trigger="click">
                                  <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                                  <template slot="reference"><span><img :src="d.filepath+'?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                                  style=" vertical-align: middle;cursor: pointer;"/></span></template>
                                </el-popover>
                              </el-col>
                              <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                                <span>{{attachmentList[i].displayname}}</span>
                                <el-input :disabled="readonly"   size='mini' v-model="attachmentList[i].displayname" maxlength="100"></el-input>
                              </el-col>
                              <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
                                   <span class="btntext"  @click="download(d)">{{rs.download}}</span>
                                <span class="btntext" @click="handleDelete(d)" v-if="!readonly">{{rs.delete}}</span>
                              </el-col>
                            </el-row>
                          </li>
                        </ul> -->
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
                          <div class="el-upload__text"  v-if="!videoFlagPictures">Drop file or click here</div>
                          <div class="el-upload__text"  v-if="!videoFlagPictures">{{rs.only_accept}}: gif, bmp, jpg, jpeg, png, pdf, doc, docx, zip, rar, xls, xlsx</div>
                        </el-upload>
                      </div>
                    </el-col>
                    
                  </el-row>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-collapse v-model="activeNames" class="box">
                <el-collapse-item name="2">
                  <template slot="title">
                    <div class="box-header-with-collapse clearfix ">
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
            <el-col :span="24">
              <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
                <el-collapse-item name="3">
                  <template slot="title">
                    <div class="box-header-with-collapse clearfix">
                      <div class="title">
                        <img src="../../assets/imgs/page/clientDetail_1.png" alt=""><span>{{rs.bank_account_detail}}</span>
                      </div>
                    </div>
                  </template>
                  <div class="box-body">
                    <account-area :formData="formData" :validatorSave='validatorSave' :readonly="readonly"></account-area>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-col>
            <el-col :span="24">
              <el-row v-if="!isUpdate"> 
                <el-collapse v-model="activeNames" style="margin-top:20px" class="box">
                    <el-collapse-item name="6">
                      <template slot="title">
                        <div class="box-header-with-collapse clearfix ">
                          <div class="title">
                            <img src="../../assets/imgs/page/attendanceResults_2.png" alt=""><span>{{rs.operation_log}}</span>
                          </div>
                        </div>
                      </template>
                      <div class="box-body">
                        <div style="padding: 20px 0">
                          <el-input type="textarea" rows=4  class="tex-bor" placeholder="Add a new log here (visible to the Agent, if any)" clearable maxlength="500" v-model="comments" size="small">
                        </el-input>
                        <div style="padding:15px 0">
                           <el-button class="bg_save_btn"    v-if="!readonly" @click="handleUpdateComments" size="small">{{rs.submit}}</el-button>
                        </div>
                        </div>
                         <div v-for="(d,i) in clientchangeloglist" :key="i"
                          style="margin:5px;border-bottom:1px solid #dcdcdc;" class="clearfix">
                          <!-- <div class="fl"><img :src="d.photo" alt="" width="30px" class="img-circle"></div> -->
                          <div>
                            <p class="text clearfix"> 
                              <span v-if="d.externaltype" class="fl">{{d.externaltype}}</span>
                              <span v-else class="fl">{{d.firstname}}&nbsp;{{d.lastname}}</span>
                              <span class="fr min_fo">{{setformatDate(d.logdatetime)}}</span></p>
                            <p class="text">{{operationtypeObj[d.operationtype]}}</p>
                            <p  class="text" v-html="d.comments">
                            </p>
                          </div>
                        </div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    </form>
    <select-agent :sync="dialogShow" @select="setAgentName" @update:sync="dialogShow=false"></select-agent>
    <select-partner-contact :sync="selectBrokerShow" @select="setBrokerName" @update:sync="selectBrokerShow=false"></select-partner-contact>
  </div>
</template>
<script>
import { insertClient, updateClient, getClientList , getClientSale,insertClientAttachment, deleteClientAttachment, updateComments} from '@/api/clientApi.js'
import { validator, allvalidator } from '@/validator/validator.js'
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
// 对日期插件英文化
import Vue from 'vue'
import { DatePicker} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
Vue.component(DatePicker)
import axios from 'axios'
import { Message } from 'element-ui'
import { mapGetters } from "vuex";
  export default{
     data() {
      return {
         SalesStageList:[],
         comments:'',
        stageColor:{},
        attachmentList:[],
        clientchangeloglist:[],
        operationtypeObj:{},
        actionUrl1:"",
        videoFlagPictures:false,
        canSave:true,
        selectBrokerShow:false,
        brokerName:'',
        activeNames:['1','2','3','4','5','6'], //折叠面板
        purchaserTypeList:[],//首次购房下拉列表
        saleList:[],
        statusObj:{},
        dialogShow:false,//弹出层控制器
        agentName:'',//表单雇员名字
        ClientSourceList:[],
        isgold:true,//只有当lastname,firstname,mobile,email都输入值了才允许选择金牌客户
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        formData:{//表单提交数据
          accountname:'',
          accountnumber:'',
          addressline:'',
          addressline2:'',
          agentid:'',
          bankname:'',
          bsb:'',
          budget:'',
          comments:'',
          country:'',
          email:'',
          isgoldclient:'0',
          faxnumber:'',
          firbrequired:'0',
          firstname:'',
          gender:'0',
          lastname:'',
          mobilenumber:'',
          clientsource:'',
          phonenumber:'',
          rating:0,
          photo:'',
          postcode:'',
          purchasetype:'',
          state:'',
          suburb:'',
          tfn:'',

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
          clientsource:{
            vaid:['noNull'],
            flg:false
          },
          email:{
            vaid:['Email'],
            flg:false
          },
          phonenumber:{
            vaid:['phoneNumber'],
            flg:false
          },
          faxnumber:{
            vaid:['phoneNumber'],
            flg:false
          },
          mobilenumber:{
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
          }
        },
        actionUrl:'',//图片保存路径
        isUpdate:true,//保存按钮
      }
    },
    components: {
      'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
      'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
      'account-area': resolve => require(['@/common/AccountArea.vue'], resolve),
      'select-agent': resolve => require(['@/common/SelectAgent.vue'], resolve),
      'select-partner-contact': resolve => require(['@/common/SelectPartnerContact.vue'], resolve),

     },
    methods:{
      validatorBlur(key){
        validator(this.validatorSave,this.formData,key)
      },
      handleDelete(d){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
          deleteClientAttachment({ids:d.attachmentid,referid:d.referid,path:d.filepath}).then(res=>{
            if(res.data.success){
             this.getClient({clientid:this.$router.currentRoute.query.id});
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
      
    },
      LightImgPictures(res,file){
      let fileExtension = file.name.substring(file.name.lastIndexOf('.'));  
      this.videoUploadPercentPictures = 100;
      this.videoFlagPictures = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      let fileData={
          displayname:file.name,
          referid:this.formData.clientid,
          filepath:file.response.path,
          attachmenttype: "99",//文件类型
          brokerid:this.formData.brokerid,
          agentid:this.formData.agentid,
          refertype:'8',
          displayorder:this.attachmentList.length+1,
        }
        insertClientAttachment(fileData).then(res=>{
          if(res.data.success){
            this.getClient({clientid:this.$router.currentRoute.query.id});
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      //   if(this.attachmentList.length<10){
      //   this.attachmentList.push(fileData)
      // }else{
      //   this.$message.error('最多上传10个文件');
      // }

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
     download (data) {
      window.location.href=data.filepath;
      let url= data.filepath;
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', data.displayname)
      link.setAttribute('target', '_blank')
      document.body.appendChild(link)
      link.click()
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
     setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy hh:mm:ss')
      }else{
        return '-'
      }
    },
    beforeAvatarUploadPictures(file){
       const isLt100M = file.size / 1024 / 1024 < 100;
      const isBMP = file.type === 'image/bmp';
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
       const isPdf = this.matchType(file.name,'pdf') || this.matchType(file.name,'PDF');
      const isdoc = this.matchType(file.name,'doc');
      const isdocx = this.matchType(file.name,'docx');
      const iszip = this.matchType(file.name,'zip');
      const israr = this.matchType(file.name,'rar');
      const isxls = this.matchType(file.name,'xls');
      const isxlsx = this.matchType(file.name,'xlsx');
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      if(!isBMP && !isPNG && !isJPG && !isGIF && !isPdf && !isdoc && !isdocx && !iszip && !israr && !isxls && !isxlsx){
        this.$message.error(this.rs.err_msg_file_type);
      }
      return  (isBMP || isJPG || isGIF || isPNG || isPdf || isdoc || isdocx || iszip || israr || isxls || isxlsx )&&isLt100M;
    },
      ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
        });
        return str
      },
       getBrokerName(){
        this.selectBrokerShow = !this.selectBrokerShow;
      },
       setBrokerName(row){
        this.formData.brokerid = row.brokerid;
        this.brokerName = row.firstname + ' ' + row.lastname;
        this.selectBrokerShow = !this.selectBrokerShow;
      },
      ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
        });
        return str
      },
      progress(event, file, fileList){
        this.$store.commit('SET_SHOW_LOADING',true)
      },
      LightImg(res, file) {
        this.$store.commit('SET_SHOW_LOADING',false)
        this.formData.photo = file.response.path;
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
     
      handleSave(){
        if(!this.canSave){
          return;
        }
        this.canSave = false;
        if(allvalidator(this.validatorSave,this.formData)){
          this.canSave = true;
          return
        }
         // 新增或者修改
        if(this.isUpdate){
          insertClient(this.formData).then(res=>{
            if(res.data.success){
              this.$router.push({path:'/client_manage/allClients'})
              this.$message.success(this.rs.info_msg_insert_success);
              this.canSave = true;
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          }).catch(error=>{
            this.canSave = true;
          })
        }else{
          delete this.formData.updatedtimestamp
          delete this.formData.deletedflag
          updateClient(this.formData).then(res=>{
            if(res.data.success){
                this.$router.push({path:'/client_manage/allClients'})
                this.$message.success(this.rs.info_msg_update_success);
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
      setAgentName(row) {
        this.formData.agentid = row.agentid;
        this.agentName = row.firstname + " " + row.lastname;;
        this.dialogShow =!this.dialogShow;
      },
      getAgentName(){
        //显示Agent列表
        this.dialogShow =!this.dialogShow;
      },
      getClient(data){
        getClientList(data).then(res=>{
          if(res.data.success){
            if(res.data.data.length !=0){
              this.formData =res.data.data[0]
              let first_name = this.formData.afirstname?this.formData.afirstname:'';
              let last_name = this.formData.alastname?this.formData.alastname:'';
              this.agentName =  first_name +  '  ' + last_name;
              this.brokerName = this.formData.brokername
              this.attachmentList = res.data.attachmentslist.reverse();
              this.clientchangeloglist =  res.data.clientchangeloglist;
            }
            this.clientchangeloglist =  res.data.clientchangeloglist;
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      },
      getClientSaleList(data){
        getClientSale(data).then(res=>{
          if(res.data.success){
            this.saleList = res.data.data;
          }
        })
      },
      handleEdit(row){
        sessionStorage.removeItem('isFalg');
        this.$router.push({path:'/sale_manage/saleAdvice'})
        sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'client',agencyprojectid:row.agencyprojectid,isChannel:0}))
      },
      fetchDate(){
          if(this.$route.params.id == 'save'){
          this.isUpdate= true;//给保存按钮识别是新增还是修改
          this.agentName = '';
          this.brokerName = '';
          this.formData ={ accountname:'',accountnumber:'',addressline:'',addressline2:'',agentid:'',
          bankname:'',bsb:'', budget:'',comments:'',country:'', email:'',isgoldclient:'0',faxnumber:'',
          firbrequired:'0',firstname:'',gender:'0',lastname:'',mobilenumber:'',clientsource:'',
          phonenumber:'',rating:0, photo:'',postcode:'',purchasetype:'',state:'',suburb:'', tfn:'',
          }
        }
        if(this.$route.params.id == 'update'){
          this.isUpdate = false;//给保存按钮识别是新增还是修改
          this.getClient({clientid:this.$router.currentRoute.query.id});
          this.getClientSaleList({clientid:this.$router.currentRoute.query.id})
        }
      },
      handleUpdateComments(){
        updateComments({clientid:this.$router.currentRoute.query.id,brokerid:this.formData.brokerid,comments:this.comments,firstname:this.formData.firstname,lastname:this.formData.lastname,agentid:this.formData.agentid,}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_insert_success);
            this.comments = '';
            this.getClient({clientid:this.$router.currentRoute.query.id});
          }
        })
      },
    },
    created(){
      this.actionUrl =axios.defaults.baseURL+'client/uploadFile';
      this.actionUrl1 =axios.defaults.baseURL+'client/uploadAttFile';

      //  BUDGET_TYPE_LIST
      JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(element => {
        this.statusObj[element.code] =element.value;
      });
       JSON.parse(localStorage.getItem('selectlist')).CLIENT_LOG_LIST.forEach(element => {
        this.operationtypeObj[element.code] =element.value;
      });
      this.statusObj =Object.assign({}, this.statusObj)
      this.SalesStageList =JSON.parse(localStorage.getItem('selectlist')).SalesStage_LIST;
      // console.log(this.SalesStageList,'SalesStageList')
      JSON.parse(localStorage.getItem('selectlist')).SalesStage_LIST.forEach(ele=>{
        // this.stage_obj[ele.code] = ele.value;
        this.stageColor[ele.code] = ele.extvalue;
      })
      this.fetchDate();
      this.purchaserTypeList =JSON.parse(localStorage.getItem('selectlist')).PURCHASER_TYPE_LIST;
      this.ClientSourceList =JSON.parse(localStorage.getItem('selectlist')).CLINET_RESOURCE_LIST;
      this.budgetTypeList = JSON.parse(localStorage.getItem("selectlist")).BUDGET_TYPE_LIST;
    },

     computed: {
      ...mapGetters(['se','rs','languagetype','control']),
      readonly(){
        if(this.control.all_clients ==='02'){
          return true
        }else{
          return false
        }
      }
    },
    watch:{
      "$route": "fetchDate",
      se(val){
        this.purchaserTypeList = val.PURCHASER_TYPE_LIST;
        this.ClientSourceList = val.CLINET_RESOURCE_LIST;
        this.budgetTypeList = val.BUDGET_TYPE_LIST;
         val.ORDER_STATUS_LIST.forEach(element => {
          this.statusObj[element.code] =element.value;
        });
         this.SalesStageList = val.SalesStage_LIST;
        val.SalesStage_LIST.forEach(ele=>{
          // this.stage_obj[ele.code] = ele.value;
          this.stageColor[ele.code] = ele.extvalue;
        })
      },
      formData:{
        // lastname,firstname,mobile,email都输入值了才允许选择金牌客户
        handler(val, oldVal){
           if(val.lastname&&val.firstname&&val.mobilenumber&&val.email){
            this.isgold = false;

          }else{
            this.isgold = true;
            this.formData.isgoldclient = '0'
          }
        },
        deep:true

      }
    },
  }
</script>
<style lang="scss" scoped>
  .stage_warp {
.el-select .el-input .el-select__caret {
    color:#FFF !important;
  }
}
</style>