<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header">
      <div class="title">
        <span >{{rs.all_notifications_agent_app}}</span>
      </div>
      <div class="tools">
        <span v-if="!readonly" @click="goRouter('/notification/notificationDetailForAgentApp/save')" class="btn_text">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_notification}}</span>
        </span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <page-size :unit='rs.notifications' @changeSize="handleSizeChange"></page-size>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_notifications" clearable size="mini" @change="search" v-model="getData.condition" @keyup.enter='search'>
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
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
                <el-table
                  :data="dataList"
                  :empty-text = rs.no_data
                  style="width: 100%"
                  size="mini">
                  <el-table-column
                    fixed
                    prop="title"
                    :label="rs.title">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="Send DateTime">
                    <template slot-scope="scope"><span>{{timeTo(scope.row.duepushdatetime)}}</span></template>
                  </el-table-column>
                  <el-table-column
                    label="Send Destination">
                    <template slot-scope="scope">
                    <span style="color:#fff;padding:3px;border-radius:2px;margin:2px;" :class="[d.targettype==0?'red':(d.targettype==1?'green':(d.targettype==2?'orange':''))]"  v-for="(d,i) in scope.row.destinationlist" :key="i" >{{d.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="contents"
                    label="	Content">
                  </el-table-column>
                  <el-table-column
                    width="180">
                    <template slot-scope="scope">
                      <el-row v-if="scope.row.ispushed == 0?true:false">

                          <span class="btntext"  @click="EditMsg(scope.row.notificationid)"  v-if="!readonly">{{rs.edit}}</span>
                          <span class="btntext"  @click="delData(scope.row)"  v-if="!readonly">{{rs.delete}}</span>
                      </el-row>
                      <el-row v-else>
                        <!-- <el-button size="mini" style="background:#E6A23C ; color:#FFF;" class="mini"   @click="EditMsg(scope.row.notificationid)"  v-if="!readonly">
                          <i class="fa fa-repeat" style="padding-right: 5px;"></i>{{rs.set_again}}</el-button> -->

                          <span class="btntext"   @click="EditMsg(scope.row.notificationid)"  v-if="!readonly">{{rs.set_again}}</span>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="table_footer"  v-if="total">
                    <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.agencies}}</div>
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {formatDate , newDate} from '@/assets/js/time.js'; //时间转换插件
import { getNotificationList, deleteNotification, resendNotification } from '@/api/notificationApi.js'
  export default{
     data() {
      return {
        getData:{
          pagesize:20,//第几页
          pagenum:1,//每页显示数
          condition:'',
          languagetype:''
        },
          total:'',
          end:'',
          start:'',
          pageList:[],
          checked:'',
          dataList:[],
        }
      },
    created(){

      this.getData.languagetype = localStorage.getItem('languagetype')
      this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
      this.getNotification(this.getData);
    },
    components: {
      'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
        'page-size':resolve => require(['@/common/PageSize.vue'],resolve)
     },
     computed: {
      ...mapGetters(['rs','languagetype','control']),
      readonly(){
          if(this.control.notification_agent ==='02'){
              return true
          }else{
              return false
          }
      }
    },
    methods:{
      // 分页方法
      handleSizeChange(val) {
        this.getData.pagenum = 1;
        this.getData.pagesize = val;
        this.getNotification(this.getData)
      },
      handleCurrentChange(val) {
         this.getData.pagenum = val;
         this.getNotification(this.getData)
      },
      // ----
      search(){
        this.getData.pagenum =1;
         this.getNotification(this.getData)
      },
      setAgain(row){
        resendNotification({notificationid:row.notificationid}).then(res=>{
        if (res.data.success) {
          this.$message.success(rs.send_success)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
        })
      },
      
      timeTo(time){
        
        // new Date(scope.row.duepushdatetime).getTime()-new Date().getTimezoneOffset()*60000
        
        let times = formatDate( newDate(time),'yyyy-MM-dd hh:mm')
            times = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
            times = formatDate( new Date(times),'dd/MM/yyyy hh:mm')
        return times
      },
      //删除

      delData(row){
        this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
        }).then(() => {
            deleteNotification({ids:row.notificationid}).then(res=>{
            if (res.data.success) {
              this.dataList.forEach((val,i) => {
              if(val.notificationid == row.notificationid){
              this.dataList.remove(this.dataList[i])
              this.$message.success(this.rs.info_msg_delete_success)
              }
            });
            } else {
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
            })
          }).catch(() => {
            this.$message.info(this.rs.cancel_delete)
        });
      },
      EditMsg(id){
        sessionStorage.removeItem('notificationid')
        this.$router.push({path:'/notification/notificationDetailForAgentApp/update',query:{id}})
      },
      goRouter(path){
        this.$router.push({path})
      },
      getNotification(data){
        getNotificationList(data).then(res=>{
          if(res.data.success){
            this.dataList = res.data.data;
            this.total = res.data.total;
            this.end = res.data.end;
            this.start = res.data.start;
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },

  }
</script>

<style scoped>
.text_box{
  min-height: 200px;
  border: 1px solid #EEE;
  padding: 10px;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-button+.el-button {
  margin-left: 0px;
}
.span_imgbox {
  width: 30px;
  display: inline-block;
  /* vertical-align: -webkit-baseline-middle; */
}
.span_imgbox>img{
  width: 100%
}
.center_left,.center_right{
  width: 50%;
  padding-bottom:10px;
}
.el-checkbox{
  margin-top:10px;
}
.lg_1,.lg_2{
  border-radius: 3px;
  background: white;
  border: 1px solid #EEE;
  box-shadow: 1px 1px 5px 0 #bbb;
}
.lbc_1,.lbc_2{
  border-radius: 3px;
  background: white;
  border: 1px solid #EEE;
  box-shadow: 1px 1px 5px 0 #bbb;
  border-top: 3px solid #00c0ef;
}
div.lb_1{
  border-top: 3px solid #3c8dbc;
  -webkit-transition: height .3s ease-in-out;
  -o-transition: height .3s ease-in-out;
  transition: height .3s ease-in-out;
}
div.lb_2{
  border-top: 3px solid #f39c12;
}
.head_left{
  width: 100%;
  padding-bottom: 10px;
}
.header_title_left{
  float: right;
}
.package{
  margin-left: 10px;
  margin-right: 10px;
}
.content_header{
  display: inline-block
}
.content_header>.text{
  font-size: 23px;
  color: black;
}
.content_header>span{
  margin-left: 5px;
  margin-right: 5px;
}

.base{
  font-size: 18px;
}
/* @media (max-width:769px){
  .head_left{
  width: 100%;
}
.header_title_left{
  float: left;

}
.center_left,.center_right{
  width: 100%;
  padding-bottom: 10px;
}
} */
.orange{
  background: #f39c12;
}
.green{
  background: #00c0ef;
}
.red{
  background: rgb(243, 63, 18);

}
</style>
