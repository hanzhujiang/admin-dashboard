<template>
  <div class="block">
    <div class="block_head">
      <span class="title">{{rs.property_deposit_receipt}}</span>
      <el-button   class="small block_button bg_green fr"  style="margin-right:15px"  size="mini" @click="deposithide" v-if="btnStatus.isEditDeposit&&!readonly">
      {{rs.add_deposit}}</el-button>
    </div>
    <div class="block_content">
      <el-row :gutter="10" class="block_line">
        <el-col :span="4" class="title"><div>{{rs.deposit_status}}</div></el-col>
        <el-col :span="8" class="cell"><div>{{stateobj[saleAdviceData.depositstatus]}}</div></el-col>
        <el-col :span="4" class="title"><div>{{rs.deposit_received}}</div></el-col>
        <el-col :span="8" class="cell"><div >{{total?'$':''}}{{toMoney(+total)}}</div></el-col>
      </el-row>
      <el-row :gutter="10" class="block_line" style="border-bottom-color: lightgrey;">
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.received_date" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.received_date}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.received_date}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.deposit_method" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.deposit_method}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.deposit_method}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.status" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.status}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.status}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.amount" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.amount}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.amount}}</div> -->
          </el-col>
      </el-row>
      <div v-for="(d,i) in saleAdviceData.depositlist" :key="i">
        <el-row :gutter="10" class="block_line"  style="border-bottom-color: lightgrey;" >
        <el-col :span="4" class="cell">
          <el-tooltip :content="d.receiveddate" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{setformatDate(d.receiveddate)}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{d.receiveddate}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="filterOptions[d.paytype]" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{filterOptions[d.paytype]}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{filterOptions[d.paytype]}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="statusobj[d.status]" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{statusobj[d.status]}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{statusobj[d.status]}}</div> -->
          </el-col>
        <!-- <el-col :span="4" class="cell"><div style="text-align: center;">{{d.status}}</div></el-col> -->

        <el-col :span="4" class="cell"><div style="text-align: center;">{{d.depositamount?'$':''}}{{toMoney(+d.depositamount)}}</div></el-col>
        <el-col :span="8" class="cell" >
          <span v-if="!readonly">
            <!-- <el-button class="mini block_button bg_blue" size="mini"  @click="edit(d,i,'2')" >
              {{rs.edit}}</el-button> -->
             <span v-if="deposit_approval&&d.status=='01'&&d.isneedapprove=='1'"> 
             <!-- 确认 -->
            <el-button   class="mini block_button bg_orange" size="mini" @click="confirm(d,'1','deposit')">
            {{rs.confirm}}</el-button>
            <!-- 驳回 -->
            <el-button   class="mini block_button bg_red" size="mini" @click="confirm(d,'0','deposit')">
            {{rs.refuse}}</el-button>
          </span>
          <!-- <span v-if="pay_deposit"> -->
          <span v-if="btnStatus.isEditDeposit&&!readonly">
            <!-- 编辑 -->
            <el-button   class="mini block_button bg_blue" size="mini"  @click="edit(d,i,'2')" v-if="d.status=='00'||d.status=='03'">
              {{rs.edit}}</el-button>
            <!-- 申请 -->
            <el-button   class="mini block_button bg_blue" size="mini" @click="apply(d)"  v-if="d.status=='00'||d.status=='03'">
            {{rs.apply}}</el-button>
            <!-- 删除 -->
            <el-button   class="mini block_button bg_red" size="mini" @click="del(d)" v-if="d.status=='00'">
            {{rs.delete}}</el-button>
          </span>
          <!-- PDF -->
            <el-button   class="mini block_button bg_green" size="mini" v-if="d.status=='02'" @click="depositPdfDownload(d)">
            {{rs.receipt}}</el-button>
          </span>
        </el-col>
        </el-row>
        <el-row :gutter="10" class="block_line" style="border-bottom-color:lightgrey;padding:5px 20px;" v-if="d.depositattachmentlist==[]">
          <el-col :span="6" class="cell" v-for="(b, i) in d.depositattachmentlist" :key="i">
           <span class="route_line" style="font-size: 12px;" @click="download(b)">{{b.displayname}}</span>
          </el-col>
        </el-row>
      </div>
    </div>


