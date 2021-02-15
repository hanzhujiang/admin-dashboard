<template>
  <div class="block">
    <div class="block_head">
      <span class="title">{{rs.broker}} </span>
      <el-button   class="small block_button bg_green fr"  style="margin-right:15px"   size="mini" @click="handleChageBroke" v-if="btnStatus.isAddBroker&&!readonly&&saleAdviceData.brokerObject.brokerid ==''">{{rs.add}}</el-button>
      <!-- <el-button class="small block_button bg_green"  size="mini" @click="handleChageBroke" v-if="btnStatus.isAddBroker">{{rs.add}}</el-button> -->
      <el-button   class="small block_button bg_blue fr"  style="margin-right:15px"   size="mini" @click="handleChageBroke" v-if="btnStatus.isChangeBroker&&!readonly&&saleAdviceData.brokerObject.brokerid !=''">{{rs.change}}</el-button>
      <el-button   class="small block_button bg_red fr" style="margin-right:15px"   size="mini" @click="handleDeleteBroke" v-if="btnStatus.isChangeBroker&&!readonly&&saleAdviceData.brokerObject.brokerid !=''">{{rs.delete}}</el-button>
    </div>
    <div class="block_content" v-if="saleAdviceData.brokerObject">
      <el-row :gutter="10" class="block_line">
        <el-col :span="6" class="title"><div>{{rs.given_name}}</div></el-col>
        <el-col :span="6" :class="[isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.brokerObject.brokerfirstname}}</div></el-col>
        <el-col :span="6" class="title"><div>{{rs.surname}}</div></el-col>
        <el-col :span="6" :class="[isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.brokerObject.brokerlastname}}</div></el-col>
      </el-row>
      <el-row :gutter="10" class="block_line">
        <el-col :span="6" class="title"><div>{{rs.email}}</div></el-col>
        <el-col :span="6" :class="[isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.brokerObject.brokeremail}}</div></el-col>
        <el-col :span="6" class="title"><div>{{rs.phone}}</div></el-col>
        <el-col :span="6" :class="[isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.brokerObject.brokermobileNumber}}</div></el-col>
      </el-row>
    </div>
    <select-partner-contact :sync="brokerShow" @select="setBrokeName" @update:sync="brokerShow=false"></select-partner-contact>
  </div>
</template>
<script>
import { getClientData, getSolicitorData ,propertyUpdatePrice} from '@/api/saleAdviceApi.js'
import {updateClient} from '@/api/clientApi'
import { mapGetters } from "vuex";
import { toAddressString, toAddressString2 } from "@/assets/js/utility.js"
import { validator, allvalidator } from '@/validator/validator.js'
export default {
  data(){
    return{
      brokerShow:false,
      isAdd:'add',
      formData:{
        firstname:'', //
        lastname:'', //
        addressline:'',
        addressline:'',
        suburb:'', //
        state:'',
        postcode:'', //
        country:'', //
        email:'',  //
        mobilenumber:'',//
        phonenumber:'',//
        clientid:'',
        purchasetype:''
      },
      validatorSave:{
        changeprice:{
           vaid:['Number'],
            flg:false
        }
      },
      edit_purchaserShow:false,
      changeprice:'',
      countryObj:{},
      pagenum:10,
      dialogVisible:false,
      conditionShow:false,
      conditionsLIst:[],
      conditonsValue:'',
      options: [],
      value:'',
      solicitorList:[],
      condition:'',
      purchaserList:[],
      ismain:'1',
      total:null,
      saleconditionlist:[],
      data:{
        condition:'',  //搜索关键字
        pagesize : 10, //分页
        pagenum :1, //页码
        languagetype:'',
        isactived:1
      },
      purchaseobj:{},
      purchaserTypeList:[],
      countryList:[],
      arr:['one','two','three','four','five']
    }
  },
  created(){
      this.purchaserTypeList =JSON.parse(localStorage.getItem('selectlist')).PURCHASER_TYPE_LIST
      this.options = JSON.parse(localStorage.getItem('selectlist')).PRECONDITION_LIST
      JSON.parse(localStorage.getItem('selectlist')).PURCHASER_TYPE_LIST.forEach(element => {
         this.purchaseobj[element.code] = element.value;
      });
      this.purchaseobj = Object.assign({},this.purchaseobj)
      let countryList =JSON.parse(localStorage.getItem('selectlist')).Country;
      countryList.forEach(element => {
        this.countryObj[element.countryid] = element.countryname
      });
      this.countryObj = Object.assign({}, this.countryObj)
      this.countryList =JSON.parse(localStorage.getItem('selectlist')).Country;
  },
  mounted(){
    
  },
   computed: {
    ...mapGetters(['se','rs','languagetype','saleAdviceData','btnStatus','control']),
    readonly(){
        if(this.control.sales_advice === '02'){
          return true
        }else{
          return false
        }
      }
  },
  components: {
    'select-partner-contact':resolve=> require(['@/common/SelectPartnerContact.vue'],resolve)
    },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,{changeprice:this.changeprice},key)
    },
    handleChageBroke(){
      this.brokerShow = true;
    },
    handleDeleteBroke(){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
       this.saleAdviceData.brokerObject ={
          brokeremail:"",
          brokerfirstname:'',
          brokermobileNumber:'',
          brokerid:''
        }
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      })
      
    },
    setBrokeName(row){
      this.saleAdviceData.brokerObject ={
        brokeremail:"",
        brokerfirstname:'',
        brokermobileNumber:'',
        brokerid:''
      }
      this.saleAdviceData.brokerObject['brokeremail']= row.email,
      this.saleAdviceData.brokerObject.brokerfirstname = row.firstname
      this.saleAdviceData.brokerObject.brokermobileNumber = row.mobilenumber
      this.saleAdviceData.brokerObject.brokerlastname = row.lastname
      this.saleAdviceData.brokerObject.brokerid=row.brokerid
      this.brokerShow = false

    },
    makeAddress(d) {
      return toAddressString(d)
    },
    makeAddress2(d) {
      return toAddressString2(d)
    },
    ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },

  },
  watch:{
    se(val){
      val.PURCHASER_TYPE_LIST.forEach(element => {
         this.purchaseobj[element.code] = element.value;
      });
      this.purchaseobj = Object.assign({},this.purchaseobj)
      let countryList = val.Country;
        countryList.forEach(element => {
        this.countryObj[element.countryid] = element.countryname
      });
      this.options = JSON.parse(localStorage.getItem('selectlist')).PRECONDITION_LIST
    }
  }
}
</script>

<style scoped>
</style>
<style>
  .input_css.el-input.el-input--suffix>input {
    border: none;
    border-bottom: 1px solid #EEE;
    border-radius:0px;
  }
  .condition_line {
    width:100%;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
  }

  .text_decoration{
    text-decoration: line-through;
  }
  .red_text{
    color:red;
  }
</style>
