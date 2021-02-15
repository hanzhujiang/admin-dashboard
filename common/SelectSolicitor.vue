<template>
  <el-dialog
    title="Solicitor"
    :close-on-click-modal='false'
    @close="$emit('update:sync')"
    :visible.sync="visible"
    :sync="sync"
    width='70%'>
    <template slot="title">
      <div class="dialog-header">
        <span class="title">{{rs.select_solicitor}}</span>
      </div>
    </template>
    <div class="dialog-body">
      <el-row >
        <div class="filter-search fr" style="width:50%" >
          <el-input :placeholder="rs.search_solicitors" v-model="getSolicitorData.condition" 
            class="input-key" size='mini' clearable @change="search" @keyup.enter='search'>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-row>
      <el-row>
        <el-table
          :data="SolicitorList"
          tooltip-effect="light"
          :empty-text = rs.no_data
          style="width: 100%; margin-top:5px;"
          size="mini">
          <el-table-column
            prop="shortname"
            :label="rs.firm">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            :label="rs.name">
            <template slot-scope="scope">
            <span>{{scope.row.firstname}}&nbsp;{{scope.row.lastname}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobilenumber"
            width="160"
            :label="rs.phone_number">
          </el-table-column>
          <el-table-column
            prop="email"
            :show-overflow-tooltip="true"
            :label="rs.email">
          </el-table-column>
          <el-table-column
           :label="rs.action"
            width="120px">
            <template slot-scope="scope">
              <span class="btntext" @click="handleSelect(scope.row)">{{rs.select}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
     <el-row class="dailog-footer" style="margin-top:5px"  v-if="SolicitorTotal">
      <el-pagination
        :background="false"
        @size-change="handleSizeChangeSolicitor"
        @current-change="handleCurrentChangeSolicitor"
        :current-page="getSolicitorData.pagenum"
        layout="prev, pager, next"
        :total="SolicitorTotal" class="fr">
      </el-pagination>
    </el-row>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getSolicitorList } from '@/api/solicitorApi.js'
export default{
  data() {
    return {
      visible: this.sync,
        getSolicitorData:{
        languagetype: '',
        pagenum:1,
        pagesize:10,
        isactived:'1',
        condition:'',
        isactived:'1'
      },
      SolicitorList:[],
      SolicitorTotal:0
    }
  },
  props:['sync'],
  watch:{
    sync(val){
      this.visible = this.sync;
      if(val){
        this.getSolicitorData.pagenum =1;
        this.getSolicitorData.condition = '';
        this.getSolicitor(this.getSolicitorData)
      }
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype'])
  },
  created(){
    this.getSolicitor(this.getSolicitorData);
  },
  methods: {
    handleSelect(row){
      this.$emit('select', row)
    },
    getSolicitor(data){
        getSolicitorList(data).then(res=>{
        if(res.data.success){
          this.SolicitorList = res.data.data;
          this.SolicitorTotal = res.data.total;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 分页 Agent
    handleSizeChangeSolicitor(val){
      this.getSolicitorData.pagesize = val;
      this.getSolicitor(this.getSolicitorData)
    },
    handleCurrentChangeSolicitor(val){
      this.getSolicitorData.pagenum = val;
      this.getSolicitor(this.getSolicitorData)
    },
    search(){
      this.getSolicitorData.pagenum =1;
      this.getSolicitor(this.getSolicitorData)
    }
  }
}
</script>
