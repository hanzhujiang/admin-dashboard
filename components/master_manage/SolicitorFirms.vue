<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.solicitor_firms}}</span>
      </div>
      <div class="tools">
        <span v-if="!readonly" @click="setIsUpdate(true)" class="btn_text">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_firm}}</span>
        </span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <div class="filter-count">
              <page-size :pagesize="getData.pagesize" :unit="rs.solicitor_firms"
                @changeSize="handleSizeChange">
              </page-size>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_solicitor_firms" clearable v-model="getData.condition"  @change="search" @keyup.enter='search' class="input-key" size='mini'>
                <el-button slot="append" icon="el-icon-search"></el-button>
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
                  :data="SolicitorFirmList"
                  style="width: 100%"
                  :empty-text = rs.no_data
                  tooltip-effect="light"
                  size="mini">
                  <el-table-column
                    :label="rs.name"
                    :show-overflow-tooltip="true"
                    width="300">
                    <template slot-scope="scope">
                      <span>{{ scope.row.shortname }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.phone"
                    :show-overflow-tooltip="true"
                    width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.officetelephone }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.fax_number"
                    :show-overflow-tooltip="true"
                    width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.officefax }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.address"
                    :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>
                        {{scope.row.addressline}}{{scope.row.addressline?',':''}}{{ scope.row.suburb }}
                        {{ scope.row.state }}
                        {{ scope.row.postcode }}
                        {{ countryObj[scope.row.country] }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.action"
                    width="200">
                    <template slot-scope="scope">
                      <span class="btntext" @click="handleEdit(scope.row)">{{!readonly?rs.edit:rs.detail}}</span>
                      <span class="btntext" @click="handleDelete(scope.row.firmid)" v-if="deletable">{{rs.delete}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
               <div class="table_footer" v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.solicitor_firms}}</div>
                  <div class="fr">
                      <el-pagination
                      :background="false"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="getData.pagenum"
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
      :title="rs.firm"
      :close-on-click-modal='false'
      :visible.sync="dialogShow"
      width='60%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.firm}}
            <span v-if="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <form autocomplete="on">
        <div class="dialog-body">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="form-group">
                    <div class="sub-title-first">{{rs.full_name}}<span class="required">*</span></div>
                    <div class="content">
                      <el-input v-model="formData.fullname" size="small" :disabled="readonly" clearable  @blur="validatorBlur('fullname')" maxlength="100"></el-input>
                      <p class="curtail" v-show="validatorSave.fullname.flg">{{rs[validatorSave.fullname.msg]}}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="form-group">
                    <div class="sub-title">{{rs.short_name}} <span class="required">*</span></div>
                    <div class="content">
                      <el-input v-model="formData.shortname" clearable :disabled="readonly" size="small" maxlength="30"  @blur="validatorBlur('shortname')"></el-input>
                      <p class="curtail" v-show="validatorSave.shortname.flg">{{rs[validatorSave.shortname.msg]}}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="form-group">
                    <div class="sub-title">{{rs.dx_number}}</div>
                    <div class="content">
                      <el-input v-model="formData.dxnumber" clearable :disabled="readonly" size="small" maxlength="30"></el-input>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title">{{rs.office_telephone}}</div>
                    <div class="content">
                      <el-input v-model="formData.officetelephone" size="small" :disabled="readonly" clearable maxlength="20" @blur="validatorBlur('officetelephone')" ></el-input>
                      <p class="curtail" v-show="validatorSave.officetelephone.flg">{{rs[validatorSave.officetelephone.msg]}}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="form-group">
                    <div class="sub-title">{{rs.office_fax}}</div>
                    <div class="content">
                      <el-input v-model="formData.officefax" maxlength="20" :disabled="readonly" clearable size="small" @blur="validatorBlur('officefax')"></el-input>
                      <p class="curtail" v-show="validatorSave.officefax.flg">{{rs[validatorSave.officefax.msg]}}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <address-area :formData="formData" :validatorSave='validatorSave' :lableLine2="rs.po_box" :readonly="readonly"></address-area>
            </el-col>
          </el-row>
        </div>
        <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button   class="small" style="color:#000;" @click="setIsUpdate" v-if="!readonly">
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
  </div>
