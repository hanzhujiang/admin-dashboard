<template>
  <div class="box clearfix" style="margin-bottom: 15px;">
    <div class="box-header">
      <div class="box-title">
        <span><i class="fa fa-comment-o" style="padding: 0px 10px 0px 0px;"></i>
        {{rs.office_comments}}</span>
      </div>
    </div>
    <div class="box-body" style="padding: 10px;">
      <div style="margin:5px;">
        <textarea :disabled="readonly" style="margin: 0px; width:96%;padding:2%;line-height:14px;min-height: 140px;font-size: 12px;line-height: 15px;border-color: #D3D3D3" v-model="saleAdviceData.officecomments" maxlength="500"></textarea>
      </div>
    </div>
    <div class="box-footer" style="margin: 0 20px 10px;">
      <div class="box-footer-tools center">
        <!-- <el-button class="bg_light_blue mini medium" size="mini" @click="save" v-if="!readonly"> -->
           <el-button   class="small block_button bg_green"  size="mini" @click="save" v-if="!readonly">
          {{rs.save}}</el-button>
        <el-button   class="mini medium" size="mini" @click="cancel" v-if="!readonly">
          <!-- <i class="fa fa-pencil"></i> -->
          {{rs.clear}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { updateSaleComments } from '@/api/saleAdviceApi.js'
export default {
  data(){
    return{
    }
  },
  computed: {
  ...mapGetters(['se','rs','languagetype','saleAdviceData','control']),
    readonly(){
      if(this.control.reserve === '02'){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    save(){
      let data = {
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        officecomments:this.saleAdviceData.officecomments
      }
      updateSaleComments(data).then(res=>{
        if(res.data.success){
          let timestamp = (new Date()).getTime();
          this.$emit('childByValue', timestamp);
          this.$message.success(this.rs.info_msg_update_success)
        }else{
           this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    cancel(){
      this.saleAdviceData.officecomments = ''
    },
    ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },
  }
}
</script>

<style lang="scss" scoped>
  button.medium {
  color: #000;
}
</style>