<template>
  <div class="wrapper" 
    v-loading.fullscreen.lock="GET_SHOW_LOADING" 
    :element-loading-text="rs.uploading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    >
    <div class="usinfomask" v-if="falg" @click="dropdownShow"></div>
    <div class="main-header">
      <div :class="logo">
        <span v-if="!isCollapse" class="logo-lg">
          <!-- <img :src="userInfo.logoimagedark +'?x-oss-process=image/resize,m_fixed,h_150'" style="width: 160px; height: 80%; vertical-align: middle; object-fit: cover;"> -->
          <div style=" width: 224px;height: 45px;overflow: hidden;">
            <div class="zoomImage" :style="{backgroundImage:'url('+userInfo.logoimagedark+')'}"></div>
          </div>
        </span>
        <span v-if="isCollapse" class="logo-lg">
            <!-- <img :src="userInfo.logoimageminid +'?x-oss-process=image/resize,m_fixed,h_150'" style="width: 40px; height: 80%; vertical-align: middle;"> -->
          <div style=" width: 49px;height: 45px;overflow: hidden;">
            <div class="zoomImage" :style="{backgroundImage:'url('+userInfo.logoimageminid+')'}"></div>
          </div>
        </span>
      </div>
      <div class="navbar clearfix">
        <ul class="menu menu_nth clearfix fl">
          <li @click="open">
            <img src="../assets/imgs/top/top_1.png" alt="">
          </li>
        </ul>
        <div>
          <ul class="menu  fr clearfix">
            <!-- <li style="position: relative;">
              <img src="../assets/imgs/top/top_2.png" alt="">
              <span @click="goRouter('/sale_manage/awaitApproving')" class="await_square" v-if="watingTotal!=0">{{watingTotal}}</span>
              <span @click="goRouter('/sale_manage/awaitApprovingChannel')" style="right:10px" class="await_square_blue" v-if="channelWatingTotal!=0">{{channelWatingTotal}}</span>
            </li> -->
            <!-- <li @click="goRouter('/notification/allNotificationsForAgentApp')">
              <img src="../assets/imgs/top/top_3.png" alt="">
            </li> -->
            <li style="position: relative;">
              <span @click="langtoggle= !langtoggle" class="languagename">{{languagename}}</span>
              <ul class="lag" v-show="langtoggle">
                <li v-for="(d,index) in langList" :key='index' @click="toggleLanguage(d)">
                  <img :src="d.countryflag" alt="" class="user-image">
                  <span style="padding-left:10px">{{d.languagename}}</span>
                </li>
              </ul>
            </li>
            <li style="position: relative;">
              <span class="menu_span" @click="dropdownShow">
                <img :src="userInfo.photo" alt="" style="border-radius:50%;margin-right:5px;" v-if="userInfo.photo" >
                <span  class="userInfo_name" >{{userInfo.firstname}}&nbsp;{{userInfo.lastname}}</span> 
                <img src="../assets/imgs/top/top_4.png" alt="" style="height:10px;width:10px;margin-left:5px;" >
              </span>
              
              <div v-if="falg" class="dropdown_menu">
                <!-- <img src="../assets/imgs/top/top_9.png" alt="" class="delete_icon"  @click="dropdownShow"> -->
                <ul class="dropdown">
                  <li>
                    <p>{{rs.user_name}}</p>
                    <p>{{userInfo.firstname}}&nbsp;{{userInfo.lastname}}</p>
                  </li>
                  <li @click="changePassword">
                    <p> <img src="../assets/imgs/top/Fill 1@2x.png" alt="" >{{rs.change_password}}</p>
                  </li>
                  <li @click="accountShow">
                    <p>  <img src="../assets/imgs/top/Fill 1@2x (1).png" alt="">{{rs.profile}}</p>
                  </li>
                  <!-- v-if="control.bind_agency&&!readonlyBind" -->
                  <li @click="bindAgency" v-if="control.bind_agency&&!readonlyBind">
                    <p>  <img src="../assets/imgs/top/bangding@2x.png" alt="">{{rs.bind_agency}}</p>
                  </li>
                  <!-- v-if="control.replace_login&&!readonlyReplace" -->
                  <li @click="vicariousLogin" v-if="control.replace_login&&!readonlyReplace">   
                    <p>  <img src="../assets/imgs/top/Fill 1@2x (2).png" alt="" >{{rs.replace_login}}</p>
                  </li>
                  <li @click="dropOut">
                    <p>  <img src="../assets/imgs/top/signout 2@2x.png" alt="">{{rs.logout}}</p>
                  </li>
                </ul>
              </div>
            </li>
            <!-- <li  @click.stop="sidebarRight"><img src="../assets/imgs/top/top_5.png" alt=""></li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div :class="sidebar">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu :collapse='isCollapse' :unique-opened="true"   default-active="2"  background-color="#202A47" text-color="#fff" @open="SopenC"  @close="handleClose" active-text-color="#fff">
              <el-menu-item index="1" v-if="control.dashboard" @click="goRouter('/dashboard','1')">
                <div class="el_menu_fontsize_max">
                  <img v-if="active != '1'" src="../assets/imgs/menu/mune_1.png" alt=""> 
                  <img v-else src="../assets/imgs/menu/mune_1 (2).png" alt="">
                  <span>{{rs.dashboard}}</span>
                </div>
              </el-menu-item>
              <el-submenu index="2" v-if="control.project_manage">
                <template slot="title"> 
                 <div @click="goRouter('','2')" class="el_menu_fontsize_max">
                   <img v-if="active != '2'" src="../assets/imgs/menu/mune_2.png" alt=""> 
                    <img v-else src="../assets/imgs/menu/mune_2 (2).png" alt=""> 
                    <span>{{rs.project_manage}}</span>
                 </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" v-if="control.add_project" @click="goRouter('/project_manage/addProject','2-1')" class="el_menu_fontsize">
                    <img v-if="active != '2-1'" src="../assets/imgs/menu/mune_2_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_2_1 (2).png" alt="">
                    {{rs.add_new_project}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="2-2" v-if="control.all_projects" @click="goRouter('/project_manage/allProjects','2-2')" class="el_menu_fontsize">
                    <img v-if="active != '2-2'" src="../assets/imgs/menu/mune_2_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_2_2 (2).png" alt="">
                    {{rs.all_projects}}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="2-3" v-if="control.shared_project" @click="goRouter('/project_manage/sharedProjects','2-3')" class="el_menu_fontsize">
                    <img v-if="active != '2-3'" src="../assets/imgs/menu/mune_2_3.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_2_3 (2).png" alt="">
                    {{rs.shared_projects}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="2-4" v-if="control.all_properties" @click="goRouter('/project_manage/allProperties','2-4')" class="el_menu_fontsize">
                    <img v-if="active != '2-4'" src="../assets/imgs/menu/mune_2_4.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_2_4 (2).png" alt="">
                    {{rs.all_properties}}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group v-if="control.project_pf_manage">
                  <el-submenu index="2-9">
                    <template slot="title">
                      <div @click="goRouter('','2-9')" class="el_menu_fontsize" >
                        <img v-if="active != '2-9'" src="../assets/imgs/menu/mune_10_4.png" alt="">
                        <img v-else src="../assets/imgs/menu/mune_10_4 (2).png" alt="">
                        <span>{{rs.platform_manage}}</span>
                      </div>
                    </template>
                    <el-menu-item index="2-9-1" v-if="control.project_pf_import_externalid" @click="goRouter('/project_manage/platform_manage/importExternalID','2-9-1')" class="el_menu_fontsize">
                      <img v-if="active != '2-9-1'" src="../assets/imgs/menu/mune_10_3_2.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_2 (2).png" alt="">
                      {{rs.import_externalid}}
                     </el-menu-item>
                    <el-menu-item index="2-9-2" v-if="control.project_pf_agency_project" @click="goRouter('/project_manage/platform_manage/agencyProject','2-9-2')" class="el_menu_fontsize">
                      <img v-if="active != '2-9-2'" src="../assets/imgs/menu/mune_10_3_2.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_2 (2).png" alt="">
                      {{rs.agency_project}}
                     </el-menu-item>
                    <el-menu-item index="2-9-3" v-if="control.project_pf_all_projects" @click="goRouter('/project_manage/platform_manage/allProjects','2-9-3')" class="el_menu_fontsize">
                      <img v-if="active != '2-9-3'" src="../assets/imgs/menu/mune_10_3_2.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_2 (2).png" alt="">
                      {{rs.all_projects}}
                     </el-menu-item>
                  </el-submenu>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3" v-if="control.client_manage">
                <template slot="title">
                  <div @click="goRouter('','3')" class="el_menu_fontsize_max" >
                    <img v-if="active != '3'" src="../assets/imgs/menu/mune_3.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_3 (2).png" alt="">
                    <span>{{rs.client_manage}}</span>
                  </div>
                  
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1" v-if="control.add_client" @click="goRouter('/client_manage/clientDetail/save','3-1')" class="el_menu_fontsize">
                    <img v-if="active != '3-1'" src="../assets/imgs/menu/mune_3_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_3_1 (2).png" alt="">
                    {{rs.add_new_client}}
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="3-2" v-if="control.all_clients" @click="goRouter('/client_manage/allClients','3-2')" class="el_menu_fontsize">
                    <img v-if="active != '3-2'" src="../assets/imgs/menu/mune_3_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_3_2 (2).png" alt="">
                    {{rs.all_clients}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4" v-if="control.sale_manage">
                <template slot="title">
                  <div style="position: relative;" @click="goRouter('','4')" class="el_menu_fontsize_max">
                    <img v-if="active != '4'" src="../assets/imgs/menu/mune_4.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4 (2).png" alt="">
                    <span>{{rs.sale_manage}}</span>
                    <span class="await_quantity" style="right: 15px;" v-if="watingTotal + channelWatingTotal !=0">{{watingTotal + channelWatingTotal}}</span>
                    <!-- <span class="await_quantity_blue" v-if="channelWatingTotal!=0">{{}}</span> -->
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-6" v-if="control.all_sales" @click="goRouter('/sale_manage/allSales','4-6')" class="el_menu_fontsize">
                     <img v-if="active != '4-6'" src="../assets/imgs/menu/mune_4_5.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_5 (2).png" alt="">
                    {{rs.all_sales}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="4-1" v-if="control.my_request" @click="goRouter('/sale_manage/myRequests','4-1')" class="el_menu_fontsize">
                    <img v-if="active != '4-1'" src="../assets/imgs/menu/mune_4_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_1 (2).png" alt="">
                    {{rs.my_requests}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="4-2" v-if="control.await_approving" @click="goRouter('/sale_manage/awaitApproving','4-2')" class="el_menu_fontsize">
                    <img v-if="active != '4-2'" src="../assets/imgs/menu/mune_4_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_2 (2).png" alt="">
                    {{rs.await_approving}} 
                    <span class="await_quantity" v-if="watingTotal!=0">{{watingTotal}}</span>
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="4-3" v-if="control.await_approving_channel" @click="goRouter('/sale_manage/awaitApprovingChannel','4-3')" class="el_menu_fontsize">
                    <img v-if="active != '4-3'" src="../assets/imgs/menu/mune_4_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_2 (2).png" alt="">
                    {{rs.await_approving_channel}}
                    <span class="await_quantity_blue" v-if="channelWatingTotal!=0">{{channelWatingTotal}}</span>
                  </el-menu-item>
                </el-menu-item-group>
                <!-- <el-menu-item-group>
                  <el-menu-item index="4-4" v-if="control.my_approval" @click="goRouter('/sale_manage/myApprovals','4-4')" class="el_menu_fontsize">
                    <img v-if="active != '4-4'" src="../assets/imgs/menu/mune_4_3.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_3 (2).png" alt="">
                    {{rs.my_approvals}}
                    </el-menu-item>
                </el-menu-item-group> -->
                <!-- <el-menu-item-group>
                  <el-menu-item index="4-5" v-if="control.my_approval_channel" @click="goRouter('/sale_manage/myApprovalsChannel','4-5')" class="el_menu_fontsize">
                    <img v-if="active != '4-5'" src="../assets/imgs/menu/mune_4_3.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_3 (2).png" alt="">
                    {{rs.my_approvals_channel}}
                    </el-menu-item>
                </el-menu-item-group> -->
                
                <el-menu-item-group>
                  <el-menu-item index="4-7" v-if="control.pay_deposit" @click="goRouter('/sale_manage/deposit','4-7')" class="el_menu_fontsize">
                    <img v-if="active != '4-7'" src="../assets/imgs/menu/mune_4_12@2x.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_12 (2)@2x.png" alt="">
                    {{rs.deposit}}
                    </el-menu-item>
                </el-menu-item-group>
                 <!-- <el-menu-item-group>
                  <el-menu-item index="4-8" v-if="control.pay_deposit" @click="goRouter('/sale_manage/payDeposit','4-8')" class="el_menu_fontsize">
                    <img v-if="active != '4-8'" src="../assets/imgs/menu/mune_4_12@2x.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_12 (2)@2x.png" alt="">
                    {{rs.pay_deposit}}
                    </el-menu-item>
                </el-menu-item-group>
                 <el-menu-item-group>
                  <el-menu-item index="4-9" v-if="control.refund_deposit" @click="goRouter('/sale_manage/RefundDeposit','4-9')" class="el_menu_fontsize">
                    <img v-if="active != '4-9'" src="../assets/imgs/menu/mune_4_13@2x.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_13 (2)@2x.png" alt="">
                    {{rs.refund_deposit}}
                    </el-menu-item>
                </el-menu-item-group> -->
                 <el-menu-item-group>
                  <el-menu-item index="4-10" v-if="control.create_invoice" @click="goRouter('/sale_manage/createInvoice','4-10')" class="el_menu_fontsize">
                    <img v-if="active != '4-10'" src="../assets/imgs/menu/mune_4_12@2x.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_12 (2)@2x.png" alt="">
                    {{rs.create_invoice}}
                    </el-menu-item>
                </el-menu-item-group>
                <!-- <el-menu-item-group>
                  <el-menu-item index="4-11" v-if="control.all_reserved" @click="goRouter('/sale_manage/allReserved','4-11')" class="el_menu_fontsize">
                    <img v-if="active != '4-11'" src="../assets/imgs/menu/mune_4_4.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_4 (2).png" alt="">
                    {{rs.all_reserved}}
                    </el-menu-item>
                </el-menu-item-group> -->
                <!-- <el-menu-item-group>
                  <el-menu-item index="4-12" v-if="control.all_cancelled" @click="goRouter('/sale_manage/allCancelled','4-12')" class="el_menu_fontsize">
                    <img v-if="active != '4-12'" src="../assets/imgs/menu/mune_4_6.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_6 (2).png" alt="">
                    {{rs.all_cancelled}}
                    </el-menu-item>
                </el-menu-item-group> -->
                <!-- <el-menu-item-group>
                  <el-menu-item index="4-13" v-if="control.all_settled" @click="goRouter('/sale_manage/allSettled','4-13')" class="el_menu_fontsize">
                    <img v-if="active != '4-13'" src="../assets/imgs/menu/mune_4_7.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_4_7 (2).png" alt="">
                    {{rs.all_settled}}
                    </el-menu-item>
                </el-menu-item-group> -->
              </el-submenu>
              <el-submenu index="5" v-if="control.organization_manage">
                <template slot="title">
                  <div @click="goRouter('','5')" class="el_menu_fontsize_max">
                    <img v-if="active != '5'" src="../assets/imgs/menu/mune_11_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_11_1 (2).png" alt="">
                    <span>{{rs.teams}}</span>
                  </div>
                </template>
                 <el-menu-item-group>
                  <el-menu-item index="5-1" v-if="control.department" @click="goRouter('/teams_manage/departments','5-1')" class="el_menu_fontsize">
                    <img v-if="active != '5-1'" src="../assets/imgs/menu/mune_8_7.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_7 (2).png" alt="">
                    {{rs.department}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="5-2" v-if="control.agent" @click="goRouter('/teams_manage/agents','5-2')" class="el_menu_fontsize">
                    <img v-if="active != '5-2'" src="../assets/imgs/menu/mune_8_3.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_3 (2).png" alt="">
                    {{rs.members}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6" v-if="control.activity_manage">
                <template slot="title">
                  <div  @click="goRouter('','6')" class="el_menu_fontsize_max">
                    <img v-if="active != '6'" src="../assets/imgs/menu/mune_5.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_5 (2).png" alt="">
                    <span>{{rs.activity_manage}}</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="6-1" v-if="control.all_activities" @click="goRouter('/activity_manage/allActivities','6-1')" class="el_menu_fontsize">
                    <img v-if="active != '6-1'" src="../assets/imgs/menu/mune_5_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_5_1 (2).png" alt="">
                    {{rs.all_activities}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="6-2" v-if="control.attendance_result" @click="goRouter('/activity_manage/attendanceResults','6-2')" class="el_menu_fontsize">
                    <img v-if="active != '6-2'" src="../assets/imgs/menu/mune_5_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_5_2 (2).png" alt="">
                    {{rs.attendance_results}}
                    </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- <el-menu-item index="6" v-if="control.report_statistics" @click="goRouter('/report_statistics/reportStatistics')" class="el_menu_fontsize">
                <i class="fa fa-bar-chart"></i>
                <span slot="title">11111111111111111</span>
              </el-menu-item> -->
              <el-submenu index="7" v-if="control.notification">
                <template slot="title">
                  <div  @click="goRouter('','7')" class="el_menu_fontsize_max">
                  <img v-if="active != '7'" src="../assets/imgs/menu/mune_6.png" alt="">
                  <img v-else src="../assets/imgs/menu/mune_6 (2).png" alt="">
                  <span>{{rs.notifications}}</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="7-1" v-if="control.notification" @click="goRouter('/notification/allNotificationsForAgentApp','7-1')" class="el_menu_fontsize">
                    <img v-if="active != '7-1'" src="../assets/imgs/menu/mune_6_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_6_1 (2).png" alt="">
                    {{rs.all_notifications_agent_app}}
                    </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="8" v-if="control.training_manage">
                <template slot="title">
                  <div  @click="goRouter('','8')" class="el_menu_fontsize_max">
                   <img v-if="active != '8'" src="../assets/imgs/menu/mune_7.png" alt="">
                  <img v-else src="../assets/imgs/menu/mune_7 (2).png" alt="">
                  <span>{{rs.training_manage}}</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="8-1" v-if="control.faqs" @click="goRouter('/training/FAQs','8-1')" class="el_menu_fontsize">
                    <img v-if="active != '8-1'" src="../assets/imgs/menu/mune_7_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_7_1 (2).png" alt="">
                    {{rs.faqs}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="8-2" v-if="control.traning_video" @click="goRouter('/training/trainingVideos','8-2')" class="el_menu_fontsize">
                    <img v-if="active != '8-2'" src="../assets/imgs/menu/mune_7_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_7_2 (2).png" alt="">
                    {{rs.training_videos}}
                    </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="9" v-if="control.master_manage">
                <template slot="title">
                  <div @click="goRouter('','9')" class="el_menu_fontsize_max">
                   <img v-if="active != '9'" src="../assets/imgs/menu/mune_8.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8 (2).png" alt="">
                    <span>{{rs.master_manage}}</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="9-1" v-if="control.agency" @click="goRouter('/master_manage/agencies','9-1')" class="el_menu_fontsize">
                    <img v-if="active != '9-1'" src="../assets/imgs/menu/mune_8_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_1 (2).png" alt="">
                    {{rs.agency}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  
                  <el-menu-item index="9-2" v-if="control.own_agency" @click="goRouter('/master_manage/agencyDetailPreview/OwnAgency','9-2')" class="el_menu_fontsize">
                    <img v-if="active != '9-2'" src="../assets/imgs/menu/mune_8_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_2 (2).png" alt="">
                    {{rs.own_agency}}
                  </el-menu-item>
                </el-menu-item-group>
                <!-- <el-menu-item-group>
                  <el-menu-item index="9-3" v-if="control.department" @click="goRouter('/master_manage/departments','9-3')" class="el_menu_fontsize">
                    <img v-if="active != '9-3'" src="../assets/imgs/menu/mune_8_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_2 (2).png" alt="">
                    {{rs.department}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="9-4" v-if="control.agent" @click="goRouter('/master_manage/agents','9-4')" class="el_menu_fontsize">
                    <img v-if="active != '9-4'" src="../assets/imgs/menu/mune_8_3.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_3 (2).png" alt="">
                    {{rs.members}}
                  </el-menu-item>
                </el-menu-item-group> -->
                <el-menu-item-group>
                  <el-menu-item index="9-5" v-if="control.vendor" @click="goRouter('/master_manage/vendors','9-5')" class="el_menu_fontsize">
                    <img v-if="active != '9-5'" src="../assets/imgs/menu/mune_8_4.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_4 (2).png" alt="">
                    {{rs.vendor}}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="9-6" v-if="control.builder" @click="goRouter('/master_manage/builders','9-6')" class="el_menu_fontsize">
                    <img v-if="active != '9-6'" src="../assets/imgs/menu/mune_8_5.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_5 (2).png" alt="">
                    {{rs.builder}}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="9-7" v-if="control.solicitor" @click="goRouter('/master_manage/solicitors','9-7')" class="el_menu_fontsize">
                    <img v-if="active != '9-7'" src="../assets/imgs/menu/mune_8_6.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_6 (2).png" alt="">
                    {{rs.solicitor}}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="9-8" v-if="control.solicitor_firm" @click="goRouter('/master_manage/solicitorFirms','9-8')" class="el_menu_fontsize">
                    <img v-if="active != '9-8'" src="../assets/imgs/menu/mune_8_7.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_7 (2).png" alt="">
                    {{rs.solicitor_firms}}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="9-9" v-if="control.partner_member" @click="goRouter('/master_manage/partnerMembers','9-9')" class="el_menu_fontsize">
                    <img v-if="active != '9-9'" src="../assets/imgs/menu/mune_8_8.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_8 (2).png" alt="">
                    {{rs.partner_members}}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="9-11" v-if="control.partner_firm" @click="goRouter('/master_manage/partnerFirms','9-11')" class="el_menu_fontsize">
                    <img v-if="active != '9-11'" src="../assets/imgs/menu/mune_8_9.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_8_9 (2).png" alt="">
                    {{rs.partner_firms}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="10" v-if="control.membership_manage">
                <template slot="title">
                  <div @click="goRouter('','10')" class="el_menu_fontsize_max">
                    <img v-if="active != '10'" src="../assets/imgs/menu/mune_9.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_9 (2).png" alt="">
                    <span>{{rs.membership_manage}}</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="10-1" v-if="control.membership_information" @click="goRouter('/membership_manage/membershipInformation/own','10-1')" class="el_menu_fontsize">
                     <img v-if="active != '10-1'" src="../assets/imgs/menu/mune_9_1.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_9_1 (2).png" alt="">
                      {{rs.membership_information}} 
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="10-2" v-if="control.purchase_product" @click="goRouter('/membership_manage/purchaseProduct','10-2')" class="el_menu_fontsize">
                      <img v-if="active != '10-2'" src="../assets/imgs/menu/mune_9_2.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_9_2 (2).png" alt="">
                      {{rs.purchase_product}}
                      </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="10-3" v-if="control.my_orders" @click="goRouter('/membership_manage/myOrders','10-3')" class="el_menu_fontsize">
                    <img v-if="active != '10-3'" src="../assets/imgs/menu/mune_9_6.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_9_6 (2).png" alt="">
                    {{rs.my_orders}}
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="10-4" v-if="control.all_memberships" @click="goRouter('/membership_manage/membership/allAgencies','10-4')" class="el_menu_fontsize">
                    <img v-if="active != '10-4'" src="../assets/imgs/menu/mune_9_3.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_9_3 (2).png" alt="">
                    {{rs.all_memberships}} 
                   </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="10-5" v-if="control.all_products" @click="goRouter('/membership_manage/allProducts','10-5')" class="el_menu_fontsize">
                    <img v-if="active != '10-5'" src="../assets/imgs/menu/mune_9_4.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_9_4 (2).png" alt="">
                    {{rs.all_products}}
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="10-6" v-if="control.all_licenses" @click="goRouter('/membership_manage/allLicenses','10-6')" class="el_menu_fontsize">
                    <img v-if="active != '10-6'" src="../assets/imgs/menu/mune_9_5.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_9_5 (2).png" alt="">
                    {{rs.all_licenses}}
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="10-7" v-if="control.all_orders" @click="goRouter('/membership_manage/allOrders','10-7')" class="el_menu_fontsize">
                    <img v-if="active != '10-7'" src="../assets/imgs/menu/mune_9_6.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_9_6 (2).png" alt="">
                    {{rs.all_orders}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="11" v-if="control.system_setting">
                <template slot="title">
                  <div @click="goRouter('','11')" class="el_menu_fontsize_max">
                    <img v-if="active != '11'" src="../assets/imgs/menu/mune_10.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_10 (2).png" alt="">
                    <span>{{rs.system_setting}}</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="11-1" v-if="control.language" @click="goRouter('/system_setting/languages','11-1')" class="el_menu_fontsize">
                    <img v-if="active != '11-1'" src="../assets/imgs/menu/mune_10_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_10_1.png" alt="">
                    {{rs.language_manage}} </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="11-2" v-if="control.option_value" @click="goRouter('/system_setting/optionValues','11-2')" class="el_menu_fontsize">
                    <img v-if="active != '11-2'" src="../assets/imgs/menu/mune_10_2.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_10_2.png" alt="">
                    {{rs.option_value_manage}}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="11-5" v-if="control.agency_setting" @click="goRouter('/system_setting/agencySetting','11-5')" class="el_menu_fontsize">
                    <img v-if="active != '11-5'" src="../assets/imgs/menu/mune_10_3_6.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_10_3_6 (2).png" alt="">
                    {{rs.agency_setting}}</el-menu-item>
                </el-menu-item-group>
              
                 <!-- <el-menu-item index="11-4-8" v-if="control.agency_setting" @click="goRouter('/system_setting/app_agent/agencySetting','11-4-8')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-8'" src="../assets/imgs/menu/mune_10_4_5.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_4_5 (2).png" alt="">
                      {{rs.agency_setting}}
                    </el-menu-item> -->
                <el-menu-item-group v-if="control.back_end_system">
                  <el-submenu index="11-3">
                    <template slot="title">
                      <div @click="goRouter('','11-3')" class="el_menu_fontsize">
                        <img v-if="active != '11-3'" src="../assets/imgs/menu/mune_10_3.png" alt="">
                        <img v-else src="../assets/imgs/menu/mune_10_3.png" alt="">
                        <span>{{rs.back_end_system}}</span>
                      </div>
                    </template>

                    <el-menu-item index="11-3-1" v-if="control.backend_resource" @click="goRouter('/system_setting/back_end/resources','11-3-1')" class="el_menu_fontsize">
                      <img v-if="active != '11-3-1'" src="../assets/imgs/menu/mune_10_3_1.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_1 (2).png" alt="">
                      {{rs.resource_manage}}
                      </el-menu-item>
                    <el-menu-item index="11-3-2" v-if="control.backend_function" @click="goRouter('/system_setting/back_end/functions','11-3-2')" class="el_menu_fontsize">
                      <img v-if="active != '11-3-2'" src="../assets/imgs/menu/mune_10_3_2.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_2 (2).png" alt="">
                      {{rs.function_manage}}
                     </el-menu-item>
                    <el-menu-item index="11-3-3" v-if="control.backend_role" @click="goRouter('/system_setting/back_end/roles','11-3-3')" class="el_menu_fontsize">
                      <img v-if="active != '11-3-3'" src="../assets/imgs/menu/mune_10_3_3.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_3 (2).png" alt="">
                      {{rs.role_manage}}
                    </el-menu-item>
                    <el-menu-item index="11-3-4" v-if="control.backend_user" @click="goRouter('/system_setting/back_end/users','11-3-4')" class="el_menu_fontsize">
                       <img v-if="active != '11-3-4'" src="../assets/imgs/menu/mune_10_3_4.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_4 (2).png" alt="">
                      {{rs.user_manage}}
                    </el-menu-item>
                    <el-menu-item index="11-3-5" v-if="control.backend_approve_organization" @click="goRouter('/system_setting/back_end/approvalOrganizations','11-3-5')" class="el_menu_fontsize">
                     <img v-if="active != '11-3-5'" src="../assets/imgs/menu/mune_10_3_5.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_5 (2).png" alt="">
                      {{rs.approve_organizations}}
                    </el-menu-item>
                    <el-menu-item index="11-3-6" v-if="control.backend_other_setting" @click="goRouter('/system_setting/back_end/otherSetting','11-3-6')" class="el_menu_fontsize">
                      <img v-if="active != '11-3-6'" src="../assets/imgs/menu/mune_10_3_6.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_6 (2).png" alt="">
                      {{rs.other_setting}}
                    </el-menu-item>
                    <el-menu-item index="11-3-7" v-if="control.backend_mail_format" @click="goRouter('/system_setting/back_end/mailFormat','11-3-7')" class="el_menu_fontsize">
                      <img v-if="active != '11-3-7'" src="../assets/imgs/menu/mune_10_3_7.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_7 (2).png" alt="">
                      {{rs.mail_format}}
                    </el-menu-item>
                    <el-menu-item index="11-3-8" v-if="control.backend_mail_host" @click="goRouter('/system_setting/back_end/mailHost','11-3-8')" class="el_menu_fontsize">
                      <img v-if="active != '11-3-8'" src="../assets/imgs/menu/mune_10_3_8.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_8 (2).png" alt="">
                      {{rs.mail_host}}
                    </el-menu-item>
                    <el-menu-item index="11-3-9" v-if="control.backend_sales_resources" @click="goRouter('/system_setting/back_end/salesResources','11-3-9')" class="el_menu_fontsize">
                      <img v-if="active != '11-3-9'" src="../assets/imgs/menu/mune_10_3_6.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_6 (2).png" alt="">
                      {{rs.sales_resources}}
                    </el-menu-item>
                  </el-submenu>
                </el-menu-item-group>
                <el-menu-item-group v-if="control.agent_app">
                  <el-submenu index="11-4">
                    <template slot="title">
                      <div @click="goRouter('','11-4')" class="el_menu_fontsize" >
                        <img v-if="active != '11-4'" src="../assets/imgs/menu/mune_10_4.png" alt="">
                        <img v-else src="../assets/imgs/menu/mune_10_4 (2).png" alt="">
                        <span>{{rs.agent_app}}</span>
                      </div>
                      </template>
                    <el-menu-item index="11-4-1" v-if="control.agentapp_resource" @click="goRouter('/system_setting/app_agent/resources','11-4-1')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-1'" src="../assets/imgs/menu/mune_10_4_1.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_4_1 (2).png" alt="">
                      {{rs.resource_manage}}
                    </el-menu-item>
                    <el-menu-item index="11-4-2" v-if="control.agentapp_function" @click="goRouter('/system_setting/app_agent/functions','11-4-2')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-2'" src="../assets/imgs/menu/mune_10_3_2.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_2 (2).png" alt="">
                      {{rs.function_manage}}
                     </el-menu-item>
                    <el-menu-item index="11-4-3" v-if="control.agentapp_role" @click="goRouter('/system_setting/app_agent/roles','11-4-3')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-3'" src="../assets/imgs/menu/mune_10_3_3.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_3 (2).png" alt="">
                      {{rs.role_manage}}
                    </el-menu-item>
                    <el-menu-item index="11-4-4" v-if="control.agentapp_user" @click="goRouter('/system_setting/app_agent/users','11-4-4')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-4'" src="../assets/imgs/menu/mune_10_4_2.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_4_2 (2).png" alt="">
                      {{rs.user_manage}}
                    </el-menu-item>
                    <el-menu-item index="11-4-5" v-if="control.agentapp_task_setting" @click="goRouter('/system_setting/app_agent/taskSetting','11-4-5')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-5'" src="../assets/imgs/menu/mune_10_4_3.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_4_3 (2).png" alt="">
                      {{rs.task_setting}}
                    </el-menu-item>
                    <el-menu-item index="11-4-6" v-if="control.agentapp_other_setting" @click="goRouter('/system_setting/app_agent/otherSetting','11-4-6')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-6'" src="../assets/imgs/menu/mune_10_4_4.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_4_4 (2).png" alt="">
                      {{rs.other_setting}}
                    </el-menu-item>
                    <el-menu-item index="11-4-7" v-if="control.agentapp_mail_format" @click="goRouter('/system_setting/app_agent/mailFormat','11-4-7')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-7'" src="../assets/imgs/menu/mune_10_4_5.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_4_5 (2).png" alt="">
                      {{rs.mail_format}}
                    </el-menu-item>
                    <el-menu-item index="11-4-8" v-if="control.agentapp_sales_resources" @click="goRouter('/system_setting/app_agent/salesResources','11-4-8')" class="el_menu_fontsize">
                      <img v-if="active != '11-4-8'" src="../assets/imgs/menu/mune_10_3_6.png" alt="">
                      <img v-else src="../assets/imgs/menu/mune_10_3_6 (2).png" alt="">
                      {{rs.sales_resources}}
                    </el-menu-item>
                  </el-submenu>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="11-6" v-if="control.corporate_website" @click="goRouter('/system_setting/corporateWebsite','11-6')" class="el_menu_fontsize">
                    <img v-if="active != '11-6'" src="../assets/imgs/menu/mune_10_3_6.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_10_3_6 (2).png" alt="">
                    {{rs.corporate_website}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="12" v-if="control.sync_log">
                <template slot="title">
                  <div @click="goRouter('','12')" class="el_menu_fontsize_max">
                    <img v-if="active != '12'" src="../assets/imgs/menu/mune_10.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_10 (2).png" alt="">
                    <span>{{rs.sync_log}}</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="12-1" v-if="control.all_sync_log" @click="goRouter('/sync_log/allSyncLog','12-1')" class="el_menu_fontsize">
                    <img v-if="active != '12-1'" src="../assets/imgs/menu/mune_10_1.png" alt="">
                    <img v-else src="../assets/imgs/menu/mune_10_1.png" alt="">
                    {{rs.all_sync_log}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="router_center_box">
        <el-row type="flex">
          <el-col :span="24">
            <div class="router_center clearfix">
              <!-- <div class="wrapper" 
                v-loading.fullscreen.lock="true" 
                element-loading-text="正在加载"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.5)"
                > -->
                <router-view/>
              <!-- </div> -->
              
              <div style="padding-bottom: 20px;"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <div class="router_right">
      <div :class="sidebar_right">
        <right-nav 
        @bindSuccess='userInfoInit'
        @sendmsg='getMsg'
        ></right-nav>
      </div>
    </div> -->
    
    <div class="userbox_pop" v-if="userbox_pop" @click.stop="userboxPop">
      <!-- Change Password 修改密码 -->
      <div class="change_password " v-if="change_password" @click.stop>
        <img src="../assets/imgs/top/top_9.png" alt="" class="delete_icon"  @click="userboxPop">
        <el-row class="function_block">
          <p class="title">{{rs.change_password}}</p>
          <p class="sub_title">{{rs.new_password}}</p>
          <el-input clearable size="small" type="password" style="width:100%" v-model="newPassword1"></el-input>
          <p class="sub_title">{{rs.confirm_password}}</p>
          <el-input clearable size="small" type="password" style="width:100%" v-model="newPassword2"></el-input>
          <el-button   class="small bg_button fr" style="margin:10px 0" size="small" @click="setPassword">{{rs.submit}}</el-button>
        </el-row>
      </div>
      <!-- Bind Agency 选择公司 -->
      <div class="bind_agency" v-if="bind_agency"  @click.stop>
        <img src="../assets/imgs/top/top_9.png" alt="" class="delete_icon"  @click="userboxPop">
        <el-row class="function_block" >
          <p class="title">{{rs.bind_agency}}</p>
          <p class="sub_title">{{rs.agency}}</p>
          <el-select v-model="formData.agencyid" filterable placeholder=" "  style="width:100%" size="small" >
            <el-option
            v-for="(item,i) in agencyList"
            :key="i"
            :label="item.shortname"
            :value="item.agencyid">
            </el-option>
          </el-select>
          <el-button   class="small bg_button fr" style="margin:10px 0" size="small" @click="bind">{{rs.bind}}</el-button>
        </el-row>
      </div>

      <!-- Account 个人信息 -->
      <div class="account " v-if="account" @click.stop>
        <img src="../assets/imgs/top/top_9.png" alt="" class="delete_icon"  @click="userboxPop">
        <div style="border-bottom: 1px solid #dcdcdc;">
          <div class="user_header clearfix ">
            <div class="fl photo_box">
              <img v-if="userInfo.photo" :src="userInfo.photo" alt="">
                <img src="../assets/imgs/no_photo.jpg" v-else alt="">
            </div>
            <div class="fl circle_box">
              <p class="circle_firstname">{{userInfo.firstname}}&nbsp;{{userInfo.lastname}}</p>
              <p class="circle_languagetype">{{rolenameObj[languagetype]}}</p>
            </div>
          </div>
        </div>
        <div class="user ">
          <p class="user_title">{{rs.department}}</p>
          <p>{{userInfo.fullname}}</p>
        </div>
        <div class="user ">
          <p class="user_title">{{rs.phone_number}}</p>
          <p>{{userInfo.mobilenumber}}</p>
        </div>
        <div class="user ">
          <p class="user_title">{{rs.email}}</p>
          <p>{{userInfo.email}}</p>
        </div>
        <div class="user ">
          <p class="user_title">{{rs.role}}</p>
          <p>{{rolenameObj[languagetype]}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSelectList, logout } from "@/api/userApi.js";
import { updateLanguageID } from "@/api/agentApi.js";
import { getRoleFunctionByRoleID } from "@/api/roleApi.js";
import { getLanguageList } from "@/api/languageApi.js";
import { getResourceJson } from "@/api/resourceApi.js";
import { bindAgency, modifyPassword } from '@/api/userApi.js';
import { getAgencyList } from '@/api/agencyApi.js'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      change_password:false,
      bind_agency:false,
      userbox_pop:false,
      account:false,
      userid:"",
      // langList:[],
      userInfoShow: false,
      langtoggle: false,
      languagename: "",
      isCollapse: false,
      sidebar: "sidebar",
      logo: "logo",
      falg: false,
      sidebar_right: "sidebar_right_min",
      clientWidth: "",
      openeds: [],
      userInfo: {},
      userFirstname: "",
      userLastname: "",
      agencyfullnameObj: {},
      agencyshortnameObj: {},
      rolenameObj: {},
      total:0,
      active:'1',
      newPassword1:'',
      newPassword2:'',
      formData:{
        agencyid:''
      },
      agencyList:[]
    };
  },
  created() {
    this.userInfoInit();
    // this.userFirstname = this.userInfo.firstname
    // this.userLastname = this.userInfo.lastname
    
    let w = window.innerWidth;
    this.clientWidth = w;
    if (localStorage.getItem("resourcelist") != null) {
      this.$store.commit(
        "RESOURCE_LIST",
        JSON.parse(localStorage.getItem("resourcelist"))
      );
    }
    if (localStorage.getItem("salesresourcelist") != null) {
      this.$store.commit(
        "SALES_RESOURCE_LIST",
        JSON.parse(localStorage.getItem("salesresourcelist"))
      );
    }
    if (localStorage.getItem("selectlist") != null) {
      this.$store.commit(
        "SELECT_LIST",
        JSON.parse(localStorage.getItem("selectlist"))
      );
    }
    if (localStorage.getItem("languagetype") != null) {
      this.$store.commit(
        "LANGUAGE_TYPE",
        localStorage.getItem("languagetype")
      );
    }

    getRoleFunctionByRoleID({
      roleid: this.userInfo.roleid,
      languagetype: this.userInfo.languagetype,
      systemtype: '0'
    }).then(res => {
      if (res.data.success) {
        let controlObj = {};
        let controlRouterObj = {};
        res.data.data.forEach(element => {
          controlObj[element.functionid] = element.operationtype === "01" ? false : element.operationtype;
          if (element.routerpath != null && element.routerpath != '') {
            // controlRouterObj[element.routerpath] = element.operationtype;  
            var routerpath = element.routerpath.split(';')
            routerpath.forEach(router => {
              controlRouterObj[router] = element.operationtype;  
            })
          }  
        });
        this.$store.commit("CONTROL", controlObj);
        this.$store.commit("CONTROL_ROUTER", controlRouterObj);
      } else {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: this.ErrorMsgStr(res.data.data)
        });
      }
    });
    this.getLanguage({ languageid: localStorage.getItem("languagetype") });
    if (localStorage.getItem("breadListStorage") != null) {
      this.$store.state.navPathList = JSON.parse(
        localStorage.getItem("breadListStorage")
      );
    }else{
      this.$store.state.navPathList = [];
    }
    this.$store.dispatch('WAITING_TOTAL')
    this.$store.dispatch('CHANNEL_WAITING_TOTAL')

    this.getAgency({languagetype:'01'})
  },
  mounted() {
    document.addEventListener('click',this.documentClick)
    // 动态设置背景图的高度为浏览器可视区域高度
    // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
    // this.clientHeight.height = `${document.documentElement.clientHeight}px`;
    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    const that = this;
    window.onresize = function temp() {
      var kk = `${document.documentElement.clientWidth}`;
      if (kk < 753) {
        that.isCollapse = true;
        that.sidebar = "sidebar_min";
        that.logo = "logo_min";
      } else {
        // 为了解决ipd 拖拽的时候，菜单栏打开问题；
        // that.isCollapse = false;
        // that.sidebar = "sidebar";
        // that.logo = "logo";
      }
    };
  },
  computed: {
    ...mapGetters(["se", "rs", "languagetype", "control",'watingTotal','GET_SHOW_LOADING','channelWatingTotal']),
    langList() {
      return this.se.Language;
    },
    readonlyBind(){
      if(this.control.bind_agency ==='02'){
        return true
      }else{
        return false
      }
    },
    readonlyReplace(){
      if(this.control.replace_login ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch: {
    rs(val) {}
  },
  methods: {
    // 修改密码
    setPassword(){
      if(this.newPassword1 ===this.newPassword2){
        modifyPassword({userid:this.userInfo.userid,password:this.newPassword2}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_modify_password_succe);
            this.userbox_pop = false;
            // this.$router.push({path:'/'})
            this.$emit("sendmsg",'sidebar_right_min')
          }else{
            this.$message.error(this.rs.err_msg_modify_password_faild);
          }
        })
      }else{
        this.$message.error(this.rs.err_msg_password_unmatched)
      }
    },
    // 绑定公司
    bind(){
      bindAgency(this.formData).then(res=>{
        localStorage.setItem("userInfo",JSON.stringify(res.data.data));//用户信息存本地
        if(res.data.success){
          this.$message.success(this.rs.bind + this.rs.ok)
          this.userbox_pop = false;
          // this.$router.push({path:'/index'});
          this.$emit("sendmsg",'sidebar_right_min')
          this.$emit('bindSuccess')
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 替身登录
    vicariousLogin(){
      this.$router.push({path:'/replaceLogin'})
    },
    // 修改密码
  changePassword(){
      this.change_password = true;
      this.userbox_pop = true;
      this.falg = false;
      this.bind_agency = false;
      this.account = false;
    },
    // 个人信息
    accountShow(){
      this.change_password = false;
      this.userbox_pop = true;
      this.falg = false;
      this.bind_agency = false;
      this.account = true;
    },
    bindAgency(){
      this.bind_agency = true;
      this.userbox_pop = true;
      this.falg = false;
      this.change_password = false;
      this.account = false;
    },
    userboxPop(){
      this.userbox_pop = false
    },
    getAgency(data){
      getAgencyList(data).then(res=>{
        if(res.data.success){
          this.agencyList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    documentClick(){
      if (this.sidebar_right == "sidebar_right") {
        this.sidebar_right = "sidebar_right_min";
      }
    },
    SopenC(index) {
      
      this.openeds = [index];
    },
   handleClose(key, keyPath) {
        // console.log(key, keyPath);
    },
    open() {
      if (this.isCollapse == false) {
        this.isCollapse = true;
        this.sidebar = "sidebar_min";
        this.logo = "logo_min";
      } else {
        this.isCollapse = false;
        this.sidebar = "sidebar";
        this.logo = "logo";
      }
    },
    getMsg(data){
      this.sidebar_right = data
    },
    sidebarRight() {
      if (this.sidebar_right == "sidebar_right") {
        this.sidebar_right = "sidebar_right_min";
      } else {
        this.sidebar_right = "sidebar_right";
        this.falg = false;
      }
    },
    dropdownShow() {
      this.falg = !this.falg
    },
    goRouter(path,active) {
      if(path == '/sale_manage/allSales'){
       localStorage.removeItem('salesTableName')
      }
      sessionStorage.removeItem('PROJECTSINDEX')
      sessionStorage.removeItem('NAVIGATION_ACTIVE')
      sessionStorage.removeItem('TabName')
      sessionStorage.removeItem('ROLESINDEX')
      this.active = active
      this.$router.push({ path });
    },
    dropOut() {
      logout({ token: sessionStorage.getItem("token") }).then(res => {
        if (res.data.success) {
          this.$router.push({ path: "/" });
          this.$message({
            message: this.rs.exit_success,
            type: "success"
          });
          sessionStorage.removeItem("token");
        } else {
          this.$message({ message: res.data.errorMsg, type: "error" });
        }
      });
    },
    getLanguage(data){
      getLanguageList(data).then(
        res => {
          if (res.data.success) {
            res.data.data.forEach(element => {
              if (element.languagetype == localStorage.getItem("languagetype")) {
                this.languagename = element.languagename;
              }
            });
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        }
      );
    },
    toggleLanguage(d) {
      updateLanguageID({languageid:d.languageid}).then(res => {
        if(res.data.success){
          this.getLanguage({ languageid: d.languageid});
        }
      })
      localStorage.setItem("languagetype", d.languageid);
      this.$store.commit("LANGUAGE_TYPE", d.languageid);
      this.langtoggle = false;
      this.init();
    },
    init() {
      getResourceJson({
        languagetype: this.languagetype,
        systemtype: "0"
      }).then(res => {
        if (res.data.success) {
          localStorage.setItem(
            "resourcelist",
            JSON.stringify(res.data.data[this.languagetype])
          ); //存放所有语言资源表
          this.$store.commit("RESOURCE_LIST", res.data.data[this.languagetype]);
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
      getSelectList({ languagetype: this.languagetype }).then(res => {
        if (res.data.success) {
          localStorage.setItem("selectlist", JSON.stringify(res.data)); //本地存放Select所有list
          this.$store.commit("SELECT_LIST", res.data);
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    userInfoInit() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.userInfo.agencyname.forEach(element => {
        this.agencyfullnameObj[element.type] = element.fullname;
        this.agencyshortnameObj[element.type] = element.shortname;
      });
      this.userInfo.rolename.forEach(element => {
        this.rolenameObj[element.type] = element.content;
      });
      this.rolenameObj = Object.assign({}, this.rolenameObj);
      this.agencyfullnameObj = Object.assign({}, this.agencyfullnameObj);
      this.agencyshortnameObj = Object.assign({}, this.agencyshortnameObj);
    },
    getBreadcrumb() {
      var breadNumber =
        typeof this.$route.meta.breadNumber != "undefined"
          ? this.$route.meta.breadNumber
          : 1; //面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1
          // console.log(breadNumber,'breadNumber')
      var breadLength = (breadLength = this.$store.state.navPathList?this.$store.state.navPathList.length:0); //目前breadlist集合数组个数
      var curName = this.$route.name;
      var curPath = this.$route.fullPath;
      var newBread = { name: curName, path: curPath };
      if (breadNumber === 0 || breadNumber === 1) {
        //点击首页或者一级
        this.$store.commit("NAV_PATH_LIST_REMOVE", 1); //初始化，只有首页面包屑按钮
        if (breadNumber === 1) {
          //点击一级菜单
          this.$store.commit("NAV_PATH_LIST_ADD", newBread); //当前页面添加到breadlist集合
        }
      } else {
        if (breadLength >= breadNumber) {
          //breadlist集合个数等于或者小于目前层级breadNumber
          this.$store.commit("NAV_PATH_LIST_REMOVE", parseInt(breadNumber)); //如果往回点面包屑导航，截取；
          this.$store.commit("NAV_PATH_LIST_ADD", newBread); //要把当前路由添加到breadlist集合
        } else {
          this.$store.commit("NAV_PATH_LIST_ADD", newBread); //要把当前路由添加到breadlist集合
        }
      }
      this.breadlist = this.$store.state.navPathList;
      localStorage.setItem("breadListStorage", JSON.stringify(this.breadlist));
    }
  },
  components: {
    "right-nav": resolve => require(["@/common/RightNav.vue"], resolve)
  },
  watch: {
    '$route' () {
      this.getBreadcrumb();
    }
  }
};
</script>
<style>
.change_password ,.account ,.bind_agency{
    width: 370px;
    background: rgba(255,255,255,1);
    border-radius: 2px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -185px;
    margin-top: -158px;
    z-index: 555;
}
.account{
  margin-top: -250px;
}
.userbox_pop{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: 444;
}


.await_quantity{
    display: inline-block;
    background: red;
    /* height: 15px; */
    line-height: 15px;
    /* width: 15px; */
    text-align: center;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    position: absolute;
    right: 20px;
    padding: 3px;
    top: 10px;
  }
.await_quantity_blue{
    display: inline-block;
    background: rgb(43, 214, 97);
    /* height: 15px; */
    line-height: 15px;
    /* width: 15px; */
    text-align: center;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    position: absolute;
    right: 20px;
    padding: 3px;
    top: 10px;
  }
  .await_square_blue{
    position: absolute;
    display: inline-block;
    background: rgb(43, 214, 97);
    /* height: 10px; */
    line-height: 10px;
    /* width: 10px; */
    text-align: center;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    /* position: relative; */
    top: 5px;
    padding: 3px;
  }
.await_square{
    margin-left: 15px;
    position: absolute;
    display: inline-block;
    background: red;
    /* height: 10px; */
    line-height: 10px;
    /* width: 10px; */
    text-align: center;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    /* position: relative; */
    top: 5px;
    padding: 3px;
  }
.userbox {
  border-bottom: 1px solid #ccc;
}
.lag {
  position: absolute;
  background: #fff !important;
  border: 1px solid #ccc;
  z-index: 10000;
  width: 170px;
  left: 15x;
}
/* .lag:hover{
  cursor:pointer;
  color: #4C4BD5;
} */
.lag > li {
  height: 35px;
  line-height: 35px;
  text-align: left;
  padding-left: 10px;
}
.lag > li:hover ,.languagename:hover {
  cursor:pointer;
  color: #4C4BD5;
}
.lag > li > img {
    height:20px;
    width: 20px;
    vertical-align:sub
}
.lag-t {
  position: relative;
}
.tac .fa {
  margin-right: 10px;
}
.center {
  text-align: center;
}
.wrapper {
  display: initial;
}
.router_right {
  position: absolute;
  right: 0px;
  z-index: 200;
  top:50px
}
.router_center {
  width: 100%;
  background: #ecf0f5;
  float: left;
  padding-bottom: 10000px;
  margin-bottom: -10000px;
}
.hidden_xs {
  position: relative;
}
.dropdown_menu {
  border: 1px solid #EEE;
  width: 160px;
  position: absolute;
  right: 5%;
  background: #fff;
  z-index: 10000;
  color: #000 !important;
  border-radius: 5px;
  border-top: 5px solid #4C4BD5;
}
.dropdown_menu:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #4C4BD5;
    content: "";
    position: absolute;
    width: 0;
    top: -10px;
    right: 20px;
}
.dropdown li{
  padding: 15px 0;
}
.dropdown li:nth-child(1){
  padding: 0;
}
.dropdown li:nth-child(1) p:nth-child(1){
    font-size: 14px;
    font-family: Helvetica-Bold;
    font-weight: bold;
    color: rgba(32,42,71,1);
    padding: 10px 0;
}
.dropdown li:nth-child(1) p:nth-child(2){
  font-size:12px;
  font-family:Helvetica;
  color:rgba(129,137,152,1);
}
.dropdown li:hover{
  background:rgba(242,246,255,1);
  cursor:pointer
}
.dropdown li>p{
  height: 15px;
  line-height: 15px;
  margin: 0 10px;
}
.dropdown li>p img{
  width: 18px;
  vertical-align: middle;
  padding: 0 5px 0 0;
}
.photo_box{
  width: 88px;
  height: 88px;
  border-radius:50%;
  overflow: hidden; 
}
.circle_box{
  width: 65%;
  text-align: center;
}
.photo_box>img{
  width: 100%;
  height: 100%;
}
.user_header {
  margin: 15px;
  line-height: 44px;
  padding: 10px 0;
}
.user{
  margin:0 15px;
  line-height: 44px;
  border-bottom: 1px solid #dcdcdc;  
}
.user_title{
  font-size:16px;
  /* font-family:SFUIDisplay-Bold; */
  font-weight:bold;
  color:rgba(32,42,71,1);
}
.user_header > img {
  z-index: 5;
  height: 90px;
  width: 90px;
  border: 3px solid;
  border-color: transparent;
  border-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-top: 20px;
}
.circle_firstname {
  font-size:22px;
  /* font-family:SFUIDisplay-Bold; */
  font-weight:bold;
  color:rgba(49,66,117,1);
}
.user_footer {
  background-color: #f9f9f9;
  height: 45px;
}
.pull_right  {
  margin: 15px ;
  background: rgba(76,75,213,1);
  width: 110px;
  height: 34px;
  text-align: center;
  color: #FFF;
  line-height: 34px;
  border-radius: 5px;
}
.user_footer > div > a {
  color: #666;
}
.user_footer > div:hover {
  border: 1px solid rgb(139, 138, 138);
  cursor: pointer;
}
.user-image {
  width: 20px;
  height: 20px;
  /* border-radius: 50%; */
  -webkit-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  vertical-align: sub;
}
.user_panel {
  overflow: hidden;
  position: relative;
  padding: 12px;
  box-shadow: 0px 0px 10px #fff;
  margin: 0 0 5px 0;
  /* background-color:#337ab7; */
}
.user_panel > div {
  float: left;
}
.image > img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  vertical-align: middle;
}
.info {
  padding: 5px 5px 5px 15px;
  line-height: 1;
  position: absolute;
  left: 55px;
  top: 20px;
  color: #fff;
  font-size: 20px;
}
.el-menu {
  border: none;
}
.el_menu_fontsize{
  font-size: 12px;
}
.el_menu_fontsize>img{
  width: 18px;
  height: 18px;
  padding: 0 15px 0 0;
}
.el_menu_fontsize_max>img{
  width: 22px;
  height: 22px;
  padding: 0 15px 0 0;
}
.sidebar_min img{
  width: 18px;
  height: 18px;
}
.sidebar {
  width: 230px;
  min-height: 1024px;
  background-color: #202A47;
  -webkit-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  display: inline-block;
  float: left;
  /* 给左右两边需要等高的元素一个很大的padding值 */
  padding-bottom: 10000px;
  /* 给左右两边需要等高的元素一个很大的-margin值*/
  margin-bottom: -10000px;
}
.sidebar_right {
  width: 280px;
  min-height: 1024px;
  background-color: #fff;
  -webkit-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  display: inline-block;
}
.sidebar_right_min {
  width: 0;
  min-height: 1024px;
  background-color: #FFF;
  -webkit-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  display: inline-block;
}
.sidebar_min {
  width: 64px;
  min-height: 1024px;
  background-color: #202A47;
  -webkit-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  float: left;
  display: inline-block;
  float: left;
  /* 给左右两边需要等高的元素一个很大的padding值 */
  padding-bottom: 10000px;
  /* 给左右两边需要等高的元素一个很大的-margin值*/
  margin-bottom: -10000px
}
.usinfomask{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,.3);
  z-index: 999;
}
li > .national {
  position: relative;
  display: inline-block;
  top: 4px;
}
.hidden-xs {
  position: relative;
  top: -4px;
  color: #fff;
}
.menu {
  /* float: left; */
}
.menu > li {
  float: left;
  padding:0 30px;
  /* padding-left: 15px;
  padding-right: 15px; */
  /* height: 16px;
  width: 16px; */
}

.menu > li >img , .menu_span>img{
  height: 20px;
  width: 20px;
  vertical-align: middle;
}
.menu > li:nth-last-child(1)>img{
  height: 24px;
  width: 24px;
  vertical-align: middle;
}
.sr-only {
  color: #fff;
  /* margin-left: 20px; */
}
.main-header .logo .logo-lg {
  display: inline-block;
  padding:3px;
  color: #fff;
  height: 44px;
}
.main-header{
  position: relative;
}
.main-header::before{
  /* content: ''; 
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1PX;
  background-color: #dcdcdc */
}
.logo {
  background-color: #FFF;
  color: #fff;
  height: 49px;
  /* border-bottom: 0 solid transparent; */
  -webkit-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  display: block;
  float: left;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  width: 230px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 300;
  overflow: hidden;
}
.logo_min {
  background-color: #FFF;
  color: #fff;
  height: 43px;
  padding: 3px;
  /* border-bottom: 0 solid transparent; */
  -webkit-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  display: block;
  float: left;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  width: 64px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 300;
  overflow: hidden;
}
.navbar {
  border: 1px solid rgba(241,243,244,1);
  background-color: #FFF; 
  line-height: 50px;
  width: 100%;
}
.logout:hover{
  cursor:pointer;
}
.delete_icon{
  position: absolute;
  height: 17px;
  width: 17px;
  right: 10px;
  top: 10px;
  z-index: 1;
}
.userInfo_name{
vertical-align:-1px;
}
.userInfo_name:hover{
  cursor:pointer
}
/* @media (max-width: 769px) {
  .user-image {
    height: 25px;
    width: 25px;
    -webkit-transition: 0.3s ease-in-out;
    -o-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }
  .hidden-xs {
    display: none;
  }
  .logo {
    width: 100%;
    float: none;
  }
  .logo_min {
    float: none;
    width: 100%;
  }
  .menu > li {
    padding-left: 0px;
  }

  .sidebar {
    width: 230px;
    min-height: 1024px;
    background-color: #222d32;
    -webkit-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    overflow: hidden;
    display: inline-block;
    float: left;
  }
  .sidebar_min {
    width: 0px;
    min-height: 1024px;
    background-color: #222d32;
    -webkit-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    overflow: hidden;
    display: inline-block;
    float: left;
  } 
}*/
.wrap{
  overflow: hidden;
}
.function_block {
  margin:10px 15px 0 15px;
}
.function_block>.title {
  padding: 10px 0 5px 0;
  font-size: 12px;
  font-weight: bold;
  color: yellow;
  font-size: 14px;
  /* font-family: SFUIDisplay-Bold; */
  font-weight: bold;
  color: rgba(32,42,71,1);
}
.function_block>.sub_title {
  font-size: 12px;
  padding:10px 0 10px 0;
  color:rgba(85,91,103,1);
}
.bg_button{
  background:rgba(76,75,213,1);
  border-radius:3px;
  color: #FFF;
}

</style>
