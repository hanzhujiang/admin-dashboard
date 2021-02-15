<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.corporate_website}}</span>
        </div>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="box">
              <div class="box-body">
                <el-row :gutter="10" class="line-first" >
                  <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <label class="title">{{rs.domain}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input v-if="!readonly && isDomainEdit" placeholder="" v-model="formData.domain" clearable size="mini"></el-input>
                    <span v-else>{{formData.domain}}</span>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <span class="btntext" @click="changeDomainEdit()" 
                      v-if="!readonly && !isDomainEdit">{{rs.edit}}</span>
                    <span class="btntext" style="color:red;" @click="cancelDomainEdit()" 
                      v-if="!readonly && isDomainEdit">{{rs.cancel}}</span>
                    <span class="btntext" @click="saveWebInfo(0)" v-if="!readonly && isDomainEdit">{{rs.save}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line" >
                  <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <label class="title">{{rs.inquiry_email}}</label>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <el-input v-if="!readonly && isInquiryEmailEdit" placeholder="" v-model="formData.inquiryemail" clearable size="mini"></el-input>
                    <span v-else>{{formData.inquiryemail}}</span>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <span class="btntext" @click="changeInquiryEmailEdit()" 
                      v-if="!readonly && !isInquiryEmailEdit">{{rs.edit}}</span>
                    <span class="btntext" style="color:red;" @click="cancelInquiryEmailEdit()" 
                      v-if="!readonly && isInquiryEmailEdit">{{rs.cancel}}</span>
                    <span class="btntext" @click="saveWebInfo(1)" v-if="!readonly && isInquiryEmailEdit">{{rs.save}}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="padding-top:20px">
          <el-col :span="24">
            <div class="box">
              <div class="box-header">
                <div class="title">
                  <span>{{rs.projects}}</span>
                </div>
              </div>
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :empty-text = rs.no_data
                    :data="projectList"
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    size="mini">
                    <el-table-column
                      prop="fullname"
                      :label="rs.project"
                      width="400px">
                    </el-table-column>
                    <el-table-column
                      prop="isactived"
                      :label="rs.is_actived">
                      <template slot-scope="scope">
                        <span>{{scope.row.isactived==1?rs.yes:rs.no}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="isshowtoagents"
                      :label="rs.is_on_market">
                      <template slot-scope="scope">
                        <span>{{scope.row.isshowtoagents==1?rs.yes:rs.no}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="isshowonwebsite"
                      :label="rs.show_on_website">
                      <template slot-scope="scope">
                        <span v-if="readonly">{{scope.row.isshowonwebsite == 1?rs.yes:rs.no}}</span>
                        <el-switch v-else
                          active-value="1"
                          inactive-value="0"
                          v-model="scope.row.isshowonwebsite"
                          active-color="#13ce66"
                          inactive-color="#CCC"
                          @change="changeShowOnWebsite(scope.row)">
                          >
                        </el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column prop="iscurrent">
                      <template slot="header" slot-scope="scope">
                        {{rs.is_current}}
                        <el-tooltip :content="rs.current_project_explain" placement="top">
                          <i class="el-icon-info"></i>
                        </el-tooltip>
                      </template>
                      <template slot-scope="scope">
                        <span v-if="readonly">{{scope.row.iscurrent == 1?rs.yes:rs.no}}</span>
                        <el-switch v-else
                          active-value="1"
                          inactive-value="0"
                          v-model="scope.row.iscurrent"
                          active-color="#13ce66"
                          inactive-color="#CCC"
                          @change="changeCurrent(scope.row)">
                          >
                        </el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="	"
                      width="200px">
                      <template slot-scope="scope">
                        <span class="btntext" @click="editContents(scope.row)" v-if="!readonly">{{rs.edit_contents}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="table_footer" v-if="projectTotal">
                  <div class="data-counter fl">{{rs.showing}} {{projectStart}} to {{projectEnd}} of {{projectTotal}} {{rs.projects}}</div>
                    <div class="fr">
                      <el-pagination
                      :background="false"
                      @size-change="handleProjectSizeChange"
                      @current-change="handleProjectCurrentChange"
                      layout="prev, pager, next"
                      :page-size="getProjectData.pagesize"
                      :total="projectTotal" class="fr">
                      </el-pagination>
                    </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="padding-top:20px">
          <el-col :span="24">
            <div class="box">
              <div class="box-header">
                <div class="title">
                  <span >{{rs.website_contests}}</span>
                </div>
                <div class="tools">
                  <span v-if="!readonly" @click="handleAddBlock" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_website_contests}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body" style="padding-top: 0;">
                <div class="table_box">
                  <div v-if="blockList.length == 0?true:false" style="text-align: center;height: 40px;line-height: 40px;">{{rs.no_data}}</div>
                  <el-collapse v-model="activeNames" class="no_arrow">
                    <el-collapse-item :name="index" v-for="(d,index) in blockList" :key="index">
                      <template slot="title">
                        <span style="font-weight:bold;font-size:12px"> {{d.title}}</span><span style="margin-left:15px">({{setformatDate(d.updatedtimestamp, 'dd/MM/yyyy hh:mm:ss')}})</span>
                        <div class="fr">
                          <span class="btntext" @click.stop="handleUpdateBlock(d)" v-if="!readonly">{{rs.edit}}</span>
                          <span class="btntext" @click.stop="deleteWebBlockData(d)" v-if="!readonly">{{rs.delete}}</span>
                        </div>
                      </template>
                      <div v-html="d.content" class="contentIn" style="padding:20px;"></div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="padding-top:20px">
          <el-col :span="24">
            <div class="box">
              <div class="box-header">
                <div class="title">
                  <span >{{rs.news}}</span>
                </div>
                <div class="tools">
                  <span v-if="!readonly" @click="handleAddNews" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_news}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body" style="padding-top: 0;">
                <div class="condition clearfix">
                  <el-row >
                    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                      <page-size :pagesize="getNewsData.pagesize" :unit="rs.news"
                        @changeSize="handleNewsSizeChange">
                      </page-size>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <div class="filter-search">
                        <el-input
                          :placeholder="rs.search_news"
                          size="mini"
                          clearable
                          v-model="getNewsData.searchkey"
                          @change="searchNews" @keyup.enter='searchNews'>
                          <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="table_box" style="padding-top: 20px;">
                  <div v-if="newsTotal ==0?true:false" style="text-align: center;height: 40px;line-height: 40px;">{{rs.no_data}}</div>
                  <el-collapse v-model="activeNames2" class="no_arrow">
                    <el-collapse-item  :name="index" v-for="(d,index) in newsList" :key="index">
                      <template slot="title">
                        <span style="font-weight:bold;font-size:12px"> {{d.title}}</span><span style="margin-left:15px">({{setformatDate(d.newstime, 'dd/MM/yyyy')}})</span>
                        <div class="fr">
                          <span class="btntext" @click.stop="handleUpdateNews(d)" v-if="!readonly">{{rs.edit}}</span>
                          <span class="btntext" @click.stop="deleteWebNewsData(d)" v-if="!readonly">{{rs.delete}}</span>
                        </div>
                      </template>
                      <img v-if="d.coverimage" :src="d.coverimage" class="fl" style="width:100px;padding:20px;">
                      <div v-html="d.content" class="contentIn" style="padding:20px 20px 20px 120px;"></div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <div class="table_footer"  v-if="newsTotal">
                  <el-row >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <div class="data-counter">{{rs.showing}} {{newsStart}} to {{newsEnd}} of {{newsTotal}} {{rs.news}}</div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <div>
                        <el-pagination
                        :background="false"
                        @size-change="handleNewsSizeChange"
                        @current-change="handleNewsCurrentChange"
                        :current-page="getNewsData.pagenum"
                        layout="prev, pager, next"
                        :page-size="getNewsData.pagesize"
                        :total="newsTotal" class="fr">
                        </el-pagination>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="projectDailog"
      width='40%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{projectData.fullname}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.title}} <span class="required">*</span></div>
              <div class="content">
                <el-input v-model="projectData.title" maxlength="200" :disabled="readonly" size="small"  ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.subtitle}}<span class="required">*</span></div>
              <div class="content">
                <el-input v-model="projectData.subtitle" maxlength="500" :disabled="readonly" size="small"  ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.project_description}}<span class="required">*</span></div>
              <div class="content">
                <quill-editor :options="editorOption" maxlength="2000" v-model="projectData.description" :disabled="readonly||projectData.iscopyfromproject==1">
                </quill-editor>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="content">
                <el-checkbox v-model="projectData.iscopyfromproject" :disabled="readonly" true-label='1'
                  false-label='0' size="small" @change="changeDescription()">{{rs.copy_from_project_description}}</el-checkbox>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button style="color:#000;" class="small" @click="projectDailog=false">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="updateWebProjectData(projectData, 1)" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="blockDailog"
      width='40%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.website_contests}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.id}} <span class="required">*</span></div>
              <div class="content">
                <el-input v-model="blockData.webblockid" maxlength="50" 
                  :disabled="readonly || blockData.flag==1" size="small"  ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.title}} <span class="required">*</span></div>
              <div class="content">
                <el-input v-model="blockData.title" maxlength="100" :disabled="readonly" size="small"  ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.content}}<span class="required">*</span></div>
              <div class="content">
                <quill-editor :options="editorOption" v-model="blockData.content" maxlength="2000" :disabled="readonly">
                </quill-editor>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.display_order}}<span class="required">*</span></div>
              <div class="content">
                <el-input v-model="blockData.displayorder" :disabled="readonly" size="small"  ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button style="color:#000;" class="small" @click="blockDailog=false">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="updateWebBlockData(blockData)" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="newsDailog"
      width='40%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.news}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.title}} <span class="required">*</span></div>
              <div class="content">
                <el-input v-model="newsData.title" maxlength="255" :disabled="readonly" size="small"  ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.date}}<span class="required">*</span></div>
              <div class="content">
                <el-date-picker :disabled="readonly" size="small" v-model="newsData.newstime"
                  format="dd/MM/yyyy" value-format="yyyy-MM-dd" type="date" clearable placeholder="">
                </el-date-picker>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.cover_image}}<span class="required">*</span></div>
              <div class="content">
                <el-upload
                  class="avatar-uploader"
                  :action="actionUrl"
                  :show-file-list="false"
                  :disabled="readonly"
                  :on-success="handleNewsAvatarSuccess"
                  :on-progress="handleprogress"
                  accept="image/gif,image/bmp,image/jpeg,image/png"
                  :before-upload="beforeNewsAvatarUpload">
                  <i class="el-icon-plus avatar-uploader-icon" v-if="!newsData.coverimage"></i>
                  <img v-else :src="newsData.coverimage" alt="">
                </el-upload>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.content}}<span class="required">*</span></div>
              <div class="content">
                <quill-editor :options="editorOption" v-model="newsData.content" maxlength="2000" :disabled="readonly">
                </quill-editor>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button style="color:#000;" class="small" @click="newsDailog=false">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="updateWebNewsData(newsData, 1)" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getWebInfo, updateWebInfo, getWebProject, updateWebProject,
          getWebBlock, updateWebBlock, deleteWebBlock,
          getWebNews, updateWebNews, deleteWebNews } from '@/api/webApi.js'
