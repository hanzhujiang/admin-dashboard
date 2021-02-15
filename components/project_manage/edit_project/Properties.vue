<template>
  <div class="wrapper clearfix" v-loading.fullscreen="loading" :element-loading-text="rs.loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.project_detail}} - {{project_name}}</span>
      </div>
      <div class="tools">
        <span class="btn_text" @click="handleInfo" v-if="!readonly">
          <i class="el-icon-info" style="color:#99a2bd;font-size:14px"></i><span style="padding-left:5px">{{rs.how_to_use}}</span>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="!readonly">[</span> 
        <span class="btn_text" @click="goRouter('/project_manage/edit_project/propertyDetail')" v-if="!readonly">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_property}}</span>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

        <span class="btn_text" @click="addPicture" v-if="!readonly">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_picture}}</span>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

        <span class="btn_text" @click="addAttachment" v-if="!readonly">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_attachment}}</span>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

        <span class="btn_text" @click="downloadTemplate" v-if="!readonly">
          <!-- <i class="fa fa-download"></i> -->
          <img class="icon" src="../../../assets/imgs/page/properties_1.png" alt="">
          <span>{{rs.download_template}}</span>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

        <label class="btn_text" v-if="!readonly">
          <img class="icon" src="../../../assets/imgs/page/properties_2.png" alt="">
          <span>{{rs.import_template}}</span>
          <input ref='fileInput2' class="file" style="display:none" name="file" type="file" @change="TemplateUploadFile" />
        </label>
        <span v-if="!readonly">]</span>

        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="!readonly">[</span>
        <span class="btn_text" @click="excelDownLoad" v-if="!readonly">
          <img class="icon" src="../../../assets/imgs/page/properties_1.png" alt="">
          <span>{{rs.export_pricelist}}</span>
        </span>

        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <label class="btn_text" v-if="!readonly">
          <img class="icon" src="../../../assets/imgs/page/properties_2.png" alt="">
          <span>{{rs.import_pricelist}}</span>
          <input ref='fileInput1' class="file" style="display:none" name="file" type="file" @change="uploadFile" />
        </label>
        <span v-if="!readonly">]</span>
      </div>
    </div>
   <form autocomplete="on">
      <div class="wrapper-condition clearfix ">
        <el-row>
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <div class="filter-count">
              <page-size :unit='rs.properties' :size="100" @changeSize="handleSizeChange"></page-size>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-padding">
              <span>{{rs.status}}:</span>
              <el-select v-model="getData.available" placeholder="" style="margin-right: 10px;" size="mini" @change="search">
                <el-option
                  :label="rs.available"
                  value="1">
                </el-option>
                <el-option
                  :label="rs.unavailable"
                  value="0">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="filter-search">
              <el-input :placeholder="rs.search_properties" @change="search" @keyup.enter='search' clearable v-model="getData.condition" class="input-key" size='mini'>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-table :data="propertyList"
                 :empty-text="rs.no_data" style="width: 100%" :show-overflow-tooltip="true" size="mini"
                  :default-sort = "{prop: 'lotnumber', order: 'ascending'}"
                  @sort-change="sortChange"
                  :row-class-name="tableRowClassName">
                  <el-table-column prop="lotnumber"  sortable  :label="rs.lot" width="100">
                  </el-table-column>
                  <el-table-column prop="unitnumber" sortable :label="rs.unit" width="100">
                  </el-table-column>
                  <el-table-column prop="bedroomqty" sortable label="fa fa-bed" align="center" width="70" :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column prop="bathroomqty" sortable label="fa fa-bath" align="center" width="70" :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column prop="studymediaqty" sortable label="fa fa-book" align="center" width="70" :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column prop="carspaceqty" sortable label="fa fa-car" align="center" width="70" :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column prop="internalarea" sortable :label="rs.internal" width="100">
                  </el-table-column>
                  <el-table-column prop="externalarea" sortable :label="category == '02'?rs.land:rs.external" width="100">
                  </el-table-column>
                  <el-table-column prop="aspect" :label="rs.aspect" sortable>
                    <template slot-scope="scope">
                      {{AspectObj[scope.row.aspect]}}
                    </template>
                  </el-table-column>
                  <el-table-column  :label="rs.plan_floor">
                    <template slot-scope="scope">
                      <!-- {{scope.row.attachmentlist03}} -->
                      <p v-for="(d,index) in scope.row.attachmentlist03" :key="index">
                        <a :href="d.filepath">{{d.displayname}}</a>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" :label="rs.price" sortable>
                    <template slot-scope="scope">
                      {{scope.row.price?'$':''}}{{setNumber(scope.row.price)}}
                    </template>
                  </el-table-column>
                  <el-table-column :label="rs.status">
                    <template slot-scope="scope">
                      <el-tooltip :content="scope.row.holdreason" placement="top" effect="light"
                        v-if="scope.row.available == 0&&scope.row.soldstatus == 0&&scope.row.holdreason">
                        <span>
                        {{scope.row.available == 1?rs.available:scope.row.soldstatus == 1?rs.pending:
                            scope.row.soldstatus == 2?rs.sold:rs.held}}
                        </span>
                      </el-tooltip>
                      <span v-else>
                      {{scope.row.available == 1?rs.available:scope.row.soldstatus == 1?rs.pending:
                          scope.row.soldstatus == 2?rs.sold:rs.held}}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="rs.action" width="280">
                    <template slot-scope="scope">
                      <span class="btntext" v-if="readonly" @click="handleShow(scope.row)">{{rs.detail}}</span>
                      <span class="btntext" v-else @click="handleEdit(scope.row)">{{rs.edit}}</span>
                      <el-tooltip :content="rs.other_sold" placement="top" effect="light"
                            v-if="!readonly && scope.row.holdingflag=='0' && scope.row.salevisible=='0'">
                            <span class="btntext_disable" style="padding: 0 10px;">
                                    {{rs.sales}}
                            </span>
                      </el-tooltip>
                      <span class="btntext" @click="goReserve('/project_manage/edit_project/saleAdvice',scope.row)" 
                            v-if="!readonly && scope.row.holdingflag=='0' && scope.row.salevisible=='1'">
                            {{!scope.row.salestatus?rs.reserve:rs.sales}}</span>
                      <span class="btntext" @click="handleSetHoldingflag(scope.row)" 
                          v-if="!readonly && isrunning=='1'">
                            {{scope.row.holdingflag=='1'?rs.open:rs.hold}}</span>
                      <span class="btntext" style="color:red;" @click="handleDelete(scope.row.propertyid)" 
                          v-if="!readonly && scope.row.available=='1'">{{rs.delete}}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="table_footer" v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.properties}}</div>
                  <div class="fr">
                  <el-pagination :background="false" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="getData.pagesize" :total="total" class="fr">
                  </el-pagination>
                </div>
              </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 添加图片 -->
    <el-dialog :visible.sync="pictureShow" :close-on-click-modal='false' width="60%" :before-close="handleClose">
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.add_picture}}</span>
        </div>
      </template>
      <div class="upload_box">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="upload_area">
              <el-upload drag :show-file-list="false" :on-success="LightImgPicture" :before-upload="beforeAvatarUploadPicture"
                    :on-progress="uploadVideoProcessPicture" :multiple="true" :action="actionAttUrl1">
                <i class="el-icon-upload" v-if="!videoFlagPicture"></i>
                <el-progress v-if="videoFlagPicture" type="circle" :percentage="videoUploadPercentPicture" style="margin-top:30px;"></el-progress>
                <div class="el-upload__text" v-if="!videoFlagPicture">{{rs.drop_file_here_or_click}}</div>
                <div class="el-upload__text" v-if="!videoFlagPicture">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png</div>
              </el-upload>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="file_list_area">
              <ul>
                <li v-for="(d,i) in pictureList" :key="i" v-dragging="{ item: d, list: pictureList, group: 'color' }">
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                      <span>
                        <i class="fa fa-bars"></i>
                      </span>
                      <span>{{i+1}}</span>
                    </el-col>
                    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                      <el-popover placement="left" width="300" trigger="click">
                        <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt=""></div>
                        <template slot="reference">
                          <span><img :src="d.filepath+'?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt="" style=" vertical-align: middle;cursor: pointer;" /></span>
                        </template>
                      </el-popover>
                    </el-col>
                    <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                      <el-input style="display:inline-block" size='mini' v-model="pictureList[i].displayname" maxlength="100"></el-input>
                    </el-col>
                    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" :offset='1'>
                      <span class="btntext" @click="handleDeleteAtt(d,pictureList,pictureDeleList)">{{rs.delete}}</span>
                    </el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button   @click="pictureShow = false">{{rs.cancel}}</el-button>
        <el-button   type="primary" @click="submitPicture">{{rs.confirm}}</el-button>
      </span>
    </el-dialog>
    <!-- 弹出层  添加附件-->
    <el-dialog :visible.sync="attachmentShow" :close-on-click-modal='false' width="60%" :before-close="handleClose">
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.add_attachment}}</span>
        </div>
      </template>
      <div class="upload_box">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="upload_area">
              <el-upload drag :show-file-list="false" :on-success="LightImg" :before-upload="beforeAvatarUpload" :on-progress="uploadVideoProcess" :multiple="true" :action="actionAttUrl2">
                <i class="el-icon-upload" v-if="!videoFlag"></i>
                <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                <div class="el-upload__text" v-if="!videoFlag">{{rs.drop_file_here_or_click}}</div>
                <div class="el-upload__text" v-if="!videoFlag">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png,</div>
                <div class="el-upload__text" v-if="!videoFlag">.pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
              </el-upload>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="file_list_area">
              <ul>
                <li v-for="(d,i) in fileList" :key="i" v-dragging="{ item: d, list: fileList, group: 'color' }">
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" :offset="1">
                      <span>
                        <i class="fa fa-bars"></i>
                      </span>
                      <span>{{i+1}}</span>
                    </el-col>
                    <!-- <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                      <el-select v-model="d.attachmenttype" placeholder=" " style="width:150px" size="mini">
                        <el-option v-for="item in attachmentSelect" :key="item.code" :label="item.value" :value="item.code">
                        </el-option>
                      </el-select>
                    </el-col> -->
                    <el-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17">
                      <el-input size='mini' v-model="fileList[i].displayname" maxlength="100"></el-input>
                    </el-col>
                    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" :offset='1'>
                      <span class="btntext" @click="handleDeleteAtt(d,fileList,attachmentDeleList)">{{rs.delete}}</span>
                    </el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button   @click="attachmentShow = false">{{rs.cancel}}</el-button>
        <el-button   type="primary" @click="submitAttachment">{{rs.confirm}}</el-button>
      </span>
    </el-dialog>
    <!-- 弹出层  导入房源-->
    <el-dialog :visible.sync="importShow" :close-on-click-modal='false' width="60%" :before-close="handleClose">
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.map_table_head}}</span>
        </div>
      </template>
      <el-row style="padding:5px 20px">
        <el-col :span="12">
          <h3>{{rs.excel_table_head}}</h3>
        </el-col>
        <el-col :span="12">
          <h3>{{rs.recognizable_table_head}}</h3>
        </el-col>
      </el-row>
      <el-row v-for="(d,index) in  list" :key="d" style="padding:5px 20px;border-bottom:1px dotted #CCC;">
        <el-col :span="12">{{d}}</el-col>
        <el-col :span="12">
          <el-select v-model="valueList[index]" placeholder=" " clearable size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button   @click="importShow = false">{{rs.cancel}}</el-button>
        <el-button   type="primary" @click="submitEx">{{rs.confirm}}</el-button>
      </span>
    </el-dialog>
    <!-- info 弹窗 -->
    <el-dialog :visible.sync="infoShow" :close-on-click-modal='false' width="60%" :before-close="handleClose">
      <template slot="title">
        <div class="dialog-header">
          <span class="title">Pricelist Upload Instruction</span>
        </div>
      </template>
      <div class="att_info">
        <h4>When Adding A New Project:</h4>
        <p>Step 1: Add Attachments - Drag and drop floor plans and files into the file storage, and waiting for all files to upload successfully.</p>
        <p>Step 2: Download Template - the template file already has the attachment column populated, selected the correct plan to align with each unit.</p>
        <p>Step 3: Input the rest of the information correctly into each respective column.</p>
        <p>Step 4: Save the file and close. We recommend you name the file for future use.</p>
        <p>Step 5: Import Template - Select the saved template file and well done, the price list should be successfully uploaded with the correct information and plans.</p>
        <h4>When Editing An Existing Project:</h4>
        <p>Step 1: Download Template - this action will download the latest price list template for this project. (No attachment changes needed, applied that all the floor plans have been uploaded correctly when creating this project)</p>
        <p>Step 2: Make changes to the downloaded file. Then save.</p>
        <p>Step 3: Import Template - upload template again, and the latest price list will show up in the database.</p>
        <h4>When Adding A New Property:</h4>
        <p>Step 1: Add New Property - a new page would open for you to input information for this property. Including adding attachments.</p>
        <p>Step 2: Click Save and then you are good to go. The added property should show up correctly in the price list.</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">{{rs.cancel}}</el-button>
        <el-button type="primary" @click="submitEx">{{rs.confirm}}</el-button> -->
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="holdDailog"
      width='40%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.hold_reason}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.hold_reason}} <span class="required">*</span></div>
              <div class="content">
                <el-input v-model="holdParam.holdreason" maxlength="200" size="small"  @blur="validatorBlur('holdreason')"></el-input>
                <p class="curtail" v-show="validatorSave.holdreason.flg">{{rs[validatorSave.holdreason.msg]}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button style="color:#000;" class="small" @click="holdDailog=false">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="updateHoldReason()" :disabled="readonly">{{rs.confirm}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPropertyList, deleteProperty, importProperty, importPropertyData, getAttachmentList, insertAttachmentList,
        insertPictureList, getPictureList, getExcelISForAs, getProjectCategory, updateHoldingflag } from "@/api/projectApi.js";
import axios from "axios";
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'

export default {
  data() {
    return {
      isFullEdit:'0',
      isPlatform:'0',
      isrunning:'0',
      project_name:'',
      category:'01',
      attachmentShow: false,
      infoShow:false,
      videoFlag: false,
      fileList: [],
      attachmentSelect: [],
      pictureList: [],
      videoFlagPicture: false,
      pictureShow: false,
      uploadFileUrl: "",
      loading: false,
      pictureDeleList: [],
      attachmentDeleList: [],
      actionAttUrl1: "", //图片
      actionAttUrl2: "", //附件
      // --------------------------------------
      propertyList: [],
      importShow: false,
      files: "",
      total: 0, //总条数
      start: 1, //起始页
      end: 10, //结束页
      list: [],
      userInfo:{},
      getData: {
        languagetype: "01",
        pagenum: 1,
        pagesize: 3,
        condition: "",
        projectid: "",
        isplatform: "0",
        available:'1'
      },
      AspectObj: {},
      holdDailog:false,
      holdParam: {
        propertyid:'',
        holdingflag:'',
        holdreason:'',
        projectid:''
      },
      options: [
        {
          value: "lotnumber",
          label: "lotnumber"
        },
        {
          value: "unitnumber",
          label: "unitnumber"
        },
        {
          value: "bedroomqty",
          label: "bedroomqty"
        },
        {
          value: "bathroomqty",
          label: "bathroomqty"
        },
        {
          value: "price",
          label: "price"
        },
        {
          value: "aspect",
          label: "aspect"
        },
        {
          value: "externalarea",
          label: "externalarea"
        },
        {
          value: "internalarea",
          label: "internalarea"
        },
        {
          value: "studymediaqty",
          label: "studymediaqty"
        },
        {
          value: "carspaceqty",
          label: "carspaceqty"
        },
        {
          value: "description",
          label: "description"
        },
        {
          value: "havestorage",
          label: "havestorage"
        },
        {
          value: "country",
          label: "country"
        },
        {
          value: "postcode",
          label: "postcode"
        },
        {
          value: "state",
          label: "state"
        },
        {
          value: "suburb",
          label: "suburb"
        },
        {
          value: "addressline2",
          label: "addressline2"
        },
        {
          value: "addressline",
          label: "addressline"
        }
      ],
      valueList: [],
      validatorSave:{
        holdreason:{
          vaid:['noNull'],
          flg:false
        }
      }
    };
  },
  components: {
    // "top-nav": resolve => require(["@/common/TopNav.vue"], resolve),
    "page-size": resolve => require(["@/common/PageSize.vue"], resolve),
    // 'navigation':resolve=> require(['../edit_project/template/navigation.vue'],resolve),
  },
  methods: {
    validatorBlur(key){
      validator(this.validatorSave,this.holdParam,key)
    },
    sortChange(val){
    },
    tableRowClassName(scope,rowIndex){
      if(scope.row.holdingflag == '1'){
        return 'bg_ccc'
      }else{
        return ''
      }
    },
    handleInfo(){
      this.infoShow = true;
    },
    handleSetHoldingflag(row){
      this.holdParam = {
        propertyid:row.propertyid,
        projectid:row.projectid
      }
      if (row.holdingflag == '0') {
        this.holdParam.holdReason = '';
        this.holdDailog = true;
      } else {
        this.holdParam.holdreason = '';
        this.holdParam.holdingflag = '0',
        updateHoldingflag(this.holdParam).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            this.getProperty(this.getData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    search() {
      this.getData.pagenum = 1;
      this.getProperty(this.getData);
    },
    handleSizeChange(val) {
      //一页多少条
      this.getData.pagesize = val;
      this.getData.pagenum = 1;
      this.getProperty(this.getData);
    },
    handleCurrentChange(val) {
      //第几页
      this.getData.pagenum = val;
      this.getProperty(this.getData);
    },
    goRouter(path) {
      this.$router.push({ path: path + "/" + this.getData.projectid });
    },
    goRouter2(path){
      this.$router.push({path})
    },
    setNumber(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
    // 获取房源列表
    getProperty(data) {
      data.isplatform = this.isPlatform;
      getPropertyList(data).then(res => {
        if (res.data.success) {
          this.propertyList = res.data.data;
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
    // 保存修改
    handleEdit(data) {
      sessionStorage.removeItem("propertyid");
      sessionStorage.setItem('isrunning', this.isrunning);
      this.$router.push({
        path: "/project_manage/edit_project/propertyDetail/update",
        query: { id: data.propertyid, projectid: this.getData.projectid }
      });
    },
    // 保存修改
    handleShow(data) {
      sessionStorage.removeItem("propertyid");
      this.$router.push({
        path: "/project_manage/edit_project/propertyView/update",
        query: { id: data.propertyid, projectid: this.getData.projectid }
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
    handleClose(done) {
      done();
    },
    handleDelete(id) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: "warning",
        center: true
      })
        .then(() => {
          deleteProperty({ ids: id,projectid: this.getData.projectid }).then(res => {
            if (res.data.success) {
              this.getProperty(this.getData);
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
    updateHoldReason() {
      if(allvalidator(this.validatorSave,this.holdParam)){
        return
      }
      this.holdParam.holdingflag = '1';
      updateHoldingflag(this.holdParam).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success)
          this.holdParam.holdreason = '';
          this.holdDailog = false;
          this.getProperty(this.getData);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    goReserve(path,row){
      this.goRouter2(path);
      sessionStorage.setItem('isFalg',JSON.stringify({propertyid:row.propertyid,type:'all_properties',agencyprojectid:row.agencyprojectid,saleid:row.saleid,isChannel:0}))
    },
    renderHeader(createElement, { column, _self }) {
      let className = column.label;
      return createElement("i", { class: className });
    },
    // 下载
    excelDownLoad() {
      if (this.isPlatform == '1') {
        window.location.href =
          axios.defaults.baseURL +
          "property/ExcelProperty?languagetype=" +
          this.languagetype +
          "&projectid=" +
          this.getData.projectid +
          "&isplatform=1";
      } else {
        window.location.href =
          axios.defaults.baseURL +
          "property/ExcelProperty?languagetype=" +
          this.languagetype +
          "&projectid=" +
          this.getData.projectid +
          "&isplatform=0";
      }
    },
    // 上传
    uploadFile(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("uploadXls", file, file.name); //通过append向form对象添加数据
      param.append("token", this.userInfo.token); //通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      axios.post(this.actionUrl, param, config).then(response => {
        this.importShow = true;
        this.list = response.data.data;
        this.valueList = response.data.dbdata;
      });
    },
    // 模板导入
    TemplateUploadFile(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("uploadXls", file, file.name); //通过append向form对象添加数据
      param.append("projectid", this.getData.projectid); //添加form表单中其他数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      this.loading = true;
      axios.post(this.uploadFileUrl, param, config).then(res => {
        if (res.data.success) {
          this.loading = false;
          this.getProperty(this.getData);
        } else {
          this.loading = false;
        }
        this.$refs.fileInput2.value =''
      }).catch(response=>{
         this.loading = false;
         this.$message.error('系统错误');
      });
    },
    submitEx() {
      let datalist = [];
      this.valueList.forEach((element, i) => {
        datalist.push({ filefieid: this.list[i], dbfieid: element });
      });
      let ary = this.valueList;
      let nary = ary.slice().sort();
      for (let i = 0; i < ary.length; i++) {
        if (nary[i]) {
          if (nary[i] == nary[i + 1]) {
            this.$message.error(nary[i] + this.rs.err_msg_exist);
            return;
          }
        }
      }
      importPropertyData({
        projectid: this.getData.projectid,
        datalist: JSON.stringify(this.valueList),
        datalist: JSON.stringify(datalist),
        token:this.userInfo.token
      }).then(res => {
        if (res.data.success) {
          this.importShow = false;
          this.$message.success(this.rs.info_msg_update_success);
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    // 删除附件
    handleDeleteAtt(d, Data, dele) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: "warning",
        center: true
      })
        .then(() => {
          Data.forEach(element => {
            if (d == element) {
              Data.remove(element);
              dele.push(d.filepath);
            }
          });
        })
        .catch(() => {
          this.$message.info(this.rs.cancel_delete);
        });
    },
    // 新增附件
    addAttachment() {
      this.attachmentShow = true;
      this.getAttachment();
    },
    addPicture() {
      this.pictureShow = true;
      getPictureList({ referid: this.getData.projectid, refertype: "9" }).then(
        res => {
          if (res.data.success) {
            this.pictureList = res.data.data;
          }
        }
      );
    },
    // get attachmentList
    getAttachment() {
      getAttachmentList({
        referid: this.getData.projectid,
        refertype: "9"
      }).then(res => {
        if (res.data.success) {
          this.fileList = res.data.data;
        }
      });
    },
    submitPicture() {
      let urllist = this.pictureDeleList.join(",");
      insertPictureList({
        picturelist: JSON.stringify(this.pictureList),
        projectid: this.getData.projectid,
        urllist
      }).then(res => {
        if (res.data.success) {
          this.pictureShow = false;
          this.pictureDeleList = [];
          this.$message.success(this.rs.info_msg_insert_success);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      });
    },
    submitAttachment() {
      let urllist = this.attachmentDeleList.join(",");
      this.fileList.forEach(ele => {
        ele.attachmenttype ='03'
      });
      insertAttachmentList({
        attachmentlist: JSON.stringify(this.fileList),
        projectid: this.getData.projectid,
        urllist
      }).then(res => {
        if (res.data.success) {
          this.attachmentShow = false;
          this.attachmentDeleList = [];
          this.$message.success(this.rs.info_msg_insert_success);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      });
    },
    LightImgPicture(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.videoUploadPercentPicture = 100;
      this.videoFlagPicture = false;
      let fileExtension = file.name.substring(file.name.lastIndexOf('.'));  

      var fileData = {
        displayname: file.name.replace(fileExtension,''),
        filepath: file.response.path,
        picturetype: "02", //文件类型
        refertype: "9",
        displayorder: this.pictureList.length + 1,
        referid: this.getData.projectid
      };
      this.pictureList.push(fileData);
    },
    // 上传进度
    uploadVideoProcessPicture(event, file, fileList) {
      this.videoFlagPicture = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercentPicture = parseInt(file.percentage.toFixed(0));
    },
    beforeAvatarUploadPicture(file) {
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isBMP = file.type === "image/bmp";
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      if (!isBMP && !isPNG && !isJPG && !isGIF) {
        this.$message.error(this.rs.err_msg_file_type);
      }
      return (isBMP || isJPG || isGIF || isPNG) && isLt100M;
    },
    LightImg(res, file) {
      let fileExtension = file.name.substring(file.name.lastIndexOf('.'));  
      this.videoUploadPercent = 100;
      this.videoFlag = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      var fileData = {
        displayname:  file.name.replace(fileExtension,''),
        filepath: file.response.path,
        attachmenttype: "01", //文件类型
        refertype: "9",
        displayorder: this.fileList.length + 1,
        referid: this.getData.projectid
      };
      this.fileList.push(fileData);
    },
    // 上传进度
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    beforeAvatarUpload(file) {
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isBMP = file.type === "image/bmp";
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isPdf = this.matchType(file.name, "pdf") || this.matchType(file.name, "PDF");
      const isdoc = this.matchType(file.name, "doc");
      const isdocx = this.matchType(file.name, "docx");
      const iszip = this.matchType(file.name, "zip");
      const israr = this.matchType(file.name, "rar");
      const isxls = this.matchType(file.name, "xls");
      const isxlsx = this.matchType(file.name, "xlsx");
      const isjpg = this.matchType(file.name,'jpg');
      const isjpeg = this.matchType(file.name,'jpeg');
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      if (!isPdf && !isdoc && !isdocx && !iszip && !israr && !isxls && !isxlsx && !isBMP && !isPNG && !isJPG && !isGIF && !isjpg && !isjpeg) {
        this.$message.error(this.rs.err_msg_file_type);
      }
      return ((isPdf || isdoc || isdocx || iszip ||israr ||isxlsx ||isxls ||isBMP || isJPG ||isGIF ||isPNG || !isjpg || !isjpeg) && isLt100M );
    },
    matchType(fileName, type) {
      // 后缀获取
      var suffix = "";
      // 获取类型结果
      var result = "";
      try {
        var flieArr = fileName.split(".");
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = "";
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false;
        return result;
      } else {
        if (suffix == type) {
          return true;
        } else {
          return false;
        }
      }
    },
    // 检测数值是否有重复元素
    isRepeat(arr) {
      var hash = {};
      for (var i in arr) {
        if (hash[arr[i]]) return true;
        hash[arr[i]] = true;
      }
      return false;
    },
    // 下载模板
    downloadTemplate() {
      // window.open(this.downloadUrl+'?referid='+this.getData.projectid)
      window.location = this.downloadUrl + "?referid=" + this.getData.projectid;
    },
    getCategory(id){
      getProjectCategory({projectid:id}).then(res=>{
        if(res.data.success){
          this.category = res.data.category;
        }
      })
    },
    getName(){
      let text = ''
      JSON.parse(JSON.parse(sessionStorage.getItem('ProjectList')).shortname).forEach(ele => {
         if (ele.type=='00') {
          text = ele.content
        }
        if (ele.type==localStorage.getItem('languagetype')) {
          if (ele.content==''||ele.content==undefined) {
            this.project_name = text
          }else{
            this.project_name = ele.content
          }
        }
      });
    },
  },
  created() {
    this.isPlatform = sessionStorage.getItem('isPlatform');
    this.isFullEdit = sessionStorage.getItem('isFullEdit');
    this.isrunning = sessionStorage.getItem('isrunning');
    this.userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.getData.projectid = this.$router.currentRoute.params.id;
    this.getCategory(this.$router.currentRoute.params.id);
    this.attachmentSelect = JSON.parse(
      localStorage.getItem("selectlist")
    ).ATTACHMENT_TYPE_LIST;
    this.actionAttUrl2 =
      axios.defaults.baseURL +
      "project/uploadFile?falg=4&projectid=" +
      this.getData.projectid; //附件上传地址
    this.actionAttUrl1 =
      axios.defaults.baseURL +
      "project/uploadFile?falg=3&projectid=" +
      this.getData.projectid; //图片上传地址

    this.downloadUrl = axios.defaults.baseURL + "attachment/getExcelISForAs"; //模板下载接口地址
    this.uploadFileUrl = axios.defaults.baseURL + "property/excelGetData1"; //模板导入接口地址
    this.actionUrl = axios.defaults.baseURL + "property/excelGetData"; //自定义导入地址

    // 获取语言资源表数据
    this.getData.languagetype = localStorage.getItem("languagetype");
    JSON.parse(localStorage.getItem("selectlist")).PROPERTY_ASPECT_LIST.forEach(
      element => {
        this.AspectObj[element.code] = element.value;
      }
    );
    this.AspectObj = Object.assign({}, this.AspectObj);
    // this.getData.pagesize = JSON.parse(
    //   localStorage.getItem("selectlist")
    // ).DATA_COUNT_LIST[0].intvalue;
    this.getData.pagesize =  100;
    this.getProperty(this.getData);
    this.getName()
  },
  computed: {
    ...mapGetters(["se", "rs", "languagetype",'control']),
    readonly(){
      if(this.control.project_detail ==='02' || this.isFullEdit === '0'){
          return true
      }else{
          return false
      }
  }
  },
  watch: {
    se(val) {
      val.PROPERTY_ASPECT_LIST.forEach(element => {
        this.AspectObj[element.code] = element.value;
      });
      this.attachmentSelect = val.ATTACHMENT_TYPE_LIST;
    },
    importShow(val){
      if(!val){
        this.$refs.fileInput1.value =''
      }
    },
    languagetype(){
      this.getName()
    }
    
  }
};
</script>

<style lang="scss" scoped>
.btn_text :hover{
  cursor: pointer !important;
  z-index: 2000000;
}
.att_info {
  p{
    padding: 5px 0;
    color: #666;
    line-height: 18px;
  }
  h4 {
    padding: 10px 0;
  }
}
.upload_box{
  background: #FFF;
  .upload_area{
    text-align: left;
  }
  .file_list_area {
    margin-top: 15px;
    li {
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
      padding: 10px;
      border: 1px solid #EEE;
      margin-bottom: 2px;
      border-left: 2px solid #e6e7e8;
      color: #444;
      cursor: move;
      background: #FFF;
    }
    .handle>span{
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
.el-upload-dragger{
  width: 300px !important;
}
</style>
