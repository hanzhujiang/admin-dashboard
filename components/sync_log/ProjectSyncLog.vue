<template>
  <div>
    <div class="wrapper-condition clearfix">
      <el-row >
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <page-size :unit='rs.logs' @changeSize="handleSizeChange"></page-size>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="checkbox_box">
          <div class="filter">
            <span class="filter-text">{{rs.status}}:</span>
            <el-select v-model="getData.status" placeholder="" style="margin-right: 10px;" size="mini" @change="search">
              <el-option
                :label="rs.all"
                :value="null">
              </el-option>
              <el-option
                :label="rs.success"
                value="1">
              </el-option>
              <el-option
                :label="rs.failed"
                value="0">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <div class="filter">
            <span class="filter-text">{{rs.sync_date_time}}:</span>
            <el-date-picker size="small" v-model="getData.startdatetime" @change="search"
              format="dd/MM/yyyy HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetime" clearable placeholder="">
            </el-date-picker>
            <span class="filter-text">-</span>
            <el-date-picker size="small" v-model="getData.enddatetime" @change="search"
              format="dd/MM/yyyy HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetime" clearable placeholder="">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="box">
          <div class="filter-search fr">
            <el-input :placeholder="rs.search_logs" clearable v-model="getData.condition" 
                class="input-key" autocomplete="off" size='mini' @change="search" @keyup.enter='search'>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-table
                  :data="syncList"
                  :empty-text = rs.no_data
                  style="width: 100%"
                  tooltip-effect="light"
                  size="mini"
                  :row-class-name="tableRowClassName">
                  <el-table-column
                    :label="rs.sync_date_time">
                    <template slot-scope="scope">
                      <span :class="scope.row.status==0?'yellow':''">{{ scope.row.synctimestamp }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.agency">
                    <template slot-scope="scope">
                      <span :class="scope.row.status==0?'yellow':''">{{ scope.row.agencyname }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.external_type">
                    <template slot-scope="scope">
                      <span :class="scope.row.status==0?'yellow':''">{{ scope.row.externaltype }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.operate_type">
                    <template slot-scope="scope">
                    <span :class="scope.row.status==0?'yellow':''">
                      {{ scope.row.operatetype == 2 ? 'Trigger Updated Project' : 'Action Update' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.status">
                    <template slot-scope="scope">
                    <span :class="scope.row.status==0?'yellow':''">{{ scope.row.status==1?rs.success:rs.failed }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.sync_data"
                    width="100px">
                  <template slot-scope="scope">
                    <span class="btntext" @click="showData(scope.row)">{{rs.show}}</span>
                  </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="table_footer" v-if="total">
                <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.logs}}</div>
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
    <show-data :sync="dialogShow" :data="syncData.jsondata" @update:sync="dialogShow=false"></show-data>
  </div>
</template>

<script>
import { getProjectSyncData, getProjectOneSyncData } from '@/api/syncApi.js'
import { formatJson } from '../../assets/js/utility.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      total:0,//总条数
      start:1,//起始页
      end:10, //结束页
      syncList:[],
      syncData:{},
      getData:{
        pagenum:1,
        pagesize:20,
        status:null,
        startdatetime:'',
        enddatetime:'',
        condition:''
      },
      dialogShow:false,
    }
  },
  components: {
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve),
    'show-data':resolve=> require(['./ShowData.vue'],resolve)
    },
  created(){
    // 获取语言资源表数据
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.getSyncList(this.getData);
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.all_sync_log ==='02'){
        return true
      }else{
        return false
      }
    },
  },
  methods:{
    // 分页方法
    handleSizeChange(val) {//一页多少条
      this.getData.pagenum =1;
      this.getData.pagesize = val;
      this.getSyncList(this.getData)
    },
    handleCurrentChange(val) {//第几页
      this.getData.pagenum = val;
      this.getSyncList(this.getData)
    },
    showData(row) {
      this.dialogShow = true;
      this.getSyncData(row);
    },
    search() {
      this.getData.pagenum = 1;
      this.getSyncList(this.getData);
    },
    getSyncData(data){
      let param = {
        agencyid: data.agencyid,
        externaltype: data.externaltype,
        syncdatetime: data.synctimestamp
      }
      getProjectOneSyncData(param).then(res=>{
        if(res.data.success){
          this.syncData = res.data.data;
          this.syncData.jsondata = formatJson(res.data.data.jsondata);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getSyncList(data){
      getProjectSyncData(data).then(res=>{
        if(res.data.success){
          this.syncList = res.data.data;
          this.total = res.data.total;
          this.end = res.data.end;
          this.start = res.data.start;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    tableRowClassName(scope,rowIndex){
      if(scope.row.status == '0'){
        return 'bg_red'
      }else{
        return ''
      }
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