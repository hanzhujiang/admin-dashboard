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
        <span class="title">{{rs.select_agencies}}</span>
      </div>
    </template>
    <div class="dialog-body">
      <el-row>
        <div class="filter-search fr" style="width:50%" >
          <el-input :placeholder="rs.search_agencies" 
            v-model="getAgencyData.condition" class="input-key" clearable size='mini' @change="search" @keyup.enter='search'>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-row>
      <el-row>
        <el-table
          :data="AgencyList"
          style="width: 100%; margin-top:5px;"
          :empty-text = rs.no_data
          :show-overflow-tooltip="true"
          size="mini">
          <el-table-column
            :label="rs.short_name">
            <template slot-scope="scope">
              <span>{{ scope.row.shortname }}</span>
          </template>
          </el-table-column>
          <!-- contactperson -->
          <el-table-column
            :label="rs.principal">
            <template slot-scope="scope">
              <span>{{ scope.row.contactperson }}</span>
          </template>
          </el-table-column>
          <el-table-column
            :label="rs.phone_number">
            <template slot-scope="scope">
              <span>{{ scope.row.officetelephone }}</span>
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
    <el-row class="dailog-footer" style="margin-top:5px" v-if="agencyTotal">
      <el-pagination 
      :background="false"
      @size-change="handleSizeChangeAgent"
      @current-change="handleCurrentChangeAgent"
      :current-page="getAgencyData.pagenum"
      layout="prev, pager, next"
      :page-size="getAgencyData.pagesize"
      :total="agencyTotal" class="fr">
      </el-pagination>
    </el-row>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getAgencyList } from '@/api/agencyApi.js'
export default{
  data() {
    return {
      visible: this.sync,
      getAgencyData:{
        languagetype: '',
        pagenum:1,
        pagesize:10,
        isactived:'1',
        condition:'',
        excludeids:''
      },
      AgencyList:[],
      agencyTotal:0
    }
  },
  props: {
    sync: false,
    excludeids: '',
    ownid: ''
  },
  watch:{
    sync(val){
      this.visible = this.sync;
      if(val){
        this.getAgencyData.pagenum =1;
        this.getAgency(this.getAgencyData)
      }
    },
    excludeids(val){
      if(val){
        let ids = '';
        if (this.ownid != null && this.ownid != '') {
          ids = this.ownid;
        }
        for(let key in val) {
          if (key == 'remove') break;
          if (ids == '') {
            ids = val[key].agencyid;
          } else {
            ids = ids + ',' + val[key].agencyid;
          } 
        }
        this.getAgencyData.excludeids = ids;
        this.getAgencyData.pagenum =1;
        this.getAgency(this.getAgencyData)
      }
    },
    languagetype(val){
      this.getAgencyData.languagetype = val;
      this.getAgency(this.getAgencyData);
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype'])
  },
  created(){
    this.getAgencyData.languagetype = this.languagetype;
    let ids = '';
    if (this.ownid != null && this.ownid != '') {
      ids = this.ownid;
    }
    if(this.excludeids){
      for(let key in this.excludeids) {
        if (key == 'remove') break;
        if (ids == '') {
          ids = val[key].agencyid;
        } else {
          ids = ids + ',' + val[key].agencyid;
        } 
      }
    }
    this.getAgencyData.excludeids = ids;
    this.getAgency(this.getAgencyData);
  },
  methods: {
    handleSelect(row){
      this.$emit('select', row)
    },
    getAgency(data){
      getAgencyList(data).then(res=>{
        if(res.data.success){
          this.AgencyList = res.data.data;
          this.agencyTotal = res.data.total;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 分页 Agent
    handleSizeChangeAgent(val){
      this.getAgencyData.pagesize = val;
      this.getAgency(this.getAgencyData)
    },
    handleCurrentChangeAgent(val){
      this.getAgencyData.pagenum = val;
      this.getAgency(this.getAgencyData)
    },
    search(){
      this.getAgencyData.pagenum =1;
      this.getAgency(this.getAgencyData)
    }
  }
}
</script>
