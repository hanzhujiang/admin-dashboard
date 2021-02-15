<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        
        <span>{{rs.approval_organizations}}</span>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <div class="side_tab">
            <div class="side_tab_box" >
              <div class="box-header" >
                <div class="title">
                  <img src="../../../assets/imgs/page/approvalOrganizations_1.png" alt="">
                  <span>{{rs.approval_routes}}</span>
                </div>
              </div>
              <div class="box-body" >
                      
                <!-- :row-class-name="tableRowClassName" -->
                <div class="table_box" >
                    <el-table
                      :data="RouteList"
                      :empty-text="rs.no_data"
                      @row-click="getRouteTree"
                      style="width: 100%"
                      :show-header = 'false'
                      type=index
                      size="mini">
                      <el-table-column
                        prop="value"
                        :show-header = 'false'>
                      </el-table-column>
                    </el-table>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <div class="box tab-content" v-show="tabContent">
            <div class="box-header">
              <div class="title">
                <img src="../../../assets/imgs/page/approvalOrganizations_2.png" alt="">
                <span>{{labelTitle}}</span>
              </div>
              <div class="tools">
              <span v-if="!readonly" @click="handleUpdate('AddRoot')" class="btn_text" v-show="newAdd" >
                  <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                  <span>{{rs.create_root}}</span>
                </span>
              </div>
            </div>
            <div class="box-body">
              <div class="table_box">
                <tree-grid
                :columns="columns" :tree-structure="true"
                :readonly="readonly"
                :data-source="dataSource" style="width:100%"
                @handleDelete="handleDelete"
                @handleUpdateOrganization="handleUpdateOrganization"
                @handleUpdate ="handleUpdate"
                @agent ="agent"
                size="mini"></tree-grid>
              </div>
              
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.organization"
      :visible.sync="dialogShow"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.organization}}</span>
        </div>
      </template>
      <form autocomplete="on">
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" >
            <div class="form-group">
              <div class="sub-title-first">{{rs.upper_level_organization}}</div>
              <div class="content">
                <el-input
                  clearable
                  v-model="OrganizationName"
                  size="small"
                  :disabled="true">
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="form-group">
              <div class="sub-title-first">{{rs.priority}}<span class="required">*</span></div>
              <div class="content">
                <el-select v-model="formData.prioritytype" size="small" placeholder=""  @change="validatorBlur('prioritytype')" :disabled="readonly">
                  <el-option
                    v-for="item in prioritytypeList"
                    :key="item.code"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
                <p class="curtail" v-show="validatorSave.prioritytype.flg">{{rs[validatorSave.prioritytype.msg]}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.name}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-for="(d,index) in langList" :key="d.type">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group-lang">
              <div :class="index==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
              <el-input
                v-model="labeData[index].content"
                clearable
                size="small">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" @click="dialogVisible" class="small">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="handleSave()">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      </form>
    </el-dialog>
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="showTransfer"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.select_approvers}}</span>
        </div>
      </template>
      <div style="text-align: center">
        <el-transfer
        style="text-align: left; display: inline-block"
        v-model="transferCheckList"
        filter-placeholder=" "
        filterable
        :titles="[rs.unselected_agents, rs.selected_agents]"
        :button-texts="[rs.revoke, rs.select]"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        @change="handleChange"
        :data="transferList">
        <span slot-scope="{ option }">{{ option.label }}</span>
        </el-transfer>
        <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button   style="color:#000;" @click="showTransfer = false" class="small">{{rs.close}}</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fr">
                <el-button   class="small bg_blue" @click="setAgentName()">{{rs.save}}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- <select-agent :sync="dialogShow3" @select="setAgentName" @update:sync="dialogShow3=false"></select-agent> -->
  </div>
</template>

<script>
import { getOrganizationTreeData, updateApprover, insertOrganization, deleteOrganization, 
      getRouteType, updateOrganization, getOrganization} from '@/api/approveApi.js'
