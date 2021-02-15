<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.vendor}}</span>
        </div>
        <!-- <el-button class="bg_save_btn " v-if="!readonly"  @click="handleSave" size="small">{{rs.save}}</el-button> -->
        <div class="tools">
            <span v-if="!readonly" @click="goRouter('/master_manage/vendors/vendorDetail/save')" class="btn_text">
              <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
              <span>{{rs.add_new_vendor}}</span>
            </span>
          </div>
      </div>
      <div class="wrapper-condition clearfix">
        <el-row :gutter="20" >
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <div class="filter-count">
              <p></p>
              <page-size :pagesize="getData.pagesize" :unit="rs.vendors"
                @changeSize="handleSizeChange">
              </page-size>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" >
            <div class="filter-search">
              <el-input :placeholder="rs.search_vendors" v-model="getData.condition" clearable  @change="search" @keyup.enter='search' class="input-key" size='mini'>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
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
                  <el-row :gutter="25">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="(d,i) in vendorList" :key="i">
                      <div class="card_box">
                        <div class="inactive" v-if="d.isactived ==0">{{rs.inactive}}</div>
                          <div class="card">
                            <div class="pic_area">
                            <img :src="d.logoimage" alt="" style="width:100px;height:auto" v-if="d.logoimage">
                            <img src="../../assets/imgs/no_images.png" alt="" style="width:100px;height:auto" v-else>
                          </div>
                          <div class="info_area">
                            <p class="line">
                              <span style="color: #3c8dbc;">{{d.shortname}}</span>
                              <span v-if="!readonly" class="icon-right" @click="deleteBtn(d.vendorid)"><img class="icon" src="@/assets/imgs/common/common_8.png" alt=""></span>
                              <span class="icon-right" @click="updateBtn(d)"><img class="icon" src="@/assets/imgs/common/common_7.png" alt="">  </span>
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
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.vendors}}</div>
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
import { insertVendor, uptadeVendor, getVendorList, deleteVendor } from '@/api/vendorApi.js'
import { mapGetters } from "vuex";
export default{
    data() {
    return {
      total:0,//总条数
      start:1,//起始页
      end:10, //结束页
      vendorList:[],//列表数据
      getData:{
        languagetype: '',
        pagenum:1,
        pagesize:20,
        condition:'',//搜索关键字
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve)
    },
  methods:{
      // 分页方法
    handleSizeChange(val) {//一页多少条
      this.getData.pagenum =1;
      this.getData.pagesize = val;
      this.getVendor(this.getData)
    },
    handleCurrentChange(val) {//第几页
      this.getData.pagenum = val;  
      this.getVendor(this.getData)
    },
    // ----
    search(){
      this.getData.pagenum =1;
      this.getVendor(this.getData)
    },
    goRouter(path){
      this.$router.push(path)
    },
    getVendor(data){//获取列表
      getVendorList(data).then(res=>{
        if(res.data.success){
          this.vendorList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
      updateBtn(data){//更新按钮跳转
      this.$router.push({path:'/master_manage/vendors/vendorDetail/update',query:{id:data.vendorid}})
      sessionStorage.removeItem('vendorid');
    },
    deleteBtn(id){//删除操作
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
          deleteVendor({ids:id}).then(res=>{
            if(res.data.success){
              this.$message.success(this.rs.info_msg_delete_success)
              this.getVendor(this.getData);
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
    this.getData.languagetype = localStorage.getItem('languagetype');
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.getVendor(this.getData); //分页自动调用   
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.vendor ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getVendor(this.getData);     
    }
  },
}
</script>