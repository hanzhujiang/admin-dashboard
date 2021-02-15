<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.view_sharing}}</span>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="side_tab">
            <div class="side_tab_box">
              <div class="box-header" >
                <div class="title" >
                  <img src="@/assets/imgs/page/departments_1.png" alt="">
                  <span >{{project.fullname}}</span>
                </div>
                <div class="tools">
                  <span @click="showAgencyDialog()" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_1st_tier_agency}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body" >
                <el-tree
                  :data="agencyproject"
                  :props="defaultProps"
                  :empty-text="rs.no_data"
                  :expand-on-click-node="false"
                  default-expand-all
                  @node-click="showDetail"
                  style="font-size:18px;padding:10px;">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <el-row class="leaf-text">
                      <el-col :span="16" style="padding-top:6px;">
                        <div>
                          <span> <i :class="node.icon"></i>{{node.label}}</span>
                          <span style="font-size:12px;" v-if="data.isfulledit=='1' && data.shareable=='1'">
                            ({{rs.edit + ',' + rs.share}})
                          </span>
                          <span style="font-size:12px;" v-if="data.isfulledit=='1' && data.shareable!='1'">
                            ({{rs.edit}})
                          </span>
                          <span style="font-size:12px;" v-if="data.isfulledit!='1' && data.shareable=='1'">
                            ({{rs.share}})
                          </span>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="fr">
                          <el-dropdown :split-button="false" class="dropdown-li fr">
                            <el-button size="medium" class="drowdown_btn" >
                              ...
                            </el-button>
                            <el-dropdown-menu slot="dropdown" >
                              <el-dropdown-item @click.stop="setTopAgency(data)" >
                                <span class="btntext drowdown_item_btn" 
                                  @click="setTopAgency(data)">{{rs.set_as_top_tier}}</span>
                              </el-dropdown-item>
                              <el-dropdown-item @click.stop="showAgencyDialog2(data)" >
                                <span class="btntext drowdown_item_btn"
                                  @click="showAgencyDialog2(data)">{{rs.change_upper_tier}}</span>
                              </el-dropdown-item>
                              <el-dropdown-item @click.stop="showAgencyDialog(data)" >
                                <span class="btntext drowdown_item_btn"
                                  @click="showAgencyDialog(data)">{{rs.add_lower_tier}}</span>
                              </el-dropdown-item>
                              <el-dropdown-item @click.stop="removeAgency(data)" >
                                <span class="btntext drowdown_item_btn" style="color:red;" 
                                  @click.stop="removeAgency(data)">{{rs.remove}}</span>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                      </el-col>
                    </el-row>
                  </span>
                </el-tree>
              </div>  
            </div>  
          </div>
        </el-col>    
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" v-if="showCommission">
          <div class="box">
            <div class="box-header" >
              <div class="title">
                <img src="@/assets/imgs/common/common_15.png" alt="">
                <span >{{agencyname}}</span>
              </div>
            </div>
            <div class="box-body">
              <el-row :gutter="10" class="line2">
                <el-col :span="24">
                  <div class="title" style="font-size:14px;">{{rs.exchange_commission}}</div>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content" style="padding:5px; text-align:right;">
                    {{rs.pass_to_agency}}
                  </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content">
                    <el-input size="small" v-model="commissionDetail.exchange.commissionrate"></el-input>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content">
                    <el-select size="small" v-model="commissionDetail.exchange.ratetype">
                      <el-option
                        v-for="item in optionsList"
                        :key="item.value"
                        :label="item.value"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content" style="padding:5px; text-align:right;">
                    +&nbsp;&nbsp;{{rs.bonus}}
                  </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content">
                    <el-input size="small" v-model="commissionDetail.exchange.bonus"></el-input>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content">
                    <el-select size="small" v-model="commissionDetail.exchange.bonustype">
                      <el-option
                        v-for="item in optionsList"
                        :key="item.value"
                        :label="item.value"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="line2">
                <el-col :span="24">
                  <div class="title" style="font-size:14px;">{{rs.settle_commission}}</div>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content" style="padding:5px; text-align:right;">
                    {{rs.pass_to_agency}}
                  </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content">
                    <el-input size="small" v-model="commissionDetail.settled.commissionrate"></el-input>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content">
                    <el-select size="small" v-model="commissionDetail.settled.ratetype">
                      <el-option
                        v-for="item in optionsList"
                        :key="item.value"
                        :label="item.value"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content" style="padding:5px; text-align:right;">
                    +&nbsp;&nbsp;{{rs.bonus}}
                  </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content">
                    <el-input size="small" v-model="commissionDetail.settled.bonus"></el-input>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <div class="content">
                    <el-select size="small" v-model="commissionDetail.settled.bonustype">
                    <el-option
                      v-for="item in optionsList"
                      :key="item.value"
                      :label="item.value"
                      :value="item.code">
                    </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="24">
                  <div class="content" style="padding-top:20px;">
                      <el-checkbox v-model="commissionDetail.isfulledit" true-label='1'
                      false-label='0' size="small">{{rs.can_edit_all_project_info}}</el-checkbox>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="24">
                  <div class="content" style="padding-top:20px;">
                      <el-checkbox v-model="commissionDetail.shareable" true-label='1'
                      false-label='0' size="small">{{rs.can_share_project_to_other}}</el-checkbox>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button  class="small bg_blue" @click="saveShareDetail">{{rs.save}}</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.select_agency"
      :visible.sync="dialogVisible"
      width="70%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.agency}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row>
          <el-col :offset="12" :span="12">
            <div class="filter-search" style="padding-bottom:15px">
              <el-input :placeholder="rs.search_agencies" @change="getAgencyData('0')" 
                  v-model="agencyData.condition" class="input-key" clearable size='mini'>
                <el-button @click="getAgencyData('0')" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="agencyList"
            :empty-text = rs.no_data
            style="width: 100%"
            :show-overflow-tooltip="true"
            size="mini">
            <el-table-column
              prop="shortname"
              :label="rs.agency">
            </el-table-column>
            <el-table-column
              prop="contactperson"
              :label="rs.contact_person">
            </el-table-column>
            <el-table-column
              prop="contactnumber"
              :label="rs.contact_number">
            </el-table-column>
            <el-table-column
              prop="officetelephone"
              :label="rs.phone_number">
            </el-table-column>
            <el-table-column
              prop="officefax"
              :label="rs.fax_number">
            </el-table-column>
            <el-table-column
              :label="rs.action"
              width="120">
              <template slot-scope="scope">
                <span class="btntext" @click="appendAgency(scope.row)">{{rs.select}}</span>
                <!-- <el-button @click="addList(scope.row)" size="mini" class="small bg_blue" >
                <i class="fa fa-check"></i><span>{{rs.select}}</span></el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row class="dailog-footer" style="margin-top:5px">
        <div>
          <el-pagination
          @current-change="getAgencyData('1')"
          :current-page.sync="agencyData.pagenum"
          :page-size="agencyData.pagesize"
          layout=" prev, pager, next "
          :total="agencyTotal"
          class="fr">
          </el-pagination>
        </div>
      </el-row>
    </el-dialog>
  
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.select_agency"
      :visible.sync="dialogVisible2"
      width="70%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.agency}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row>
          <el-col :span="24">
            <p style="padding-left:10px;padding-bottom:20px;">{{rs.change_upper_tier_text}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="agencyList2"
            :empty-text = rs.no_data
            style="width: 100%"
            :show-overflow-tooltip="true"
            size="mini">
            <el-table-column
              prop="shortname"
              :label="rs.agency">
            </el-table-column>
            <el-table-column
              prop="contactperson"
              :label="rs.contact_person">
            </el-table-column>
            <el-table-column
              prop="contactnumber"
              :label="rs.contact_number">
            </el-table-column>
            <el-table-column
              prop="officetelephone"
              :label="rs.phone_number">
            </el-table-column>
            <el-table-column
              prop="officefax"
              :label="rs.fax_number">
            </el-table-column>
            <el-table-column
              :label="rs.action"
              width="120">
              <template slot-scope="scope">
                <span class="btntext" @click="editAgency(scope.row)">{{rs.select}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { validator, allvalidator } from '@/validator/validator.js'
import { getTreeData, deleteShareto, insertSingle, agencyGetToShareAgency, getUpperShareAgency,
        updateSingle, getOneCommissionData, commissionInsertCommissionBy99,
        checkExistAssociated, checkExistPendingApproval } from '@/api/projectApi.js'
import { Message } from 'element-ui'
import { mapGetters } from "vuex";

export default{
  data() {
    return {
      project:{},
      agencyproject:[],
      defaultProps: {
        children: 'children',
        label: 'agencyfullname',
      },
      agencyid:null,
      agencyname:'',
      agencyprojectid:null,
      dialogVisible:false,
      dialogVisible2:false,
      agencyTotal:null,
      agencyList:[],
      agencyList2:[],
      showCommission:false,
      optionsList:[],
      commissionDetail:{
        exchange:{
          ratetype:'01',
          commissionrate:0,
          bonustype:'02',
          bonus:0
        },
        settled:{
          ratetype:'01',
          commissionrate:0,
          bonustype:'02',
          bonus:0
        },
        shareable:'0',
        isfulledit:'0',
        agencyprojectid:'',
      },
      agencyData:{
        condition:'',
        pagesize:10,
        pagenum:1,
        languagetype:'',
        exclude:'1',
        isactived:'1',
        projectid:'',
        isplatform:'1'
      },
      formData: {
        projectid:'',
        languagetype:''
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
  },
  methods:{
    showAgencyDialog(data) {
      this.dialogVisible = !this.dialogVisible;
      if (data != null) {
        // 添加下游中介
        this.agencyid = data.agencyid;
        // 只显示下游关联公司
        this.agencyData.isplatform = '0'
      } else {
        // 添加一级中介
        this.agencyid = null;
      }
      this.restoration();
    },
    showAgencyDialog2(data) {
      this.dialogVisible2 = !this.dialogVisible2;
      this.agencyid = data.agencyid;
      this.agencyprojectid = data.agencyprojectid;
      this.getUpperAgency(data);
    },
    removeAgency(data) {
      checkExistPendingApproval({agencyprojectid:data.agencyprojectid}).then(res=>{
        if (res.data.success) {
          if (res.data.data) {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.rs.info_msg_change_sharing_tier});
          } else {
            this.$confirm(this.rs.info_msg_remove_sharing, this.rs.prompt_message, {
              confirmButtonText: this.rs.confirm,
              cancelButtonText: this.rs.cancel,
              type: 'warning',
              center: true
            }).then(() => {
              deleteShareto({ids:data.agencyprojectid}).then(res=>{
                if (res.data.success) {
                  this.dialogVisible = false;
                  this.reloadTreeData();
                  this.$message.success(this.rs.info_msg_update_success)
                } else {
                  this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
                }
              })
            })
          }
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    appendAgency(data) {
      var params = {
        agencyid:data.agencyid,
        projectid:this.$router.currentRoute.params.id,
        sharedfromagencyid:this.agencyid,
        isshared:this.agencyid==null?'0':'1',
        isfulledit:this.agencyid==null?'1':'0',
        shareable:this.agencyid==null?'1':'0',
      }
      insertSingle(params).then(res=>{
        if (res.data.success) {
          this.dialogVisible = false;
          this.reloadTreeData();
          this.$message.success(this.rs.info_msg_update_success)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    editAgency(data) {
      var params = {
        agencyid:this.agencyid,
        projectid:this.$router.currentRoute.params.id,
        sharedfromagencyid:data.agencyid,
        agencyprojectid:this.agencyprojectid,
        isshared:'1'
      }
      checkExistAssociated(params).then(res=>{
        if (res.data.success) {
          if (!res.data.data) {
            this.$confirm(this.rs.info_msg_no_associated_agency, this.rs.prompt_message, {
              confirmButtonText: this.rs.confirm,
              cancelButtonText: this.rs.cancel,
              type: 'warning',
              center: true
            }).then(() => {
              updateSingle(params).then(res=>{
                if (res.data.success) {
                  this.dialogVisible2 = false;
                  this.reloadTreeData();
                  this.$message.success(this.rs.info_msg_update_success)
                } else {
                  this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
                }
              })
            })
          } else {
            updateSingle(params).then(res=>{
              if (res.data.success) {
                this.dialogVisible2 = false;
                this.reloadTreeData();
                this.$message.success(this.rs.info_msg_update_success)
              } else {
                this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
              }
            })
          }
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    setTopAgency(data) {
      var params = {
        agencyid:data.agencyid,
        projectid:this.$router.currentRoute.params.id,
        sharedfromagencyid:0,
        agencyprojectid:data.agencyprojectid,
        isshared:'0'
      }
      updateSingle(params).then(res=>{
        if (res.data.success) {
          this.reloadTreeData();
          this.$message.success(this.rs.info_msg_update_success)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    showDetail(data) {
      this.agencyname = data.agencyfullname;
      this.showCommission = true;
      getOneCommissionData({agencyprojectid:data.agencyprojectid}).then(res=>{
        if(res.data.success){
          if (res.data.data != null) {
            this.commissionDetail = res.data.data;
          }
          this.commissionDetail.isfulledit = data.isfulledit;
          this.commissionDetail.shareable = data.shareable;
          this.commissionDetail.agencyprojectid = data.agencyprojectid;
          if (this.commissionDetail.exchange.ratetype == null) {
            this.commissionDetail.exchange.ratetype = '01';
          }
          if (this.commissionDetail.exchange.bonustype == null) {
            this.commissionDetail.exchange.bonustype = '02'
          }
          if (this.commissionDetail.settled.ratetype == null) {
            this.commissionDetail.settled.ratetype = '01';
          }
          if (this.commissionDetail.settled.bonustype == null) {
            this.commissionDetail.settled.bonustype = '02'
          }
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      });
    },
    reloadTreeData() {
      getTreeData(this.formData).then(res=>{
        if(res.data.success){
          this.agencyproject = res.data.data;
          this.project = res.data.project;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      });
    },
    getAgencyData(type){
      if(type=="1"){
        this.agencyData.languagetype=localStorage.getItem('languagetype')
        this.agencyData.projectid =this.$router.currentRoute.params.id;
        this.agencyData.agencyid = this.agencyid;
        this.getAgencyList(this.agencyData)
      }else{
        this.restoration()
      }
    },
    getUpperAgency(data) {
      var params = {
        agencyid:data.agencyid,
        projectid:this.$router.currentRoute.params.id,
        languagetype:localStorage.getItem('languagetype')
      }
      getUpperShareAgency(params).then(res=>{
        if (res.data.success) {
          this.agencyList2 = res.data.data
        } else {
           this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    saveShareDetail() {
      let data = {
        agencycommissionlist:JSON.stringify(
            {exchange:this.commissionDetail.exchange,
            settled:this.commissionDetail.settled,option:'99'}),
        agencyprojectid:this.commissionDetail.agencyprojectid,
        isfulledit:this.commissionDetail.isfulledit,
        shareable:this.commissionDetail.shareable
      }
      commissionInsertCommissionBy99(data).then(res=>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_insert_success)
          this.reloadTreeData();
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    restoration(){
      this.agencyData.pagenum = 1
      this.agencyData.languagetype=localStorage.getItem('languagetype')
      this.agencyData.projectid =this.$router.currentRoute.params.id;
      this.agencyData.agencyid = this.agencyid;
      this.getAgencyList(this.agencyData)
    },
    getAgencyList(findData){
      agencyGetToShareAgency(findData).then(res=>{
        if (res.data.success) {
          this.agencyTotal = res.data.total
          this.agencyList = res.data.data
        } else {
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
  },
  created(){
    this.optionsList = JSON.parse(localStorage.getItem('selectlist')).RATE_TYPE_LIST;
    this.formData.languagetype=localStorage.getItem('languagetype');
    this.formData.projectid =this.$router.currentRoute.params.id;
    this.reloadTreeData();
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
  },
  watch:{
    se(val){
    },

    languagetype(val){
    }
  },

}
</script>

<style scoped lang="scss">
.btntext {
  padding: 0 5px!important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;

  .leaf-text {
    width: 100%;
    display: inline-block;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}
</style>
<style>
.side_tab_box .el-tree-node__content{
  height:40px;
}
</style>
