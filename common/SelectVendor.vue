<template>
  <el-dialog
    title="Vendor"
    :close-on-click-modal='false'
    @close="$emit('update:sync')"
    :visible.sync="visible"
    :sync="sync"
    width='70%'>
    <template slot="title">
      <div class="dialog-header">
        <span class="title">{{rs.select_vendor}}</span>
      </div>
    </template>
    <div class="dialog-body">
      <el-row >
        <div class="filter-search fr" style="width:50%" >
          <el-input :placeholder="rs.search_vendors" v-model="getVendorData.condition" 
            class="input-key" size='mini' clearable @change="search" @keyup.enter='search'>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-row>
      <el-row>
        <el-table
          :data="VendorList"
          tooltip-effect="light"
          :empty-text = rs.no_data
          style="width: 100%; margin-top:5px;"
          size="mini">
          <el-table-column
            prop="shortname"
            :label="rs.name">
          </el-table-column>
          <!-- <el-table-column
            :show-overflow-tooltip="true"
            :label="rs.name">
            <template slot-scope="scope">
            <span>{{scope.row.firstname}}&nbsp;{{scope.row.lastname}}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="contactnumber"
            width="160"
            :label="rs.phone_number">
          </el-table-column>
          <el-table-column
            prop="email"
            :show-overflow-tooltip="true"
            :label="rs.email">V
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
     <el-row class="dailog-footer" style="margin-top:5px"  v-if="VendorTotal">
      <el-pagination
        :background="false"
        @size-change="handleSizeChangeVendor"
        @current-change="handleCurrentChangeVendor"
        :current-page="getVendorData.pagenum"
        layout="prev, pager, next"
        :total="VendorTotal" class="fr">
      </el-pagination>
    </el-row>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getVendorList } from '@/api/vendorApi.js'
export default{
  data() {
    return {
      visible: this.sync,
        getVendorData:{
        languagetype: '',
        pagenum:1,
        pagesize:10,
        isactived:'1',
        condition:'',
        isactived:'1'
      },
      VendorList:[],
      VendorTotal:0
    }
  },
  props:['sync'],
  watch:{
    sync(val){
      this.visible = this.sync;
      if(val){
        this.getVendorData.pagenum =1;
        this.getVendorData.condition = '';
        this.getVendor(this.getVendorData)
      }
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype'])
  },
  created(){
    this.getVendorData.languagetype = this.languagetype;
    this.getVendor(this.getVendorData);
  },
  methods: {
    handleSelect(row){
      this.$emit('select', row)
    },
    getVendor(data){
        getVendorList(data).then(res=>{
        if(res.data.success){
          this.VendorList = res.data.data;
          this.VendorTotal = res.data.total;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 分页 Agent
    handleSizeChangeVendor(val){
      this.getVendorData.pagesize = val;
      this.getVendor(this.getVendorData)
    },
    handleCurrentChangeVendor(val){
      this.getVendorData.pagenum = val;
      this.getVendor(this.getVendorData)
    },
    search(){
      this.getVendorData.pagenum =1;
      this.getVendor(this.getVendorData)
    }
  }
}
</script>
