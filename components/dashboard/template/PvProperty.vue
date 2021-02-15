<template>
  <div class="table_box">
    <el-table
      :data="pvList"
      :empty-text = rs.no_data
      tooltip-effect="light"
      width='100%'
      size="mini">
      <el-table-column
        prop="fullname"
        :label="rs.project_name"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.shortname}}<i class="fa fa-share-alt fr" style="color:#409EFF;" v-if="scope.row.isshared==1?1:0 "></i></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="lot"
        :label="rs.lot"
        align="center">
      </el-table-column>
      <el-table-column
        prop="unit"
        :label="rs.unit"
        align="center">
      </el-table-column>
      <el-table-column
        prop="bedroomqty"
        label="fa fa-bed"
        align="center"
        width="40"
        :render-header="renderHeader">
      </el-table-column>
      <el-table-column
        prop="bathroomqty"
        label="fa fa-bath"
        align="center"
        width="40"
        :render-header="renderHeader">
      </el-table-column>
      <el-table-column
        prop="studymediaqty"
        label="fa fa-book"
        align="center"
        width="40"
        :render-header="renderHeader">
      </el-table-column>
      <el-table-column
        prop="carspaceqty"
        label="fa fa-car"
        align="center"
        width="40"
        :render-header="renderHeader">
      </el-table-column>
      <el-table-column
        prop="inter"
        :label="rs.internal"
        align="center">
      </el-table-column>
      <el-table-column
        prop="exter"
        :label="rs.external"
        align="center">
      </el-table-column>
      <el-table-column
        prop="aspect"
        :label="rs.aspect"
        align="center">
        <template slot-scope="scope">
        {{AspectObj[scope.row.aspect]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        :label="rs.price"
        align="right">
        <template slot-scope="scope">
        {{scope.row.price?'$':''}}{{setNumber(scope.row.price)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="pv"
        :show-overflow-tooltip="true"
        :label="rs.pv"
        align="right">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getPropertyPVData } from '@/api/dashboard.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      pvList:[],
      AspectObj:{}
    }
  },
  created(){
    this.getData()
    JSON.parse(localStorage.getItem('selectlist')).PROPERTY_ASPECT_LIST.forEach(element => {
      this.AspectObj[element.code] =element.value;
    });
    this.AspectObj = Object.assign({},this.AspectObj)
  },
  mounted(){
  },
  methods:{
    getData(){
      getPropertyPVData({pagesize:'10',pagenum:'1',languagetype:localStorage.getItem('languagetype')}).then(res=>{
         if (res.data.success) {
          this.pvList = res.data.propertypvlist 
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
     
    //  handleEdit(d){
    //    sessionStorage.removeItem('propertyid');
    //   this.$router.push({path:'/project_manage/allProperties/propertyDetail/update',query:{id:d.propertyid}})
    //  },

    goRouter(path,row){
      sessionStorage.removeItem('isFalg');
      this.$router.push({path:path})
      sessionStorage.setItem('isFalg',JSON.stringify({saleid:row.saleid,type:'all_reserved',agencyprojectid:row.agencyprojectid,isChannel:0}))
    },
    goMoreRouter(path,data){
      this.$router.push({
        path:path,
        query: {
          ifmore: data
        }
      })
    },
    setNumber(num){
       return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },

    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    renderHeader(createElement, { column, _self }) {
      let className = column.label;
      return createElement('i',{'class': className});
    },
  },

  watch:{
    rs(){
      JSON.parse(localStorage.getItem('selectlist')).PROPERTY_ASPECT_LIST.forEach(element => {
        this.AspectObj[element.code] =element.value;
      });
      this.AspectObj = Object.assign({},this.AspectObj)
      this.getData()
    }
  },

  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.dashboard ==='02'){
      return true
      }else{
      return false
      }
    }
  },
  watch:{
    rs(){
      this.getData()  
    }
  }
}
</script>
