<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.builder}}</span>
      </div>
      <div class="tools">
        <span v-if="!readonly" @click="setIsUpdate(true)" class="btn_text">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_builder}}</span>
        </span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row :gutter="20" >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <page-size :pagesize="getData.pagesize" :unit="rs.builder"
              @changeSize="handleSizeChange">
            </page-size>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" >
            <div class="filter-search">
              <el-input
                :placeholder="rs.search_builders"
                size="mini"
                clearable
                v-model="getData.condition"
                @change="search" @keyup.enter='search'
                >
                <el-button slot="append" icon="el-icon-search"></el-button>
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
                    <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4" v-for="(d,index) in builderList" :key="index">
                      <div class="card_box_simple">
                        <div class="inactive" v-if="d.isactived == 0">{{rs.inactive}}</div>
                        <div class="card_box_img">
                          <img :src="d.logoimage" v-if="d.logoimage">
                          <img src="../../assets/imgs/no_images.png" alt="" v-else>
                        </div>
                        <div class="card_box_name clearfix">
                          <el-row>
                            <el-col :span="24">
                              <p class="name_line fl">{{d.shortname}}</p>
                            </el-col>
                            <el-col :span="24">
                              <p class="tools_line fr">
                                <span @click="handleEdit(d)">
                                  <img class="icon" src="@/assets/imgs/common/common_7.png" alt="">  
                                </span>
                                <span @click="handleDelete(d.builderid)" v-if="!readonly">
                                  <img class="icon" src="@/assets/imgs/common/common_8.png" alt="">
                                </span>
                              </p>
                            </el-col>
                          </el-row>
                          
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="table_footer" v-if="total">
                    <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.builder}}</div>
                    <div class="fr">
                      <el-pagination
                      :background="false"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="getData.pagenum"
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
    <el-dialog
    :close-on-click-modal='false'
    :title="rs.builder"
    :visible.sync="dialogShow"
    width='50%'
    >
    <template slot="title">
      <div class="dialog-header">
        <span class="title">{{rs.builder}}
          <span>[{{flag?rs.add:rs.edit}}]</span>
        </span>
      </div>
    </template>
    <form autocomplete="on">
      <div class="dialog-body">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="form-group">
                  <div class="sub-title-first"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20"  v-for="(d,index) in langList" :key="d.type">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="form-group-lang">
                  <div :class="index==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="sub-title">{{rs.full_name}}</div>
                  <div class="content">
                    <el-input v-model="labeData[index].fullname" :disabled="readonly" size="small" maxlength="100" clearable></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="sub-title">{{rs.short_name}}</div>
                  <div class="content">
                    <el-input v-model="labeData[index].shortname" :disabled="readonly" size="small" maxlength="30" clearable></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="form-group">
                  <div class="content">
                    <el-checkbox v-model="formData.isactived" size="small" :disabled="readonly" true-label="1" false-label="0" > <span style="display:inline-block;padding:10px 0;">{{rs.set_as_active}}</span></el-checkbox>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="form-group">
              <div class="sub-title-first">{{rs.logo}}</div>
              <div class="content">
                <el-upload
                class="avatar-uploader"
                :action="actionUrl"
                :disabled="readonly"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-progress="handleMinprogress"
                accept="image/gif,image/bmp,image/jpeg,image/png"
                :before-upload="beforeAvatarUpload">
                <div v-if="logoimage"  style="height: 100%;">
                  <div style=" width: 100%;height: 100%;overflow: hidden;">
                    <div class="zoomImage" :style="{backgroundImage:'url('+logoimage+')'}"></div>
                  </div>
                </div>
                <!-- <img v-if="logoimage" :src="logoimage" style="width:100%;height:160px" class="avatar"> -->
                <img src="../../assets/imgs/no_images.png" alt="" style="width:100%;height:160px"  v-else-if="!isUpdate">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="dialogVisible" v-if="!readonly">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="handleSave" v-if="!readonly">
              {{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
  </el-dialog>
  </div>
</template>
<script>
import{ getBuilderList, insertBuilder, updateBuilder, deleteBuilder } from'@/api/builderApi.js'
import { Message } from 'element-ui'
import { mapGetters } from "vuex";
import axios from 'axios'
export default{
  data() {
    return {
      total:0,//总条数
      start:1,//起始页
      end:10, //结束页
      langList:[],
      getData:{
        languagetype: '',
        pagenum:1,
        pagesize:20,
        condition:'',//搜索关键字
      },
      labeData:[],
      actionUrl:'',
      formData:{//表单提交的数据
        builderid:'',
        deletedflag:'',
        valuelist:'',//多语言 fullname:'',shortname:'',
        isactived:0,
        languagetype:'',
        logoimage:''
      },
      logoimage:'',
      isUpdate:true,
      imageUrl: '',
      builderList:[],
      dialogShow:false,//弹出层
      checked:false,
      id:'',
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve)
    },
    created(){
    this.actionUrl =axios.defaults.baseURL+'builder/uploadFile';
    // 获取语言资源表数据
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.getData.languagetype = localStorage.getItem('languagetype');
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
      if(this.langList.length == 0){
          this.labeData.push({type:'',fullname:'',shortname:''})
        }else{
          // 转换到存储list
          this.langList.forEach(element => {
            this.labeData.push({type:element.languageid,fullname:'',shortname:''})
          });
        }
    this.getBuild(this.getData)
    },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.builder ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getBuild(this.getData);
    }
  },
  methods:{
    search(){
      this.getBuild(this.getData)
    },
      // 分页方法
    handleSizeChange(val) {//一页多少条
      this.getData.pagenum =1;
      this.getData.pagesize = val;
      this.getBuild(this.getData)
    },
    handleCurrentChange(val) {//第几页
      this.getData.pagenum = val;
      this.getBuild(this.getData)
    },
    handleMinprogress(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
    handleAvatarSuccess(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.logoimage = file.response.path;
    },
    beforeAvatarUpload(file) {
      const isBMP = file.type === 'image/bmp';
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isLt100M = file.size / 1024 / 1024 < 100;
      if(!isBMP && !isPNG && !isJPG && !isGIF){
        this.$message.error(this.rs.err_msg_image_type);
      }
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      return (isBMP || isJPG || isGIF || isPNG) && isLt100M;
    },
    setIsUpdate(isflg){
      this.isUpdate = isflg;
      this.dialogVisible();
      if(isflg){
        this.formData={
          isactived:0,
          languagetype:this.languagetype,
          logoimage:''
        };
        this.labeData.forEach(ele=>{
            ele.fullname = '';
            ele.shortname ='';
        })
      }
    },
      dialogVisible(){
        this.dialogShow =!this.dialogShow;
    },
    //增加
    handleSave(){
      this.formData.valuelist = JSON.stringify(this.labeData)
      this.formData.logoimage = this.logoimage;
      if(this.isUpdate){
        insertBuilder(this.formData).then(res=>{
          if (res.data.success) {
            this.dialogShow =false;
            this.getBuild(this.getData);
            this.$message.success(this.rs.info_msg_insert_success)
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        delete this.formData.deletedflag;
        delete this.formData.updatedtimestamp
        updateBuilder(this.formData).then(res=>{
            if (res.data.success) {
            this.dialogShow =false;
            this.getBuild(this.getData);
            this.$message.success(this.rs.info_msg_update_success)
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    //修改
    handleEdit(data){
      this.logoimage = data.logoimage;
      this.formData.builderid = data.builderid;
      this.setIsUpdate(false);
      getBuilderList({builderid:data.builderid}).then(res=>{
        if(res.data.success){
          var arr = res.data.data;
          this.labeData.forEach(ele=>{
            ele.fullname = '';
            ele.shortname ='';
            arr.forEach(element=>{
              this.formData.isactived = element.isactived;
              if(ele.type == element.languagetype){
                ele.fullname =element.fullname;
                ele.shortname =element.shortname;
              }
            })
          })
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //刷新
    getBuild(data){
      getBuilderList(data).then(res=>{
        if (res.data.success) {
          this.builderList = res.data.data;
          this.total = res.data.total;
          this.end = res.data.end;
          this.start = res.data.start;
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    // 删除
    handleDelete(id) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteBuilder({ids:id}).then(res=>{
          if (res.data.success) {
            this.getBuild(this.getData);
            this.$message.success(this.rs.info_msg_delete_success)
          } else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .name_line {
    width: 100%;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
</style>
