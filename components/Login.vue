<template>
<div class="login_box">
    <div style="background: rgba(0,0,0,.4);height:100%">
      <div class="login_box_body">
        <div class="right_login">
          <div style="margin-bottom:30px">
            <img style="wdith:170;height:53px;margin-top:40px" src="../assets/imgs/logo@2x.png"  alt="" />
          </div>
          <!-- <p class="login_box_msg">Please Enter Your Information</p> -->
            <div class="el_inp_w">
              <div class="M_bott ">
              <el-input
                placeholder="Email"
                suffix-icon="fa fa-envelope-o"
                clearable
                v-model="formData.email" @blur="validatorBlur('email')">
              </el-input>
            <p class="validator" style="margin-top:3px;color:red" v-show="validatorSet.email.flg">{{rs[validatorSet.email.msg]}}</p>
            </div>
            <div class="M_bott " style="height:55px">
              <el-input
                placeholder="Password"
                clearable
                suffix-icon="fa fa-lock"
                v-model="formData.password"
                type="password" @keyup.enter="login" @blur="validatorBlur('password')">
              </el-input>
            <p class="validator" style="margin-top:3px;color:red" v-show="validatorSet.password.flg">{{rs[validatorSet.password.msg]}}</p>
            </div>
            <div class="M_bott " style="color:#409EFF;font-size:14px">
              <span @click="ForgotPassword" style="padding-top:30px;cursor: pointer;">Forgot password?</span>
            </div>
            <el-row class="l_height">
            <el-col :span="24">
              <div>
                <el-button type="primary"   class="bg_blue" style="width:100%" @click="login">Sign In</el-button>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="M_bott" style="line-height: 30px;padding-top:13px">
                <el-tooltip content="Use with caution on public computers" placement="bottom" effect="light">
                  <el-checkbox v-model="localStorageUser">Remember Me</el-checkbox>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import { getRoleFunctionByRoleID } from '@/api/roleApi.js'
