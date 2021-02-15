<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
                <div class="title">
                  <img src="../../assets/imgs/ranking@2x.png" alt=""><span>{{rs.activities_ranking}}</span>
                </div>
              </div>
            </div>
           <div class="box-body">
             <el-row class="card_photo">
              <el-col :span="8">
                <div class="photo">
                  <img style="width:72px" :src="userInfo.photo" alt="">
                </div>
              </el-col>
              <el-col :span="16">
                <div class="title_line">
                  <span class="title">{{rs.activities_ranking}}</span>
                  <span class="content fr" style="color:#FFA500">{{order}}</span>
                </div>
                <div class="title_line">
                  <span class="title">{{rs.rating}} ({{monthObj[month]?monthObj[month]:'-'}}) </span>
                  <span class="content fr">{{totalCount.now}}</span>
                </div>
                <div class="title_line">
                  <span class="title">{{rs.rating}} ({{year?year:'-'}}) </span>
                  <span class="content fr">{{yearTotal}}</span>
                </div>
              </el-col>
            </el-row>
            </div>

          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
                <div class="title">
                  <img src="../../assets/imgs/chart@2x.png" alt=""><span>{{rs.progression_chart}}</span>
                </div>
              </div>
            </div>
           <div class="box-body">
              <div id="chart" style='width:100%;height:300px;background: white;'> </div>  
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
                <div class="title">
                  <img src="../../assets/imgs/activities@2x.png" alt=""><span>{{rs.activities_data}}</span>
                </div>
              </div>
            </div>
           <div class="box-body_t" style="background:#FFF;">
             <el-row class="head_line">
              <el-col :span="6" :offset="6"><div>{{monthObj[month]?monthObj[month]:'-'}}</div></el-col>
              <el-col :span="6"><div>{{monthObj[month]?monthObj[month]:'-'}} vs {{monthObj[month_before]?monthObj[month_before]:'-'}}</div></el-col>
              <el-col :span="6"><div>{{monthObj[month]?replaceString(rs.best_of,'%1',monthObj[month]):'-'}}</div></el-col>
            </el-row>
            <el-row class="line" v-for="(d,index) in dataList" :key="index"> 
              <el-col :span="6"><div class="title">{{salesrs&&salesrs[d]?salesrs[d]:rs[d]}}</div></el-col>
              <el-col :span="6"><div>{{reportsData[labelObj[d]]?reportsData[labelObj[d]].nowdata:''}}</div></el-col>
              <el-col :span="6"><div>{{reportsData[labelObj[d]]?setDiff(reportsData[labelObj[d]].diff):""}}</div></el-col>
              <el-col :span="6"><div>{{reportsData[labelObj[d]]?reportsData[labelObj[d]].max:''}}</div></el-col>
          </el-row>
          <el-row class="total_line">
            <el-col :span="6"><div class="title">{{rs.overall}}</div></el-col>
            <el-col :span="6"><div>{{totalCount.now}}</div></el-col>
            <el-col :span="6"><div>{{setDiff(totalCount.diff)}}</div></el-col>
            <el-col :span="6"><div>{{totalCount.max}}</div></el-col>
          </el-row>
            </div>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col >
          <div class="box" style="margin-top: 20px;">
          <div class="box-header">
              <div class="title">
                <img src="../../assets/imgs/engagements@2x.png" alt=""><span>{{rs.project_engagements}} ({{rs.this_month}})</span>
              </div>
            </div>
          </div>
          <div class="box-body">
            <div v-if="projectList.length == 0" style="text-align: center;font-size:16px;padding:20px">
              {{rs.no_data}}
            </div>
            <el-row :gutter="20" class="project_box">
              <el-col class="project_eng" v-for="(d,index) in projectList" :key="index" :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
                <div class="project_img">
                  <img  :src="d.filepath  +'?x-oss-process=image/resize,m_fixed,h_400,w_600'" alt="">
                  <div class="project_pv">{{rs.pv}}:{{d.pv}}</div>
                </div>
                 <p class="name">{{d.shortname}}</p>
                 <p class="address">{{setAddressString(d)}}</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- Engagements -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from "vuex";
