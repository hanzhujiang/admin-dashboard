<template>
  <div class="wrapper clearfix ">
    <top-nav v-if="isShowNav"/>
    <!-- 定金未支付支付警告 --> 
    <div class="unpaid_warning clearfix" v-if="btnSet.isDepositWarning&&saleAdviceData.depositstatus=='00'&&!readonly">
      <p>{{rs.warning}}</p>
      <p>{{rs.deposit_unpaid_warning}}</p>
    </div>
    <!-- 订单修改的理由 --> 
    <div class="unpaid_warning_red clearfix" style="" v-if="btnSet.isLockReason&&!readonly">
      <h2 style="color: blanchedalmond; padding: 0px 0px 10px 0px;">{{rs.expected_changes}}</h2>
      <!-- <p v-for="d in saleAdviceData.salereasonlist" :key="d.code" class="dot">{{d.code=='99'?d.content:salereasonObj[d.code]}}</p> -->
      <p v-for="d in saleAdviceData.salereasonlist" :key="d.code" class="dot">{{d.content}}</p>
    </div>
    <!-- 订单取消的理由 --> 
    <div  class="back clearfix salereason" v-if="btnSet.isCancelReason">
      <h2 style="color: blanchedalmond; padding: 0px 0px 10px 0px;">{{rs.reservation_cancel_reason}}</h2>
      <!-- <p v-for="d in saleAdviceData.salereasonlist" class="dot" :key="d.code" >{{d.code=='99'?d.content:optionObj0420[d.code]}}</p> -->
      <p v-for="d in saleAdviceData.salereasonlist" :key="d.code" class="dot">{{d.content}}</p>
    </div>
    <div class="wrapper-header clearfix">
      <div class="tools">
        <!-- 保存按钮，预留提交，资料修改提交按钮 -->
        <span slot="btn" v-if="btnSet.isSave">
          <el-button class="medium bg_blue block_button" @click="save" v-if="!readonly">{{rs.save}}</el-button>
        </span>
        <!-- 修改状态到 10 Issuecontract-->
        <span slot="btn" v-if="btnSet.isIssueContract"> 
          <el-button class="medium bg_green" @click="handelIssuecontract" v-if="!readonly ">{{salesrs&&salesrs.btn_issue_contract?salesrs.btn_issue_contract:rs.btn_issue_contract}}</el-button>
        </span>
        <!-- 修改状态到 20 exchange-->
        <span slot="btn" v-if="btnSet.isConditionalExchange">
          <el-button class="medium bg_green" @click="handleExchange" v-if="!readonly">
          {{salesrs&&salesrs.btn_conditional_exchange?salesrs.btn_conditional_exchange:rs.btn_conditional_exchange}}</el-button>
        </span>
        <!--预留 审核 同意 -->
        <span slot="btn" v-if="btnSet.isApprove">
          <el-button class="medium bg_blue" @click="handleApprove" v-if="!readonly">{{(saleAdviceData.saleid == null || saleAdviceData.salestatus == '00')?(salesrs&&salesrs.btn_approve_reservation?salesrs.btn_approve_reservation:rs.btn_approve_reservation):rs.approve_changes}}</el-button>
        </span>
        <span slot="btn" v-if="btnSet.isApproveCancel">
          <!-- 同意取消 -->
          <el-button class="medium bg_blue" @click="handleApproveCancel" v-if="!readonly">{{rs.agree_cancel}}</el-button>
        </span>
        <!-- 驳回取消 -->
        <span slot="btn" v-if="btnSet.isRejectCancel">
          <el-button class="medium bg_red_btn" @click="handleRejectCancel" v-if="!readonly">{{rs.reject_cancel}}</el-button>
        </span>
        <!-- 修改状态到 30 Unconditionalexchange-->
        <span slot="btn" v-if="btnSet.isUnconditionalExchange ">
          <el-button class="medium bg_green" @click="handleUnconditionalexchange" v-if="!readonly">{{salesrs&&salesrs.btn_unconditional_exchange?salesrs.btn_unconditional_exchange:rs.btn_unconditional_exchange}}</el-button>
        </span>
        <!-- 修改状态到 40 pendingSettle-->
        <span slot="btn" v-if="btnSet.isPendingSettle ">
          <el-button class="medium bg_green" @click="handlePendingSettle" v-if="!readonly">{{salesrs&&salesrs.btn_pending_settle?salesrs.btn_pending_settle:rs.btn_pending_settle}}</el-button>
        </span>
        <!-- 修改状态到 50 settle-->
        <span slot="btn" v-if="btnSet.isSettle ">
          <el-button class="medium bg_green" @click="handleSettle" v-if="!readonly">{{salesrs&&salesrs.btn_settled?salesrs.btn_settled:rs.btn_settled}}</el-button>
        </span>
        <!-- 申请取消订单 -->
        <span slot="btn" v-if="btnSet.isCancel">
          <el-button class="medium bg_red_btn" @click="handleRequestCancel" v-if="!readonly">{{rs.cancel_sales}}</el-button>
        </span>
        <!-- 拒绝预定 -->
        <span slot="btn" v-if="btnSet.isReject">
          <el-button class="medium bg_red_btn" @click="handleRejectReservation" v-if="!readonly">{{rs.reject_reservation}}</el-button>
        </span>
        <!-- <span slot="btn" v-if="btnSet.isCancel">
          <el-button  class="medium bg_red_btn" @click="Approvecancel" v-if="!readonly">
          {{showChannel=='1' || showChannel == '2'?rs.reject_changes:rs.cancel_sales}}</el-button>
        </span> -->
        <!-- 驳回修改 -->
        <span slot="btn" v-if="btnSet.isCancelUpdate">
          <el-button class="medium bg_red_btn" @click="handleRejectUpdate" v-if="!readonly">{{rs.reject_update}}</el-button>
        </span>
        <span slot="btn" v-if="btnSet.isCheckList" @click="checklist">
          <el-button class="medium bg_blue" v-if="!readonly">{{rs.check_list}}</el-button>
        </span>
        <!-- 发送邮件 -->
        <span slot="btn" v-if="btnSet.isSend">
          <el-button class="medium bg_blue" v-if="!readonly" @click="keyContactsShow=true">{{rs.send}}</el-button>
        </span>
        <!-- 下载pdf -->
        <span slot="btn"  v-if="btnSet.isPrint">
          <el-button class="medium bg_blue" :autofocus="true" v-if="!readonly" @click="getPdf">{{rs.download}}</el-button>
        </span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-content clearfix" style="margin:5px;">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <div class="box box-primary">
              <advice></advice>
              <purchaser v-on:childByValue="childByValue" ></purchaser>
              <deposit></deposit>
              <!-- <agencycommission v-if="isAgencycommission"></agencycommission> -->
              <broker></broker>
              <attachments
               v-if="isAttachments" 
             @setuploadFile="setuploadFile"
             :attachmentlist="saleAdviceData.attachmentlist"  
             :depositattachmentlist="saleAdviceData.depositattachmentlist"
             :checklistattachment="saleAdviceData.checklistattachment"
             :saleattachmentlist40="saleAdviceData.saleattachmentlist40"
             :saleattachmentlist41="saleAdviceData.saleattachmentlist41"
             :saleattachmentlist42="saleAdviceData.saleattachmentlist42"
             :saleattachmentlist43="saleAdviceData.saleattachmentlist43"
             :saleattachmentlist44="saleAdviceData.saleattachmentlist44"
             ></attachments>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <contact @getContactList="getContactList"></contact>
            <key-dates v-if="isActivityLog" :saleDateObj="saleDateObj" @setKeyDates="reload"></key-dates>
            <officecomments v-if="isOfficeComments&&saleAdviceData.iscomments=='1'" v-on:childByValue="childByValue"></officecomments>
            <activitylog  v-if="isActivityLog"></activitylog>
            <checklistpop :show.sync="show" v-on:childByValue="childByValue"></checklistpop>
          </el-col>
        </el-row>
      </div>
    </form>
    <!-- 取消订单理由 -->
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="cancelSalesShow"
      width='600px'
      @close="$emit('update:sync')"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.cancel_reservation_reason}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-checkbox-group v-model="cancelSalesCheck" >
          <p v-for="(city,i) in OptionList0420" :key="i">
          <el-checkbox :label="city.code" v-if="city.code!='99'">{{city.value}}</el-checkbox>
          </p>
        </el-checkbox-group>
        <el-checkbox v-for="(city) in OptionList0420" :key="city.code" v-model="checkbox"  v-if="city.code=='99'" @change="handleCancel99Change(checkbox)">{{city.value}}</el-checkbox>
        <textarea maxlength="500" style="width:98%;min-height: 150px;padding:1%;line-height:18px" v-model="cancel99"  :disabled='!checkbox' ></textarea>

      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="closeCancelSales">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="handleRequestCancelConfirm">
              {{rs.set}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--  -->
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="dialogFormVisible"
      width='600px'
      @close="$emit('update:sync')"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.reject_reason}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-checkbox-group v-model="checkedCities" >
          <p v-for="(city,i) in optionData" :key="i">
          <el-checkbox :label="city.code" v-if="city.code!='99'">{{city.value}}</el-checkbox>
          </p>
        </el-checkbox-group>
        <el-checkbox v-for="(city) in optionData" :key="city.code" v-model="checkbox"  v-if="city.code=='99'" @change="handleCheckedCitiesChange(checkbox)">{{city.value}}</el-checkbox>
        <textarea maxlength="500" style="width:98%;min-height: 150px;padding:1%;line-height:18px" v-model="suggest"  :disabled='!checkbox' ></textarea>

      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="close">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue"   @click="affirm">
              {{rs.set}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 联系人弹窗 -->
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="keyContactsShow"
      width='60%'
      @close="$emit('update:sync')"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.send_sales_advice}}</span>
        </div>
      </template>
      <div class="dialog-body key_contactsTable">
        <el-table
            :data="contactsTableData"
            :empty-text ="rs.no_data"
            style="width: 100%">
            <el-table-column
              prop=""
              :label="rs.name"
              >
              <template slot-scope="scope">
                <span>{{scope.row.firstname+" "+ scope.row.lastname}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              :label="rs.email"
              >
            </el-table-column>
            <el-table-column
            prop="phonenumber"
            :label="rs.phone_number"
            >
            </el-table-column>
            <el-table-column
            prop="mobilenumber"
            :label="rs.mobile_number"
            >
            </el-table-column>
            <el-table-column
              prop="level"
              :label="rs.contact_type"
              width="150"
              >
              <template slot-scope="scope">
                <!-- <div :class="[scope.row.level=='1'?'key_contact bg_red':(scope.row.level=='2'?'key_contact bg_orange':'key_contact bg_blue')]"> -->
                <div>
                  {{scope.row.level=='1'?rs.general_contact:(scope.row.level=='2'?rs.key_contact:scope.row.level=='3'?rs.oversea_contact:scope.row.level=='99'?'Purchaser Solicitor':scope.row.level=='98'?"Vendor Solicitor":"")}}
                </div>  
              </template>  
            </el-table-column>
            <el-table-column
              prop=""
              :label="rs.send"
              width="100">
              <template slot-scope="scope">
                 <span slot="btn">
                  <el-button   class="mini bg_blue"  size="mini" @click="contactSend(scope.row)">{{rs.send}}</el-button>
                 </span>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </el-dialog>
    <!-- 发送 -->
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="SendContactsShow"
      width='60%'
      @close="$emit('update:sync')"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.send_sales_advice}}</span>
        </div>
      </template>
      <div class="dialog-body key_contactsTable">
        <p class="title" style="padding-top:10px">{{rs.send_info_1}}</p>
        <p>{{SendSubmit.name}}({{SendSubmit.receivemailaccount}})</p>
        <p class="title">{{rs.send_info_2}}</p>
        <div class="send_check">
          <p v-show="SendFileList.length==0">{{rs.no_data}}</p>
           <el-checkbox-group v-model="checkList">
            <p  v-for="(d,i) in SendFileList" :key="i" style="padding:3px 0">
              <el-checkbox style="display: inline-block;" :label="d.filepath" >{{d.displayname}}</el-checkbox>
            </p>
          </el-checkbox-group>
        </div>
        <!-- <p class="title">{{rs.send_info_3}}</p> -->
        <p class="title">{{rs.content}}</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6}"
          placeholder=""
         v-model="SendSubmit.content">
        </el-input>
        <!-- <textarea style="width:96%;min-height: 150px;font-size:14px;padding:10px 2%;line-height:18px;
        display: inline-block" v-model="SendSubmit.content"></textarea> -->
      <p slot="footer" class="dialog-footer" style="padding-top:15px">
        <el-button   @click="SendContactsShow = false">{{rs.back}}</el-button>
        <el-button class="fr"   type="primary" @click="handleSend">{{rs.send}}</el-button>
      </p>
      </div>
    </el-dialog>
     <!-- 上传附件 -->
    <el-dialog :visible.sync="fileShow" :close-on-click-modal='false' width='80%'>
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.edit_attachments}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <div class="box-body">
          <!-- 40 -->
              <h4 style="color: indianred;">{{rs.broker}}</h4>
              <div class="upload_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <div class="upload_area">
                      <el-upload
                      drag
                      :show-file-list="false"
                      :on-success="uploadFile40"
                      :before-upload="beforeAvatarUpload"
                      :on-progress="uploadVideoProcess40"
                      :multiple="true"
                      
                      :action="actionUrl">
                        <i class="el-icon-upload" v-if="!videoFlag40"></i>
                        <el-progress v-if="videoFlag40" type="circle" :percentage="videoUploadPercent40" style="margin-top:30px;"></el-progress>
                        <div class="el-upload__text"  v-if="!videoFlag40">{{rs.drop_file_here_or_click}}</div>
                        <div class="el-upload__text"  v-if="!videoFlag40">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                      </el-upload>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <div class="file_list_area">
                      <ul>
                        <li style="height:30px" v-for="(d,i) in saleAdviceData.saleattachmentlist40" :key="i" >
                          <div class="handle fl">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span>{{i+1}}</span>
                            <el-popover
                              placement="left"
                              width="300"
                              trigger="click">
                              <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                              <template slot="reference"><span><img :src="d.filepath + '?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                              style=" vertical-align: middle;cursor: pointer;"/></span></template>
                            </el-popover>
                            
                            <span >{{d.displayname}}</span>
                          </div>
                          <div class="fr">
                            <span class="btntext" @click="handleDelet(d)">{{rs.delete}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- 41 -->
              <hr>
              <h4 style="color: indianred;">{{rs.lender}}</h4>
              <div class="upload_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <div class="upload_area">
                      <el-upload
                      drag
                      :show-file-list="false"
                      :on-success="uploadFile41"
                      :before-upload="beforeAvatarUpload"
                      :on-progress="uploadVideoProcess41"
                      :multiple="true"
                      
                      :action="actionUrl">
                        <i class="el-icon-upload" v-if="!videoFlag41"></i>
                        <el-progress v-if="videoFlag41" type="circle" :percentage="videoUploadPercent41" style="margin-top:30px;"></el-progress>
                        <div class="el-upload__text"  v-if="!videoFlag41">{{rs.drop_file_here_or_click}}</div>
                        <div class="el-upload__text"  v-if="!videoFlag41">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                      </el-upload>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <div class="file_list_area">
                      <ul>
                        <li style="height:30px" v-for="(d,i) in saleAdviceData.saleattachmentlist41" :key="i" >
                          <div class="handle fl">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span>{{i+1}}</span>
                            <el-popover
                              placement="left"
                              width="300"
                              trigger="click">
                              <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                              <template slot="reference"><span><img :src="d.filepath + '?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                              style=" vertical-align: middle;cursor: pointer;"/></span></template>
                            </el-popover>
                            
                            <span >{{d.displayname}}</span>
                          </div>
                          <div class="fr">
                            <span class="btntext" @click="handleDelet(d)">{{rs.delete}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <hr>
              <!-- 42 -->
              <h4 style="color: indianred;">{{rs.financial_planner}}</h4>
              <div class="upload_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <div class="upload_area">
                      <el-upload
                      drag
                      :show-file-list="false"
                      :on-success="uploadFile42"
                      :before-upload="beforeAvatarUpload"
                      :on-progress="uploadVideoProcess42"
                      :multiple="true"
                      
                      :action="actionUrl">
                        <i class="el-icon-upload" v-if="!videoFlag42"></i>
                        <el-progress v-if="videoFlag42" type="circle" :percentage="videoUploadPercent42" style="margin-top:30px;"></el-progress>
                        <div class="el-upload__text"  v-if="!videoFlag42">{{rs.drop_file_here_or_click}}</div>
                        <div class="el-upload__text"  v-if="!videoFlag42">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                      </el-upload>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <div class="file_list_area">
                      <ul>
                        <li style="height:30px" v-for="(d,i) in saleAdviceData.saleattachmentlist42" :key="i" >
                          <div class="handle fl">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span>{{i+1}}</span>
                            <el-popover
                              placement="left"
                              width="300"
                              trigger="click">
                              <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                              <template slot="reference"><span><img :src="d.filepath + '?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                              style=" vertical-align: middle;cursor: pointer;"/></span></template>
                            </el-popover>
                            
                            <span >{{d.displayname}}</span>
                          </div>
                          <div class="fr">
                            <span class="btntext" @click="handleDelet(d)">{{rs.delete}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- 43 -->
              <hr>
              <h4 style="color: indianred;">{{rs.resi_trust}}</h4>
              <div class="upload_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <div class="upload_area">
                      <el-upload
                      drag
                      :show-file-list="false"
                      :on-success="uploadFile43"
                      :before-upload="beforeAvatarUpload"
                      :on-progress="uploadVideoProcess43"
                      :multiple="true"
                      
                      :action="actionUrl">
                        <i class="el-icon-upload" v-if="!videoFlag43"></i>
                        <el-progress v-if="videoFlag43" type="circle" :percentage="videoUploadPercent43" style="margin-top:30px;"></el-progress>
                        <div class="el-upload__text"  v-if="!videoFlag43">{{rs.drop_file_here_or_click}}</div>
                        <div class="el-upload__text"  v-if="!videoFlag43">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                      </el-upload>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <div class="file_list_area">
                      <ul>
                        <li style="height:30px" v-for="(d,i) in saleAdviceData.saleattachmentlist43" :key="i" >
                          <div class="handle fl">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span>{{i+1}}</span>
                            <el-popover
                              placement="left"
                              width="300"
                              trigger="click">
                              <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                              <template slot="reference"><span><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                              style=" vertical-align: middle;cursor: pointer;"/></span></template>
                            </el-popover>
                            
                            <span >{{d.displayname}}</span>
                          </div>
                          <div class="fr">
                            <span class="btntext" @click="handleDelet(d)">{{rs.delete}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- 44 -->
              <hr>
              <h4 style="color: indianred;">{{rs.legal}}</h4>
              <div class="upload_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <div class="upload_area">
                      <el-upload
                      drag
                      :show-file-list="false"
                      :on-success="uploadFile44"
                      :before-upload="beforeAvatarUpload"
                      :on-progress="uploadVideoProcess44"
                      :multiple="true"
                      
                      :action="actionUrl">
                        <i class="el-icon-upload" v-if="!videoFlag44"></i>
                        <el-progress v-if="videoFlag44" type="circle" :percentage="videoUploadPercent44" style="margin-top:30px;"></el-progress>
                        <div class="el-upload__text"  v-if="!videoFlag44">{{rs.drop_file_here_or_click}}</div>
                        <div class="el-upload__text"  v-if="!videoFlag44">{{rs.only_accept}} .gif,.bmp,.jpg,.jpeg,.png .pdf,.doc,.docx,.zip,.rar,.xls,.xlsx</div>
                      </el-upload>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <div class="file_list_area">
                      <ul>
                        <li style="height:30px" v-for="(d,i) in saleAdviceData.saleattachmentlist44" :key="i" >
                          <div class="handle fl">
                            <span>
                              <i class="fa fa-bars"></i>
                            </span>
                            <span>{{i+1}}</span>
                            <el-popover
                              placement="left"
                              width="300"
                              trigger="click">
                              <div><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                              <template slot="reference"><span><img :src="d.filepath +'?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                              style=" vertical-align: middle;cursor: pointer;"/></span></template>
                            </el-popover>
                            
                            <span >{{d.displayname}}</span>
                          </div>
                          <div class="fr">
                            <span class="btntext" @click="handleDelet(d)">{{rs.delete}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { insertSale, getSaleAdvice, getSaleStatus, approveSaleAdvice,getContact,
 requestDownloadSalePDF,requestHandleAgencyApprove,getSolicitorData,
  updateForUpperAgency,getSaleStatusDateList} from '@/api/saleAdviceApi.js'
import { insertAttachment, deleteAttachment } from '@/api/projectApi.js'
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { getOption } from "@/api/optionValueApi.js";
import axios from 'axios'
import { Option } from 'element-ui';
export default{
  data(){
    return{
      isShowNav:true,
      videoUploadPercent40:0,
      videoUploadPercent41:0,
      videoUploadPercent42:0,
      videoUploadPercent43:0,
      videoUploadPercent44:0,
      fileShow:false,
      actionUrl:'',
      videoFlag40:false,
      videoFlag41:false,
      videoFlag42:false,
      videoFlag43:false,
      videoFlag44:false,
      SendContactsShow:false,
      SendSubmit:{
        content:''
      },
      SendFileList:[],
      checkList:[],
      //以上新增
      contactsTableData:[],
      optionData:[],
      checkedCities: [],
      checkbox:false,
      suggest:"",
      keyContactsShow:false,
      showSuggest:false,
      cancelSalesShow:false,//取消订单理由弹窗
      OptionList0420:[],//取消订单理由条件
      optionObj0420:{},//选项值
      cancelSalesCheck:[],//取消订单选择的条件
      cancel99:'',//取消订单条件99
      dialogFormVisible: false,
      isAgencycommission:false,
      isOfficeComments:false,
      isAttachments:false,
      isActivityLog:false,
      show:false,
      userInfo:{},
      optionObj:{},
      // 按钮组
      btnSet:{
        isSave:false, //保存订单
        isCancel:false, //取消订单
        isSend:false, //发送Sales Advice
        isPrint:false, //下载打印Sales Advice
        isIssueContract:false, //发行合同
        isConditionalExchange:false, //有条件交换
        isUnconditionalExchange:false, //无条件交换
        isCheckList:false, //CheckList
        isPendingSettle:false, //Pending Settle
        isSettle:false, //Settle
        isApprove:false, //订单生成的审核
        isReject:false, //订单生成的驳回
        isApproveCancel:false, //订单取消的审核
        isRejectCancel:false, //订单取消的驳回
        isDepositWarning:false, //定金未支付警告
        isChangeAgent:false,
        isModifyPrice:false,
        isRemovePurchaser:false,
        isAddPurchaser:false,
        isAddSolicitor:false,
        isChangeSolicitor:false,
        isAddBroker:false,
        isChangeBroker:false,
        isEditCondition:false,
        isRefundDeposit:false,
        isEditDeposit:false,
        isConfirmDeposit:false,
        isEditAgency:false,
        isConfirmAgency:false,
        isEditAgent:false,
        isConfirmAgent:false,
        isLockReason:false,//订单修改的理由
        isCancelReason:false,//订单取消的理由
        isCancelUpdate:false,//申请修改订单信息时候的驳回按钮
      },
      showChannel:'0',
      salereasonObj:{},
      childValue:'',
      reasonObj:{},
      saleDateObj:{}
    }
  },
  created(){
    // console.log(this.saleAdviceData,'saleAdviceData1')
    // console.log(this.btnSet.isAddBroker,'btnSet.btnSet')
    if (this.$router.currentRoute.path == '/project_manage/edit_project/saleAdvice') {
      this.isShowNav = false;
    }

    this.$store.commit('BTN_STATUS',this.btnSet)
    // this.$store.commit('BTN_STATUS',this.btnSet)
    JSON.parse(localStorage.getItem('selectlist')).ORDER_STATUS_LIST.forEach(val => {
      this.saleDateObj[val.code] ={}
    });
    this.actionUrl =axios.defaults.baseURL+'agencyAttachment/uploadFile?saleid='+this.saleAdviceData.saleid;
    let ids = {
      propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
      saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
      requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
      languagetype:localStorage.getItem('languagetype'),
      ischannel:JSON.parse(sessionStorage.getItem('isFalg')).isChannel
    }
    this.getAllData(ids);
    this.showChannel = JSON.parse(sessionStorage.getItem('isFalg')).isChannel;
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.optionData = JSON.parse(sessionStorage.getItem('optionGetData'));
    
    this.getCancelSalesOption();
    if(this.optionData){
      if(this.optionData.length >0){
         this.optionData.forEach(ele=>{
          this.optionObj[ele.code] = ele.value;
        })
      }
    }
    JSON.parse(localStorage.getItem('selectlist')).CHANGE_REASON_LIST.forEach(element => {
      this.salereasonObj[element.code] = element.value
    });
    this.salereasonObj = Object.assign({},this.salereasonObj)
    this.getOptionCategory('04','16');
    

  },
  methods:{
    fn(){
    },
    setuploadFile(){
      this.fileShow = true;
    },
      handleDelet(d){
      this.$confirm(this.rs.info_msg_delete_question, 'Delete Attachment', {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        deleteAttachment({ids:d.attachmentid,path:d.filepath}).then(res=>{
          if(res.data.success){
            let ids = {
              propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
              saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
              requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
              languagetype:localStorage.getItem('languagetype')
            }
            this.getAllData(ids);
            this.$message.success(this.rs.info_msg_delete_success)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    },
    getCancelSalesOption(){
      let data = {
        keyid1:'04',
        keyid2:'20',
        languagetype:localStorage.getItem('languagetype')
      }
      getOption(data).then(res=>{
        if (res.data.success) {
          this.OptionList0420 = JSON.parse(JSON.stringify(res.data.data));
          this.OptionList0420.forEach(element=>{
            this.optionObj0420[element.code] = element.value 
          })
          this.optionObj0420 = Object.assign({},this.optionObj0420)
          // console.log(this.OptionList0420,'取消条件')//04 20
        }
      })
    },
    getOptionCategory(keyid1,keyid2){
      let data = {
        keyid1:keyid1,
        keyid2:keyid2,
        languagetype:localStorage.getItem('languagetype')
      }
      getOption(data).then(res=>{
        if (res.data.success) {
          res.data.data.forEach(element => {
            this.reasonObj[element.code] = element.value 
          });
          this.reasonObj = Object.assign({},this.reasonObj)
        }

      })
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
    contactSend(row){
      let arr = [];
        let arr1 = JSON.parse(JSON.stringify(this.saleAdviceData.attachmentlist))
        let arr2 = JSON.parse(JSON.stringify(this.saleAdviceData.depositattachmentlist))
        let arr3 = JSON.parse(JSON.stringify(this.saleAdviceData.checklistattachment))
        let arr4 = JSON.parse(JSON.stringify(this.saleAdviceData.saleattachmentlist40))
        let arr5 = JSON.parse(JSON.stringify(this.saleAdviceData.saleattachmentlist41))
        let arr6 = JSON.parse(JSON.stringify(this.saleAdviceData.saleattachmentlist42))
        let arr7 = JSON.parse(JSON.stringify(this.saleAdviceData.saleattachmentlist43))
        let arr8 = JSON.parse(JSON.stringify(this.saleAdviceData.saleattachmentlist44))
        this.SendFileList  = arr1.concat(arr2.concat(arr3.concat(arr4.concat(arr5.concat(arr6.concat(arr7.concat(arr8)))))));
        // console.log(this.SendFileList,'SendFileList333')
            // a. 标题改为Sales Advice-{项目全名}-Lot {lot} Unit {unit}-{日期 ddmmyyyy}
      let date = new Date();
      let contentstr = `Dear Team,
      
Please find attached Sales Advice for Lot `+ this.saleAdviceData.lot +` Unit `+this.saleAdviceData.unit+`.
      
Kindly proceed with the issuing of contracts at your earliest convenience.

Best regards
`+this.userInfo.firstname + ' ' + this.userInfo.lastname
        this.SendSubmit = {
        projectid:this.saleAdviceData.projectid,
        saleid:this.saleAdviceData.saleid,
        receivemailaccount:row.email,
        name:row.firstname + ' ' + row.lastname,
        subject:'SaleAdvice-' + this.saleAdviceData.projectname +'-Lot '
        +this.saleAdviceData.lot+' Unit '+ this.saleAdviceData.unit + '-' + this.setformatDate(new Date()),
        content:contentstr,
        
      }
      // console.log(this.SendSubmit,'66')
      this.SendContactsShow = true;
    },
    handleSend(e){
      let arr = []
      this.checkList.forEach(ele=>{
        arr.push(encodeURI(ele))
      })
      let data = {
        projectid:this.SendSubmit.projectid,
        saleid:this.SendSubmit.saleid,
        receivemailaccount:this.SendSubmit.receivemailaccount,
        name:this.SendSubmit.name,
        subject:this.SendSubmit.subject,
        content:this.SendSubmit.content + '<br />'+ this.rs.advice_attached,
        filepath:arr.join(',')
      }
      // console.log('submit-data',data)
      this.SalePDF(data,'send',e)
    },
    setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy')
      }else{
        return '-'
      }
    },
    getPdf(e){
      let data = {
        projectid:this.saleAdviceData.projectid,
        saleid:this.saleAdviceData.saleid,
      }
      this.SalePDF(data,'pdf',e)
    },
    SalePDF(data,type,e){
      requestDownloadSalePDF(data).then(res=>{
         let target = e.target;
        if(target.nodeName == 'SPAN' || target.nodeName == 'I'){
            target = e.target.parentNode;
        }
        target.blur();
        if (res.data.success) {
          if (type == 'send') {
            this.$message.success(this.rs.advice_sent_success)
            this.keyContactsShow = false;
            this.SendContactsShow = false;
          } else {
            this.download(res.data)
            this.$message.success(this.rs.pdf_generated_success)
          }
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
        
      })
    },
    
    childByValue (childValue) {
      this.childValue = childValue
    },
    getContactList(list) {
      // this.contactsTableData = JSON.parse(JSON.stringify(list));
      // console.log(this.saleAdviceData,'saleAdviceData-get律师')
      
        
    },
    handleCancel99Change(value){
      if (!value) {
        this.cancel99 = ''
      }
    },
    handleCheckedCitiesChange(value){
      if (!value) {
      this.suggest = ''
      }
    },
    checklist(){
      this.show = true;
    },
    save(){
      
      if (this.saleAdviceData.agentid == '') {
        this.saleAdviceData.agentid = this.userInfo.agentid
      }
      // console.log(this.saleAdviceData,'this.saleAdviceData3')
      if (this.saleAdviceData.saleid == null || this.saleAdviceData.isagent == '1') {
        let data = {
          propertyid:this.saleAdviceData.propertyid,
          saleid:this.saleAdviceData.saleid,
          operationagentid:JSON.parse(localStorage.getItem('userInfo')).agentid,
          agentid:this.saleAdviceData.agentid,
          logdatetime:this.saleAdviceData.logdatetime,
          clientids:JSON.stringify(this.saleAdviceData.clientlist) ,
          solicitorid:this.saleAdviceData.solicitorid,
          conditions:JSON.stringify(this.saleAdviceData.saleconditionlist),
          deposits:JSON.stringify(this.saleAdviceData.depositlist),
          brokerid:this.saleAdviceData.brokerObject.brokerid,
          brokername:this.saleAdviceData.brokerObject.brokerfirstname + ' ' + this.saleAdviceData.brokerObject.brokerlastname,
          projectname:this.saleAdviceData.projectname,
          lot:this.saleAdviceData.lot,
          unit:this.saleAdviceData.unit,
          brokeremail:this.saleAdviceData.brokerObject.brokeremail,
          brokermobileNumber:this.saleAdviceData.brokerObject.brokermobileNumber
        }
        insertSale(data).then(res=>{
          // console.log(res,'新房源预留返回')
          if (res.data.success) {
            let ids = {
              propertyid:this.saleAdviceData.propertyid,
              languagetype:localStorage.getItem('languagetype')
            }
            this.getAllData(ids)
            this.$message.success(this.rs.info_msg_update_success)
            // this.$router.go(-1) ---12/08
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      } else {
        let data = {
          propertyid:this.saleAdviceData.propertyid,
          saleid:this.saleAdviceData.saleid,
          solicitorid:this.saleAdviceData.solicitorid,
          conditions:JSON.stringify(this.saleAdviceData.saleconditionlist),
          lot:this.saleAdviceData.lot,
          unit:this.saleAdviceData.unit,
        }
        updateForUpperAgency(data).then(res=>{
          if (res.data.success) {
            let ids = {
              propertyid:this.saleAdviceData.propertyid,
              languagetype:localStorage.getItem('languagetype')
            }
            this.getAllData(ids)
            this.$message.success(this.rs.info_msg_update_success)
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },

    compare(newList,oldList){
      newList.forEach(ele =>{
        ele['isAdd'] = 'del'
        oldList.forEach(ele2 => {
          if (ele.clientid == ele2.clientid) {
            ele['isAdd'] = ''
          }
        })
      })
      oldList.forEach(ele2 => {
        var exist = false;
        newList.forEach(ele =>{
          if (ele.clientid == ele2.clientid) {
            exist = true;
          }
        })
        if (!exist) {
          ele2['isAdd'] = 'add'
          newList.push(ele2);
        }
      })
    },
    getAllData(ids){
      this.contactsTableData = [];
      getSaleAdvice(ids).then(res=>{
        // console.log(res,'进入saleAdvice.获取数据')
        if (res.data.success) {
          let AllDate = JSON.parse(JSON.stringify(res.data.data))
          if (JSON.parse(sessionStorage.getItem('isFalg')).type=='change_order') {
            if(AllDate.requeststatus!=2&&AllDate.requeststatus!=3){
              this.compare(AllDate.clientlist,AllDate.newclientlist)
              //条件
              AllDate.saleconditionlist.forEach(ele =>{
                ele['isAdd'] = 'del'
                AllDate.newsaleconditionlist.forEach(ele2 => {
                  if (ele.conditiontext == ele2.conditiontext) {
                    ele['isAdd'] = ''
                  }
                })
              })
              AllDate.newsaleconditionlist.forEach(ele2 => {
                var exist = false;
                AllDate.saleconditionlist.forEach(ele =>{
                  if (ele.conditiontext == ele2.conditiontext) {
                    exist = true;
                  }
                })
                if (!exist) {
                  ele2['isAdd'] = 'add'
                  AllDate.saleconditionlist.push(ele2);
                }
              })
              
              //律师
              if(AllDate.newsolicitorData.solicitorid != AllDate.solicitorid){
                AllDate.isAdd = 'mod'
              }else{
                AllDate['isAdd'] = ''
              }
              //经纪人
              if(AllDate.brokerObject.borkerid){
                AllDate.brokerObject['isAdd'] = 'mod'
              }else{
                AllDate.brokerObject['isAdd'] = ''
              }
            }
          }
          // 获取发送联系（项目联系人和项目律师和订单律师）
          getContact({
            agencyprojectid:JSON.parse(sessionStorage.getItem('isFalg')).agencyprojectid,
            projectid:AllDate.projectid
            }).then(res1=>{
            if (res1.data.success) {
              // 项目联系人
              this.contactsTableData = JSON.parse(JSON.stringify(res1.data.data));
              if(AllDate.solicitorid){
                getSolicitorData({solicitorid:AllDate.solicitorid}).then(res2=>{
                  if(res2.data.success){
                    let arr = JSON.parse(JSON.stringify(res2.data.data));
                    if(arr.length >0){
                      arr[0].level = '99'
                    }
                    this.contactsTableData = this.contactsTableData.concat(arr)
                  }
                })
              }
              if(AllDate.projectsolicitorid){
                getSolicitorData({solicitorid:AllDate.projectsolicitorid}).then(res3=>{
                  if(res3.data.success){
                    let arr = JSON.parse(JSON.stringify(res3.data.data));
                    if(arr.length >0){
                      arr[0].level = '98'
                    }
                    this.contactsTableData = this.contactsTableData.concat(arr)
                  }
                })
              }
            } else {
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res1.data.data)});
            }
          })
          this.$store.commit('SALE_ADVICE_DATA',AllDate)
          sessionStorage.setItem("isagency",AllDate.isagency)
          this.isState(JSON.parse(sessionStorage.getItem('isFalg')))
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          this.$store.commit('SALE_ADVICE_DATA',res.data.data)
          sessionStorage.setItem("isagency",res.data.data.isagency)
        }
      });
     
       if(JSON.parse(sessionStorage.getItem('isFalg')).saleid){
        //  获取 订单操作日期
        getSaleStatusDateList({saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid}).then(res=>{
          console.log(res,'datelist-09')
          if(res.data.success){
            res.data.data.forEach(ele=>{
              this.saleDateObj[ele.salestatus] = JSON.parse(JSON.stringify(ele))
            })
            this.saleDateObj = Object.assign({},this.saleDateObj)
          }
        })
      }
    },
    reload() {
      let ids = {
        propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
        languagetype:localStorage.getItem('languagetype'),
        ischannel:JSON.parse(sessionStorage.getItem('isFalg')).isChannel
      }
      this.showChannel = JSON.parse(sessionStorage.getItem('isFalg')).isChannel;
      this.getAllData(ids);
      this.actionUrl =axios.defaults.baseURL+'agencyAttachment/uploadFile?saleid='+this.saleAdviceData.saleid;
    },
    addContract(data){
      getSaleStatus(data).then(res=>{
          if(res.data.success){
            // this.$router.go(-1) ---12/08
            this.reload();
            this.cancelSalesShow = false;
            this.$message.success(this.rs.info_msg_update_success)
          }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
    },
    handleApprove(){
      if (JSON.parse(sessionStorage.getItem('isFalg')).isChannel=='1') {
          //渠道同意
          requestHandleAgencyApprove({requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,flag:'1'}).then(res=>{
            if(res.data.success){
              this.reload();
              this.$store.dispatch('WAITING_TOTAL')
              this.$message.success(this.rs.info_msg_update_success)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }else{
          //   审批同意
          let approveData = {
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid, 
            flag:'1',
            propertyid:this.saleAdviceData.propertyid,
          }
        // 新增comments
        // console.log(approveData,'approveData5')
          approveSaleAdvice(approveData).then(res=>{
            if (res.data.success) {
              // this.$router.go(-1) ---12/08
              this.reload();
              if(JSON.parse(sessionStorage.getItem('isFalg')).type=='change_order'){
                let  isFalg = JSON.parse(sessionStorage.getItem('isFalg'));
                isFalg.isUpdate = true
                sessionStorage.setItem('isFalg',JSON.stringify(isFalg))
              }
              this.$message.success(this.rs.info_msg_update_success);
              this.$confirm(this.rs.send_advice_info, '', {
                confirmButtonText: this.rs.yes_next_step,
                cancelButtonText: this.rs.i_ll_send_later,
                type: '',
                center: true
                }).then(() => {
                    this.keyContactsShow = true;
                }).catch(() => {
              });
              this.$store.dispatch('WAITING_TOTAL')
            }else{
                this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }
      
    },
    close(){
      this.checkedCities = [];
      this.suggest = "";
      this.dialogFormVisible = false
    },
    //取消弹窗 小郭的接口
    affirm(){
      if (this.checkedCities.length == 0&& this.suggest == "") {
        this.$message.error(this.rs.err_msg_reject_reason)
        return
      }
      if(JSON.parse(sessionStorage.getItem('isFalg')).type == 'reservation_approval'
      ||
      JSON.parse(sessionStorage.getItem('isFalg')).type == 'lock_approval'
      ||
      JSON.parse(sessionStorage.getItem('isFalg')).type == 'change_order'
      ||
      JSON.parse(sessionStorage.getItem('isFalg')).type == 'cancel_approval'
      ){
        let str = ''
        this.checkedCities.forEach(ele=>{
          str += this.optionObj[ele]+'<br/>'
        })
        str += this.suggest;
        let Data = {
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
            flag:'0',
            code:this.checkedCities.join(','),
            content:this.suggest,
            comments:str,
            propertyid:this.saleAdviceData.propertyid

          }
        if (JSON.parse(sessionStorage.getItem('isFalg')).isChannel=='1') {
          // 新增comments
          //渠道取消
          requestHandleAgencyApprove(Data).then(res=>{
            if(res.data.success){
              this.dialogFormVisible = false
              //  this.$router.go(-1) ---12/08
               this.reload();
               this.$message.success(this.rs.info_msg_update_success)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })

        }else{
        // 新增comments
        approveSaleAdvice(Data).then(res=>{
          if (res.data.success) {
            this.dialogFormVisible = false
            this.reload();
            this.$message.success(this.rs.info_msg_update_success)
            this.$store.dispatch('WAITING_TOTAL')
          }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        } 
      }
    },
    handleRequestCancel(){
      // 申请取消订单按钮点击
      this.cancelSalesShow = true;
    },
    handleRequestCancelConfirm(){
      if (this.cancelSalesCheck.length == 0&& this.cancel99 == "") {
        this.$message.error(this.rs.err_msg_cancel_reason)  //err_msg_reject_reason
        return
      }
      //申请取消订单选择条件后 -- 提交
      let str = ''
      this.cancelSalesCheck.forEach(ele=>{
        str += this.optionObj0420[ele]+'<br/>'
      })
      str += this.cancel99;
      let RequestCancelData = {
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        salestatus:'90',
        list:this.cancelSalesCheck.join(','),
        content:this.cancel99,
        comments:str,
      }
      this.addContract(RequestCancelData)
    },
    //拒绝预定
    handleRejectReservation(){
      this.dialogFormVisible = true
    },
    // 驳回修改
    handleRejectUpdate(){
      this.dialogFormVisible = true
    },
     // 驳回取消
    handleRejectCancel(){
      this.dialogFormVisible = true
    },
    Approvecancel(){
      if(JSON.parse(sessionStorage.getItem('isFalg')).type == 'reservation_approval'
      ||
      JSON.parse(sessionStorage.getItem('isFalg')).type == 'lock_approval'
      ||
      JSON.parse(sessionStorage.getItem('isFalg')).type == 'change_order'){
        this.dialogFormVisible = true
      }else{
        //取消不弹窗 阿升的接口
        let cancelData = {
          saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
          salestatus:'90',
          // list:
        }
        this.addContract(cancelData)
      }
    },
    setSalestagedetailid(type){
      if(this.saleDateObj[type]){
        if(this.saleDateObj[type].salestagedetailid){
          return this.saleDateObj[type].salestagedetailid
        }else{
          return null
        }
      }else{
        return null
      }
    },
    handelIssuecontract(){
      // salestagedetailid
      let issuecontractData = {
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        salestatus:'10',
        salestagedetailid:this.setSalestagedetailid('10'),
        oldsalestatus:this.saleAdviceData.salestatus,
        projectname:this.saleAdviceData.projectname,
        lot:this.saleAdviceData.lot,
        unit:this.saleAdviceData.unit,
      }
      this.addContract(issuecontractData)
    },
    handleExchange(){
      let issuecontractData = {
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        salestatus:'20',
        salestagedetailid:this.setSalestagedetailid('20'),
        oldsalestatus:this.saleAdviceData.salestatus,
        projectname:this.saleAdviceData.projectname,
        lot:this.saleAdviceData.lot,
        unit:this.saleAdviceData.unit,
      }
      this.addContract(issuecontractData)
    },
    handleUnconditionalexchange(){
      let issuecontractData = {
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        salestatus:'30',
        salestagedetailid:this.setSalestagedetailid('30'),
        oldsalestatus:this.saleAdviceData.salestatus,
        projectname:this.saleAdviceData.projectname,
        lot:this.saleAdviceData.lot,
        unit:this.saleAdviceData.unit,
      }
      this.addContract(issuecontractData)
    },
    handlePendingSettle(){
        let issuecontractData = {
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        salestatus:'40',
        salestagedetailid:this.setSalestagedetailid('40'),
        oldsalestatus:this.saleAdviceData.salestatus,
        projectname:this.saleAdviceData.projectname,
        lot:this.saleAdviceData.lot,
        unit:this.saleAdviceData.unit,
      }
      this.addContract(issuecontractData)
    },
    handleSettle(){
      let settleData = {
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        salestatus:'50',
        salestagedetailid:this.setSalestagedetailid('50'),
        oldsalestatus:this.saleAdviceData.salestatus,
        projectname:this.saleAdviceData.projectname,
        lot:this.saleAdviceData.lot,
        unit:this.saleAdviceData.unit,
      }
      this.addContract(settleData)
    },
    handleApproveCancel(){
      //  同意取消订单
       if (JSON.parse(sessionStorage.getItem('isFalg')).isChannel=='1') {
         let approveData = {
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
            flag:'1',
          }
          requestHandleAgencyApprove({requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,flag:'1'}).then(res=>{
            if(res.data.success){
              //  this.$router.go(-1) ---12/08
              console.log('同意')
               this.reload();
               this.$store.dispatch('WAITING_TOTAL')
               this.$message.success(this.rs.info_msg_update_success)
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }else{
          //本公司
          let approveData = {
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
            flag:'1',
            propertyid:this.saleAdviceData.propertyid
            
          }
            // 新增comments
        // console.log(approveData,'approveData3')

          approveSaleAdvice(approveData).then(res=>{
            if (res.data.success) {
              // this.$router.go(-1) ---12/08
              this.reload();
              this.$message.success(this.rs.info_msg_update_success)
            }else{
                this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }
    },

    disableButton(isFalg) {
      if(isFalg.saleid){
        this.isAgencycommission = true
        this.isOfficeComments = true
        this.isAttachments = true
        this.isActivityLog = true
      }
      this.btnSet = {
        isSave:false, //保存订单
        isChangeAgent:false, // 修改Agent
        isCancel:false, //取消订单
        isSend:false, //发送Sales Advice
        isPrint:false, //下载打印Sales Advice
        isIssueContract:false, //发行合同
        isConditionalExchange:false, //有条件交换
        isUnconditionalExchange:false, //无条件交换
        isCheckList:false, //CheckList
        isPendingSettle:false, //Pending Settle
        isSettle:false, //Settle
        isApprove:false, //订单生成的审核
        isReject:false, //订单生成的驳回
        isApproveCancel:false, //订单取消的审核
        isRejectCancel:false, //订单取消的驳回
        isDepositWarning:false, //定金未支付警告
        isModifyPrice:false,
        isRemovePurchaser:false,
        isAddPurchaser:false,
        isAddSolicitor:false,
        isChangeSolicitor:false,
        isAddBroker:false,
        isChangeBroker:false,
        isEditCondition:false,
        isRefundDeposit:false,
        isEditDeposit:false,
        isConfirmDeposit:false,
        isEditAgency:false,
        isConfirmAgency:false,
        isEditAgent:false,
        isConfirmAgent:false,
        isLockReason:false,//订单修改的理由
        isCancelReason:false,//订单取消的理由
        isCancelUpdate:false,//申请修改订单信息时候的驳回按钮
      }
    },
    setState() {
      this.isAgencycommission = true
      this.isOfficeComments = true
      this.isAttachments = true
      this.isActivityLog = true
      this.btnSet.isSend=true
      this.btnSet.isPrint=true
    },
    isNeedApprove() {
      return this.saleAdviceData.isneedapprove != null && this.saleAdviceData.isneedapprove == '1';
    },
    isState(isFalg){
      // console.log('isFlag', isFalg);
      // console.log('saleAdviceData', this.saleAdviceData);
      this.disableButton(isFalg);
      if (isFalg.type == 'pay_deposit') {
        this.setState();
        this.btnSet.isEditDeposit = true
      } else if (isFalg.type == 'refund_deposit') {
        this.setState();
        this.btnSet.isRefundDeposit=true
      } else if (isFalg.type == 'create_invoice') {
        this.setState();
        this.btnSet.isEditAgency = true
        this.btnSet.isEditAgent = true
      } else if (isFalg.type == 'my_request') {
        this.setState();
      } else if (isFalg.type == 'approved_requests') {
        this.setState();
      } else if (isFalg.type=='reservation_approval') {
        this.setState();
        if (this.isNeedApprove()) {
          this.btnSet.isApprove = true
          this.btnSet.isReject = true
        }
      } else if (isFalg.type=='deposit_approval') {
        this.setState();
        this.btnSet.isConfirmDeposit = true
      } else if (isFalg.type=='invoice_approval') {
        this.setState();
        this.btnSet.isConfirmAgency = true
        this.btnSet.isConfirmAgent = true
      } else if (isFalg.type == 'cancel_approval') {
        this.setState();
        if (this.isNeedApprove()) {
          this.btnSet.isCancelReason = true
          this.btnSet.isApproveCancel = true
          this.btnSet.isRejectCancel = true
        }
      } else if (isFalg.type == 'my_approval') {
      } else if (isFalg.type == 'lock_approval') {
        if (this.isNeedApprove()) {
          this.btnSet.isLockReason = true
          // this.btnSet.isCancel = true
          this.btnSet.isApprove = true
        }
      } else if(isFalg.type == 'change_order') {
        if (this.isNeedApprove()) {
          this.btnSet.isCancelUpdate = true
          this.btnSet.isApprove = true
        }
      } else {
        if (this.saleAdviceData.saleid != null) {
          this.btnSet.isSend=true
          this.btnSet.isPrint=true
        }
        if (this.saleAdviceData.saleid == null || this.saleAdviceData.salestatus == '00') {
          console.log('Sale未生成或待审核状态')
          this.btnSet.isSave = true
          this.btnSet.isChangeAgent = true
          this.btnSet.isAddPurchaser = true
          this.btnSet.isModifyPrice =true
          this.btnSet.isRemovePurchaser =true
          this.btnSet.isAddBroker = true
          this.btnSet.isAddSolicitor = true
          this.btnSet.isChangeBroker = true
          this.btnSet.isChangeSolicitor = true
          this.btnSet.isEditCondition = true
        } else if (this.saleAdviceData.salestatus == '01') {
          console.log('Sale已审核，合同还未发行')
          if (this.saleAdviceData.isagent=='1') {
            this.btnSet.isChangeAgent = true
            this.btnSet.isCancel = true
            this.btnSet.isAddPurchaser = true
            this.btnSet.isAddBroker = true
            this.btnSet.isAddSolicitor = true
            this.btnSet.isEditDeposit = true
            this.btnSet.isRemovePurchaser =true
            this.btnSet.isChangeBroker = true
          }
          this.btnSet.isSave = true
          this.btnSet.isModifyPrice =true
          this.btnSet.isChangeSolicitor = true
          this.btnSet.isEditCondition = true
          this.btnSet.isIssueContract = true
          this.btnSet.isDepositWarning=true
        } else if (this.saleAdviceData.salestatus == '10') {
          console.log('Sale合同已发行，但还未做有条件交换')
          if (this.saleAdviceData.isagent=='1') {
            this.btnSet.isChangeAgent = true
            this.btnSet.isCancel = true
            this.btnSet.isAddPurchaser = true
            this.btnSet.isAddBroker = true
            this.btnSet.isAddSolicitor = true
            this.btnSet.isEditDeposit = true
            this.btnSet.isRemovePurchaser = true
            this.btnSet.isChangeBroker = true
          }
          this.btnSet.isSave = true
          this.btnSet.isModifyPrice =true
          this.btnSet.isChangeSolicitor = true
          this.btnSet.isEditCondition = true
          this.btnSet.isConditionalExchange = true
          this.btnSet.isDepositWarning=true
        } else if (this.saleAdviceData.salestatus == '20') {
          console.log('Sale已经有条件交换，但还未无条件交换')
          if (this.saleAdviceData.isagent=='1') {
            this.btnSet.isChangeAgent = true
            this.btnSet.isCancel = true
            this.btnSet.isAddPurchaser = true
            this.btnSet.isAddBroker = true
            this.btnSet.isAddSolicitor = true
            this.btnSet.isEditDeposit = true
            this.btnSet.isRemovePurchaser = true
            this.btnSet.isChangeBroker = true
          }
          this.btnSet.isSave = true
          this.btnSet.isModifyPrice =true
          this.btnSet.isChangeSolicitor = true
          this.btnSet.isEditCondition = true
          this.btnSet.isUnconditionalExchange = true
        } else if (this.saleAdviceData.salestatus == '30') {
          console.log('Sale已无条件交换，等待Pending Settle或Settle')
          if (this.saleAdviceData.isagent=='1') {
            this.btnSet.isChangeAgent = true
            this.btnSet.isCancel = true
            this.btnSet.isAddPurchaser = true
            this.btnSet.isAddBroker = true
            this.btnSet.isAddSolicitor = true
            this.btnSet.isEditDeposit = true
            this.btnSet.isRemovePurchaser = true
            this.btnSet.isChangeBroker = true
          }
          this.btnSet.isSave = true
          this.btnSet.isModifyPrice =true
          this.btnSet.isChangeSolicitor = true
          this.btnSet.isEditCondition = true
          this.btnSet.isPendingSettle = true
          this.btnSet.isSettle = true
        } else if (this.saleAdviceData.salestatus == '40') {
          console.log('Sale已Pending Settle，等待Settle')
          if (this.saleAdviceData.isagent=='1') {
            this.btnSet.isChangeAgent = true
            this.btnSet.isCancel = true
            this.btnSet.isAddPurchaser = true
            this.btnSet.isRemovePurchaser =true
            this.btnSet.isAddBroker = true
            this.btnSet.isAddSolicitor = true
            this.btnSet.isChangeBroker = true
            this.btnSet.isEditDeposit = true
          }
          this.btnSet.isSave = true
          this.btnSet.isModifyPrice =true
          this.btnSet.isChangeSolicitor = true
          this.btnSet.isEditCondition = true
          this.btnSet.isCheckList = true
          this.btnSet.isSettle = true
        } else if (this.saleAdviceData.salestatus == '50') {
          console.log('Sale已经Settle状态')
        } else if (this.saleAdviceData.salestatus == '90') {
          console.log('Sale取消申请中状态')
        } else if (this.saleAdviceData.salestatus == '99') {
          console.log('Sale已取消状态')
        }
      }
      this.$store.commit('BTN_STATUS',this.btnSet)
    },
    closeCancelSales(){
      console.log('====')
      this.cancelSalesShow = false;
    },
    uploadFile40(res, file) {
      let  testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
      let picturetype = '0'
      this.videoUploadPercent40 = 100;
      this.videoFlag40 = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      var fileData={
          refertype:'7',
          referid:this.saleAdviceData.saleid,
          attachmenttype:'40',
           displayname:file.name,
          filepath:file.response.filepath,
        }
      insertAttachment(fileData).then(res=>{
        if(res.data.success){
          // this.getPicture(this.projectId);
          let ids = {
            propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
            saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
            languagetype:localStorage.getItem('languagetype')
          }
          this.getAllData(ids);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
     uploadFile41(res, file) {
      let  testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
      let picturetype = '0'
      this.videoUploadPercent41 = 100;
      this.videoFlag41 = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      var fileData={
          refertype:'7',
          referid:this.saleAdviceData.saleid,
          attachmenttype:'41',
           displayname:file.name,
          filepath:file.response.filepath,
        }
      insertAttachment(fileData).then(res=>{
        if(res.data.success){
          // this.getPicture(this.projectId);
          let ids = {
            propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
            saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
            languagetype:localStorage.getItem('languagetype')
          }
          this.getAllData(ids);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
     uploadFile42(res, file) {
      let  testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
      let picturetype = '0'
      this.videoUploadPercent42 = 100;
      this.videoFlag42 = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      var fileData={
          refertype:'7',
          referid:this.saleAdviceData.saleid,
          attachmenttype:'42',
           displayname:file.name,
          filepath:file.response.filepath,
        }
      insertAttachment(fileData).then(res=>{
        if(res.data.success){
          // this.getPicture(this.projectId);
          let ids = {
            propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
            saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
            languagetype:localStorage.getItem('languagetype')
          }
          this.getAllData(ids);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
     uploadFile43(res, file) {
      let  testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
      let picturetype = '0'
      this.videoUploadPercent43 = 100;
      this.videoFlag43 = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      var fileData={
          refertype:'7',
          referid:this.saleAdviceData.saleid,
          attachmenttype:'43',
           displayname:file.name,
          filepath:file.response.filepath,
        }
      insertAttachment(fileData).then(res=>{
        if(res.data.success){
          // this.getPicture(this.projectId);
          let ids = {
            propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
            saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
            languagetype:localStorage.getItem('languagetype')
          }
          this.getAllData(ids);
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
     uploadFile44(res, file) {
      let  testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
      let picturetype = '0'
      this.videoUploadPercent44 = 100;
      this.videoFlag44 = false;
      this.$store.commit('SET_SHOW_LOADING',false)
      var fileData={
          refertype:'7',
          referid:this.saleAdviceData.saleid,
          attachmenttype:'44',
           displayname:file.name,
          filepath:file.response.filepath,
        }
      insertAttachment(fileData).then(res=>{
        if(res.data.success){
          // this.getPicture(this.projectId);
          let ids = {
            propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
            saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
            requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
            languagetype:localStorage.getItem('languagetype')
          }
          this.getAllData(ids);
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
    beforeAvatarUpload(file) {
       const isLt100M = file.size / 1024 / 1024 < 100;
      const isBMP = file.type === 'image/bmp';
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
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
      if(!isBMP && !isPNG && !isJPG && !isGIF && !isPdf && !isdoc && !isdocx && !iszip && !israr && !isxls && !isxlsx){
          this.$message.error(this.rs.err_msg_file_type);
      }
      return  (isBMP || isJPG || isGIF || isPNG || isPdf || isdoc || isdocx || iszip || israr || isxls || isxlsx)&&isLt100M;
    },
    // 上传进度
    uploadVideoProcess40(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoFlag40 = true;
      this.videoUploadPercent40 = parseInt(file.percentage.toFixed(0));
    },
     uploadVideoProcess41(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoFlag41 = true;
      this.videoUploadPercent41 = parseInt(file.percentage.toFixed(0));
    },
     uploadVideoProcess42(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoFlag42 = true;
      this.videoUploadPercent42 = parseInt(file.percentage.toFixed(0));
    },
     uploadVideoProcess43(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoFlag43 = true;
      this.videoUploadPercent43 = parseInt(file.percentage.toFixed(0));
    },
     uploadVideoProcess44(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
      this.videoFlag44 = true;
      this.videoUploadPercent44 = parseInt(file.percentage.toFixed(0));
    },
  },
  watch:{
    childValue(){
       let ids = {
        propertyid:JSON.parse(sessionStorage.getItem('isFalg')).propertyid,
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        requestid:JSON.parse(sessionStorage.getItem('isFalg')).requestid,
        languagetype:localStorage.getItem('languagetype')
      }
      this.getAllData(ids);
    },
    checkList(val){
      // console.log(val,'33')
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','saleAdviceData','control','salesrs']),
    readonly(){
      if(this.control.sales_advice === '02'){
        return true
      }else{
        return false
      }
    }
  },
  components: {
  'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
  // advice
  'advice': resolve => require(['./templale/advice.vue'], resolve),
  // Purchaser
  'purchaser': resolve => require(['./templale/purchaser.vue'], resolve),
  // broker
  'broker': resolve => require(['./templale/AdviceBroker.vue'], resolve),
  // Deposit
  'deposit': resolve => require(['./templale/deposit.vue'], resolve),
  // Contact
  'contact': resolve => require(['./templale/contact.vue'], resolve),
  // agencycommission
  'agencycommission': resolve => require(['./templale/agencycommission.vue'], resolve),
  // activitylog
  'activitylog': resolve => require(['./templale/activitylog.vue'], resolve),
  //key-dates
  'key-dates': resolve => require(['./templale/KeyDates.vue'], resolve),
  //  attachments
  'attachments': resolve => require(['./templale/attachments.vue'], resolve),
  // officecomments
  'officecomments': resolve => require(['./templale/officecomments.vue'], resolve),
  // checklistpop
  'checklistpop': resolve => require(['./templale/CheckListPopup.vue'], resolve),
  },

}
</script>

<style scoped lang="scss">
.dialog-body {
  .title{
    font-size: 14px;
    font-weight: bold;
    padding: 25px 0 10px 0;
  }
}
button.medium {
  color: #fff;
  border: 0;
}
button.bg_green:hover{
  color:#00a65a;
  border: 1px solid #00a65a;

}

button.bg_orange:hover{
  color:#ff9955;
  border: 1px solid #ff9955;
}

button.bg_red_btn:hover{
  color:#dd4b39;
  border: 1px solid #dd4b39;
}

button.bg_blue:hover{
  color:#4C4BD5;
  border: 1px solid #4C4BD5;
}
.unpaid_warning{
  background-color: #f39c12  !important;
  border-left: 5px solid rgb(200, 127, 10);
  border-radius:3px;
  line-height: 20px;
  margin: 10px;
  padding: 20px;
}
.unpaid_warning_red{
  background-color: #5c79e2  !important;
  border-left: 5px solid #3a5acd;
  color: #FFF;
  border-radius:3px;
  line-height: 20px;
  margin: 10px;
  padding: 20px;
}
.unpaid_warning>p{
  font-weight: 600;
  color: #FFF;
}
.dot{
  position: relative;
  left: 15px;
}
.dot::before{
  content: '';
  width: 5px;
  height: 5px;
  background: white;
  position: absolute;
  left: -15px;
  top: 50%;
  margin-top: -2.5px;
  border-radius: 50%;
}
.key_contact{
    color: #FFF;
    text-align: center;
    border-radius: 5px;
}
.salereason{
    background-color: orange;
    border-left: 5px solid #a06904;
    color: #FFF;
    border-radius: 3px;
    line-height: 20px;
    margin: 10px;
    padding: 20px;
}
</style>
<style lang="scss">
/* .key_contactsTable .el-table th>.cell,.key_contactsTable .el-table--enable-row-transition .el-table__body td{
  text-align: center;
} */
.send_check {
  .el-checkbox {
    font-weight: 400;
  }
}

</style>