</template>

<script>

import { insertSolicitorfirm, updateSolicitorfirm, getSolicitorfirmList, deleteSolicitorfirm } from '@/api/solicitorApi.js'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import { Message } from 'element-ui'
export default{
  data() {
    return {
      total:0,//总条数
      start:1,//起始页
      end:10, //结束页
      getData:{
        languagetype: '',
        pagenum:1,
        pagesize:20,
        condition:'',//搜索关键字
      },
      countryObj:{},
    SolicitorFirmList:[],
    dialogShow:false,//这是新增和修改页面弹出层控制器
    isUpdate:'',//区分新增和更新按钮
    resourcelist:'',//国际化语言总数据
    formData:{
      fullname:'',
      shortname:'',
      officetelephone:'',
      officefax:'',
      addressline:'',
      addressline2:'',
      state:'',
      suburb:'',
      postcode:'',
      dxnumber:'',
      country:''
    },
    validatorSave:{
        fullname:{
          vaid:['noNull'],
          flg:false
        },
        shortname:{
          vaid:['noNull'],
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
      },
    show2:true,// 表格是否显示控制
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
      search(){
      this.getData.pagenum =1;
      this.getSolicitorFirm(this.getData)
    },
      // 分页方法
    handleSizeChange(val) {//一页多少条
      this.getData.pagenum =1;
      this.getData.pagesize = val;
      this.getSolicitorFirm(this.getData)
    },
    handleCurrentChange(val) {//第几页
      this.getData.pagenum = val;
      this.getSolicitorFirm(this.getData)
    },
    // ----
    setIsUpdate(mode){
        this.dialogShow =!this.dialogShow;
          this.validatorSave={
          fullname:{
            vaid:['noNull'],
            flg:false
          },
          shortname:{
            vaid:['noNull'],
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
        },
        this.isUpdate=mode;
        if(mode){
          this.formData={
            fullname:'',
            shortname:'',
            officetelephone:'',
            officefax:'',
            addressline:'',
            addressline2:'',
            state:'',
            suburb:'',
            postcode:'',
            country:''
          }
        }
    },
    getSolicitorFirm(data){
      getSolicitorfirmList(data).then(res=>{
        if(res.data.success){
          this.SolicitorFirmList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    handleEdit(data) {
      // 点击修改按钮
      getSolicitorfirmList({firmid:data.firmid}).then(res=>{
        if(res.data.success){
          if(res.data.data.length !=0){
            this.formData  =  res.data.data[0]
          }
        }else{this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});}
      })
      this.setIsUpdate(false);

    },
    handleDelete(id) {
      // 删除
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteSolicitorfirm({ids:id}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_delete_success)
            this.getSolicitorFirm(this.getData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
    });
    },
    handleSave(){
      // 保存
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      if(this.isUpdate){
        insertSolicitorfirm(this.formData).then(res=>{
          this.total = res.data.total;
          if(res.data.success){
            this.dialogShow= false;
            this.$message.success(this.rs.info_msg_insert_success)
            this.getSolicitorFirm(this.getData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        updateSolicitorfirm(this.formData).then(res=>{
          if(res.data.success){
            this.dialogShow= false;
            this.getSolicitorFirm(this.getData);
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    }
  },
  created(){
    // 获取语言资源表数据
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue;
    let countryList =JSON.parse(localStorage.getItem('selectlist')).Country;
    countryList.forEach(element => {
      this.countryObj[element.countryid] = element.countryname
    });
    this.countryObj = Object.assign({}, this.countryObj)
    this.getSolicitorFirm(this.getData);
  },
  watch:{
    se(val){
      let countryList = val.Country;
      countryList.forEach(element => {
        this.countryObj[element.countryid] = element.countryname
      });
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.solicitor_firm ==='02'){
        return true
      }else{
        return false
      }
    },
    deletable(){
      if(this.control.solicitor ==='99'){
        return true
      }else{
        return false
      }
    }
  },
}
</script>
