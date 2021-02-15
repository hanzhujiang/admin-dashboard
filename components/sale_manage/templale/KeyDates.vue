<template>
  <div class="box" style="margin-bottom: 15px;">
    <div class="box-header">
      <div class="box-title">
        <span><i class="fa fa-files-o" style="padding: 0px 10px 0px 0px;"></i>{{rs.key_dates}}</span>
      </div>
    </div>
    <div class="box-body clearfix"  >
      <el-timeline >
        <el-timeline-item>
          <div class="dates_box" @click="handleEdit('01')">
            <p class="title">{{actioncodeObj['01']}} <i class="el-icon-edit fr"></i></p>
            <p class="date1">{{setDate1('01')}}</p>
            <p class="date2">{{setDate2('01')}}</p>
          </div>
        </el-timeline-item>
         <el-timeline-item>
          <div class="dates_box" @click="handleEdit('10')">
            <p class="title">{{actioncodeObj['10']}} <i class="el-icon-edit fr"></i></p>
            <p class="date1">{{setDate1('10')}}</p>
            <p class="date2">{{setDate2('10')}}</p>
          </div>
        </el-timeline-item>
        <el-timeline-item>
          <div class="dates_box" @click="handleEdit('20')">
            <p class="title">{{actioncodeObj['20']}} <i class="el-icon-edit fr"></i></p>
            <p class="date1">{{setDate1('20')}}</p>
            <p class="date2">{{setDate2('20')}}</p>
          </div>
        </el-timeline-item>
       <el-timeline-item>
          <div class="dates_box" @click="handleEdit('30')">
            <p class="title">{{actioncodeObj['30']}} <i class="el-icon-edit fr"></i></p>
            <p class="date1">{{setDate1('30')}}</p>
            <p class="date2">{{setDate2('30')}}</p>
          </div>
        </el-timeline-item>
        <el-timeline-item>
          <div class="dates_box" @click="handleEdit('40')">
            <p class="title">{{actioncodeObj['40']}} <i class="el-icon-edit fr"></i></p>
            <p class="date1">{{setDate1('40')}}</p>
            <p class="date2">{{setDate2('40')}}</p>
          </div>
        </el-timeline-item>
        <el-timeline-item>
          <div class="dates_box" @click="handleEdit('50')">
            <p class="title">{{actioncodeObj['50']}} <i class="el-icon-edit fr"></i></p>
            <p class="date1">{{setDate1('50')}}</p>
            <p class="date2">{{setDate2('50')}}</p>
          </div>
        </el-timeline-item>
        <!-- <el-timeline-item>
          <div class="dates_box" @click="handleEdit('60')">
            <p class="title">{{actioncodeObj['60']}} <i class="el-icon-edit"></i></p>
            <p class="date1">{{setDate1('60')}}</p>
            <p class="date2">{{setDate2('60')}}</p>
          </div>
        </el-timeline-item> -->
      </el-timeline>
      <!-- <div v-for="(d,i) in saleAdviceData.saleloglist" :key="i"  
        style="margin:5px;border-bottom:1px solid #dcdcdc;width:100%" class="clearfix">
        <div class="fl" style="width:100%">
          <p class="text"> <span class="fl">{{d.firstname}}&nbsp;{{d.lastname}}</span><span class="fr min_fo" style="padding-right:10px">{{setformatDate(d.logdatetime)}}</span></p>
          <p class="text">{{setStatus(d)}}</p>
          <p  class="text" v-html="d.comments">
          </p>
        </div>
      </div> -->
    </div>
    <el-dialog :visible.sync="editShow" :close-on-click-modal='false' width="40%" >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{actioncodeObj[statusType]}}&nbsp;{{rs.dates}}</span>
        </div>
      </template>
       <form autocomplete="on">
        <div class="dialog-body">
          <el-row :gutter="20" >
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="sub-title">{{rs.actual_date}}</div>
                <div class="content">
                  <el-date-picker
                    :disabled="!formData.madedatetime"
                    v-model="formData.actualdate"
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
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="sub-title">{{rs.estimated_date}}</div>
                <div class="content">
                 <el-date-picker
                    v-model="formData.estimateddate"
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
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="sub-title">{{rs.date_updated_in_system}}</div>
                <div class="content">
                 {{setformatDate(formData.madedatetime)}}
                </div>
              </div>
            </el-col>

          </el-row>
        </div>
        <p slot="footer" class="dialog-footer" style="padding-top:15px">
          <el-button @click="editShow = false">{{rs.close}}</el-button>
          <el-button type="primary" class="fr" @click="handleSubmit">{{rs.save}}</el-button>
        </p>
      </form>
    </el-dialog>
  </div>
