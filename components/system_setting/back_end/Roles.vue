<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <ul class="clearfix list_view_ul">
        <li :class="[active=='1'?'fl list_view':'fl active_list_views']" @click="goRouter('/system_setting/back_end/roles','1')">{{rs.function_view}}</li>
        <li :class="[active=='2'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/system_setting/back_end/roles2','2')">{{rs.user_view}}</li>
      </ul>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="side_tab">
            <div class="side_tab_box">
              <div class="box-header" >
                <div class="title" >
                  <span >{{rs.roles}}</span>
                </div>
                <div class="tools">
                  <span v-if="!readonly" @click="handleSave" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_new_role}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body" >
                <div class="table_box" >
                    <el-table
                      :data="roleList"
                      :empty-text="rs.no_data"
                      @row-click="getFunctionList"
                      style="width: 100%"
                      :show-header = 'false'
                      type=index
                      :row-class-name="tableRowClassName"
                      size="mini">
                      <el-table-column
                        prop="rolename"
                        :show-header = 'false'>
                      </el-table-column>
                      <el-table-column
                        width="160">
                        <template slot-scope="scope">
                          <div class="fr">
                            <span class="btntext" @click.stop="handleUpdate(scope.row)" v-if="!readonly">{{rs.edit}}</span>
                            <span class="btntext" @click.stop="handleDelete(scope.row.roleid)" v-if="!readonly">{{rs.delete}}</span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16"  v-show="rightShow">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <span>{{rs.functions}}
                  <span style="color:#409EFF; font-size: 12px;">[{{rolename}}]</span>
                </span>
              </div>
              <div class="tools">
                <el-row>
                  <el-col>
                    <div>
                      <span>{{rs.batch_setting}}</span>
                        <el-switch
                        :disabled="readonly"
                        boolean
                        v-model="checkedShow"
                        active-color="#13ce66"
                        inactive-color="#CCC"
                        >
                      </el-switch>
                      <el-select v-model="allCheckedValue" placeholder=" " :disabled="!checkedShow"
                        clearable size="mini"  @change="volumeSet">
                        <el-option
                        v-for="item in operationTypeList"
                        :key="item.code"
                        :label="item.value"
                        :value="item.code">
                        </el-option>
                      </el-select>
                      <el-button   class="small bg_blue" v-if="!readonly" size="mini" @click="functionSave">{{rs.save}}</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="box-body">
              <div class="table_box">
                <el-table
                  @selection-change="handleSelectionChange"
                  type=index
                  :data="functionList"
                  :empty-text = rs.no_data
                  style="width: 100%"
                  :show-overflow-tooltip="true"
                  size="mini">
                  <el-table-column
                    fixed
                    prop="functionname"
                    :label="rs.function_name">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    :label="rs.operation_type">
                    <template slot-scope="scope">
                    <el-select v-model="fuctionlabelData[scope.row.functionid]" placeholder="" :disabled="readonly" clearable size="small">
                        <el-option
                        v-for="item in operationTypeList"
                        :key="item.code"
                        :label="item.value"
                        :value="item.code"
                        :disabled="item.code > availableData[scope.row.functionid] && roleid != '1'?true:false">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="checkedShow"
                    type="selection"
                    width="55">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.roles"
      :visible.sync="dialogShow"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.roles}}
            <span>[{{!isUptade?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-row :gutter="10" style="font-weight: bold; ">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="form-group">
                  <div class="sub-title-first">{{rs.name}}</div>
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
        <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button   style="color:#000;" class="small" @click="dialogVisible">{{rs.close}}</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fr">
                <el-button   class="small bg_blue" @click="saveName" :disabled="readonly">{{rs.save}}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, updateRole, insertRole, deleteRole, getRoleFunctionList, updataRoleFunction }from '@/api/roleApi.js'
import { mapGetters } from "vuex";
import { Message } from 'element-ui'
export default{
  data() {
    return {
      active:'1',
      readonly:false,
      userInfo:{},
      rolename:'',
      checkedShow:false,
      rightShow:false,
      dialogShow:false,
      allCheckedValue:'',
      checkedList:[],
      labeData:[],
      roleList:[],
      isUptade:false,
      isActive:'',
      roleid:'',
      functionList:[],
      functionShow:false,//功能页面显示隐藏
      functionRoleid:'',//功能页面的Roleid
      operationTypeList:[],
      getData:{
        languagetype:'',
        systemtype:'0'
      },
      SaveData:{
        roleid:'',
        valuelist:''
      },
      fuctionlabelData:{},
      availableData:{},
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
  methods:{
    dialogVisible(){
      this.dialogShow =!this.dialogShow;
    },
    handleSelectionChange(val) {
      this.checkedList = val;
    },
    volumeSet(){
      this.checkedList.forEach(element => {
        if (this.availableData[element.functionid] >= this.allCheckedValue) {
          this.fuctionlabelData[element.functionid]=this.allCheckedValue;
        }
      });
    },
    handleSave(){
      this.isUptade = false;
      this.dialogVisible();
      this.labeData.forEach(element => {
        element.content = ''
      });
    },
    handleUpdate(row){
      this.isUptade = true;
      this.roleid = row.roleid
      this.dialogVisible();
      getRoleList({roleid:this.roleid}).then(res=>{
        if(res.data.success){
          this.labeData.forEach((element) => {
            element.content ='';
            res.data.data.forEach(ele => {
              if(element.type == ele.languagetype){
                element.content = ele.rolename
              }
            });
          });
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    saveName(){
        if(this.isUptade){
        updateRole({roleid:this.roleid,rolename:JSON.stringify(this.labeData)}).then(res=>{
          if(res.data.success){
            this.getRole(this.getData);
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        insertRole({systemtype:'0',rolename:JSON.stringify(this.labeData)}).then(res=>{
          if(res.data.success){
            this.getRole(this.getData)
            this.$message.success(this.rs.info_msg_insert_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
      this.dialogVisible();
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    getFunctionList(row, event, column){
      if(this.userInfo.roleid == row.roleid && row.roleid != '1'){
        this.readonly = true;
      }else{
        if(this.control.backend_role ==='02'){
          this.readonly = true;
        }else{
          this.readonly = false;
        }
      }
      this.rolename = row.rolename
      this.rightShow = true;
      this.isActive = row;
      this.roleid = row.roleid;
      this.getFunction();
    },
    getFunction(){
      getRoleFunctionList({roleid:this.roleid,systemtype:'0',languagetype:this.languagetype}).then(res=>{
        if(res.data.success){
          this.functionRoleid = this.roleid;
          this.functionList = res.data.data;
          this.functionShow = true;
          res.data.data.forEach(element => {
            var key = element.functionid;
            this.fuctionlabelData[key] = element.operationtype;
            this.availableData[key] = element.availabletype;
          });
          this.fuctionlabelData = Object.assign({},this.fuctionlabelData)
        }
      })
    },
    functionSave(){
      let saveArr = [];
      for(var k in this.fuctionlabelData) {
          saveArr.push({functionid:k,operationtype:this.fuctionlabelData[k]})
        }
      this.SaveData.roleid = this.functionRoleid;
      this.SaveData.systemtype = '0';
      this.SaveData.valuelist = JSON.stringify(saveArr);
      updataRoleFunction(this.SaveData).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success)
          this.checkedShow = false;
          this.getFunction();
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getRole(data){
      getRoleList(data).then(res=>{
        if(res.data.success){
        this.roleList = res.data.data;
        }else{
        }
      })
    },
    handleDelete(id){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteRole({ids:id}).then(res=>{
        if(res.data.success){
          this.getRole(this.getData)
          this.$message.success(this.rs.info_msg_delete_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
        }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
    },
    goRouter(path,index){
      
      sessionStorage.setItem('ROLESINDEX',index)
      this.active = index 
      
      this.$router.push({path})
    },
    tableRowClassName({row, rowIndex}){
      if(row == this.isActive){
        return 'bg_light_grey'
      }
    }
  },
  created(){
    if (sessionStorage.getItem('ROLESINDEX')) {
        this.active = sessionStorage.getItem('ROLESINDEX')
      }
      if(this.control.backend_role ==='02'){
        this.readonly = true
      }else{
        this.readonly = false
      }
    this.userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.operationTypeList =JSON.parse(localStorage.getItem('selectlist')).OPERATION_PERMIT_TYPE_LIST;
    this.getData.languagetype = localStorage.getItem('languagetype');
      if(this.langList.length == 0){
      this.labeData.push({type:'',content:''})
    }else{
      this.langList.forEach(element => {
        this.labeData.push({type:element.languageid,content:'',})
      });
    }
    this.getRole(this.getData)
  },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    // readonlyS(){
    //   if(this.control.backend_role ==='02'){
    //     return true
    //   }else{
    //     return false
    //   }
    // }
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getRole(this.getData);
      this.getFunction();
    },
    se(val){
      this.operationTypeList =val.OPERATION_PERMIT_TYPE_LIST;
    },
    checkedShow(val){
      if(!val){
        this.allCheckedValue = '';
      }
    }
  },
}
</script>
<style>
.el-checkbox{
  margin: 0;

}
</style>