<!-- t退还 -->
  <div v-if="this.saleAdviceData.salestatus == '99'">
    <div class="block_head">
      <span class="title">{{rs.refund_deposit}}</span>
      <el-button   class="small block_button bg_green fr"  style="margin-right:15px"  size="mini" @click="refundDeposit" 
        v-if="btnStatus.isRefundDeposit&&!readonly">{{rs.refund_deposit}}</el-button>
    </div>
    <div class="block_content">
      <el-row :gutter="10" class="block_line">
        <el-col :span="4" class="title"><div>{{rs.refund_amount}}</div></el-col>
        <el-col :span="8" class="cell"><div >${{toMoney(+refundtotal)}}</div></el-col>
      </el-row>
      <el-row :gutter="10" class="block_line" style="border-bottom-color: lightgrey;">
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.received_date" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.received_date}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.received_date}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.deposit_method" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.deposit_method}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.deposit_method}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.status" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.status}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.status}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.amount" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.amount}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{rs.amount}}</div> -->
          </el-col>
      </el-row>
      <div v-for="(d,i) in saleAdviceData.refundlist" :key="i">
        <el-row :gutter="10" class="block_line"  style="border-bottom-color: lightgrey;" >
        <el-col :span="4" class="cell">
          <el-tooltip :content="rs.refundeddate" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{setformatDate(d.refundeddate)}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{d.refundeddate}}</div> -->
          </el-col>
        <el-col :span="4" class="cell">
          <el-tooltip :content="filterOptions[d.paytype]" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{filterOptions[d.paytype]}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{filterOptions[d.paytype]}}</div> -->
          </el-col>
        <!-- <p>{{d.refundid}}==== {{refundid}}</p> -->
        <el-col :span="4" class="cell">
          <el-tooltip :content="statusobj[d.status]" placement="top">
            <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{statusobj[d.status]}}</div>
          </el-tooltip>
          <!-- <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{statusobj[d.status]}}</div> -->
          </el-col>
        <!-- <el-col :span="4" class="cell"><div style="text-align: center;">{{d.status}}</div></el-col> -->

        <el-col :span="4" class="cell">
          <div style="text-align: center;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{d.refundamount?'$':''}}{{toMoney(+d.refundamount)}}</div>
        </el-col>
        <el-col :span="8" class="cell" >
          <span v-if="!readonly&&d.isneedapprove=='1'">
            <span>
              <!-- 编辑 -->
              <el-button   class="mini block_button bg_blue" size="mini"  @click="editRefund(d,i,'3')" 
                v-if="refund_order&&d.status=='01'">{{rs.edit}}</el-button>
            </span>
            <span v-if="refund_order"> 
             <!-- 确认 -->
              <el-button   class="mini block_button bg_orange" size="mini" @click="confirm(d,'1','refund')">
              {{rs.confirm}}</el-button>
              <!-- 驳回 -->
              <el-button   class="mini block_button bg_red" size="mini" @click="confirm(d,'0','refund')">
              {{rs.refuse}}</el-button>
            </span>
          </span>
        </el-col>
        </el-row>
        <el-row :gutter="10" class="block_line" style="border-bottom-color:lightgrey;padding:5px 20px;" v-if="d.depositattachmentlist==[]">
          <el-col :span="6" class="cell" v-for="(b, i) in d.depositattachmentlist" :key="i">
           <span class="route_line" style="font-size: 12px;" @click="download(b)">{{b.displayname}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
<!-- 退还end -->

    <el-dialog
      :close-on-click-modal='false'
      :title="rs.add_deposit"
      :visible.sync="depositShow"
      width='50%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.add_deposit}}</span>
        </div>
      </template>
      <div class="dialog-body" style="line-height:1">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="form-group">
              <div class="sub-title">{{rs.deposit_received}}</div>
              <div class="content">
                <el-input maxlength="10" v-model="formData.receivedVal" size="small" clearable @blur="validatorBlur('receivedVal')"></el-input>
                <p class="curtail" v-show="validatorSave.receivedVal.flg">{{rs[validatorSave.receivedVal.msg]}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="form-group">
              <div class="sub-title">{{rs.deposit_type}}</div>
              <div class="content">
                <el-select v-model="value" size="small" placeholder="">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.code">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="form-group">
              <div class="sub-title">{{rs.comments}}</div>
              <div class="content">
                <el-input type="textarea" rows=6 v-model="tetx" size="small" clearable  maxlength="500">
                </el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="type!=3">
          <el-col :span="24">
            <div class="form-group">
              <div class="sub-title">{{rs.deposit_attachment}}</div>
              <el-upload
                class="upload-demo"
                :action="actionUrl+'?projectid='+saleAdviceData.projectid+'&propertyid='+saleAdviceData.propertyid"
                :on-change="handleChange"
                :on-success="handleAvatarSuccess"
                :on-progress="handleMinprogress"
                :file-list="fileList3">
                <el-button   size="small" class="small bg_blue">{{rs.upload}}</el-button>
              </el-upload>
              <!-- <el-upload
                :action="actionUrl+'?projectid='+saleAdviceData.projectid+'&propertyid='+saleAdviceData.propertyid"
                list-type="picture-card"
                :file-list="fileList3"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :on-progress="handleMinprogress">
                <i class="el-icon-plus"></i>
              </el-upload> -->
            </div>
          </el-col>
        </el-row>
        
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="close">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="save()">
             {{rs.set}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 退押金弹窗 -->
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.edit_refund"
      :visible.sync="refundDepositShow"
      width='50%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.edit_refund}}</span>
        </div>
      </template>
        <div class="dialog-body">
          <!-- <el-table
            :data="refundDepositData"
            :empty-text = rs.no_data
            style="width: 100%"
            size="mini">
            <el-table-column
              fixed
              prop="refundeddate"
              :label="rs.refund_date">
            </el-table-column>
            <el-table-column
              prop="refundamount"
              :label="rs.refund_amount">
              </el-table-column>
            <el-table-column
              prop="comments"
              :label="rs.comments">
              </el-table-column>
            <el-table-column
              width="80">
              <template slot-scope="scope">
                <el-button class="mini bg_red" size="small" @click="depositDelete(scope.row)" v-if="!readonly">{{rs.delete}}</el-button>
              </template>
            </el-table-column>
          </el-table> -->
          <el-row :gutter="30">
            <el-col :span="12">
              <div class="form-group">
                <div class="sub-title">{{rs.refund_amount}}</div>
                <div class="content">
                  <el-input maxlength="10"  v-model="popformData.AmountValue" clearable  size="mini" @blur="validatorBlur('AmountValue',1)" :disabled="readonly" :placeholder="rs.max_refund+' $'+maxRefund"></el-input>
                  <p class="curtail" v-show="popformDataSave.AmountValue.flg">{{rs[popformDataSave.AmountValue.msg]}}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-group">
                <div class="sub-title">{{rs.refund_type}}</div>
                <div class="content">
                  <el-select v-model="popformData.refundValue" placeholder="" style="width:100%;"  size="mini" :disabled="readonly">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.code">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="24">
              <div class="form-group">
                <div class="sub-title">{{rs.comments}}</div>
                <div class="content">
                  <textarea style=" width:100%; min-height: 163px;"
                    v-model="popformData.commentsText" placeholder="" maxlength="500" :disabled="readonly"></textarea>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button style="color:#000;" class="small" @click="RefundDepositclose" v-if="!readonly">
                {{rs.close}}</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fr">
                <el-button class="small bg_blue" @click="refundSave" v-if="!readonly">
                {{rs.refund}}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
    </el-dialog>
<!-- 定金驳回 -->
     <el-dialog
      :close-on-click-modal='false'
      :visible.sync="dialogFormVisible"
      width='600px'
      @close="$emit('update:sync')"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.reject_reason}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-checkbox-group v-model="checkedCities" >
          <p v-for="(city,i) in depositRejectReason"  :key="i">
          <el-checkbox :label="city.code" v-if="city.code!='99'">{{city.value}}</el-checkbox>
          </p>
        </el-checkbox-group>
        <el-checkbox v-for="(city) in depositRejectReason" :key="city.code" v-model="checkbox"  v-if="city.code=='99'"  @change="handleCheckedCitiesChange(checkbox)">{{city.value}}</el-checkbox>
        <textarea maxlength="500"  style="width:98%;min-height: 150px;padding:1%;line-height:18px" v-model="suggest"  :disabled='!checkbox' ></textarea>

      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="earnestClose">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="affirm(true)">
              {{rs.set}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 退还定金驳回 -->
     <el-dialog
      :close-on-click-modal='false'
      :visible.sync="refundShow"
      width='600px'
      @close="$emit('update:sync')"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.reject_reason}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-checkbox-group v-model="checkedCities" >
          <p v-for="(city,i) in refundRejectReason"  :key="i">
          <el-checkbox :label="city.code" v-if="city.code!='99'">{{city.value}}</el-checkbox>
          </p>
        </el-checkbox-group>
        <el-checkbox v-for="(city) in refundRejectReason" :key="city.code" v-model="checkbox"  v-if="city.code=='99'"  @change="handleCheckedCitiesChange(checkbox)">{{city.value}}</el-checkbox>
        <textarea maxlength="500" style="width:100%;min-height: 150px;" v-model="suggest"  :disabled='!checkbox' ></textarea>

      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="refundEarnestClose">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="affirm(false)">
              {{rs.set}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {formatDate , newDate} from '@/assets/js/time.js'; //时间转换插件
import { updateDeposit, deleteDeposit, insertDeposit, getSaleDeposit, getRefund, deleteRefund, 
        insertRefund, approveSaleAdvice,getSaleAdvice ,requestHandleAgencyApprove,saleDownloadDepositPDF,
        refundUpdate} from '@/api/saleAdviceApi.js'
import {getOption} from '@/api/optionValueApi'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import axios from 'axios'
export default {
  data(){
    return{
      refundShow:false,
      fileList3:[],
      dialogFormVisible:false,
      checkedCities:[],
      depositRejectReason:[],
      refundRejectReason:[],
      suggest:"",
      checkbox:false,
      depositShow:false,
      refundDepositShow:false,
      formData:{
         receivedVal:'',
      },
      validatorSave:{
        receivedVal:{
          vaid:['noNull','Number'],
          flg:false
        }
      },
      options: [],
      refundDepositData: [],
      value: '',
      popformData:{
        AmountValue:"",
        refundValue:"",
        commentsText:''
      },
      popformDataSave:{
        AmountValue:{
          vaid:['noNull','Number'],
          flg:false
        }
      },
      tetx:'',
      type:'',
      aList:'',
      index:null,
      // total:''

      stateobj:{},
      filterOptions:{},
      statusobj:{},
      deposit_approval:false,//待审核页面 待审核页面渠道
      pay_deposit:false,//定金支付页面
      refund_deposit:false, //退还定金
      refund_order:false, //退还定金 待审核
      // isChannel:false // 待审核页面渠道
      is_channel :'',
      refundid:'',
      actionUrl:'',
      attachmentlist:[],
      requestid:''
    }
  },
  created(){
    this.is_channel= JSON.parse(sessionStorage.getItem('isFalg')).isChannel=='1'
    let opData = {
      keyid1:"04",
      keyid2:'21',
      languagetype : localStorage.getItem('languagetype')
    }
    getOption(opData).then(res=>{
      if (res.data.success) {
        this.depositRejectReason = res.data.data;
        
        // deposit
      }
    })
    getOption({keyid1:'04',keyid2:'23',languagetype : localStorage.getItem('languagetype')}).then(res=>{
      if (res.data.success) {
        this.refundRejectReason = res.data.data
      }
    })
    
    if (JSON.parse(sessionStorage.getItem('isFalg')).type=='deposit_approval') {
      this.deposit_approval = true
    }
    if (JSON.parse(sessionStorage.getItem('isFalg')).type=='pay_deposit') {
      this.pay_deposit = true
    }
    
    if (JSON.parse(sessionStorage.getItem('isFalg')).type=='refund_deposit') {
      this.refund_deposit = true
    }

    this.refundid = JSON.parse(sessionStorage.getItem('isFalg')).referid

    if (JSON.parse(sessionStorage.getItem('isFalg')).type=='refund_order') {
      this.refund_order = true
    }
    JSON.parse(localStorage.getItem('selectlist')).DEPOSIT_PAY_STATUS_LIST.forEach(element => {
         this.stateobj[element.code] = element.value;
      });
    this.options = JSON.parse(localStorage.getItem('selectlist')).PAY_METHOD_LIST
    this.options.forEach(val => {
      this.filterOptions[val.code] = val.value
    });
    this.filterOptions = Object.assign({}, this.filterOptions)
    // DEPOSIT_APPROVAL_STATUS_LIST
    // statusobj
    JSON.parse(localStorage.getItem('selectlist')).DEPOSIT_APPROVAL_STATUS_LIST.forEach(val => {
      this.statusobj[val.code] = val.value
    });
    this.statusobj = Object.assign({}, this.statusobj)
    
    this.actionUrl = axios.defaults.baseURL+'attachment/depositUploadFileWeb'
  },
   computed: {
      ...mapGetters(['se','rs','languagetype','saleAdviceData','btnStatus','control']),
      
      total(){
        let num = 0
        if(this.saleAdviceData.depositlist!=undefined){
          for(var i= 0;  i<this.saleAdviceData.depositlist.length; i++){
            if(this.saleAdviceData.depositlist[i]['status'] == '02'){
              num += +this.saleAdviceData.depositlist[i].depositamount
            }
          }
        }
        return  num
      },
      refundtotal(){
        let num = 0
        if(this.saleAdviceData.refundlist!=undefined){
          for(var i= 0;  i<this.saleAdviceData.refundlist.length; i++){
            if(this.saleAdviceData.refundlist[i]['status'] == '02'){
              num += +this.saleAdviceData.refundlist[i].refundamount
            }
          }
        }
        return  num
      },
      readonly(){
        if(this.control.sales_advice === '02'){
          return true
        }else{
          return false
        }
      },
      maxRefund(){
        let num = 0
        for(var i=0;i<this.refundDepositData.length;i++){
          num += this.refundDepositData[i].refundamount
        }
        return this.total - num
      }
    },
  watch:{
    se(){
      JSON.parse(localStorage.getItem('selectlist')).DEPOSIT_PAY_STATUS_LIST.forEach(element => {
         this.stateobj[element.code] = element.value;
      });
      this.options = JSON.parse(localStorage.getItem('selectlist')).PAY_METHOD_LIST
      this.options.forEach(val => {
        this.filterOptions[val.code] = val.value
      });
      this.filterOptions = Object.assign({}, this.filterOptions)
      // DEPOSIT_APPROVAL_STATUS_LIST
      // statusobj
      JSON.parse(localStorage.getItem('selectlist')).DEPOSIT_APPROVAL_STATUS_LIST.forEach(val => {
        this.statusobj[val.code] = val.value
      });
      this.statusobj = Object.assign({}, this.statusobj)
      }
  },
  methods:{
    handleAvatarSuccess(file, fileList) {
      console.log(file.displayname,'file.displayname')
      let data = {"refertype":"4","attachmenttype":"04","displayname":file.displayname,"filepath":file.path}
      this.attachmentlist.push(data)
      this.$store.commit('SET_SHOW_LOADING',false)
    },
    handleChange(){
      console.log('change')
    },
    setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy')
      }else{
        return '-'
      }
    },
    handleRemove(file, fileList) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.attachmentlist.forEach((element,i) => {
        if (element.filepath == file.url) {
          this.attachmentlist.splice(i,1)
        }
      });
      },
    handleMinprogress(file) {
      this.$store.commit('SET_SHOW_LOADING',true)
      
    },
    handleCheckedCitiesChange(value){
      if (!value) {
      this.suggest = ''
      }
    },
    refundEarnestClose(){
      this.checkedCities = [];
      this.suggest = "";
      this.refundShow = false
    },
    earnestClose(){
      this.checkedCities = [];
      this.suggest = "";
      this.dialogFormVisible = false
    },
    // 驳回定金
    affirm(isDeposit){
      if (this.checkedCities.length == 0&& this.suggest == "") {
        this.$message.error(this.rs.err_msg_reject_reason)
        return
      }
      let data = {
        flag:'0',
        requestid:this.requestid,
        code:this.checkedCities.join(','),
        propertyid:this.saleAdviceData.propertyid,
        content:this.suggest
      }
      if (this.is_channel) {
        // 渠道
       requestHandleAgencyApprove(data).then(res=>{
          if (res.data.success) {
            this.$store.dispatch('WAITING_TOTAL')
            // this.$router.go(-1)
            this.refresh();
            this.dialogFormVisible = false
            this.refundShow = false
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })

      } else {
        // 本公司
        // 新增comments
        let commentsStr = '';
        if(isDeposit){
          this.depositRejectReason.forEach((ele,i)=>{
            this.checkedCities.forEach(e=>{
              if(e==ele.code){
                commentsStr+=ele.value + '</br>';
              }
            })
          })
          commentsStr = commentsStr + this.suggest;
        }else{
          this.refundRejectReason.forEach((ele,i)=>{
            this.checkedCities.forEach(e=>{
              if(e==ele.code){
                commentsStr+=ele.value + '</br>';
              }
            })
          })
          commentsStr = commentsStr + this.suggest;
        }
        data.comments = commentsStr;
        // console.log(approveData,'approveData0')
         approveSaleAdvice(data).then(res=>{
          if (res.data.success) {
            this.$store.dispatch('WAITING_TOTAL')
            // this.$router.go(-1)
            this.refresh();
            this.dialogFormVisible = false
            this.refundShow = false
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
      
    },
    depositPdfDownload(d){
        let data = {
          depositid:d.depositid,
          languagetype:localStorage.getItem('languagetype'),
          clientid:this.saleAdviceData.clientlist[0].clientid,
          propertyid:this.saleAdviceData.propertyid,
          
        }
        saleDownloadDepositPDF(data).then(res=>{
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
    toMoney(num){
        num = num.toFixed(2);
        num = parseFloat(num)
        num = num.toLocaleString();
        return num;//返回的是字符串23,245.12保留2位小数
      },
    validatorBlur(key,type){
        if (type == '1') {
          validator(this.popformDataSave,this.popformData,key)
        }else{
          validator(this.validatorSave,this.formData,key)
        }

      },
      
    deposithide(){
      this.tetx ='';
      this.value = '',
      this.formData.receivedVal = ''
      this.type = '1'
      this.attachmentlist = [];
      this.fileList3 = []
      this.depositShow = !this.depositShow
    },
    close(){
      this.depositShow = !this.depositShow
    },
    //弹窗保存
    save(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      let date = new Date().getTime()
      let data = {
          receiveddate:formatDate(new Date(date), 'yyyy-MM-dd'),
          depositamount:this.formData.receivedVal,
          paytype:this.value,
          comments:this.tetx,
          attachmentlist:JSON.stringify(this.attachmentlist)
          // salelogcomments:this.tetx
        }
      if (this.type=='1') {
        this.depositShow = !this.depositShow
        if (JSON.parse(sessionStorage.getItem('isFalg')).type !== 'all_properties') {
          let addList = {
            saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
            receiveddate:formatDate(new Date(date), 'yyyy-MM-dd'),
            depositamount:this.formData.receivedVal,
            paytype:this.value,
            comments:this.tetx,
            attachmentlist:JSON.stringify(this.attachmentlist)
          }

          // 新增
          insertDeposit(addList).then(res=>{
            
            if(res.data.success){
              this.saleAdviceData.depositlist.push(data)
              this.refresh()
              this.$message.success(this.rs.info_msg_insert_success)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }else{
          
          this.saleAdviceData.depositlist.push(data)
        }
      } else if(this.type == '2'&&JSON.parse(sessionStorage.getItem('isFalg')).type == 'all_properties') {
          
        for(var i = 0; i<this.saleAdviceData.depositlist.length ; i++){
          if (this.saleAdviceData.depositlist[i] == this.saleAdviceData.depositlist[this.index]) {
             this.saleAdviceData.depositlist.remove(this.saleAdviceData.depositlist[i])
             this.saleAdviceData.depositlist.push(data)
             this.depositShow = !this.depositShow
          }
        }
      }else if(this.type == '2'&&JSON.parse(sessionStorage.getItem('isFalg')).type !== 'all_properties'){
          
        let transmit ={
          depositid:this.aList.depositid,
          receiveddate:formatDate(new Date(date), 'yyyy-MM-dd'),
          depositamount:this.formData.receivedVal,
          paytype:this.value,
          comments:this.tetx,
          status:this.aList.status,
          attachmentlist:JSON.stringify(this.attachmentlist)
        }
        //修改
        updateDeposit(transmit).then(res=>{
          
          if(res.data.success){
            for(var i = 0; i<this.saleAdviceData.depositlist.length ; i++){
              if (this.saleAdviceData.depositlist[i] == this.saleAdviceData.depositlist[this.index]) {
                this.saleAdviceData.depositlist.remove(this.saleAdviceData.depositlist[i])
                this.saleAdviceData.depositlist.push(data)
                this.depositShow = !this.depositShow
                this.refresh()
                this.$message.success(this.rs.info_msg_operate_success)
              }
            }
          }else{
             this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
      // if(this.type=='3'){
        
      //   let transmit ={
      //     refundid:this.aList.refundid,
      //     receiveddate:formatDate(new Date(date), 'yyyy-MM-dd'),
      //     refundamount:this.formData.receivedVal,
      //     paytype:this.value,
      //     comments:this.tetx,
      //     status:this.aList.status,
      //     saleid:this.aList.saleid,
      //   }
      //   refundUpdate(transmit).then(res=>{
      //      if(res.data.success){
      //        this.refresh()
      //        this.$message.success(this.rs.info_msg_operate_success)
      //        this.depositShow = !this.depositShow
      //      }else{
      //        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      //     }
      //   })
        
      // }
    },
   
    //修改
    edit(d,i,type){
      let obj = {}
      this.fileList3 = []
      this.attachmentlist = []
      this.depositShow = !this.depositShow
      this.type = type
      this.aList = d
      this.index = i
      this.tetx = d.comments;
      this.value = d.paytype;
      if(type=='3'){
        this.formData.receivedVal = d.refundamount
      }else{
         this.formData.receivedVal = d.depositamount
          d.depositattachmentlist.forEach(val => {
          let data = {"refertype":"4","attachmenttype":"04","displayname":val.displayname,"filepath":val.filepath}
          this.attachmentlist.push(data)
            obj = {
              name:val.displayname,
              url:val.filepath
            }
            this.fileList3.push(obj)
        });
      }
     
      //  this.options
    },
    //删除
    del(d){
      if (JSON.parse(sessionStorage.getItem('isFalg')).type !== 'all_properties') {
        deleteDeposit({ids:d.depositid}).then(res=>{
          if(res.data.success){
             for(var i = 0; i<this.saleAdviceData.depositlist.length; i++){
              if (d == this.saleAdviceData.depositlist[i]) {
                this.saleAdviceData.depositlist.remove(this.saleAdviceData.depositlist[i])
                this.$message.success(this.rs.info_msg_delete_success)
              }
            }
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      } else {
        for(var i = 0; i<this.saleAdviceData.depositlist.length; i++){
          if (d == this.saleAdviceData.depositlist[i]) {
            this.saleAdviceData.depositlist.remove(this.saleAdviceData.depositlist[i])
          }
        }
      }
    },
    //申请
    apply(d){
      let date =new Date().getTime()
      if (JSON.parse(sessionStorage.getItem('isFalg')).type !== 'all_properties') {
        let applyData = {
          saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
          depositid:d.depositid,
          logdatetime:formatDate(new Date(date), 'yyyy-MM-dd'),
        }
        getSaleDeposit(applyData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            this.refresh()
          }else{
             this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    // download (data) {
    //   window.location.href=data.filepath;
    //   let url= data.filepath;
    //   let link = document.createElement('a')
    //   link.style.display = 'none'
    //   link.href = url
    //   link.setAttribute('download', data.displayname)
    //   document.body.appendChild(link)
    //   link.click()
    // },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    //确认
    confirm(d,type,isrefund){
      this.requestid = d.requestid;
      let approveData = {
        requestid:d.requestid,
        propertyid:this.saleAdviceData.propertyid,
        flag:type
      }
      if (this.is_channel) {
        //渠道
        if (type == '1') {
          //确认
          requestHandleAgencyApprove(approveData).then(res=>{
            if (res.data.success) {
              // this.$router.go(-1)
              this.refresh();
              this.$store.dispatch('CHANNEL_WAITING_TOTAL')
              this.$message.success(this.rs.info_msg_update_success)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        } else {
          //驳回
          //定金和退还定金怎么区别
          if(isrefund == "deposit"){
            this.dialogFormVisible = true;
          }else{
            this.refundShow = true;
          }
        }
      } else {
        //本公司
        if (type == '1') {
          // 确认
          // 新增comments
          approveData.comments = d.comments;
          approveSaleAdvice(approveData).then(res=>{
            if (res.data.success) {
              // this.$router.go(-1)
              this.refresh();
              this.$store.dispatch('WAITING_TOTAL')
              this.$message.success(this.rs.info_msg_update_success)
            } else {
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        } else {
          //驳回
          if(isrefund == "deposit"){
            this.dialogFormVisible = true;
          }else{
            this.refundShow = true;
          }
        }
      }
    },
    //退押金弹窗表格数据
    allRefund(){
      getRefund({saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid}).then(res=>{
        if(res.data.success){
          this.refundDepositData = res.data.data
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 退押金
    refundDeposit(){
      if (JSON.parse(sessionStorage.getItem('isFalg')).type !== 'all_properties') {
        this.popformData.commentsText = ''
        this.popformData.AmountValue = ''
        this.popformData.refundValue = this.options[0].code
        this.refundDepositShow = !this.refundDepositShow;
        this.isRefundUpdate = false;
        this.allRefund()
      }
    },
     //退修改
    editRefund(d,type){
    this.isRefundUpdate = true;
    this.refundDepositShow = !this.refundDepositShow;
    this.popformData.AmountValue = d.refundamount
    this.popformData.refundValue = d.paytype;
    this.popformData.commentsText = d.comments;
    this.popformData.refundid = d.refundid;
    this.aList = d
      //  let obj = {}
      // this.fileList3 = []
      // this.attachmentlist = []
      // this.depositShow = !this.depositShow
      // this.type = type
      // this.index = i
      // this.tetx = d.comments;
      // this.value = d.paytype;
      // if(type=='3'){
      //   this.formData.receivedVal = d.refundamount
      // }else{
      //    this.formData.receivedVal = d.depositamount
      //     d.depositattachmentlist.forEach(val => {
      //     let data = {"refertype":"4","attachmenttype":"04","displayname":val.displayname,"filepath":val.filepath}
      //     this.attachmentlist.push(data)
      //       obj = {
      //         name:val.displayname,
      //         url:val.filepath
      //       }
      //       this.fileList3.push(obj)
      //   });
      // }
    },
    // 删除退押金
    depositDelete(row){
      deleteRefund({ids:row.refundid}).then(res=>{
          if(res.data.success){
            this.allRefund()
            this.$message.success(this.rs.info_msg_delete_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
    },
    RefundDepositclose(){
      this.refundDepositShow = false
    },
    // 弹窗确定
    refundSave(){
       if(allvalidator(this.popformDataSave,this.popformData)){
        return
        this.DetermineTheAmountOf()
      }
      let date =new Date().getTime()
      if(this.isRefundUpdate){
      // 修改
        let transmit ={
          refundid:this.aList.refundid,
          receiveddate:formatDate(new Date(date), 'yyyy-MM-dd'),
          refundamount:this.popformData.AmountValue,
          paytype:this.popformData.refundValue,
          comments:this.popformData.commentsText,
          status:this.aList.status,
          saleid:this.aList.saleid,
        }
        refundUpdate(transmit).then(res=>{
           if(res.data.success){
             this.refresh()
             this.$message.success(this.rs.info_msg_operate_success)
             this.refundDepositShow = !this.refundDepositShow
           }else{
             this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
          let refundData = {
          comments:this.popformData.commentsText,
          refundamount:this.popformData.AmountValue,
          paytype:this.popformData.refundValue,
          saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
          refundeddate:formatDate(new Date(date), 'yyyy-MM-dd'),
        }
        insertRefund(refundData).then(res=>{
            if(res.data.success){
            this.refresh()
            this.$message.success(this.rs.info_msg_insert_success)
            this.refundDepositShow = false
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    
    },
    //判断金额
    DetermineTheAmountOf(){
      let num = 0
      for(var i=0;i<this.refundDepositData.length;i++){
        num +=this.refundDepositData[i].refundamount
        if (num>this.total) {
          this.$message.success(this.rs.err_msg_refund)
          return
        }
      }
    },
    //页面刷新
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

}
</script>