</template>
<script>
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { mapGetters } from "vuex";
import { getSaleStatusDateList,getSaleStatusDetail,updateSaleStatusDetail, insertSaleStatusDetail} from '@/api/saleAdviceApi.js'
// 对日期插件英文化
import Vue from 'vue'
import { DatePicker} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
Vue.component(DatePicker)
export default {
  data(){
    return{
      statusType:'01',
      actioncodeObj:{},
      editShow:false,
      isUpdate:false,
      formData:{
        actualdate:null,
        salestatus:'',
        estimateddate:''
      }
    }
  },
  props:['saleDateObj'],
  computed: {
    ...mapGetters(['se','rs','languagetype','saleAdviceData','salesrs'])
  },
  created(){
    JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(val => {
      this.actioncodeObj[val.code] = val.value
    });
    this.actioncodeObj = Object.assign({}, this.actioncodeObj);
  },
  methods:{
    handleEdit(type){
      this.statusType = type;
      this.editShow = true;
      if(this.saleDateObj[type]&&this.saleDateObj[type].salestagedetailid){
      this.isUpdate = true;
        getSaleStatusDetail({
          salestagedetailid:this.saleDateObj[type].salestagedetailid
        }).then(res=>{
          if(res.data.success){
            this.formData  =  JSON.parse(JSON.stringify(res.data.salestatusdetail))
          }
        })
      }else{
        this.isUpdate = false;
        this.formData = {
          actualdate:null,
          salestatus:type,
          estimateddate:'',
          saleid:this.saleAdviceData.saleid
        }
      }
      
    },
    handleSubmit(){
      delete this.formData.madedatetime
      delete this.formData.updatedtimestamp
      if(this.isUpdate){
        updateSaleStatusDetail(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            this.editShow = false;
            this.setKeyDates();
          }
        })
      }else{
        insertSaleStatusDetail(this.formData).then(res=>{
          this.$message.success(this.rs.info_msg_update_success)
          if(res.data.success){
            this.editShow = false;
            this.setKeyDates();
          }
        })
      }
      
    },
    setKeyDates(){
      this.$emit('setKeyDates')
    },
    setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy')
      }else{
        return '-'
      }
    },
    setDate1(type){
      if(this.saleDateObj[type]){
        if(this.saleDateObj[type].estimateddate){
          return this.rs.estimated + ': ' + this.setformatDate(this.saleDateObj[type].estimateddate)
        }else{
          return null
        }
      }else{
        return null
      }
    },
    setDate2(type){
      if(this.saleDateObj[type]){
        if(this.saleDateObj[type].actualdate){
          return  this.setformatDate(this.saleDateObj[type].actualdate)
        }else{
          if(this.saleDateObj[type].madedatetime){
            return this.setformatDate(this.saleDateObj[type].madedatetime)
          }else{
            return null
          }
        }
      }else{
        return null
      }
    },
    // setStatus(d){
    //   if(d.actioncode == '03'){
    //     return this.salesrs&&this.salesrs.btn_approve_reservation?this.salesrs.btn_approve_reservation:this.rs.btn_approve_reservation
    //   }else if(d.actioncode == '20'){
    //     return this.salesrs&&this.salesrs.btn_issue_contract?this.salesrs.btn_issue_contract:this.rs.btn_issue_contract
    //   }else if(d.actioncode == '30'){
    //     return this.salesrs&&this.salesrs.btn_conditional_exchange?this.salesrs.btn_conditional_exchange:this.rs.btn_conditional_exchange
    //   }else if(d.actioncode == '40'){
    //     return this.salesrs&&this.salesrs.btn_unconditional_exchange?this.salesrs.btn_unconditional_exchange:this.rs.btn_unconditional_exchange
    //   }else if(d.actioncode == '50'){
    //     return this.salesrs&&this.salesrs.btn_pending_settle?this.salesrs.btn_pending_settle:this.rs.btn_pending_settle
    //   }else if(d.actioncode == '60'){
    //     return this.salesrs&&this.salesrs.btn_settled?this.salesrs.btn_settled:this.rs.btn_settled
    //   }else{
    //     return this.actioncodeObj[d.actioncode]
    //   }
    // },
  },
  watch:{
    se(){
      JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(val => {
        this.actioncodeObj[val.code] = val.value
      });
      this.actioncodeObj = Object.assign({}, this.actioncodeObj)
    }
  }
}
</script>

<style scoped lang="scss">
.img-circle{
  border-radius:50%;
  vertical-align: sub;
}
p.text{
  padding: 10px;
  width:100%;
}
.min_fo{
  font-size: 10px;
  padding: 0px 30px;
  
}
.box-body.clearfix{
  max-height: 700px;
  overflow-x: hidden;
  overflow-y: auto;
}
.box-body.clearfix::-webkit-scrollbar {/*滚动条整体样式*/
  width: 2px;   /*高宽分别对应横竖滚动条的尺寸*/
  height: 2px;
}
.box-body.clearfix::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.2);
}
.box-body.clearfix::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #FFF;
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.dates_box {
  cursor: pointer;
  .title{
    font-size:16px;
    color: #666;
    i{
      font-size:18px;
    }
  }
  .date1{
    font-size:14px;color:#666;padding:5px 0
  }
  .date2{
    font-size:14px;color:#666
  }
}
// .dates_box :hover +.title .date1 .date2{
//   color: blue !important;
 
// }
.dates_box:hover > p:nth-child(n) {
    color: #4A90E2;
  }
</style>
