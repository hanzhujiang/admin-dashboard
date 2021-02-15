<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.purchase_product}}</span>
      </div>
    </div>
    <form  autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <el-steps :active="active" finish-status="success">
                <el-step :title="rs.select_product">
                  
                </el-step>
                <el-step :title="rs.select_detail"></el-step>
                <el-step :title="rs.pay"></el-step>
              </el-steps>
              <div v-if="active == 0" class="step_content">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(d,index) in productList"  @click.native="getProductInfo(d,index)" :key="index">
                      <!-- <el-row class="card_box" :gutter="15" >
                        <el-col :span="10">
                          <div class="pic_area">
                              <img :src="d.picture" alt="" style="width:100px;height:auto" v-if="d.picture">
                            <img src="../../assets/imgs/no_images.png" style="width:100px;height:auto" alt="" v-else> 
                          </div>
                        </el-col>
                        <el-col >
                          <p class="line">{{d.productname}}</p>
                          <p class="line">{{systemObj[d.systemtype]}}</p>
                          <p class="line">{{d.name}}</p>
                          <p class="line fr">{{rs.monthly}} ${{setNumber(d.unitprice)}} / {{rs.user}}</p>
                        </el-col>
                      </el-row> -->
                      <div :class="index == activeProduct?'copy_box triangle active ':'copy_box triangle'" >
                        <img class="triangle_img" src="../../assets/imgs/page/PurchaseProduct_1.png" alt="" v-if="index == activeProduct">
                        <div class="copy_box_img">
                            <img :src="d.picture" alt=""  v-if="d.picture">
                            <img src="../../assets/imgs/no_images.png"  alt="" v-else> 
                        </div>
                        <div class="copy_box_text">
                          <p class="monthly" v-if="d.pricetype==0">{{rs.monthly}} <span class="unitprice">${{setNumber(d.unitprice)}}</span> / {{rs.user}}</p>
                          <p class="monthly" v-if="d.pricetype==1">{{rs.monthly}} <span class="unitprice">${{setNumber(d.unitprice)}}</span></p>
                          <p class="lines">{{d.productname}}</p>
                          <p class="lines">{{systemObj[d.systemtype]}}</p>
                          <p class="lines">{{d.name}}</p>
                        </div>
                        <div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
              </div>
              <div v-if="active == 1" class="step_content center">
                <div class="agentversion" v-if="productInfo.pricetype == 0">
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" >
                      <div class="copy_box" >
                          <div class="copy_box_img">
                              <img :src="productInfo.picture" alt=""  v-if="productInfo.picture">
                              <img src="../../assets/imgs/no_images.png"  alt="" v-else> 
                          </div>
                          <div class="copy_box_text">
                            <p class="monthly" v-if="productInfo.pricetype==0">{{rs.monthly}} <span class="unitprice">${{setNumber(productInfo.unitprice)}}</span> / {{rs.user}}</p>
                            <p class="monthly" v-if="productInfo.pricetype==1">{{rs.monthly}} <span class="unitprice">${{setNumber(productInfo.unitprice)}}</span></p>
                            <p class="lines">{{productInfo.productname}}</p>
                            <p class="lines">{{systemObj[productInfo.systemtype]}}</p>
                            <p class="lines">{{productInfo.name}}</p>
                          </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                      <el-row class="line ">
                        <el-col :span="8">
                          <span>{{rs.product}}</span>
                        </el-col>
                        <el-col :span="16">
                          <span class="fr">{{productInfo.productname}}</span>
                        </el-col>
                      </el-row> 
                      <p class="hrw"></p>
                      <el-row class="line">
                        <el-col :span="8">
                          <span>{{rs.user_num}}</span>
                        </el-col>
                        <el-col :span="16">
                          <div class="fr">
                            <el-select  placeholder="" v-model="userCode" :disabled="readonly" clearable filterable size="mini" >
                              <el-option v-for="item in productInfo.users" :key="item"
                              :label="usernumberObj[item]"
                              :value="item">
                              </el-option>
                            </el-select>
                          </div>
                        </el-col>
                      </el-row> 
                      <el-row class="line">
                        <el-col :span="8">
                          <span>{{rs.license_month}}</span>
                        </el-col>
                        <el-col :span="16">
                          <div class="fr">
                            {{monthnumberObj[monthCode]}}
                            <!-- <el-select  placeholder="" v-model="monthCode" :disabled="readonly" clearable filterable size="mini" >
                              <el-option v-for="item in productInfo.months" :key="item"
                              :label="monthnumberObj[item]"
                              :value="item">
                              </el-option>
                            </el-select> -->
                          </div>
                          
                        </el-col>
                      </el-row> 
                      <el-row class="line">
                        <el-col :span="8">
                          <span>{{rs.price}}&nbsp;{{rs.w_o_gst}}</span>
                        </el-col>
                        <el-col :span="16">
                          <div class="fr">
                            <span style="text-decoration:line-through;color: red;padding-right: 10px;" v-if="standardprice!=discountprice">{{standardprice?"$":""}}{{setNumber(standardprice)}} </span>
                            <span> {{discountprice?"$":""}}{{setNumber(discountprice)}}</span>
                          </div>
                        </el-col>
                      </el-row> 
                      <el-row class="line">
                        <el-col :span="8">
                          <span>{{rs.price}}&nbsp;({{rs.including_gst}})</span>
                        </el-col>
                        <el-col :span="16">
                          <div class="fr">
                            <span> {{discountprice?"$":""}}{{setNumber((discountprice*this.gtsValue))}}</span>
                          </div>
                        </el-col>
                      </el-row> 
                    </el-col>
                  </el-row>
                </div>
                <div class="agentversion" v-if="productInfo.pricetype == 1">
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" >
                      <div class="copy_box" >
                          <div class="copy_box_img">
                              <img :src="productInfo.picture" alt=""  v-if="productInfo.picture">
                              <img src="../../assets/imgs/no_images.png"  alt="" v-else> 
                          </div>
                          <div class="copy_box_text">
                            <p class="monthly" v-if="productInfo.pricetype==0">{{rs.monthly}} <span class="unitprice">${{setNumber(productInfo.unitprice)}}</span> / {{rs.user}}</p>
                            <p class="monthly" v-if="productInfo.pricetype==1">{{rs.monthly}} <span class="unitprice">${{setNumber(productInfo.unitprice)}}</span></p>
                            <p class="lines">{{productInfo.productname}}</p>
                            <p class="lines">{{systemObj[productInfo.systemtype]}}</p>
                            <p class="lines">{{productInfo.name}}</p>
                          </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                      <el-row class="line ">
                        <el-col :span="8">
                          <span>{{rs.product}}</span>
                        </el-col>
                        <el-col :span="16">
                          <span class="fr">{{productInfo.productname}}</span>
                        </el-col>
                      </el-row> 
                      <p class="hrw"></p>
                      <el-row class="line">
                        <el-col :span="8">
                          <span>{{rs.user_num}}</span>
                        </el-col>
                        <el-col :span="16">
                          <div class="fr">
                            {{usernumberObj[userCode]}}
                            <!-- <el-select  placeholder="" v-model="userCode" :disabled="readonly" clearable filterable size="mini" >
                              <el-option v-for="item in productInfo.users" :key="item"
                              :label="usernumberObj[item]"
                              :value="item">
                              </el-option>
                            </el-select> -->
                          </div>
                        </el-col>
                      </el-row> 
                      <el-row class="line">
                        <el-col :span="8">
                          <span>{{rs.license_month}}</span>
                        </el-col>
                        <el-col :span="16">
                          <div class="fr">
                            {{monthnumberObj[monthCode]}}
                            <!-- <el-select  placeholder="" v-model="monthCode" :disabled="readonly" clearable filterable size="mini" >
                              <el-option v-for="item in productInfo.months" :key="item"
                              :label="monthnumberObj[item]"
                              :value="item">
                              </el-option>
                            </el-select> -->
                          </div>
                          
                        </el-col>
                      </el-row> 
                      <el-row class="line">
                        <el-col :span="8">
                          <span>{{rs.price}}&nbsp;{{rs.w_o_gst}}</span>
                        </el-col>
                        <el-col :span="16">
                          <div class="fr">
                            <span style="text-decoration:line-through;color: red;padding-right: 10px;" v-if="standardprice!=discountprice">{{standardprice?"$":""}}{{setNumber(standardprice)}} </span>
                            <span>{{discountprice?"$":""}}{{setNumber(discountprice)}}</span>
                          </div>
                        </el-col>
                      </el-row> 
                      <el-row class="line">
                        <el-col :span="8">
                          <span>{{rs.price}}&nbsp;({{rs.including_gst}})</span>
                        </el-col>
                        <el-col :span="16">
                          <div class="fr">
                           
                            <span>{{discountprice?"$":""}}{{setNumber((discountprice*this.gtsValue))}}</span>
                          </div>
                        </el-col>
                      </el-row> 
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div v-if="active == 2" class="step_content submit_s">
                <div class="dialog-body">
                  <el-row :gutter="10" class="detail_block">
                    <el-col>
                      <div class="form-group">
                        <div class="sub-title">{{rs.subscription_plan}}</div>
                        <div class="content">
                          <span>{{productInfo.productname}} {{usernumberObj[userCode]}} {{monthnumberObj[monthCode]}} {{discountprice?"$":""}}{{setNumber((discountprice*this.gtsValue))}}&nbsp;({{rs.including_gst}})</span>
                        </div>
                        <div class="sub-title">{{rs.payment_method}}</div>
                        <div class="content" style="margin-bottom:20px">
                          <el-radio v-model="selectRadio" label="1">{{rs.select_a_card}}</el-radio>
                          <el-radio v-model="selectRadio" label="0" @change="handleSavePay">{{rs.add_a_new_card}}</el-radio>
                        </div>
                        <!-- <div :class="index == activeProduct?'copy_box triangle active ':'copy_box triangle'" > -->
                        <div class="card_list" v-if="selectRadio == 1">
                          <div class="card_warp triangle" :class="creditIndex == i?'active':''"  v-for="(d,i) in creditCardList" @click="handleSelectV(i,d)">
                          <img class="triangle_img" src="../../assets/imgs/page/PurchaseProduct_1.png" alt="" v-if="i == creditIndex">
                          <el-row style="padding:30px">
                            <el-col :span="6">
                              <!-- stripe -->
                              <img v-if="d.brand == 'Visa'" style="height:45px" src="../../assets/imgs/stripe/visa.jpg"  alt=""> 
                              <img v-else-if="d.brand == 'MasterCard'" style="height:45px" src="../../assets/imgs/stripe/mastercard.png"  alt=""> 
                              <img v-else-if="d.brand == 'American Express'" style="height:45px" src="../../assets/imgs/stripe/amex.png"  alt=""> 
                              <img v-else style="height:45px" src="../../assets/imgs/stripe/other.png"  alt=""> 
                            </el-col>
                            <el-col :span="14">
                              <p style="line-height:24px;text-align:left;"> Ending in **** **** **** {{d.cardnumber}}</p>
                              <p style="line-height:24px;text-align:left;">{{d.brand}}</p>
                            </el-col>
                            <el-col :span="4">
                              <span class="btn_text" @click.stop="handleDelete(d)">{{rs.remove}}</span>
                            </el-col>
                          </el-row>
                          </div>
                        </div>
                        <div style="max-width:620px">
                          <form id="payment-form" v-if="selectRadio == 0">
                            <div id="card-element">
                              <input type="text">
                            </div>
                            <div id="card-errors" role="alert"></div>
                            <button id="submit" class="fr submit_san" :disabled="isSubmit">{{rs.subscribe}}</button>
                          </form>
                        </div>
                        <div>
                          <a target="_blank" href="https://stripe.com">
                            <img style="height:40px;margin-top:20px;" src="../../assets/imgs/stripe/powered_by_stripe.png" alt="">
                          </a>
                        </div>
                        <div style="padding:20px 0">
                          * {{rs.subscription_agree}}<span class="link_text" @click="termsShow = true">&nbsp;{{rs.terms}}</span>&nbsp;{{rs.and}}&nbsp;<span class="link_text"  @click="privacyPolicyShow = true">{{rs.privacy_policy}}</span>.
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- <el-row class="detail_block">
                    <el-col :span="24">
                      <div class="form-group">
                        <div class="sub-title">{{rs.credit_card_no}}</div>
                        <div class="content">
                          <p>{{membershipInfo.cardnumber}}</p>
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
                          <p>{{membershipInfo.payee_bankname}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="form-group">
                        <div class="sub-title">{{rs.account_name}}</div>
                        <div class="content">
                          <p>{{membershipInfo.payee_accountname}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="form-group">
                        <div class="sub-title">{{rs.bsb}}</div>
                        <div class="content">
                          <p>{{membershipInfo.payee_bsb}}</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="form-group">
                        <div class="sub-title">{{rs.account_number}}</div>
                        <div class="content">
                          <p>{{membershipInfo.payee_accountnumber}}</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row> -->
                 
                </div>
                
              </div>
             <el-button   v-if="active != 0" style="margin-top: 12px;" class="fl" @click="upward">{{rs.prev_step}}</el-button>
              <el-button   v-if="active != 2" style="margin-top: 12px;" class="fr" @click="next">{{rs.next_step}}</el-button>
              <el-button   v-if="active == 2&&selectRadio == 1" style="margin-top: 12px;" :disabled="isSubmit" class="fr" @click="handleSubmit(subimtData)">{{rs.subscribe}}</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    </form>
    <el-dialog
    :visible.sync="termsShow"
    :close-on-click-modal='false'
    :lock-scroll='true'
    width='90%'
    >
    <template slot="title">
      <div class="dialog-header">
        <span class="title">{{rs.terms}}</span>
      </div>
    </template>
    <div class="dialog-body">
          <terms></terms>
    </div>
    <div class="dailog-footer-tools">
      <el-row>
        <el-col :span="24">
          <div class="fr">
            <el-button   class="small" style="color:#000;"  @click="termsShow = false">
            {{rs.close}}</el-button>
          </div>
        </el-col>
        
      </el-row>
    </div>
  </el-dialog>
  <el-dialog
    :visible.sync="privacyPolicyShow"
    :close-on-click-modal='false'
    :lock-scroll='true'
    width='90%'
    >
    <template slot="title">
      <div class="dialog-header">
        <span class="title">{{rs.privacy_policy}}</span>
      </div>
    </template>
    <div class="dialog-body">
      <privacy-policy></privacy-policy>
    </div>
    <div class="dailog-footer-tools">
      <el-row>
        <el-col :span="24">
          <div class="fr">
            <el-button   class="small" style="color:#000;" @click="privacyPolicyShow = false">
            {{rs.close}}</el-button>
          </div>
        </el-col>
        
      </el-row>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getSystemSettingData } from '@/api/systemSettingApi.js'
import { getProduct, getProductDetail, getCreditCardInfo, insertPurchase, getCreditCard,getProductData ,deleteCreditCard} from '@/api/membershipManageApi.js'
export default{
  data() {
    return {
      termsShow:false,
      gtsValue:'1.1',
      privacyPolicyShow:false,
      active: 0,
      isSubmit:false,
      creditCardList:[],
      creditIndex:false,
      selectRadio:'1',
      productdetailid:'',
      activeProduct:null,
      systemObj:{},
      usernumberObj:{},
      monthnumberObj:{},
      productList:[
      ],
      userInfo:{},
      productid:'',
      userMothList:[],
      productInfo:{},
      logoimagedark:null,
      formData:{},
      userCode:'',
      monthCode:'01',
      standardprice:'',
      discountprice:'',
      membershipInfo:{}
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve),
    'terms':resolve => require(['@/components/membership_manage/Terms.vue'],resolve),
    'privacy-policy':resolve => require(['@/components/membership_manage/PrivacyPolicy.vue'],resolve),
  },
  watch:{
    active(val){
      if(val == 2){
        if(this.selectRadio == '0'){
          let this_ = this;
          setTimeout(function(){
            this_.handleSavePay();
          }, 300);
        }
      }
    },
    monthCode(val){
      this.userMothList.forEach( ele =>{
        if(ele.monthnumber == val && ele.usernumber == this.userCode){
          this.standardprice = ele.standardprice;
          this.discountprice = ele.discountprice
          this.productdetailid = ele.productdetailid;
        }
        if(!val){
          this.standardprice = 0;
          this.discountprice = 0;
        }
      })
    },
    userCode(val){
      if(!val){
          this.standardprice = 0;
          this.discountprice = 0;
        }
      this.userMothList.forEach( ele =>{
         if(ele.usernumber == val && ele.monthnumber == this.monthCode){
          this.standardprice = ele.standardprice;
          this.discountprice = ele.discountprice;
          this.productdetailid = ele.productdetailid;
        }
      })
    },
    se(val){
      val.SYSTEMTYPE_LIST.forEach(ele =>{
      this.systemObj[ele.code] = ele.value;
      })
      val.USERNUMBER_LIST.forEach(element => {
        this.usernumberObj[element.code] = element.value;
      });
      //  月数 MONTHNUMBER_LIST
      val.MONTHNUMBER_LIST.forEach(element => {
        this.monthnumberObj[element.code] = element.value;
      });
    },
    languagetype(val){
      this.getProductList({languagetype:val});
      this.productInfoData({languagetype:val,productid:this.productid});
    },
    rs(val){
      this.usernumberObj['99'] = val.unlimited;
    }
  },
  created(){
    this.userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    JSON.parse(localStorage.getItem('selectlist')).SYSTEMTYPE_LIST.forEach(ele =>{
      this.systemObj[ele.code] = ele.value;
    })
    JSON.parse(localStorage.getItem('selectlist')).USERNUMBER_LIST.forEach(element => {
      this.usernumberObj[element.code] = element.value;
    });
    this.usernumberObj['99'] = this.rs.unlimited;
    //  月数 MONTHNUMBER_LIST
    JSON.parse(localStorage.getItem('selectlist')).MONTHNUMBER_LIST.forEach(element => {
      this.monthnumberObj[element.code] = element.value;
    });
    this.monthnumberObj = Object.assign({}, this.monthnumberObj);
    this.usernumberObj = Object.assign({}, this.usernumberObj);

    this.getProductList({languagetype:localStorage.getItem('languagetype')});
    // this.getMembershipInfo({refrid:this.userInfo.agencyid})
    getSystemSettingData({type:'0'}).then(res=>{
    if (res.data.success) {
      let obj ={}
        res.data.data.forEach(val => {
          obj[val.id] = val.value;
      });
      this.gtsValue = 1 + parseFloat(obj['gst_rate']);
    } else {
      this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
    }
  })
  },
  methods:{
    next() {
      // console.log(this.active,'active')
      // if(this.active == 0){
      //   this.userCode = ''
      // }
      if(this.active == 1){
        if(!this.userCode || !this.monthCode){
          this.$message.error(this.rs.select_product_details);
          return
        }
 
      }
      if(this.active == 0){
        if(!this.productid){
        this.$message.error(this.rs.select_a_product);
          return
        }
      }
      if (this.active++ > 2) this.active = 0;
    },
    upward(){
       if (this.active-- < 0) this.active = 0;
       if(this.active == 0){
         this.userCode = '';
         this.monthCode = '01';
       }
    },
    getCreditCardList(){
      getCreditCard({referid:this.userInfo.agencyid}).then(res=>{
        if(res.data.success){
          this.creditCardList = res.data.data;
          if(this.selectRadio == '1'){
            if(this.creditCardList.length>0){
              // let d = this.creditCardList[0];
              this.creditCardList.forEach((d,i)=>{
                if(d.isdefault == 1){
                  this.creditIndex = i;
                  this.subimtData={
                    sourceid:d.stripeid,
                    cardid:d.cardid,
                    isnewcard:this.selectRadio,
                    productdetailid:this.productdetailid,
                    systemtype: this.productInfo.systemtype,
                    customsystemtype: this.productInfo.customsystemtype,
                    usernumber:this.userCode,
                    monthnumber:this.monthCode,
                  }
                }
              })
            }else{
              this.selectRadio = '0';
              
            }
          }
        }
      })

    },
    getProductInfo(d,index){
      this.productid = d.productid;
      this.activeProduct = index;
      this.productInfoData({languagetype:localStorage.getItem('languagetype'),productid:d.productid},d)
      
    },
    productInfoData(data,d){
      getProduct(data).then(res =>{
        if(res.data.success){
          this.productInfo = res.data.data[0];
          if(this.productInfo.pricetype == 1){
            this.userCode = '99'
            this.monthCode = '01'
            this.getProductDetailInfo({productid:d.productid},true)
            // this.
          }else{
            this.getProductDetailInfo({productid:d.productid},false)
          }
          this.getCreditCardList();

        }
      })
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
            this.getCreditCardList({referid:this.userInfo.agencyid});
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
        }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
    },
    getProductList(data){
      getProductData(data).then(res =>{
        if(res.data.success){
          this.productList = res.data.data;
        }
      })
    },
    getProductDetailInfo(data,type){
      getProductDetail(data).then(res =>{
        if(res.data.success){
          if(type){
            // this.userMothList = res.data.data;
            if(res.data.data.length !=0){
              res.data.data.forEach(ele=>{
                this.standardprice = ele.standardprice;
                this.discountprice = ele.discountprice;
                this.productdetailid = ele.productdetailid;
              })
            }else{
              this.discountprice = res.data.unitprice
              this.standardprice = res.data.unitprice
            }
            // this.userMothList.forEach( ele =>{
            //     this.standardprice = ele.standardprice;
            //     this.discountprice = ele.discountprice
            //     this.productdetailid = ele.productdetailid;
            //   })
          }else{
            
            this.userMothList = res.data.data;
          }
        }
      })
    },
    // getMembershipInfo(data){
    //   getCreditCardInfo(data).then(res =>{
    //     if(res.data.success){
    //       this.membershipInfo = res.data.account;
    //       this.membershipInfo.cardid = res.data.cardid;
    //       this.membershipInfo.cardnumber = res.data.cardnumber;
          
    //     }
    //   })
    // },
    handleSelectV(i,d){
      this.creditIndex = i;
      this.subimtData={
        sourceid:d.stripeid,
        cardid:d.cardid,
        isnewcard:this.selectRadio,
        productdetailid:this.productdetailid,
        systemtype: this.productInfo.systemtype,
        customsystemtype: this.productInfo.customsystemtype,
        usernumber:this.userCode,
        monthnumber:this.monthCode,
      }
    },
    handleSavePay(){
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
            this_.handleSubmit({
             sourceid:cardid,
             isnewcard:this_.selectRadio,
             productdetailid:this_.productdetailid,
             systemtype: this_.productInfo.systemtype,
             customsystemtype: this_.productInfo.customsystemtype,
             usernumber:this_.userCode,
             monthnumber:this_.monthCode,
             cardid:null
            })
          /* 通过Ajax提交服务器 */;
          }
        });
      });
     
    },
    handleSubmit(data){
      let sData = {
          sourceid:data.sourceid,
          isnewcard:this.selectRadio,
          productdetailid:this.productdetailid,
          systemtype: this.productInfo.systemtype,
          customsystemtype: this.productInfo.customsystemtype,
          usernumber:this.userCode,
          monthnumber:this.monthCode,
          cardid:data.cardid
      }
      insertPurchase(sData).then(res =>{
        this.isSubmit = false;
        if(res.data.success){
          this.active = 0;
          this.userCode = '';
          this.monthCode = '';
          this.$message.success(this.rs.stripe_success)
          this.goRouter('/membership_manage/membershipInformation/own')
        }else{
          // this.$message.error(this.rs.stripe_error);
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 转千位符
    setNumber(num){
      return (num?num.toFixed(2):0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    goRouter(path){
      this.$router.push({path:path});
    },
  },
  computed: {
    ...mapGetters(['rs','languagetype','control','se']),
     readonly(){
      if(this.control.purchase_product ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  
}
</script>

<style lang="scss" scoped>
.submit_s {
  position: relative;
  .submit_san {
    position: absolute;
    bottom: -55px;
    right: 20px;
    padding: 12px 20px;
    font-size: 14px;
    border: 1px solid #CCC;
  }
  .submit_san:hover{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}
.submit_btn {
  margin-top: 35px;
  float: right;
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
.card_warp:hover{
  border:1px solid rgba(76,75,213,1);
}
.active{
  border:1px solid rgba(76,75,213,1);
}
.box {
  padding: 20px 0px 50px 0px;
}
.copy_box{
  height: 251px;
  border: 1px solid #bbb;
  text-align: center;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 0 #bbb;
  margin: 10px 0;
  .copy_box_img{
    height: 70px;
    width: 70px;
    display: inline-block;
    margin-top: 20px;
    >img{
    height: 100%;
    width: 100%;
    }
  }
  .copy_box_text {
    .monthly{
      font-size:12px;
      // font-family:SFUIDisplay-Bold;
      font-weight:bold;
      color:rgba(0,0,0,1);
      border-bottom: 1px solid #bbb;
      margin-left: 15px;
      margin-right: 15px;
      padding: 20px 0 !important;
      .unitprice{
        font-size: 16px;
      }
    }
    .lines{
      margin-top: 15px;
    }
  }
}
.detail_block {
  border-bottom: 1px solid #dcdcdc;  
  padding: 0 0 20px;
}
.copy_box:hover{
  border:1px solid rgba(76,75,213,1);
}
.active{
  border:1px solid rgba(76,75,213,1);
}
.hrw{
  border-top:1px solid #BBB;
}
.line span{
  font-size:14px;
  // font-family:SFUIDisplay-Bold;
  font-weight:bold;
  color:rgba(32,42,71,1);
}
.agentversion{
  width: 70%;
  display: inline-block;
}
.triangle{
  position: relative;
  .triangle_img{
    position: absolute;
    right: 0;
    top: -1px;
    height: 25%;
  }
}
#payment-form {
  padding: 20px;
  border: 1px solid #bbb;
  border-radius: 10px;
  -webkit-box-shadow: 1px 1px 5px 0 #bbb;
  box-shadow: 1px 1px 5px 0 #bbb;
}

</style>