import { getAgentList } from '@/api/agentApi.js'
import { Message } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
import { mapGetters } from "vuex";
import { validator, allvalidator }from '@/validator/validator.js'
export default {
  name: 'approveorganization',
  data () {
    return {
      showTransfer:false,
      dialogShow:false,//显示树状新增
      dialogShow3:false,//雇员列表弹出层
      tabContent:false,
      OrganizationName:'',//弹出层里面显示的Name
      RouteisEdit:false,//判断是新增还是修改
      newAdd:false,// 新增流程必须先选择Route
      AgentList:[],//雇员列表
      labelTitle:'',
      total:0,
      end:0,
      start:0,
      getData:{
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
      },
      TreeListData:{
        languagetype:'',
        routetype:0
      },
      RouteTreeData:{
        languagetype:'',
      },
      organizationid:'',
      dialogData:{},//
      dataSource: [],
      RouteList:[],//Route列表
      formData:{ //树状表格保存数据
        organizationname:'',
        routetype:'',
        upperleveorganizationid:'',
        prioritytype:'',
      },
      langList:[],
      labeData:[],//语言type,content 数组转换
      prioritytypeList: [],
      validatorSave:{
        prioritytype:{
          vaid:['noNull'],
          flg:false,
        },
      },
      transferList:[],
      transferCheckList: [],
      }
  },
  components: {
    'tree-grid': resolve => require(['../../../common/treeTable/vue/TreeGrid.vue'], resolve),
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'select-agent': resolve => require(['@/common/SelectAgent.vue'], resolve)
  },
  methods: {
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    agent:function(data){
      this.showTransfer = true
      this.organizationid = data.id;
      let arr = []
      data.approverlist.forEach(ele =>{
        arr.push(ele.agentid)
      })
      this.transferCheckList = arr;
    },
    handleChange(value, direction, movedKeys) {
    },
    setAgentName(row){
      updateApprover({agentidlist:this.transferCheckList.join(','),organizationid:this.organizationid}).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success)
          this.getTableTreeList(this.TreeListData)
          this.showTransfer = false;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    handleUpdateOrganization: function(data){
      updateOrganization({organizationid:data.id,isdefault:data.isdefault,prioritytype:data.priority,routetype:data.routetype}).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success);
          this.RouteTree(this.TreeListData);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    handleDelete: function (data) {
      deleteOrganization({ organizationid:data,languagetype:this.languagetype}).then(res=>{
        if(res.data.success){
          this.getTableTreeList(this.TreeListData);
          this.$message.success(this.rs.info_msg_delete_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
        });
        return str
      },
    handleUpdate: function (data) {
      this.labeData.forEach(element => {
          element.content ='';
        });
      if(data=='AddRoot'){
        this.OrganizationName = '';
        this.SaveType = 'addRoot';
        this.dialogVisible();
        this.formData.upperleveorganizationid = '0';
        this.formData.routetype = this.TreeListData.routetype
        this.formData.prioritytype = '';

      }else{
        this.SaveType = data.type;
        this.dialogVisible();
        this.dialogData = data.data;
        if(data.data.pid == 0){
          this.OrganizationName = ''
        }else{
          this.OrganizationName = data.OrganizationName;
        }
        this.formData.routetype = data.data.routetype;
        this.formData.prioritytype = data.data.priority;
        if(this.SaveType == 'child'){
          this.formData.upperleveorganizationid = data.data.id;
        }
        if(this.SaveType == 'siblings'){
          this.formData.upperleveorganizationid = data.data.pid;
        }
        if(this.SaveType == 'edit'){
          this.formData.upperleveorganizationid = data.data.pid;
          this.formData.organizationid=data.data.id;
          getOrganization({organizationid:data.data.id}).then(res=>{
            if(res.data.success){
              let arr = res.data.data;
              this.labeData.forEach((element,index) => {
                element.content = arr[index].organizationname;
              });
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }
      }
    },
    handleSave(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      this.formData.organizationname = JSON.stringify(this.labeData)
      if(this.SaveType == 'edit'){
        updateOrganization(this.formData).then(res=>{
          if(res.data.success){
            this.dialogVisible();
            this.getTableTreeList(this.TreeListData);
            this.$message.success(this.rs.info_msg_update_success);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        insertOrganization(this.formData).then(res=>{
        if(res.data.success){
          this.dialogVisible();
          this.getTableTreeList(this.TreeListData);
          this.$message.success(this.rs.info_msg_insert_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
      }
    },
    getRouteList(data){
      getRouteType(data).then(res=>{
      this.RouteList =res.data.data;
      })
    },
    //   树状列表增删改弹出层
    dialogVisible(){
      this.dialogShow =!this.dialogShow;
    },
    getTableTreeList(data){
      getOrganizationTreeData(data).then(res=>{
        if(res.data.success){
          this.dataSource = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      });
    },
    getRouteTree(row, column, event){
      
      this.labelTitle = row.value;
      this.tabContent= true;
      this.newAdd = true;
      this.dataSource=[];
      this.TreeListData.routetype = row.code;
      this.RouteTree(this.TreeListData);
    },
    RouteTree(data){
      this.getTableTreeList(data)
    },
    getAgent(){
      getAgentList().then(res => {
        if(res.data.success){
          res.data.data.forEach(ele => {
            // agentid
            this.transferList.push({
               key: ele.agentid,
              label:  ele.firstname+' '+ ele.lastname,
            })
          })
        }
      })
    }
  },
  created(){
    this.getAgent();
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.prioritytypeList =JSON.parse(localStorage.getItem('selectlist')).APPROVAL_PRIORITY_TYPE_LIST;
    this.TreeListData.languagetype = localStorage.getItem('languagetype');
    this.RouteTreeData.languagetype =localStorage.getItem('languagetype');
    this.getData.languagetype = localStorage.getItem('languagetype');
    // let rss = localStorage.getItem('resourcelist')
     if(this.langList.length == 0){
        this.labeData.push({type:'',content:''})
      }else{
        // 转换到存储list
        this.langList.forEach(element => {
          this.labeData.push({type:element.languageid,content:''})
        });
      }
    // 初始化Route列表
    this.getRouteList(this.RouteTreeData);
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    columns(){
      return [{text:this.rs.organization,dataIndex: 'name'},
        {text: this.rs.approver,dataIndex: 'approver'},
        {text: this.rs.priority,dataIndex: 'priorityname'}]
    },
    readonly(){
      if(this.control.backend_approve_organization ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    se(val){
      this.langList= val.Language;
      this.prioritytypeList =val.APPROVAL_PRIORITY_TYPE_LIST;
    },
    languagetype(val){
      this.RouteTreeData.languagetype = val;
      this.TreeListData.languagetype= val;
      this.getData.languagetype;
      this.getRouteList(this.RouteTreeData);
      if(this.TreeListData.routetype !=0 ){
        this.RouteTree(this.TreeListData)
      }
    },
    transferCheckList(val){
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.approve .el-tabs__item {
  background: #FFF;
  width:100%;
  /* border-bottom: 1px solid #CCC; */
}
.approve .el-tabs__header{
  width: 100%;
}
.el-tabs--left .el-tabs__item.is-left{
  text-align: left
}
.approve .el-tabs__item.is-active{
  /* background: #CCC; */
}
.approve .el-tabs__active-bar.is-left{
  left: 0;
  height: 80px;
  width: 5px;
  z-index: 99999;
}
.side_tab {
  padding-top:0;
}
.side_tab_box {
  margin-top: 0;
}
.tab-content{
  margin-top: 0;
}
.languageList{
  padding: 10px 35px
}
.navList{
  border-radius: 2px;
  /* padding: 0 10px; */
  height: 40px;
  line-height: 40px;
  background: #f4f4f4;
  margin-bottom: 2px;
  border-left: 2px solid #e6e7e8;
  color: #444;
}
.navHarder{
  line-height: 60px;
  border-bottom: 1px solid #EEE;
}
.navHarder>img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
}
.box_solid {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  /* border-top: 3px solid #d2d6de; */
  margin-bottom: 20px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  /* padding-bottom: 20px; */
}
.btn{
  width: 100%;
  margin: 10px 0;
  background-color: #3c8dbc;
  border-color: #367fa9;
  color: #FFF;
  margin-bottom: 30px;
}

.table-harder{
  height: 60px;
  border-bottom: 1px solid #CCC;
  line-height: 60px;
  background: #FFF;
}
.el-transfer__buttons {
  display : inline-grid;
}
.el-button+.el-button {
  margin-left: 0;
}
</style>
