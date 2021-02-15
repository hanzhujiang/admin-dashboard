<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.department_manage}}</span>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div class="side_tab">
            <div class="side_tab_box">
              <div class="box-header" >
                <div class="title" >
                  <img src="../../assets/imgs/page/departments_1.png" alt="">
                  <span >{{companyName}}</span>
                </div>
                <div class="tools">
                  <span v-if="!readonly" @click="DepartShow('1')" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_department}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body" >
                <p class="unbelong_area" style="height: 28px;">
                  <span style="padding: 10px;">{{rs.no_belong}}({{NoDepartmentTotal===0?'0':NoDepartmentTotal}})</span>
                  <span class="btntext fr"  @click="arrStaff"  v-if="NoDepartmentTotal !=0&&!readonly">{{rs.show}}</span>
                  <!-- <el-button size="mini" class="mini bg_green fr" @click="arrStaff">
                    <i class="fa fa-arrow-right" style="padding:0"></i>
                  </el-button> -->
                </p>
                <el-tree
                  :data="terrData"
                  :props="defaultProps"
                  :empty-text="rs.no_data"
                  :expand-on-click-node="false"
                  default-expand-all
                  @node-click="handleNodeClick"
                  style="font-size:18px;padding:10px;">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <el-row class="terr-text">
                      <el-col :span="16">
                        <div>
                          <span> <i :class="node.icon"></i>{{node.label}}<span v-if="data.issupportteam=='1'"> [S]</span></span>
                          <span style="font-size:12px;">({{data.count}})</span>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div>
                          <span class="btntext fr"    @click="remove(node, data)"  v-if="!readonly"><i class="el-icon-delete"></i></span>
                          <span class="btntext fr"   @click="append(data)"  v-if="!readonly"><i class="el-icon-edit"></i></span>
                          <span class="btntext fr"  @click.stop="handleActivities(data)"  v-if="!readonly"><i class="el-icon-document"></i></span>
                        </div>
                      </el-col>
                    </el-row>
                    
                    
                  </span>
                </el-tree>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 新增 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" v-if="isDepar">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="box" >
                <div class="box-header">
                    <div class="title">
                      <img src="../../assets/imgs/ranking@2x.png" alt=""><span>{{rs.activities_ranking}}</span>
                    </div>
                  </div>
                </div>
              <div class="box-body">
                <el-row class="card_photo">
                  <!-- <el-col :span="8">
                    <div class="photo">
                      <img style="width:72px" :src="userInfo.photo" alt="">
                    </div>
                  </el-col> -->
                  <el-col :span="24">
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
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
                  <el-col :span="6"><div>{{reportsData[labelObj[d]]?reportsData[labelObj[d]]['nowdata']:''}}</div></el-col>
                  <el-col :span="6"><div>{{reportsData[labelObj[d]]?setDiff(reportsData[labelObj[d]]['diff']):""}}</div></el-col>
                  <el-col :span="6"><div>{{reportsData[labelObj[d]]?reportsData[labelObj[d]]['max']:''}}</div></el-col>
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
                    <img src="../../assets/imgs/engagements@2x.png" alt=""><span>{{rs.project_engagements}}</span>
                  </div>
                </div>
              </div>
              <div class="box-body">
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
        </el-col>
        <!-- end -->
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" v-if="!isDepar">
          <div class="box">
            <div class="box-body">
              <el-row :gutter="20" >
                <el-col :span="24">
                  <div class="table_box">
                    <el-row style="padding:15px">
                      <div class="filter-search fr">
                        <el-input :placeholder="rs.search_agents" clearable v-model="condition" class="input-key" autocomplete="off" size='mini' @change="search" @keyup.enter='search'>
                          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                      </div>
                    </el-row>
                    <div v-if="baseList.length == 0" style="text-align: center;font-size:16px;padding:20px">
                      {{rs.no_data}}
                    </div>
                    <el-row :gutter="20" >
                      <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6" v-for=" (d,i) in baseList" :key="i" >
                        <div :class="[d.status==0?'card_box':'card_boxBg_gray']">
                           <div class="inactive" v-if="d.isactived ==0">{{rs.inactive}}</div>
                          <div class="img_box" style="height:200px;overflow: hidden;">
                            <img :src="d.photo" v-if="d.photo">
                            <img v-else src="../../assets/imgs/no_photo.jpg" alt="">
                          </div>
                          <div class="clearfix">
                            <p class="name_line">{{d.firstname}} {{d.lastname}} </p>
                            <div>
                              <span slot="btn">
                                <el-button   size="mini" :class="d.ismanager==1?'mini bg_green ismanagerColor':'mini smallColor'" v-if="!readonly&&d.status!='0'&&isBeDeparment"  @click="setDepartHead(d)">
                                  {{rs.manager}}
                                </el-button>
                              </span>
                              <p class="tools_line">

                              <span @click="upStaff(d)" v-if="!readonly">
                                <!-- <i class="fa fa-refresh" v-if="isBeDeparment"></i>
                                <i class="fa fa-plus" v-else></i> -->
                                <img class="icon" src="@/assets/imgs/common/common_12.png" alt="" v-if="isBeDeparment">
                                <img class="icon" src="@/assets/imgs/common/common_13.png" alt="" v-else>
                              </span>
                              <span @click="goRouter('/teams_manage/departments/agentDetail','3',d)">
                                <img class="icon" src="@/assets/imgs/common/common_7.png" alt="">  
                              </span>
                            </p>
                            </div>

                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table_footer" v-if="total">
                    <el-row >
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div>
                          <el-pagination
                          @current-change="handleCurrentChange"
                          :page-size="pagesize"
                          :current-page.sync="pagenum"
                          layout="prev, pager, next"
                          :total="total"
                          class="fr">
                          </el-pagination>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>
    <!-- 添加弹出 -->
    <el-dialog
      title=""
      :close-on-click-modal='false'
      :visible.sync="dialogShow"
      width='50%'
      >
      <template slot="title">
        <div class="dialog-header">
          <!-- <i class="fa fa-sitemap"></i> -->
          <span class="title">{{rs.department}}
            <span>{{addOrEdit}}</span>
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.full_name}}<span class="required">*</span></div>
              <div class="content">
                <el-input v-model="formData.fullname" size="small" clearable @blur="validatorBlur('fullname')" maxlength="100"></el-input>
                 <p class="curtail" v-show="validatorSave.fullname.flg">{{rs[validatorSave.fullname.msg]}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="form-group">
              <div class="sub-title">{{rs.short_name}}<span class="required">*</span></div>
              <div class="content">
                <el-input v-model="formData.shortname" size="small" clearable @blur="validatorBlur('shortname')" maxlength="30"></el-input>
                <p class="curtail" v-show="validatorSave.shortname.flg">{{rs[validatorSave.shortname.msg]}}</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="12" :xl="12">
            <div class="form-group">
              <div class="sub-title">{{rs.upper_level_department}}</div>
              <div class="content">
                <el-select v-model="pid" size="small" style="width:100%;"   placeholder="" clearable >
                  <el-option
                  v-for="item in options"
                  :key="item.departmentid"
                  :label="item.fullname"
                  :value="item.departmentid">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="form-group">
              <div class="sub-title"><el-checkbox v-model="formData.issupportteam">{{rs.support_team}}</el-checkbox></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" @click="DepartShow" class="small">
              <!-- <i class="fa fa-close"></i> -->
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="addDepart">
              <!-- <i class="fa fa-save"></i> -->
              {{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 修改弹出 -->
    <el-dialog
      title=""
      :close-on-click-modal='false'
      :visible.sync="modifierShow"
      width='30%'
      >
      <template slot="title">
        <div class="dialog-header">
          <!-- <i class="fa fa-users"></i> -->
          <span class="title">{{rs.agent}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.department}}</div>
              <div class="content">
              <el-select v-model="staffValue" size="small" style="width:100%;"  placeholder="" clearable  :disabled="readonly">
                <el-option
                v-for="item in options"
                :key="item.departmentid"
                :label="item.fullname"
                :value="item.departmentid">
                </el-option>
              </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   @click="modifier" class="small" style="color:#000;">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="saveStaff" :disabled="readonly">
              <!-- <i class="fa fa-save"></i> -->
              {{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDepartmentTree, getAgentByDeptID, getDeparmentList, insertDepartment, updateAgentBelong, 
        updateDepartment, getUpLevelDept, deleteDepartment, getAgentOutsideDepartment, 
        deleteDepartmentMgr, insertDepartmentMgr } from '@/api/departmentApi.js'
import { getDepartMonthlySummary, getDepartMonthData ,getTopProject} from '@/api/agentApi.js'
import { mapGetters } from "vuex";
import { getOrdinal, toSignNumber, toAddressString } from '../../assets/js/utility.js'
import { validator, allvalidator} from '@/validator/validator.js'
import echarts from 'echarts'

export default{
  data() {
    return {
      condition:'',//查询agent条件
      departmentid:'',
      userInfo: {},
      labelObj:{},
      reportsData:{},
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
      projectList:[],
      // 
      mag:"",
      isDepar:false,
      addOrEdit:'',
      formData:{
        fullname:'',
        shortname:'',
        issupportteam:false
      },
      validatorSave:{
      fullname:{
        vaid:['noNull'],
        flg:false
      },
      shortname:{
        vaid:['noNull'],
        flg:false
      },
      },
        getData:{
        languagetype:''
      },
      pagesize:16,
      falg:'',
      endId:'',
      dialogShow:false,//弹出层显示隐藏
      modifierShow:false,
      baseList:[],//列表数据
      options:[],
      // fullname:null,
      // shortname:null,
      select: 0,
      companyName:null,
      staffId:null,
      // departSelValue:null,
      staffValue:null,
      depId:null,
      terrData: [],

      defaultProps: {
      children: 'children',
      label: 'fullname',

      },
      total:0,
      NoDepartmentTotal:'0',
      pagenum:1,

      pid:0,
      popData:[],
      log:''
    }
  },
  created(){
    JSON.parse(localStorage.getItem("selectlist")).MONTH_LIST.forEach(element => {
      this.monthObj[element.code] = element.extvalue;
      this.monthList.push(element.extvalue)
    });
    this.getTopProjectList()
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.initializeData(this.getData)
    // this.getCount()
      getAgentOutsideDepartment().then(res=>{
      if (res.data.success) {
        this.NoDepartmentTotal = res.data.total
      } else {
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      }
    })
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
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.initializeData(this.getData)
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
    computed: {
    ...mapGetters(['se','rs','languagetype','control','salesrs']),
    readonly(){
      if(this.control.department ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    handleActivities(d){
      this.isDepar = true;
      this.getEveryMonthList(d.id);
      this.getMonthlySummaryList(d.id);
      this.getTopProjectList({departmentid:d.id})

    },
    getTopProjectList(data){
      getTopProject(data).then(res=>{
        if(res.data.success){
          this.projectList = res.data.data;
        }
      })
    },
    getMonthlySummaryList(id){
      getDepartMonthlySummary({departmentid:id}).then(res=>{
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
          this.dataList = ['call','sms','email','meeting','new_clients','sta_reservation_pending','sta_reservation_approved','sta_unconditional_exchanged','sta_settled','agent_app_engagement'];
        }
      })
    },
    getEveryMonthList(id){
      this.agentDataList = [];
      this.avgDataList = [];
      this.maxDataList =[];
      getDepartMonthData({departmentid:id}).then(res=>{
        if(res.data.success){
            res.data.agent.forEach(ele =>{ this.agentDataList.push(ele.value)})
            res.data.avg.forEach(ele =>{ this.avgDataList.push(ele.value) })
            res.data.max.forEach(ele =>{ this.maxDataList.push(ele.value) })
            this.drawLine();
        }
      })
    },
    search(){
      var params = {
        pagesize:this.pagesize,
        pagenum:this.pagenum,
        departmentid:this.depId,
        condition:this.condition
      }
      if (this.isBeDeparment) {
        this.getDepartmentAgent(params,'search')
      }else{
        delete params.departmentid
        this.noArrAdeparment(params,'search')
      }
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
              data:['Best','This Department','Average']
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
                  name:'This Department',
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
    //树状图初始化数据
    initializeData(data){
      // let data = {
      //   languagetype:JSON.parse(localStorage.getItem('userInfo')).languagetype
      // }
      getDepartmentTree(data).then(res=>{
        if(res.data.success){
          this.companyName = res.data.agency.shortname
          this.terrData = res.data.data
          this.log = res.data.agency.logoimagedark
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 设置部门负责人
    setDepartHead(d){
      if(d.status == 0){
        this.$message({
          message: this.$message.error(this.rs.err_msg_db_update_failed),
          type: 'warning'
          });
      }else{
        if(d.ismanager !=1){
          insertDepartmentMgr({departmentid:d.departmentid,agentid:d.agentid}).then(res=>{
            if(res.data.success){
              var params = {
                departmentid : d.departmentid,
                pagenum:this.pagenum,
                pagesize:this.pagesize,
                condition:this.condition
              }
              this.$message.success(this.rs.info_msg_update_success)
              this.getDepartmentAgent(params)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }else{
          deleteDepartmentMgr({ids:d.agentid}).then(res=>{
            if(res.data.success){
              var params = {
                departmentid : d.departmentid,
                pagenum:this.pagenum,
                pagesize:this.pagesize,
                condition:this.condition
              }
              this.$message.success(this.rs.info_msg_update_success)
              this.getDepartmentAgent(params)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }
      }
    },
    //新增
    getCount(){
      getDeparmentList().then(res=>{
        if(res.data.success){
          this.options = res.data.data
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //弹窗
    DepartShow(isAdd){
      
      this.addOrEdit = '[add]'
      this.getCount()
      this.validatorSave.fullname.flg = false
      this.validatorSave.shortname.flg = false
      this.falg = "1"
      this.dialogShow = !this.dialogShow;
      if (isAdd=='1') {
        this.formData.fullname = ''
        this.formData.shortname = ''
        this.pid = ''
        this.formData.issupportteam = false
      }
    },
    modifier(){
      this.modifierShow = !this.modifierShow
    },
    handleNodeClick(data) {
      this.isDepar = false;
      this.pagenum=1
      this. depId = data.id
      this.condition = ''
      var params = {
        departmentid : data.id,
        pagenum:this.pagenum,
        pagesize:this.pagesize,
        condition:this.condition
      }
      this.getDepartmentAgent(params)
      this.isBeDeparment = true
    },
    arrStaff(){
      this.isBeDeparment = false
      this.isDepar = false
      this.pagenum=1
      let data = {
        pagenum:this.pagenum,
        pagesize:this.pagesize
      }
      this.noArrAdeparment(data)
    },
    //分页
    handleCurrentChange(){
      var params = {
        pagesize:this.pagesize,
        pagenum:this.pagenum,
        departmentid:this.depId,
        condition:this.condition
      }
      if (this.isBeDeparment) {
        this.getDepartmentAgent(params)
      }else{
        delete params.departmentid
        this.noArrAdeparment(params)
      }
    },
    // 没部门的人员数据
    noArrAdeparment(params,type){
      getAgentOutsideDepartment(params).then(res=>{
        if (res.data.success) {
          if(type !='search'){
            this.NoDepartmentTotal = res.data.total
          }
          this.total = res.data.total
          this.baseList = res.data.data
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //所有数据
    getDepartmentAgent(params,type){
      getAgentByDeptID(params).then(res=>{
        if(res.data.success){
          this.baseList = res.data.data
          this.total = res.data.total
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    goRouter(path,id,d){
      this.$router.push({path, name:'agent_detail',query :{ id }})
      sessionStorage.setItem('addagentData',JSON.stringify(d))
    },
    // 保存修改
    addDepart(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      this.formData.issupportteam == true?this.formData.issupportteam = '1' : this.formData.issupportteam = '0' 
      if (this.falg=='1') {
        var insertData = {
        upperleveldepartmentid:this.pid?this.pid:'0',
        fullname:this.formData.fullname,
        shortname:this.formData.shortname,
        issupportteam:this.formData.issupportteam
        };
      insertDepartment(insertData).then(res=>{
        if (res.data.success) {
          this.dialogShow = false
          this.initializeData(this.getData)
          this.pid = ''
          this.formData.shortname = ''
          this.formData.fullname = ''
          this.$message.success(this.rs.info_msg_insert_success)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
      } else {
        var params = {
          fullname:this.formData.fullname,
          shortname:this.formData.shortname,
          departmentid:this.endId,
          upperleveldepartmentid:this.pid?this.pid:'0',
          issupportteam:this.formData.issupportteam
        }
        updateDepartment(params).then(res=>{
          if (res.data.success) {
            this.dialogShow = false
            this.initializeData(this.getData)
            this.$message.success(this.rs.info_msg_update_success)
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    //更新员工弹出
    upStaff(d){
      this.popData = d
      this.getCount()
      this.modifierShow = !this.modifierShow
      this.staffId = d.agentid
      this.staffValue = d.departmentid
      } ,
      //保存
      saveStaff(){
        this.modifierShow = false
        var staffData = {
          agentid:this.staffId,
          departmentid:this.staffValue
        }
        updateAgentBelong(staffData).then(res=>{
          if (res.data.success) {
          this.noArrAdeparment()
          this.initializeData(this.getData)
          for(var i=0;i<this.baseList.length;i++){
            if (this.baseList[i].departmentid == this.popData.departmentid) {
              this.baseList.remove(this.baseList[i])
              this.$message.success(this.rs.info_msg_update_success)
            }
          }
          this.staffValue =''
          } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      },
    append(data){
      this.isDepar = false;
      this.addOrEdit = '[Edit]'
      this.validatorSave.fullname.flg = false
      this.validatorSave.shortname.flg = false
      if(data.pid==0){
        this.pid=''
      }else{
        this.pid = (+data.pid)
      }

      this.endId = data.id
      this.falg = "0"
      this.dialogShow = !this.dialogShow;
      this.formData.shortname = data.shortname
      this.formData.fullname = data.fullname
      data.issupportteam=='1'?this.formData.issupportteam = true:this.formData.issupportteam = false
       
      getUpLevelDept({departmentid:this.endId}).then(res=>{
        if (res.data.success) {
          this.options = res.data.data
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    remove(node,data){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteDepartment({ids:data.id}).then(res=>{
          if (res.data.success) {
            this.initializeData(this.getData)
            this.$message({
              type: 'success',
              message: this.rs.info_msg_delete_success
            });
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
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
  }
}
</script>

<style scoped lang="scss">
.btntext {
  padding: 0 5px!important;
}
.terr-text {
  width: 100%;
  display: inline-block;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;
}
.company_area{
  line-height: 40px;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #EEE;
  padding: 10px;
}
.unbelong_area{
  line-height: 20px;
  font-size: 14px;
  padding: 5px 20px 5px 10px;
}
.card_box{
  margin-bottom: 10px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.3);
  border: 1px solid #EEE;
  padding: 10px 10px 20px 10px ;
  height: 240px;
  background: rgb(185, 243, 253);
}
.card_boxBg_gray{
  margin-bottom: 10px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.3);
  border: 1px solid #EEE;
  height: 240px;
  padding: 10px 10px 20px 10px ;
}
.card_box{
  overflow: hidden;
}
.card_box .img_box {
  background: #CCC;
}

.card_box>.img_box>img,.card_boxBg_gray>.img_box>img{
  max-width: 100%;
  max-height: 200px;
}

.card_box p.name_line,.card_boxBg_gray p.name_line{
  line-height: 25px;
  text-align: center;
  font-size: 15px;
  height: 25px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card_box p.tools_line,.card_boxBg_gray p.tools_line{
  float: right;
  margin-top:5px;
}
p.tools_line > span {
  padding: 0px 5px;
}

.bg_gray{
  background: #EEE;
}
.add_edit{
  font-size: 10px;
  font-weight: bold;
  color: blue;
}
/* @media (max-width:769px){
  .cartoonMaxW{
  width: 96%;
}
} */
.smallColor{
  color: #000;
}
.ismanagerColor {
  color:#FFF;
}
.ismanagerColor:hover{
  color: #409EFF;
}
.smallColor:hover{
  color: #409EFF;
}

/* 新增右侧样式 */
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
<style>
.side_tab_box .el-tree-node__content{
  height:40px;
}
</style>
