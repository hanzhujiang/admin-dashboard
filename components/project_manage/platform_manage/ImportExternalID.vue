<template>
  <div class="wrapper clearfix" v-loading.fullscreen="loading" :element-loading-text="rs.loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.import_externalid}}</span>
        </div>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box">
              <div class="box-body">
                <el-row :gutter="10" class="line-first">
                  <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <label class="title">{{rs.agency}}<span class="required">*</span></label>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <el-select v-model="formData.agencyid" filterable placeholder=" "  style="width:100%" size="small"
                      @change="validatorBlur('agencyid')">
                      <el-option
                      v-for="(item,i) in agencyList"
                      :key="i"
                      :label="item.shortname"
                      :value="item.agencyid">
                      </el-option>
                    </el-select>
                    <p class="curtail" v-show="validatorImport.agencyid.flg">{{rs[validatorImport.agencyid.msg]}}</p>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="line">
                  <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <label class="title">{{rs.external_type}}<span class="required">*</span></label>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <el-select v-model="formData.externaltype" filterable placeholder=" "  style="width:100%" size="small"
                    @change="validatorBlur('externaltype')">
                      <el-option
                      v-for="(item,i) in externalTypeList"
                      :key="i"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="curtail" v-show="validatorImport.externaltype.flg">{{rs[validatorImport.externaltype.msg]}}</p>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <label class="bg_save_btn">
                      <span>{{rs.import_project_externalid}}</span>
                      <input ref='fileInput' class="file" style="display:none" name="file" type="file" @change="handleImportProject" />
                    </label>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <label class="bg_save_btn">
                      <span>{{rs.import_property_externalid}}</span>
                      <input ref='fileInput2' class="file" style="display:none" name="file" type="file" @change="handleImportProperty" />
                    </label>
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
import { mapGetters } from "vuex";
import { getAgencyList } from '@/api/agencyApi.js'
import { validator, allvalidator } from '@/validator/validator.js'
import axios from "axios";
export default{
  data() {
    return {
      uploadFileUrl_project:'',
      uploadFileUrl_property:'',
      loading: false,
      getAgencyData:{
        languagetype:'01'
      },
      formData:{
        agencyid:'',
        externaltype:''
      },
      agencyList:[],
      externalTypeList:[
        {label: 'Salesforce', value: 'Salesforce'}
      ],
      validatorImport:{
        agencyid:{
          vaid:['noNull'],
          flg:false
        },
        externaltype:{
          vaid:['noNull'],
          flg:false
        },
      },
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
  },
  created(){
    this.getAgency(this.getAgencyData);
    this.uploadFileUrl_project = axios.defaults.baseURL + "special/importProjectExternalID"; 
    this.uploadFileUrl_property = axios.defaults.baseURL + "special/importPropertyExternalID"; 
  },
  methods:{
    validatorBlur(key){
      validator(this.validatorImport,this.formData,key);
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
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
    handleImportProject(e) {
      if(allvalidator(this.validatorImport,this.formData)){
        this.$refs.fileInput.value =''
        return
      }

      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("uploadXls", file, file.name); //通过append向form对象添加数据
      param.append("agencyid", this.formData.agencyid);
      param.append("externaltype", this.formData.externaltype);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      this.loading = true;
      axios.post(this.uploadFileUrl_project, param, config).then(res => {
        this.loading = false;
        this.$refs.fileInput.value =''
      }).catch(response=>{
        this.loading = false;
        this.$refs.fileInput.value =''
        this.$message.error('system error');
      });
    },

    handleImportProperty(e) {
      if(allvalidator(this.validatorImport,this.formData)){
        this.$refs.fileInput2.value =''
        return
      }

      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("uploadXls", file, file.name); //通过append向form对象添加数据
      param.append("agencyid", this.formData.agencyid);
      param.append("externaltype", this.formData.externaltype);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      this.loading = true;
      axios.post(this.uploadFileUrl_property, param, config).then(res => {
        this.loading = false;
        this.$refs.fileInput2.value =''
      }).catch(response=>{
        this.loading = false;
        this.$refs.fileInput2.value =''
        this.$message.error('system error');
      });
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
  }
}
</script>
<style lang="scss" scoped>
.required{
  color: red;
}
.curtail{
  color: red;
  font-size:12px;
  padding: 5px 0;
}
.bg_save_btn{
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