import { getMonthlySummary, getEveryMonth, getTopProject, getAgentData } from '@/api/agentApi.js'
import { getOrdinal, toSignNumber, toAddressString } from '../../assets/js/utility.js'
import echarts from 'echarts'
export default{
  data() {
    return {
      agentid:'',
      userInfo: {},
      reportsData:{},
      labelObj:{},
      monthObj:{},
      dataList:[],
      agentDataList:[],
      avgDataList:[],
      maxDataList:[],
      totalCount:{},
      month:'',
      year:'',
      order:0,
      yearTotal:0,
      month_before:'',
      monthList:[],
      projectList:[]
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
  },
  methods:{
    getMonthlySummaryList(id){
      getMonthlySummary({agentid:id}).then(res=>{
        if(res.data.success){
          this.reportsData = res.data.data;
          this.totalCount = res.data.count;
          this.month = res.data.month;
          if(this.month<10){
            this.month = '0' + this.month;
          }
          this.year = res.data.year;
          this.yearTotal =res.data.total;
          this.order = getOrdinal(res.data.order);
          this.month_before = this.setMonthBefore(this.month)
          this.dataList = ['call','sms','email','meeting','new_clients','sta_reservation_pending','sta_reservation_approved','sta_unconditional_exchanged','sta_settled','agent_app_engagement']
        }
      })
    },
    getEveryMonthList(id){
      getEveryMonth({agentid:id}).then(res=>{
        if(res.data.success){
            res.data.agent.forEach(ele =>{ this.agentDataList.push(ele.value)})
            res.data.avg.forEach(ele =>{ this.avgDataList.push(ele.value) })
            res.data.max.forEach(ele =>{ this.maxDataList.push(ele.value) })
            this.drawLine();
        }
      })
    },
    getTopProjectList(id){
      getTopProject({agentid:id}).then(res=>{
        if(res.data.success){
          this.projectList = res.data.data;
        }
      })
    },
    getAgentInfo(data){
      getAgentData(data).then(res=>{
        if(res.data.success){
          this.userInfo = res.data.data;
        }
      })
    },
    setMonthBefore(d){
      if(d == '01'){
        return '12'
      }else{
        let m = parseInt(d)-1;
        if(m<10){
          return '0'+ m
        }else{
          return m
        }
      }
    },
    replaceString(oldStr, repStr, newStr) {
      return oldStr.replace(repStr, newStr)
    },
    setAddressString(d){
      return toAddressString(d)
    },
     setDiff(num){
      return toSignNumber(num)
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('chart'))
       
        // 绘制图表
        myChart.setOption({
            title: {
              text: ''
            },
            tooltip: {trigger: 'axis'},
            legend: {
              data:['Best','This Member','Average']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data:this.monthList
              // data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                  name:'Best',
                  type:'line',
                  stack: '总量1',
                  data: this.maxDataList
                  // data:[100, 200, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
              },
              {
                  name:'This Member',
                  type:'line',
                  stack: '总量2',
                  data: this.agentDataList
                  // data:[200, 300, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210]
              },
              {
                  name:'Average',
                  type:'line',
                  stack: '总量3',
                  data: this.avgDataList
                  // data:[300, 400, 201, 154, 190, 330, 410, 101, 134, 90, 230, 210]
              },
             
          ]
        });
         myChart.on('click', function (params) {
            // 控制台打印数据的名称
        });
         window.addEventListener('resize', function () {
          myChart.resize();
        });
    },
    goRouter(path){
      this.$router.push({path})
    },
     goMoreRouter(path,data){
          this.$router.push({
              path:path,
              query: {
                  ifmore: data
              }
          })
      },
  },
  created(){

    JSON.parse(localStorage.getItem("selectlist")).MONTH_LIST.forEach(element => {
      this.monthObj[element.code] = element.extvalue;
      this.monthList.push(element.extvalue)
    });
    this.labelObj={
      call:'call',
      sms:'sms',
      email:'email',
      meeting:'meeting',
      new_clients:'new_clients',
      sta_reservation_pending:'reservation',
      sta_reservation_approved:'reservation_approved',
      sta_unconditional_exchanged:'exchanged',
      sta_settled:'settled',
      agent_app_engagement:'agent_app_engagement',
    }
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.agentid = this.$route.params.id;
    this.getAgentInfo({agentid:this.agentid,languagetype:this.languagetype});
    this.getEveryMonthList(this.agentid);
    this.getMonthlySummaryList(this.agentid);
    this.getTopProjectList(this.agentid);
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','salesrs']),
    readonly(){
      return true
      // if(this.control.dashboard ==='02'){
      //   return true
      // }else{
      //   return false
      // }
    }
  },
  watch:{
    se(val){
      this.monthList = [];
      val.MONTH_LIST.forEach(element => {
        this.monthObj[element.code] = element.extvalue;
        this.monthList.push(element.extvalue)
      });
    },
    languagetype(val){
      this.getEveryMonthList(this.agentid);
      // this.getMonthlySummaryList(this.agentid);
      // this.getTopProjectList();
    }
  },
}
</script>
<style lang="scss" scoped>
  .box-body_t {
    padding:0 20px 49px 20px;
    .line{
      border-bottom: 1px solid #E4E4E4;
      padding: 12px 10px;
      font-size: 14px;
      color: #555B67;
    }
    .head_line {
      padding: 15px 10px 10px 10px;
      font-size: 14px;
      font-weight: bold;
      color: #555B67;
    }
    .total_line{
      padding-top: 15px;
      font-size: 14px;
      font-weight: bold;
      color: #FFA500;
    }
  }
  .box-header {
    border-bottom: 1px solid #E4E4E4;
  }
  .box-body {
    background: #FFF;
    padding-bottom: 15px;
    .project_box{
      padding: 0 20px;
      .project_eng {
        margin-top: 15px;
        height: 225px;
        .project_img{
          height: 172px;
          overflow: hidden;
          position: relative;
          .project_pv {
            position:absolute;
            top: 0;
            height: 26px;
            line-height: 26px;
            background: #000;
            width:100%;
            color: #FFF;
            padding-left: 15px;
            font-size: 12px;
            opacity:0.6;
          }
          img{
            width: 100%;
            height: 100%;
            object-fit:cover;
          }
        }
        .name{
          padding-top: 10px;
          color:#555B67;
          height: 20px;
          line-height: 20px;
          font-size: 13px;
          white-space: nowrap;
          text-overflow:ellipsis;
          overflow: hidden;
          font-weight: bold;
        }
        .address{
          color: #555B67;
           height: 20px;
          font-size: 12px;
          line-height: 20px;
          white-space: nowrap;
          text-overflow:ellipsis;
          overflow: hidden;
        }
      }
    }
    .card_photo{
      padding: 15px 40px 0 20px;
      color: #555B67;
      font-size: 14px;
      font-weight: bold;
      .title_line {
        padding: 8px 0;
      }
      .photo{
        width: 72px;
        height: 72px;
        border-radius: 36px;
        border: 1px solid #e4e4e4;
        overflow: hidden;
      }
    }
  }
</style>