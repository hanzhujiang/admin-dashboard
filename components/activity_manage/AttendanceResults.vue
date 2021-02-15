<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.attendance_results}}</span>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="14">
          <div class="box">
            <div class="box-header" >
              <div class="title">
                <img src="../../assets/imgs/page/allActivities_2.png" alt="">
                <span>{{rs.activities}}</span>
              </div>
            </div>  
            <div class="box-body" style="padding-top: 0;">
              <div class="condition clearfix">
                <el-row >
                <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                  <div class="filter-count ">
                    <span class="filter-text">{{rs.showing}}</span>
                      <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend"  style="width: 90px;"  size="mini">
                          <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
                          <!-- <el-option v-for=" d in 3" :label="d" :value="d"></el-option> -->
                      </el-select>
                    <span class="filter-unit">{{rs.projects}}</span>
                </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                  <div class="filter-search">
                    <el-input @change="getData('0')" 
                      :placeholder="rs.search_activities" v-model="data.condition" class="input-key" clearable size='mini'>
                      <el-button @click="getData('0')" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                  </div>
                </el-col>
              </el-row>
              <div class="table_box" style="padding-top: 10px;">
                <el-table
                  @row-click="tableClick"
                  :data="allList"
                  :empty-text ='rs.no_data'
                  style="width: 100%"
                  size="mini">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    fixed
                    prop="title"
                    :label="rs.title">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    :label="rs.category">
                    <template slot-scope="scope">
                      <span>{{classlyObj[scope.row.activitytype]}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column
                    :label="rs.date"
                    >
                    <template slot-scope="scope">
                      <span>{{toDateYY(new Date(scope.row.happendate).getTime()-(new Date().getTimezoneOffset()*60000))}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="expectednumber"
                    :label="rs.expected_number">
                  </el-table-column>
                  <el-table-column
                    prop="actualnumber"
                    :label="rs.actual_number">
                  </el-table-column>
                </el-table>
              </div>
              <div class="table_footer" v-if="total">
                <div class="data-counter fl">{{rs.showing}} {{stasize}} to {{endsize}} of {{total}} {{rs.activities}}</div>
                <div class="fr">
                  <el-pagination
                  @current-change="getData('1')"
                  :current-page.sync="data.pagenum"
                  :page-size="data.pagesize"
                  layout="prev, pager, next"
                  :total="total"
                  class="fr">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        </el-col>
        <el-col :span="10">
          <div class="box">
            <div class="box-body">
              <ul class="line_head">
                <li>
                  <div>
                    <img src="../../assets/imgs/page/attendanceResults_1.png" alt="" class="icon" style="padding-bottom: 5px;">
                    <p><span>{{activitydata.title}}</span></p>
                  </div>
                </li>
                <li>
                  <div>
                    <!-- <i class="fa fa-map-marker"></i> -->
                    <img src="../../assets/imgs/page/attendanceResults_2.png" alt="" class="icon" style="padding-bottom: 5px;">
                    <p><span>{{makeAddress(activitydata)}}</span></p>
                  </div>
                </li>
                <li>
                  <div>
                    <!-- <i class="fa fa-clock-o"></i> -->
                    <img src="../../assets/imgs/page/attendanceResults_3.png" alt="" class="icon" style="padding-bottom: 5px;">
                    <p>
                      <span>{{toDate(activitydata.startdate)}}</span>
                      <span v-if="activitydata.startdate&&activitydata.enddate">-</span>
                      <span>{{toTime(activitydata.enddate)}}</span>
                    </p>
                  </div>
                </li>
                <li>
                  <!-- <img src="../../assets/imgs/page/addProject_1.png" alt="" class="icon fl">
                  <span class="fl" v-for="(d, i) in attendlist" :key="i" style="padding-right:10px;">{{newObj[d.departmentid]}}</span> -->
                  <div>
                    <img src="../../assets/imgs/page/attendanceResults_4.png" alt="" class="icon" style="padding-bottom: 5px;">
                    <p><span  v-for="(d, i) in attendlist" :key="i" style="padding-right:10px;">{{newObj[d.departmentid]}}</span></p>
                  </div>
                </li>
                <li>
                  <!-- <div><i class="fa fa-file-text-o"></i></div> -->
                  <div>
                    <img src="../../assets/imgs/page/attendanceResults_5.png" alt="" class="icon" style="padding-bottom: 5px;">
                    <p class="activitydata_contents"><span>{{activitydata.contents}}</span></p>
                  </div>
                </li>
              </ul>
              <div style="padding: 10px;">
                <ul>
                  <li class="clearfix activity"  v-for="(d,i) in activitypunchlist" :key="i">
                    <div class="head fl">
                      <img class="photograph" :src="d.photo" alt="" style="border-radius: 8px;">
                      <i v-if="i!=activitypunchlist.length-1"></i>
                    </div>
                    <div class="fl punchd" >
                      <p>
                        <span class="punchdtext">{{d.firstname}}</span>
                      </p>
                      <p>({{toDate(d.punchdatetime)}})</p>
                      <el-popover
                        placement="left"
                        trigger="click">
                        <div>
                          <img :src="d.punchphoto+'?x-oss-process=image/resize,w_600'" alt="" width="300">
                        </div>
                        <template slot="reference">
                          <span>
                            <img class="mapPhotograph" :src="d.punchphoto+'?x-oss-process=image/resize,w_600'" alt="" style="vertical-align: middle;cursor: pointer;border-radius: 5px;"/>
                          </span>
                        </template>
                      </el-popover>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAttendanceResult, getActivitypunch, getActivity } from '@/api/activityApi.js'
import { getDeparmentList } from '@/api/departmentApi.js'
import { getOptionData1 } from'@/api/optionValueApi.js'
import {formatDate , newDate} from '@/assets/js/time.js'; //时间转换插件
import { toAddressString } from "@/assets/js/utility.js"
export default{
  data() {
    return {
      newObj:{},
      activitydata:{},
      attendlist:[],
      activitypunchlist:[],
      total:0,
      stasize:'',
      endsize:'',
      data:{
        condition:'',  //搜索关键字
        pagesize : 1, //分页
        pagenum :1, //页码
        languagetype:'',
      },
      allList: [],
      pageList:[],
      classlyObj:{},
      countryList:[],
      countryObj:{}
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve),
  },
  computed: {
  ...mapGetters(['rs','languagetype','se'])
  },
    created(){
      this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
      this.data.pagesize = (+JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue)
      this.data.languagetype = localStorage.getItem('languagetype')
      this.arrList(this.data)
      this.countryList =JSON.parse(localStorage.getItem('selectlist')).Country;
          this.countryList.forEach(element => {
              this.countryObj[element.countryid] =element.countryname;
          });
          this.countryObj = Object.assign({},this.countryObj)
    },
    watch:{
      languagetype(val){
        this.data.languagetype = val
        this.arrList(this.data)
      },
    },
    methods:{
      toDate(date){
        // activitydata.startdate
        // let time = formatDate(new Date(date),'yyyy-MM-dd hh:mm')
        if (date) {
           let times = formatDate( newDate(date),'yyyy-MM-dd hh:mm')
          times = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
          times = formatDate( new Date(times),'dd/MM/yyyy hh:mm')
          return times;
        }
       
      },
      toTime(date){
        // activitydata.enddate
        // let time = formatDate(new Date(date),'hh:mm')
        if (date) {
           let times = formatDate( newDate(date),'yyyy-MM-dd hh:mm')
          times = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
          times = formatDate( new Date(times),'hh:mm')
          return times;
        }
      },
      toDateYY(date){
        let time = formatDate(new Date(date),'dd/MM/yyyy')
        return time
      },
    tableClick(row){
      getActivity({taskid:row.taskid,activityid:row.activityid,happendate:row.happendate}).then(res=>{
      if (res.data.success) {
        
        this.activitydata = res.data.activitydata;
        this.attendlist =res.data.attendlist
        this.activitypunchlist = res.data.activitypunchlist
        getDeparmentList().then(res=>{
        if (res.data.success) {
          // this.options5 = res.data.data
          res.data.data.forEach(val => {
          this.newObj[val.departmentid]=val.fullname
          });
          this.newObj = Object.assign({},this.newObj)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
        })
      } else {
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      }
      })
    },
      restoration(){
      this.data.pagenum = 1
      this.data.languagetype = localStorage.getItem('languagetype')
      this.arrList(this.data)
    },
    getData(type){
      if(type=='1'){
        this.arrList(this.data)
      }else{
        this.restoration()
      }
    },
    makeAddress(d) {
      return toAddressString(d)
    },
    arrList(data){
      getAttendanceResult(data).then(res=>{
      if (res.data.success) {
        this.allList = res.data.data
        this.stasize = res.data.start
        this.endsize = res.data.endsize
        this.total = res.data.total
        getOptionData1({keyid1:'01',keyid2:'03',languagetype:localStorage.getItem('languagetype')}).then(res=>{
        if (res.data.success) {
            res.data.data.forEach(val => {
              this.classlyObj[val.code]=val.value
          });
          this.classlyObj = Object.assign({},this.classlyObj)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
        })
      } else {
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

  }
}
</script>

<style scoped>
.line_head li {
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 10px 0;
  border-bottom:1px solid #bbb;
}
.line_head li i{
  padding: 0 10px 0 0;
}
.line_head li>div{
  padding: 0 0 10px 0;
  font-size: 14px;
}
.head_right{
  width: 40%;
  background: white;
}
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
.but_text{
  font-size: 20px;
  font-weight: 700;
}
.but_text:hover{
  cursor:pointer
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
  width: 60%;
  padding-bottom: 10px;
  float: left;
}
.header_titel_left{
  float: right;
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
.sit{
  margin-bottom: 20px;
}
/* @media (max-width:769px){
.head_left,.head_right{
  width: 100%;
}
.header_titel_left{
  float: left;

}
.center_left,.center_right{
  width: 100%;
  padding-bottom: 10px;
}

} */
.activitydata_contents{
  max-height: 135px;
  overflow-y:scroll; 
}
.activitydata_contents::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.activitydata_contents{
  /* min-width: 1000px; */
}
.activitydata_contents::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
   -webkit-box-shadow: inset 0 0 5px #FFF;
  background: #939393;
}
.activitydata_contents::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #FFF;
  border-radius: 10px;
  background: #EDEDED;
} 
.head{
  position: relative;

}
.head>.photograph{
  height: 105px;
  width: 105px;
  vertical-align: middle;
}
.head>i{
  height: 45px;
  border: .5px solid #777;
  position: absolute;
  left: 50%;
  top: 45px;
}
.mapPhotograph{
  width: 60px;
  height: 40px;
}
.punchd{
  margin-left: 20px;
  text-align: left;
  height: 105px;
  line-height: 30px;
}
.activity{
  border-bottom:1px solid #bbb;
  padding: 10px 0px; 
}
.punchdtext{
font-size:12px;
/* font-family:SFUIDisplay-Bold; */
font-weight:bold;
color:rgba(85,91,103,1);
}
.atten_icon{
  height: 44px;
  width: 44px;
}
</style>
