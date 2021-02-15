<template>
  <div class="wrapper clearfix">
    <form  autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.agency}}</span>
        </div>
        <div class="tools">
          <span v-if="!readonly"  @click="goRouter('/master_manage/agencies/addAgency')" class="btn_text">
            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
            <span>{{rs.add_new_agency}}</span>
          </span>
        </div>
      </div>
      <div class="wrapper-condition clearfix">
        <el-row :gutter="20" >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <page-size :unit='rs.agencies' @changeSize="handleSizeChange"></page-size>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" >
            <div class="filter-search">
              <el-input :placeholder="rs.search_agencies" clearable v-model="getData.condition" class="input-key" size='mini' @change="search" @keyup.enter='search'>
                <el-button slot="append" icon="el-icon-search" ></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box-card">
              <div class="box-body-card">
                <div class="table_box">
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="(d,i) in agencyList" :key="i">
                      <div class="card_box">
                        <div class="inactive" v-if="d.isactived ==0">{{rs.inactive}}</div>
                        <div class="card">
                          <div class="pic_area">
                            <img :src="d.logoimagedark" alt="" style="width:100px;height:auto" v-if="d.logoimagedark">
                            <img src="../../assets/imgs/no_images.png" style="width:100px;height:auto" alt="" v-else>
                          </div>
                          <div class="info_area">
                            <p class="line">
                              <span class="shortname">{{d.shortname}}</span>
                              <span v-if="!readonly" class="icon-right" @click="deleteBtn(d.agencyid)">
                                <!-- <i class="fa fa-trash"></i> -->
                                <img class="icon" src="@/assets/imgs/common/common_8.png" alt="">
                              </span>
                              <span class="icon-right" @click="updateBtn(d)">
                                <!-- <i class="fa fa-pencil"></i></span> -->
                                <img class="icon" src="@/assets/imgs/common/common_7.png" alt="">  
                              </span> 
                            </p>
                            <p class="line">
                              <img class="icon" src="@/assets/imgs/common/common_9.png" alt="">
                              <span>{{d.contactperson}}</span>
                            </p>
                            <p class="line">
                              <img class="icon" src="@/assets/imgs/common/common_10.png" alt="">
                              <span>{{d.email}}</span>
                            </p>
                            <p class="line">
                              <img class="icon" src="@/assets/imgs/common/common_11.png" alt="">
                              <span>{{d.contactnumber}}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>  
                </div>
                <div class="table_footer"  v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.agencies}}</div>
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
    </form>
  </div>
</template>
<script>
import { insertAgency, updateAgency, getAgencyList, deleteAgency } from '@/api/agencyApi.js'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      total:0,
      start:1,
      end:10, 
      getData:{
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
      },
      agencyList:[],//机构列表
      dialogShow:false,//弹出层显示隐藏
      saveUpdate:'',//区分新增和更新按钮
      // readonly:true,//区分ID时候可以修改
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve),
    },
  methods:{
    // 分页方法
    handleSizeChange(val) {
      this.getData.pagenum = 1;
      this.getData.pagesize = val;
      this.getAgency(this.getData)
    },
    handleCurrentChange(val) {
        this.getData.pagenum = val;  
        this.getAgency(this.getData)
    },
    // ----
    search(){
      this.getData.pagenum =1;
      this.getAgency(this.getData)
    },
      goRouter(path){
      this.$router.push(path)
    },
    getAgency(data){
      getAgencyList(data).then(res=>{
        if(res.data.success){
          this.agencyList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    updateBtn(data){
      sessionStorage.removeItem('agencyid')
      // this.$router.push({path:'/master_manage/agencies/agencyDetail/update',query:{id:data.agencyid}})
      this.$router.push({path:'/master_manage/agencies/agencyDetailPreview/update',query:{id:data.agencyid}})
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    deleteBtn(id){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteAgency({ids:id}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_delete_success)
            this.getAgency(this.getData);
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
    }
    
  },
  created(){
    // 获取语言资源表数据
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.getData.languagetype=localStorage.getItem('languagetype')
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.getAgency(this.getData);       
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.agency ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getAgency(this.getData)  
    },
    
  },
}
</script>
