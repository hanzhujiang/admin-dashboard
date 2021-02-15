<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.share_to_channel}}</span>
      </div>
      <div class="tools">
        <el-button   class="bg_remove_btn" v-if="!readonly&&isshared=='1'" @click="removeproject" size="small">{{rs.remove_project}}</el-button>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="10" v-if="fromagency">
        <el-col :span="24">
          <div class="box" style="margin-bottom: 20px;">
            <div class="box-header">
              <div class="title">
                <img src="../../assets/imgs/common/common_15.png" alt=""><span>{{rs.shared_from}}</span>
              </div>
              <div class="tools">
                <div class="fr">
                  <span class="btntext" @click="uploadingContract2()">{{rs.view_agreement}}</span>
                </div>  
              </div>
            </div>
              <div class="box-body">
                <el-row :gutter="20" class="line2">
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.agency}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="20" :lg="20" :xl="20">
                    <div class="content">{{fromagency.fullname}}</div>
                  </el-col>
                </el-row>    
                <el-row :gutter="20" class="line2">
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.contact_person}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <div class="content">{{fromagency.contactperson}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.contact_number}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <div class="content">{{fromagency.contactnumber}}</div>
                  </el-col>
                </el-row>    
                <el-row :gutter="20" class="line2">
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.office_telephone}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <div class="content">{{fromagency.officetelephone}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.office_fax}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <div class="content">{{fromagency.officefax}}</div>
                  </el-col>
                </el-row>    
                <el-row :gutter="20" class="line2">
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.edit_project_allowed}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <div class="content">{{isfulledit=='1'?rs.yes:rs.no}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.share_project_allowed}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <div class="content">{{shareable=='1'?rs.yes:rs.no}}</div>
                  </el-col>
                </el-row>    
                <el-row :gutter="20" class="line2">
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.approval_required}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="20" :lg="20" :xl="20">
                    <div class="content">{{fromagency.agencyapprovetype}}</div>
                  </el-col>
                </el-row>    
            </div>
          </div>
        </el-col>  
      </el-row>  
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <img src="../../assets/imgs/common/common_2.png" alt=""><span>{{rs.agency_commission_rate}}</span>
              </div>
            </div>
              <div class="box-body">
                <el-row :gutter="10" class="line2">
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.exchange_commission}}:</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <div class="content">{{companyCommission1.express}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                    <div class="title">{{rs.settle_commission}}:</div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <div class="content">{{companyCommission2.express}}</div>
                  </el-col>
                </el-row>    
            </div>
          </div>
        </el-col>  
      </el-row>  
      <el-row :gutter="10" v-if="shareable=='1' || shareToList.length!=0">
        <el-col :span="24">
          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
              <div class="title">
                <img src="../../assets/imgs/common/common_15.png" alt=""><span>{{rs.share_to}}</span>
              </div>
              <div class="tools" v-if="shareable=='1'">
                <span @click="dialodShow" class="btn_text" v-if="!readonly">
                  <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                  <span>{{rs.add_new_share}}</span>
                </span>
              </div>
            </div>
            <div class="box-body">
              <div class="table_box">
                <el-table
                  :data="shareToList"
                  :empty-text = rs.no_data
                  style="width: 100%;padding-top:5px;"
                  tooltip-effect="light"
                  :show-header="false"
                  size="mini">
                  <el-table-column
                    prop="date">
                    <template slot-scope="scope">
                      <el-row :gutter="5" class="line2">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="fl">
                            <img :src="scope.row.logoimage" v-if="scope.row.logoimage" class="portrait">
                            <img src="../../assets/imgs/no_images.png" alt="" v-else class="portrait">
                          </div>
                          <div style="padding-left:80px;">
                            <p class="title">{{scope.row.fullname}}</p>
                            <p class="content">{{rs.shared_on + ' ' + formatDate(scope.row.shareddatetime)}}</p>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                          <div class="fr">
                            <span class="btntext" @click="delList(scope.row)" v-if="!readonly">{{rs.remove_share}}</span>
                            <span class="btntext" @click="uploadingContract(scope.row)">{{rs.view_agreement}}</span>
                            <span class="btntext" @click="editShareDetail(scope.row)">{{rs.edit}}</span>
                          </div>  
                        </el-col>
                      </el-row>    
                        <el-row :gutter="5" class="line2">
                          <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                            <div class="title">{{rs.contact_person}}:</div>
                          </el-col>
                          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                            <div class="content">{{scope.row.contactperson?scope.row.contactperson:'&nbsp;'}}</div>
                          </el-col>
                          <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                            <div class="title">{{rs.contact_number}}:</div>
                          </el-col>
                          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                            <div class="content">{{scope.row.contactnumber?scope.row.contactnumber:'&nbsp;'}}</div>
                          </el-col>
                        </el-row>    
                        <el-row :gutter="5" class="line2">
                          <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                            <div class="title">{{rs.phone_number}}:</div>
                          </el-col>
                          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                            <div class="content">{{scope.row.officetelephone?scope.row.officetelephone:'&nbsp;'}}</div>
                          </el-col>
                          <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                            <div class="title">{{rs.fax_number}}:</div>
                          </el-col>
                          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                            <div class="content">{{scope.row.officefax?scope.row.officefax:'&nbsp;'}}</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="5" class="line2">
                            <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                              <div class="title">{{rs.exchange_commission}}</div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                              <div class="content">{{scope.row.exchange.express}}</div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
                              <div class="title">{{rs.settle_commission}}:</div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                              <div class="content">{{scope.row.settled.express}}</div>
                            </el-col>
                          </el-row>    
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 20px;">
        <el-col :span="24">
          <div class="box">
            <div class="box-header">
              <div class="title ">
                <img src="../../assets/imgs/page/shareTo_1.png" alt="">
                <span>{{rs.set_approver}}</span>
                <div class="tools">
                  <!--  -->
                  <span class="btn_text" @click="handleInfo">
                    <i class="el-icon-info" style="color:#99a2bd;font-size:14px"></i>
                  </span>
                </div>
                
              </div>
              <div style="float:right">
                  <span>{{rs.select_all}}</span>
                    <el-switch
                    boolean
                    v-model="allChecked"
                    active-color="#13ce66"
                    inactive-color="#CCC"
                    @change="allchangeCheckbox"
                    >
                  </el-switch>
                  <el-button   class="small bg_blue" style="margin-lef:20px" v-if="!readonly" @click="allChangeTransfer" size="mini">{{rs.change}}</el-button>
                </div>
            </div>
            <div class="box-body">
                  
              <!-- @selection-change="changeCheckbox" -->
              <div class="table_box">
                <el-table
                  :data="approvalRouteList"
                  :empty-text = rs.no_data
                  style="width: 100%"
                  :show-overflow-tooltip="true"
                  size="mini">
                  <el-table-column
                    prop="value"
                    :label="rs.request_type"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <!-- <el-table-column
                    type="selection"
                    :label="rs.need_approve"
                    width="155">
                  </el-table-column> -->
                  <el-table-column
                    prop=""
                    :label="rs.need_approve"
                    align="center">
                    <template slot-scope="scope">
                      <el-checkbox  v-model="ifbox[scope.row.code]" @change="changeCheckbox(ifbox[scope.row.code],scope.row)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    :label="rs.approver">
                  <template slot-scope="scope">
                    <span v-for="(d,i) in approvalData[scope.row.code]" :key="i">
                      {{d}}
                      <i v-if="approvalData[scope.row.code].length-1!=i">,</i>
                    </span>
                  </template>
                  </el-table-column>
                  <el-table-column
                    width="120">
                    <template slot-scope="scope">
                      <span class="btntext" @click="changeTransfer(scope.row)" v-if="!readonly">{{rs.change}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>  
    </div>
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.select_agency"
      :visible.sync="dialogVisible"
      width="70%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.agency}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row>
          <el-col :offset="12" :span="12">
            <div class="filter-search">
              <el-input :placeholder="rs.search_agencies" @change="getData('0')"  
                  v-model="data.condition" class="input-key" clearable size='mini'>
                <el-button @click="getData('0')" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="tableDataOlist"
            :empty-text = rs.no_data
            style="width: 100%"
            :show-overflow-tooltip="true"
            size="mini">
            <el-table-column
              prop="shortname"
              :label="rs.agency">
            </el-table-column>
            <el-table-column
              prop="contactperson"
              :label="rs.contact_person">
            </el-table-column>
            <el-table-column
              prop="contactnumber"
              :label="rs.contact_number">
            </el-table-column>
            <el-table-column
              prop="officetelephone"
              :label="rs.phone_number">
            </el-table-column>
            <el-table-column
              prop="officefax"
              :label="rs.fax_number">
            </el-table-column>
            <el-table-column
              :label="rs.action"
              width="120">
              <template slot-scope="scope">
                <span class="btntext" @click="addList(scope.row)">{{rs.select}}</span>
                <!-- <el-button @click="addList(scope.row)" size="mini" class="small bg_blue" >
                <i class="fa fa-check"></i><span>{{rs.select}}</span></el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row class="dailog-footer" style="margin-top:5px">
        <div>
          <el-pagination
          @current-change="getData('1')"
          :current-page.sync="data.pagenum"
          :page-size="data.pagesize"
          layout=" prev, pager, next "
          :total="total"
          class="fr">
          </el-pagination>
        </div>
      </el-row>
    </el-dialog>

    <el-dialog
      :close-on-click-modal='false'
      :title="rs.edit_sharing_details"
      :visible.sync="sharingDetailShow"
      width="50%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.edit_sharing_details}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <div class="box-body">
          <el-row :gutter="10" class="line2">
            <el-col :span="24">
              <div class="title" style="font-size:14px;">{{rs.exchange_commission}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content" style="padding:5px; text-align:right;">
                {{rs.pass_to_agency}}
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content">
                <el-input size="small" v-model="sharingdetail.exchange.commissionrate" :disabled="readonly"></el-input>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content">
                <el-select size="small" v-model="sharingdetail.exchange.ratetype" :disabled="readonly">
                  <el-option
                    v-for="item in optionsList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content" style="padding:5px; text-align:right;">
                +&nbsp;&nbsp;{{rs.bonus}}
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content">
                <el-input size="small" v-model="sharingdetail.exchange.bonus" :disabled="readonly"></el-input>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content">
                <el-select size="small" v-model="sharingdetail.exchange.bonustype" :disabled="readonly">
                  <el-option
                    v-for="item in optionsList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="line2">
            <el-col :span="24">
              <div class="title" style="font-size:14px;">{{rs.settle_commission}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content" style="padding:5px; text-align:right;">
                {{rs.pass_to_agency}}
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content">
                <el-input size="small" v-model="sharingdetail.settled.commissionrate" :disabled="readonly"></el-input>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content">
                <el-select size="small" v-model="sharingdetail.settled.ratetype" :disabled="readonly">
                  <el-option
                    v-for="item in optionsList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content" style="padding:5px; text-align:right;">
                +&nbsp;&nbsp;{{rs.bonus}}
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content">
                <el-input size="small" v-model="sharingdetail.settled.bonus" :disabled="readonly"></el-input>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="content">
                <el-select size="small" v-model="sharingdetail.settled.bonustype"  :disabled="readonly">
                <el-option
                  v-for="item in optionsList"
                  :key="item.value"
                  :label="item.value"
                  :value="item.code">
                </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5" v-if="isfulledit=='1'">
            <el-col :span="24">
              <div class="content" style="padding-top:20px;">
                  <el-checkbox v-model="sharingdetail.isfulledit" :disabled="readonly" true-label='1'
                  false-label='0' size="small">{{rs.can_edit_all_project_info}}</el-checkbox>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5" v-if="shareable=='1'">
            <el-col :span="24">
              <div class="content" style="padding-top:20px;">
                  <el-checkbox v-model="sharingdetail.shareable" :disabled="readonly" true-label='1'
                  false-label='0' size="small">{{rs.can_share_project_to_other}}</el-checkbox>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   v-if="sharingdetail.isnew" style="color:#000;" class="small" @click="sharingDetailBack">{{rs.back}}</el-button>
              <el-button   v-else style="color:#000;" class="small" @click="sharingDetailVisible">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="saveShareDetail" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <el-dialog
      :close-on-click-modal='false'
      :title="rs.agreement"
      :visible.sync="uploadingShow"
      width="50%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.agreement}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <div class="box-body">
          <div class="upload_box">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-if="!readonly">
                <div class="upload_area">
                  <el-upload
                    v-if="!readonly"
                    class="upload-demo"
                    drag
                    :show-file-list="false"
                    :on-success="LightImg"
                    :before-upload="beforeAvatarUpload"
                    :on-progress="uploadVideoProcess"
                    :multiple="true"
                    :action="actionUrl">
                    <i class="el-icon-upload" v-if="!videoFlag"></i>
                    <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                    <div class="el-upload__text"  v-if="!videoFlag">{{rs.drop_file_here_or_click}}</div>
                    <div class="el-upload__text"  v-if="!videoFlag">{{rs.only_accept}} .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                  </el-upload>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="file_list_area">
                  <ul>
                    <li v-for="(d,i) in attachmentList" >
                      <div class="fl handle">
                        <span>
                          <i class="fa fa-bars"></i>
                        </span>
                        <span >{{i+1}}</span>
                        <span>{{d.displayname?d.displayname:' '}}</span>
                      </div>
                      <template >
                        <div class="fr">
                           <span class="btntext" @click="download(d)"><span>&nbsp;{{rs.download}}</span></span>
                        </div>
                        <div class="fr">
                          <span class="btntext" @click="handleDelet(d)" v-if="!readonly">{{rs.delete}}</span>
                        </div>
                        
                      </template>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- //设置审批人// --> 
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.approver"
      :visible.sync="showTransfer">
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.approver}}</span>
        </div>
      </template>
      <div style="text-align: center">
        <el-transfer
        style="text-align: left; display: inline-block"
        v-model="transferCheckList"
        filter-placeholder=" "
        filterable
        :titles="[rs.unselected_agents, rs.selected_agents]"
        :button-texts="[rs.revoke, rs.select]"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="transferList">
        <span slot-scope="{ option }">{{ option.label }}</span>
        </el-transfer>
        <div class="dailog-footer-tools">
          <el-row>
            <el-col :span="12">
              <div class="fl">
                <el-button   style="color:#000;" @click="showTransfer = false" class="small">
                {{rs.close}}</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fr">
                <el-button   class="small bg_blue" @click="setAgentName">
                {{rs.save}}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- info 弹窗 -->
    <el-dialog :visible.sync="infoShow" :close-on-click-modal='false' width="60%" >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">Set Approver Instruction</span>
        </div>
      </template>
      <div class="att_info">
        <p>The “Set Approver” setting gives selected backend users the authorisation to approve new reservations from Channel agencies.</p>
        <p>The approval personnel must be set before a project can be successfully shared.</p>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
        agencyGetToShareAgency,
        getSharetoPopList,
        getSharetoList,
        insertShareto,
        getProject, 
        deleteShareto,
        attachmentGetData,
        agencyAttachmentinsert,
        attachmentDelete,
        agencyApproverInsert,
        agencyApproverGetData,
        commissionGetAgencyCommissionData,
        agencyApproveUpdate,
        commissionInsertAgencyprojectCommission,
        commissionInsertCommissionBy99,
        getSharedFromAgency,
        checkExistPendingApproval} from '@/api/projectApi.js'
import { getAgentList } from '@/api/agentApi.js'
import { mapGetters } from "vuex";
import axios from 'axios'
import {toMMMDDYYYY} from "@/assets/js/time.js"; //时间转换插件
export default{
  data() {
    return {
      isAllSave:false,
      allChecked:false,
      project_name:'',
      routetype:'',
      showTransfer:false,
      transferList:[],
      transferCheckList: [],
      approvalData:[],
      ifbox:[],
      agencyprojectid:'',
      projectId :'',
      attachmentList:[],
      videoFlag:false,
      videoUploadPercent:0,
      actionUrl:'',
      uploadingShow:false,
      sharingDetailShow:false,
      agencyidLlit:[],
      projectidList:[],
      approvalRouteList:[],
      dialogVisible:false,
      select:'',
      search:'',
      tableDataOlist:[],
      shareToList: [],
      options: [],
      pagesize:'',
      total:null,

      data:{
        condition:'',
        pagesize:10,
        pagenum:1,
        languagetype:'',
        exclude:'1',
        isactived:'1',
        projectid:''
      },
      companyCommission1:{
            ratetype:'01',
            commissionrate:0,
            bonustype:'02',
            bonus:0
            },
      companyCommission2:{
            ratetype:'01',
            commissionrate:0,
            bonustype:'02',
            bonus:0
            },
      optionsList:[],
      commissionRateOption:[],
      code:'',
      isEdit:null,
      oldArr:{},
      show:true,
      shareShow:null,
      isrunning:'',
      isshared:'0',
      infoShow:false,
      fromagency:null,
      shareable:'0',
      isfulledit:'0',
      sharingdetail:{
        exchange:{
          ratetype:'01',
          commissionrate:0,
          bonustype:'02',
          bonus:0
        },
        settled:{
          ratetype:'01',
          commissionrate:0,
          bonustype:'02',
          bonus:0
        },
        shareable:'0',
        isfulledit:'0',
        agencyid:'',
        projectid:'',
        agentid:'',
        vendorid:'',
        isnew:true
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
  },
  created(){
    this.isfulledit = sessionStorage.getItem('isFullEdit');
    this.shareable = sessionStorage.getItem('shareable');

    this.getAgent();
    if(this.$router.currentRoute){
      this.projectId =this.$router.currentRoute.params.id;
    }
    if(this.$router.current){
      this.projectId =this.$router.current.params.id;
    }
    this.options = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
    this.optionsList = JSON.parse(localStorage.getItem('selectlist')).RATE_TYPE_LIST
    this.getSharedFromAgency();
    this.allList();
    this.approverEcho();
    this.getCompanyCommission();
    this.getProjectInfo();
    this.getName();
  },
  methods:{
    handleInfo(){
      this.infoShow = true;
    },
    download (data) {
      window.location.href=data.filepath;
      let url= data.filepath;
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', data.displayname)
      document.body.appendChild(link)
      link.click()
    },
    allchangeCheckbox(val){
      if(val){
        this.approvalRouteList.forEach(element => {
          this.changeCheckbox(1,element);
        });
      }else{
        this.approvalRouteList.forEach(element => {
          this.changeCheckbox(0,element);
        });
      }
    },
    changeCheckbox(val,row){
      if (val) {
        val = '1'
      } else {
        val = '0'
      }
      let data = {
        routetype:row.code,
        isneedapprove:val,
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid
      }
      agencyApproveUpdate(data).then(res=>{
        if (res.data.success) {
          this.approverEcho()
          // this.$message.success(this.rs.info_msg_insert_success)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getProjectInfo(){
      getProject({projectid:this.projectId}).then(res=>{
        if(res.data.success){
          sessionStorage.setItem('ProjectList',JSON.stringify(res.data.data));
          sessionStorage.setItem('vendorid',res.data.data.vendorid);
          this.isshared = res.data.data.isshared;
          this.getName()
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      });
    },
    getName(){
      let text = ''
      if (!JSON.parse(sessionStorage.getItem('ProjectList')).shortname) {
        this.project_name = text;
        return;
      }
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
    shareShowClick(scope){
      if (this.shareShow == scope.$index) {
        this.shareShow = null
      } else {
        this.shareShow = scope.$index  
      }
    },

    //销售公司佣金率
    getCompanyCommission(){
      let data = {
        vendorid:JSON.parse(sessionStorage.getItem('vendorid')),
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        commissiontype:'01',
      }
      commissionGetAgencyCommissionData(data).then(res=>{
        
        if(res.data.success){
          if(res.data.exchange){
            this.companyCommission1 = res.data.exchange
          }
          if(res.data.settled){
            this.companyCommission2 = res.data.settled
          }
          if (res.data.option) {
            this.option = res.data.option  
          }
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },

    validatorOption(data){
      let re = new RegExp(/\d/);
      let flag = false;
      data.forEach(ele =>{
        if(re.test(ele.exchange.commissionrate)&&re.test(ele.exchange.bonus)&&re.test(ele.settled.commissionrate)&&re.test(ele.settled.bonus)){
          if(ele.exchange.commissionrate<0||ele.exchange.bonus<0||ele.settled.commissionrate<0||ele.settled.bonus<0){
            flag = this.rs.err_msg_commission_minus
          }else{
            if(ele.exchange.commissionrate == 0&&ele.exchange.bonus==0){
              flag = this.rs.err_msg_commission_zero
            }
            if(ele.settled.commissionrate ==0 && ele.settled.bonus == 0){
               flag = this.rs.err_msg_commission_zero
            }
          }
        }else{
         flag = this.rs.err_msg_commission_format
        }
      })
      return flag
    },

    sharingDetailVisible() {
      this.sharingDetailShow = !this.sharingDetailShow;
    },

    sharingDetailBack() {
      this.sharingDetailShow = !this.sharingDetailShow;
      this.dialogVisible = !this.dialogVisible;
    },

    // 其它保存
    saveShareDetail(){
      let arr = []
      arr.push(this.sharingdetail)
      if(this.validatorOption(arr)){
        this.$message.error(this.validatorOption(arr));
        return
      }
      
      if (this.sharingdetail.isnew) {
        let data = {
          agencycommissionlist:JSON.stringify(
            {exchange:this.sharingdetail.exchange,settled:this.sharingdetail.settled,option:'99'}),
          isfulledit:this.sharingdetail.isfulledit,
          shareable:this.sharingdetail.shareable,
          projectid:JSON.parse(sessionStorage.getItem('ProjectList')).projectid,
          agencyid:this.sharingdetail.agencyid,
          agentid:JSON.parse(localStorage.getItem('userInfo')).agentid,
          vendorid:JSON.parse(sessionStorage.getItem('vendorid')),
        }
        insertShareto(data).then(res=>{
          if (res.data.success) {
            this.$message.success(this.rs.info_msg_insert_success)
            this.sharingDetailShow = false;
            this.allList()
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      } else {
        let data = {
          agencycommissionlist:JSON.stringify(
            {exchange:this.sharingdetail.exchange,settled:this.sharingdetail.settled,option:'99'}),
          agencyprojectid:this.sharingdetail.agencyprojectid,
          isfulledit:this.sharingdetail.isfulledit,
          shareable:this.sharingdetail.shareable,
          vendorid:JSON.parse(sessionStorage.getItem('vendorid')),
        }
        if(this.isrunning=="0"){
          delete data.vendorid
        }
        
        commissionInsertCommissionBy99(data).then(res=>{
          if (res.data.success) {
            this.$message.success(this.rs.info_msg_insert_success)
            this.sharingDetailShow = false;
            this.allList()
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }

    },

    getSharedFromAgency() {
      let data = {
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        languagetype:localStorage.getItem('languagetype'),
      }
      getSharedFromAgency(data).then(res=>{
        if (res.data.success) {         
          this.fromagency = res.data.data
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },

    allList(){
      let data = {
        languagetype:localStorage.getItem('languagetype'),
        projectid:JSON.parse(sessionStorage.getItem('ProjectList')).projectid,
        vendorid:JSON.parse(sessionStorage.getItem('vendorid')),
      }
      getSharetoList(data).then(res=>{
        if (res.data.success) {         
           let data = {
            express:this.rs.others,
            option:'99'
          }
          res.data.data.forEach(element => {
              element.optionlist.push(data)

          });
          this.isrunning = res.data.isrunning
          this.shareToList = res.data.data
          this.oldArr = JSON.stringify(res.data.data)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },

    // 保存
    setAgentName(){
      if(this.isAllSave){
        this.approvalRouteList.forEach(element => {
          this.setAgentConfirm(element.code)
        });
      }else{
        this.setAgentConfirm(this.routetype)
      }
      
    },
    setAgentConfirm(type){
      let obj = {
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        agentids:this.transferCheckList.join(','),
        routetype:type
      }
      agencyApproverInsert(obj).then(res=>{
        if(res.data.success){
          this.showTransfer = false 
          this.$message.success(this.rs.info_msg_insert_success)
          this.approverEcho()
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
     findElem(arrayToSearch,attr,val){
        for (var i=0;i<arrayToSearch.length;i++){
            if(arrayToSearch[i][attr]==val){
                return i;
            }
        }
        return -1;
    },
    allChangeTransfer(){
      this.showTransfer = true;
      this.routetype = null;
      this.transferCheckList = [];
      this.isAllSave = true;
    },
    // 打开设置审批人弹窗
    changeTransfer(row){
      this.routetype = row.code
      this.showTransfer = true;
      this.isAllSave = false;
      this.transferCheckList = []
       agencyApproverGetData({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,routetype:row.code}).then(res=>{
         if(res.data.success){
          res.data.data.forEach(element => {
             this.transferCheckList.push(element.agentid);
             if(this.findElem(this.transferList,'key',element.agentid) == '-1'){
               this.transferList.push({
                key: element.agentid,
                label:  element.firstname+' '+ element.lastname,
              })
             }
           });
        
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    approverEcho(){
       agencyApproverGetData({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid}).then(res=>{
         if(res.data.success){
          this.approvalRouteList = JSON.parse(localStorage.getItem('selectlist')).APPROVAL_ROUTE_TYPE_LIST
          this.approvalData = res.data
          for (const key in res.data.ifbox) {
            if (res.data.ifbox[key]==0) {
              res.data.ifbox[key] = false
            }else{
              res.data.ifbox[key] = true
            }
          }
          this.ifbox = res.data.ifbox
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },

    getAgent(){
      getAgentList().then(res => {
        if(res.data.success){
          res.data.data.forEach(ele => {
            this.transferList.push({
               key: ele.agentid,
              label:  ele.firstname+' '+ ele.lastname,
            })
          })
        }
      })
    },
    //上传合同
    uploadingContract(row){
      this.uploadingShow = true;
      this.actionUrl =axios.defaults.baseURL+'agencyAttachment/uploadFile?projectid='+this.projectId+'&agencyprojectid='+row.agencyprojectid; 
      this.getAttachment(row.agencyprojectid)
      this.agencyprojectid = row.agencyprojectid
    },
    //上传合同
    uploadingContract2(row){
      let agencyprojectid = JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid;
      this.uploadingShow = true;
      this.actionUrl =axios.defaults.baseURL+'agencyAttachment/uploadFile?projectid='+this.projectId+'&agencyprojectid='+agencyprojectid; 
      this.getAttachment(agencyprojectid)
      this.agencyprojectid = agencyprojectid
    },

    clearShareDetail() {
      this.sharingdetail = {
        exchange:{
          ratetype:'01',
          commissionrate:0,
          bonustype:'02',
          bonus:0
        },
        settled:{
          ratetype:'01',
          commissionrate:0,
          bonustype:'02',
          bonus:0
        },
        shareable:'0',
        isfulledit:'0',
        agencyid:'',
        projectid:'',
        agentid:'',
        vendorid:'',
        isnew:true
      }
    },
    editShareDetail(row){
      this.sharingdetail = row;
      this.sharingdetail.isnew = false;
      this.sharingDetailShow = true;
    },

    handleDelet(d){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        attachmentDelete({ids:d.attachmentid,path:d.filepath}).then(res=>{
          if(res.data.success){
            this.getAttachment(this.agencyprojectid);
            this.$message.success(this.rs.info_msg_delete_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    },

    LightImg(res, file) {
    this.videoUploadPercent = 100;
    this.videoFlag = false;
    this.$store.commit('SET_SHOW_LOADING',false)
    let fileData={
        displayname:file.name,
        filepath:file.response.filepath,
        agencyprojectid: this.agencyprojectid,//文件类型

      }
    agencyAttachmentinsert(fileData).then(res=>{
        if(res.data.success){
          this.getAttachment(this.agencyprojectid);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },

    uploadVideoProcess(event, file, fileList){
      this.videoFlag = true;
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },

    beforeAvatarUpload(file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isPdf = this.matchType(file.name,'pdf') || this.matchType(file.name,'PDF');
      const isdoc = this.matchType(file.name,'doc');
      const isdocx = this.matchType(file.name,'docx');
      const iszip = this.matchType(file.name,'zip');
      const israr = this.matchType(file.name,'rar');
      const isxls = this.matchType(file.name,'xls');
      const isxlsx = this.matchType(file.name,'xlsx');
      if (!isLt100M) {
        this.$message.error(this.rs.err_msg_image_size);
      }
      if(!isPdf && !isdoc && !isdocx && !iszip && !israr && !isxls && !isxlsx){
        this.$message.error(this.rs.err_msg_file_type);
      }
      return  (isPdf || isdoc || isdocx || iszip || israr || isxlsx || isxls )&&isLt100M;
    },

    getAttachment(id){
      attachmentGetData({refertype:'6',attachmenttype:'99',referid:id}).then(res=>{
        if(res.data.success){
          this.attachmentList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    matchType(fileName,type) {
      // 后缀获取
      var suffix = '';
      // 获取类型结果
      var result = '';
      try {
        var flieArr = fileName.split('.');
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = '';
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false;
        return result;
      }else{
        if(suffix == type){
          return true
        }else{
          return false
        }
      }
    },
    restoration(){
      this.data.pagenum = 1
      this.data.languagetype = localStorage.getItem('languagetype')
      this.data.projectid = JSON.parse(sessionStorage.getItem('ProjectList')).projectid
      this.popLIst(this.data)
    },

    getData(type){
      if(type=="1"){
        this.data.languagetype = localStorage.getItem('languagetype')
        this.data.projectid = JSON.parse(sessionStorage.getItem('ProjectList')).projectid
        this.popLIst(this.data)
      }else{
        this.restoration()
      }
    },
    dialodShow(){
      // 判断好审批有没有设置好，如果选择打钩了。就必须设置审批人
      let flag =  false;
      for(let key in this.ifbox){
        if(this.ifbox[key]){
          if(this.approvalData[key] && this.approvalData[key].length == 0){
            flag = true;
          }
        }
      }
      if(flag){
        this.$message.error({dangerouslyUseHTMLString:true,message:this.rs.approvers_before_sharing});
        return
      }
      this.pagesize = 1
      this.dialogVisible = true;
      this.restoration()
    },
    //弹窗数据
    popLIst(findData){
      agencyGetToShareAgency(findData).then(res=>{
        if (res.data.success) {
          this.total = res.data.total
          this.tableDataOlist = res.data.data
        } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 所有数据
    
    //添加
    addList(row){
      this.dialogVisible = false
      if (this.shareToList.length>0) {
        for(var i=0;i<this.shareToList.length;i++){
          if (this.shareToList[i].agencyid == row.agencyid) {
            this.$message.success(this.rs.info_msg_linkman)
            return
          }
        }
      }
      this.inserData(row)
    },
    
    inserData(row){
      this.clearShareDetail();
      this.sharingdetail.agencyid = row.agencyid;
      this.sharingDetailShow = true;
    },

    // inserData(row){
    //   let data = {
    //     projectid:JSON.parse(sessionStorage.getItem('ProjectList')).projectid,
    //     agencyid:row.agencyid,
    //     agentid:JSON.parse(localStorage.getItem('userInfo')).agentid,
    //     vendorid:JSON.parse(sessionStorage.getItem('vendorid')),
    //   }
    //   insertShareto(data).then(res=>{
    //     if (res.data.success) {
    //       this.allList()
    //       this.$message({
    //         type: 'success',
    //         message: this.rs.info_msg_insert_success
    //       });
    //   //  this.dialogVisible = !this.dialogVisible
    //     } else {
    //       this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
    //     }
    //   })
    // },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    // 删除
    delList(row){
      checkExistPendingApproval({agencyprojectid:row.agencyprojectid}).then(res=>{
        if (res.data.success) {
          if (res.data.data) {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.rs.info_msg_change_sharing_tier});
          } else {
            this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
            confirmButtonText: this.rs.confirm,
            cancelButtonText: this.rs.cancel,
            type: 'warning',
            center: true
            }).then(() => {
              let data = {
              ids:row.agencyprojectid
              }
              deleteShareto(data).then(res=>{
                if (res.data.success) {
                  this.allList()
                  this.$message({
                    type: 'success',
                    message: this.rs.info_msg_delete_success
                  });
                } else {
                  this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
                }
              })
              }).catch(() => {
              this.$message({
                type: 'info',
                message: this.rs.cancel_delete
              });
            });
      }
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

    formatDate(d) {
      return toMMMDDYYYY(d);
    },
    removeproject() {
      checkExistPendingApproval({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid}).then(res=>{
        if (res.data.success) {
          if (res.data.data) {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.rs.info_msg_change_sharing_tier});
          } else {
            this.$confirm(this.rs.info_msg_remove_project, this.rs.prompt_message, {
            confirmButtonText: this.rs.confirm,
            cancelButtonText: this.rs.cancel,
            type: 'warning',
            center: true
            }).then(() => {
              let data = {
              ids:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid
              }
              deleteShareto(data).then(res=>{
                if (res.data.success) {
                  this.$router.push({path:'/project_manage/sharedProjects'})
                  this.$message({
                    type: 'success',
                    message: this.rs.info_msg_delete_success
                  });
                } else {
                  this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
                }
              })
              }).catch(() => {
              this.$message({
                type: 'info',
                message: this.rs.cancel_remove
              });
            });
          }
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
  },
  
  computed: {
    ...mapGetters(['rs','languagetype','control','se']),
    readonly(){
      if(this.control.project_detail ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(){
      this.getProjectInfo(),
      this.getSharedFromAgency()
    },
    rs(){
     this.allList()
      
    },
    se(newVal,oldVal){
      this.approvalRouteList = newVal.APPROVAL_ROUTE_TYPE_LIST
      this.optionsList = newVal.RATE_TYPE_LIST
      // this.getDataByReferID()
    }
  },
}
</script>
<style scoped lang="scss">
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
.tools{
  margin: 0 20px;
  line-height: 50px;
}
.file_list_area li{
  height: 22px;
  line-height: 20px;
  border-radius: 2px;
  padding: 10px;
  background: #f4f4f4;
  margin-bottom: 2px;
  border-left: 2px solid #e6e7e8;
  color: #444;
  cursor: move;
}
.file_list_area .handle>span{
  padding-left: 5px;
  padding-right: 5px;
}
.content{
  // background: yellow;
}
.box-header {
  .title{
    font-size:12px;
    // font-family:SFUIDisplay-Bold,SFUIDisplay;
    font-weight:bold;
    color:rgba(32,42,71,1);
  }
}
.line2 {
  margin-bottom: 14px;
  padding: 5px 0;
  .title{
    font-size:12px;
    font-weight:bold;
    color:rgba(32,42,71,1);
  }
  .portrait{
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
}
</style>
