<template>
  <el-dialog
    title="Builder"
    :close-on-click-modal='false'
    @close="$emit('update:sync')"
    :visible.sync="visible"
    :sync="sync"
    width='70%'>
    <template slot="title">
      <div class="dialog-header">
        <span class="title">{{rs.select_builder}}</span>
      </div>
    </template>
    <div class="dialog-body">
      <el-row >
        <div class="filter-search fr" style="width:50%" >
          <el-input :placeholder="rs.search_builders" v-model="getBuilderData.condition" 
            class="input-key" size='mini' clearable @change="search" @keyup.enter='search'>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-row>
      <el-row>
        <el-table
          :data="BuilderList"
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
          <!-- <el-table-column
            prop="mobilenumber"
            width="160"
            :label="rs.phone_number">
          </el-table-column> -->
          <!-- <el-table-column
            prop="email"
            :show-overflow-tooltip="true"
            :label="rs.email">
          </el-table-column> -->
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
     <el-row class="dailog-footer" style="margin-top:5px"  v-if="BuilderTotal">
      <el-pagination
        :background="false"
        @size-change="handleSizeChangeBuilder"
        @current-change="handleCurrentChangeBuilder"
        :current-page="getBuilderData.pagenum"
        layout="prev, pager, next"
        :total="BuilderTotal" class="fr">
      </el-pagination>
    </el-row>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getBuilderList } from '@/api/builderApi.js'
export default{
  data() {
    return {
      visible: this.sync,
        getBuilderData:{
        languagetype: '',
        pagenum:1,
        pagesize:10,
        isactived:'1',
        condition:'',
        isactived:'1'
      },
      BuilderList:[],
      BuilderTotal:0
    }
  },
  props:['sync'],
  watch:{
    sync(val){
      this.visible = this.sync;
      if(val){
        this.getBuilderData.pagenum =1;
        this.getBuilderData.condition = '';
        this.getBuilder(this.getBuilderData)
      }
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype'])
  },
  created(){
    this.getBuilderData.languagetype = this.languagetype;
    this.getBuilder(this.getBuilderData);
  },
  methods: {
    handleSelect(row){
      this.$emit('select', row)
    },
    getBuilder(data){
        getBuilderList(data).then(res=>{
        if(res.data.success){
          this.BuilderList = res.data.data;
          this.BuilderTotal = res.data.total;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 分页 Agent
    handleSizeChangeBuilder(val){
      this.getBuilderData.pagesize = val;
      this.getBuilder(this.getBuilderData)
    },
    handleCurrentChangeBuilder(val){
      this.getBuilderData.pagenum = val;
      this.getBuilder(this.getBuilderData)
    },
    search(){
      this.getBuilderData.pagenum =1;
      this.getBuilder(this.getBuilderData)
    }
  }
}
</script>
