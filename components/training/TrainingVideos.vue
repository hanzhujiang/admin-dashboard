<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.training_videos}}</span>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div class="side_tab">
            <div class="side_tab_box">
              <div class="box-header" >
                <div class="title" >
                  <img src="../../assets/imgs/page/allActivities_1.png" alt="">
                  <span >{{rs.categories}}</span>
                </div>
                <div class="tools">
                  <span v-if="!readonly" @click="handleSaveCategory" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_category}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body" >
                <div class="table_box" style="margin:0">
                  <div style="padding-left:10px;height:40px;line-height:40px" class="bg_light_grey" @click="getAllVideo">All({{AallTotal}})</div>
                  <el-table :data="categorieList" :empty-text="rs.no_data" @row-click="getFaqVideoList" style="width: 100%" :show-header='false' type=index :row-class-name="tableRowClassName" size="mini">
                    <el-table-column prop="name" :show-header='false'>
                      <template slot-scope="scope">
                        {{scope.row.name}}({{scope.row.count}})
                      </template>
                    </el-table-column>
                    <el-table-column width="160">
                      <template slot-scope="scope">
                          <div class="fr">
                          <span class="btntext" @click.stop="handleCategoriesUpdate(scope.row)" v-if="!readonly">{{rs.edit}}</span>
                          <span class="btntext" @click.stop="handleCategoriesDelete(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" v-show="rightShow">
          <div class="box">
            <!-- <div class="box-header">
              <div class="box-title">
                <span>{{rs.video_items}}</span>
                <span style="color:#409EFF">[{{name}}]</span>
              </div>
              <div class="box-tools">
                <span v-if="!readonly" @click="handleSaveVideo" class="span_btn">
                  <i class="fa fa-plus-circle"></i>
                  <span>{{rs.add_video}}</span>
                </span>
              </div>
            </div> -->
            <div class="box-header">
              <div class="title" >
                <img src="../../assets/imgs/page/trainingVideos-1.png" alt="">
                <span >{{rs.video_items}} <span style="color:#409EFF">[{{name}}]</span></span>
              </div>
              <div class="tools">
                <span v-if="!readonly" @click="handleSaveVideo" class="btn_text" >
                <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                <span>{{rs.add_video}}</span>
              </span>
              </div>
            </div>
            <div class="box-body" style="padding-top: 0;">
              <div class="condition clearfix">
                <el-row>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <page-size :pagesize="getVideoData.pagesize" :unit="rs.videos" @changeSize="handleSizeChange"></page-size>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="filter-search">
                      <el-input :placeholder="rs.search_videos" size="mini" clearable v-model="getVideoData.condition" @change="search" @keyup.enter='search'>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="table_box" style="padding-top: 10px;">
                <div class="file_list_area">
                  <ul class="clearfix">
                    <li v-for="(d,i) in VideoList" :key="i" v-dragging="{ item: d, list: VideoList, group:d }" class="videolist" >
                      <div class="handle fl">
                        <div class="fl">
                          <span>
                            <i class="fa fa-bars"></i>
                            <i  style="padding:0 10px">{{i+1}}</i>
                          </span>
                          
                          <!-- thumbnail -->
                          <img v-if="d.thumbnail != null" @click="videoPlayer(d)" :src="d.thumbnail" alt="" style="width:60px;height:40px;vertical-align: middle;cursor: pointer;">
                          <img v-else @click="videoPlayer(d)" :src="d.videofile +'?x-oss-process=video/snapshot,t_1000,m_fast'" alt="" style="width:60px;height:40px;vertical-align: middle;cursor: pointer;">
                        </div>
                        <div class="fl">
                            <p class="titleOrdisplayname"><strong style="margin-left:20px;font-size:12px">{{d.title}}</strong></p>
                            <p class="titleOrdisplayname"><span style="padding:0 20px">{{d.displayname}}</span></p>
                        </div>
                      </div>
                      <div class="fr">
                        <span class="btntext" @click="handleUpdateVideo(d)" v-if="!readonly">{{rs.edit}}</span>
                        <span class="btntext" @click="handleDeleteVideo(d)" v-if="!readonly">{{rs.delete}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="table_footer" v-if="total">
                <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.viedos}}</div>
                  <div class="fr">
                    <el-pagination :background="false" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="getVideoData.pagenum" layout="prev, pager, next" :page-size="getVideoData.pagesize" :total="total" class="fr">
                    </el-pagination>
                  </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog :close-on-click-modal='false'  :visible.sync="detialPlayVideo" @close="closePlay">
      <player :video-url="videoUrl" :state="state"></player>
    </el-dialog>
    <el-dialog :close-on-click-modal='false' :visible.sync="addCategory" width='40%'>
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.video_category}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.name}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10"  v-for="(d, index) in langList" :key="d.type">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group-lang">
              <div :class="index==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
              <el-input v-model="langObj[d.languageid]" size="small" clearable maxlength="100" :disabled="readonly"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   class="small" style="color:#000;" @click="addCategory=false">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="saveAddCategory" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal='false' :visible.sync="addVideo" width='60%'>
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.video}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="form-group">
                  <div class="sub-title-first">{{rs.title}}
                    <span class="required">*</span>
                  </div>
                  <div class="content">
                    <el-input v-model="formData.title" maxlength="100" :disabled="readonly" size="small"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="form-group">
                  <div class="sub-title">{{rs.category}}
                    <span class="required">*</span>
                  </div>
                  <div class="content">
                    <el-select v-model="formData.category" style="width:100%" size="small" placeholder=" ">
                      <el-option v-for="(d,index) in categoryList" :value="d.code" :label="d.name" :key="index"></el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="form-group">
                  <div class="sub-title">{{rs.description}}
                    <span class="required">*</span>
                  </div>
                  <div class="content videos_textarea">
                    <el-input style="width:100% "  type="textarea" maxlength="500" :rows="11" placeholder=" " v-model="formData.description">
                    </el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-row>
              <el-col :span="24">
                <div class="form-group">
                  <div class="sub-title-first">{{rs.video_file}}</div>
                  <div class="content">
                    <el-upload drag :show-file-list="false" :on-success="LightVideo" :before-upload="beforeAvatarUploadVideo" :on-progress="uploadVideoProcess" :multiple="true" style="width:100%" :action="actionUrl">
                      <img v-if="showVideoImg" :src="showVideoImg" class="avatar" style="width:360px;height:180px">
                      <div v-else>
                        <i class="el-icon-upload" v-if="!videoFlag"></i>
                        <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                        <div v-else>
                          <div class="el-upload__text">{{rs.drop_file_here_or_click}}</div>
                          <div class="el-upload__text">{{rs.only_accept}} .mp4</div>
                        </div>
                      </div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="sub-title">{{rs.thumb_picture}}</div>
                  <div class="content">
                    <el-upload
                    class="avatar-uploader"
                    :action="actionUrl1"
                    :show-file-list="false"
                    :disabled="readonly"
                    :on-success="handleAvatarSuccess"
                    :on-progress="handleprogress"
                    accept="image/gif,image/bmp,image/jpeg,image/png"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="formData.thumbnail" :src="formData.thumbnail" class="avatar">
                    <img v-else src="../../assets/imgs/no_pictures.png" alt="">
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   class="small" style="color:#000;" @click="addVideo=false">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="saveNameVideo" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    </form>
  </div>
