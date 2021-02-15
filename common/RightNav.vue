<template>
  <div class="right-nav" style="margin: 0 20px 0 5px;" @click.stop="userInfoInit">
    <el-row class="function_block">
      <p class="title">{{rs.change_password}}</p>
      <p class="sub_title">{{rs.new_password}}</p>
      <el-input clearable size="small" type="password" style="width:100%" v-model="newPassword1"></el-input>
      <p class="sub_title">{{rs.confirm_password}}</p>
      <el-input clearable size="small" type="password" style="width:100%" v-model="newPassword2"></el-input>
      <el-button   class="small bg_button fr" style="margin:10px 0" size="small" @click="setPassword">{{rs.submit}}</el-button>
    </el-row>
    <el-row class="function_block" v-if="control.bind_agency&&!readonlyBind">
      <p class="title">{{rs.bind_agency}}</p>
      <p class="sub_title">{{rs.agency}}</p>
      <el-select v-model="formData.agencyid" filterable placeholder=" "  style="width:100%" size="small" >
        <el-option
        v-for="(item,i) in agencyList"
        :key="i"
        :label="item.shortname"
        :value="item.agencyid">
        </el-option>
      </el-select>
      <el-button   class="small bg_button fr" style="margin:10px 0" size="small" @click="bind">{{rs.bind}}</el-button>
    </el-row>
    <el-row class="function_block" v-if="control.replace_login&&!readonlyReplace">
      <p class="title">{{rs.replace_login}}</p>
      <el-button   class="small bg_button fr" size="mini" @click="vicariousLogin" >{{rs.go}}</el-button>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { bindAgency, modifyPassword } from '@/api/userApi.js'
import { getAgencyList } from '@/api/agencyApi.js'
export default{
    data() {
    return {
      getAgencyData:{
        languagetype:'01'
      },
      formData:{
        agencyid:''
      },
      newPassword2:'',
      newPassword1:'',
      agencyList:[],
      checked1:'',
      flg:false,
    }
  },
  methods:{
    userInfoInit(){
    //这个函数别删. 空函数也有用
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
    // 修改密码
    setPassword(){
      
      if(this.newPassword1 ===this.newPassword2){
        modifyPassword({userid:this.userid,password:this.newPassword2}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_modify_password_succe);
            // this.$router.push({path:'/'})
            this.$emit("sendmsg",'sidebar_right_min')
          }else{
            this.$message.error(this.rs.err_msg_modify_password_faild);
          }
        })
      }else{
        this.$message.error(this.rs.err_msg_password_unmatched)
      }
    },
    bind(){
      bindAgency(this.formData).then(res=>{
        localStorage.setItem("userInfo",JSON.stringify(res.data.data));//用户信息存本地
        if(res.data.success){
          this.$message.success(this.rs.bind + this.rs.ok)
          // this.$router.push({path:'/index'});
           this.$emit("sendmsg",'sidebar_right_min')
          this.$emit('bindSuccess')
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    vicariousLogin(){
      this.$router.push({path:'/replaceLogin'})
    },
    getStatus (urlStr) {
      var urlStrArr = urlStr.split('/')
      return urlStrArr[urlStrArr.length - 1]
    }
  },
  created(){
    this.getAgency(this.getAgencyData);
    this.userid =JSON.parse(localStorage.getItem('userInfo')).userid;
    // bind_agency
    // replace_login
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonlyBind(){
      if(this.control.bind_agency ==='02'){
        return true
      }else{
        return false
      }
    },
    readonlyReplace(){
      if(this.control.replace_login ==='02'){
        return true
      }else{
        return false
      }
    }
  },
}
</script>
<style scope>
.right-nav{
  width: 280px;
  min-height: 1024px;
  background: #ffffff;
  color: #FFF;
}
.function_block {
  margin:10px 15px 0 15px;
}
.function_block>.title {
  padding: 10px 0 5px 0;
  font-size: 12px;
  font-weight: bold;
  color: yellow;
  font-size: 14px;
  /* font-family: SFUIDisplay-Bold; */
  font-weight: bold;
  color: rgba(32,42,71,1);
}
.function_block>.sub_title {
  font-size: 12px;
  padding:10px 0 10px 0;
  color:rgba(85,91,103,1);
}
.bg_button{
  background:rgba(76,75,213,1);
  border-radius:3px;
  color: #FFF;
}
</style>
