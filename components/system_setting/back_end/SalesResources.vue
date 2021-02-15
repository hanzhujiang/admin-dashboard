<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
      <span >{{rs.sales_resources}}</span>
      </div>
      <div class="tools">
        <!-- <span v-if="!readonly" @click="dialogVisible" class="btn_text">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_resource}}</span>
        </span> -->
      </div>
    </div>
    <form autocomplete="on">
      <!-- <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <page-size :unit='rs.resources' @changeSize="handleSizeChange"></page-size>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_resources" v-model="getData.condition"  class="input-key" size='mini' @change="search" @keyup.enter='search'>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div> -->
      <div class="wrapper-content clearfix">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box">
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :data="resourceList"
                    :empty-text = rs.no_data
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    size="mini">
                    <template slot="empty">
                      {{rs.no_data}}
                    </template>
                    <el-table-column
                      prop="resourceid"
                      :label="rs.resource_id">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      :label="rs.name">
                    </el-table-column>
                    <el-table-column
                      :label="rs.action"
                      width="180">
                      <template slot-scope="scope">
                        <span class="btntext"  @click="changeData(scope.row)">{{!readonly?rs.edit:rs.detail}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- <div class="table_footer" v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.resources}}</div>
                  <div class="fr">
                      <el-pagination
                      :background="false"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      layout="prev, pager, next"
                      :page-size="getData.pagesize"
                      :current-page="getData.pagenum"
                      :total="total" class="fr">
                      </el-pagination>
                    </div>
                </div> -->
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.resource"
      :visible.sync="dialogShow"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.resource}}
            <span >[{{flag?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <form autocomplete="on">
        <div class="dialog-body">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="form-group">
                <div class="sub-title-first">{{rs.resource_id}}<span class="required">*</span></div>
                <div class="content">
                  <el-input v-model="formData.resourceid" :disabled="!flag" size="small" maxlength="30" clearable @blur="validatorBlur('resourceid')"></el-input>
                </div>
                <p class="curtail" v-show="validatorSave.resourceid.flg">{{rs[validatorSave.resourceid.msg]}}</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                  <div class="form-group">
                    <div class="sub-title">{{rs.name}}</div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="10" v-for="(d,index) in se.Language" :key ='index'>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="form-group-lang">
                    <div :class="index==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
                    <el-input v-model="labeData[index].content" size="small" maxlength="500" clearable :disabled="readonly"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </form>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" class="small" @click="dialogVisible">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="addData" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getResourceList,insertResource, getDataSaleResource, updateSaleResource ,getJSONDataSaleResource} from '@/api/resourceApi.js'
import { mapGetters } from "vuex";
import { validator,allvalidator } from '@/validator/validator.js'
export default {
  data(){
    return{
      obj:{},
      langList:[],
      labeData:[],
      formData:{
        resourceid:'',
        name:'',
        systemtype:'0'
      },
      validatorSave:{
        resourceid:{
          vaid:['noNull'],
          flg:false
        }
      },
      getData:{
        pagesize:200,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
        systemtype:'0'

      },
      resourceList:[],
      flag:true,
      dialogShow:false,
    }
  },
  created(){
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    if(this.langList.length == 0){
      this.labeData.push({type:'',content:''})
    }else{
      this.langList.forEach(element => {
        this.labeData.push({type:element.languageid,content:''})
      });
    }
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue;
    
    this.getDataList(this.getData)
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.backend_sales_resources ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getDataList(this.getData)
    },
    dialogShow(val){
      if(val){
        this.validatorSave={
          resourceid:{
            vaid:['noNull'],
            flg:false
          }
        }
      }
    }
  },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    // handleSizeChange(val) {
    //   this.getData.pagenum= 1;
    //   this.getData.pagesize = val;
    //   this.getDataList(this.getData)
    // },
    // handleCurrentChange(val) {
    //     this.getData.pagenum = val;
    //     this.getDataList(this.getData)
    // },
    // search(){
    //   this.getData.pagenum =1;
    //   this.getDataList(this.getData)
    // },
    dialogVisible(){
      this.flag = true;
      this.formData.resourceid ='',
      this.labeData.forEach(element=>{
        element.content =''
      })
      this.dialogShow =!this.dialogShow
    },
    // delData(index, row){
    //   var deldata = {
    //     resourceid:row.resourceid,
    //     systemtype:'0'
    //   }
    //   this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
    //   confirmButtonText: this.rs.confirm,
    //   cancelButtonText: this.rs.cancel,
    //   type: 'warning',
    //   center: true
    //   }).then(() => {
    //       deleteResource(deldata).then(res=>{
    //         if(res.data.success){
    //           this.$message({
    //             type: 'success',
    //             message: this.rs.info_msg_delete_success
    //           });
    //           this.getDataList(this.getData)
    //         }else{
    //           this.$message.error(this.ErrorMsgStr(this.data.data));
    //         }
    //       })
    //     }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: this.rs.cancel_delete
    //     });
    //   });
    // },
    changeData(data){
      this.formData.resourceid = data.resourceid;
        getDataSaleResource({resourceid:data.resourceid,systemtype:'0'}).then(res=>{
          if(res.data.data.length == 0){
           getResourceList({resourceid:data.resourceid,systemtype:'0'}).then(res=>{
              let arr1 = res.data.data;
            this.labeData.forEach(e=>{
              e.content = ''
              arr1.forEach(element=>{
                if(e.type == element.languagetype){
                  e.content =element.name;
                }
              })
            })
            })
          }else{
            let arr = res.data.data;
            this.labeData.forEach(ele=>{
              ele.content = ''
              arr.forEach(element=>{
                if(ele.type == element.languagetype){
                  ele.content =element.name;
                }
              })
            })
          }
        })
      this.flag = false
      this.dialogShow =!this.dialogShow;
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    // 增加
    addData(){
      this.isAddOrdel();
    },
    //判断是增加还是修改
    isAddOrdel(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      this.dialogShow =!this.dialogShow
      if (this.flag) {
        this.formData.name = JSON.stringify(this.labeData)
        insertResource(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_insert_success)
            this.getDataList(this.getData)
          }else{
            this.$message.error(this.ErrorMsgStr(res.data.data));
          }

        })
      } else {
        this.formData.name = JSON.stringify(this.labeData);
        updateSaleResource(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            // 更新salse,资源表
            this.getDataList(this.getData)
             getJSONDataSaleResource({'languagetype':this.languagetype,systemtype:'0'}).then(res=>{
              if (res.data.success) {
                this.$store.commit('SALES_RESOURCE_LIST',res.data.data[this.languagetype])
                localStorage.setItem('salesresourcelist',JSON.stringify(res.data.data[this.languagetype]))  //存放所有语言资源表  
              } else {
                this.$message.error({message:res.data.errorMsg});
              }
            });
          }else{
            this.$message.error(this.ErrorMsgStr(res.data.data));
          }
        })
      }
    },
    // 获取列表
    getDataList(data){
      getDataSaleResource(data).then(res=>{
        let objData = {};
        res.data.data.forEach(ele=>{
          objData[ele.resourceid] = ele.name
        })
        this.resourceList=[
                {resourceid:'reserved',name:objData.reserved?objData.reserved:this.rs.reserved},
                {resourceid:'contract_issued',name:objData.contract_issued?objData.contract_issued:this.rs.contract_issued},
                {resourceid:'conditional_exchanged',name:objData.conditional_exchanged?objData.conditional_exchanged:this.rs.conditional_exchanged},
                {resourceid:'unconditional_exchanged',name:objData.unconditional_exchanged?objData.unconditional_exchanged:this.rs.unconditional_exchanged},
                {resourceid:'pending_settle',name:objData.pending_settle?objData.pending_settle:this.rs.pending_settle},
                {resourceid:'settled',name:objData.settled?objData.settled:this.rs.settled},
                {resourceid:'sta_reservation_pending',name:objData.sta_reservation_pending?objData.sta_reservation_pending:this.rs.sta_reservation_pending},
                {resourceid:'sta_reservation_approved',name:objData.sta_reservation_approved?objData.sta_reservation_approved:this.rs.sta_reservation_approved},
                {resourceid:'sta_contract_issued',name:objData.sta_contract_issued?objData.sta_contract_issued:this.rs.sta_contract_issued},
                {resourceid:'sta_conditional_exchanged',name:objData.sta_conditional_exchanged?objData.sta_conditional_exchanged:this.rs.sta_conditional_exchanged},
                {resourceid:'sta_unconditional_exchanged',name:objData.sta_unconditional_exchanged?objData.sta_unconditional_exchanged:this.rs.sta_unconditional_exchanged},
                {resourceid:'sta_pending_settlement',name:objData.sta_pending_settlement?objData.sta_pending_settlement:this.rs.sta_pending_settlement},
                {resourceid:'sta_settled',name:objData.sta_settled?objData.sta_settled:this.rs.sta_settled},

                {resourceid:'btn_issue_contract',name:objData.btn_issue_contract?objData.btn_issue_contract:this.rs.btn_issue_contract},
                {resourceid:'btn_conditional_exchange',name:objData.btn_conditional_exchange?objData.btn_conditional_exchange:this.rs.btn_conditional_exchange},
                {resourceid:'btn_approve_reservation',name:objData.btn_approve_reservation?objData.btn_approve_reservation:this.rs.btn_approve_reservation},
                {resourceid:'btn_unconditional_exchange',name:objData.btn_unconditional_exchange?objData.btn_unconditional_exchange:this.rs.btn_unconditional_exchange},
                {resourceid:'btn_settled',name:objData.btn_settled?objData.btn_settled:this.rs.btn_settled},
                {resourceid:'btn_pending_settle',name:objData.btn_pending_settle?objData.btn_pending_settle:this.rs.btn_pending_settle},

              ]
        this.total = res.data.total;
        this.start = res.data.start;
        this.end = res.data.end
      })
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve)
  },
}
</script>
