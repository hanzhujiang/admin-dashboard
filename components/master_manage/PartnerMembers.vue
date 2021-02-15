<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.partner_members}}</span>
      </div>
      <!-- <el-button class="bg_save_btn " v-if="!readonly"  @click="handleSave" size="small">{{rs.save}}</el-button> -->
      <div class="tools">
        <span v-if="!readonly" @click="dialogVisible(true)" class="btn_text">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_member}}</span>
        </span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <div class="filter-count">
              <page-size :pagesize="getData.pagesize" :unit="rs.members"
                @changeSize="handleSizeChange">
              </page-size>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_members" clearable v-model="getData.condition" class="input-key" size='mini' @change="search" @keyup.enter='search'>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-table
                  :data="brokerList"
                  :empty-text = rs.no_data
                  style="width: 100%"
                  tooltip-effect="light"
                  size="mini">
                  <el-table-column
                    :label="rs.firm">
                    <template slot-scope="scope">
                      <span>{{ scope.row.shortname }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.member">
                    <template slot-scope="scope">
                      <span>{{ scope.row.firstname }} {{scope.row.lastname}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.email"
                    :show-overflow-tooltip="true"
                    width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.email }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.mobile_number"
                    :show-overflow-tooltip="true"
                    width="140">
                    <template slot-scope="scope">
                    <span>{{ scope.row.mobilenumber }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.license_status"
                    width="90">
                    <template slot-scope="scope">
                         {{scope.row.authorization == '0'?rs.unauthorized:scope.row.authorization == '1'?rs.authorized:scope.row.authorization == '2'?rs.expire_soon:scope.row.authorization == '3'?rs.pastdue:scope.row.authorization == '4'?rs.expired:'-'}}
                    <!-- <span>{{scope.row.authorization =='1'?"":scope.row.authorization =='2'?"":scope.row.authorization =='3'?"":scope.row.authorization =='4'?"":''}}</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.is_actived"
                    :show-overflow-tooltip="true"
                    width="100">
                    <template slot-scope="scope">
                    <span>{{ scope.row.isactived==1?rs.yes:rs.no  }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.action"
                    width="300">
                  <template slot-scope="scope">
                    <span class="btntext" @click="handleEdit(scope.row)">{{!readonly?rs.edit:rs.detail}}</span>
                    <span class="btntext" @click="handleDelete(scope.row.brokerid)" v-if="deletable">{{rs.delete}}</span>
                    <span class="btntext" @click="handleSelectLicenseShow(scope.row)"  v-if="!readonly">{{rs.licenses}}</span>
                    <!-- <span class="btntext" v-if="!readonly">授权</span>
                    <span class="btntext" v-if="!readonly">重置密码</span> -->
                  </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="table_footer" v-if="total">
                <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.members}}</div>
                <div class="fr">
                  <el-pagination
                  :background="false"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  :page-size="getData.pagesize"
                  :total="total" class="fr">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :title="rs.members"
      :close-on-click-modal='false'
      :visible.sync="dialogShow"
      width='60%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.members}}
            <span v-if="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <form autocomplete="on">
        <div class="dialog-body">
          <el-row :gutter="10" class="">
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title-first">{{rs.first_name}} <span class="required">*</span></div>
                    <div class="content">
                      <el-input v-model="formData.firstname" maxlength="50" :disabled="readonly" clearable size="small" @blur="validatorBlur('firstname')"></el-input>
                      <p class="curtail" v-show="validatorSave.firstname.flg">{{rs[validatorSave.firstname.msg]}}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title-first">{{rs.last_name}}<span class="required">*</span></div>
                    <div class="content">
                      <el-input v-model="formData.lastname" maxlength="50" :disabled="readonly" clearable size="small"  @blur="validatorBlur('lastname')"></el-input>
                      <p class="curtail" v-show="validatorSave.lastname.flg">{{rs[validatorSave.lastname.msg]}}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title">{{rs.firm}}<span class="required">*</span></div>
                    <div class="content">
                      <el-select v-model="formData.firmid" placeholder="" :disabled="readonly" clearable filterable size="small" style="width:100%" @change="validatorBlur('firmid')">
                        <el-option
                        v-for="item in firmList"
                        :key="item.firmid" 
                        :label="item.shortname"
                        :value="item.firmid">
                        </el-option>
                      </el-select>
                      <p class="curtail" v-show="validatorSave.firmid.flg">{{rs[validatorSave.firmid.msg]}}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title">{{rs.gender}}</div>
                    <div class="content">
                      <el-select v-model="formData.gender" slot="prepend" :disabled="readonly" clearable size="small" style="width:100%">
                        <el-option :label="rs.male" value="0"></el-option>
                        <el-option :label="rs.female" value="1"></el-option>
                      </el-select>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title">{{rs.email}}<span class="required">*</span></div>
                    <div class="content">
                      <el-input v-model="formData.email" maxlength="100" :disabled=(isUpdate?false:true) size="small" @blur="validatorBlur('email')" ></el-input>
                      <p class="curtail" v-show="validatorSave.email.flg">{{rs[validatorSave.email.msg]}}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title">{{rs.mobile_number}}</div>
                    <div class="content">
                      <el-input v-model="formData.mobilenumber" maxlength="20" :disabled="readonly" clearable size="small" @blur="validatorBlur('mobilenumber')"></el-input>
                      <p class="curtail" v-show="validatorSave.mobilenumber.flg">{{rs[validatorSave.mobilenumber.msg]}}</p>
                    </div>
                  </div>
                </el-col>
                <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title">{{rs.dx_number}}</div>
                    <div class="content">
                      <el-input v-model="formData.dxnumber" maxlength="100" size="small"></el-input>
                    </div>
                  </div>
                </el-col> -->
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="content fl" >
                      <el-checkbox style="padding-top:10px;"
                      :label="rs.is_actived"
                      :disabled="readonly"
                      v-model="formData.isactived" size="small"
                      true-label='1' false-label='0'></el-checkbox>
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
                  <div v-if="formData.photo"  style="height: 100%;">
                    <div style=" width: 100%;height: 100%;overflow: hidden;">
                      <div class="zoomImage" :style="{backgroundImage:'url('+formData.photo+')'}"></div>
                    </div>
                  </div>
                  <!-- <img v-if="formData.photo" :src="formData.photo" style="width:100%;height:160px" class="avatar"> -->
                  <img src="../../assets/imgs/no_images.png" alt="" style="width:100%;height:160px"  v-else-if="!isUpdate">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button   class="small" style="color:#000;" @click="dialogVisible(true)" v-if="!readonly">
                <!-- <i class="fa fa-close"></i> -->
                {{rs.close}}</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fr">
                <el-button   class="small bg_blue" @click="handleSave" v-if="!readonly">
                <!-- <i class="fa fa-save"></i> -->
                {{rs.save}}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </form>
    </el-dialog>
    <el-dialog :close-on-click-modal='false' :visible.sync="selectLicenseShow" width='60%'>
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.select_license}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-table
            :empty-text = rs.no_data
            :data="licenseBrokersList"
            tooltip-effect="light"
            width='100%'
            size="mini">
              <el-table-column
                prop="licenseno"
                :label="rs.license_no"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="productname"
                :label="rs.product">
              </el-table-column>
                <el-table-column
                prop="usednumber"
                :label="rs.user_license_number"
                width="150px">
                <template slot-scope="scope">
                  <div>
                    {{scope.row.usednumber}} / {{scope.row.usernumber=='10000'?rs.unlimited:scope.row.usernumber}}
                  </div>
                </template>
              </el-table-column>
                <el-table-column
                prop="startdatetime"
                :label="rs.actived_date">
              </el-table-column>
                <el-table-column
                prop="enddatetime"
                :label="rs.license_expiry_date">
              </el-table-column>
                <el-table-column
                prop="isauth"
                :label="rs.status">
                <template slot-scope="scope">
                  {{scope.row.isauth=='1'?rs.authorized:rs.unauthorized}}
                </template>
              </el-table-column>
              <el-table-column 
                :label="rs.action"
                width="150">
                <template slot-scope="scope">
                  <el-button    v-if="scope.row.isauth == '1'" class="btntext fl" size="mini" @click="handleRelieve(scope.row)">{{rs.relieve}}</el-button>
                  <!-- <el-button v-if="!scope.row.isauth&& scope.row.usednumber !=scope.row.usernumber" class="btntext fl" size="mini" @click="handleLicenses(scope.row)">{{rs.grant_license}}</el-button> -->
                  <el-button   v-else class="btntext fl" size="mini" @click="handleLicenses(scope.row)">{{rs.grant_license}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBroker, deleteBroker, getBrokerFirm, insertBroker, updateBroker, getBrokerLicenseData , brokerUserlicenseinsert,deleteUserlicense} from '@/api/partnerApi.js'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import axios from 'axios'
