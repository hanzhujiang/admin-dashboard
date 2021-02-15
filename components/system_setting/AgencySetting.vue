<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.agency_setting}}</span>
        </div>
        <div class="tools">
          <el-button   v-if="!readonly" class="bg_save_btn" @click="save"  size="small">{{rs.save}}</el-button>
        </div>
      </div>
      <div class="wrapper-content clearfix">
        <el-row>
          <el-col>
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/page/addProject_1.png" alt="">
                      <span>{{rs.notification_emails}}</span>
                    </div>
                  </div>
                </template>
                  <div class="box-body">
                    <div>
                      <el-row :gutter="10" class="line-first">
                        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                          <label class="title">{{optionData['01']}}</label>
                          <p style="padding-bottom:15px;color:#666;font-size:14px;line-height: 20px;">{{optionInfo['01']}}</p>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                          <span v-if="!readonly" @click="handleSelect('01')" class="btn_text fr">
                            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                            <span>{{rs.add_new_recipient}}</span>
                          </span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-table
                          :data="notificationtypeList01"
                          style="width: 100%; margin-top:5px;"
                          :empty-text = rs.no_data
                          :show-overflow-tooltip="true"
                          size="mini">
                          <el-table-column
                            :label="rs.name">
                            <template slot-scope="scope">
                              <span>{{ scope.row.name }}</span>
                          </template>
                          </el-table-column>
                          <el-table-column
                            :label="rs.email">
                            <template slot-scope="scope">
                              <span>{{ scope.row.emailaddress }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column 
                            :label="rs.action"
                            width="115">
                            <template slot-scope="scope">
                              <span class="btntext" @click="handleDelete(scope.row)">{{rs.delete}}</span>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </div>
                    <!--  -->
                    <div style="padding-top:40px">
                      <el-row :gutter="10" class="line-first">
                        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                          <label class="title">{{optionData['02']}}</label>
                          <p style="padding-bottom:15px;color:#666;font-size:14px;line-height: 20px;">{{optionInfo['02']}}</p>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                          <span v-if="!readonly" @click="handleSelect('02')" class="btn_text fr">
                            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                            <span>{{rs.add_new_recipient}}</span>
                          </span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-table
                          :data="notificationtypeList02"
                          style="width: 100%; margin-top:5px;"
                          :empty-text = rs.no_data
                          :show-overflow-tooltip="true"
                          size="mini">
                          <el-table-column
                            :label="rs.name">
                            <template slot-scope="scope">
                              <span>{{ scope.row.name }}</span>
                          </template>
                          </el-table-column>
                          <el-table-column
                            :label="rs.email">
                            <template slot-scope="scope">
                              <span>{{ scope.row.emailaddress }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column 
                            :label="rs.action"
                            width="115">
                            <template slot-scope="scope">
                              <span class="btntext" @click="handleDelete(scope.row)">{{rs.delete}}</span>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </div>
                    <!--  -->
                    <div style="padding-top:40px">
                      <el-row :gutter="10" class="line-first" >
                        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                          <label class="title">{{optionData['03']}}</label>
                          <p style="padding-bottom:15px;color:#666;font-size:14px;line-height: 20px;">{{optionInfo['03']}}</p>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                          <span v-if="!readonly" @click="handleSelect('03')" class="btn_text fr">
                            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                            <span>{{rs.add_new_recipient}}</span>
                          </span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-table
                          :data="notificationtypeList03"
                          style="width: 100%; margin-top:5px;"
                          :empty-text = rs.no_data
                          :show-overflow-tooltip="true"
                          size="mini">
                          <el-table-column
                            :label="rs.name">
                            <template slot-scope="scope">
                              <span>{{ scope.row.name }}</span>
                          </template>
                          </el-table-column>
                          <el-table-column
                            :label="rs.email">
                            <template slot-scope="scope">
                              <span>{{ scope.row.emailaddress }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column 
                            :label="rs.action"
                            width="115">
                            <template slot-scope="scope">
                              <span class="btntext" @click="handleDelete(scope.row)">{{rs.delete}}</span>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </div>
                    <!--  -->
                  </div>
                </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:20px"> 
          <el-col :span="24">
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="2">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/page/addProject_1.png" alt="">
                      <span>{{rs.other_setting}}</span>
                    </div>
                  </div>
                </template>
                  <div class="box-body">
                    <el-row :gutter="10" class="line-first" >
                      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                        <label class="title">{{rs.min_number_of_project_on_home}}</label>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                        <el-input :disabled="readonly" placeholder="" v-model="obj.min_number_of_project_on_home" clearable size="mini"></el-input>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" class="line">
                      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                        <label class="title">{{rs.default_client_owner_email}}</label>
                      </el-col>
                      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                        <el-input :disabled="readonly" placeholder="" v-model="obj.default_client_owner_email" clearable size="mini"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </div>
    </form>  
    <select-agent :sync="dialogShow" @select="setAgentName" @update:sync="dialogShow=false"></select-agent>
  </div>
</template>
<script>
import { getOption } from '@/api/optionValueApi.js'
import { mapGetters } from "vuex";
import { getSeparateSettingData, updateSeparateSetting } from '@/api/systemSettingApi.js'
export default{
  data() {
    return {
      obj:{},
      emaillist:{},
      activeNames:['1','2','3','4','5'], //折叠面板
      NewAgentList:[],
      notificationtypeList01:[],
      notificationtypeList02:[],
      notificationtypeList03:[],
      optionInfo:{},
      optionData:{},
      optionList:[],
      dialogShow:false,
      notificationEmailsType:'',
      userInfo:{}
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'select-agent': resolve => require(['@/common/SelectAgent.vue'], resolve),
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.all();
    getOption({keyid1:"99",keyid2:'11',languagetype : localStorage.getItem('languagetype')}).then(res=>{
      if(res.data.success){
        this.optionList = res.data.data;
        res.data.data.forEach(ele=>{
          this.optionData[ele.code] = ele.value;
          this.optionInfo[ele.code] = ele.extvalue;
        })
        this.optionData = Object.assign({},this.optionData)
        this.optionInfo = Object.assign({},this.optionInfo)
        console.log(res.data.data)
      }else{
        this.$message.error(this.ErrorMsgStr(res.data.data));
      }
    })
  },
  methods:{
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    filterHandler(value, row,column) {
      console.log(99999999999999)
      console.log(value,'value')
      console.log(row,'row')
      // return row.notificationtype === value;
    },
    save(){
      let arr = this.notificationtypeList01.concat(this.notificationtypeList02.concat(this.notificationtypeList03));
      updateSeparateSetting({separatesetting:JSON.stringify(this.obj),notificationemail:JSON.stringify(arr)}).then(res=>{
      if (res.data.success) {
        this.$message.success(this.rs.info_msg_operate_success)
      } else {
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      }
      })
    },
    handleDelete(row){
      console.log(row)
       if(row.notificationtype == '01'){
          this.notificationtypeList01.forEach(ele=>{
            if(ele.emailaddress == row.emailaddress){
              this.notificationtypeList01.remove(ele)
            }
          })
        }
        if(row.notificationtype == '02'){
          this.notificationtypeList02.forEach(ele=>{
            if(ele.emailaddress == row.emailaddress){
              this.notificationtypeList02.remove(ele)
            }
          })
        }
        if(row.notificationtype == '03'){
          this.notificationtypeList03.forEach(ele=>{
            if(ele.emailaddress == row.emailaddress){
              this.notificationtypeList03.remove(ele)
            }
          })
        }
        this.$message.warning({dangerouslyUseHTMLString:true,message:this.rs.delete_info})
    },
    setAgentName(row) {
      // this.handleSelect(row)
      console.log(row)
      let data = {
        emailaddress:row.email,
        name:row.firstname + ' ' + row.lastname,
        notificationtype:this.notificationEmailsType,
        refertype:'1',
        referid:this.userInfo.agencyid,
      }
       if(this.notificationEmailsType == '01'){
         let flg = true;
         this.notificationtypeList01.forEach(ele=>{
           if(ele.emailaddress == row.email){
             flg = false
           }
         })
         if(flg){
          this.notificationtypeList01.push(data)
         }
        }
        if(this.notificationEmailsType == '02'){
          let flg = true;
          this.notificationtypeList02.forEach(ele=>{
            if(ele.emailaddress == row.email){
              flg = false
            }
          })
          if(flg){
            this.notificationtypeList02.push(data)
          }
        }
        if(this.notificationEmailsType == '03'){
          let flg = true;
          this.notificationtypeList03.forEach(ele=>{
            if(ele.emailaddress == row.email){
              flg = false
            }
          })
          if(flg){
            this.notificationtypeList03.push(data)
          }
        }
      this.$message.warning({dangerouslyUseHTMLString:true,message:this.rs.delete_info})
      this.dialogShow = false;
    },
    handleSelect(type){
      this.dialogShow = true;
      this.notificationEmailsType = type;
    },
    all(){
      getSeparateSettingData().then(res=>{
        if (res.data.success) {
          console.log(res,'all')
          this.allList = res.data.data.separatesetting;
          this.notificationtypeList01 = [];
          this.notificationtypeList02 = [];
          this.notificationtypeList03 = [];
          res.data.data.notificationemail.forEach(ele=>{
            if(ele.notificationtype == '01'){
              this.notificationtypeList01.push(JSON.parse(JSON.stringify(ele)))
            }
            if(ele.notificationtype == '02'){
              this.notificationtypeList02.push(JSON.parse(JSON.stringify(ele)))
            }
            if(ele.notificationtype == '03'){
              this.notificationtypeList03.push(JSON.parse(JSON.stringify(ele)))
            }
          })
          this.allList.forEach(val => {
          this.obj[val.id]=val.value
          });
          console.log(this.obj,'obj')
          this.obj = Object.assign({},this.obj)
          this.emailList = res.data.data.notificationemail;
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
  },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
        if(this.control.agency_setting ==='02'){
            return true
        }else{
            return false
        }
    }
  }
}
</script>

<style scoped>
  .btn_text{
    cursor: pointer
  }
</style>