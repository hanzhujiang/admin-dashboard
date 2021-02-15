<template>
  <div>
    <form  autocomplete="on">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="form-group">
            <div class="sub-title-first">{{rs.bank}}</div>
            <div class="content" >
              {{formData.bankname}}
              <!-- <el-input v-model="formData.bankname" :disabled="readonly"  size="small" maxlength="50" clearable></el-input> -->
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="form-group">
            <div class="sub-title-first">{{rs.account_name}}</div>
            <div class="content" >
              {{formData.accountname}}
              <!-- <el-input v-model="formData.accountname"  :disabled="readonly" maxlength="50" size="small" clearable></el-input> -->
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="form-group">
            <div class="sub-title">{{rs.bsb}}</div>
            <div class="content" >
              {{formData.bsb}}
                <!-- <el-input v-model="formData.bsb" size="small" maxlength="10"  :disabled="readonly" clearable></el-input> -->
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="form-group">
            <div class="sub-title">{{rs.account_number}}</div>
            <div class="content" >
              {{formData.accountnumber}}
                <!-- <el-input v-model="formData.accountnumber" maxlength="20"  :disabled="readonly" size="small"  clearable @blur="validatorBlur('accountnumber')"></el-input>
                <p class="curtail" v-show="validatorSave.accountnumber.flg">{{rs[validatorSave.accountnumber.msg]}}</p> -->
            </div>
          </div>
        </el-col>
      </el-row>
    <!-- <el-input type="password" autocomplete="off"></el-input> -->
     </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
  export default{
    props:['formData','validatorSave','readonly'],
    computed: {
      ...mapGetters(['se','rs'])
    },
    methods:{
      validatorBlur(key){
        validator(this.validatorSave,this.formData,key)
      },
    }
             
  }
</script>
