<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header">
      <div class="title">
        <span style="vertical-align: super;">{{rs.project_detail}}</span>
      </div>
       <div class="tools">
       <el-button   class="bg_save_btn"  v-if="!readonly" @click="handleProjectEdit"  size="small">{{rs.edit}}</el-button>
      </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row  class="content-box">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" class="contnet-left">
           <el-carousel trigger="click" height="526px" style="overflow: hidden;text-align:center">
             <el-carousel-item v-if="projectInfo.picturelist.length== 0">
              <img v-if="projectInfo.category == '03'" src="../../assets/imgs/c_commercial.png">
              <img v-else-if="projectInfo.category == '02'" src="../../assets/imgs/c_house.png">
              <img v-else src="../../assets/imgs/c_unit.png"  />
            </el-carousel-item>
            <el-carousel-item v-for="(item,index) in projectInfo.picturelist" :key="index" v-else>
              <img
              style="height: 100%;"
              :src="item.filepath+'?x-oss-process=image/resize,m_pad,h_630,m_lfit'" />
              <!-- <img style="height:100%" :src="item.filepath+'?x-oss-process=image/resize,m_fixed,h_526,w_820'" alt=""> -->
            </el-carousel-item>
          </el-carousel>

        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="content-right" v-if="isShowLeft">
           <div class="minor-box">
            <p class="title">{{projectInfo.fullname}}</p>
            <p class="minor-text">{{setAddress(projectInfo)}}</p>
          </div>
          <el-row class="right-item">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.show_to_agents}}:</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">
              <el-switch
                v-model="projectInfo.isshowtoagents"
                @change="handleShowToAgentsChang"
                active-color="#4C4BD5"
                :active-text="rs.yes"
                :inactive-text="rs.no"
                active-value="1"
                inactive-value="0"
                inactive-color="#D7DAE2">
              </el-switch>
            </el-col>
          </el-row>
          <el-row class="right-item">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.set_as_featured}}:</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">
              <el-switch
                v-model="projectInfo.isfeatured"
                @change="handleFeaturedChang"
                active-color="#4C4BD5"
                :active-text="rs.yes"
                :inactive-text="rs.no"
                active-value="1"
                inactive-value="0"
                inactive-color="#D7DAE2">
              </el-switch>
            </el-col>
          </el-row>
          <el-row class="right-item">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.price_range}}:</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{"$"+ setNumber(projectInfo.minprice)}}&nbsp;-&nbsp;{{"$"+ setNumber(projectInfo.maxprice)}}</el-col>
          </el-row>
          <el-row class="right-item">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.vendor}}:</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{projectInfo.vendorname}}</el-col>
          </el-row>
          <el-row class="right-item">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.vendor_solicitor}}:</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{projectInfo.firstname}}&nbsp;{{projectInfo.lastname}}</el-col>
          </el-row>
          <el-row class="right-item">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.builder}}:</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content"> {{projectInfo.buildername}}</el-col>
          </el-row>
          <el-row class="right-item">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.category}}:</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content"> {{categoryObj[projectInfo.category]}}</el-col>
          </el-row>
          <el-row class="right-item">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.estimated_completion}}:</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content"> {{projectInfo.estimatedcompletion?setformatDate(projectInfo.estimatedcompletion):'-'}}</el-col>
          </el-row>
          <div class="right_btn">
            <span :class="isShowLeft?'active_btn':''" @click="handleSetLeft"><i class="el-icon-arrow-left"></i></span>
            <span :class="isShowRight?'active_btn':''" @click="handleSetRight"><i class="el-icon-arrow-right"></i></span>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="content-right" v-if="isShowRight">
           <div class="minor-box">
            <p class="title">{{projectInfo.fullname}}</p>
            <p class="minor-text">{{setAddress(projectInfo)}}</p>
          </div>
          <el-row class="right-item" v-if="projectInfo.agencyprojectcontact.length==0">
           <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" class="title">{{rs.contact_person}}:</el-col>
           <el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="15" class="content">{{rs.no_data}}</el-col>
          </el-row>
           <el-row class="right-item" v-for="(d,index) in projectInfo.agencyprojectcontact" :key="index" v-if="index<3">
            <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" class="title">{{index == 0?rs.contact_person+':':'-'}}</el-col>
            <el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="15" class="content">
              <p>
                <span>{{d.firstname}}</span>
                <span class="nbsp"></span>
                <span>{{d.lastname}}</span>
                <span v-if="d.level==1" class="bg_red tag">{{rs.general_contact}}</span>
                <span v-if="d.level==2" class="bg_orange tag">{{rs.key_contact}}</span>
                <span v-if="d.level==3" class="bg_blue tag">{{rs.oversea_contact}}</span>
              </p>
              <p>{{d.email}}</p>
              <p>{{d.mobilenumber}}</p>
              <span class="btntext" @click="delList(d)" v-if="!readonly">{{rs.delete}}</span>
            </el-col>
          </el-row>
          <!-- <el-row class="right-item" v-for="(d,index) in projectInfo.agencyprojectcontact" :key="index" v-if="d.level==4">
            <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" class="title">{{index == 0?rs.contact_person+':':'-'}}</el-col>
            <el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="15" class="content">
              <p>
                <span>{{d.firstname}}</span>
                  <span class="nbsp"></span>
                  <span>{{d.lastname}}</span>
                  <span v-if="d.level==4" class="bg_pink tag">{{rs.our_company_contact}}</span>
              </p>
              <p>{{d.email}}</p>
              <p>{{d.mobilenumber}}</p>
              <span class="btntext" @click="delList(d)" v-if="!readonly">{{rs.delete}}</span>
            </el-col>
          </el-row> -->
          <!-- <el-button class="bg_save_btn" style="width:80%;margin-left:10%;margin-top:15px" v-if="ourCompanyContactShow" @click="popShow"  size="small">{{rs.add_our_contact}}</el-button> -->
          <el-button   class="bg_save_btn" style="width:80%;margin-left:10%;margin-top:15px" @click="popShow"  size="small">{{rs.add_our_contact}}</el-button>
          <div class="right_btn">
            <span :class="isShowLeft?'active_btn':''" @click="handleSetLeft"><i class="el-icon-arrow-left"></i></span>
            <span :class="isShowRight?'active_btn':''" @click="handleSetRight"><i class="el-icon-arrow-right"></i></span>
          </div>
        </el-col>
      </el-row>
      <!-- 第二部分 -->
      <el-row :gutter="30" class="content-box">
         <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content-middle">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/description@2x.png" alt=""><span>{{rs.short_description}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                <p class="minor-text" v-html="projectInfo.shortdescription"></p>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" class="box" style="margin-top:20px">
            <el-collapse-item name="2">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/description@2x.png" alt=""><span>{{rs.description}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body clearfix">
                   <p class="minor-text" v-html="projectInfo.description"></p>
                </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content-middle">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="3">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/office@2x.png" alt=""><span>{{rs.how_to_sell}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                <p class="minor-text" v-html="projectInfo.howtosale"></p>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" class="box" style="margin-top:20px">
            <el-collapse-item name="4">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/office@2x.png" alt=""><span>{{rs.office_use}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                <p class="minor-text" v-html="projectInfo.officeuse"></p>
              </div>
            </el-collapse-item>
          </el-collapse>
           <el-collapse v-model="activeNames" class="box" style="margin-top:20px">
            <el-collapse-item name="5">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/attachment@2x.png" alt=""><span>{{rs.attachment}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                <ul>
                  <li v-for="item in projectInfo.attachmentlist" class="minor-attachment">
                    <el-row>
                      <el-col :span="6"  class="title">{{AttachmentObj[item.attachmenttype]}}</el-col>
                      <el-col :span="18"> <a :href="item.filepath" target="_blank" >{{item.displayname}}</a></el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row class="content-box">
        <el-col :span="24" class="content-middle">
          <el-collapse v-model="activeNames" class="box" style="margin-top:20px">
            <el-collapse-item name="6">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../assets/imgs/map@2x.png" alt=""><span>{{rs.map}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                <bing-map-layer
                :singleAddress="singleaddress"
                :isCoordinate="true"
                @getLocationNums="getLocationNums"
                :onInitSuccess="setmap"
                :isClickable='false'
                style="height:320px;width:100%;margin:10px 10px 5px 0;">
              </bing-map-layer>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
    <div class="wrapper-header">
      <div class="title">
        <span style="vertical-align: super;">{{rs.properties}}&nbsp;-&nbsp;{{projectInfo.fullname}}</span>
        <!-- <span style="vertical-align: super;color:#4C4BD5">[{{rs.edit}}]</span> -->
      </div>
       <div class="tools">
       <el-button   class="bg_save_btn"  v-if="!readonly" @click="excelDownLoad" size="small">{{rs.pricelist_upper}}(.xls)</el-button>
       <el-button   class="bg_save_btn"  v-if="!readonly" @click="downLoadPdf" size="small">{{rs.pricelist_upper}}(.pdf)</el-button>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix ">
        <el-row>
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <div class="filter-count filter-padding">
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
            <div class="filter-search filter-padding">
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
          <div class="box" style="margin-top:20px">
            <div class="box-body" style="padding-top:5px">
              <div class="table_box">
                 <div class="box-header">
                  <div class="title">
                    <img src="../../assets/imgs/price_update@2x.png" alt="">
                    <span>{{rs.pricelist_upper}}</span><span style="margin-left:0" v-if="projectInfo.pricelistupdateddate">&nbsp;({{rs.updated_date_upper}}: {{setDate(projectInfo.pricelistupdateddate)}})</span>
                  </div>
                </div>
                <el-table :data="propertyList" :empty-text="rs.no_data" style="width: 100%;"
                  :show-overflow-tooltip="true" size="mini" :row-class-name="tableRowClassName"
                  :default-sort = "{prop: 'lotnumber', order: 'ascending'}"
                 >
                  <el-table-column prop="lotnumber"  sortable :label="rs.lot" min-width="75">
                  </el-table-column>
                  <el-table-column prop="unitnumber" sortable :label="rs.unit" min-width="78">
                  </el-table-column>
                  <el-table-column prop="bedroomqty" sortable label="fa fa-bed" align="center" min-width="60" :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column prop="bathroomqty" sortable label="fa fa-bath" align="center" min-width="60" :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column prop="studymediaqty" sortable label="fa fa-book" align="center" min-width="60" :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column prop="carspaceqty" sortable label="fa fa-car" align="center" min-width="60" :render-header="renderHeader">
                  </el-table-column>
                  <el-table-column prop="internalarea" sortable :label="rs.internal" min-width="95">
                  </el-table-column>
                  <el-table-column prop="externalarea" sortable :label="category == '02'?rs.land:rs.external" min-width="110">
                  </el-table-column>
                  <el-table-column prop="aspect" :label="rs.aspect"  min-width="85" sortable>
                    <template slot-scope="scope">
                      {{AspectObj[scope.row.aspect]}}
                    </template>
                  </el-table-column>
                  <el-table-column  :label="rs.floor_plans" width="90">
                    <template slot-scope="scope">
                      <!-- {{scope.row.attachmentlist03}} -->
                      <p v-for="(d,index) in scope.row.attachmentlist03" :key="index"  v-if="!index">
                        <a :href="d.filepath" target="_blank" style="padding-left:2px;color:#4C4BD5;font-size:14px"><img style="width:18px;height:18px;vertical-align: -14%;" src="../../assets/imgs/downloadFloor@2x.png" alt=""></a>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" :label="rs.price"  min-width="140" sortable>
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
                  <el-table-column  :label="rs.action" min-width="200">
                    <template slot-scope="scope">
                      <span class="btntext" v-if="projectInfo.isfulledit=='1'&&!readonly" 
                        @click="handleEdit(scope.row)">{{rs.edit}}</span>
                      <span class="btntext" v-else @click="handleShow(scope.row)">{{rs.detail}}</span>
                      <el-tooltip :content="rs.other_sold" placement="top" effect="light"
                            v-if="!readonly && scope.row.holdingflag=='0' && scope.row.salevisible=='0'">
                            <span class="btntext_disable" style="padding: 0 10px;">
                                    {{rs.sales}}
                            </span>
                      </el-tooltip>
                      <span class="btntext" @click="goReserve('/project_manage/saleAdvice',scope.row)" 
                            v-if="!readonly && scope.row.holdingflag=='0' && scope.row.salevisible=='1'">
                            {{!scope.row.salestatus?rs.reserve:rs.sales}}</span>
                      <span class="btntext" @click="handleSetHoldingflag(scope.row)"
                        v-if="!readonly && projectInfo.isrunning=='1' && projectInfo.isfulledit=='1'">
                            {{scope.row.holdingflag=='1'?rs.open:rs.hold}}</span>
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
    <el-dialog
    :close-on-click-modal='false'
      :title="rs.key_contacts"
      :visible.sync="dialogVisible"
      width="70%"
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.select_contact}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row>
          <div class="filter-search fr" style="width:50%" >
            <form autocomplete="on">
              <el-input @change="findChange" :placeholder="rs.search_agents" v-model="search_contact" class="input-key" clearable size='mini'>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </form>  
          </div>
        </el-row>
        <el-row>
          <el-table
            :data="contactAgentList"
            style="width: 100%"
            :empty-text = rs.no_data
            :show-overflow-tooltip="true"
            size="mini">
            <el-table-column
              prop="firstname"
              :label="rs.agent_name">
            <template slot-scope="scope">
              <span>{{scope.row.firstname}}</span>
              <span class="nbsp"></span>
              <span>{{scope.row.lastname}}</span>
            </template>
            </el-table-column>
            <el-table-column
              prop="email"
              :label="rs.email">
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
              :label="rs.action"
              width="450">
              <template slot-scope="scope">
                <span v-if="!readonly">
                  <span class="btntext" @click="insertData(scope.row,'1')">{{rs.general_contact}}</span>
                  <span class="btntext" @click="insertData(scope.row,'2')" v-if="!general_contactShow">{{rs.key_contact}}</span>
                  <span class="btntext" @click="insertData(scope.row,'3')">{{rs.oversea_contact}}</span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row class="dailog-footer" style="margin-top:5px"  v-if="contact_total">
        <div>
          <el-pagination
          @current-change="handleCurrentChangeContact"
          :current-page.sync="contactPageNumber"
          :page-size="contactPageSize"
          layout="prev, pager, next"
          :total="contact_total"
          class="fr">
          </el-pagination>
        </div>
      </el-row>
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
import Vue from 'vue'
import { mapGetters } from "vuex";
import { getHomeProject, getPropertyList, getProjectCategory, updateAgencyproject, 
        PdfProperty, insertAgencyProjectContact, deltadeAgencyProjectContact, updateHoldingflag} from '@/api/projectApi.js'
import { toAddressString } from "@/assets/js/utility.js"
import axios from "axios";
import { getAgentList } from '@/api/agentApi.js'
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { validator, allvalidator } from '@/validator/validator.js'

export default{
  data() {
    return {
      // 新增本公司联系人
      dialogVisible:false,
      contactAgentList:[],
      contactPageSize:10,
      contactPageNumber:1,
      contact_total:0,
      search_contact:'',
      // ourCompanyContactShow:false,
      // 
      isSetMap:false,
      projectId:"",
      singleaddress:{},//地图地址
      mod:false,
      category:'01',
      activeNames:['1','2','3','4','5','6'], //折叠面板
      propertyList:[],
      categoryObj:{},
      total: 0, //总条数
      start: 1, //起始页
      end: 10, //结束页
      AspectObj:{},
      isShowLeft: true,
      isShowRight: false,
      AttachmentObj:{},
      general_contactShow : false,
      holdDailog:false,
      holdParam: {
        propertyid:'',
        holdingflag:'',
        holdreason:'',
        projectid:''
      },
      getData: {
        languagetype: "01",
        pagenum: 1,
        pagesize: 3,
        condition: "",
        projectid: "",
        available:'1'
      },
      projectInfo:{
      },
      validatorSave:{
        holdreason:{
          vaid:['noNull'],
          flg:false
        }
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'bing-map-layer':resolve=> require(['@/common/BingMapLayer.vue'],resolve),
    "page-size": resolve => require(["@/common/PageSize.vue"], resolve),
  },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.holdParam,key)
    },
    //页码变化事件
    handleCurrentChangeContact(val){
      let pageSiziData = {
        pagesize:this.contactPageSize,
        pagenum:val,
        condition:this.search_contact,
        isactived:'1'
      }
      this.allList(pageSiziData)
    },
    //查找
    findChange(){
      this.pagesize = 1
      let findData = {
        condition:this.search_contact,
        pagesize:this.contactPageSize,
        pagenum:this.contactPageNumber,
        isactived:'1'
      }
      this.allList(findData)
    },
     popShow(){
      this.dialogVisible = !this.dialogVisible;
      //点击弹出窗，获取列表
      let data = {
        condition:this.search_contact,
        pagesize:this.contactPageSize,
        pagenum:this.contactPageNumber,
        isactived:'1'
      }
      this.allList(data)
    },
    isGeneral(){
      this.general_contactShow = false
      for(var i=0;i<this.contactAgentList.length;i++){
        if(this.contactAgentList[i].level==2){
          this.general_contactShow = true
          return
        }else{
          this.general_contactShow = false
        }
      }
    },
    //所有弹出窗，获取列表
    allList(data){
      getAgentList(data).then(res=>{
        if (res.data.success) {
          this.contact_total = res.data.total;
          this.contactAgentList = res.data.data;

          this.isGeneral();
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //添加联系人
    addList(row,id){
      this.dialogVisible = false
      if (this.tableData4.length>0) {
        for(var i=0;i<this.tableData4.length;i++){
          if (this.tableData4[i].email == row.email) {
            this.$message.success(this.rs.info_msg_linkman)
            return
          }
        }
        this.insertData(row,id)
        return
      }else{
        this.insertData(row,id)
      }
    },
    setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy')
      }else{
        return '-'
      }
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
    insertData(row,id){
      let insert = {
        agentid : row.agentid,
        level : id,
        agencyprojectid : JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        }
      insertAgencyProjectContact(insert).then(res=>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_insert_success);
          this.dialogVisible = false;
          let Data = {
            agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
            projectid:this.$router.currentRoute.params.id,
            languagetype:localStorage.getItem("languagetype")
          }
          this.getProjectInfo(Data)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //删除联系人
    delList(row){
      this.$confirm(this.rs.info_msg_delete_contacts, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        let dslData = {
        ids:row.agencyprojectcontactid
      }
      deltadeAgencyProjectContact(dslData).then(res=>{
          if (res.data.success) {
          this.$message({
              type: 'success',
              message: this.rs.info_msg_delete_success
            });
          let Data = {agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,projectid:this.$router.currentRoute.params.id,languagetype:localStorage.getItem("languagetype")}
          this.getProjectInfo(Data)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      });

    },
    goRouter(path){
      this.$router.push({path})
    },
    handleSetRight(){
      this.isShowRight = true;
      this.isShowLeft = false;
    },
    handleSetLeft(){
      this.isShowRight = false;
      this.isShowLeft =  true;
    },
    goReserve(path,row){
      this.goRouter(path);
      sessionStorage.setItem('isFalg',
        JSON.stringify({
            propertyid:row.propertyid,
            type:'all_properties',
            agencyprojectid:row.agencyprojectid,
            saleid:row.saleid,
            isChannel:0}))
    },
    handleProjectEdit(){
      let path = '/project_manage/editProject/'+ this.projectId;
      sessionStorage.setItem('isFullEdit',this.projectInfo.isfulledit);
      sessionStorage.setItem('shareable',this.projectInfo.shareable);
      sessionStorage.setItem('isrunning',this.projectInfo.isrunning);
      this.goRouter(path);
    },
    handleFeaturedChang(){
      updateAgencyproject({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,isfeatured:this.projectInfo.isfeatured}).then(res =>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_update_success);
          this.getProjectInfo({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,projectid:this.projectId,languagetype:this.languagetype});
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    handleShowToAgentsChang(){
      updateAgencyproject({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,isshowtoagents:this.projectInfo.isshowtoagents}).then(res =>{
        if (res.data.success) {
          this.$message.success(this.rs.info_msg_update_success);
          this.getProjectInfo({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,projectid:this.projectId,languagetype:this.languagetype});
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      })
    },
    
    handleEdit(data) {
      sessionStorage.removeItem("propertyid");
      sessionStorage.setItem('isrunning', data.isrunning);
      this.$router.push({
        path: "/project_manage/projectDetail/propertyDetail/update",
        query: { id: data.propertyid, projectid: this.getData.projectid }
      });
    },
    handleShow(data) {
      sessionStorage.removeItem("propertyid");
      this.$router.push({
        path: "/project_manage/projectDetail/propertyView/show",
        query: { id: data.propertyid, projectid: this.getData.projectid }
      });
    },
    getProjectInfo (data){
      getHomeProject(data).then(res=>{
        if(res.data.success){
          this.projectInfo = res.data.projectdata;
          // let falg = 0;
          // this.projectInfo.agencyprojectcontact.forEach(ele=>{
          //   if(ele.level == '4'){
          //     falg ++;
          //   }
          // })
          // if(falg>=2){
          //   this.ourCompanyContactShow = false;
          // }else{
          //   if(this.projectInfo.isshared !='1'){
          //     this.ourCompanyContactShow = false;
          //   }else{
          //     this.ourCompanyContactShow = true;
          //   }
          // }
          if(this.isSetMap){
            this.setmap();
          }
        }
      })
    },
    setNumber(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
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
     // 地图
    getLocationNums (...data) {
      this.position = data[0];
    },
    setAddress(d){
      return toAddressString(d,true)
    },
    setmap(){
      this.isSetMap = true;
      console.log({ code:'001', longitude:this.projectInfo.longitude,latitude:this.projectInfo.latitude,category: '01'},'99')
      this.singleaddress = { code:'001', longitude:this.projectInfo.longitude,latitude:this.projectInfo.latitude,category: '01'}
    },
    // 下载pdf
    // downLoadPdf
    downLoadPdf() {
      PdfProperty({projectid:this.projectId,languagetype:this.languagetype}).then(res=>{
        if(res.data.success){
          window.location.href = res.data.pdf;
        }
      })
    },
    // 下载xls
    excelDownLoad() {
      window.location.href =
        axios.defaults.baseURL +
        "property/ExcelProperty?languagetype=" +
        this.languagetype +
        "&projectid=" +
        this.projectId;
    },
     // 获取房源列表
    getProperty(data) {
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
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    renderHeader(createElement, { column, _self }) {
      let className = column.label;
      return createElement("i", { class: className });
    },
     getCategory(id){
      getProjectCategory({projectid:id}).then(res=>{
        if(res.data.success){
          this.category = res.data.category;
        }
      })
    },
    tableRowClassName(scope,rowIndex){
      if(scope.row.holdingflag == '1'){
        return 'bg_ccc'
      }else{
        return ''
      }
    },
    goMoreRouter(path,data){
        this.$router.push({
            path:path,
            query: {
                ifmore: data
            }
        })
    },
    setDate(date){
      if(!date){
        return ''
      }
      let time = date.substring(0,19);    
      time = time.replace(/-/g,'/'); 
      let now = new Date(time);
      let str = '';
      let dateStr = now.toDateString();
        var y = now.getFullYear();
        var m = now.getMonth() +1;
        var d = now.getDate();
        m = m<10?'0'+m:m;
        d = d<10?0 +d:d;
        var xy = d+'/'+m+'/'+y;
        return xy;
    },
  },
  created(){
    
    this.projectId = this.$router.currentRoute.params.id;
    this.getData.projectid = this.$router.currentRoute.params.id;
    this.getCategory(this.$router.currentRoute.params.id);
    this.getProjectInfo({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,projectid:this.$router.currentRoute.params.id,languagetype:localStorage.getItem("languagetype")});
    // 获取语言资源表数据
    this.getData.languagetype = localStorage.getItem("languagetype");
    JSON.parse(localStorage.getItem("selectlist")).PROPERTY_ASPECT_LIST.forEach(element => {
        this.AspectObj[element.code] = element.value;
      }
    );
    JSON.parse(localStorage.getItem('selectlist')).ATTACHMENT_TYPE_LIST.forEach(element => {
      this.AttachmentObj[element.code] = element.value;
    })
    JSON.parse(localStorage.getItem('selectlist')).PROJECT_CATEGORY_LIST.forEach(val => {
      this.categoryObj[val.code] = val.value
    });
    this.categoryObj = Object.assign({}, this.categoryObj)
    this.AspectObj = Object.assign({}, this.AspectObj);
    this.AttachmentObj = Object.assign({}, this.AttachmentObj);
    this.getData.pagesize = 100;
    // this.getData.pagesize = JSON.parse(
    //   localStorage.getItem("selectlist")
    // ).DATA_COUNT_LIST[0].intvalue;
    this.getProperty(this.getData);
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.project_detail ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getProperty(this.getData);
      this.getProjectInfo({agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,projectid:this.projectId,languagetype:val});
    },
    se(val){
       JSON.parse(localStorage.getItem('selectlist')).PROPERTY_ASPECT_LIST.forEach(element => {
        this.AspectObj[element.code] =element.value;
      });
    }
  },
}
</script>
<style scoped lang="scss">
.wrapper-condition {
  padding: 0 20px;
  .filter-padding{
    padding-top: 20px
  }
}
.wrapper-content{
  padding-top: 0;
  .content-box.el-row {
    margin-top:16px;
    // background: #FFF;
    // border: 1px solid #E4E4E4;
    .contnet-left {
      .minor-box{
        .title{
          line-height: 16px;
          font-size: 14px;
          color: #314275;
          font-weight: bold;
          // font-family:SFUIDisplay-Bold;
        }
        .minor-text {
          color: #818998;
          padding-top:4px;
        }
      }
    }
    .content-right{
      background: #FFF;
      padding: 20px 30px;
      height: 526px;
      position: relative;
      .minor-box{
        padding:20px 0;
        .title{
          line-height: 18px;
          font-size: 18px;
          color: #314275;
          font-weight: bold;
          // font-family:SFUIDisplay-Bold;
        }
        .minor-text {
          color: #818998;
          font-size: 12px;
          padding-top:10px;
        }
      }
      .right_btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 30px;
        font-size: 20px;
        text-align: right;
        span{
          width: 28px;
          height: 28px;
          display: inline-block;
          color:#4C4BD5;
          border: 1px solid #4C4BD5;
          margin-left: 10px;
          line-height: 28px;
          text-align: center;
        }
        .active_btn{
          color: #FFF;
          border: 1px solid #4C4BD5;
          background: #4C4BD5;
        }
      }
      .right-item.el-row {
        border-bottom: 1px solid #E4E4E4;
        padding: 12px 0;
        .title {
          color: #555B67;
          font-size: 14px;
          font-weight: bold;
          // font-family:SFUIDisplay-Bold;
          line-height: 20px;
        }
        .content {
          color: #555B67;
          font-size: 14px;
          line-height: 20px;
          p {
            padding: 3px 0;
          }
        }
      }
    }
    .content-middle {
      // padding: 20px 0;
      .minor-box{
        padding-top: 20px;
        >img{
          width: 24px;
          height: 24px;
        }
        .minor-text{
          padding: 8px 0;
        }
        .title{
          font-size: 16px;
          color: #314275;
          font-weight: Bold;
          // font-family:SFUIDisplay-Bold;
          display: inline;
          vertical-align: 50%;
          padding-left: 15px;
        }
        .minor-attachment {
          height: 16px;
          line-height: 16px;
          margin-top: 12px;
          border-left: 2px solid #555B67;
          .title{
            color: #555B67;
            padding-left: 16px;
            font-size: 14px;
            font-weight: bold;
            // font-family:SFUIDisplay-Bold;
          }
          a {
            color: #4C4BD5;
            font-size:14px; 
          }
        }
      }
      
    }
  }
}
  
  /* 轮播 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

   .el-carousel__item:nth-child(2n) {
    background-color: #38384B;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #38384B;
  }
</style>
