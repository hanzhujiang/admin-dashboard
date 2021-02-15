<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
       <div class="title">
        <span >{{rs.agency_detail}}</span>
        <span class="sub_text" v-if="isUpdate==undefined?false:true" v-show="!readonly">[{{isUpdate?rs.add:rs.edit}}]</span>
      </div>
      <div class="tools">
        <el-button class="bg_save_btn"   v-if="!readonly"  @click="handleSave" size="small">{{rs.edit}}</el-button>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-content clearfix">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
            <el-collapse v-model="activeNames" class="box">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="box-header-with-collapse clearfix">
                    <div class="title">
                      <img src="../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.base_information}}</span>
                    </div>
                  </div>
                </template>
                <div class="box-body clearfix">
                  <el-row :gutter="20" class="">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.full_name}}</div>
                            <div class="content">
                              {{formData.fullnameShow}}
                              <!-- <el-input maxlength="100" v-model="formData.fullnameShow" :disabled="readonly"  size="small"  @blur="validatorBlur('fullnameShow')">
                                <el-button slot="append" @click="fullnameShow=true" v-if="!readonly"><i class="fa fa-globe" style="color:#3c8dbc"></i></el-button>
                              </el-input>
                              <p class="curtail" v-show="validatorSave.fullnameShow.flg">{{rs[validatorSave.fullnameShow.msg]}}</p> -->
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.short_name}}</div>
                            <div class="content">
                              {{formData.shortnameShow}}
                              <!-- <el-input maxlength="30" v-model="formData.shortnameShow" size="small" :disabled="readonly"  @blur="validatorBlur('shortnameShow')">
                                <el-button slot="append" @click="shortnameShow=true" v-if="!readonly"><i class="fa fa-globe" style="color:#3c8dbc"></i></el-button>
                              </el-input>
                              <p class="curtail" v-show="validatorSave.shortnameShow.flg">{{rs[validatorSave.shortnameShow.msg]}}</p> -->
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title-first">{{rs.principal}}</div>
                            <div class="content">
                              {{formData.principal}}
                              <!-- <el-input v-model="formData.principal" maxlength="50"  size="small" clearable :disabled="readonly"></el-input> -->
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.corporate_license}}</div>
                            <div class="content">
                              {{formData.corporatelicense}}
                              <!-- <el-input maxlength="10" v-model="formData.corporatelicense" size="small" clearable :disabled="readonly"></el-input> -->
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.abn}}</div>
                            <div class="content">
                              {{formData.abn}}
                              <!-- <el-input maxlength="15" v-model="formData.abn" size="small" clearable :disabled="readonly"></el-input> -->
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.email}}</div>
                            <div class="content">
                              {{formData.email}}
                              <!-- <el-input maxlength="100" :disabled="readonly" v-model="formData.email" size="small" clearable @blur="validatorBlur('email')"></el-input>
                              <p class="curtail" v-show="validatorSave.email.flg">{{rs[validatorSave.email.msg]}}</p> -->
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.website}}</div>
                            <div class="content">
                              {{formData.website}}
                              <!-- <el-input maxlength="100" v-model="formData.website" size="small" clearable @blur="validatorBlur('website')" :disabled="readonly"></el-input>
                              <p class="curtail" v-show="validatorSave.website.flg">{{rs[validatorSave.website.msg]}}</p> -->
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.contact_person}}</div>
                            <div class="content">
                              {{formData.contactperson}}
                              <!-- <el-input maxlength="50" v-model="formData.contactperson" size="small" clearable :disabled="readonly"></el-input> -->
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.office_telephone}}</div>
                            <div class="content">
                              {{formData.officetelephone}}
                              <!-- <el-input maxlength="20" v-model="formData.officetelephone" size="small" clearable  :disabled="readonly" @blur="validatorBlur('officetelephone')"></el-input>
                              <p class="curtail" v-show="validatorSave.officetelephone.flg">{{rs[validatorSave.officetelephone.msg]}}</p> -->
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                      </el-row>
                      <el-row :gutter="20">
                        
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.office_fax}}</div>
                            <div class="content">
                              {{formData.officefax}}
                              <!-- <el-input maxlength="20" v-model="formData.officefax" :disabled="readonly" size="small" clearable @blur="validatorBlur('officefax')"></el-input>
                              <p class="curtail" v-show="validatorSave.officefax.flg">{{rs[validatorSave.officefax.msg]}}</p> -->
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.contact_number}}</div>
                            <div class="content">
                              {{formData.contactnumber}}
                              <!-- <el-input maxlength="20" v-model="formData.contactnumber" size="small" clearable @blur="validatorBlur('contactnumber')" :disabled="readonly"></el-input>
                              <p class="curtail" v-show="validatorSave.contactnumber.flg">{{rs[validatorSave.contactnumber.msg]}}</p> -->
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                          <div class="form-group">
                            <div class="sub-title">{{rs.commission_level_number}}</div>
                            <div class="content">
                              {{levelObj[formData.commissionlevelnumber]}}
                              <!-- <el-select v-model="formData.commissionlevelnumber" slot="prepend" size="small" :disabled="true" placeholder="">
                                <el-option :label="d.extvalue" :value="d.code" v-for="(d,i) in levelList" :key="i"></el-option>
                              </el-select>
                              <p class="curtail" v-show="validatorSave.commissionlevelnumber.flg">{{rs[validatorSave.commissionlevelnumber.msg]}}</p> -->
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
                          <div class="form-group">
                            <div class="sub-title">{{rs.set_as_active}}</div>
                            <div class="content">
                              {{formData.isactived == '1'?rs.yes:rs.no}}
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <div class="border_bott"></div>
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                          <div class="form-group">
                            <div class="sub-title">{{rs.light_logo}}</div>
                            <div class="content logimg bg_log">
                              <img v-if="formData.logoimagelight" :src="formData.logoimagelight"  class="avatar">
                             
                            </div>
                            <!-- <span style="font-size:12px;color:#818998">(*Recommended size: 160 x 40 pixels)</span> -->
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                          <div class="form-group">
                            <div class="sub-title">{{rs.dark_logo}}</div>
                            <div class="content logimg">
                              <img v-if="formData.logoimagedark" :src="formData.logoimagedark"   class="avatar">
                              
                            </div>
                            <!-- <span style="font-size:12px;color:#818998">(*Recommended size: 160 x 40 pixels)</span> -->
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                          <div class="form-group">
                            <div class="sub-title">{{rs.small_light_logo}}</div>
                            <div class="content logimg bg_log">
                              <img v-if="formData.logoimagemini" :src="formData.logoimagemini"  class="avatar">
                              
                            </div>
                            <!-- <span style="font-size:12px;color:#818998">(*Recommended size: 40 x 40 pixels)</span> -->
                          </div>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                          <div class="form-group">
                            <div class="sub-title">{{rs.small_dark_logo}}</div>
                            <div class="content logimg">
                              <img v-if="formData.logoimageminid" :src="formData.logoimageminid"   class="avatar">
                            </div>
                            <!-- <span style="font-size:12px;color:#818998">(*Recommended size: 40 x 40 pixels)</span> -->
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-collapse v-model="activeNames" class="box">
                  <el-collapse-item name="2">
                    <template slot="title">
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/page/attendanceResults_2.png" alt=""><span>{{rs.address}}</span>
                        </div>
                      </div>
                    </template>
                    <div class="box-body">
                      <address-area-preview :formData="formData"  :readonly="readonly"></address-area-preview>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-collapse v-model="activeNames" class="box" style="margin-top: 10px;">
                  <el-collapse-item name="3">
                    <template slot="title">
                      <div class="box-header-with-collapse clearfix">
                        <div class="title">
                          <img src="../../assets/imgs/page/clientDetail_1.png" alt=""><span>{{rs.trust_account_details}}</span>
                        </div>
                      </div>
                    </template>
                    <div class="box-body">
                      <account-area-preview :formData="formData" :validatorSave='validatorSave' :readonly="readonly" ></account-area-preview>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box" style="margin-top: 10px;">
              <div class="box-header clearfix">
                <div class="title">
                  <img src="../../assets/imgs/common/common_2.png" alt=""><span>{{rs.agent_commission_rate}}({{rs.default}})</span>
                </div>
                <!-- <div class="tools" @click ="handleAddOption('acommissions')">
                  <span class="btn_text" v-if="!readonly">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_new_option}}</span>
                  </span>
                </div> -->
              </div>
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :data="acommissions"
                    :empty-text = rs.no_data
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    size="mini">
                    <el-table-column
                      prop="level"
                      :label="rs.commission_level"
                      width='160'
                      align='center'>
                      <template slot-scope="scope">
                        <span class="leveltext item_size">{{levelObj[scope.row.option]}} {{setOption(scope.$index+1,scope.row)}}</span> 
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="exchange_commission"
                      :label="rs.exchange_commission"
                      align="center">
                      <template slot-scope="scope">
                        <el-row :gutter="10">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;" class="item_size">
                              {{rs.commission_rate}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{scope.row.exchange.commissionrate}}</div>
                            <!-- <el-input size="small" v-model="scope.row.exchange.commissionrate" :disabled="readonly"></el-input> -->
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{rateTypeobj[scope.row.exchange.ratetype]}}</div>
                            <!-- <el-select size="small" v-model="scope.row.exchange.ratetype"  :disabled="readonly">
                              <el-option :value="d.code" :label="d.value" v-for="(d,i) in rateTypeList" :key="i"></el-option>
                            </el-select> -->
                          </el-col>  
                        </el-row>  
                        <el-row :gutter="10" style="padding-top:5px;">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;" class="item_size">
                            +&nbsp;&nbsp;{{rs.bonus}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{scope.row.exchange.bonus}}</div>
                            <!-- <el-input size="small" v-model="scope.row.exchange.bonus" :disabled="readonly"></el-input> -->
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{rateTypeobj[scope.row.exchange.bonustype]}}</div>
                            <!-- <el-select size="small"  v-model="scope.row.exchange.bonustype" :disabled="readonly">
                              <el-option :value="d.code" :label="d.value" v-for="(d,i) in rateTypeList" :key="i"></el-option>
                            </el-select> -->
                          </el-col>  
                        </el-row>  
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="settle_commission"
                      :label="rs.settle_commission"
                      align="center">
                      <template slot-scope="scope">
                        <el-row :gutter="10">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;" class="item_size">
                              {{rs.commission_rate}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{scope.row.settled.commissionrate}}</div>
                            <!-- <el-input size="small" v-model="scope.row.settled.commissionrate" :disabled="readonly"></el-input> -->
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{rateTypeobj[scope.row.settled.ratetype]}}</div>
                            <!-- <el-select size="small"  v-model="scope.row.settled.ratetype" :disabled="readonly">
                              <el-option :value="d.code" :label="d.value" v-for="(d,i) in rateTypeList" :key="i"></el-option>
                            </el-select> -->
                          </el-col>  
                        </el-row>  
                        <el-row :gutter="10" style="padding-top:5px;">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;" class="item_size">
                              +&nbsp;&nbsp;{{rs.bonus}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{scope.row.settled.bonus}}</div>
                            <!-- <el-input size="small" v-model="scope.row.settled.bonus" :disabled="readonly"></el-input> -->
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{rateTypeobj[scope.row.settled.bonustype]}}</div>
                            <!-- <el-select size="small" v-model="scope.row.settled.bonustype" :disabled="readonly">
                              <el-option :value="d.code" :label="d.value" v-for="(d,i) in rateTypeList" :key="i"></el-option>
                            </el-select> -->
                          </el-col>  
                        </el-row>  
                      </template>
                    </el-table-column>
                    <!-- <el-table-column
                      width="100">
                      <template slot-scope="scope">
                        <span class="btntext" @click="handleDelete(scope.row,'acommissions')" v-if="!readonly">{{rs.delete}}</span>
                      </template>
                    </el-table-column> -->
                  </el-table>
                </div>
                <div style="padding:20px 0;backgournd:red">
                  <el-row  >
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                      <span style="font-size: 12px;color: #666;">
                        Default Level for New Members
                      </span>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                       <span>
                         {{this.formData.defaultcommissionlevelnumber?levelObj[this.formData.defaultcommissionlevelnumber]:''}}
                       </span>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <!--
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="box" style="margin-top: 10px;">
              <div class="box-header clearfix">
                <div class="title">
                  <img src="../../assets/imgs/common/common_2.png" alt=""><span>{{rs.channel_commission_rate}}({{rs.default}})</span>
                </div>
              </div>
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :data="commissions"
                    :empty-text = rs.no_data
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    size="mini">
                    <el-table-column
                      prop="level"
                      :label="rs.commission_option"
                      width='160'
                      align='center'>
                      <template slot-scope="scope">
                        <span class="leveltext item_size">{{optionObj[scope.row.option]}} {{setOption(scope.$index+1,scope.row)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="exchange_commission"
                      :label="rs.exchange_commission"
                      align="center">
                      <template slot-scope="scope">
                        <el-row :gutter="10">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;" class="item_size">
                              {{rs.commission_rate}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{scope.row.exchange.commissionrate}}</div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div >{{rateTypeobj[scope.row.exchange.ratetype]}}</div>
                          </el-col>  
                        </el-row>  
                        <el-row :gutter="10" style="padding-top:5px;">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;" class="item_size">
                            +&nbsp;&nbsp;{{rs.bonus}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{scope.row.exchange.bonus}}</div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div >{{rateTypeobj[scope.row.exchange.bonustype]}}</div>
                          </el-col>  
                        </el-row>  
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="settle_commission"
                      :label="rs.settle_commission"
                      align="center">
                      <template slot-scope="scope">
                        <el-row :gutter="10">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;" class="item_size">
                              {{rs.commission_rate}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{scope.row.settled.commissionrate}}</div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div >{{rateTypeobj[scope.row.settled.ratetype]}}</div>
                          </el-col>  
                        </el-row>  
                        <el-row :gutter="10" style="padding-top:5px;">
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div style="padding:5px;text-align:right;" class="item_size">
                              +&nbsp;&nbsp;{{rs.bonus}}
                            </div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                            <div>{{scope.row.settled.bonus}}</div>
                          </el-col>  
                          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                             <div >{{rateTypeobj[scope.row.settled.bonustype]}}</div>
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
        -->
        <el-row :gutter="10" v-if="!isUpdate">
          <el-col :span="24">
            <div class="box" style="margin-top: 10px;">
              <div class="box-header">
                <div class="title">
                  <img src="../../assets/imgs/page/allActivities_1.png" alt=""><span>{{rs.theme_logo}}</span>
                </div>
              </div>
              <div class="table_box upload_box">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" v-for="(d,i) in projectLogoList" :key="i">
                    <div class="form-group" style="margin: 0 20px 20px;">
                      <div class="sub-title">{{d.value}}</div>
                      <div class="logimg">
                        <img v-if="agencyLogo[d.code]" :src="agencyLogo[d.code]"  class="avatar">
                        <!-- <el-upload
                        class="avatar-uploader"
                        :action='actionUrl5'
                        :disabled="readonly"
                        :show-file-list="false"
                        :data="{'code': d.code,'agencyid':formData.agencyid}"
                        :on-success="LogoImg"
                        :on-progress="progress"
                        accept="image/gif,image/bmp,image/jpeg,image/png"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="agencyLogo[d.code]" :src="agencyLogo[d.code]" style="width:100%;height:140px" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->
                      </div>
                    </div>
                  </el-col>
                </el-row>  
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="userInfo.roleid == '1'">
          <el-col :span="24">
            <div class="box" style="margin-top: 10px;">
              <div class="box-header clearfix">
                <div class="title">
                  <img src="../../assets/imgs/common/common_2.png" alt=""><span>{{rs.associated_agencies}}</span>
                </div>
              </div>
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :data="associatedagencies"
                    style="width: 100%"
                    :empty-text = rs.no_data
                    tooltip-effect="light"
                    size="mini">
                    <el-table-column
                      :label="rs.name"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{ scope.row.fullname }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="rs.contact_person"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{ scope.row.contactperson }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="rs.contact_number"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{ scope.row.contactnumber }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="rs.office_telephone"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{ scope.row.officetelephone }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="rs.office_fax"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{ scope.row.officefax }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="userInfo.roleid == '1'">
          <el-col :span="24">
            <div class="box" style="margin-top: 10px;">
              <div class="box-header clearfix">
                <div class="title">
                  <img src="../../assets/imgs/common/common_2.png" alt=""><span>{{rs.partner_firms}}</span>
                </div>
              </div>
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :data="brokerfirms"
                    style="width: 100%"
                    :empty-text = rs.no_data
                    tooltip-effect="light"
                    size="mini">
                    <el-table-column
                      :label="rs.name"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{ scope.row.fullname }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="rs.phone"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{ scope.row.officetelephone }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="rs.fax_number"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{ scope.row.officefax }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>  
    <!-- 语言弹出层 -->
    <language-name :sync="fullnameShow" labelName='fullname' :nameData='fullnameObj' @update:sync="fullnameShow=false"></language-name>
    <language-name :sync="shortnameShow" labelName='shortname' :nameData='shortnameObj'  @update:sync="shortnameShow=false"></language-name>
  </div>
</template>
<script>
import{ insertAgency, updateAgency, getAgency } from '@/api/agencyApi.js'
import axios from 'axios'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
export default{
  data() {
    return {
      userInfo:{},
      fullnameShow:false,//fullname弹出层显示
      shortnameShow:false,//shortname弹出层显示
      shortnameObj:{},//组件绑定值
      fullnameObj:{},//组件绑定值
      activeNames:['1','2','3'], //折叠面板
      levelObj:{},
      optionObj:{},
      levelList:[],
      rateTypeList:[],
      rateTypeobj:{},
      projectLogoList:[],//主题list
      agencyLogo:{},
      formData:{
        fullnameShow:'',//页面显示值
        shortnameShow:'',//页面显示值
        fullname:'',
        shortname:'',
        principal:'',
        corporatelicense:'',
        abn:'',
        email:'',
        website:'',
        contactperson:'',
        contactnumber:'',
        officetelephone:'',
        officefax:'',
        commissionlevelnumber:0,
        isactived:0,
        logoimagelight:'',
        logoimagedark:'',
        logoimagemini:'',
        languagetype:'01',
        addressline:'',
        addressline2:'',
        suburb:'',
        state:'',
        postcode:'',
        country:'',
        bankname:'',
        accountname:'',
        bsb:'',
        accountnumber:''
      },
      validatorSave:{
        fullnameShow:{
          vaid:['noNull'],
          flg:false,
        },
        shortnameShow:{
          vaid:['noNull'],
          flg:false
        },
        commissionlevelnumber:{
          vaid:['noNull'],
          flg:false
        },
        email:{
          vaid:['Email'],
          flg:false
        },
        website:{
          vaid:['Http'],
          flg:false
        },
        contactnumber:{
          vaid:['phoneNumber'],
          flg:false
        },
        officetelephone:{
          vaid:['phoneNumber'],
          flg:false
        },
        officefax:{
          vaid:['phoneNumber'],
          flg:false
        },
        postcode:{
          vaid:['Number'],
          flg:false
        },
        accountnumber:{
          vaid:['Number'],
          flg:false
        },
      },
      isUpdate:true,
      actionUrl1:'',
      actionUrl2:'',
      actionUrl3:'',
      actionUrl4:'',
      actionUrl5:'',
      acommissions: [],
      commissions: [],
      brokerfirms:[],
      associatedagencies:[]
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'address-area-preview': resolve => require(['@/common/AddressAreaPreview.vue'], resolve),
    'account-area-preview': resolve => require(['@/common/AccountAreaPreview.vue'], resolve),
    // 'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    // 'account-area': resolve => require(['@/common/AccountArea.vue'], resolve),
    'language-name': resolve => require(['@/common/LanguageName'], resolve),
    },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    setOption(d,data){
      data.option = '0' + d;
      return ''
    },
    handleAddOption(type){
      if(this[type].length>4){
        return
      }
      this[type].push({
        exchange:{
          ratetype:'01',
          commissionrate:0,
          bonustype:'01',
          bonus:0
        },
        settled:{
          ratetype:'01',
          commissionrate:0,
          bonustype:'01',
          bonus:0
        },
        option:'01'
      });
      if(type == 'acommissions'){
        this.formData.commissionlevelnumber = '0' + this[type].length;
      }
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    onEditorBlur(e){
      // console.log(e.container.innerHTML);//一大推东西，你也可以输出e，看看里面的结构
    },
    // Darprogress(event, file, fileList){
    //   this.$store.commit('SET_SHOW_LOADING',true)
    // },
    DarkImg(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.formData.logoimagedark = file.response.path;
    },
    progress(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
    LightImg(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.formData.logoimagelight = file.response.path;
    },
    LogoImg(res){
      let data = {themecode:res.code,referid:this.formData.agencyid,refertype:'2',logourl:res.path};
      this.$store.commit('SET_SHOW_LOADING',false)
      this.agencyLogo[res.code] = res.path;
      this.agencyLogo = Object.assign({}, this.agencyLogo);
     
    },
    MinidImag(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.formData.logoimageminid = file.response.path;
    },
    MiniImag(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.formData.logoimagemini = file.response.path;
    },
    // Mindprogress(event, file, fileList){
    //   this.$store.commit('SET_SHOW_LOADING',true)
    // },
    // Minprogress(event, file, fileList){
    //   this.$store.commit('SET_SHOW_LOADING',true)
    // },
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
    goRouter(path){
      this.$router.push({path})
    },
    // 转换成提交数组
    setActionArr(data){
      let actionArr=[]
      for (var Key in data){
        actionArr.push({type:Key,content:data[Key]})
      }
      return actionArr
    },
    handleDelete(row,type){
      this[type].splice(this[type].indexOf(row),1)
      if(type == 'acommissions'){
        this.formData.commissionlevelnumber = '0' + this[type].length==0?'':this[type].length;
      }
    },
    isNumber(obj){ 
      return (typeof obj=='number')&&obj.constructor==Number; 
    },
    validatorOption(data){
      // /^[0-9]*$/
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
    handleSave(){
      if (this.$route.path == '/master_manage/agencyDetailPreview/OwnAgency') {
        this.$router.push({path:'/master_manage/agencyDetail/OwnAgency',query:{id:this.formData.agencyid}})
      } else  {
        this.$router.push({path:'/master_manage/agencyDetail/update',query:{id:this.formData.agencyid}})
      }
    },
    getAgencyInfo(data){
      getAgency(data).then(res=>{
        if(res.data.success){
          this.formData = res.data.data;
          res.data.logos.forEach(ele =>{
            this.agencyLogo[ele.themecode] = ele.logourl;
          })
          this.acommissions = res.data.acommissions;
          this.commissions = res.data.commissions;
          JSON.parse(this.formData.fullname).forEach(element => {
            this.fullnameObj[element.type] =element.content;
          });
          JSON.parse(this.formData.shortname).forEach(element => {
            this.shortnameObj[element.type] =element.content;
          });
          this.formData.fullnameShow = this.fullnameObj['00'];
          this.formData.shortnameShow = this.shortnameObj['00'];
          this.brokerfirms = res.data.brokerfirms;
          this.associatedagencies = res.data.associatedagencies;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    }
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // OPTION_LIST 选项列表
    this.levelList = JSON.parse(localStorage.getItem('selectlist')).LEVEL_LIST;
    this.levelList.forEach(ele =>{
      this.levelObj[ele.code] = ele.value;
    })
    JSON.parse(localStorage.getItem('selectlist')).OPTION_LIST.forEach(ele =>{
      this.optionObj[ele.code] = ele.value;
    })
    // RATE_TYPE_LIST 百分百列表
    this.rateTypeList = JSON.parse(localStorage.getItem('selectlist')).RATE_TYPE_LIST;
    this.rateTypeList.forEach(element => {
      
      this.rateTypeobj[element.code] = element.value  
    }); 
    this.projectLogoList = JSON.parse(localStorage.getItem('selectlist')).PROJECT_LOGO_LIST;
    // 从根域拿到服务器地址,生成图片上传地址
    this.actionUrl1 =axios.defaults.baseURL+'agency/uploadFile?flag=0';
    this.actionUrl2 =axios.defaults.baseURL+'agency/uploadFile?flag=1';
    this.actionUrl3 =axios.defaults.baseURL+'agency/uploadFile?flag=2';
    this.actionUrl4 =axios.defaults.baseURL+'agency/uploadFile?flag=3';
    this.actionUrl5 =axios.defaults.baseURL+'agency/uploadLogo';
    // this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    if(this.$route.params.id == 'save'){
      this.isUpdate= true;//给保存按钮识别是新增还是修改
    }
    if(this.$route.params.id == 'update' ||  this.$route.params.id == 'OwnAgency'){
      this.isUpdate = false;//给保存按钮识别是新增还是修改

      if(sessionStorage.getItem('agencyid')){
        this.formData.agencyid = sessionStorage.getItem('agencyid');
      }else{
        this.formData.agencyid = this.$router.currentRoute.query.id;
        sessionStorage.setItem('agencyid',this.$router.currentRoute.query.id)
      }
      if(this.$route.params.id == 'OwnAgency'){
        this.formData.agencyid = JSON.parse(localStorage.getItem('userInfo')).agencyid;
      }
      this.getAgencyInfo({agencyid:this.formData.agencyid})
      
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.agency ==='02'){
        return true
      }else{
        return false
      }
    },
  },
  watch:{
    se(val){
      this.levelList = this.se.LEVEL_LIST;
      this.levelList.forEach(ele =>{
        this.levelObj[ele.code] = ele.value;
      })
      this.rateTypeList = this.se.RATE_TYPE_LIST;
        this.rateTypeList.forEach(element => {
        this.rateTypeobj[element.code] = element.value  
      }); 
      this.rateTypeobj = Object.assign({},this.rateTypeobj)
      },
      $route(newval,oidval){
        
       if (this.$route.path == '/master_manage/agencyDetailPreview/OwnAgency') {
         
          this.$router.push({path:'/master_manage/agencyDetailPreview/OwnAgency',query:{id:JSON.parse(localStorage.getItem('userInfo')).agencyid}})
          this.getAgencyInfo({agencyid:JSON.parse(localStorage.getItem('userInfo')).agencyid})
        }
    }
  },
}
</script>
<style lang="scss" scoped>
.leveltext {
  font-size:14px;
  font-family:SFUIDisplay-Medium;
  font-weight:500;
  color:rgba(85,91,103,1);
}
.avatar-uploader{
  height: 160px;
  width: 160px;
  img {
    width: 100%;
    height: 100%;
    
  }
}
.logimg{
  width: 100px;
  height: 100px;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.border_bott{
  position: relative;
  padding: 24px 0;
  &::after{
    content: ''; 
     position: absolute;
     left: 0;
     bottom: 50%;
     right: 0;
     width: 100%;
     height: 1px;
     background-color: rgba(228, 228, 228, 1);
  }
}
.bg_log{
  background: #202A47;
}
.item_size{
  font-size:12px;
  // font-family:SFUIDisplay-Bold,SFUIDisplay;
  font-weight:bold;
  color:rgba(85,91,103,1);
}
</style>