</template>
<script>
import { getVideoList, updateVideo, insertVideo, deleteVideo, getcategory, getVideoCategoryList,
        updateCategory, insertCategory, deleteCategory, updateOrderVideo } from "@/api/trainingApi.js";
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import axios from "axios";
export default {
  data() {
    return {
      actionUrl1:'',
      name: "",
      total: "",
      start: "",
      end: "",
      actionUrl: "",
      detialPlayVideo: false,
      categoryList: [],
      allClassName: "",
      addVideo: false,
      showVideoImg: "",
      videoUploadPercent: 0,
      AallTotal: "",
      langObj: {},
      rightShow: false,
      addCategory: false,
      videoFlag: false,
      state: false,
      videoUrl: "",
      categorieList: [],
      isUpdateCategory: true,
      isUpdateVideo: true,
      isActive: "",
      code: "",
      VideoList: [],
      formData: {
        title: "",
        category: "",
        description: "",
        keyid: "02",
        displayorder: 1,
        displayname: "",
        thumbnail:''
        // faqid:''
      },
      getVideoData: {
        pagenum: 1,
        pagesize: 10,
        Category: "",
        videofile: "",
        keyid: "02"
      },
      getCategorieData: {
        languagetype: "",
        keyid: "02"
      }
    };
  },
  components: {
    "top-nav": resolve => require(["@/common/TopNav.vue"], resolve),
    "page-size": resolve => require(["@/common/PageSize.vue"], resolve),
    player: resolve => require(["@/common/Player.vue"], resolve)
  },
  methods: {
    // /////////////////
    handleAvatarSuccess(res, file) {
        this.$store.commit('SET_SHOW_LOADING',false)
        this.formData.thumbnail = file.response.path
      },
      handleprogress(event, file, fileList){
        this.$store.commit('SET_SHOW_LOADING',true)
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
    search() {
      this.getVideo(this.getVideoData);
    },
    // 分页方法
    handleSizeChange(val) {
      //一页多少条
      this.getVideoData.pagenum = 1;
      this.getVideoData.pagesize = val;
      this.getVideo(this.getVideoData);
    },
    handleCurrentChange(val) {
      //第几页
      this.getVideoData.pagenum = val;
      this.getVideo(this.getVideoData);
    },
    // 手拉琴chang
    handleChange(val) {
    },
    videoPlayer(d) {
      this.videoUrl = d.videofile;
      this.detialPlayVideo = true;
    },
    closePlay() {},
    /////////Video
    //查所有Itme
    getAllVideo() {
      this.name = 'All'
      this.rightShow = true;
      this.allClassName = "bg_light_grey";
      this.isActive = "";
      this.getVideoData.Category = "";
      this.getVideo(this.getVideoData);
    },
    //分类查询
    getFaqVideoList(row, event, column) {
      this.name = row.name;
      this.rightShow = true;
      this.isActive = row;
      this.allClassName = "";
      this.getVideoData.Category = row.code;
      this.getVideo(this.getVideoData);
    },
    getVideo(data) {
      getVideoList(data).then(res => {
        if (res.data.success) {
          
          this.VideoList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    saveNameVideo() {
      if (this.isUpdateVideo) {
        insertVideo(this.formData).then(res => {
          if (res.data.success) {
            this.$message.success(this.rs.info_msg_insert_success);
            this.getVideo(this.getVideoData);
            this.getCategorie(this.getCategorieData);
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      } else {
        updateVideo(this.formData).then(res => {
          if (res.data.success) {
            this.$message.success(this.rs.info_msg_update_success);
            this.getVideo(this.getVideoData);
            this.getCategorie(this.getCategorieData);
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      }
      this.addVideo = false;
    },
    //点击修改Video按钮事件
    handleUpdateVideo(row) {
      this.isUpdateVideo = false;
      this.addVideo = true;
      this.showVideoImg = "";
      getVideoList({ videoid: row.videoid }).then(res => {
        if (res.data.success) {
          if (res.data.data.length != 0) {
            let obj = {};
            let rowData = res.data.data[0];
            for (var key in rowData) {
              obj[key] = rowData[key];
            }
            this.formData = obj;
            this.showVideoImg =
              this.formData.videofile +
              "?x-oss-process=video/snapshot,t_1000,m_fast";
          } else {
            this.$message.error({ message: "该数据已经不存在" });
          }
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    //删video事件
    handleDeleteVideo(row) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: "warning",
        center: true
      })
        .then(() => {
          deleteVideo({ ids: row.videoid }).then(res => {
            if (res.data.success) {
              this.getVideo(this.getVideoData);
              this.getCategorie(this.getCategorieData);
              this.$message.success(this.rs.info_msg_delete_success);
            } else {
              this.$message.error({
                dangerouslyUseHTMLString: true,
                message: this.ErrorMsgStr(res.data.data)
              });
            }
          });
        })
        .catch(() => {
          this.$message.info(this.rs.cancel_delete);
        });
    },
    ///////////////////////
    // addVideo事件
    handleSaveVideo() {
      this.isUpdateVideo = true;
      this.addVideo = true;
      this.showVideoImg = "";
      this.getCategoryList();
      this.formData = {
        title: "",
        category: "",
        description: "",
        keyid: "02",
        displayorder: 1,
        thumbnail:''
      };
    },
    // 获取下拉框列表
    getCategoryList() {
      getcategory({ keyid: "02", languagetype: this.languagetype }).then(
        res => {
          if (res.data.data) {
            this.categoryList = res.data.data;
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        }
      );
    },
    // 转换多语言数组字符串
    setLanguageNameArrStr(obj) {
      let Arr = [];
      for (var key in obj) {
        Arr.push({ type: key, content: obj[key] });
      }
      return JSON.stringify(Arr);
    },
    // 新增和修改 Categorie
    saveAddCategory() {
      if (this.isUpdateCategory) {
        insertCategory({
          name: this.setLanguageNameArrStr(this.langObj),
          keyid: "02"
        }).then(res => {
          if (res.data.success) {
            this.$message.success(this.rs.info_msg_insert_success);
            this.getCategorie(this.getCategorieData);
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      } else {
        updateCategory({
          name: this.setLanguageNameArrStr(this.langObj),
          code: this.code,
          keyid: "02"
        }).then(res => {
          if (res.data.success) {
            this.$message.success(this.rs.info_msg_update_success);
            this.getCategorie(this.getCategorieData);
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      }
      this.addCategory = false;
    },
    //修改回显
    handleCategoriesUpdate(row) {
      this.isUpdateCategory = false;
      this.code = row.code;
      getcategory({ code: row.code, keyid: "02" }).then(res => {
        if (res.data.success) {
          res.data.data.forEach(element => {
            var key = element.languagetype;
            this.langObj[key] = element.name;
          });
          this.langObj = Object.assign({}, this.langObj);
          this.addCategory = true;
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    // add按钮事件
    handleSaveCategory() {
      
      this.isUpdateCategory = true;
      this.addCategory = true;
      this.langObj = {};
    },
    // 查询Categories
    getCategorie(data) {
      getVideoCategoryList(data).then(res => {
        if (res.data.success) {
          this.categorieList = res.data.data;
          this.AallTotal = res.data.total;
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    // 删除Categories
    handleCategoriesDelete(row) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: "warning",
        center: true
      })
        .then(() => {
          deleteCategory({ ids: row.code }).then(res => {
            if (res.data.success) {
              this.getCategorie(this.getCategorieData);
              this.$message.success(this.rs.info_msg_delete_success);
            } else {
              this.$message.error({
                dangerouslyUseHTMLString: true,
                message: this.ErrorMsgStr(res.data.data)
              });
            }
          });
        })
        .catch(() => {
          this.$message.info(this.rs.cancel_delete);
        });
    },

    ErrorMsgStr(arr) {
      let str = "";
      arr.forEach(element => {
        str +=
          "<p>" + this.rs[element.message] + "(" + element.target + ")</p>";
      });
      return str;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row == this.isActive) {
        return "bg_light_grey";
      }
    },
    //上传视频前钩子
    beforeAvatarUploadVideo(file) {
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt100M) {
        this.$message.error("上传视频大小不能超过100MB!");
        return false;
      }
    },
    // 上传进度
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    //上传视频成功后
    LightVideo(res, file) {
      this.videoUploadPercent = 100;
      this.videoFlag = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      this.formData.videofile = file.response.path;
      this.showVideoImg =
        file.response.path + "?x-oss-process=video/snapshot,t_1000,m_fast";
      this.formData.displayname = file.name;
    }
  },
  created() {
    this.actionUrl = axios.defaults.baseURL + "video/uploadFile";
    this.actionUrl1 = axios.defaults.baseURL +'video/uploadLogo';
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.langList = JSON.parse(localStorage.getItem("selectlist")).Language;
    this.getVideoData.pagesize = JSON.parse(
      localStorage.getItem("selectlist")
    ).DATA_COUNT_LIST[0].intvalue;
    this.getVideoData.languagetype = localStorage.getItem("languagetype");
    this.getCategorieData.languagetype = localStorage.getItem("languagetype");
    this.getCategorie(this.getCategorieData);
    this.getCategoryList();

  },
  mounted() {
    this.$dragging.$on("dragend", () => {
      var upArr = [];
      this.VideoList.forEach((element, index, key) => {
        if (element == undefined) {
        } else {
          upArr.push({ id: element.videoid, order: index + 1 });
        }
      });
      updateOrderVideo({ orderlist: JSON.stringify(upArr) }).then(res => {
        if (res.data.success) {
          this.getVideo(this.getVideoData);
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    });
  },
  computed: {
    ...mapGetters(["se", "rs", "languagetype", "control"]),
    readonly() {
      if (this.control.traning_video === "02") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    languagetype(val) {
      this.getVideoData.languagetype = val;
      this.getCategorieData.languagetype = val;
      this.getCategorie(this.getCategorieData);
      this.getVideo(this.getVideoData);
    },
  }
};
</script>
<style scoped>
.bg_light_grey:hover{
   background: #F5F7FA;
 }
 .player {
   margin-top: 25px;
 }
 .videolist{
  border-radius:5px;
  border: 1px solid #f7f5fa;
  padding: 5px 10px;
  margin: 2px 0px;
 }
.file_list_area li {
  height: 50px;
  line-height: 50px;
  cursor: move;
}
.titleOrdisplayname{
  line-height: 25px;
}
</style>
<style>
.videos_textarea.el-textarea__inner{
  height: 228px;
}
</style>


