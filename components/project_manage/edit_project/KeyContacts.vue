<template>
  <div class="wrapper clearfix" >
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.project_detail}} - {{project_name}}</span>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <img src="../../../assets/imgs/page/keyContacts_1.png" alt="">
                <span>{{rs.key_contacts}}</span>
              </div>
              <div class="tools">
                <span class="btn_text" @click="popShow">
                  <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                  <span>{{rs.add_new_contact}}</span>
                </span>
              </div>
            </div>
            <div class="help-line">{{rs.key_contact_help}}</div>
            <div class="box-body">
              <div class="table_box">
                <el-table
                  :data="tableData4"
                  :empty-text = rs.no_data
                  style="width: 100%;padding-top:5px;"
                  tooltip-effect="light"
                  size="mini">
                  <el-table-column
                    prop="name"
                    :label="rs.name"
                    :show-overflow-tooltip="true"
                    >
                    <template slot-scope="scope">
                      <span>{{scope.row.firstname}}</span>
                      <span class="nbsp"></span>
                      <span>{{scope.row.lastname}}</span>
                      <span v-if="scope.row.level==1" class="bg_red tag">{{rs.general_contact}}</span>
                      <span v-if="scope.row.level==2" class="bg_orange tag">{{rs.key_contact}}</span>
                      <span v-if="scope.row.level==3" class="bg_blue tag">{{rs.oversea_contact}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    :show-overflow-tooltip="true"
                    :label="rs.email"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="phonenumber"
                    :label="rs.phone_number"
                    width="180"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="mobilenumber"
                    :label="rs.mobile_number"
                    width="180"
                    >
                  </el-table-column>
                  <el-table-column
                    width="110">
                    <template slot-scope="scope">
                      <span class="btntext" @click="delList(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                    </template>
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
      :title="rs.key_contacts"
      :visible.sync="dialogVisible"
      width="70%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.select_contact}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row>
          <div class="filter-search fr" style="width:50%" >
            <form autocomplete="on">
              <el-input @change="findChange" :placeholder="rs.search_agents" v-model="search" 
                  class="input-key" clearable size='mini'>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </form>  
          </div>
        </el-row>
        <el-row>
          <el-table
            :data="tableData3"
            style="width: 100%"
            :empty-text = rs.no_data
            :show-overflow-tooltip="true"
            size="mini">
            <el-table-column
              prop="firstname"
              :label="rs.agent_name">
            <template slot-scope="scope">
              <span>{{scope.row.firstname}}</span>
              <span class="nbsp"></span>
              <span>{{scope.row.lastname}}</span>
            </template>
            </el-table-column>
            <el-table-column
              prop="email"
              :label="rs.email">
              </el-table-column>
            <el-table-column
              prop="phonenumber"
              :label="rs.phone_number"
              width="150">
            </el-table-column>
            <el-table-column
              prop="mobilenumber"
              :label="rs.mobile_number"
              width="150">
            </el-table-column>
            <el-table-column
              :label="rs.action"
              width="450">
              <template slot-scope="scope">
                <span v-if="!readonly">
                  <span class="btntext" @click="addList(scope.row,'1')"  >{{rs.general_contact}}</span>
                  <span class="btntext" @click="addList(scope.row,'2')" v-if="!general_contactShow" >{{rs.key_contact}}</span>
                  <span class="btntext" @click="addList(scope.row,'3')" >{{rs.oversea_contact}}</span>
                </span>
                <!-- <el-button :disabled="readonly" @click="addList(scope.row,'1')" size="mini" class="small bg_red"><i class="fa fa-check"></i><span>{{rs.general_contact}}</span></el-button>
                <el-button :disabled="readonly || general_contactShow" @click="addList(scope.row,'2')" size="mini" class="small bg_orange"><i class="fa fa-check"></i><span>{{rs.key_contact}}</span></el-button>
                <el-button :disabled="readonly" @click="addList(scope.row,'3')" size="mini" class="small bg_blue"><i class="fa fa-check"></i><span>{{rs.oversea_contact}}</span></el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row class="dailog-footer" style="margin-top:5px"  v-if="total">
        <div>
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pagesize"
          :page-size="select"
          layout="prev, pager, next"
          :total="total"
          class="fr">
          </el-pagination>
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { insertAgencyProjectContact, agencyProjectContactList, deltadeAgencyProjectContact } from '@/api/projectApi.js'
import { getAgentList } from '@/api/agentApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      contactInp:'',
      dialogVisible:false,
      checked:false,
      tableData4: [],
      tableData3: [],
      search:'',
      total:null,
      pagesize:1,//页码
      end:'',
      general_contactShow : false,
      pageList:[], //获取下拉列表页码
      select:10, //显示条目
      project_name:''
    }
  },
  components: {
    // 'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    // 'navigation':resolve=> require(['../edit_project/template/navigation.vue'],resolve),
  },
  created(){
    let contactList = {
      agencyprojectid : JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
      languagetype:localStorage.getItem('languagetype')
    }
    this.allContactList(contactList)
  //获取下拉列表页码
  this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
  this.getName()
  // 默认页码
  // this.select = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue

  },
  methods:{
    getName(){
      let text = ''
      JSON.parse(JSON.parse(sessionStorage.getItem('ProjectList')).shortname).forEach(ele => {
         if (ele.type=='00') {
          text = ele.content
        }
        if (ele.type==localStorage.getItem('languagetype')) {
          if (ele.content==''||ele.content==undefined) {
            this.project_name = text
          }else{
            this.project_name = ele.content
          }
        }
      });
    },
    // 下拉框事件
    pageAlist(){
      this.pagesize = 1
      let pageData = {
        pagesize:this.select,
        pagenum:this.pagesize,
        condition:this.search,
        isactived:'1'
      }
      this.allList(pageData)

    },
    //页码变化事件
    handleCurrentChange(val){
      let pageSiziData = {
        pagesize:this.select,
        pagenum:val,
        condition:this.search,
        isactived:'1'
      }
      this.allList(pageSiziData)
    },
    //查找
    findChange(){
      this.pagesize = 1
      let findData = {
        condition:this.search,
        pagesize:this.select,
        pagenum:this.pagesize,
        isactived:'1'
      }
      this.allList(findData)
    },
    popShow(){
      this.dialogVisible = !this.dialogVisible;
      //点击弹出窗，获取列表
      let data = {
        condition:this.search,
        pagesize:this.select,
        pagenum:this.pagesize,
        isactived:'1'
      }
      this.allList(data)
    },
    //搜索

    //所有弹出窗，获取列表
    allList(data){
      getAgentList(data).then(res=>{
        if (res.data.success) {
          this.total = res.data.total
          this.tableData3 = res.data.data
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //添加联系人
    addList(row,id){
      this.dialogVisible = false
      if (this.tableData4.length>0) {
        for(var i=0;i<this.tableData4.length;i++){
          if (this.tableData4[i].email == row.email) {
            this.$message.success(this.rs.info_msg_linkman)
            return
          }
        }
        this.insertData(row,id)
        return
      }else{
        this.insertData(row,id)
      }
    },
    insertData(row,id){
      let insert = {
        agentid : row.agentid,
        level : id,
        agencyprojectid : JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        }
      insertAgencyProjectContact(insert).then(res=>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_insert_success)
          let contactList = {
            agencyprojectid : JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
            languagetype:localStorage.getItem('languagetype')
          }
          this.allContactList(contactList)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //删除联系人
    delList(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        let dslData = {
        ids:row.agencyprojectcontactid
      }
      deltadeAgencyProjectContact(dslData).then(res=>{
          if (res.data.success) {
          this.$message({
              type: 'success',
              message: this.rs.info_msg_delete_success
            });
            let contactList = {
            agencyprojectid : JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
            languagetype:localStorage.getItem('languagetype')
          }
          this.allContactList(contactList)
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
    isGeneral(){
      this.general_contactShow = false
      for(var i=0;i<this.tableData4.length;i++){
        if(this.tableData4[i].level==2){
          this.general_contactShow = true
          return
        }else{
          this.general_contactShow = false
        }
        }
      },
    //所有联系人
    allContactList(contactList){
      agencyProjectContactList(contactList).then(res=>{
          if (res.data.success) {
            this.tableData4 = res.data.data
            this.isGeneral()

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
  },
  watch:{
    languagetype(){
      this.getName()
    } 
  },
  computed: {
    ...mapGetters(['rs','control','languagetype']),
    readonly() {
    if (this.control.project_detail === "02") {
      return true;
    } else {
      return false;
    }
    }
  },
}
</script>
