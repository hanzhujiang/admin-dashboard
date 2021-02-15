<template>
  <div class="block">
    <div class="block_head">
      <span class="title">{{rs.agency_commission_invoice}}</span>
      <!-- <el-button class="small block_button bg_orange" size="mini" @click="commission('01')" v-if="btnStatus.isEditAgency&&!readonly">
      <i class="fa fa-plus"></i>{{rs.create_invoice}}</el-button> -->
    </div>
    <div class="block_content">
      <el-row :gutter="10" class="block_line" style="border-bottom-color: lightgrey;">
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.received_date}}</div></el-col>
        <el-col :span="4" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.commission_type}}</div></el-col>
        <el-col :span="4" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.invoice_type}}</div></el-col>
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.status}}</div></el-col>
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.amount}}</div></el-col>
      </el-row>
      <el-row :gutter="10" class="block_line"  style="border-bottom-color: lightgrey;" v-for="(d,i) in saleAdviceData.commissioninvoiceagencylist" :key="i">
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{d.receiveddate}}</div></el-col>
        <el-col :span="4" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{conmissionObj[d.commissiontype]}}</div></el-col>
        <el-col :span="4" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.agency_invoice}}</div></el-col>
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{statusobj[d.status]}}</div></el-col>
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">${{toMoney(d.amount + d.adjustamount)}}</div></el-col>
        <el-col :span="7" class="cell">
          <!-- <el-button class="mini block_button bg_blue" size="mini"   @click="commission('01-1',i,d)" >
                  {{rs.edit}}
              </el-button> -->
            <span v-if="!readonly">
              <!-- 生成发票 -->
              <span v-if="create_invoice&&(d.status=='00'||d.status=='03')">
                <!-- 申请 -->
                <el-button   class="mini block_button bg_blue" size="mini"
                  @click="agencyApply(d)" >
                {{rs.apply}}</el-button>  
              </span> 
              <!-- 待审核 -->
              <span v-if="invoice_approval&&d.status=='01'">
                 <!-- 驳回 -->
                <el-button   class="mini block_button bg_red" size="mini"
                @click="confirm('0')" >
                {{rs.refuse}}</el-button>
                <!-- 确认 -->
                <el-button   class="mini block_button bg_orange" size="mini" @click="confirm('1')" 
                >
                {{rs.confirm}}</el-button>
              </span>
              <!-- 修改 -->
              <el-button   class="mini block_button bg_blue" size="mini" v-if="d.status!='02'&&(create_invoice||invoice_approval)"  @click="commission('01-1',i,d)" >
                  {{rs.edit}}
              </el-button>
              <span v-if="d.status=='02'">
                <!-- 详细 -->
                <el-button   class="mini block_button bg_green" size="mini"  @click="commission('01-1',i,d,'delete')">
                  {{rs.detail}}
                </el-button>
                <!-- PDF -->
                <el-button   class="mini block_button bg_green" size="mini" @click="PdfDownload(d)">
                  {{rs.invoice}}
                </el-button>
              </span>
            </span>
        </el-col>
      </el-row>
    </div>
    <!--  -->
    <div class="block_head">
      <span class="title">{{rs.agent_commission_invoice}}</span>
      <!-- <el-button class="small block_button bg_orange" size="mini" @click="commission('02')"  v-if="btnStatus.isEditAgent&&!readonly">
      <i class="fa fa-plus"></i>{{rs.create_invoice}}</el-button> -->
    </div>
    <div class="block_content">
      <el-row :gutter="10" class="block_line" style="border-bottom-color: lightgrey;">
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.received_date}}</div></el-col>
        <el-col :span="4" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.commission_type}}</div></el-col>
        <el-col :span="4" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.invoice_type}}</div></el-col>
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.status}}</div></el-col>
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.amount}}</div></el-col>
      </el-row>
      <el-row :gutter="10" class="block_line" style="border-bottom-color: lightgrey;" v-for="(d,i) in saleAdviceData.commissioninvoiceagentlist" :key="i">
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{d.receiveddate}}</div></el-col>
        <el-col :span="4" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{conmissionObj[d.commissiontype]}}</div></el-col>
        <el-col :span="4" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.agent_invoice}}</div></el-col>
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{statusobj[d.status]}}</div></el-col>
        <el-col :span="3" class="cell"><div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">${{toMoney(d.amount + d.adjustamount)}}</div></el-col>
        <el-col :span="7" class="cell">
            <span v-if="!readonly">
              <!-- 生成发票 -->
              <span v-if="create_invoice&&(d.status=='00'||d.status=='03')">
                <!-- 申请 -->
                <el-button   class="mini block_button bg_blue" size="mini" @click="agencyApply(d)" >
                {{rs.apply}}</el-button>  
              </span> 
              <!-- 待审核 -->
              <span v-if="invoice_approval&&d.status=='01'">
                 <!-- 驳回 -->
                <el-button   class="mini block_button bg_red" size="mini"
                @click="confirm('0')" >
               {{rs.refuse}}</el-button>
                <!-- 确认 -->
                <el-button   class="mini block_button bg_orange" size="mini" @click="confirm('1')" 
                >
               {{rs.confirm}}</el-button>
              </span>
              <!-- 修改 -->
              <el-button   class="mini block_button bg_blue" size="mini" v-if="d.status!='02'&&(create_invoice||invoice_approval)"  @click="commission('02-1',i,d)" >
                  {{rs.edit}}
              </el-button>
              <span v-if="d.status=='02'">
                <!-- 详细 -->
                <el-button   class="mini block_button bg_green" size="mini"  @click="commission('02-1',i,d,'delete')">
                  {{rs.detail}}
                </el-button>
                <!-- PDF -->
                 <el-button   class="mini block_button bg_green" size="mini" @click="PdfDownload(d)">
                  {{rs.invoice}}
                </el-button>
              </span>
            </span>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :close-on-click-modal='false' 
      :title="rs.invoice"
      :visible.sync="depositShow"
      width='70%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.invoice}}&nbsp;&nbsp;({{rs.exchange_commission}})</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="title blue">{{popData.commissiontype=='01'?rs.exchange_commission:rs.settle_commission}}:</div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="content blue" style="padding-top:5px;">{{popData.express}}</div>
          </el-col>
        </el-row>     
        <hr>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="form-group">
              <div class="sub-title">{{rs.contract_price}}</div>
              <div class="content">
                <el-input :placeholder="popData.price" clearable  :disabled="true"  size="small"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="form-group">
              <div class="sub-title">{{rs.exchange_commission}}</div>
              <div class="content">
                <el-input :placeholder="popData.amount" clearable :disabled="true"  size="small"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="form-group">
              <div class="sub-title">{{rs.adjustments}}</div>
              <div class="content">
                <el-input :placeholder="popData.adjustamount" size="small" :disabled="true" clearable></el-input>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="form-group">
              <div class="sub-title">{{rs.total_commission}}</div>
              <div class="content">
                <el-input :placeholder="Totalinput" size="small" :disabled="true" clearable></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="table_box">
          <el-table
            :data="vendorData"
            :empty-text = rs.no_data
            style="width: 100%"
            size="mini">
            <el-table-column
              prop="name"
              :label="rs.adjust_amount">
              <template slot-scope="scope">
                <span v-if="isFalg!==scope.$index">{{toMoney(scope.row.amount)}}</span>
                <el-input v-else v-model="scope.row.amount" size="small" clearable maxlength="10" @blur="validatorBlur('amount',scope.row,1)"></el-input>
                <p class="curtail" v-show="vendorDataval.amount.flg">{{rs[vendorDataval.amount.msg]}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="commissionrate"
              :label="rs.comments">
              <template slot-scope="scope">
                <span v-if="isFalg!==scope.$index">{{scope.row.comments}}</span>
                <el-input v-else v-model="scope.row.comments" size="small" clearable maxlength="200"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="200">
               <template slot-scope="scope">
                <div v-if="isFalg!==scope.$index">
                  <el-button   class="small bg_blue" size="mini" @click="isFalgFn(scope)" v-if="!deletes">
                  <img class="icon" src="@/assets/imgs/common/common_5.png" alt="">  {{rs.edit}}</el-button>
                  <el-button   class="small bg_red" size="mini" @click="delList(scope)" v-if="!deletes">
                    <img class="icon" src="@/assets/imgs/common/common_6.png" alt="">
                  {{rs.delete}}</el-button>
                </div>
                <div v-else>
                  <el-button   class="small bg_green" size="mini" @click="isFalgSave((scope.row),'03')" v-if="!deletes">
                  <i class="fa fa-check" ></i>{{rs.ok}}</el-button>
                  <el-button   class="small" size="mini" @click="cancel(scope.row,'1',scope.$index)" v-if="!deletes">
                  <i class="fa fa-close" ></i>{{rs.cancel}}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="AgencyDataNO"
            :show-header = "false"
            style="width: 100%"
            size="mini">
            <el-table-column
              prop="name">
              <template slot-scope="scope">
                <el-input v-model="scope.row.adjust" size="small"
                clearable maxlength="10" @blur="validatorBlur('adjust',scope.row,2)" v-if="!deletes"> </el-input>
                <p class="curtail" v-show="AgencyDataNOval.adjust.flg">{{rs[AgencyDataNOval.adjust.msg]}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="commissionrate">
              <template slot-scope="scope">
                <el-input  v-model="scope.row.comments" size="small" clearable maxlength="200" v-if="!deletes"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="200">
              <template slot-scope="scope">
                <el-button class="small bg_green" size="mini" @click="addArr((scope.row),scope)" v-if="!deletes">
                <i class="fa fa-check" ></i>{{rs.ok}}</el-button>
                <el-button class="small bg_orange" size="mini" @click="cancel(scope,'2',scope.$index)" v-if="!deletes">
                <i class="fa fa-close" ></i>{{rs.cancel}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="form-group">
        <div class="sub-title">{{rs.comments}}</div>
        <div class="content">
          <div class="textarea_box"> <textarea name="" id="" cols="30" rows="10" v-model="popData.notes"></textarea></div>
        </div>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="close">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="save" v-if="!deletes">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCommissionData, getCommissionInvoice, insertCommissionInvoice, deleteCommissionInvoice, updateCommissionInvoice,
        applyCommissionInvoice, approveSaleAdvice, getSaleAdvice,saleAgentToLwp } from '@/api/saleAdviceApi.js'
import { mapGetters } from "vuex";
import {formatDate , newDate} from '@/assets/js/time.js'; //时间转换插件
import { validator, allvalidator } from '@/validator/validator.js'
export default {
  data(){
    return{
      deletes:false,
      ionw:null,
      gaenttype:'02',
      gaencytype:'01',
      agencyData:[],
      depositShow:false,
      input:"",
      isFalg:'1',
      Ratevalue:'',
      popData:{},
      totalinput:'',
      popDataSave:{
        Totalinput:{
        vaid:['noNull','Number'],
        flg:false
        },
        Exchangeinput:{
          vaid:['noNull','Number'],
        flg:false
        }
      },
      vendorData:[],
      AgencyDataNO:[{
        adjust:'',
        comments:'',
      }],
      AgencyDataNOval:{
        adjust:{
        vaid:['noNull','Number'],
        flg:false
        },

      },
      vendorDataval:{
        amount:{
          vaid:['noNull','Number'],
          flg:false
        }
      },
      commissionRateId:'',
      btnType:'',
      invoiceid:'',
      commissiontype:"",
      conmissionObj:{},
      invoiceObj:{},
      statusobj:{},
      arr:[],
      invoice_approval:false, //待审核页面
      create_invoice:false, // 生成发票
      amount:null,
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','saleAdviceData','btnStatus','control']),

    readonly(){
        if(this.control.reserve === '02'){
          return true
        }else{
          return false
        }
      },
      Totalinput(){
        
        return  this.totalinput
      }
  },
  created(){
    if (JSON.parse(sessionStorage.getItem('isFalg')).type=='create_invoice') {
      this.create_invoice = true
    }
    if (JSON.parse(sessionStorage.getItem('isFalg')).type=='invoice_approval') {
      this.invoice_approval = true
    }
    JSON.parse(localStorage.getItem('selectlist')).COMMISSION_TYPE_LIST.forEach(val => {
      this.conmissionObj[val.code] = val.value
    });
    this.conmissionObj = Object.assign({}, this.conmissionObj)
     JSON.parse(localStorage.getItem('selectlist')).INVOICE_APPROVAL_STATUS_LIST.forEach(val => {
      this.invoiceObj[val.code] = val.value
    });
    this.invoiceObj = Object.assign({}, this.invoiceObj)
    JSON.parse(localStorage.getItem('selectlist')).DEPOSIT_APPROVAL_STATUS_LIST.forEach(val => {
      this.statusobj[val.code] = val.value
    });
    this.statusobj = Object.assign({}, this.statusobj)
  },
  methods:{
    // pdf 
    PdfDownload(d){ 
      let data = {
        languagetype:localStorage.getItem('languagetype'),
        propertyid:this.saleAdviceData.propertyid, 
        invoiceid:d.invoiceid,
        agentid:d.agentid
      }
      saleAgentToLwp(data).then(res=>{
        if (res.data.success) {
          this.download(res.data)      
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    download (data) {
      window.location.href=data.filepath;
      let url= data.filepath;
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', data.displayname)
      document.body.appendChild(link)
      link.click()
    },

    //详细
    detail(deletes){
      this.deletes = false
      if(deletes == 'delete'){
        this.deletes = true
      }
    },
    //表单验证复位
    formValidation(){
      for(let k in this.popDataSave){
        this.popDataSave[k].flg = false
      }
      for(let k  in this.AgencyDataNOval){
        this.AgencyDataNOval[k].flg = false
      }
      for(let k  in this.vendorDataval){
        this.vendorDataval[k].flg = false
      }
    },
    validatorBlur(key,row,type){
      if (type==1) {
        validator(this.vendorDataval,row,key)
      }else if (type==2) {
        validator(this.AgencyDataNOval,row,key)
      }else if(type == 0){
        validator(this.popDataSave,row,key)
      }
      },
    ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },
    toMoney(num){
      
        num = +num
        num = num.toFixed(2);
        num = parseFloat(num)
        num = num.toLocaleString();
        return num;//返回的是字符串23,245.12保留2位小数
      },
    isFalgFn(scope){
      this.isFalg = scope.$index
      this.oldData()
    },
    isFalgSave(row,scope){
      if(allvalidator(this.vendorDataval,row)){
          return
        }
      this.isFalg = !this.isFalg
      this.calculate()
      this.oldData()
    },
    // agencyDel(d){
    //   deleteCommissionInvoice({ids:d.invoiceid}).then(res=>{
    //     if (res.data.success) {
    //       for(var i=0;i<this.saleAdviceData.commissioninvoiceagencylist.length;i++){
    //         if(this.saleAdviceData.commissioninvoiceagencylist[i].invoiceid==d.invoiceid){
    //           this.saleAdviceData.commissioninvoiceagencylist.remove(this.saleAdviceData.commissioninvoiceagencylist[i])
    //           this.$message.success(this.rs.info_msg_delete_success)
    //         }
    //       }
    //     }else{
    //        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
    //     }
    //   })
    // },
    agentDel(d){
      deleteCommissionInvoice({ids:d.invoiceid}).then(res=>{
        if (res.data.success) {
          for(var i=0;i<this.saleAdviceData.commissioninvoiceagentlist.length;i++){
            if(this.saleAdviceData.commissioninvoiceagentlist[i].invoiceid==d.invoiceid){
              this.saleAdviceData.commissioninvoiceagentlist.remove(this.saleAdviceData.commissioninvoiceagentlist[i])
              this.$message.success(this.rs.info_msg_delete_success)
            }
          }
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //发送
    agencyApply(d){
      applyCommissionInvoice({invoiceid:d.invoiceid,saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid}).then(res=>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_insert_success)
          this.refresh()
        }else{
           this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    delList(scope){
      for(var i = 0; i<this.vendorData.length;i++){
        if(i == scope.$index){
          this.vendorData.remove(this.vendorData[i])
          this.calculate()
          this.oldData()
        }
      }
    },
    cancel(row,type,index){
      if(type=='1'){
          this.isFalg = false
          let obj={}
          for(var key in this.arr[index]){
            obj[key] = this.arr[index][key]
          }
          this.vendorData[index] = obj;
          this.calculate()
      }else{
        this.AgencyDataNO =[{
          adjust:'',
          comments:'',
        }]
      }
    },
    //  计算
    calculate(){
      let num = 0
      for(var i= 0;  i<this.vendorData.length; i++){
        num += +this.vendorData[i].amount
      }
      this.popData.adjustamount = num
      // this.popData.Finalinput = (+this.popData.Totalinput) - (+this.popData.Exchangeinput) +(+this.popData.Adjustmentsinput)
    },
    addArr(row,scope){
      
      if(allvalidator(this.AgencyDataNOval,row)){
          return
        }
      let Obj = {
        amount: row.adjust,
        comments: row.comments
      }
        this.vendorData.push(Obj)
        this.AgencyDataNO =[{
          adjust:'',
          comments:'',
        }]
        this.calculate()
        // this.popData.Finalinput
        // 指针问题.循环赋值
        this.oldData()
    },
    //记录旧数据
    oldData(){
      this.arr = []
        this.vendorData.forEach(element => {
          let obj={};
          for(var key in element){
            obj[key] = element[key]
          }
          this.arr.push(obj)
        });
    },
    //保存
    save(){
      // if(allvalidator(this.popDataSave,this.popData)){
      //     return
      //   }
      
      
      if(this.btnType == '01-1'){
        let saveUpData = {
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        agencyprojectid:JSON.parse(sessionStorage.getItem('isFalg')).agencyprojectid,
        commissiontype:this.popData.commissiontype,
        invoicetype:'01',
        ratetype:this.popData.ratetype,
        commissionrate:this.popData.commissionrate,
        bonustype:this.popData.bonustype,
        bonus:this.popData.bonus,
        amount:this.amount,
        adjustamount:this.popData.adjustamount,
        invoiceid:this.popData.invoiceid,
        adjustcommissionlist:JSON.stringify(this.vendorData),
        notes:this.popData.notes
        }
        updateCommissionInvoice(saveUpData).then(res=>{
          if (res.data.success) {
            for(var i=0;i<this.saleAdviceData.commissioninvoiceagencylist.length;i++){
              if(this.saleAdviceData.commissioninvoiceagencylist[i].invoiceid==this.invoiceid){
                let data = {
                  adjustamount:this.popData.Adjustmentsinput,
                  commissiontype:'01',
                  invoicetype:'01',
                  status:'00',
                  adjustamount:this.popData.Adjustmentsinput,
                  receiveddate:formatDate(new Date(new Date().getTime()), 'yyyy-MM-dd')
                }
                this.saleAdviceData.commissioninvoiceagencylist[i] = data
                this.$message.success(this.rs.info_msg_operate_success)
                this.refresh()
                this.depositShow = false
              }
            }
          }else{
             this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
        }else{
          let saveUpData = {
            saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
            agencyprojectid:JSON.parse(sessionStorage.getItem('isFalg')).agencyprojectid,
            commissiontype:this.popData.commissiontype,
            invoicetype:'02',
            ratetype:this.popData.ratetype,
            commissionrate:this.popData.commissionrate,
            bonustype:this.popData.bonustype,
            bonus:this.popData.bonus,
            amount:this.amount,
            adjustamount:this.popData.adjustamount,
            invoiceid:this.popData.invoiceid,
            adjustcommissionlist:JSON.stringify(this.vendorData),
            notes:this.popData.notes
          }
          updateCommissionInvoice(saveUpData).then(res=>{
            if (res.data.success) {
              
              for(var i=0;i<this.saleAdviceData.commissioninvoiceagentlist.length;i++){
                if(this.saleAdviceData.commissioninvoiceagentlist[i].invoiceid==this.invoiceid){
                  let data = {
                    adjustamount:this.popData.Adjustmentsinput,
                    commissiontype:'01',
                    invoicetype:'02',
                    status:'00',
                    adjustamount:this.popData.Adjustmentsinput,
                    receiveddate:formatDate(new Date(new Date().getTime()), 'yyyy-MM-dd')
                  }
                  this.saleAdviceData.commissioninvoiceagentlist[i] = data
                  this.$message.success(this.rs.info_msg_insert_success)

                  this.refresh()
                  this.depositShow = false
                }
              }
            }else{
               this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }
    },
    close(){
       this.depositShow=false
    },
    confirm(flag){
      
       let approveData = {
          requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
          flag:flag,
          propertyid:this.saleAdviceData.propertyid,

        }
        // 新增comments
        // console.log(approveData,'approveData2')
        approveSaleAdvice(approveData).then(res=>{
          if (res.data.success) {
            // this.$router.go(-1)
            this.refresh();
            this.$message.success(this.rs.info_msg_update_success)
          }else{
             this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
    },
    // 弹窗下拉框事件
    optionChange(val){
      this.commissionRateId = val
      let optionData = {
        price:this.saleAdviceData.price,
        commissionid:val,
        adjustamount:null
      }
      getCommissionInvoice(optionData).then(res=>{
         if (res.data.success) {
            this.popData.Exchangeinput = Math.ceil(res.data.exchangecommission)
            this.popData.Totalinput = Math.ceil(res.data.totalcommission)
            // this.popData.Adjustmentsinput = res.data.adjustments
            this.popData.Finalinput = Math.ceil(res.data.finalamount)
          }else{
             this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
      })
    },
    commission(type,i,d,deletes){
      this.ionw = i
      this.formValidation()
      this.depositShow = !this.depositShow
      if(type=='01-1'){
        this.invoiceid = d.invoiceid
        this.btnType = type
        this.arrpoplist(this.gaencytype,this.saleAdviceData.commissioninvoiceagencylist[i].invoiceid,i)
        this.detail(deletes)
      }else if(type=='02-1'){
        this.btnType = type
        this.invoiceid = d.invoiceid
        this.arrpoplist(this.gaenttype,this.saleAdviceData.commissioninvoiceagentlist[i].invoiceid,i)
        this.detail(deletes)
      }
    },
    arrpoplist(commissiontype,id,i){
      let agetcyData = {
          commissiontype:commissiontype,
          agencyprojectid:JSON.parse(sessionStorage.getItem('isFalg')).agencyprojectid,
          invoiceid:id
        }
        getCommissionInvoice(agetcyData).then(res=>{
          if (res.data.success) {
             
              this.popData = res.data.data[0];
              this.amount = this.popData.amount
              this.totalinput = this.toMoney(this.popData.amount + this.popData.adjustamount)
              this.popData['price'] = this.saleAdviceData.price
              this.popData['price'] = this.toMoney(this.popData.price)
              this.popData['amount'] = this.toMoney(this.popData.amount) 
              this.popData['adjustamount'] = this.toMoney(this.popData.adjustamount) 
              // this.Ratevalue = (res.data.data[0].commissionrateid)
              this.vendorData = res.data.adjustcommissionlist, //表格数据

              this.popData.optionData = res.data.commissionlist //下拉框数据
          }else{
             this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
    },
    refresh(){
      let ids = {
          propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
          saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
          languagetype:localStorage.getItem('languagetype')
        }
      getSaleAdvice(ids).then(res=>{
        if (res.data.success) {
          
          this.$store.commit('SALE_ADVICE_DATA',res.data.data)
        } else {
           this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          this.$store.commit('SALE_ADVICE_DATA',res.data.data)
        }
      })
    },
    refresh(){
      let ids = {
          propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
          saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
          languagetype:localStorage.getItem('languagetype')
        }
      getSaleAdvice(ids).then(res=>{
        if (res.data.success) {
          this.$store.commit('SALE_ADVICE_DATA',res.data.data)
        } else {
           this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          this.$store.commit('SALE_ADVICE_DATA',res.data.data)
        }
      })
    }

  },
  watch:{
    se(){
      JSON.parse(localStorage.getItem('selectlist')).COMMISSION_TYPE_LIST.forEach(val => {
        this.conmissionObj[val.code] = val.value
      });
      this.conmissionObj = Object.assign({}, this.conmissionObj)
      JSON.parse(localStorage.getItem('selectlist')).INVOICE_APPROVAL_STATUS_LIST.forEach(val => {
        this.invoiceObj[val.code] = val.value
      });
      this.invoiceObj = Object.assign({}, this.invoiceObj)
      JSON.parse(localStorage.getItem('selectlist')).DEPOSIT_APPROVAL_STATUS_LIST.forEach(val => {
        this.statusobj[val.code] = val.value
      });
      this.statusobj = Object.assign({}, this.statusobj)
    }
  }


}
</script>
<style scoped>
div.title {
  margin: 5px 10px 0 10px;
  font-weight: bold;
  line-height: 20px;
}
div.content {
  margin: 5px;
}
.textarea_box,.textarea_box > textarea{
    max-width: 100%;
    min-width: 100%;
}
</style>