import { getSelectList, userLogin } from '@/api/userApi.js'
import { getResourceJson,getJSONDataSaleResource  } from '@/api/resourceApi.js'
import { validator, allvalidator } from '@/validator/validator.js'
export default {
  data() {
    return {
      username: '',
      localStorageUser:false,
      password: '',
      formData:{
        email:'',
        password:'',
        usertype:"01"
      },
      rs:{
        err_msg_email:'Incorrect Email format',
        err_msg_require:'This is required!'
      },
      validatorSet: {
        email: {
          vaid: ["Email",'noNull'],
          flg: false,
          msg: ""
        },
        password:{
          vaid: ['noNull'],
          flg: false,
          msg: ""
        },
      },
    }
  },
  created(){
    if(localStorage.getItem('LocalUser')){
      this.formData = JSON.parse(localStorage.getItem('LocalUser'))
      this.localStorageUser = this.formData.checked;
    }
    // var lett = this;
    //   document.onkeydown = function(e) {
    //     var key = window.event.keyCode;
    //     if (key == 13) {
    //     lett.login();
    //     }
    //   }
  },
  methods:{
    validatorBlur(key) {
      validator(this.validatorSet, this.formData,key);
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
     ForgotPassword(){
      this.$router.push({name:"forgotPassword",query:{email:this.formData.email}})  
    },
    login(){
      if (allvalidator(this.validatorSet, this.formData)) {
        return;
      }
      let breadList = [];
      localStorage.setItem('breadListStorage',JSON.stringify(breadList));
      console.log('登陆信息',this.formData);
      
      userLogin(this.formData).then(res=>{
        console.log('返回信息',res);        
        if (res.data.success) {    
          if(this.localStorageUser){
            this.formData.checked =this.localStorageUser;
            localStorage.setItem('LocalUser',JSON.stringify(this.formData))
          }else{
            localStorage.removeItem('LocalUser');
          }
          var languagetype = res.data.resultset.languagetype;
          // 权限控制
          getRoleFunctionByRoleID({roleid:res.data.resultset.roleid,languagetype:res.data.resultset.languagetype,systemtype:'0'}).then(res=>{
          // console.log(res,'权限')
          if(res.data.success){
            let controlObj={};
            let controlRouterObj = {};
            res.data.data.forEach(element => {
              // console.log(element,'sss')
              controlObj[element.functionid]=element.operationtype==='01'?false:element.operationtype;
              if (element.routerpath != null && element.routerpath != '') {
                var routerpath = element.routerpath.split(';')
                routerpath.forEach(router => {
                  controlRouterObj[router] = element.operationtype;  
                })
              }  
            });
            this.$store.commit('CONTROL',controlObj)
            this.$store.commit("CONTROL_ROUTER", controlRouterObj);
          }
        })
        // 获取所有下拉框资源
        getSelectList({'languagetype': res.data.resultset.languagetype}).then(res=>{
          this.$store.commit('SELECT_LIST',res.data)
          localStorage.setItem('selectlist',JSON.stringify(res.data))//本地存放Select所有list
        })
        
       
        localStorage.setItem("userInfo",JSON.stringify(res.data.resultset));//用户信息存本地 
        localStorage.setItem('languagetype',languagetype) //本地全局语言Type
        this.$store.commit('LANGUAGE_TYPE',languagetype)
        // //////////////////////////
        sessionStorage.setItem("token", res.data.token);//token存本地
        sessionStorage.setItem("agentid", res.data.resultset.referid);  

        // sale -多语言设置
        // getJSONDataSaleResource
        getJSONDataSaleResource({'languagetype':languagetype,systemtype:'0'}).then(res=>{
            if (res.data.success) {
              // console.log(res.data,'salse-rs')
              this.$store.commit('SALES_RESOURCE_LIST',res.data.data[languagetype])
              localStorage.setItem('salesresourcelist',JSON.stringify(res.data.data[languagetype]?res.data.data[languagetype]:null))  //存放所有语言资源表  
            } else {
              this.$message.error({message:res.data.errorMsg});
            }
          })
        // 获取所有的多语言资源
         getResourceJson({'languagetype':languagetype,systemtype:'0'}).then(res=>{
            if (res.data.success) {
              this.$store.commit('RESOURCE_LIST',res.data.data[languagetype])
              localStorage.setItem('resourcelist',JSON.stringify(res.data.data[languagetype]))  //存放所有语言资源表  
              this.$router.push({path:'/index'})
              this.$message({
                message: 'Login Success',
                type: 'success'
              }); 
            } else {
              this.$message.error({message:res.data.errorMsg});
            }
          })


        }else{
          this.$message.error({message:res.data.errorMsg});
        }
      })
    }
  }
}
</script>

<style scoped>
.login_box {
  position:absolute;
  /* background: rgba(0,0,0,.4); */
  width:100%;
  height:100%;
  text-align: center;
  background-image: url('../assets/imgs/pictureArc@2x.jpg') !important;
  background-size:cover;
}
.submit_btn {
  background: #353642;
  border-color: #353642;
  width:100%;
}
.submit_btn:hover{
  background: #FFA500;
  border-color: #FFA500;
}

.login_logo{
  margin:37px 0; 
  width: 374px;
  height: 156px;
  display: inline-block;
}
.head_tp{
  width: 848px;
  display: inline-block;
  position: absolute;
}
.login_box_body{
  border-top: 0;
  color: #666;
  width: 334px;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  position:relative;
  margin-top: 140px;
}
.left_tp{
  width: 530px;
  height: 424px;
}

.right_login{
  position: relative;
  background: #FFF;
  width: 334px;
  height: 404px;
}
.login_box_msg{
  padding: 40px 0 60px 0;
  font-size: 16px;
}
.M_bott{
  height: 60px;
  text-align:left;
}
.el_inp_w{
  width: 254px;
  position: absolute;
  left: 50%;
  margin-left: -127px;
}
</style>
<!--
<style scoped>
.login_box{
  text-align: center
}
.login_logo{
  margin:60px 0 25px; 
  width: 300px;
  height: 156px;
  display: inline-block;
}
.head_tp{
  width: 848px;
  display: inline-block;
  position: absolute;
}
.login_box_body{
  border-top: 0;
  color: #666;
  width: 848px;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 240px;
}
.left_tp{
  width: 530px;
  height: 424px;
}
img{
  width: 100%;
}
.right_login{
  position: relative;
  background: #FFF;
  width: 318px;
  height: 424px;
}
.login_box_msg{
  padding: 40px 0 60px 0;
  font-size: 16px;
}
.M_bott{
  margin-bottom: 41px;
}
.el_inp_w{
  width: 254px;
  position: absolute;
  left: 50%;
  margin-left: -127px;
}
.l_height{
  line-height: 55px;
}
/* @media (max-width:769px){
  .login_box_body{
    width: 80%;
  }
} */
</style>

-->