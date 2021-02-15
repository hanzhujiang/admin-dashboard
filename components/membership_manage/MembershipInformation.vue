<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        
        <span >{{rs.membership_information}}</span>
      </div>
      <div class="tools">
        <!-- <el-button class="bg_save_btn" @click="handleUpdateCreditCard" size="small">{{rs.save}}</el-button> -->
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-content clearfix">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix ">
                    <div class="title">
                      <img src="../../assets/imgs/page/MembershipInformation_1.png" alt="">
                      <span>{{rs.payment_info}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <div class="fr">
                  <span class="btn_text" @click="handleAddCredid">{{rs.add_new_card}}</span>
                  <!-- <span class="btn_text" @click="newAddShow=true">新增卡片</span> -->
                  <!-- newAddShow -->
                  </div>
                   <form id="payment-form" class="stripe_warp" :class="show?'hidden':''">
                      <div id="card-element">
                        <input type="text">
                      </div>
                      <div id="card-errors" role="alert"></div>
                      <button id="submit" class="fr btn_text" style="padding:15px;margin-right:20px" :disabled="isSubmit">{{rs.save}}</button>
                    </form>
                    <button class="fr btn_text" style="padding:15px;" v-if="!show" @click.stop="cancelshow">{{rs.cancel}}</button>
                  <div class="card_list" style="margin-top:50px">
                    <div :class="[d.isdefault==1?'card_warp triangle default':'card_warp triangle']" v-for="(d,i) in creditCardList"  :key="i">
                    <el-row style="padding:20px">
                      <el-col :span="6">
                        <!-- stripe -->
                        
                        <img v-if="d.brand == 'Visa'" style="height:45px" src="../../assets/imgs/stripe/visa.jpg"  alt=""> 
                        <img v-else-if="d.brand == 'MasterCard'" style="height:45px" src="../../assets/imgs/stripe/mastercard.png"  alt=""> 
                        <img v-else-if="d.brand == 'American Express'" style="height:45px" src="../../assets/imgs/stripe/amex.png"  alt=""> 
                        <img v-else style="height:45px" src="../../assets/imgs/stripe/other.png"  alt=""> 
                      </el-col>
                      <el-col :span="18">
                        <el-row>
                          <el-col :span="16">
                            <p style="text-align:left;"> Ending in **** **** **** {{d.cardnumber}}</p>
                          </el-col>
                          <el-col :span="8">
                            <p style="text-align:right;"><span class="btn_text" @click.stop="handleDelete(d)">{{rs.remove}}</span></p>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <p style="text-align:left;">{{d.brand}}</p>
                          </el-col>
                          <el-col :span="12">
                            <p style="text-align:right;"><span class="btn_text" v-if="d.isdefault==0" @click.stop="handleUpdateDefault(d)">{{rs.set_as_default}}</span></p>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <p style="text-align:left;"><span style="color: red" v-if="d.isdefault==1">{{rs.default_payment_method}}</span></p>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    </div>
                  </div>
                  <div>
                    <a target="_blank" href="https://stripe.com">
                      <img style="height:40px;margin-top:20px;" src="../../assets/imgs/stripe/powered_by_stripe.png" alt="">
                    </a>
                  </div>
                  <div style="padding:20px 0" v-if="creditCardList.count!=0">
                    * {{rs.default_payment_method_info}}
                  </div>

                  <!-- <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.credit_debit_card_no}} <span class="required">*</span></div>
                            <div class="content">
                              <el-input maxlength="30" v-model="formData.cardnumber" size="small" clearable :disabled="readonly||isUpdate" @blur="validatorBlur('cardnumber')"></el-input>
                              <p class="curtail" v-show="validatorSave.cardnumber.flg">{{rs[validatorSave.cardnumber.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.expires}}</div>
                            <div class="content">
                              <el-input maxlength="7" v-model="formData.expires" size="small" placeholder="MM/YYYY" clearable :disabled="readonly||isUpdate" @blur="validatorBlur('expires')"></el-input>
                              <p class="curtail" v-show="validatorSave.expires.flg">{{rs[validatorSave.expires.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="form-group">
                            <div class="sub-title">{{rs.cvv}}</div>
                            <div class="content">
                              <el-input maxlength="4" v-model="formData.cvv" size="small" clearable :disabled="readonly||isUpdate"></el-input>
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="form-group">
                            <div class="sub-title">{{rs.first_name}}<span class="required">*</span></div>
                            <div class="content">
                              <el-input maxlength="50" v-model="formData.firstname" :disabled="readonly||isUpdate"  size="small" @blur="validatorBlur('firstname')"></el-input>
                              <p class="curtail" v-show="validatorSave.firstname.flg">{{rs[validatorSave.firstname.msg]}}</p>                          
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <div class="form-group">
                            <div class="sub-title">{{rs.last_name}}<span class="required">*</span></div>
                            <div class="content">
                              <el-input maxlength="50" v-model="formData.lastname" :disabled="readonly||isUpdate"  size="small" @blur="validatorBlur('lastname')"></el-input>
                              <p class="curtail" v-show="validatorSave.lastname.flg">{{rs[validatorSave.lastname.msg]}}</p>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col  :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                      <div class="content">
                        <address-area :formData="formData" :validatorSave='validatorSave' :readonly="readonly||isUpdate"></address-area>
                      </div>
                    </el-col>
                  </el-row> -->
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
              <el-collapse-item name="2">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix ">
                    <div class="title">
                      <img src="../../assets/imgs/page/MembershipInformation_2.png" alt="">
                      <span>{{rs.all_licenses}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <p style="color:#666;font-size:14px">{{rs.subscription_info}}</p>
                  <p style="padding-bottom:15px;color:#666;font-size:14px">{{rs.contact_us_info}}</p>
                  <div class="table_box">
                    <el-table
                    :empty-text = rs.no_data
                    :data="licenseUseList"
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
                        prop="purchasedatetime"
                        :label="rs.sold_date">
                        <template slot-scope="scope">
                          <div>
                            {{setformatDate(scope.row.purchasedatetime)}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop=""
                        :label="rs.user_license_number">
                        <template slot-scope="scope">
                          <div>
                            {{scope.row.usednumber}}/{{scope.row.usernumber=='10000'?rs.unlimited:scope.row.usernumber}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="isactived"
                        :label="rs.status">
                        <template slot-scope="scope">
                          <div>
                            {{scope.row.isactived == '0'?rs.inactive:scope.row.isactived == '1'?rs.actived:scope.row.isactived == '2'?rs.expire_soon:scope.row.isactived == '3'?rs.pastdue:scope.row.isactived == '4'?rs.expired:'-'}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="startdatetime"
                        :label="rs.actived_date">
                          <template slot-scope="scope">
                          <div>
                            {{setformatDate(scope.row.startdatetime)}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="enddatetime"
                        :label="rs.license_expiry_date">
                         <template slot-scope="scope">
                          <div>
                            {{setformatDate(scope.row.enddatetime)}}
                          </div>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column
                        prop="shortname"
                        :label="rs.grant_to">
                      </el-table-column> -->
                      <el-table-column
                        prop="isactived"
                        :label="rs.auto_renewal">
                        <template slot-scope="scope">
                          <div>
                            {{scope.row.antorenew=='1'?rs.yes:rs.no}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column width="150">
                        <template slot-scope="scope">
                          <!-- <span class="btntext" v-if="scope.row.isactived == '0'&&!isUpdate" @click="handleActivation(scope.row)">{{rs.active}}</span> -->
                          <span class="btntext" @click="handleUsage(scope.row)">{{rs.use_detail}}</span><br>
                          <!-- <span class="btntext"  @click="handleRenewal(scope.row)">{{rs.cancel_renewal}}</span> -->
                          <span class="btntext" v-if="scope.row.antorenew=='1'" @click="handleRenewal(scope.row)">{{rs.cancel_renewal}}</span>
                          <!-- <span class="btntext" v-if="!isUpdate && scope.row.isactived !=0" @click="handleRenew(scope.row)">{{rs.renew_pay}}</span> -->
                          <!-- <el-button v-if="scope.row.isactived == '0'&&!isUpdate"  size="mini" @click="handleActivation(scope.row)">
                            {{rs.active}}
                          </el-button> -->
                          <!-- <el-button @click="handleUsage(scope.row)" size="mini">
                            {{rs.use_detail}}
                          </el-button> -->
                          <!-- <el-button  size="mini" v-if="!isUpdate && scope.row.isactived !=0" @click="handleRenew(scope.row)">
                            {{rs.renew_pay}}
                          </el-button> -->
                        </template>
                      </el-table-column>
                    </el-table>
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
                      <img src="../../assets/imgs/page/MembershipInformation_2.png" alt="">
                      <span>{{rs.purchase_history}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body">
                  <p style="color:#666;font-size:14px">{{rs.stripe_info}}</p>
                  <p style="padding-bottom:15px;color:#666;font-size:14px">{{rs.contact_us_info}}</p>
                  <div class="table_box">
                    <el-table
                      :empty-text = rs.no_data
                      :data="purchaseHistoryList"
                      tooltip-effect="light"
                      width='100%'
                      size="mini">
                      <el-table-column
                        prop="orderno"
                        :label="rs.order_no"
                        :show-overflow-tooltip="true">
                      </el-table-column>
                      <el-table-column
                        prop="productname"
                        :label="rs.product">
                      </el-table-column>
                      <el-table-column
                        prop="purchasedatetime"
                        :label="rs.purchase_date_time">
                          <template slot-scope="scope">
                          <div>
                            {{setformatDate(scope.row.purchasedatetime)}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="usernumber"
                        :label="rs.user_num">
                        <template slot-scope="scope">
                          <div>
                            {{usernumberObj[scope.row.usernumber]}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="monthnumber"
                        :label="rs.license_month">
                        <template slot-scope="scope">
                          <div>
                            {{monthnumberObj[scope.row.monthnumber]}}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="discountprice"
                        :label="rs.price">
                        <template slot-scope="scope">
                          <div>
                            {{scope.row.discountprice?"$":""}}{{setNumber(scope.row.discountprice)}}
                          </div>
                        </template>
                      </el-table-column>
                        <el-table-column
                        prop="licenseno"
                        :label="rs.license_no">
                      </el-table-column>
                       <el-table-column
                        prop="paymentstatus"
                        :label="rs.status">
                        <template slot-scope="scope">
                          <div>
                            {{scope.row.paymentstatus==1?rs.paid:scope.row.paymentstatus==2?rs.pay_failed:scope.row.paymentstatus==3?rs.expire_soon:rs.unpaid}}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </div>
      <!-- add -->
       <!-- <el-dialog :visible.sync="newAddShow" :close-on-click-modal='false' width='60%'>
        <template slot="title">
          <div class="dialog-header">
            <span class="title">{{rs.renew_pay}}
            </span>
          </div>
        </template>
        <div class="dialog-body">
          <form id="payment-form" class="stripe_warp">
              <div id="card-element">
                <input type="text">
              </div>
              <div id="card-errors" role="alert"></div>
                <button id="submit">保存</button>
            </form>
          <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button class="small" style="color:#000;" @click="handleClose()" v-if="!readonly">{{rs.close}}</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fr">
                <el-button class="small bg_blue" @click="handleSavePay"  >{{rs.pay}}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        </div>
      </el-dialog> -->
    <!-- license_use_detail -->
      <el-dialog :visible.sync="useageShow" :close-on-click-modal='false' width='60%'>
        <template slot="title">
          <div class="dialog-header">
            <span class="title">{{rs.license_use_detail}}
            </span>
          </div>
        </template>
        <div class="dialog-body">
          <el-row :gutter="10" class="">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-table
              :empty-text = rs.no_data
              :data="useageList"
              tooltip-effect="light"
              width='100%'
              size="mini">
                <el-table-column
                  label="NO"
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column
                  :label="rs.user_name"
                  :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span>{{scope.row.firstname}}&nbsp;{{scope.row.lastname}}<i class="fa fa-share-alt fr " style="color:#409EFF;" v-if="scope.row.isshared==1?1:0 "></i></span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="email"
                  :label="rs.email">
                </el-table-column>
                <el-table-column
                  prop="startdatetime"
                  :label="rs.use_start_date">
                </el-table-column>
                <el-table-column
                  :label="rs.action"
                  width="120">
                  <template slot-scope="scope">
                    <span class="btntext" @click="handelDeleteUserLicense(scope.row)">{{rs.withdraw}}</span>
                    <!-- <el-button class="small bg_blue" size="mini" @click="handelDeleteUserLicense(scope.row)">{{rs.withdraw}}</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <!-- renew_pay -->
      <el-dialog :visible.sync="renewPayShow" :close-on-click-modal='false' width='60%'>
        <template slot="title">
          <div class="dialog-header">
            <span class="title">{{rs.renew_pay}}
            </span>
          </div>
        </template>
        <div class="dialog-body">
          <el-row :gutter="10" class="detail_block">
            <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
              <div class="form-group">
                <div class="sub-title-first">{{rs.product_name}}</div>
                <div class="content" style="padding-top:5px;">
                  <span>{{productData.productname}}</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
              <div class="form-group">
                <div class="sub-title-first">{{rs.user_num}}</div>
                <div class="content" style="padding-top:5px;">
                  <span>{{usernumberObj[productData.usercode]}}</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
              <div class="form-group">
                <div class="sub-title-first">{{rs.license_month}}</div>
                <div class="content">
                  <el-select v-model="monthnumber"  placeholder="" :disabled="readonly" clearable filterable size="mini" >
                      <el-option
                      v-for="item in months"
                      :key="item"
                      :label="monthnumberObj[item]"
                      :value="item">
                      </el-option>
                    </el-select>
                </div>
              </div>
            </el-col>
            <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
              <div class="form-group">
                <div class="sub-title-first">{{rs.price}}</div>
                <div class="content" style="padding-top:5px;">
                  <span style="text-decoration:line-through; color: red; padding-right: 10px;" v-if="standardprice!=discountprice">{{standardprice?"$":""}}{{setNumber(standardprice)}}</span>
                  <span> {{discountprice?"$":""}}{{setNumber(discountprice)}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="detail_block">
            <el-col :span="24">
              <div class="form-group">
                <div class="sub-title">{{rs.credit_card_no}}</div>
                <div class="content">
                  <!-- <el-input maxlength="15" v-model="renewData.cardnumber" size="mini" clearable :disabled="true"></el-input> -->
                  <p>{{renewData.cardnumber}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
           <el-row :gutter="20">
            <el-col :span="24">
              <div class="form-group">
                <div class="sub-title">{{rs.payee_account}}</div>
              </div>
            </el-col>
             <el-col :span="12">
              <div class="form-group">
                <div class="sub-title">{{rs.bank}}</div>
                <div class="content">
                  <!-- <el-input maxlength="15" v-model="renewData.payee_bankname" size="mini" clearable :disabled="true"></el-input> -->
                  <p>{{renewData.payee_bankname}}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-group">
                <div class="sub-title">{{rs.account_name}}</div>
                <div class="content">
                  <!-- <el-input maxlength="15" v-model="renewData.payee_accountname" size="mini" clearable :disabled="true"></el-input> -->
                  <p>{{renewData.payee_accountname}}</p>
                </div>
              </div>
            </el-col>
             <el-col :span="12">
              <div class="form-group">
                <div class="sub-title">{{rs.bsb}}</div>
                <div class="content">
                  <!-- <el-input maxlength="15" v-model="renewData.payee_bsb" size="mini" clearable :disabled="true"></el-input> -->
                  <p>{{renewData.payee_bsb}}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-group">
                <div class="sub-title">{{rs.account_number}}</div>
                <div class="content">
                  <!-- <el-input maxlength="15" v-model="renewData.payee_accountnumber" size="mini" clearable :disabled="true"></el-input> -->
                  <p>{{renewData.payee_accountnumber}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button   class="small" style="color:#000;" @click="handleClose()" v-if="!readonly">{{rs.close}}</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fr">
                <el-button   class="small bg_blue" @click="handleSavePay"  >{{rs.pay}}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        </div>
      </el-dialog>
    </form>
  </div>
</template>
<script>
import{ getCreditCardInfo, getAllLicense, getPurchase, getUsedLicense, deleteUserLicense,updateLicense, getLicense, updateCreditCard, getProductDetail, renewPurchase,getCreditCard,deleteCreditCard } from '@/api/membershipManageApi.js'
import axios from 'axios'
import { mapGetters } from "vuex";
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { validator, allvalidator} from '@/validator/validator.js'
export default{
  data() {
    return {
      isSubmit:false,
      show:true,
      newAddShow:false,
      userInfo:{},
      creditCardList:[],
      useageShow:false,//使用情况弹出层
      purchaseHistoryList:[],//购买记录
      licenseUseList:[],//所有授权
      renewPayShow:false,//续费页面
      agencyid:'',
      useageList:[],//使用情况List
      renewData:{ // 续费页面数据
      },
      productData:{},//产品数据
      months:[],
      monthnumberObj:{},
      usernumberObj:{},
      monthnumber:'',
      discountprice: '',
      standardprice: '',
      value:'',
      activeNames:['1','2','3'], //折叠面板
      formData:{
      },
      validatorSave:{
        cardnumber:{
          vaid:['noNull'],
          flg:false
        },
        firstname:{
          vaid:['noNull'],
          flg:false
        },
        expires:{
          vaid:['MM_YYYY'],
          flg:false
        },
        lastname:{
          vaid:['noNull'],
          flg:false
        },
        email:{
          vaid:['Email'],
          flg:false
        },
      },
      isUpdate:true,
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    'account-area': resolve => require(['@/common/AccountArea.vue'], resolve),
    'language-name': resolve => require(['@/common/LanguageName'], resolve),
    },
  methods:{
    cancelshow(){
      this.show=true;
    },
    handleDelete(d){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
         deleteCreditCard({cardid:d.cardid,stripeid:d.stripeid,}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_delete_success);
            this.getCreditCardList({referid:this.agencyid});
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
        }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
      
    },
    setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy')
      }else{
        return '-'
      }
    },
    handleAddCredid(){
      this.show = false;
        let this_ = this;
      // Set your publishable key: remember to change this to your live publishable key in production
      // See your keys here: https://dashboard.stripe.com/account/apikeys
      var stripe = Stripe(this.$stripe_apikey);
      var elements = stripe.elements();
      // Set up Stripe.js and Elements to use in checkout form
      var style = {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
      }
      };
      var card = elements.create("card", { style: style });
      card.mount("#card-element");

      card.addEventListener('change', ({error}) => {
        const displayError = document.getElementById('card-errors');
        if (error) {
          displayError.textContent = error.message;
        } else {
          displayError.textContent = '';
        }
      });

      // Create a source or display an error when the form is submitted.
      var form = document.getElementById('payment-form');
      var ownerInfo = {};
      form.addEventListener('submit', function(event) {
        this_.isSubmit = true;
        event.preventDefault();
        stripe.createSource(card, ownerInfo).then(function(result) {
          if (result.error) {
              this_.isSubmit = false;
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            // Send the source to your server
            var cardid = result.source.id;
            this_.handleUpdateCreditCard({
             sourceid:cardid,
             
            })
          /* 通过Ajax提交服务器 */;
          }
        });
      });
    },
    getCreditCardList(data){
      getCreditCard(data).then(res=>{
        if(res.data.success){
          this.creditCardList = res.data.data;
        }
      })

    },
    getMebershipInformation(data){
      getCreditCardInfo(data).then(res =>{
        if(res.data.success){
          this.formData = res.data.data;
        }
      })
    },
    // 所有授权
    getAllLicenseList(data){
      getAllLicense(data).then(res =>{
        if(res.data.success){
          this.licenseUseList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getProductDetailInfo(data){
      getProductDetail(data).then(res =>{
        if(res.data.success){
          this.months = res.data.months;
          this.userMonthList  = res.data.data;
        }
      })
    },
    // 购买记录
    getPurchaseList(){
      getPurchase({referid:this.agencyid}).then(res =>{
        if(res.data.success){
          this.purchaseHistoryList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 使用情况
    handleUsage(row){
      this.useageShow = true;
      this.getUsedLicenseList({licenseid:row.licenseid,systemtype:row.systemtype})
    },
    // 取消自动续费
    handleRenewal(row){
    this.$confirm(this.rs.cancel_auto_renewal_msg, this.rs.cancel_auto_renewal, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.close,
      type: 'warning',
      center: true
      }).then(() => {
        let data = {
          licenseid:row.licenseid,
          antorenew:'0',
          stripeid:row.stripeid
        }
        updateLicense(data).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            this.getAllLicenseList({referid:this.agencyid});
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        // this.$message.info(this.rs.cancel_delete)
      })
      
    },
    // getUsedLicense 使用情况List
    getUsedLicenseList(data){
      getUsedLicense(data).then(res =>{
        if(res.data.success){
          this.useageList = res.data.data;
        }
      })
    },
    // 收回授权
    handelDeleteUserLicense(row){
      deleteUserLicense({ids:row.userlicenseid}).then(res =>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success)
          this.getUsedLicenseList({licenseid:row.licenseid,systemtype:row.systemtype});
          this.getAllLicenseList({referid:this.agencyid});
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 激活
    handleActivation(row){
      updateLicense({licenseid:row.licenseid}).then(res =>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_insert_success)
          this.getAllLicenseList({referid:this.agencyid})
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //续费
    handleRenew(row){
      this.renewPayShow = true;
      this.getProductDetailInfo({productid:row.productid});
      this.getRenew({licenseid:row.licenseid});
    },
    // 续费页面数据
    getRenew(data){
      getLicense(data).then(res =>{
        if(res.data.success){
          this.renewData = res.data.account;
          this.renewData.cardnumber = res.data.cardnumber;
          this.renewData.cardid = res.data.cardid;
          this.productData = res.data.license[0];
          this.monthnumber = this.productData.monthcode;
        }
      })
    },
    handleUpdateDefault(d){
      d.isdefault = 1
      let data = {
        isdefault:1,
        cardid:d.cardid,
        sourceid:d.stripeid
      };
      updateCreditCard(data).then(res =>{
        if(res.data.success){
          this.getCreditCardList({
              referid:this.agencyid
            });
            // 隐藏新增卡片
            // The data has already been successfully updated!
          this.$message.success(this.rs.info_msg_update_success);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 保存 会员信息
    handleUpdateCreditCard(data){
      updateCreditCard(data).then(res =>{
        if(res.data.success){
          this.getCreditCardList({
              referid:this.agencyid
            });
            // 隐藏新增卡片
          this.isSubmit = false;
          this.show = true;
          this.$message.success(this.rs.info_msg_insert_success);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    setNumber(num){
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    handleClose(){
      this.renewPayShow = false;
    },
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    // goRouter(path){
    //   this.$router.push({path})
    // },
    handleSavePay(){
      let data ={
        productid: this.productData.productid,
        cardid: this.renewData.cardid,
        usernumber: this.productData.usercode,
        monthnumber: this.monthnumber,
        discountprice: this.discountprice,
        standardprice: this.standardprice,
        orderno: this.productData.orderno,
        licenseid: this.productData.licenseid,
      }
      renewPurchase(data).then(res =>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_insert_success);
          this.renewPayShow  = false;
          this.getAllLicenseList({referid:this.agencyid});
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    JSON.parse(localStorage.getItem('selectlist')).USERNUMBER_LIST.forEach(element => {
      this.usernumberObj[element.code] = element.value;
    });
    this.usernumberObj['99'] = this.rs.unlimited;
    //  月数 MONTHNUMBER_LIST
    JSON.parse(localStorage.getItem('selectlist')).MONTHNUMBER_LIST.forEach(element => {
      this.monthnumberObj[element.code] = element.value;
    });
    if(this.$route.params.id == 'own'){
      this.agencyid = JSON.parse(localStorage.getItem('userInfo')).agencyid;
      this.formData.referid = JSON.parse(localStorage.getItem('userInfo')).agencyid;
      this.isUpdate = false;
      this.getCreditCardList({
        referid:this.userInfo.agencyid
      });
    }else{
      this.agencyid = this.$route.params.id;
      this.formData.referid = this.$route.params.id;
      this.isUpdate = true;
       this.getCreditCardList({
        referid:this.$route.params.id
      });
    }
    // this.getMebershipInformation({referid:this.agencyid});
    this.getAllLicenseList({referid:this.agencyid});
    this.getPurchaseList();
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.membership_information ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    // newAddShow(val){
    //   if(val){
    //     // this.handleAddCredid();
    //   }
    // },
    se(val){
      val.USERNUMBER_LIST.forEach(element => {
      this.usernumberObj[element.code] = element.value;
    });
    //  月数 MONTHNUMBER_LIST
    val.MONTHNUMBER_LIST.forEach(element => {
      this.monthnumberObj[element.code] = element.value;
    });
    },
    rs(val){
      this.usernumberObj['99'] = val.unlimited;
    },
    monthnumber(val){
      this.userMonthList.forEach(ele =>{
        if(ele.monthnumber == val && ele.usernumber == this.productData.usercode){
          this.discountprice = ele.discountprice;
          this.standardprice = ele.standardprice;
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.hidden {
  height: 0 !important;
  overflow: hidden;
}
  .detail_block {
    border-bottom: 1px solid #dcdcdc;  
    padding: 0 0 20px;
  }
  .card_warp {
  width: 400px;
  overflow: hidden;
  border: 1px solid #bbb;
  text-align: center;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 0 #bbb;
  margin-bottom: 20px;
}
.default {
  background-color: beige;
}
#card-element {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #bbb;
  border-radius: 10px;
  -webkit-box-shadow: 1px 1px 5px 0 #bbb;
  box-shadow: 1px 1px 5px 0 #bbb;
}
.card_warp:hover{
  border:1px solid rgba(76,75,213,1);
}
 .btn_text {
    font-size:14px;
    // font-family:SFUIDisplay-Bold;
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
