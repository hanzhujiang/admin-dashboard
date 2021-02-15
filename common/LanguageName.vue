<template>
<el-dialog
    :visible.sync="visible"
    :sync="sync"
    :close-on-click-modal='false'
    width='600px'
    @close="$emit('update:sync')"
    >
    <template slot="title">
      <div class="dialog-header">
        <span class="title">{{rs.language}}</span>
      </div>
    </template>
    <div class="dialog-body">
      <el-row :gutter="10" style="font-weight: bold;">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <span style="padding-left: 10px;">{{rs.language}}</span>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <span style="padding-left: 15px;">{{rs.name}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"  v-for="(d) in langList" :key="d.type">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="form-group-flag" style="padding: 10px; line-height: 40px;">
            <!-- <img :src="d.countryflag" alt=""> -->
            <span>{{d.languagename}}</span>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="form-group-flag"  style="padding: 10px; line-height: 40px;">
            <form autocomplete="on">
              <el-input v-model="langData[d.languageid]"  :maxlength="labelName=='shortname'?30:100" size="small" clearable></el-input>
            </form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dailog-footer-tools">
      <el-row>
        <el-col :span="12">
          <div class="fl">
            <el-button   class="small" style="color:#000;" @click="$emit('update:sync')">
            {{rs.close}}</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="fr">
            <el-button   class="small bg_blue" @click="setName">
            {{rs.set}}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      visible: this.sync,
      langList:[],
      langData:{}
    }
  },
  props:['sync','nameData','labelName'],
  watch:{
    sync(val){
      this.visible = this.sync;
        if(val){
          for(var key in this.nameData){
            
            this.langData[key] = this.nameData[key]
          }
          this.langData  = Object.assign({},this.langData)
        }
    },
    se(val){
      this.langList =val.Language;
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype']),
  },
  created(){
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
  },
  methods: {
      setName(){
      for(var key in this.langData){
          this.nameData[key] = this.langData[key]
        }
        this.$emit('savename',this.labelName)
        this.$emit('update:sync');
      }
  }
}
</script>
