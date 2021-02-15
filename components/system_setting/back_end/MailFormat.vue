<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.mail_format}}</span>
      </div>
       <div class="tools">
          <span v-if="!readonly" @click="goRouter('/system_setting/mailFormatDetail/save0')" class="btn_text">
            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
            <span>{{rs.add_new_format}}</span>
          </span>
        </div>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="box">
            <div class="box-body">
              <div class="table_box">
                <el-table
                  :empty-text = rs.no_data
                  :data="formatList"
                  style="width: 100%"
                  :show-overflow-tooltip="true"
                  size="mini">
                  <el-table-column
                    prop="formatid"
                    :label="rs.format_id">
                  </el-table-column>
                  <el-table-column
                    prop="title"
                    :label="rs.title">
                  </el-table-column>
                  <el-table-column
                    label="	"
                    width="200px">
                    <template slot-scope="scope">
                      <span class="btntext" @click="handleUpdate(scope.row)" v-if="!readonly">{{!readonly?rs.edit:rs.detail}}</span>
                      <span class="btntext" @click="handleDelete(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getFormat, deleteMail } from '@/api/systemSettingApi.js'
export default{
  data() {
    return {
      formatList:[]
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
  },
  created(){
    this.getFormatList()
  },
  methods:{
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    goRouter(path){
      this.$router.push({path})
    },
    handleUpdate(data){
      sessionStorage.removeItem('formatid')
      this.$router.push({path:'/system_setting/mailFormatDetail/update0',query:{id:data.formatid}})
    },
    handleDelete(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
          deleteMail({systemtype:row.systemtype,formatid:row.formatid}).then(res=>{
            if(res.data.success){
              this.$message.success(this.rs.info_msg_delete_success)
              this.getFormatList(this.getData);
            }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      });
    },
    getFormatList(){
      getFormat({systemtype:'0'}).then(res=>{
      if (res.data.success) {
        this.formatList = res.data.data
      } else {
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      }
      })
    }
  },
    computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
        if(this.control.backend_other_setting ==='02'){
            return true
        }else{
            return false
        }
    }
  }
}
</script>