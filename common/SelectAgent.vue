<template>
  <el-dialog
    title="Builder"
    :close-on-click-modal='false'
    @close="$emit('update:sync')"
    :visible.sync="visible"
    :sync="sync"
    width='60%'>
    <template slot="title">
      <div class="dialog-header">
        <span class="title">{{rs.select_agent}}</span>
      </div>
    </template>
    <div class="dialog-body">
      <el-row>
        <div class="filter-search fr" style="width:50%" >
          <el-input :placeholder="rs.search_agents" 
            v-model="getAgentData.condition" class="input-key" clearable size='mini' @change="search" @keyup.enter='search'>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-row>
      <el-row>
        <el-table
          :data="AgentList"
          style="width: 100%; margin-top:5px;"
          :empty-text = rs.no_data
          :show-overflow-tooltip="true"
          size="mini">
          <el-table-column
            :label="rs.name">
            <template slot-scope="scope">
              <span>{{ scope.row.firstname }}<span>&nbsp;</span> {{scope.row.lastname}}</span>
          </template>
          </el-table-column>
          <el-table-column
            :label="rs.department">
            <template slot-scope="scope">
              <span>{{ scope.row.fullname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="rs.phone_number">
            <template slot-scope="scope">
              <span>{{ scope.row.phonenumber }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="rs.email">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column 
            :label="rs.action"
            width="115">
            <template slot-scope="scope">
              <span class="btntext" @click="handleSelect(scope.row)">{{rs.select}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <el-row class="dailog-footer" style="margin-top:5px" v-if="agentTotal">
      <el-pagination 
      :background="false"
      @size-change="handleSizeChangeAgent"
      @current-change="handleCurrentChangeAgent"
      :current-page="getAgentData.pagenum"
      layout="prev, pager, next"
      :page-size="getAgentData.pagesize"
      :total="agentTotal" class="fr">
      </el-pagination>
    </el-row>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getAgentList } from '@/api/agentApi.js'
export default{
  data() {
    return {
      visible: this.sync,
        getAgentData:{
        languagetype: '',
        pagenum:1,
        pagesize:10,
        isactived:'1',
        condition:''
      },
      AgentList:[],
      agentTotal:0
    }
  },
  props:['sync'],
  watch:{
    sync(val){
      this.visible = this.sync;
      if(val){
        this.getAgentData.pagenum =1;
        this.getAgent(this.getAgentData)
      }
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype'])
  },
  created(){
    this.getAgent(this.getAgentData);
  },
  methods: {
    handleSelect(row){
      this.$emit('select', row)
    },
    getAgent(data){
      getAgentList(data).then(res=>{
        if(res.data.success){
          this.AgentList = res.data.data;
          this.agentTotal = res.data.total;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 分页 Agent
    handleSizeChangeAgent(val){
      this.getAgentData.pagesize = val;
      this.getAgent(this.getAgentData)
    },
    handleCurrentChangeAgent(val){
      this.getAgentData.pagenum = val;
      this.getAgent(this.getAgentData)
    },
    search(){
      this.getAgentData.pagenum =1;
      this.getAgent(this.getAgentData)
    }
  }
}
</script>
