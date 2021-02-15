<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="form-group">
          <div class="sub-title-first">{{rs.address_line}}</div>
          <div class="content" >
            <el-autocomplete
            v-model="formData.addressline"
            :disabled="readonly"
            style="width:100%"
            size="small"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
          ></el-autocomplete>
            <!-- <el-input v-model="formData.addressline" @change="getAddress" :disabled="readonly" size="small" maxlength="200" clearable></el-input> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="form-group">
          <div class="sub-title">{{lableLine2?lableLine2:rs.address_line2}}</div>
          <div class="content" >
            <el-input v-if="lableLine2" v-model="formData.pobox" maxlength="30" :disabled="readonly" size="small" clearable></el-input>
            <el-input  v-model="formData.addressline2" maxlength="200" :disabled="readonly" size="small" clearable v-else> </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="form-group">
          <div class="sub-title">{{rs.suburb}}</div>
          <div class="content" >
            <el-input v-model="formData.suburb" maxlength="50" :disabled="readonly" size="small" clearable></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="form-group">
          <div class="sub-title">{{rs.state}}</div>
          <div class="content" >
            <el-input v-model="formData.state" size="small"  :disabled="readonly" maxlength="50" clearable></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="form-group">
          <div class="sub-title">{{rs.postcode}}</div>
          <div class="content" >
            <el-input v-model="formData.postcode" size="small" :disabled="readonly" maxlength="10" clearable ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
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
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
import axios from 'axios'
export default{
  data() {
    return {
      countryList:[],
      restaurants:[],
      timeout:  null
    }
  },
  props:['formData','validatorSave','lableLine2','readonly',],
  computed: {
    ...mapGetters(['se','rs'])
  },
  mounted() {
  },
  methods:{
    querySearchAsync(queryString, cb) {
      let bingUserKey = 'Auo7-fEnp8EOjGFag5FfgCc1yicQTVTAcu06EN4_z-r1u3vxVKJbhty97i24snz-';
      let url = 'https://dev.virtualearth.net/REST/v1/Autosuggest?query='+ queryString +'&includeEntityTypes=Address,Place&countryFilter=AU&key=' + bingUserKey;
      if(queryString != ''){
        axios.get(url).then((response) => {
          if(response.data.statusCode == '200'){
            let addressList = response.data.resourceSets[0].resources[0].value;
            let addressInputList = [];
            addressList.forEach((ele,i)=>{
              addressInputList.push({value:ele.address.formattedAddress,obj:ele.address})
            })
            cb(addressInputList);
          }else {
            cb([]);
          }
        })
      }
     
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.formData.addressline = item.obj.addressLine;
      this.formData.suburb = item.obj.locality;
      this.formData.state = item.obj.adminDistrict;
      this.formData.postcode = item.obj.postalCode;
      this.formData.country = '001';
    }
  },
  created(){
    this.countryList =JSON.parse(localStorage.getItem('selectlist')).Country;
  },
  watch:{
    se(val){
      this.countryList = val.Country
    }
  }
}
</script>
