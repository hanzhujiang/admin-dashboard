<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.all_memberships}}</span>
      </div>
    </div>
    <div class="wrapper-header clearfix">
      <ul class="clearfix list_view_ul">
        <li :class="[active=='1'?'fl list_view':'fl active_list_views']" @click="goRouter('/membership_manage/membership/allAgencies','1')">{{rs.agency}}</li>
        <li :class="[active=='2'?'fl list_view':'fl active_list_views']" style="margin-left: 85px;" @click="goRouter('/membership_manage/allPartnerFirms','2')">{{rs.partner_firms}}</li>
      </ul>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row :gutter="20" >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <page-size :unit='rs.memberships' @changeSize="handleSizeChange"></page-size>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" >
            <div class="filter-search">
              <el-input :placeholder="rs.search_membership" clearable v-model="getData.condition" class="input-key" size='mini' @change="search" @keyup.enter='search'>
                <el-button slot="append" icon="el-icon-search" ></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
     <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
                     <div class="table_box">
                      <el-table
                      :empty-text = rs.no_data
                      :data="membershipList"
                      tooltip-effect="light"
                      width='100%'
                      size="mini">
                      <el-table-column
                        prop="fullname"
                        :label="rs.name">
                      </el-table-column>
                      <!-- <el-table-column
                        prop="contactperson"
                        :label="rs.principal">
                      </el-table-column> -->
                      <el-table-column
                        prop="officetelephone"
                        :label="rs.office_telephone">
                      </el-table-column>
                      <el-table-column
                        prop="email"
                        :label="rs.email">
                      </el-table-column>
                      <el-table-column
                        prop="needsubscribe"
                        :label="rs.need_subscribe">
                        <template slot-scope="scope">
                          <span>{{scope.row.needsubscribe==0?rs.no:rs.yes}} </span>
                          <span style="padding-left:15px" class="btn_text" @click="changeNeedsubscribe(scope.row)">{{rs.change}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="synchstatus"
                        width="240"
                        :label="rs.synch_status">
                        <template slot-scope="scope">
                          <span>{{scope.row.synchstatus==0?rs.syn_success:scope.row.synchstatus == 1?rs.syn_create_failed:scope.row.synchstatus ==2?rs.syn_modify_failed:scope.row.synchstatus == 3?rs.syn_delete_failed:'-'}} </span>
                          <span style="padding-left:15px" class="btn_text" v-if="scope.row.synchstatus!=0" @click="handleSynchronize(scope.row)">{{rs.synch_again}}</span>
                        </template>
                      </el-table-column>
                     <el-table-column width="100"
                        :label="rs.action">
                      <template slot-scope="scope">
                        <span class="btn_text" @click="goMembershipInfo(scope.row)">{{rs.detail}}</span>
                      </template>
                    </el-table-column>
                    </el-table>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!--  -->
              <div class="table_footer"  v-if="total">
                <el-row >
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="data-counter">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.all_memberships}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div v-if="total">
                      <el-pagination
                      :background="false"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      layout="prev, pager, next"
                      :page-size="getData.pagesize"
                      :total="total" class="fr">
                      </el-pagination>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getCreditCard, brokerfirmSynchronizeInsert ,brokerfirmSynchronizeUpdate} from '@/api/membershipManageApi.js'
import { brokerfirmUpdateNeedSubscribe } from '@/api/agencyApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      total:0,
      active:'2',
      start:1,
      end:10, 
      getData:{
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
        ifbrokerfirm:'1'
      },
      membershipList:[],//所有会员
      dialogShow:false,//弹出层显示隐藏
      saveUpdate:'',//区分新增和更新按钮
      // readonly:true,//区分ID时候可以修改
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve),
    },
  methods:{
    getMembershipsList(data){
      getCreditCard(data).then(res =>{
        if(res.data.success){
          this.membershipList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }
      })
    },
    // 分页方法
    handleSizeChange(val) {
      this.getData.pagenum = 1;
      this.getData.pagesize = val;
      this.getMembershipsList(this.getData)
    },
    handleCurrentChange(val) {
        this.getData.pagenum = val;  
        this.getMembershipsList(this.getData)
    },
    // ----
    search(){
      this.getData.pagenum =1;
        this.getMembershipsList(this.getData)
    },
    changeNeedsubscribe(row){
      let num = '';
      if(row.needsubscribe != '0'){
        num  = '0'
      }else{
        num = '1'
      }
      brokerfirmUpdateNeedSubscribe({firmid:row.firmid,needsubscribe:num}).then(res=>{
        if(res.data.success){
           this.$message({
            message: this.rs.info_msg_update_success,
            type: "success"
          });
          this.getMembershipsList(this.getData);
        }else{
             this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
        }
      })
    },
    handleSynchronize(row){
      if(row.synchstatus == 2){
        this.handleUpdate({
          fullname:row.fullname,
          firmid:row.firmid,
          stripeid:row.stripeid,
          email:row.email,
          officetelephone:row.officetelephone
        })
      }else{
        this.handleInsert({
          fullname:row.fullname,
          firmid:row.firmid
        })
      }
    },

    handleInsert(row){
      brokerfirmSynchronizeInsert(row).then(res=>{
        if(res.data.success){
          this.$message({
            message: this.rs.syn_success,
            type: "success"
          });
          this.getMembershipsList(this.getData);
        }else{
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    handleUpdate(row){
      brokerfirmSynchronizeUpdate(row).then(res=>{
        if(res.data.success){
          this.$message({
            message: this.rs.syn_success,
            type: "success"
          });
          this.getMembershipsList(this.getData);
        }else{
           this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    goRouter(path){
      this.$router.push(path)
    },
    goMembershipInfo(data){
      this.$router.push({path:'/membership_manage/membershipInformation/'+data.agencyid})
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
    // 获取语言资源表数据
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.getData.languagetype=localStorage.getItem('languagetype')
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue;
    this.getMembershipsList(this.getData);
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.all_memberships =='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getMembershipsList(this.getData)  
    },
    
  },
}
</script>

<style scoped>
.memberships_shortname{
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size:14px;
  /* font-family:SFUIDisplay-Bold; */
  font-weight:bold;
  color:rgba(85,91,103,1);
}
.card_box_memberships{
  /* position: relative; */
  background: #f7f7f7;
  height: 222px;
  margin: 10px 0px;
  position: relative;
}
.pic_area_memberships {
  height: 175px;
  line-height: 105px;
  /* float: left; */
}
.pic_area_memberships > img{
  height: 100%;
  width: 100%;
}
.info_area{
  padding: 6px 6px 6px 105px;
}
.info_area p.line{
  padding: 6px;
}
.info_area p.line span.icon{
  padding-right: 10px;
}
.info_area p.line span.icon-right{
  padding: 5px; 
  float: right;
}

</style>
