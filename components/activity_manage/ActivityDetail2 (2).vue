<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.set_activity_detail}}</span>
        <span class="sub_text" v-show="!readonly">[{{rs.add}}]</span>
      </div>
      <div class="tools">
        <el-button   v-if="!readonly" class="bg_save_btn" size="small" @click="save">{{rs.save}}</el-button>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="title">
                    <img src="../../assets/imgs/page/addProject_1.png" alt="">
                    <span>{{rs.activity_detail}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="10">
                  <el-col :span="14">
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <div class="form-group">
                          <div class="sub-title-first">{{rs.title}}
                            <span class="required">*</span>
                          </div>
                          <div class="content">
                            <el-input v-model="formData.title" clearable maxlength="200" size="small" :disabled="readonly" @blur="validatorBlur('title',0)"></el-input>
                            <p class="curtail" v-show="validatorSave.title.flg">{{rs[validatorSave.title.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="form-group">
                          <div class="sub-title-first">{{rs.category}}
                            <span class="required">*</span>
                          </div>
                          <div class="content">
                            <el-select :disabled="readonly" v-model="formData.activitytype" size="small" slot="prepend" placeholder="" clearable  @change="validatorBlur('activitytype',0)">
                              <el-option v-for="item in purchaserTypeList" :key="item.code" :label="item.value" :value="item.code">
                              </el-option>
                            </el-select>
                            <p class="curtail" v-show="validatorSave.activitytype.flg">{{rs[validatorSave.activitytype.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <div class="form-group">
                          <div class="sub-title">{{rs.date_range}}</div>
                          <div class="content">
                            <el-date-picker style="width:90%" :disabled="readonly" @blur="validatorBlur('startdate',1)" size="small" v-model="isFormData.startdate" type="date" placeholder="" :picker-options="pickerOptions0">
                            </el-date-picker>
                          </div>
                          <p class="curtail" v-show="iSvalidator.startdate.flg">{{rs[iSvalidator.startdate.msg]}}</p>
                          <p class="curtail" v-show="compareDate">{{rs.err_msg_date_compare}}</p>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <div class="form-group">
                          <div class="sub-title">&nbsp;</div>
                          <div class="content">
                            <el-date-picker style="width:90%" :disabled="readonly" @blur="validatorBlur('enddate',1)" size="small" v-model="isFormData.enddate" type="date" placeholder="" :picker-options="pickerOptions0">
                            </el-date-picker>
                            <p class="curtail" v-show="iSvalidator.enddate.flg">{{rs[iSvalidator.enddate.msg]}}</p>
                            <p class="curtail" v-show="compareDate">{{rs.err_msg_date_compare}}</p>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <div class="form-group">
                          <div class="sub-title">{{rs.time_range}}</div>
                          <div class="content">
                            <el-time-select style="width:90%" :disabled="readonly" @blur="validatorBlur('starttime',1)" size="small" v-model="isFormData.starttime" :picker-options="{
                                    start: '00:00',
                                    step: '00:15',
                                    end: '23:45'
                                  }">
                            </el-time-select>
                            <p class="curtail" v-show="iSvalidator.starttime.flg">{{rs[iSvalidator.starttime.msg]}}</p>
                            <p class="curtail" v-show="compareitem">{{rs.err_msg_time_compare}}</p>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" >
                        <div class="form-group">
                          <div class="sub-title">&nbsp;</div>
                          <div class="content">
                            <el-time-select
                            style="width:90%"
                            :disabled="readonly"
                            @blur="validatorBlur('endtime',1)"
                            size="small"
                            v-model="formData.endtime"
                            :picker-options="{
                                start: '00:00',
                                step: '00:15',
                                end: '23:45'
                              }">
                            </el-time-select>
                            <p class="curtail" v-show="iSvalidator.endtime.flg">{{rs[iSvalidator.endtime.msg]}}</p>
                            <p class="curtail" v-show="compareitem">{{rs.err_msg_time_compare}}</p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="24">
                        <div class="form-group">
                          <div class="sub-title">{{rs.attend_team}}</div>
                          <div class="content">
                            <el-radio :disabled="readonly" v-model="formData.attendtype" label="1" @change="allAgents('0')">{{rs.all_agents}}</el-radio>
                            <el-radio :disabled="readonly" v-model="formData.attendtype" label="2" @change="allAgents('1')">{{rs.some_department_or_team}}</el-radio>
                          </div>
                          <div class="content">
                            <el-select 
                              :disabled="readonly" size="small" style="width:90%" v-model="isFormData.departmentids" multiple filterable allow-create default-first-option @change="validatorBlur('departmentids',1)" placeholder="">
                              <el-option v-for="item in options5" :key="item.value" :label="item.fullname" :value="item.departmentid">
                              </el-option>
                            </el-select>
                            <p class="curtail" v-show="iSvalidator.departmentids.flg">{{rs[iSvalidator.departmentids.msg]}}</p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="10">
                    <el-row :gutter="10">
                      <el-col :span="24">
                        <div class="form-group">
                          <div class="sub-title-first">{{rs.comments}} </div>
                          <div class="content">
                            <el-input type="textarea"  :disabled="readonly" rows=6 v-model="formData.contents" class="tex-bor" clearable maxlength="500" size="small"></el-input>
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
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="2">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/page/attachments_1.png" alt="">
                    <span>{{rs.attachment}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <div class="upload_box">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                      <div class="upload_area">
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
                            <div class="el-upload__text"  v-if="!videoFlagPictures">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png,</div>
                            <div class="el-upload__text"  v-if="!videoFlagPictures">.pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                        </el-upload>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                      <div class="file_list_area">
                        <ul>
                          <li v-for="(d,i) in pictureList" :key="i"
                              v-dragging="{ item: d, list: pictureList, group: 'color' }">
                            <el-row>
                              <el-col :xs="24" :sm="24" :md="2" :lg="2" :xl="2" :offset="1">
                                <span>
                                  <i class="fa fa-bars"></i>
                                </span>
                                <span >{{i+1}}</span>
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
                                <el-input :disabled="readonly"  size='mini' v-model="pictureList[i].displayname"></el-input>
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3" :offset='1'>
                                <el-button   class="small bg_red" size="mini" @click="handleDelete(d,pictureList)" v-if="!readonly">
                                  <span>{{rs.delete}}</span></el-button>
                              </el-col>
                            </el-row>
                          </li>
                        </ul>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="3">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="title">
                    <img src="../../assets/imgs/page/attendanceResults_2.png" alt="">
                    <span>{{rs.address}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <address-area :formData="formData" :validatorSave='validatorSave' :readonly="readonly"></address-area>
                    <el-row :gutter="20" style="padding-top:54px;">
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
                  </el-col>
                  <el-col :span="12">
                    <bing-map-layer :singleAddress="singleaddress" :isCoordinate="mod" :callback="showDailog" @getLocationNums="getLocationNums" :onInitSuccess="init" :isClickable=true style="height:320px;width:100%;margin:10px 10px 5px 0;">
                    </bing-map-layer>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getDeparmentList } from "@/api/departmentApi.js";
import { getOption } from "@/api/optionValueApi.js";
import { insertActivity, getActivity, updateActivity } from "@/api/activityApi.js";
import { validator, allvalidator } from "@/validator/validator.js";
import { toAddressString } from "@/assets/js/utility.js"
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { mapGetters } from "vuex";
import axios from 'axios'
export default {
  data() {
    return {
      pictureList:[],
      fileList:[],
      actionUrl1:'',
      videoFlagPictures:false,
      compareDate: false,
      compareitem: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //控制日期组件不能选择当天以前的
        }
      },
      activeNames: ["1", "2" , "3"], //折叠面板
      formData: {
        title: "",
        activitytype: "",
        startdate: "",
        enddate: "",
        departmentids: [],
        contents: "",
        addressline: "",
        addressline2: "",
        suburb: "",
        state: "",
        postcode: "",
        country: "",
        attendtype: "",
        codeData: "",
        latitude: "",
        longitude: "",
        attachmentlist:''
      },
      iSvalidator: {
        startdate: {
          vaid: ["noNull"],
          flg: false
        },
        starttime: {
          vaid: ["noNull"],
          flg: false
        },
        enddate: {
          vaid: ["noNull"],
          flg: false
        },
        endtime: {
          vaid: ["noNull"],
          flg: false
        },
        departmentids: {
          vaid: ["noArr", "noNull"],
          flg: false
        }
      },
      isFormData: {
        startdate: null,
        starttime: null,
        enddate: null,
        endtime: null,
        departmentids: []
      },
      validatorSave: {
        title: {
          vaid: ["noNull"],
          flg: false
        },
        activitytype: {
          vaid: ["noNull"],
          flg: false
        },
        longitude: {
          vaid: ["noNull"],
          flg: false
        },
        latitude: {
          vaid: ["noNull"],
          flg: false
        },
        postcode: {
          vaid: ["Number"],
          flg: false
        }
      },
      purchaserTypeList: [],
      countryList: [],

      options5: [],

      mod: false,
      singleaddress: {}, //地图地址
      countryObj: {},
      detailShow: false
    };
  },
  components: {
    "top-nav": resolve => require(["@/common/TopNav.vue"], resolve),
    "language-name": resolve => require(["@/common/LanguageName"], resolve),
    "address-area": resolve => require(["@/common/AddressArea.vue"], resolve),
    "select-solicitor": resolve =>
      require(["@/common/SelectSolicitor.vue"], resolve),
    "bing-map-layer": resolve => require(["@/common/BingMapLayer.vue"], resolve)
  },
  watch: {
    languagetype(val) {
      this.getOptionCategory('01','03')
    }
  },
  created() {
    this.actionUrl1 = axios.defaults.baseURL+'activity/uploadFile';//图片上传地址
    this.countryList = JSON.parse(localStorage.getItem("selectlist")).Country;
    this.countryList.forEach(element => {
      this.countryObj[element.countryid] = element.countryname;
    });
    this.countryObj = Object.assign({}, this.countryObj);
    // this.purchaserTypeList = JSON.parse(
    //   localStorage.getItem("selectlist")
    // ).ACTIVITY_TYPE_LIST;
    this.getOptionCategory('01','03')
    this.getCountList();
    if (this.$route.query.type == "add") {
    } else {
      this.echo();
    }
  },
  methods: {
    getOptionCategory(keyid1,keyid2){
      let data = {
        keyid1:keyid1,
        keyid2:keyid2,
        languagetype:localStorage.getItem('languagetype')
      }
      getOption(data).then(res=>{
        if (res.data.success) {
          this.purchaserTypeList = res.data.data
        }

      })
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
    LightImgPictures(res,file){
      this.videoUploadPercentPictures = 100;
      this.videoFlagPictures = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      let fileData={
              displayname:file.name,
              filepath:file.response.path,
              attachmenttype: "01",//文件类型
              refertype:'4',
              displayorder:this.pictureList.length+1,
        }
        if(this.pictureList.length<10){
          this.pictureList.push(fileData)
      }else{
          this.$message.error('最多上传10个文件');
      }
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
      return  (isBMP || isJPG || isGIF || isPNG || isPdf || isdoc || isdocx || iszip || israr || isxls || isxlsx)&&isLt100M;
    },
    uploadVideoProcessPictures(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoFlagPictures = true;
      this.videoUploadPercentPictures = parseInt(file.percentage.toFixed(0));
    },
    toDate(date){
      let times = formatDate( newDate(date),'yyyy-MM-dd hh:mm')
      times  = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
      return times
    },
    toTime(time) {
      
       let times = formatDate( newDate(time),'yyyy-MM-dd hh:mm')
          times = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
          times = formatDate( new Date(times),'hh:mm')
      return times;
    },
    echo() {
      getActivity({
        activityid: JSON.parse(sessionStorage.getItem("allsctivitiesList")).activityid

      }).then(res => {
        if (res.data.success) {
          this.pictureList = res.data.attachmentlist
          this.formData = res.data.activitydata;
          this.formData.startdate = this.toDate(res.data.activitydata.startdate)
          this.formData.starttime = this.toTime(res.data.activitydata.startdate)
          this.formData.enddate = this.toDate(res.data.activitydata.enddate)
          this.formData.endtime = this.toTime(res.data.activitydata.enddate)

          res.data.attendlist.forEach(val => {
            this.formData.departmentids.push(val.departmentid);
          });

        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    CompareItem(d1, d2) {
      var c1 = Date.parse("2008-08-08 " + d1); //'2008-08-08'这个日期随便给
      var c2 = Date.parse("2008-08-08 " + d2);
      if (c1 > c2) {
        return false;
      } else if (c1 < c2) {
        return true;
      } else {
        return false;
      }
    },
    CompareDate(d1, d2) {
      var c1 = Date.parse(d1); //'2008-08-08'这个日期随便给
      var c2 = Date.parse(d2);
      if (c1 > c2) {
        return false;
      } else if (c1 < c2) {
        return true;
      } else {
        return true;
      }
    },
    save() {
      if (allvalidator(this.iSvalidator, this.isFormData)) {
        return;
      }
      
      if (!this.CompareItem(this.isFormData.starttime, this.isFormData.endtime)) {
        this.compareitem = true;
        return;
      } else {
        this.compareitem = false;
      }
      
      if ( !this.CompareDate(this.isFormData.startdate, this.isFormData.enddate)) {
        this.compareDate = true;
        return;
      } else {
        this.compareDate = false;
      }
      
      this.formData.departmentids = this.isFormData.departmentids.join(",");
      this.formData.attachmentlist = JSON.stringify(this.pictureList)

      let startdate = formatDate(new Date(this.isFormData.startdate.getTime()),"yyyy-MM-dd") +" " +this.isFormData.starttime;
      let enddate = formatDate(new Date(this.isFormData.enddate.getTime()), "yyyy-MM-dd") + " " +this.isFormData.endtime;

      this.formData.enddate = formatDate(new Date(new Date(enddate).getTime() + new Date().getTimezoneOffset() * 60000),"yyyy-MM-dd hh:mm:ss");
      this.formData.startdate = formatDate(new Date(new Date(startdate).getTime() + new Date().getTimezoneOffset() * 60000),"yyyy-MM-dd hh:mm:ss");


      if (this.$route.query.type == "add") {
        insertActivity(this.formData).then(res => {
          if (res.data.success) {
            this.$router.push({ path: "/activity_manage/allActivities" });
            this.$message.success(this.rs.info_msg_insert_success);
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      } else {
        updateActivity(this.formData).then(res => {
          if (res.data.success) {
            this.$message.success(this.rs.info_msg_insert_success);
            this.$router.push({ path: "/activity_manage/allActivities" });
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      }
    },
    validatorBlur(key, type) {
      
      if (type == 0) {
        validator(this.validatorSave, this.formData, key);
      } else {
        validator(this.iSvalidator, this.isFormData, key);
      }
    },
    allAgents(type) {
      this.isFormData.departmentids = [];
      if (type == "0") {
        this.options5.forEach(val => {
          this.isFormData.departmentids.push(val.departmentid);
        });
      }
    },
    setmap() {
      this.mod = false;
      this.singleaddress = {
        code: "001",
        text: toAddressString(this.formData, false),
        category: "01"
      };
    },
    showDailog(code, pos_x, pos_y, latitude, longitude) {
      this.formData.latitude = latitude;
      this.formData.longitude = longitude;
    },
    getLocationNums(...data) {
      this.position = data[0];
    },
    init() {
      this.mod = true;
      this.singleaddress = {
        code: "001",
        text: toAddressString(this.formData, false),
        longitude: this.formData.longitude,
        latitude: this.formData.latitude,
        category: "01"
      };
    },
    getCountList() {
      getDeparmentList().then(res => {
        if (res.data.success) {
          this.options5 = res.data.data;
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    ErrorMsgStr(arr) {
      let str = "";
      arr.forEach(element => {
        str += this.rs[element.message] + "(" + element.target + ")";
      });
      return str;
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
  },
  computed: {
    ...mapGetters(["se", "rs", "languagetype", "control"]),
    readonly() {
      if (
        this.control.all_activities === "02" ||
        this.$route.query.type == "detail"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>


