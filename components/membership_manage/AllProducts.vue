<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.all_products}}</span>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="side_tab">
            <div class="side_tab_box">
              <div class="box-header" >
                <div class="title" >
                  <span >{{rs.products}}</span>
                </div>
                <div class="tools">
                  <span v-if="!readonly" @click="handleAddProduct" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_new_product}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body" >
                <div class="card_box"  v-for="(d,i) in productList" :key="i" style="padding:5px " @click="getProductInfo(d)">
                  <div class="pic_area">
                    <img :src="d.picture" alt="" style="width:100px;height:auto" v-if="d.picture">
                    <img src="../../assets/imgs/no_images.png" style="width:100px;height:auto" alt="" v-else>
                  </div>
                  <div class="info_area">
                    <p class="line">
                      <span style="color: #3c8dbc;">{{d.productname}}</span>
                      <!-- <el-button @click.stop="handleEditProduct(d)" class="small bg_blue fr" size="mini">{{rs.edit}}</el-button> -->
                      <span class="btntext fr" @click.stop="handleEditProduct(d)">{{rs.edit}}</span>
                    </p>
                    <p class="line">
                      <span>{{systemObj[d.systemtype]}}</span>
                      <span class="btntext fr" @click.stop="handleDeleteProduct(d)">{{rs.delete}}</span>
                    </p>
                    <p class="line">
                      <span>{{d.name}}</span>
                    </p>
                    
                    <p class="line" v-if="d.pricetype=='0'" style="font-weight: bold;height:20px">
                      <span class="fr">{{rs.monthly}} ${{setNumber(d.unitprice)}} / {{rs.user}}</span>
                    </p>
                    <p class="line" v-if="d.pricetype=='1'" style="font-weight: bold;height:20px">
                      <span class="fr">{{rs.monthly}} ${{setNumber(d.unitprice)}}</span>
                    </p>
                    
                  </div>
                  <div style="font-weight: bold;height:40px;">
                    <span class="" style="float:left;padding-left:10px;color:red;">{{d.synchstatus ==1?rs.syn_create_failed:d.synchstatus ==2?rs.syn_modify_failed:d.synchstatus==3?rs.syn_delete_failed:''}}</span>
                    <span class="btn_text fr" v-if="d.synchstatus !=0" @click.stop="handleProductSynchronizeAgain(d)">{{rs.synch_again}}</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" v-if="isRight">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <span>{{productInfo.productname}}</span>
              </div>
              <div class="tools">
                <el-button    class="bg_save_btn" @click="handleSaveP" size="mini">{{rs.save}}</el-button>
              </div>
            </div>
            <div class="box-body" style="padding-top: 0;" v-if="productInfo.pricetype == '0'">
              <el-row style="padding: 20px 10px 20px;" @click.native="ismounted = true">
                <el-col :span="4">
                  <span>{{rs.user_num}}</span>
                </el-col>
                <el-col :span="20">
                  <el-checkbox-group v-model="userList" >
                    <el-checkbox v-for="(item,index) in usernumberList"  :label="item.code"  :key="index">{{item.value}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <!-- <el-row style="padding: 10px;" @click.native="ismounted = true">
                <el-col :span="4">
                  <span>{{rs.purchase_month_num}}</span>
                </el-col>
                <el-col :span="20">
                  <el-checkbox-group v-model="monthList"  >
                    <el-checkbox v-for="(item,index) in monthnumberList" :label="item.code" :key="index">{{item.value}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row> -->
              <el-row style="padding:5px 20px;border-bottom:1px solid #000">
                <el-col :span="4">{{rs.user_num}}</el-col>
                <el-col :span="4" >{{rs.purchase_month_num}}</el-col>
                <el-col :span="4" >{{rs.standard_price}}</el-col>
                <el-col :span="4">{{rs.discount_price}}</el-col>
                <el-col :span="8">{{rs.synch_status}}</el-col>
              </el-row>
              <el-row style="padding:5px 20px;" v-for="(d,i) in userMonthList" :key="i">
                <el-col :span="4" style="padding-top: 10px;">{{usernumberObjValue[d.usernumber]}}</el-col>
                <el-col :span="4" style="padding-top: 10px;">{{monthnumberObjValue[d.monthnumber]}}</el-col>
                <el-col :span="4" style="padding-top: 10px;">{{d.standardprice?"$":''}}{{setNumber(d.standardprice)}}</el-col>
                <el-col :span="4">
                  <!-- {{d.discountprice}} -->
                  <el-input v-model="d.discountprice" style="width:90%;" clearable :disabled="readonly" size="small" maxlength="30"></el-input>
                </el-col>
                <el-col :span="8" style="padding-top: 10px;">
                  <span>
                  {{d.synchstatus==0?rs.syn_success:d.synchstatus == 1?rs.syn_create_failed:d.synchstatus ==2?rs.syn_modify_failed:d.synchstatus == 3?rs.syn_delete_failed:'-'}}
                  </span>
                  <span class="btn_text" v-if="d.synchstatus==1||d.synchstatus==2||d.synchstatus==3?true:false" @click="handleSynchronizeAgain(d)">{{rs.synch_again}}</span>
                </el-col>
              </el-row>
            </div>
            <div v-if="productInfo.pricetype == '1'"> 
               <el-row style="padding:5px 20px;border-bottom:1px solid #000">
                <el-col :span="4">{{rs.user_num}}</el-col>
                <el-col :span="4" >{{rs.purchase_month_num}}</el-col>
                <el-col :span="4" >{{rs.standard_price}}</el-col>
                <el-col :span="4">{{rs.discount_price}}</el-col>
                <el-col :span="8">{{rs.synch_status}}</el-col>
              </el-row>
              <!-- userMonthList -->
              <el-row style="padding:5px 20px;" v-for="(d,i) in userMonthList" :key="i">
                <el-col :span="4" style="padding-top: 10px;">{{d.usernumber=='99'?rs.unlimited:usernumberObjValue[d.usernumber]}}</el-col>
                <el-col :span="4" style="padding-top: 10px;">{{monthnumberObjValue[d.monthnumber]}}</el-col>
                <el-col :span="4" style="padding-top: 10px;">{{d.standardprice?"$":''}}{{setNumber(d.standardprice)}}</el-col>
                <el-col :span="4">
                  <!-- {{d.discountprice}} -->
                  <el-input v-model="d.discountprice" style="width:90%;" clearable :disabled="readonly" size="small" maxlength="30"></el-input>
                </el-col>
                <el-col :span="8" style="padding-top: 10px;">
                  <span>
                   {{d.synchstatus==0?rs.syn_success:d.synchstatus == 1?rs.syn_create_failed:d.synchstatus ==2?rs.syn_modify_failed:d.synchstatus == 3?rs.syn_delete_failed:'-'}}
                  </span>
                  <span class="btn_text" v-if="d.synchstatus!=0?true:false" @click="handleSynchronizeAgain(d)">{{rs.synch_again}}</span>
                  <span class="btn_text"  @click="handleSynchronizeAgain(d)">{{rs.synch_again}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <!-- 添加产品 -->
       <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" v-else>
        <div class="box">
          <div class="box-header">
            <div class="title">
              <span>{{isUpdate?rs.add_new_product:formData.productname}}</span>
            </div>
            <div class="tools">
              <el-button   class="bg_save_btn" @click="handleAddProductSave" size="mini">{{rs.save}}</el-button>
            </div>
          </div>
          <div class="box-body" style="padding-top: 0;">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                <div class="form-group">
                  <div class="sub-title-first">{{rs.product_name}} <span class="required">*</span></div>
                  <div class="content">
                    <el-input v-model="formData.productname" clearable :disabled="readonly" size="small" maxlength="200" @blur="validatorBlur('productname')"></el-input>
                    <p class="curtail" v-show="validatorSave.productname.flg">{{rs[validatorSave.productname.msg]}}</p>
                  </div>
                </div>
                <div class="form-group">
                  <div class="sub-title">{{rs.system_type}} <span class="required">*</span></div>
                  <div class="content">
                    <el-select v-model="formData.systemtype" size="small" placeholder="" :disabled="readonly" @change="systemTypeChange">
                      <el-option
                      v-for="(item,i) in systemTypeList"
                      :key="i"
                      :label="item.value"
                      :value="item.code">
                      </el-option>
                    </el-select>
                    <p class="curtail" v-show="validatorSave.systemtype.flg">{{rs[validatorSave.systemtype.msg]}}</p>
                  </div>
                </div>
                <div class="form-group">
                  <div class="sub-title">{{rs.custom_type}} <span class="required">*</span></div>
                  <div class="content">
                    <el-select v-model="formData.customsystemtype" size="small" placeholder="" :disabled="readonly"  @change="customSystemTypeChange">
                      <el-option
                      v-for="(item,i) in customTypeList"
                      :key="i"
                      :label="item.value"
                      :value="item.code">
                      </el-option>
                    </el-select>
                    <p class="curtail" v-show="validatorSave.customsystemtype.flg">{{rs[validatorSave.customsystemtype.msg]}}</p>
                  </div>
                </div>
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
                    <img v-if="picture" :src="picture" style="width:100%;height:160px" class="avatar">
                    <img src="../../assets/imgs/no_images.png" alt="" style="width:100%;height:160px"  v-else-if="isUpdate">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="form-group">
                  <div class="sub-title">{{rs.price_type}}</div>
                  <div class="content">
                    <el-select v-model="formData.pricetype" slot="prepend" clearable size="small" :disabled="readonly" style="width:100%">
                      <el-option :label="rs.per_user_month" value="0"></el-option>
                      <el-option :label="rs.per_month" value="1"></el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="form-group">
                  <div class="sub-title">{{rs.unit_price}} <span class="required">*</span></div>
                  <div class="content">
                    <el-input v-model="formData.unitprice" clearable :disabled="readonly" size="small" maxlength="10"  @blur="validatorBlur('unitprice')"></el-input>
                    <p class="curtail" v-show="validatorSave.unitprice.flg">{{rs[validatorSave.unitprice.msg]}}</p>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="form-group">
                  <div class="sub-title">{{rs.display_order}}</div>
                  <div class="content">
                    <el-input v-model="formData.displayorder" clearable :disabled="readonly" size="small" maxlength="11" style="width:80px"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="sub-title"></div>
                  <div class="content">
                    <el-checkbox :label="rs.on_market" :disabled="readonly" v-model="formData.status" size="small" true-label='1' false-label='0'></el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="sub-title"></div>
                  <div class="content">
                    <el-checkbox :label="rs.is_special_price" :disabled="readonly" v-model="formData.isspecial" size="small" true-label='1' false-label='0'></el-checkbox>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="formData.isspecial == '1'">
          <!-- 特享中介 -->
        <div class="box"  v-if="formData.systemtype != '03'">
          <div class="box-header">
            <div class="title">
              <span>{{rs.special_for_agencies}}</span>
            </div>
            <div class="tools">
              <el-button   class="bg_save_btn" @click="handleSelectAgency" size="mini">{{rs.add}}</el-button>
            </div>
          </div>
          <div class="box-body" style="padding-top: 0;">
            <div class="table_box">
              <el-table
                :empty-text = rs.no_data
                :data="agencylist"
                tooltip-effect="light"
                width='100%'
                size="mini">
                <el-table-column
                  prop="shortname"
                  :label="rs.short_name">
                </el-table-column>
                <el-table-column
                  prop="contactperson"
                  :label="rs.principal">
                </el-table-column>
                <el-table-column
                  prop="officetelephone"
                  :label="rs.office_telephone">
                </el-table-column>
                <el-table-column
                  prop="officefax"
                  :label="rs.office_fax">
                </el-table-column>
                <el-table-column
                  prop="email"
                  :label="rs.email">
                </el-table-column>
                <el-table-column width="100">
                  <template slot-scope="scope">
                    <span class="btn_text" @click="handleDelete(scope.row)">{{rs.delete}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
          <!-- end -->
          <!-- Partner -->
        <div class="box" v-else>
          <div class="box-header">
            <div class="title">
              <span>{{rs.special_price_for_partner_firm}}</span>
            </div>
            <div class="tools">
              <el-button   class="bg_save_btn" @click="handleSelectPartner" size="mini">{{rs.add}}</el-button>
            </div>
          </div>
          <div class="box-body" style="padding-top: 0;">
            <div class="table_box">
              <el-table
                :empty-text = rs.no_data
                :data="partnerlist"
                tooltip-effect="light"
                width='100%'
                size="mini">
                <el-table-column
                  prop="shortname"
                  :label="rs.short_name">
                </el-table-column>
                <el-table-column
                  prop="contactperson"
                  :label="rs.principal">
                </el-table-column>
                <el-table-column
                  prop="officetelephone"
                  :label="rs.office_telephone">
                </el-table-column>
                <el-table-column
                  prop="officefax"
                  :label="rs.office_fax">
                </el-table-column>
                <el-table-column
                  prop="email"
                  :label="rs.email">
                </el-table-column>
                <el-table-column width="100">
                  <template slot-scope="scope">
                    <span class="btn_text" @click="handleDeletePartner(scope.row)">{{rs.delete}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        </div>
        <!-- end -->
       </el-col>
      </el-row>  
    </div>
    <select-agency :sync="addAgencyShow" @select="setAgency" @update:sync="addAgencyShow=false"></select-agency>
    <select-partner :sync="addPartnerShow" @select="setPartner" @update:sync="addPartnerShow=false"></select-partner>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import { getProduct, insertProduct, getProductDetail, updateProduct, insertProductDetail,synchronizeAgain,productSynchronizeAgain, deleteProduct} from "@/api/membershipManageApi.js";
import { validator, allvalidator } from '@/validator/validator.js'
import { getOption } from "@/api/optionValueApi.js";
import axios from "axios";
export default {
  data() {
    return {
      productList:[
      ],
      agencylist:[],partnerlist:[],
      addAgencyShow:false,
      addPartnerShow:false,
      isUpdate:true,
      actionUrl:'',
      systemTypeList:[],
      customTypeList:[],
      picture:'',
      systemObj:{},
      monthnumberList:[], 
      usernumberList:[],
      userList:[],//选中用户list
      monthList:[],//选中月数list
      unitprice:0,
      userMonthList:[],
      productInfo:{},
      monthnumberObj:{},
      monthnumberObjValue:{},
      usernumberObj:{},
      usernumberObjValue:{},
      ismounted:false, // 控制是否要userMonthList 自动生成
      formData:{
        picture:'',
        productname:null,
        unitprice:null,
        systemtype:null,
        customsystemtype:null,
        pricetype:'0',
        isspecial:null
      },
      isRight:false,
      getData:{
        languagetype:''
      },
      validatorSave:{
        productname:{
          vaid:['noNull'],
          flg:false
        },
        systemtype:{
          vaid:['noNull'],
          flg:false
        },
        customsystemtype:{
          vaid:['noNull'],
          flg:false
        },
        unitprice:{
          vaid:['noNull'],
          flg:false
        },
      }
    };
  },
  components: {
    "top-nav": resolve => require(["@/common/TopNav.vue"], resolve),
    'select-agency': resolve => require(['@/common/SelectAgency.vue'], resolve),
    'select-partner': resolve => require(['@/common/SelectPartner.vue'], resolve),

  },
  methods: {
    goRouter(name) {
      this.$router.push({path:name});
    },
    handleSelectAgency(){
      // 选择公司
      this.addAgencyShow = true;
    },
    handleSelectPartner(){
      this.addPartnerShow = true;
    },
    handleDeleteProduct(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        // console.log({productid:row.productid,stripeid:row.stripeid},'{productid:row.productid,stripeid:row.stripeid}')
        deleteProduct({productid:row.productid,stripeid:row.stripeid}).then(res=>{
          if(res.data.success){
            this.getProductList(this.getData);
            this.$message.success(this.rs.info_msg_delete_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      })
      
    },
    setPartner(row){
      let flag = true;
      this.partnerlist.forEach(ele=>{
        if(ele.firmid == row.firmid){
          flag = false;
        }
      })
      if(flag){
        this.partnerlist.push(row)
      }
    },
    setAgency(row){
      let flag = true;
      this.agencylist.forEach(ele=>{
        if(ele.agencyid == row.agencyid){
          flag = false;
        }
      })
      if(flag){
        this.agencylist.push(row)
      }
    },
    handleDelete(row){
      this.agencylist.forEach((element,i) => {
        if(row.agencyid == element.agencyid){
          this.agencylist.splice(i,1)
        }
      });
    },
    handleDeletePartner(row){
      this.partnerlist.forEach((element,i) => {
        if(row.firmid == element.firmid){
          this.partnerlist.splice(i,1)
        }
      });
    },
    getProductList(data){
      getProduct(data).then(res =>{
        if(res.data.success){
          this.productList = res.data.data;
        }
      })
    },
    handleAddProduct(){
      this.isRight = false;
      this.isUpdate = true;
      this.formData ={
        picture:'',
        productname:null,
        unitprice:null,
        systemtype:null,
        customsystemtype:null,
        pricetype:'0',
        isspecial:null,
        status:'0'
      };
      this.agencylist = [];
    },
    handleEditProduct(d){
      this.isUpdate = false;
      this.isRight = false;
      this.agencylist = [];
      getProduct({productid:d.productid}).then(res =>{
        if(res.data.success){
          this.formData = res.data.data[0];
          this.agencylist = res.data.data[0].agencylist;
          delete this.formData.agencylist;
          this.picture = this.formData.picture;
        }
      })
    },
    getProductInfo(d){
      this.ismounted = false;
      this.isRight = true;//把右侧显示出来
      getProductDetail({productid:d.productid}).then(res =>{
        if(res.data.success){
          this.productInfo = {
            productid:res.data.productid,
            unitprice:res.data.unitprice,
            productname:res.data.productname,
            stripeid:d.stripeid,
            isspecial:res.data.isspecial,
            pricetype:res.data.pricetype
          };
          this.userMonthList = res.data.data;
          
          // this.monthList = res.data.months;  //后台返回选中月份
          this.monthList = [this.monthnumberList[0].code];// 改成固定一个月

          this.userList = res.data.users;
          this.unitprice = res.data.unitprice;
          this.userMonthList.sort(this.sortUsernumber)//排序
        }
      })
    },
    handleAddProductSave(){
      delete this.formData.users;
      delete this.formData.months;
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      let arr=[];
      if(this.formData.systemtype == '03'){
        this.partnerlist.forEach(ele=>{
          arr.push(ele.firmid)
        })
      }else{
          this.agencylist.forEach(ele=>{
          arr.push(ele.agencyid)
        })
      }
      this.formData.agencyids = arr.join(',');
      if(this.formData.pricetype){
          this.formData.usernumber = '99'
          this.formData.monthnumber = '01'
          this.formData.discountprice = this.formData.unitprice;
          this.formData.standardprice = this.formData.unitprice;
        }
      if(this.isUpdate){
        insertProduct(this.formData).then(res =>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_insert_success)
            this.getProductList(this.getData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        updateProduct(this.formData).then(res =>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            this.getProductList(this.getData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    systemTypeChange(val){
      this.validatorBlur('systemtype');
      this.getcustomTypeList(val,this.languagetype);
    },
    customSystemTypeChange(val){
      this.formData.customsystemtype = val;
    },
    getcustomTypeList(val,type){
      getOption({keyid1:98, keyid2:val, languagetype:type}).then(res=>{
        if (res.data.success) {
          this.customTypeList = res.data.data;
        }
      })
    },
    handleProductSynchronizeAgain(row){
      productSynchronizeAgain({productname:row.productname,productid:row.productid}).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.syn_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    handleSynchronizeAgain(row){
      let arr = [row];
      synchronizeAgain({productid: this.productInfo.productid, products: JSON.stringify(arr),stripeid:this.productInfo.stripeid}).then(res=>{
        if(res.data.success){
           row.synchstatus = 0
          this.$message.success(this.rs.syn_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    handleSaveP(){
      insertProductDetail({productid: this.productInfo.productid, products: JSON.stringify(this.userMonthList),stripeid:this.productInfo.stripeid}).then(res =>{
        if(res.data.success){
          this.getProductInfo(this.productInfo);
          this.$message.success(this.rs.info_msg_update_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    validatorBlur(key) {
      if(key == 'customsystemtype'){
      }
      validator(this.validatorSave, this.formData, key);
    },
    progress(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
    LightImg(res, file) {
      this.formData.picture = file.response.path;
      this.picture = file.response.path;
      this.$store.commit('SET_SHOW_LOADING',false)
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
    setNumber(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
    sortUsernumber(a,b){  //根据usernumber  code 转成 intValue 排序
      if(this.usernumberObj[a.usernumber]-this.usernumberObj[b.usernumber] == 0){
        return this.sortMonthnumber(a,b)
      }else{
        return this.usernumberObj[a.usernumber]-this.usernumberObj[b.usernumber]
      }
    },
    sortMonthnumber(a,b){  //根据monthnumber  code 转成 intValue 排序
       return this.monthnumberObj[a.monthnumber]-this.monthnumberObj[b.monthnumber]  
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
     // 用户数 USERNUMBER_LIST
    this.usernumberList = JSON.parse(localStorage.getItem('selectlist')).USERNUMBER_LIST;
    this.usernumberList.forEach(element => {
      this.usernumberObj[element.code] = element.intvalue;
      this.usernumberObjValue[element.code] = element.value;
    });
    //  月数 MONTHNUMBER_LIST
    this.monthnumberList = JSON.parse(localStorage.getItem('selectlist')).MONTHNUMBER_LIST;
    this.monthnumberList.forEach(element => {
      this.monthnumberObj[element.code] = element.intvalue;
      this.monthnumberObjValue[element.code] = element.value;
    });
    
    this.systemTypeList = JSON.parse(localStorage.getItem('selectlist')).SYSTEMTYPE_LIST;
    this.systemTypeList.forEach(ele =>{
      this.systemObj[ele.code] = ele.value;
    })
    this.actionUrl = axios.defaults.baseURL+'product/uploadFile?agencyid='+ this.userInfo.agencyid;//图片上传地址
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.getProductList(this.getData);
  },
  computed: {
    ...mapGetters(["se", "rs", "languagetype", "control"]),
    readonly() {
      if (this.control.all_products === "02") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted(){
   
  },
  watch: {
    // addProductShow(val){
    //   if(!val){
    //     this.validatorSave = {
    //       productname:{vaid:['noNull'],flg:false},
    //       systemtype:{vaid:['noNull'],flg:false},
    //       customsystemtype:{vaid:['noNull'],flg:false},
    //       unitprice:{vaid:['noNull'],flg:false},
    //     }
    //   }
    // },
    formData: {
　　  handler(newValue, oldValue) {
        if(newValue.systemtype != oldValue.systemtype){
          if(newValue.systemtype != null){
            this.getcustomTypeList(newValue.systemtype,this.languagetype);
          }
        }
　　　},
　　　deep: true
　　},
    languagetype(val){
      this.getData.languagetype = val;
      this.getProductList(this.getData);
    },
    languagetype(val){
      if(this.formData.systemtype){
        this.getcustomTypeList(this.formData.systemtype,val);
      }
    },
    se(val){
      this.usernumberList = val.USERNUMBER_LIST;
      this.usernumberList.forEach(element => {
        this.usernumberObj[element.code] = element.intvalue;
        this.usernumberObjValue[element.code] = element.value;

      });
      //  月数 MONTHNUMBER_LIST
      this.monthnumberList = val.MONTHNUMBER_LIST;
      this.monthnumberList.forEach(element => {
        this.monthnumberObj[element.code] = element.intvalue;
        this.monthnumberObjValue[element.code] = element.value;
      });
      this.systemTypeList = val.SYSTEMTYPE_LIST;
      this.systemTypeList.forEach(ele =>{
        this.systemObj[ele.code] = ele.value;
      })
    },
    monthList(newval,oldval){
      if(this.ismounted){
        if(newval.length>oldval.length){
          let changenumber = newval[newval.length -1]
          // userMonthList
          this.userList.forEach(element => {
            this.userMonthList.push({
              usernumber:element,
              monthnumber:changenumber,
              standardprice:this.unitprice*this.usernumberObj[element]*this.monthnumberObj[changenumber],
              discountprice:this.unitprice*this.usernumberObj[element]*this.monthnumberObj[changenumber]
            })
          });
        }else{
          oldval.forEach((element) => {
            if(newval.indexOf(element) == '-1'){
              let changenumber = element;
              for (var i = this.userMonthList.length - 1; i >=0; i-- ) {
                if(this.userMonthList[i].monthnumber == changenumber){
                  this.userMonthList.splice(i, 1);
                }
              }
            }
          });
        }
      }
      this.userMonthList.sort(this.sortUsernumber)//排序
    },
    userList(newval,oldval){
      if(this.ismounted){
        if(newval.length>oldval.length){
          let changenumber = newval[newval.length -1]
          this.monthList.forEach(element => {
            this.userMonthList.push({
              usernumber:changenumber,
              monthnumber:element,
              standardprice:this.unitprice*this.monthnumberObj[element]*this.usernumberObj[changenumber],
              discountprice:this.unitprice*this.monthnumberObj[element]*this.usernumberObj[changenumber]
            })
          });
        }else{
          oldval.forEach((element) => {
            if(newval.indexOf(element) == '-1'){
              let changenumber = element;
              for (var i = this.userMonthList.length - 1; i >=0; i-- ) {
                if(this.userMonthList[i].usernumber == changenumber){
                  this.userMonthList.splice(i, 1);
                }
              }
            }
          });
        }
      }
      this.userMonthList.sort(this.sortUsernumber);//排序
    }
  }
};
</script>
<style scoped>
.card_box{
  position: relative;
  background: #f7f7f7;
  height: 140px;
  box-shadow: 1px 1px 5px 0 #bbb;
  margin: 15px;
  position: relative;
}
.pic_area {
  float: left !important;
  height: 105px;
  line-height: 105px;
  width: 105px;
}
.pic_area > img{
  margin: 5px;
  height: auto;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
}
.info_area{
  padding: 6px 6px 6px 105px;
}
.info_area p.line{
  padding: 4px;
  line-height: 20px;
}
.info_area p.line span.icon{
  padding-right: 10px;
}
.info_area p.line span.icon-right{
  padding: 5px; 
  float: right;
}
.content_border{
  border: 1px solid #ccc;
}
.btn_text {
    font-size:14px;
    font-family:SFUIDisplay-Bold;
    font-weight:bold;
    color:rgba(1,0,142,1);
    padding: 0 10px;
    cursor: pointer;
    :hover{
      color:rgba(76,75,213,1) !important;
      cursor: pointer
    }
  }
</style>

