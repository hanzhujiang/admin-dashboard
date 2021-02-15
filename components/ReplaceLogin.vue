<template>
  <div class="login_box">
    <div class="login_logo">
      <img src="../assets/imgs/arc-logo.png" alt="">
    </div>
    <div class="login_box_body">
      <p class="login_box_msg M_bott">Please Enter Your Information</p>
      <div class="M_bott">
        <el-input
          placeholder="email"
          suffix-icon="fa fa-envelope-o"
          clearable
          v-model="params.email">
        </el-input>
      </div>
      <el-row class="l_height">
        <el-col :offset="8" :span="8">
          <el-button type="primary"   style="width:100%" @click="login">Sign In</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  
</template>
<script>
import{ substituteLogin } from '@/api/userApi.js'
import{ getRoleFunctionByRoleID } from '@/api/roleApi.js'
import{ mapGetters } from "vuex";
  export default {
  data() {
    return {
      params:{
        email:'',
      },
    }
  },
  methods:{
    login(){
      substituteLogin(this.params).then(res=>{
        localStorage.setItem("userInfo",JSON.stringify(res.data.data));//用户信息存本地 
        if(res.data.success){
          getRoleFunctionByRoleID({roleid:res.data.data.roleid,languagetype:res.data.data.languagetype,systemtype:'0'}).then(res=>{
            if(res.data.success){
              let controlObj={};
              let controlRouterObj = {};
              res.data.data.forEach(element => {
                controlObj[element.functionid]=element.operationtype==='01'?false:element.operationtype;
                if (element.routerpath != null && element.routerpath != '') {
                  var routerpath = element.routerpath.split(';')
                  routerpath.forEach(router => {
                    controlRouterObj[router] = element.operationtype;  
                  })
                  // controlRouterObj[element.routerpath] = element.operationtype;  
                }  
              });
            this.$store.commit('CONTROL',controlObj)
            this.$store.commit("CONTROL_ROUTER", controlRouterObj);
            }
          })
          this.$router.push({path:'/index'});
          this.$message({message: this.rs.info_msg_login_success, type: 'success'}); 
        }else{
           this.$message.error({dangerouslyUseHTMLString:true, message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    }
  },
  computed: {
    ...mapGetters(['rs']),
  },
}
</script>
<style scoped>
.login_box{
  background: #d2d6de;
  width: 100%;
  min-height: 1024px;
  text-align: center;
  padding-top: 7%;
}
.login_logo{
  text-align: center;
  margin: 0 0px 4% 0px;
}
.login_logo>img{
  width: 250px;
}
.login_box_body{
  background: #fff;
  padding: 20px;
  border-top: 0;
  color: #666;
  width: 360px;
  height: 200px;
  text-align: center;
  display: inline-block;
}
.M_bott{
  margin-bottom: 20px;
}
.l_height{
  line-height: 60px;
}
/* @media (max-width:769px){
  .login_box_body{
    width: 80%;
  }
} */
</style>

