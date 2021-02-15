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
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
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
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :empty-text = rs.no_data
                    @row-click="getUserList"
                    :data="roleList"
                    style="width: 100%"
                    :show-header = 'false'
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
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16"  v-show="rightShow">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <span>{{rs.users}}</span>
              </div>
            </div>
            <div class="box-body">
              <div class="table_box">
                <el-row :gutter="20">
                  <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="(d,index) in userRoleList" :key="index">
                    <div class="card_box_agents">
                      <div class="card_box_img">
                        <img :src="d.photo" v-if="d.photo">
                        <img src="../../../assets/imgs/no_photo.jpg" alt="" v-else>
                      </div>
                      <div class="card_box_name clearfix">
                        <p class="name_line fl">{{d.firstname}} {{d.lastname}}</p>
                        <p class="tools_line fr">
                         <span style="padding: 0 5px;" @click="updateRoleUser(d)"  v-if="!readonly">
                            <img class="icon" src="@/assets/imgs/common/common_12.png" alt="" ></span>
                        </p>
                      </div>
                    </div>
                  </el-col>
                  <el-col  v-show="userRoleList.length==0?true:false" style="text-align: center">
                    <span>{{rs.no_data}}</span>
                  </el-col>
                </el-row>
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

    <!--  -->
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="dialogShow2"
      width='40%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.change_role}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10" style="font-weight: bold; padding-top:10px;">
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" style="padding-top: 10px;">
            <span style="padding-left: 15px;">{{rs.role}}</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

             <el-select v-model="saveUserRoleData.roleid" size="small" clearable  v-if="!readonly"
              placeholder="" label-width="500px">
              <el-option
              v-for="item in roleList"
              :key="item.roleid"
              :label="item.rolename"
              :value="item.roleid">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" class="small" @click="dialogVisible2">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="saveUserRole" v-if="!readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, updateRole, insertRole, deleteRole, getUserRoleList, updateUserRole } from'@/api/roleApi.js'
import { Message } from 'element-ui'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      active:'1',
      rightShow:false,
      isActive:'',
      roleList:[],
      functionList:[],
      userRoleList:[],
      functionRoleid:'',//功能页面的Roleid
      dialogShow:false,
      dialogShow2:false,
      isUptade:false,
      roleid:'',
      getData:{
        languagetype:'',
        systemtype:'0'
      },
      getUserData:{
        languagetype:'',
        roleid:''
      },
      saveUserRoleData:{
        roleid:'',
        userid:''
      },
      labeData:[],
    options: [{
      value: '1',
      label: 'Unavailable'
      }, {
      value: '2',
      label: 'Read Only'
      }, {
      value: '3',
      label: 'Unlimit'
      }],
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
  methods:{
    dialogVisible(){
      this.dialogShow =!this.dialogShow;
      this.labeData.forEach(element => {
        element.content =''
      });
    },
    dialogVisible2(){

      this.dialogShow2 = !this.dialogShow2;
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
    getUserList(row, event, column){
      // 点击Role列表拉取User列表
      this.isActive = row;
      this.getUserData.roleid = row.roleid;
      this.rightShow = true;
      this.getUserRole(this.getUserData);
    },
    getUserRole(data){
      getUserRoleList(data).then(res=>{
        if(res.data.success){
          this.userRoleList = res.data.data
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    saveName(){
        if(this.isUptade){
        updateRole({roleid:this.roleid,rolename:JSON.stringify(this.labeData)}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        insertRole({systemtype:'0', rolename:JSON.stringify(this.labeData)}).then(res=>{
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

      getRole(data){
      getRoleList(data).then(res=>{
        if(res.data.success){
        this.roleList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    updateRoleUser(row){
        this.saveUserRoleData.roleid = row.roleid;
        this.saveUserRoleData.userid = row.userid;
        this.dialogVisible2();
    },
    saveUserRole(row){
      updateUserRole(this.saveUserRoleData).then(res=>{
        if(res.data.success){
          this.getUserRole(this.getUserData);
          this.$message.success(this.rs.info_msg_update_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
      this.dialogVisible2();
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
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.operationTypeList =JSON.parse(localStorage.getItem('selectlist')).OPERATION_PERMIT_TYPE_LIST;
    this.getData.languagetype = localStorage.getItem('languagetype');
    this.getUserData.languagetype = localStorage.getItem('languagetype')
      if(this.langList.length == 0){
      this.labeData.push({type:'',content:''})
    }else{
      // 转换到存储list
      this.langList.forEach(element => {
        this.labeData.push({type:element.languageid,content:'',})
      });
    }
    this.getRole(this.getData)
  },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.backend_role ==='02'){
        return true
      }else{
        return false
      }
    }
  },
    watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getUserData.languagetype = val;
      this.getRole(this.getData);
      if(this.userRoleList.length !=0){
          this.getUserRole(this.getUserData);
      }
    },

  },
}
</script>
<style scoped>
.card_box_agents{
  margin-bottom: 10px;
  height: 240px;
  border: 1px solid #EEE;
  background: #FFF;
  position: relative;
}
.card_box_img{
  /* width: 175px; */
  height: 175px;
}
.card_box_img > img {
  width: 100%;
  height: 100%;
}

.card_box_name {
  height: 58px;
  line-height: 58px;
  margin: 0 10px;
}
p.tools_line.fr span{
  margin: 0 5px;
}
.name_line {
font-size:12px;
/* font-family:SFUIDisplay-Bold; */
font-weight:bold;
color:rgba(85,91,103,1);
}
</style>
