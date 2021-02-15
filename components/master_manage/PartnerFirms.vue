<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.partner_firms}}</span>
      </div>
      <div class="tools">
        <span v-if="!readonly" @click="setIsUpdate(true)" class="btn_text">
          <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
          <span>{{rs.add_new_firm}}</span>
        </span>
      </div>
    </div>
    <form autocomplete="on">
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <div class="filter-count">
              <page-size :pagesize="getData.pagesize" :unit="rs.partner_firms"
                @changeSize="handleSizeChange">
              </page-size>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_partner_firms" clearable v-model="getData.condition"  @change="search" @keyup.enter='search' class="input-key" size='mini'>
                <el-button slot="append" icon="el-icon-search"></el-button>
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
                <el-table
                  :data="BrokerFirmList"
                  style="width: 100%"
                  :empty-text = rs.no_data
                  tooltip-effect="light"
                  size="mini">
                  <el-table-column
                    :label="rs.name"
                    :show-overflow-tooltip="true"
                    width="300">
                    <template slot-scope="scope">
                      <span>{{ scope.row.shortname }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.phone"
                    :show-overflow-tooltip="true"
                    width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.officetelephone }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.fax_number"
                    :show-overflow-tooltip="true"
                    width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.officefax }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.address"
                    :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>
                        {{scope.row.addressline}}{{scope.row.addressline?',':''}}{{ scope.row.suburb }}
                        {{ scope.row.state }}
                        {{ scope.row.postcode }}
                        {{ countryObj[scope.row.country] }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="rs.action"
                    width="200">
                    <template slot-scope="scope">
                      <span class="btntext" @click="handleEdit(scope.row)">{{!readonly?rs.edit:rs.detail}}</span>
                      <span class="btntext" @click="handleDelete(scope.row.firmid)" v-if="deletable">{{rs.delete}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
               <div class="table_footer" v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.partner_firms}}</div>
                  <div class="fr">
                      <el-pagination
                      :background="false"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="getData.pagenum"
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
  </div>
</template>

<script>

import { insertBrokerFirm, updateBrokerFirm, getBrokerFirm, deleteBrokerFirm } from '@/api/partnerApi.js'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import { Message } from 'element-ui'
import axios from 'axios'

export default{
  data() {
    return {
      total:0,//总条数
      start:1,//起始页
      end:10, //结束页
      getData:{
        agencyid: '',
        languagetype: '',
        pagenum:1,
        pagesize:20,
        condition:'',//搜索关键字
      },
      countryObj:{},
    BrokerFirmList:[],
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    },
  methods:{
      search(){
      this.getData.pagenum =1;
      this.getBrokerFirmList(this.getData)
    },
     handleAvatarSuccess(res, file) {
      this.$store.commit('SET_SHOW_LOADING',false)
      this.logo = file.response.path;
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
    handleMinprogress(event, file, fileList){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
      // 分页方法
    handleSizeChange(val) {//一页多少条
      this.getData.pagenum =1;
      this.getData.pagesize = val;
      this.getBrokerFirmList(this.getData)
    },
    handleCurrentChange(val) {//第几页
      this.getData.pagenum = val;
      this.getBrokerFirmList(this.getData)
    },
    // ----
    setIsUpdate(mode,id){
      if(mode){
        this.$router.push('/master_manage/partnerFirms/PartnerFirmDetail/save')
      }else{
        this.$router.push({path:'/master_manage/partnerFirms/PartnerFirmDetail/update',query:{id}})
      }
    },
    getBrokerFirmList(data){
      getBrokerFirm(data).then(res=>{
        if(res.data.success){
          this.BrokerFirmList = res.data.data;
          this.total = res.data.total;
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    handleEdit(data) {
      // 点击修改按钮
      this.setIsUpdate(false,data.firmid);
    },
    handleDelete(id) {
      // 删除
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteBrokerFirm({ids:id}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_delete_success)
            this.getBrokerFirmList(this.getData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
    });
    },
  },
  created(){
    // 获取语言资源表数据
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue;
    let countryList =JSON.parse(localStorage.getItem('selectlist')).Country;
    countryList.forEach(element => {
      this.countryObj[element.countryid] = element.countryname
    });
    this.countryObj = Object.assign({}, this.countryObj)
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    if(this.$route.params.id == 'agency'){
      this.getData.agencyid = userInfo.agencyid;
    }
    this.getBrokerFirmList(this.getData);
  },
  watch:{
    se(val){
      let countryList = val.Country;
      countryList.forEach(element => {
        this.countryObj[element.countryid] = element.countryname
      });
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
      readonly(){
        if(this.control.partner_firm ==='02'){
          return true
        }else{
          return false
        }
    },
    deletable(){
      if(this.control.partner_firm ==='99'){
        return true
      }else{
        return false
      }
    }
  },
}
</script>