import { mapGetters } from "vuex";
import { formatDate } from "@/assets/js/time.js"; //时间转换插件
import axios from 'axios';
// 对日期插件英文化
import Vue from 'vue'
import { DatePicker} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
Vue.component(DatePicker)

export default{
  data() {
    return {
      editorOption:{
        modules:{
          toolbar:[
          ['bold', 'italic', 'underline',{ 'color': [] },{ 'list': 'ordered'}, { 'list': 'bullet' },'clean'],
          []
          ]
        }
      },
      actionUrl: '',
      isDomainEdit: false,
      isInquiryEmailEdit: false,
      domain: '',
      inquiryemail: '',
      projectList: [],
      projectTotal:0,
      projectEnd:'',
      projectStart:'',
      getProjectData:{
        webid: '',
        languagetype: '',
        pagenum:1,
        pagesize:20,
      },
      projectDailog: false,
      projectData:{},
      blockList:[],
      blockDailog: false,
      blockData:{},
      getNewsData:{
        webid: '',
        pagenum:1,
        pagesize:20,
        searchkey: ''
      },
      newsList:[],
      newsTotal:0,
      newsEnd:'',
      newsStart:'',
      newsDailog: false,
      newsData:{},
      formData: {
        webid: '',
        domain: '',
        inquiryemail: '',
      },
      activeNames:[],
      activeNames2:[],
      newslist: [],
      newsTotal:0,
      newsEnd:'',
      newsStart:'',
      contentTotal:0,
      contentlist: [],
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve)
  },
  methods:{
    saveWebInfo(type) {
      let data = {
        webid: this.formData.webid,
        domain: type == 0 ? this.formData.domain : null,
        inquiryemail: type == 1 ? this.formData.inquiryemail : null,
      }
      updateWebInfo(this.formData).then(res=>{
        if(res.data.success){
          if (type == 0) {
            this.isDomainEdit = false;
          }
          if (type == 1) {
            this.isInquiryEmailEdit = false;
          }
          this.$message.success(this.rs.info_msg_update_success)
        }else{
          this.$message.error(this.ErrorMsgStr(res.data.data));
        }
      })
    },
    changeDomainEdit() {
      this.domain = this.formData.domain;
      this.isDomainEdit = true;
    },
    cancelDomainEdit() {
      this.formData.domain = this.domain;
      this.isDomainEdit = false;
    },
    changeInquiryEmailEdit() {
      this.inquiryemail = this.formData.inquiryemail;
      this.isInquiryEmailEdit = true;
    },
    cancelInquiryEmailEdit() {
      this.formData.inquiryemail = this.inquiryemail;
      this.isInquiryEmailEdit = false;
    },
    getWebProjectList(data){
      getWebProject(data).then(res=>{
        if(res.data.success){
          this.projectList = res.data.data;
          this.projectTotal = res.data.total;
          this.projectStart = res.data.start;
          this.projectEnd = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    updateWebProjectData(row, type) {
      updateWebProject(row).then(res =>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_update_success);
          if (type == 1) {
            this.projectDailog = false;
            this.getWebProjectList(this.getProjectData);
          }
        } else {
          this.$message.error({
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    editContents(row) {
      this.projectData = {
        webid : row.webid,
        projectid : row.projectid,
        fullname : row.fullname,
        title : row.title == null ? row.fullname : row.title,
        subtitle : row.subtitle == null ? 'SELLING FAST - PLEASE CONTACT AGENTS' : row.subtitle,
        description : row.iscopyfromproject === null ? row.projectdescription : row.description,
        projectdescription : row.projectdescription,
        iscopyfromproject : row.iscopyfromproject === null ? '1' : '0'
      };
      if (row.title == null) {
        updateWebProject(this.projectData).then(res =>{
          if (res.data.success) {
            this.projectDailog = true;
            this.getWebProjectList(this.getProjectData);
          } else {
            this.$message.error({
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        })
      } else {
        this.projectDailog = true;
      }
    },
    changeDescription() {
      if (this.projectData.iscopyfromproject == 1) {
        this.projectData.description = this.projectData.projectdescription;
      }
    },
    changeShowOnWebsite(row) {
      this.$confirm(this.rs.info_msg_toggle_setting, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        if (row.title == null) {
          row.title = row.fullname;
          row.subtitle = 'SELLING FAST - PLEASE CONTACT AGENTS';
          row.description = row.projectdescription;
          row.iscopyfromproject = '1';
        }
        this.updateWebProjectData(row, 0);
      }).catch(() => {
        row.isshowonwebsite = (row.isshowonwebsite == '0' ? '1' : '0');
      });
    },
    changeCurrent(row) {
      this.updateWebProjectData(row, 0);
    },
    handleProjectSizeChange(val){
      this.getProjectData.pagenum = 1;
      this.getProjectData.pagesize = val;
      this.getWebProjectList(this.getProjectData)
    },
    handleProjectCurrentChange(val){
        this.getProjectData.pagenum = val;
        this.getWebProjectList(this.getProjectData)
    },
    getWebBlockList(){
      getWebBlock({webid: this.formData.webid}).then(res=>{
        if(res.data.success){
          this.blockList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    handleAddBlock() {
      this.blockDailog = true;
      this.blockData = {
        flag: 0,
        webid : '',
        webblockid : '',
        displayorder : '',
        title : '',
        content : ''
      }
      this.blockData.webid = this.formData.webid;
    },
    handleUpdateBlock(row) {
      this.blockDailog = true;
      this.blockData = {
        flag: 1,
        webid : row.webid,
        webblockid : row.webblockid,
        displayorder : row.displayorder,
        title : row.title,
        content : row.content
      }
    },
    updateWebBlockData() {
      updateWebBlock(this.blockData).then(res =>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_update_success);
          this.blockDailog = false;
          this.blockData = {};
          this.getWebBlockList();
        } else {
          this.$message.error({
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    deleteWebBlockData(row) {
      deleteWebBlock({webblockid : row.webblockid, webid : row.webid}).then(res =>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_update_success);
          this.getWebBlockList();
        } else {
          this.$message.error({
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    handleNewsAvatarSuccess(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false);
      this.newsData.coverimage = file.response.path;
    },
    handleprogress(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
    beforeNewsAvatarUpload(file) {
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
    handleAddNews() {
      this.newsDailog = true;
      this.newsData = {
        flag: 0,
        webid : '',
        title : '',
        newstime : '',
        coverimage : '',
        content :  ''
      }
      this.newsData.webid = this.formData.webid;
    },
    handleUpdateNews(row) {
      this.newsDailog = true;
      this.newsData = {
        flag: 1,
        webid : row.webid,
        webnewsid : row.webnewsid,
        title : row.title,
        newstime : row.newstime,
        coverimage : row.coverimage,
        content :  row.content
      }
    },
    updateWebNewsData(row) {
      updateWebNews(row).then(res =>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_update_success);
          this.newsDailog = false;
          this.getWebNewsList(this.getNewsData);
        } else {
          this.$message.error({
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    getWebNewsList(data){
      getWebNews(data).then(res=>{
        if(res.data.success){
          this.newsList = res.data.data;
          this.newsTotal = res.data.total;
          this.newsStart = res.data.start;
          this.newsEnd = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    deleteWebNewsData(row) {
      deleteWebNews(row).then(res =>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_update_success);
          this.getWebNewsList(this.getNewsData);
        } else {
          this.$message.error({
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    handleUpdateNews(row) {
      this.newsDailog = true;
      this.newsData = {
        flag: 1,
        webid : row.webid,
        webnewsid : row.webnewsid,
        title : row.title,
        newstime : row.newstime,
        coverimage : row.coverimage,
        content :  row.content
      }
    },
    handleNewsSizeChange(val){
      this.getNewsData.pagenum = 1;
      this.getNewsData.pagesize = val;
      this.getWebNewsList(this.getNewsData)
    },
    handleNewsCurrentChange(val){
      this.getNewsData.pagenum = val;
      this.getWebNewsList(this.getNewsData)
    },
    searchNews() {
      this.getNewsData.pagenum = 1;
      this.getWebNewsList(this.getNewsData);
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    setformatDate(times, format){
      if(times){
        return formatDate( new Date(times), format)
      }else{
        return '-'
      }
    },
  },
  created(){
    this.actionUrl = axios.defaults.baseURL +'webnews/uploadFile';
    this.getProjectData.languagetype = localStorage.getItem('languagetype');
    this.getProjectData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue;
    this.getProjectData.pagenum = 1;
    this.getNewsData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue;
    this.getNewsData.pagenum = 1;
    getWebInfo().then(res=>{
      if(res.data.success){
        this.formData = res.data.data;
        this.getProjectData.webid = this.formData.webid;
        this.getWebProjectList(this.getProjectData);
        this.getWebBlockList();
        this.getNewsData.webid = this.formData.webid;
        this.getWebNewsList(this.getNewsData);
      }
    })
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.corporate_website ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
  },
}
</script>
