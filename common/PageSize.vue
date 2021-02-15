<template>
  <div class="filter-count">
    <span class="filter-text">{{rs.showing}}</span>
    <el-select v-model="pagesize1" size='mini' @change="handleSizeChange">
      <el-option
      v-for="item in selectPagesize"
      :key="item.intvalue"
      :label="item.intvalue"
      :value="item.intvalue">
      </el-option>
    </el-select>
    <span class="filter-unit">{{unit}}</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
  export default{
    data() {
      return {
        pagesize1:'',
        selectPagesize:[],
      }
    },
    props:['pagesize','unit','size'],
    computed: {
      ...mapGetters(['se','rs','languagetype']),
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('changeSize', val)
      }
    },
    created(){
      this.selectPagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST;
      if(this.size){
        this.pagesize1 = this.size;
      }else{
        this.pagesize1 = this.selectPagesize[0].intvalue;
      }
    },
    watch:{

    }
  }
</script>
