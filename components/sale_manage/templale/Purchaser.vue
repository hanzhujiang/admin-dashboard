<template>
  <div class="block">
    <div class="block">
      <!-- 房源信息 -->
      <div class="block_head">
        <span class="title">{{rs.property_information}}</span>
        <el-button class="small block_button bg_green fr" style="margin-right:15px" size="mini"  @click="changemoney" v-if="btnStatus.isModifyPrice&&!readonly">
          <!-- {{rs.add_solicitor}} -->  
          {{rs.modify_price}}
        </el-button>
      </div>
      <div class="block_content">
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.project_name}}</div></el-col>
          <el-col :span="20" class="cell "><div>{{saleAdviceData.projectname}}</div></el-col>
        </el-row>
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.project_address}}</div></el-col>
          <el-col :span="20" class="cell">
            <div>
              {{makeAddress2(saleAdviceData)}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.price}}</div></el-col>
          <el-col :span="4" class="cell"><div>{{saleAdviceData.price?'$':''}}{{toMoney(+saleAdviceData.price)}}</div></el-col>
          <el-col :span="4" class="title"><div>{{rs.unit}}</div></el-col>
          <el-col :span="4" class="cell"><div>{{saleAdviceData.unit}}</div></el-col>
          <el-col :span="4" class="title"><div>{{rs.lot}}</div></el-col>
          <el-col :span="4" class="cell"><div>{{saleAdviceData.lot}}</div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 买家 -->
    <div class="block_head">
      <span class="title">{{rs.purchaser}}</span>
      <el-button class="small block_button bg_green fr"  style="margin-right:15px"  size="mini" @click="dialogShow('1')" v-if="btnStatus.isAddPurchaser&&!readonly">
      {{rs.add_purchaser}}</el-button>
    </div>
    <div class="block_content" v-for="(d,i) in saleAdviceData.clientlist" :key="d.code">
      <!-- <p style="text-decoration: line-through;">---{{d.isAdd}}---</p> -->
      <el-row :gutter="10" class="block_title">
        <el-col :span="10" class="title ">
          <div>
            <span>{{rs.purchaser}}  {{rs[arr[i]]}}{{d.ismainpurchaser==1?' ('+rs.main_contact+')':''}}</span>
          </div>
        </el-col>
        <el-col :span="14" style="padding:5px 0px;">
          <el-button   class="small bg_red block_button fr" style="margin-right:15px"  size="mini"
            @click="dellist(i)" v-if="btnStatus.isRemovePurchaser&&!readonly">
            <img class="icon" src="@/assets/imgs/common/common_6.png" alt="">{{rs.remove_purchaser}}
          </el-button>
           <el-button   class="small bg_blue block_button fr" style="margin-right:15px"  size="mini"
            @click="editlist(d,i)" v-if="btnStatus.isRemovePurchaser&&!readonly">
            <img class="icon" src="@/assets/imgs/common/common_5.png" alt="">{{rs.edit_purchaser}}
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="block_line">
        <el-col :span="4" class="title"><div>{{rs.given_name}}</div></el-col>
        <el-col :span="4" :class="[d.isAdd=='del'?'cell text_decoration red_text':(d.isAdd=='add'?'cell red_text':'cell')]"><div>{{d.firstname}}</div></el-col>
        <el-col :span="4" class="title"><div>{{rs.surname}}</div></el-col>
        <el-col :span="4" :class="[d.isAdd=='del'?'cell text_decoration red_text':(d.isAdd=='add'?'cell red_text':'cell')]"><div>{{d.lastname}}</div></el-col>
        <el-col :span="4" class="title"><div>{{rs.purchase_type}}</div></el-col>
        <el-col :span="4" :class="[d.isAdd=='del'?'cell text_decoration red_text':(d.isAdd=='add'?'cell red_text':'cell')]"><div>{{purchaseobj[d.purchasetype]}}</div></el-col>
      </el-row>
      <el-row :gutter="10" class="block_line">
        <el-col :span="4" class="title"><div>{{rs.address}}</div></el-col>
        <el-col :span="20" :class="[d.isAdd=='del'?'cell text_decoration red_text':(d.isAdd=='add'?'cell red_text':'cell')]">
          <div> {{makeAddress(d)}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="block_line">
        <el-col :span="4" class="title"><div>{{rs.email}}</div></el-col>
        <el-col :span="20" :class="[d.isAdd=='del'?'cell text_decoration red_text':(d.isAdd=='add'?'cell red_text':'cell')]"><div>{{d.email}}</div></el-col>
      </el-row>
      <el-row :gutter="10" class="block_line">
        <el-col :span="4" class="title"><div>{{rs.phone}}</div></el-col>
        <el-col :span="4" :class="[d.isAdd=='del'?'cell text_decoration red_text':(d.isAdd=='add'?'cell red_text':'cell')]"><div>{{d.phonenumber}}</div></el-col>
        <el-col :span="4" class="title"><div>{{rs.mobile}}</div></el-col>
        <el-col :span="4" :class="[d.isAdd=='del'?'cell text_decoration red_text':(d.isAdd=='add'?'cell red_text':'cell')]"><div>{{d.mobilenumber}}</div></el-col>
        <el-col :span="4" class="title"><div>{{rs.firb_required}}</div></el-col>
        <el-col :span="4" :class="[d.isAdd=='del'?'cell text_decoration red_text':(d.isAdd=='add'?'cell red_text':'cell')]"><div>{{d.firbrequired==0?rs.no_require:rs.require}}</div></el-col>
      </el-row>
    </div>
    <!-- 律师 -->
    <div class="block">
      <div class="block_head">
        <span class="title">{{rs.purchase_solicitor}}</span>

        <el-button   class="small block_button bg_green fr" style="margin-right:15px"  size="mini" v-show="saleAdviceData.firm==''" @click="dialogShow('2')" v-if="btnStatus.isAddSolicitor&&!readonly">
          {{rs.add_solicitor}}
        </el-button>

        <el-button   class="small block_button bg_blue fr" style="margin-right:15px"  size="mini" @click="dialogShow('3')" v-show="saleAdviceData.firm!=''" v-if="btnStatus.isChangeSolicitor&&!readonly" >
         {{rs.change_solicitor}}
        </el-button>
      </div>
      
      <div class="block_content" >
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.firm}}</div></el-col>
          <el-col :span="20" :class="[saleAdviceData.isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.firm}}</div></el-col>
        </el-row>
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.address}}</div></el-col>
          <el-col :span="20" :class="[saleAdviceData.isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>
           
            {{makeAddress(saleAdviceData)}}
          </div></el-col>
        </el-row>
          <!--  -->
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.attention}}</div></el-col>
          <el-col :span="4" :class="[saleAdviceData.isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.solicitorfirstname}}<span class="nbsp"></span>{{saleAdviceData.solicitorlastname}}</div></el-col>
          <el-col :span="4" class="title"><div>{{rs.po_box}}</div></el-col>
          <el-col :span="12" :class="[saleAdviceData.isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.pobox}}</div></el-col>
        </el-row>
          <!--  -->
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.phone}}</div></el-col>
          <el-col :span="4" :class="[saleAdviceData.isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.phone}}</div></el-col>
          <el-col :span="4" class="title"><div>{{rs.email}}</div></el-col>
          <el-col :span="12" :class="[saleAdviceData.isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.email}}</div></el-col>
        </el-row>
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.fax}}</div></el-col>
          <el-col :span="4" :class="[saleAdviceData.isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.fax}}</div></el-col>
          <el-col :span="4" class="title"><div>{{rs.dx_number}}</div></el-col>
          <el-col :span="12" :class="[saleAdviceData.isAdd=='mod'?'cell text_decoration red_text':'cell']"><div>{{saleAdviceData.dxnumber}}</div></el-col>
        </el-row>
      </div>

      <!-- v-if="saleAdviceData.isAdd=='mod'" -->
      <div class="block_content"  v-if="saleAdviceData.isAdd=='mod'">
        <!--  -->
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.firm}}</div></el-col>
          <el-col :span="20" class="cell red_text"><div>{{saleAdviceData.newsolicitorData.shortname}}</div></el-col>
        </el-row>
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.address}}</div></el-col>
          <el-col :span="20" class="cell red_text"><div>
            {{makeAddress(saleAdviceData.newsolicitorData)}}
          </div></el-col>
        </el-row>
          <!--  -->
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.attention}}</div></el-col>
          <el-col :span="4" class="cell red_text"><div>{{saleAdviceData.newsolicitorData.firstname}}<span class="nbsp"></span>{{saleAdviceData.newsolicitorData.lastname}}</div></el-col>
          <el-col :span="4" class="title"><div>{{rs.po_box}}</div></el-col>
          <el-col :span="12" class="cell red_text"><div>{{saleAdviceData.newsolicitorData.pobox}}</div></el-col>
        </el-row>
          <!--  -->
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.phone}}</div></el-col>
          <el-col :span="4" class="cell red_text"><div>{{saleAdviceData.newsolicitorData.officetelephone}}</div></el-col>
          <el-col :span="4" class="title"><div>{{rs.email}}</div></el-col>
          <el-col :span="12" class="cell red_text"><div>{{saleAdviceData.newsolicitorData.email}}</div></el-col>
        </el-row>
        <el-row :gutter="10" class="block_line">
          <el-col :span="4" class="title"><div>{{rs.fax}}</div></el-col>
          <el-col :span="4" class="cell red_text"><div>{{saleAdviceData.newsolicitorData.officefax}}</div></el-col>
          <el-col :span="4" class="title"><div>{{rs.dx_number}}</div></el-col>
          <el-col :span="12" class="cell red_text"><div>{{saleAdviceData.newsolicitorData.dxnumber}}</div></el-col>
        </el-row>
      </div>
    </div>
    
    <div class="block">
      <!-- 条件 -->
      <div class="block_head">
        <span class="title">{{rs.purchase_conditions}}</span>
        <el-button   class="small block_button bg_blue fr" style="margin-right:15px"  size="mini" @click="editShow" v-if="btnStatus.isEditCondition&&!readonly">
        <img class="icon" src="@/assets/imgs/common/common_5.png" alt="">  {{rs.edit_condition}}</el-button>
      </div>
      <div class="block_content">
        <div v-if="!saleAdviceData.saleconditionlist || saleAdviceData.saleconditionlist.length==0" 
            style="padding:15px 0">{{rs.no_special_conditions}}</div>
        <div v-for="(d,i) in saleAdviceData.saleconditionlist" :key="i"  v-else>
          <el-row :gutter="10" class="block_line">
            <el-col :span="24" class="cell">
              <el-tooltip placement="top-start" effect="light">
                <div slot="content">{{d.conditiontext}}</div>
                <!-- <div class="condition_line " >
                  {{d.conditiontext}}
                </div> -->
                <!-- <p>{{d.isAdd}}</p> -->
                <div :class="[d.isAdd=='del'?'condition_line text_decoration red_text':(d.isAdd=='add'?'condition_line red_text':'condition_line')]">
                  {{d.conditiontext}}
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.select_purchaser"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      width='70%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.select_purchaser}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row>
          <div class="filter-search fr" style="width:50%" >
            <el-input :placeholder="rs.search_purchasers" clearable class="input-key" size="mini"
                v-model="data.condition" @change="getData('0')">
              <el-button  @click="getData('0')" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-row>
        <el-row>
          <el-table
            :data="purchaserList"
            :empty-text = rs.no_data
            style="width: 100%; margin-top:5px;"
            size="mini">
            <el-table-column
              prop="nema"
              :label="rs.name">
              <template slot-scope="scope">
                <span>{{scope.row.firstname}}<span class="nbsp">&nbsp;</span>{{scope.row.lastname}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              :label="rs.email">
            </el-table-column>
            <el-table-column
              prop="mobilenumber"
              :label="rs.mobile">
            </el-table-column>
            <el-table-column
              prop="firbrequired"
              :label="rs.firb_required">
              <template slot-scope="scope">
                <span>{{scope.row.firbrequired==0?rs.no_require:rs.require}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="firbrequired"
              :label="rs.agents">
              <template slot-scope="scope">
                <span>{{scope.row.afirstname}}</span><span>&nbsp;</span><span>{{scope.row.alastname}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="rs.action"
              width="100">
              <template slot-scope="scope">
                <el-button @click="addList(scope.row)" class="mini bg_blue" size="mini">
                  <span>{{rs.select}}</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row class="dailog-footer" style="margin-top:5px" v-if="total">
        <el-pagination
        @current-change="getData('1')"
        :current-page.sync="data.pagenum"
        :page-size="data.pagesize"
        layout="prev, pager, next"
        :total="total"
        class="fr">
        </el-pagination>
      </el-row>
    </el-dialog>
    <select-solicitor :sync="solicitorShow" @select="addList" @update:sync="solicitorShow=false"></select-solicitor>

    <el-dialog
      :close-on-click-modal='false'
      :title="rs.set_condition"
      :visible.sync="conditionShow"
      width='50%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.set_condition}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row>
          <div>
            <el-select v-model="value" @change="selectChange(value,options)" size="small"   placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value"
                >
              </el-option>
            </el-select>
            <el-button   class="small bg_blue" @click="addConditions" size="small">{{rs.manual_condition}}</el-button>
          </div>
        </el-row>
        <el-row>
          <div >
          <el-input
            maxlength="200"
            v-for="(d,i) in saleconditionlist" :key="i"
            v-model="d.conditiontext"
            class="input_css"
            size="small">
             <i class="el-icon-close" slot="suffix" style="line-height: 32px;"  @click="clear(i)"></i>
            </el-input>
          </div>
        </el-row>
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
              <el-button class="small bg_blue" @click="save">
              {{rs.set}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.add_deposit"
      :visible.sync="moneyShow"
      width='50%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.modify_price}}</span>
        </div>
      </template>
      <div class="dialog-body" style="line-height:1">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="form-group">
              <div class="sub-title">{{rs.price}}</div>
              <div class="content">
                <el-input maxlength="10" v-model="changeprice"  size="small" clearable  @blur="validatorBlur('changeprice')"></el-input>
                <p class="curtail" v-show="validatorSave.changeprice.flg">{{rs[validatorSave.changeprice.msg]}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="moneyclose">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="moneysave">
             {{rs.set}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>


    
      <el-dialog
      :close-on-click-modal='false'
      :title="rs.add_deposit"
      :visible.sync="edit_purchaserShow"
      width='50%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.edit_purchaser}}</span>
        </div>
      </template>

      <div class="dialog-body" style="line-height:1">
        <el-row :gutter="10">
          <el-col :span="8">
             <div class="form-group">
                <div class="sub-title-first">{{rs.first_name}}<span class="required">*</span></div>
                <div class="content">
                  <el-input v-model="formData.firstname" :disabled="readonly" clearable maxlength="50" size="small" @blur="validatorBlur2('firstname')"></el-input>
                  <p class="curtail" v-show="validatorSave2.firstname.flg">{{rs[validatorSave2.firstname.msg]}}</p>
                </div>
              </div>
          </el-col>
           <el-col :span="8">
              <div class="form-group">
                <div class="sub-title-first">{{rs.last_name}}<span class="required">*</span></div>
                <div class="content">
                  <el-input v-model="formData.lastname" :disabled="readonly" clearable maxlength="50" size="small" @blur="validatorBlur2('lastname')"></el-input>
                  <p class="curtail" v-show="validatorSave2.lastname.flg">{{rs[validatorSave2.lastname.msg]}}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="form-group">
                <div class="sub-title-first">{{rs.email}}</div>
                <div class="content">
                  <el-input v-model="formData.email" :disabled="readonly" clearable size="small" maxlength="100" @blur="validatorBlur2('email')"></el-input>
                  <p class="curtail" v-show="validatorSave2.email.flg">{{rs[validatorSave2.email.msg]}}</p>
                </div>
              </div>
            </el-col>
        </el-row>


        <el-row :gutter="10">
          <el-col :span="8">
             <div class="form-group">
                <div class="sub-title">{{rs.mobile_number}}</div>
                <div class="content">
                <el-input v-model="formData.mobilenumber" clearable maxlength="20" :disabled="readonly" size="small" @blur="validatorBlur2('mobilenumber')"></el-input>
                <p class="curtail" v-show="validatorSave2.mobilenumber.flg">{{rs[validatorSave2.mobilenumber.msg]}}</p>
                </div>
              </div>
          </el-col>
           <el-col :span="8">
             <div class="form-group">
                <div class="sub-title">{{rs.phone_number}}</div>
                <div class="content">
                <el-input v-model="formData.phonenumber" clearable maxlength="20" :disabled="readonly" size="small" @blur="validatorBlur2('phonenumber')"></el-input>
                <p class="curtail" v-show="validatorSave2.phonenumber.flg">{{rs[validatorSave2.phonenumber.msg]}}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="form-group">
                <div class="sub-title">{{rs.purchaser_type}}<span class="required">*</span></div>
                <div class="content" >
                  <el-select v-model="formData.purchasetype" :disabled="readonly" size="small" slot="prepend"  @change="validatorBlur('purchasetype')"
                      placeholder="" clearable>
                      <el-option
                      v-for="item in purchaserTypeList"
                      :key="item.code"
                      :label="item.value"
                      :value="item.code">
                      </el-option>
                    </el-select>
                    <p class="curtail" v-show="validatorSave2.purchasetype.flg">{{rs[validatorSave2.purchasetype.msg]}}</p>
                </div>
              </div>
            </el-col>
            
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
             <div class="form-group">
              <div class="sub-title">{{rs.address_line}}</div>
              <div class="content" >
                <el-input v-model="formData.addressline" :disabled="readonly" size="small" maxlength="200" clearable></el-input>
              </div>
            </div>
          </el-col>
           <el-col :span="12">
              <div class="form-group">
                <div class="sub-title">{{rs.address_line2}}</div>
                <div class="content" >
                  <el-input  v-model="formData.addressline2" maxlength="200" :disabled="readonly" size="small" clearable > </el-input>
                </div>
              </div>
          </el-col>
          
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="form-group">
              <div class="sub-title">{{rs.postcode}}</div>
              <div class="content" >
                <el-input v-model="formData.postcode" size="small" :disabled="readonly" maxlength="10" clearable ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-group">
              <div class="sub-title">{{rs.state}}</div>
              <div class="content" >
                <el-input v-model="formData.state" size="small"  :disabled="readonly" maxlength="50" clearable></el-input>
              </div>
            </div>
          </el-col>
         
           <el-col :span="8">
              <div class="form-group">
                <div class="sub-title">{{rs.suburb}}</div>
                <div class="content" >
                  <el-input v-model="formData.suburb" maxlength="50" :disabled="readonly" size="small" clearable></el-input>
                </div>
              </div>
            </el-col>
            
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="form-group">
              <div class="sub-title">{{rs.country}}</div>
              <div class="content" >
                <el-select v-model="formData.country" filterable clearable :disabled="readonly" slot="prepend" :no-match-text="rs.unmatched_data" size="small" placeholder=""  maxlength="3">
                  <el-option
                    v-for="item in countryList"
                    :key="item.countryid"
                    :label="item.countryname"
                    :value="item.countryid">
                  </el-option>
                </el-select>
            </div>
            </div>
          </el-col>
            <el-col :span="8">
              <div class="form-group">
                <div class="sub-title"></div>
                <div class="content" >
                  <el-checkbox style="padding-top:20px;" :label="rs.firb_required" :disabled="readonly" v-model="formData.firbrequired" size="small" true-label='1' false-label='0'></el-checkbox>
                </div>
              </div>
            </el-col>
        </el-row>

        
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="closepurchaser">
              {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="savepurchaser">
             {{rs.set}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getClientData, getSolicitorData ,propertyUpdatePrice} from '@/api/saleAdviceApi.js'
import {updateClient} from '@/api/clientApi'
import { mapGetters } from "vuex";
import { toAddressString, toAddressString2 } from "@/assets/js/utility.js"
import { validator, allvalidator } from '@/validator/validator.js'
export default {
  data(){
    return{
      formData:{
        firstname:'', //
        lastname:'', //
        addressline:'',
        addressline:'',
        suburb:'', //
        state:'',
        postcode:'', //
        country:'', //
        email:'',  //
        mobilenumber:'',//
        phonenumber:'',//
        clientid:'',
        purchasetype:''
      },
      validatorSave2:{
         firstname:{
            vaid:['noNull'],
            flg:false
          },
          lastname:{
            vaid:['noNull'],
            flg:false
          },
          email:{
            vaid:['Email'],
            flg:false
          },
          phonenumber:{
            vaid:['phoneNumber'],
            flg:false
          },
           mobilenumber:{
            vaid:['phoneNumber'],
            flg:false
          },
          postcode:{
            vaid:['Number'],
            flg:false
          },
          purchasetype:{
            vaid:['noNull'],
            flg:false
          }
      },

      validatorSave:{
        changeprice:{
           vaid:['Number'],
            flg:false
        }
      },
      edit_purchaserShow:false,
      changeprice:'',
      moneyShow:false,
      countryObj:{},
      pagenum:10,
      dialogVisible:false,
      solicitorShow:false,
      conditionShow:false,
      conditionsLIst:[],
      conditonsValue:'',
      options: [],
      value:'',
      solicitorList:[],
      condition:'',
      purchaserList:[],
      ismain:'1',
      total:null,
      saleconditionlist:[],
      data:{
        condition:'',  //搜索关键字
        pagesize : 10, //分页
        pagenum :1, //页码
        languagetype:'',
        isactived:1
      },
      purchaseobj:{},
      purchaserTypeList:[],
      countryList:[],
      arr:['one','two','three','four','five']
    }
  },
  created(){
      this.purchaserTypeList =JSON.parse(localStorage.getItem('selectlist')).PURCHASER_TYPE_LIST
      this.options = JSON.parse(localStorage.getItem('selectlist')).PRECONDITION_LIST
      JSON.parse(localStorage.getItem('selectlist')).PURCHASER_TYPE_LIST.forEach(element => {
         this.purchaseobj[element.code] = element.value;
      });
      this.purchaseobj = Object.assign({},this.purchaseobj)
      let countryList =JSON.parse(localStorage.getItem('selectlist')).Country;
      countryList.forEach(element => {
        this.countryObj[element.countryid] = element.countryname
      });
      this.countryObj = Object.assign({}, this.countryObj)
      this.countryList =JSON.parse(localStorage.getItem('selectlist')).Country;
  },
  mounted(){
    
  },
   computed: {
    ...mapGetters(['se','rs','languagetype','saleAdviceData','btnStatus','control']),
    readonly(){
        if(this.control.sales_advice === '02'){
          return true
        }else{
          return false
        }
      }
  },
  components: {
    'select-solicitor':resolve=> require(['@/common/SelectSolicitor.vue'],resolve)
    },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,{changeprice:this.changeprice},key)
    },
    validatorBlur2(key){
      validator(this.validatorSave2,this.formData,key)
    },
    toMoney(num){
        num = num.toFixed(2);
        num = parseFloat(num)
        num = num.toLocaleString();
        return num;//返回的是字符串23,245.12保留2位小数
      },
    restoration(){
        this.data.pagenum = 1
        this.data.languagetype = localStorage.getItem('languagetype')
        if (this.falg == '1') {
          this.allList(this.data)
        }else{
          this.policitorList(this.data)
        }
      },
    getData(type){
      if(type=='1'){
        this.data.languagetype = localStorage.getItem('languagetype')
        if (this.falg == '1') {
          this.allList(this.data)
        }else{
          this.policitorList(this.data)
        }
      }else{
        this.restoration()
      }
    },
    //编辑买家
    editlist(d,i){
      this.edit_purchaserShow = true
      getClientData({clientid:d.clientid}).then(res=>{
        if (res.data.success) { 
          this.formData.firstname = res.data.data[0].firstname;
          this.formData.lastname = res.data.data[0].lastname;
          this.formData.addressline = res.data.data[0].addressline;
          this.formData.addressline2 = res.data.data[0].addressline2;
          this.formData.suburb = res.data.data[0].suburb;
          this.formData.state = res.data.data[0].state;
          this.formData.postcode = res.data.data[0].postcode;
          this.formData.country = res.data.data[0].country;
          this.formData.email = res.data.data[0].email;
          this.formData.mobilenumber = res.data.data[0].mobilenumber;
          this.formData.phonenumber = res.data.data[0].phonenumber;
          this.formData.clientid  = d.clientid
          this.formData.purchasetype = res.data.data[0].purchasetype
        } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    closepurchaser(){
      this.edit_purchaserShow = false
    },
    savepurchaser(){
      if(allvalidator(this.validatorSave2,this.formData)){
          return
      }
      updateClient(this.formData).then(res=>{
        
        if (res.data.success) {
          let timestamp = (new Date()).getTime();
          if(this.saleAdviceData.saleid){
            this.$emit('childByValue', timestamp);
          }else{
              this.saleAdviceData.clientlist.forEach(ele=>{
              if(ele.clientid == this.formData.clientid){
                for(let key in ele){
                  ele[key] = this.formData[key]
                }
              }
            })
          }
          this.$message.success(this.rs.info_msg_insert_success)
          this.edit_purchaserShow = false;
          // this.saleAdviceData.clientlist.forEach((ele,i) => {
          //   if (ele.clientid == this.formData.clientid) {
              
          //      this.saleAdviceData.clientlist.remove(ele)
          //   }
          //   this.saleAdviceData.clientlist.push(this.formData)
          // });
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })


    },
    handleClose(){
      this.data = {
        condition:'',  //搜索关键字
        pagesize : 10, //分页
        pagenum :1, //页码
        languagetype:'',
      }
      if (this.falg =='1') {
        this.dialogVisible = false
      }else{
        this.solicitorShow = false
      }

    },
    dialogShow(i){
      this.falg = i
      if (i=='1') {
        // this.data.pagenum = 10
        this.dialogVisible = !this.dialogVisible
        this.getData('1')
      }else {
        this.solicitorShow = !this.solicitorShow
        this.getData('1')
      }
    },
    // Edit Condition 按钮
    editShow(){

      this.value = ''
      this.conditionShow = true
      this.saleconditionlist= []
      for(var i=0;i<this.saleAdviceData.saleconditionlist.length;i++){
        this.saleconditionlist.push(this.saleAdviceData.saleconditionlist[i])
      }
    },

    selectChange(val,options){
      for (var i = 0; i<options.length; i++) {
         if (val == options[i].label) {
           this.conditioncode = options[i].value
         }
      }
      let list = {
        conditiontext:val,
        conditioncode: this.conditioncode,
        isprecondition : '1'
      }
      this.saleconditionlist.push(list)
    },
    addConditions(){
      this.saleconditionlist.push({conditiontext:'',isprecondition:'0'})
      this.isprecondition = '1'
    },

    close(){
      this.conditionShow = !this.conditionShow
    },
    //inpust的 X按钮
    clear(i){
      this.saleconditionlist.remove(this.saleconditionlist[i])
    },
    save(){
      
      this.conditionShow = false
      this.saleAdviceData.saleconditionlist = []
      for(var i=0;i<this.saleconditionlist.length;i++){
        this.saleAdviceData.saleconditionlist.push(this.saleconditionlist[i])
      }
      this.saleconditionlist = []
      for(var i=0;i<this.saleAdviceData.saleconditionlist.length;i++){
        if (this.saleAdviceData.saleconditionlist[i].conditiontext=='') {
          this.saleAdviceData.saleconditionlist.remove(this.saleAdviceData.saleconditionlist[i])
        }
      }
    },
    //修改价格
    changemoney(){
      this.moneyShow = true;
      this.changeprice = this.saleAdviceData.price
    },
    moneyclose(){
      this.moneyShow = false;
    },
    moneysave(){
      if(allvalidator(this.validatorSave,{changeprice:this.changeprice})){
        return
      }
      let data = {
        price:this.changeprice,
        propertyid: this.saleAdviceData.propertyid
      }
      propertyUpdatePrice(data).then(res=>{
        if (res.data.success) {
          let timestamp = (new Date()).getTime();
          this.$emit('childByValue', timestamp);
          this.$message.success(this.rs.info_msg_insert_success)
          this.moneyShow = false;
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //保存
    addList(row){
      
      this.dialogVisible = false
      if (this.falg == '1') {
        let purchaserLists = {
          firstname:row.firstname,
          lastname:row.lastname,
          purchasetype:row.purchasetype,
          email:row.email,
          phonenumber:row.phonenumber,
          mobilenumber:row.mobilenumber,
          addressline:row.addressline,
          addressline2:row.addressline2,
          state:row.state,
          postcode:row.postcode,
          suburb:row.suburb,
          country:row.country,
          firbrequired:row.firbrequired,
          clientid:row.clientid, //传递是数据
          ismainpurchaser:this.ismain
        }
        
        if (this.saleAdviceData.clientlist.length>0) {
          purchaserLists.ismainpurchaser = '0'
          this.saleAdviceData.clientlist.push(purchaserLists)
        } else {
           this.saleAdviceData.clientlist.push(purchaserLists)
        }
      } else if(this.falg == '2'||this.falg == '3'){
          this.solicitorShow = false
          this.saleAdviceData.firm=row.fullname,
          this.saleAdviceData.addressline = row.addressline
          this.saleAdviceData.addressline2 = row.addressline2
          this.saleAdviceData.state = row.state
          this.saleAdviceData.postcode = row.postcode
          this.saleAdviceData.suburb = row.suburb
          this.saleAdviceData.country = row.country
          this.saleAdviceData.solicitorfirstname = row.firstname,
          this.saleAdviceData.solicitorlastname = row.lastname
          this.saleAdviceData.pobox=row.pobox,
          this.saleAdviceData.phone=row.mobilenumber,
          this.saleAdviceData.email=row.email,
          this.saleAdviceData.fax=row.officefax,
          this.saleAdviceData.dxnumber=row.dxnumber,
          this.saleAdviceData.solicitorid=row.solicitorid
        }
    },
    //清空
    dellist(index){
      for(var i=0; i<this.saleAdviceData.clientlist.length; i++){
        if(index === i){
          this.saleAdviceData.clientlist.remove(this.saleAdviceData.clientlist[i])
        }
      }
    },
    //弹窗表格所有Add Purchaser
    allList(data){
      getClientData(data).then(res=>{
        if (res.data.success) {
          this.purchaserList = res.data.data
          this.total = res.data.total
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    //弹窗表格所有Add Policitor
    policitorList(data){
      getSolicitorData(data).then(res=>{
        if (res.data.success) {
          this.solicitorList = res.data.data
          this.total = res.data.total
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }

      })
    },
    makeAddress(d) {
      return toAddressString(d)
    },
    makeAddress2(d) {
      return toAddressString2(d)
    },
    ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },

  },
  watch:{
    se(val){
      val.PURCHASER_TYPE_LIST.forEach(element => {
         this.purchaseobj[element.code] = element.value;
      });
      this.purchaseobj = Object.assign({},this.purchaseobj)
      let countryList = val.Country;
        countryList.forEach(element => {
        this.countryObj[element.countryid] = element.countryname
      });
      this.options = JSON.parse(localStorage.getItem('selectlist')).PRECONDITION_LIST
    }
  }
}
</script>

<style scoped lang="scss">
</style>
<style>
  .input_css.el-input.el-input--suffix>input {
    border: none;
    border-bottom: 1px solid #EEE;
    border-radius:0px;
  }
  .condition_line {
    width:100%;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
  }

  .text_decoration{
    text-decoration: line-through;
  }
  .red_text{
    color:red;
  }
  /* .block_line {
    margin-top: 5px;
    background-color: lightgrey;

  } */
</style>
