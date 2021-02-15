<template>
  <div class="wrapper clearfix" v-loading.fullscreen="loading" :element-loading-text="rs.loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.all_clients}}</span>
      </div>
      <div class="tools">
        <span class="btn_text" @click="downloadTemplate" v-if="!readonly">
          <img class="icon" src="@/assets/imgs/page/properties_1.png" alt="">
          <span>{{rs.download_template}}</span>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="btn_text" @click="showImportDailog" v-if="!readonly">
          <img class="icon" src="@/assets/imgs/page/properties_2.png" alt="">
          <span>{{rs.import_template}}</span>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="btn_text" @click="showLogDailog" v-if="!readonly">
          <img class="icon" src="@/assets/imgs/common/copy.png" alt="">
          <span>{{rs.import_log}}</span>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="btn_text" @click="goRouter('/client_manage/allClients/clientDetail/save')" v-if="!readonly">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_client}}</span>
        </span>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-condition clearfix">
      <el-row >
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <page-size :unit='rs.clients' @changeSize="handleSizeChange"></page-size>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <div class="filter">
            <span class="filter-text">{{rs.sort_by}}:</span>
            <el-select
            clearable 
            @change="search"
            style="width:70%;"
            v-model="getData.order"
            size="mini"
            placeholder="">
              <el-option
              v-for="item in CatetoryOptions"
              :key="item.value"
              :label="item.value"
              :value="item.code">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="checkbox_box">
          <el-checkbox v-model="sign" class="filter-text" true-label="1"	false-label="0"	>{{rs.only_show_nobelong}}</el-checkbox>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="box">
          <div class="filter-search fr">
            <el-input :placeholder="rs.search_clients" clearable v-model="getData.condition" class="input-key" autocomplete="off" size='mini' @change="search" @keyup.enter='search'>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row style="padding:10px 0">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="filter">
            <span class="filter-text">{{rs.sales_stage}}:</span>
            <el-select
            clearable 
            @change="search"
            style="width:70%;"
            v-model="getData.salesstage"
            size="mini"
            placeholder="">
              <el-option
              v-for="item in SalesStageList"
              :key="item.value"
              :label="item.value"
              :value="item.code">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    </form>
    <div class="wrapper-content clearfix">
      <div class="box">
        <div class="box-body">
          <div class="table_box">
            <el-table
              :data="allClientList"
              tooltip-effect="light"
              :empty-text = rs.no_data
              style="width: 100%"
              size="mini">
              <el-table-column
                :label="rs.name"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  {{scope.row.firstname}}<span>&nbsp;</span>{{scope.row.lastname}}
                  <img  v-if="scope.row.isgoldclient == 1" src="../../assets/imgs/medal_gold.png"  style="height: 20px;vertical-align: bottom;"/>
                  <!-- isgoldclient -->
                </template>
              </el-table-column>
              <el-table-column
                prop="email"
                :show-overflow-tooltip="true"
                :label="rs.email">
              </el-table-column>
              <el-table-column
                prop="mobilenumber"
                :show-overflow-tooltip="true"
                :label="rs.mobile"
                width="150">
              </el-table-column>
                <!-- <el-table-column
                prop="firbrequired"
                :label="rs.firb"
                width="80">
                <template slot-scope="scope">
                  {{scope.row.firbrequired == 1?rs.require:''}}
                </template>
              </el-table-column> -->
              <el-table-column
                prop="latestcontacteddatetime"
                :label="rs.since_last_contacted"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span :class="!scope.row.latestcontacteddatetime || scope.row.latestcontacteddatetime>60 ?'red':''">{{setDateStr(scope.row)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                :label="rs.agent"
                width="140">
                <template slot-scope="scope">
                  <!-- <span class="btntext" v-if="!readonly" @click="getAgentName(scope.row)">{{rs.change}}</span> -->
                 
                  <span>{{scope.row.afirstname}} {{scope.row.alastname}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                :label="rs.partner"
                width="140">
                <template slot-scope="scope">
                  <!-- <span class="btntext" v-if="!readonly" @click="getAgentName(scope.row)">{{rs.change}}</span> -->
                 
                  <span>{{scope.row.brokerfirstname}} {{scope.row.brokerlastname}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="Sales Stage"
                width="180">
                <template slot-scope="scope">
                  <div class="stage_warp">
                    <el-select v-model="SalesStageObj[scope.row.clientid]" :disabled="readonly" maxlength="2" size="small" slot="prepend"
                    class="stage"
                      :style="{background:stageColor[SalesStageObj[scope.row.clientid]],color:'#FFF',}"
                      @change="changeSalesStage(SalesStageObj[scope.row.clientid],scope.row)"
                      placeholder="" >
                      <el-option
                      v-for="item in SalesStageList"
                      margin
                      :key="item.code"
                      :style="{background:item.extvalue,margin:'6px',color:'#FFF',borderRadius:'4px'}"
                      :label="item.value"
                      :value="item.code">
                      </el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="rs.action"
                width="150">
                <template slot-scope="scope">
                  <span class="btntext" @click="handleEdit(scope.row)">{{!readonly?rs.edit:rs.detail}}</span>
                  <el-dropdown :split-button="false" class="dropdown-li">
                    <el-button  size="medium" class="drowdown_btn" >
                      ...
                    </el-button>
                    <el-dropdown-menu slot="dropdown" >
                      <el-dropdown-item @click.stop="send(scope.row)">
                        <span class="btntext drowdown_item_btn" @click.stop="send(scope.row)" v-if="!readonly" >{{rs.assign}}</span>
                      </el-dropdown-item>
                      <el-dropdown-item @click.stop="getAgentName(scope.row)" >
                        <span class="btntext drowdown_item_btn"  @click="getAgentName(scope.row)"
                          v-if="!readonly" style="margin-right: 10px;">
                          {{rs.re_assign}}
                          </span>
                      </el-dropdown-item>
                      <el-dropdown-item  @click.stop="handleDelete(scope.row.clientid)" >
                        <span class="btntext drowdown_item_btn"  style="color:red;" @click.stop="handleDelete(scope.row.clientid)" v-if="!readonly" >{{rs.delete}}</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- <div class="btn_warp">
                    
                    <span class="btntext" @click="handleBtnShow(scope.row)">...</span>
                    <div class="btn_ow" >
                      
                    </div>
                  </div> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table_footer"  v-if="total">
            <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.clients}}</div>
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
    </div>
    <select-agent :sync="dialogShow" @select="setAgentName" @update:sync="dialogShow=false"></select-agent>
    <select-agent :sync="dialogShow2" @select="setImportAgent" @update:sync="dialogShow2=false"></select-agent>
    <el-dialog
    :close-on-click-modal='false'
      title=""
      :visible.sync="modifierShow"
      width='30%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.assign}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <div class="form-group">
          <div class="sub-title-first">{{rs.push_message}}</div>
          <div class="content">
            <textarea v-model="agentText" maxlength="2000" cols="30" rows="10" style="width: 100%; min-height: 100px;"></textarea>
          </div>
        </div>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button @click="modifier" class="small" style="color:#000;">
              <!-- <i class="fa fa-close" ></i> -->
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="saveStaff" :disabled="readonly">
              <!-- <i class="fa fa-save"></i> -->
              {{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog
    :close-on-click-modal='false'
      title=""
      :visible.sync="importDailog"
      width='50%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.import_template}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10" class="line-first">
          <el-col :span="12">
            <label style="padding:0 10px 10px;font-weight:500;">{{rs.duplicate_check}}:</label>
          </el-col>
          <el-col :span="12">
            <div style="padding: 0 10px 10px;">
              <el-checkbox :label="rs.client_name" v-model="importData.checkname" size="small" 
                true-label='1' false-label='0'></el-checkbox>
            </div>
            <div style="padding: 10px;">
              <el-checkbox :label="rs.email" v-model="importData.checkemail" size="small" 
                true-label='1' false-label='0'></el-checkbox>
            </div>
            <div style="padding: 10px;">
              <el-checkbox :label="rs.mobile_number" v-model="importData.checkmobile" size="small" 
                true-label='1' false-label='0'></el-checkbox>
            </div>
          </el-col>
        </el-row>
        <hr v-if="importResult.misscount!=0">
        <el-row :gutter="10" class="line" v-if="importResult.misscount!=0">
          <el-col :span="12">
            <div style="padding:16px 10px 10px;font-weight:500;">{{rs.miss_count}}:</div>
          </el-col>
          <el-col :span="6">
            <div style="padding:16px 10px 10px;">{{importResult.misscount}}</div>
          </el-col>
          <el-col :span="6">
            <div class="fr">
              <el-button @click="downloadMissData(importResult.clientimportid)" class="small" style="color:#000;">{{rs.download}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button @click="importDailog=false" class="small" style="color:#000;">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr" style="margin-top: 14px;">
              <label class="small bg_blue" style="padding:10px 20px;border:1px solid #DCDFE6;border-radius:4px;font-weight:500;">
                <span>{{rs.import}}</span>
                <input ref='fileInput' class="file" style="display:none" name="file" type="file" 
                    @change="importClient" />
              </label>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog
      title=""
      :close-on-click-modal='false'
      :visible.sync="importLogDailog"
      width='70%'>
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.import_log}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-table
          :data="importLogList"
          tooltip-effect="light"
          :empty-text = rs.no_data
          style="width: 100%; margin-top:5px;"
          size="mini">
          <el-table-column
            prop="importdatetime"
            :label="rs.import_date_time">
          </el-table-column>
          <el-table-column
            prop="importagentname"
            :label="rs.operate_agent">
          </el-table-column>
          <el-table-column
            prop="agentname"
            :label="rs.agent">
          </el-table-column>
          <el-table-column
            prop="misscount"
            :label="rs.miss_count">
          </el-table-column>
          <el-table-column
          :label="rs.action"
            width="200px">
            <template slot-scope="scope">
              <span class="btntext" @click="deleteImportLog(scope.row)">{{rs.delete}}</span>
              <span v-if="scope.row.misscount!=0" class="btntext" @click="downloadMissData(scope.row.clientimportid)">{{rs.download}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="24">
            <div class="fr">
              <el-button class="small" @click="clearAll" :disabled="readonly">{{rs.delete_all_logs}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import{ getClientList, deleteClient, updateClient, pushNewClient, changeNewAgent,salesStageUpdate,
        getImportLogList, deleteImportLog, deleteAllImportLog} from '@/api/clientApi.js'
import axios from 'axios'
import { Message } from 'element-ui'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      SalesStageList:[],
      isbnt:{},
      stage_obj:{},
      SalesStageObj:{},
      stageColor:{},
      CatetoryOptions:[],
      clientId:'',
      agentText:'',
      modifierShow:false,
      languageid:'',//语言类型
      dialogShow:false,
      dialogShow2:false,
      importDailog:false,
      importLogDailog:false,
      importLogList:[],
      loading:false,
      importData: {
        agentid:'',
        checkname: '1',
        checkemail: '1',
        checkmobile: '1',
      },
      importResult: {
        misscount:0,
        clientimportid:''
      },
      selectList:[],//所有的select字段
      total:0,
      end:'',
      start:'',
      agentTotal:0,
      sign:'0',
      getData:{
        languagetype: '',
        pagenum:1,
        pagesize:20,
        condition:'',//搜索关
        order:'',
        sign:'0',
        salesstage:''
      },
      allClientList:[],
      updateData:{},
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'select-agent': resolve => require(['@/common/SelectAgent.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve),
    },
  methods:{
    modifier(){
      this.modifierShow = false;
    },
    showImportDailog() {
      this.dialogShow2 = true;
    },
    showLogDailog() {
      this.importLogDailog = true;
      this.getClientImportList();
    },
    getClientImportList() {
      getImportLogList().then(res=>{
        if(res.data.success){
          this.importLogList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    setImportAgent(row) {
      this.importData.agentid = row.agentid;
      this.dialogShow2 = false;
      this.importResult = {
        misscount:0,
        clientimportid:''
      };
      this.importDailog = true;
    },
    importClient(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("uploadXls", file, file.name); //通过append向form对象添加数据
      param.append("agencyid", JSON.parse(localStorage.getItem('userInfo')).agencyid);
      param.append("operateagentid", JSON.parse(localStorage.getItem('userInfo')).agentid);
      param.append("agentid", this.importData.agentid);
      param.append("checkname", this.importData.checkname);
      param.append("checkemail", this.importData.checkemail);
      param.append("checkmobile", this.importData.checkmobile);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      this.loading = true;
      axios.post(this.uploadFileUrl, param, config).then(res => {
        this.importResult = res.data;
        if (this.importResult.misscount == 0) {
          this.importDailog = false;
        }
        this.loading = false;
        this.$refs.fileInput.value =''
      }).catch(response=>{
        this.loading = false;
        this.$refs.fileInput.value =''
        this.$message.error('system error');
      });
    },
    downloadMissData(id) {
      window.location = this.downloadMissUrl + "?clientimportid=" + id;
    },
    deleteImportLog(data) {
      let d = {
        clientimportid : data.clientimportid
      }
      deleteImportLog(d).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_delete_success)
          this.getClientImportList();
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    clearAll() {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteAllImportLog().then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_delete_success)
            this.getClientImportList();
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      })
    },
    handleCommand(command) {
      //   this.$message("click on item " + command);
      switch (command) {
        case "changePassword":
          this.goPage("/ResetPassword");
          break;
        case "logout":
          this.handleLogout();
          break;
      }
    },
    handleBtnShow(row){
     this.isbnt[row.clinentid] = true
     this.isbnt = Object.assign({},this.isbnt)
    },
    saveStaff(){
      let data={
        clientid:this.clientId,
        languagetype:localStorage.getItem('languagetype'),
        content:this.agentText
      }
      this.modifierShow = false;
      pushNewClient(data).then(res=>{
        if (res.data.success) {
          this.$message.success(this.rs.send_success);
          this.modifierShow = false;
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    send(row){
      this.modifierShow = true;
      this.clientId = row.clientid
      this.agentText = ''
    },
    search(){
      this.getData.pagenum = 1;
      this.getClient(this.getData);
    },
    // 分页  clien
    handleSizeChange(val){
      this.getData.pagenum = 1;
      this.getData.pagesize = val;
      this.getClient(this.getData)
    },
    handleCurrentChange(val){
        this.getData.pagenum = val;
        this.getClient(this.getData)
    },
    getClient(data){
      getClientList(data).then(res=>{
        if(res.data.success){
          console.log(res.data.data,'99')
          this.allClientList = res.data.data;
          this.allClientList.forEach(ele=>{
            this.SalesStageObj[ele.clientid] = ele.salesstage;
          })
          this.SalesStageObj = Object.assign({},this.SalesStageObj)
          this.total = res.data.total
          this.start = res.data.start;
          this.end = res.data.end
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    changeSalesStage(val,row){
      this.$confirm(this.rs.update_sales_stage_to + " " +this.stage_obj[val] + "?", this.rs.update_sales_stage, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        salesStageUpdate({clientid:row.clientid,salesstage:val,agentid:row.agentid,brokerid:row.brokerid}).then(res=>{
          if(res.data.success){
            this.getClient(this.getData)
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.SalesStageObj[row.clientid] = row.salesstage;
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
        }).catch(() => {
          this.SalesStageObj[row.clientid] = row.salesstage;
          this.$message.info('Cancel Update')
      });
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    goRouter(path){
      this.$router.push(path)
    },
    handleEdit(data){
      sessionStorage.removeItem('clientid')
      this.$router.push({path:'/client_manage/allClients/clientDetail/update',query:{id:data.clientid}})
    },
    setAgentName(row) {
      this.handleSelect(row)
    },
    handleDelete(id){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
          deleteClient({ids:id}).then(res=>{
            if(res.data.success){
              this.$message.success(this.rs.info_msg_delete_success)
              this.getClient(this.getData);
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
    },
    getAgentName(row){
      this.dialogShow = true;
      this.updateData = row;
    },
    handleSelect(row){
      this.updateData.afirstname = row.firstname;
      this.updateData.alastname = row.lastname;
      this.updateData.agentid = row.agentid;
      delete this.updateData.updatedtimestamp
      delete this.updateData.latestcontacteddatetime
      delete this.updateData.dateofbirth
      delete this.updateData.deletedflag
      updateClient(this.updateData).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success)
          changeNewAgent({agentid:row.agentid,clientid:this.updateData.clientid,agentclientid:this.updateData.agentclientid}).then(res=>{
          })
          this.getClient(this.getData);
          // changeNewAgent
          this.dialogShow =false;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    setDateStr(d){
      if(d.latestcontacteddatetime == null){
        return this.rs.never_contacted
      }else{
        if(d.latestcontacteddatetime == '0'){
          return this.rs.today
        }else{
          return d.latestcontacteddatetime + ' ' + this.rs.days
        }
      }
      // {{scope.row.latestcontacteddatetime == null?rs.never_contacted:scope.row.latestcontacteddatetime = '' + rs.days}}
    },
    // 下载模板
    downloadTemplate() {
      window.location = this.downloadUrl;
    },

  },
  created(){
    this.downloadUrl = axios.defaults.baseURL + "clientimport/downTemplate"; //模板下载接口地址
    this.uploadFileUrl = axios.defaults.baseURL + "clientimport/importTemplate"; //模板导入接口地址
    this.downloadMissUrl = axios.defaults.baseURL + "clientimport/downMissData";
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.getClient(this.getData);
    this.SalesStageList =JSON.parse(localStorage.getItem('selectlist')).SalesStage_LIST;
    JSON.parse(localStorage.getItem('selectlist')).SalesStage_LIST.forEach(ele=>{
      this.stage_obj[ele.code] = ele.value;
      this.stageColor[ele.code] = ele.extvalue;

    })
    this.CatetoryOptions = [{
      code:'0',
      value:this.rs.given_name
      },{
      code:'4',
      value:this.rs.surname
      },{
      code:'1',
      value:this.rs.firb
      },{
      code:'2',
      value:this.rs.last_contacted
      },{
      code:'3',
      value:this.rs.agent_name
    }]
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.all_clients ==='02'){
        return true
      }else{
        return false
      }
    }

  },
  watch:{
    rs(){
        this.CatetoryOptions = [{
        code:'0',
        value:this.rs.given_name
        },{
        code:'4',
        value:this.rs.surname
      },{
        code:'1',
        value:this.rs.firb
        },{
        code:'2',
        value:this.rs.last_contacted
        },{
        code:'3',
        value:this.rs.agent_name
      }]
    },
    languagetype(val){
      this.getData.languagetype = val;
      this.getClient(this.getData);
      
    },
    se(val){
      this.SalesStageList =val.SalesStage_LIST;
      val.SalesStage_LIST.forEach(ele=>{
        this.stage_obj[ele.code] = ele.value;
        this.stageColor[ele.code] = ele.extvalue;

      })
    },
    sign(val){
      this.getData.sign = val;
      this.getClient(this.getData);
    }
  },
}
</script>
<style lang="scss">
  .el-dropdown-menu__item{
    padding: 0px 20px 0px 0px !important;
  }


.checkbox_box .el-checkbox__label{
  font-size: 12px;
  color: #666;
}
.stage {
  border-radius: 4px;
  .el-input--small .el-input__inner{
   color: #FFF !important;
  }
 
  
}
.stage_warp {
.el-select .el-input .el-select__caret {
    color:#FFF !important;
  }
}
.checkbox_box {
  line-height:2;
  
}
 
</style>

