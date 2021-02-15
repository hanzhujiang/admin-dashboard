<template>
  <div class="wrapper clearfix">
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.project_detail}} - {{project_name}}</span>
      </div>
      <div class="tools">
        <el-button   class="bg_save_btn" v-if="!readonly" @click="handleSave" size="small">{{rs.save}}</el-button>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <img src="../../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.display_information}}</span>
              </div>
            </div>
            <div class="box-body clearfix">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="form-group">
                        <div class="sub-title">VR Url</div>
                        <div class="content">
                          <el-input maxlength="100" :disabled="readonly" v-model="formData.vrurl" size="small" clearable></el-input>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <address-area :formData="formData" style="margin-top:20px" :validatorSave='validatorSave' :readonly="readonly"></address-area>
                  <el-row :gutter="20" style="padding-top:54px;">
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                      <!-- <el-input v-model="formData.longitude" placeholder=""  :disabled="true" size="small" @blur="validatorBlur('longitude')"></el-input>
                      <p class="curtail" v-show="validatorSave.latitude.flg">{{rs[validatorSave.latitude.msg]}}</p> -->
                      <el-input v-model="formData.longitude" placeholder=""  :disabled="true" size="small"></el-input>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                      <!-- <el-input v-model="formData.latitude" placeholder=""  :disabled="true" size="small" @blur="validatorBlur('latitude')"></el-input>
                      <p class="curtail" v-show="validatorSave.latitude.flg">{{rs[validatorSave.latitude.msg]}}</p> -->
                      <el-input v-model="formData.latitude" placeholder=""  :disabled="true" size="small"></el-input>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                      <div class="content">
                        <el-button   class="small bg_blue" size="small" @click="setmap" v-if="!readonly">{{rs.get_coordinate}}</el-button>
                      </div>
                      
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <div class="form-group">
                        <div class="sub-title">{{rs.comments}}</div>
                        <div class="content" >
                          <el-input type="textarea" rows=6 :disabled="readonly" class="tex-bor" clearable maxlength="500"
                              v-model="formData.comment" size="small">
                          </el-input>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <bing-map-layer
                    id="displayAddress"
                    :singleAddress="singleaddress"
                    :isCoordinate="mod"
                    :callback="showDailog"
                    @getLocationNums="getLocationNums"
                    :onInitSuccess="init"
                    :isClickable="true"
                    style="height:320px;width:100%;margin:10px 10px 5px 0;">
                    >
                  </bing-map-layer>
                </el-col>
              </el-row>  
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    </form>
  </div>
</template>
<script>
import { insertUpdateDisplayInfo, getDisplayInfo, deleteDisplayInfo } from '@/api/projectApi.js'
import { validator, allvalidator} from '@/validator/validator.js'
import { Message } from 'element-ui'
import { toAddressString } from "@/assets/js/utility.js"
import { mapGetters } from "vuex";

export default{
  data() {
    return {
      project_name:'',
      isFullEdit:'0',
      longitudeFlg:false,
      singleaddress:{
        code:'',
        text:''
      },//地图地址
      mod:false,
      projectid:'',
      formData:{
        displayid:"",
        projectid:'',
        addressline:'',
        addressline2:'',
        suburb:'',
        state:'',
        postcode:'',
        country:'',
        latitude:'',
        longitude:'',
        comment:'',
      },
      validatorSave:{
        // longitude:{
        //   vaid:['noNull'],
        //   flg:false
        // },
        // latitude:{
        //   vaid:['noNull'],
        //   flg:false
        // }
      },
    }
  },
  components: {
    // 'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    'bing-map-layer':resolve=> require(['@/common/BingMapLayer.vue'],resolve),
    // 'navigation':resolve=> require(['../edit_project/template/navigation.vue'],resolve),
    },
  methods:{
    //清空
    handleClear(){
      deleteDisplayInfo({ids:this.$router.currentRoute.params.id}).then(res=>{
       if (res.data.success) {
        this.formData = {}
        this.$message.success(this.rs.info_msg_update_success)
        } else {
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // validatorBlur(key){
    //   validator(this.validatorSave,this.formData,key)
    // },
    getLocationNums (...data) {
      this.position = data[0];
    },
    // 回调
    showDailog(code, pos_x, pos_y, latitude, longitude) {
      this.formData.latitude = latitude;
      this.formData.longitude = longitude;
    },
    showDailog1(code, pos_x, pos_y, latitude, longitude) {
      this.formData.latitude = latitude;
      this.formData.longitude = longitude;
    },
    init(){
      this.mod=true;
      this.singleaddress = {
        code:'001',
        text:toAddressString(this.formData, false),
        longitude:this.formData.longitude,
        latitude:this.formData.latitude,
        category: '99'
      }
    },
    setmap(){
      this.mod=false;
      this.singleaddress = {
        code:'001',
        text:toAddressString(this.formData, false),
        category: '99'
      }
      this.singleaddress = Object.assign({},this.singleaddress)
    },
    handleSave(){
      // if(allvalidator(this.validatorSave,this.formData)){
      //     return
      //   }
      this.formData.projectid = this.$router.currentRoute.params.id;
      insertUpdateDisplayInfo(this.formData).then(res=>{
        if(res.data.success){
          this.$message.success(this.rs.info_msg_update_success)
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
  created(){
    this.isFullEdit = sessionStorage.getItem('isFullEdit');
    // 获取语言资源表数据
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.projectid =this.$router.currentRoute.params.id;
    getDisplayInfo({projectid:this.$router.currentRoute.params.id}).then(res=>{
      if(res.data.success){
        this.formData = res.data.data;
        this.init();//防止地图加载完成后，接口数据没获取到，导致地图无法显示；
      }else{
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      }
    });
    this.getName()
  },
  watch:{
    languagetype(){
     this.getName()
    }
  },
  computed: {
    ...mapGetters(['rs','languagetype','control']),
    readonly(){
      if(this.control.project_detail ==='02' || this.isFullEdit === '0'){
        return true
      }else{
        return false
      }
    },
  },
}

</script>
<style scoped>
.box-body{
  background: #FFF;
  padding-bottom:40px; 
}
</style>


