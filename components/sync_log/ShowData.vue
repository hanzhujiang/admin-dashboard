<template>
    <el-dialog
      :title="rs.sync_data"
      :close-on-click-modal='false'
      :visible.sync="visible"
      width='60%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.sync_data}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-input type="textarea" rows=20 readonly class="tex-bor" v-model="jsondata" size="small"></el-input>
      </div>
      <div class="dailog-footer-tools">
        <div class="fr">
          <span v-clipboard:copy="jsondata" v-clipboard:success="onCopySuccess" 
              v-clipboard:error="onCopyError" class="btntext">{{rs.copy_to_clipboard}}</span>  
        </div>
      </div>
    </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getSolicitorList } from '@/api/solicitorApi.js'
export default{
  data() {
    return {
      visible: this.sync,
      jsondata: this.data
    }
  },
  props:['sync', 'data'],
  watch:{
    sync(val){
      this.visible = this.sync;
    },
    data(val){
      this.jsondata = this.data;
    },
  },
  computed: {
    ...mapGetters(['se','rs','languagetype'])
  },
  created(){
  },
  methods: {
    onCopySuccess() {
      this.$message.success(this.rs.info_msg_copy_success)
    },
    onCopyError() {
      this.$message.success(this.rs.info_msg_copy_failed)
    },
  }
}
</script>
