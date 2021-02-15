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
        <span class="title">{{rs.select_partner_contact}}</span>
      </div>
    </template>
    <div class="dialog-body">
      <el-row>
        <div class="filter-search fr" style="width:50%" >
          <el-input :placeholder="rs.search_partners" 
            v-model="getBrokerData.condition" class="input-key" clearable size='mini' @change="search" @keyup.enter='search'>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-row>
      <el-row>
        <el-table
          :data="BrokerList"
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
            :label="rs.partner_firms">
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
    <el-row class="dailog-footer" style="margin-top:5px" v-if="brokerTotal">
      <el-pagination 
      :background="false"
      @size-change="handleSizeChangeBroker"
      @current-change="handleCurrentChangeBroker"
      :current-page="getBrokerData.pagenum"
      layout="prev, pager, next"
      :page-size="getBrokerData.pagesize"
      :total="brokerTotal" class="fr">
      </el-pagination>
    </el-row>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getBroker } from '@/api/partnerApi.js'
export default{
  data() {
    return {
      visible: this.sync,
        getBrokerData:{
        languagetype: '',
        pagenum:1,
        pagesize:10,
        isactived:'1',
        condition:''
      },
      BrokerList:[],
      brokerTotal:0
    }
  },
  props:['sync'],
  watch:{
    sync(val){
      this.visible = this.sync;
      if(val){
        this.getBrokerData.pagenum =1;
        this.getBrokerList(this.getBrokerData)
      }
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype'])
  },
  created(){
    this.getBrokerData.languagetype = this.languagetype;
    this.getBrokerList(this.getBrokerData);
  },
  methods: {
    handleSelect(row){
      this.$emit('select', row)
    },
    getBrokerList(data){
      getBroker(data).then(res=>{
        if(res.data.success){
          this.BrokerList = res.data.data;
          this.brokerTotal = res.data.total;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 分页 Broker
    handleSizeChangeBroker(val){
      this.getBrokerData.pagesize = val;
      this.getBrokerList(this.getBrokerData)
    },
    handleCurrentChangeBroker(val){
      this.getBrokerData.pagenum = val;
      this.getBrokerList(this.getBrokerData)
    },
    search(){
      this.getBrokerData.pagenum =1;
      this.getBrokerList(this.getBrokerData)
    }
  }
}
</script>