export default{
    data() {
    return {
      selectLicenseShow:false,
      licenseBrokersList:[],
      total:0,//总条数
      start:1,//起始页
      end:10, //结束页
      actionUrl:'',
      brokerList:[],
      isUpdate:true,
      firmList:[],
    getData:{
      agencyid: '',
      languagetype: '',
      pagenum:1,
      pagesize:20,
      condition:'',//搜索关键字
      },
    dialogShow:false,
    formData:{
      agencyid: '',
      firstname:'',
      lastname:'',
      firmid:'',
      email:'',
      mobilenumber:'',
      gender:0,
      isactived:0,
      photo:'',
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
      firmid:{
        vaid:['noNull'],
        flg:false,
      },
      email:{
        vaid:['Email','noNull'],
        flg:false
      },
      mobilenumber:{
        vaid:['phoneNumber'],
        flg:false
        },
      },
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve)
    },
  created(){
    this.actionUrl =axios.defaults.baseURL+'partner/uploadFile';
    // 获取语言资源表数据
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.getData.languagetype = localStorage.getItem('languagetype');
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue;
    if(this.$route.params.id == 'agency'){
      this.getData.agencyid = userInfo.agencyid;
    }
    this.getBrokerList(this.getData);
    this.getBrokerFirmList();
    

  },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.partner_member ==='02'){
        return true
      }else{
        return false
      }
    },
    deletable(){
      if(this.control.partner_member ==='99'){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
      // 表单单个验证
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    search(){
      this.getBrokerList(this.getData)
    },
      // 分页方法
    handleSizeChange(val) {//一页多少条
      this.getData.pagenum =1;
      this.getData.pagesize = val;
      this.getBrokerList(this.getData)
    },
    handleSelectLicenseShow(row){
      this.selectLicenseShow = true;
      this.getBrokersLicenseList({brokerid:row.brokerid,systemtype:'03',isactive:'1',userid:row.userid});
    },
    // 解除授权
    handleRelieve(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteUserlicense({ids:row.userlicenseid}).then(res =>{
            if(res.data.success){
              this.$message.success(this.rs.info_msg_update_success);
              this.getBrokersLicenseList({userid:row.userid,systemtype:'03',isactive:'1',brokerid:row.brokerid});
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      }); 
    },
    // 授权
    handleLicenses(row){
      brokerUserlicenseinsert({brokerid:row.brokerid,licenseid:row.licenseid,usertype:'3',userid:row.userid}).then(res =>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success);
          this.getBrokersLicenseList({userid:row.userid,systemtype:'03',isactive:'1',brokerid:row.brokerid});
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getBrokersLicenseList(data){
      getBrokerLicenseData(data).then(res =>{
        if(res.data.success){
          this.licenseBrokersList = res.data.data;
        }
      })
    },
    handleCurrentChange(val) {//第几页
      this.getData.pagenum = val;
      this.getBrokerList(this.getData)
    },
    // ----
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
    getBrokerFirmList(){
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      getBrokerFirm({agencyid:userInfo.agencyid,languagetype:localStorage.getItem('languagetype')}).then(res=>{
        if(res.data.success){
          this.firmList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    handleSave(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
        // 新增或者修改
      if(this.isUpdate){
        insertBroker(this.formData).then(res=>{
          if(res.data.success){
            this.dialogShow = false;
            this.getBrokerList(this.getData);
            this.$message.success(this.rs.info_msg_insert_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        delete this.formData.updatedtimestamp
        delete this.formData.latestcontacteddatetime
        delete this.formData.dateofbirth
        delete this.formData.deletedflag
        updateBroker(this.formData).then(res=>{
          if(res.data.success){
            this.dialogShow = false;
            this.getBrokerList(this.getData);
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },

    getAgent(){
      getAgentList().then(res=>{
        this.AgentList = res.data.data;
      })
    },
    getAgentName(){
      //显示Agent列表
      this.dialogShow =!this.dialogShow;

    },
    getBrokerList(data){
      getBroker(data).then(res=>{
        if(res.data.success){
            this.brokerList = res.data.data;
            this.total = res.data.total;
            this.end = res.data.end;
            this.start = res.data.start;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    handleEdit(data) {
      getBroker({brokerid:data.brokerid}).then(res=>{
        if(res.data.success){
          if(res.data.data.length !=0){
            this.formData = res.data.data[0];
          }
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
      this.isUpdate = false;
      this.dialogVisible(false);
    },
    handleDelete(id) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteBroker({ids:id}).then(res=>{
          if (res.data.success) {
              this.$message.success(this.rs.info_msg_delete_success)
              this.getBrokerList(this.getData);
          } else {
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    },
    goRouter(path){
      this.$router.push(path)
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    dialogVisible(mode){
      this.dialogShow =!this.dialogShow;
      this.validatorSave={
      firstname:{
        vaid:['noNull'],
        flg:false
      },
      lastname:{
        vaid:['noNull'],
        flg:false
      },
      firmid:{
        vaid:['noNull'],
        flg:false,
      },
      email:{
        vaid:['Email','noNull'],
        flg:false
      },
      mobilenumber:{
        vaid:['phoneNumber'],
        flg:false
        },
      };
      this.isUpdate = mode;
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(this.isUpdate){
        this.formData={
          agencyid:userInfo.agencyid,
          firstname:'',
          lastname:'',
          firmid:'',
          email:'',
          mobilenumber:'',
          gender:'0',
          isactived:'0',
          photo:'',
        }
      }
    },
  },
}
</script>
