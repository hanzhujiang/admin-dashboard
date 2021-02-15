<template>
  <el-select v-model="country" slot="prepend" 
    size="small" placeholder="" clearable>
    <el-option
      v-for="item in countryList"
      :key="item.countryid"
      :label="item.countryname"
      :value="item.countryname">
    </el-option>
  </el-select>
</template>
<script>
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      countryList:[]
    }
  },
  props:['country'],
  computed: {
    ...mapGetters(['se','rs'])
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
