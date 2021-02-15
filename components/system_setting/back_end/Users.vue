<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.users}}</span>
        </div>
        <div class="tools">
            <span v-if="!readonly" @click="dialogVisibleShow" class="btn_text">
              <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
              <span>{{rs.add_new_user}}</span>
            </span>
          </div>
      </div>
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <div class="filter-count">
              <span class="filter-text">{{rs.showing}}</span>
              <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend" style="width: 90px;"  size="mini">
                <el-option v-for="(d, i) in pageList" :label="d.intvalue" :value="d.intvalue" :key="i">
                  <!-- <el-option v-for=" d in 3" :label="d" :value="d" > -->
                </el-option>
              </el-select>
              <span class="filter-unit">{{rs.users}}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_users" v-model="data.condition"
                class="input-key" clearable size='mini' @change="getData('0')">
                <el-button slot="append" @click="getData('0')" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box">
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :empty-text = rs.no_data
                    :data="tableData"
                    style="width: 100%"
                    tooltip-effect="light"
                    size="mini">
                    <el-table-column
                      prop="name"
                      :show-overflow-tooltip="true"
                      :label="rs.name">
                      <template slot-scope="scope">
                        <span>{{scope.row.firstname}}  {{scope.row.lastname}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="rolename"
                      :label="rs.role"
                      :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                      prop="email"
                      :label="rs.email"
                      :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                      prop="lastlogin"
                      :label="rs.lasted_login"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <div>
                          {{setformatDate(scope.row.lastlogin)}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="startdate"
                      :label="rs.start_date">
                       <template slot-scope="scope">
                        <div>
                          {{setformatDate(scope.row.startdate)}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="enddate"
                      :label="rs.end_date">
                      <template slot-scope="scope">
                        <div>
                          {{setformatDate(scope.row.enddate)}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="380">
                      <template slot-scope="scope">
                        <div class="fr">
                          <span class="btntext" @click="getSelect(scope.row)" v-if="!readonly">{{rs.edit}}</span>
                          <span class="btntext" @click="del(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                          <span class="btntext" @click="reset(scope.row)"  v-if="!readonly">{{rs.reset_password}}</span>
                          <span class="btntext" @click="handleSelectLicenseShow(scope.row)"  v-if="!readonly">{{rs.licenses}}</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="table_footer">
                  <div class="data-counter fl">{{rs.showing}} {{stasize}} to {{endsize}} of {{total}} {{rs.users}}</div>
                  <div class="fr">
                    <el-pagination
                    @current-change="getData('1')"
                    :current-page.sync="data.pagenum"
                    :page-size="data.pagesize"
                    layout=" prev, pager, next "
                    :total="total"
                    class="fr">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>  
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="dialogVisible"
      width="60%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.select_agent}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row>
          <div class="filter-search fr" style="width:50%" >
            <el-input :placeholder="rs.search_agents"  v-model="popSearchValue" :disabled="readonly"
              class="input-key" clearable size='mini' @change="popSearch">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-row>
        <el-row>
          <el-table
            :data="usersList"
            style="width: 100%"
            :empty-text = rs.no_data
            size="mini">
            <el-table-column
              prop="name"
              :label="rs.name">
              <template slot-scope="scope">
                <span>{{scope.row.firstname}}  {{scope.row.lastname}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="phonenumber"
              :label="rs.phone_number">
            </el-table-column>
            <el-table-column
              prop="email"
              :label="rs.email">
            </el-table-column>
            <el-table-column
              prop="department"
              :label="rs.department">
            </el-table-column>
            <el-table-column
              :label="rs.action"
              width="100">
              <template slot-scope="scope">
                <span class="btntext" @click="addList(scope.row)">{{rs.select}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row class="dailog-footer" v-if="popTotal">
        <el-pagination
        @current-change="popHandleCurrentChange"
        :current-page.sync="popPagesize"
        :page-size="popSelect"
        layout="prev, pager, next "
        :total="popTotal"
        class="fr">
        </el-pagination>
      </el-row>
    </el-dialog>

    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="datePicker"
      width="40%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.user}}</span>
        </div>
      </template>
      <form autocomplete="on">
        <div class="dialog-body">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="form-group">
                <div class="sub-title-first">{{rs.agent}}</div>
                <div class="content">
                  <el-input v-model="inputValue" clearable size="small" disabled></el-input>
                </div>
              </div>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="sub-title-first">{{rs.end_date}}</div>
                <div class="content">
                  <el-date-picker
                    :disabled="readonly"
                    v-model="dateValue"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder=""
                    size="small">
                  </el-date-picker>
                </div>
              </div>
            </el-col> -->
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="form-group">
                <div class="sub-title">{{rs.role}}</div>
                <div class="content">
                  <el-select v-model="roleid" size="small" placeholder="" :disabled="readonly">
                    <el-option
                    v-for="(item, i) in roleList"
                    :key="i"
                    :label="item.rolename"
                    :value="item.roleid">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </form>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" class="small" @click="close">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="upDataSave" v-if="!readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal='false' :visible.sync="selectLicenseShow" width='60%'>
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.select_license}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
                prop="usednumber"
                :label="rs.user_license_number"
                width="150px">
                <template slot-scope="scope">
                  <div>
                    {{scope.row.usednumber}} / {{scope.row.usernumber=='10000'?rs.unlimited:scope.row.usernumber}}
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
                <el-table-column
                prop="isauth"
                :label="rs.status">
                <template slot-scope="scope">
                  {{scope.row.isauth=='1'?rs.authorized:rs.unauthorized}}
                </template>
              </el-table-column>
              <el-table-column 
                :label="rs.action"
                width="150">
                <template slot-scope="scope">
                  <el-button    v-if="scope.row.isauth == '1'" class="btntext fl" size="mini" @click="handleRelieve(scope.row)">{{rs.relieve}}</el-button>
                  <el-button   v-if="scope.row.isauth == '0' && scope.row.usednumber !=scope.row.usernumber" class="btntext fl" size="mini" @click="handleLicenses(scope.row)">{{rs.grant_license}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {formatDate , newDate} from '@/assets/js/time.js'; //时间转换插件
import { insertUser, getUser, updateUser, deleteUser, resetPassword, getUserLicense, insertUserLicense, deleteUserLicense} from '@/api/userApi.js'
import { getUnregitAgent } from '@/api/agentApi.js'
import { getRoleList } from '@/api/roleApi.js'
import { mapGetters } from "vuex";
import Vue from 'vue'
import { DatePicker} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
Vue.component(DatePicker)
export default{
  data() {
    return {
      dialogVisible:false,
      datePicker:false,
      select: '',
      tableData: [],
      usersList:[],
      options:[],
      roleList:[],
      value:'',
      roleListValue:'',
      inputValue:'',
      dateValue:'',
      roleid:'',
      searchVal:"",
      userid:'',
      total:null,
      stasize:'',
      endsize:'',
      start :'',
      end:'',
      pagesize:1,
      popSearchValue:'',
      popSelect:10,
      popPagesize:1,
      popTotal:null,
      popStart :'',
      popEnd:'',
      data:{
        condition:'',
        pagesize:1,
        pagenum:1,
        languagetype:'',
      },
      selectLicenseShow:false,
      licenseUseList:[]
    }
  },
  created(){
    //获取下拉列表页码
    this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
    // 默认页码
    this.data.pagesize = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.popSelect = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.restoration()
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'select-agent': resolve => require(['@/common/SelectAgent.vue'], resolve),
    },
  methods:{
    // 解除授权
    handleRelieve(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteUserLicense({ids:row.userlicenseid}).then(res =>{
            if(res.data.success){
              this.$message.success(this.rs.info_msg_update_success);
              this.getUserLicenseList({userid:row.userid,systemtype:'00',isactive:'1'});
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      }); 
    },
    handleSelectLicenseShow(row){
      this.selectLicenseShow = true;
      this.getUserLicenseList({userid:row.userid,systemtype:'00',isactive:'1'});
    },
    // 授权
    handleLicenses(row){
      insertUserLicense({userid:row.userid,licenseid:row.licenseid,usertype:'0'}).then(res =>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success);
          this.getUserLicenseList({userid:row.userid,systemtype:'00',isactive:'1'});
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 获取授权列表
    getUserLicenseList(data){
      getUserLicense(data).then(res =>{
        if(res.data.success){
          this.licenseUseList = res.data.data;
        }
      })
    },
    restoration(){
      this.data.pagenum = 1
      this.data.languagetype = localStorage.getItem('languagetype')
      this.allList(this.data)
    },
    getData(type){
      if (type=="1") {
        this.data.languagetype = localStorage.getItem('languagetype')
        this.allList(this.data)
      }else{
          this.restoration()
      }
    },
     setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy')
      }else{
        return '-'
      }
    },
    close(){
      this.datePicker = false
    },
    popSearch(){
      let data = {
        pagesize:this.popSelect,
        pagenum:this.popPagesize,
        condition:this.popSearchValue
      }
      this.arrpopList(data)
    },
    // 弹窗下拉框分页
    popPageAlist(){
      this.popPagesize = 1
      let pageData = {
        pagesize:this.popSelect,
        pagenum:this.popPagesize,
        condition:this.popSearchValue
      }
      this.dialogVisibleShow(pageData)
    },
    // 弹窗页码事件
    popHandleCurrentChange(val){
        let pageData = {
        pagesize:this.popSelect,
        pagenum:val,
        condition:this.popSearchValue
      }
      this.dialogVisibleShow(pageData)
    },

    //重置
    reset(row){
      this.$confirm(this.rs.info_msg_reset_password, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        resetPassword({userid:row.userid}).then(res=>{
        if (res.data.success) {
          this.getData('0')
          this.$message({
          message: this.rs.info_msg_reset_password_succes,
          type: 'success'
            });
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      });

    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    //弹窗保存按钮
    addList(row){
      for(var i = 0;i<this.usersList.length;i++){
        if(row.email==this.usersList[i].email){
          this.usersList.remove(this.usersList[i])
        }
      }
      if (this.tableData.length>0) {
        for(var i=0;i<this.tableData.length;i++){
          if (this.tableData[i].email == row.email) {
            this.$message.success(this.rs.info_msg_linkman)
            return
          }
        }
        this.insertData(row)
        this.dialogVisible = false
        return
      }else{
        this.insertData(row)
        this.dialogVisible = false
      }
    },
    insertData(row){
      let data = {
        agentid:row.agentid
      }
      insertUser(data).then(res=>{
        if (res.data.success) {
          this.getData('0')
          this.$message.success(this.rs.info_msg_update_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 获取下拉列表
    getSelect(row){
      this.datePicker = !this.datePicker
      this.roleid = (+row.roleid )
      this.inputValue = row.firstname + ' '+ row.lastname
      this.userid = row.userid
      this.dateValue = row.enddate
      getRoleList({systemtype:'0', languagetype:localStorage.getItem('languagetype')}).then(res=>{
        if (res.data.success) {
          if (this.roleid==0) {
            this.roleid =  ""
          }
          this.roleList = res.data.data
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },

    //修改
    upDataSave(){
      this.datePicker = !this.datePicker
      let val = {
        userid:this.userid,
        roleid:this.roleid,
        enddate:this.dateValue,
        
      }
      updateUser(val).then(res=>{
        if (res.data.success) {
          this.getData('0')
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
      })
    },
    //删除
    del(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteUser({ids:row.userid}).then(res=>{
          if (res.data.success) {
            this.getData('0')
            this.$message({type: 'success',message: this.rs.info_msg_delete_success});
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })

        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      });
    },

    //所有数据
    allList(data){
      getUser(data).then(res=>{
        if (res.data.success) {
          this.stasize = res.data.start
          this.endsize = res.data.end
          this.total = res.data.total

          this.tableData = res.data.data
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 弹窗所有数据
    dialogVisibleShow(){
      this.dialogVisible = true
      let data = {
        pagesize:this.popSelect,
        pagenum:this.popPagesize,
        condition:this.popSearchValue
      }
      this.arrpopList(data)
    },
    arrpopList(data){
      getUnregitAgent(data).then(res=>{
        if (res.data.success) {
          this.popTotal = res.data.total
          this.popStart = res.data.start
          this.popEnd = res.data.end
          this.usersList = res.data.data
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.backend_user ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(){
      let functionData = {
        pagesize:this.select,
        pagenum:this.pagesize,
        condition:this.searchVal,
        languagetype:localStorage.getItem('languagetype')
      }
      this.allList(functionData)
    }
  }
}
</script>
