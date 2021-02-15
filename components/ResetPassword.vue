<template>
<div class="login_box">
    <div style="background: rgba(0,0,0,.4);height:100%">
      <div class="login_box_body">
        <div class="right_login">
          <div style="margin-bottom:20px">
            <img style="wdith:170;height:53px;margin-top:40px" src="../assets/imgs/logo@2x.png"  alt="" />
          </div>
           <p class="login_box_msg" style="font-weight: bold;">Reset Your Password</p>
          <div class="el_inp_w">
           <div class="M_bott " style="padding-top:10px">
              <el-input
                placeholder="Verification Code"
                suffix-icon="fa fa-envelope-o"
                clearable
                v-model="formData.verificationcode"  @blur="validatorBlur('verificationcode')">
              </el-input>
              <p class="validator" style="margin-top:3px;color:red" v-show="validatorSet.verificationcode.flg">{{rs[validatorSet.verificationcode.msg]}}</p>
            </div>
            <div class="M_bott ">
              <el-input
                placeholder="New Password"
                suffix-icon="fa fa-envelope-o"
                type="password"
                clearable
                v-model="formData.password" @blur="validatorBlur('password')">
              </el-input>
              <p class="validator" style="margin-top:3px;color:red" v-show="validatorSet.password.flg">{{rs[validatorSet.password.msg]}}</p>

            </div>
            <div class="M_bott " style="margin-bottom:10px;height:40px">
              <el-input
                placeholder="Confirm New Password"
                suffix-icon="fa fa-envelope-o"
                type="password"
                clearable
                v-model="formData.confirm_password" @blur="validatorBlur('confirm_password')">
              </el-input>
              <p class="validator" style="margin-top:3px;color:red;" v-show="validatorSet.confirm_password.flg">{{rs[validatorSet.confirm_password.msg]}}</p>
            </div>

            <p class="validator" style="margin-top:3px;color:red;text-align: left;" v-show="errorMsg">{{rs[errorMsg]}}</p>
            <el-row style="padding-top:10px">
            <el-col :span="24">
              <div>
                <el-button type="primary" class="bg_blue"   style="width:100%" @click="ResetPassword">Submit</el-button>
              </div>
            </el-col>
          </el-row>
           <div style="padding-top:13px" >
            <span class="btn_text" style="font-size:14px"  @click="goBack">Back to sign in</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {userForgoResetPassword} from "@/api/userApi.js";
import { validator, allvalidator } from '@/validator/validator.js'

export default {
  data(){
    return{
      submit_d:false,
      rs:{  
        password_not:'Your password should have at least 8 characters, and contain at least 1 number and 1 letter.',
        password_confirm:'Confirm new password does not match.',
        err_msg_require:'This is required'
        
      },
      errorMsg:'',
      rememberPassword: false,
      formData: {
        password: "",
        confirm_password: "",
        verificationcode: "",
        email:''
      },
      // errmessage:'',
      validatorSet: {
        verificationcode:{
          vaid: ["noNull"],
          flg: false,
          msg: ""
        },
        password: {
          vaid: ["noNull"],
          flg: false,
          msg: ""
        },
        confirm_password:{
          vaid: ["noNull"],
          flg: false,
          msg: ""
        },
      },
      rs_enter_email:"Please enter the email",
      rs_enter_password:"Please enter the password",
      rs_remember_me:"Remember me",
      rs_login:"Login",
      rs_yes:"Yes",
      rs_no:"NO",
      rs_info_msg_login_again:"your account has been used to login on other device, would you login on this device again?",
      confirmShow:false,
      errmessage: '',
      resourceOK: false,
      selectListOK: false,
      systemSettingOK: false
    }
  },
  created(){
    this.formData.email = this.$route.query.email;
    if(this.rs){
      if(this.rs.login){
        this.rs_login = this.rs.login;
      }
      if(this.rs.remember_me){
        this.rs_remember_me = this.rs.remember_me;
      }
      if(this.rs.enter_email){
        this.rs_enter_email = this.rs.enter_email;
      }
      if(this.rs.enter_password){
        this.rs_enter_password = this.rs.enter_password;
      }
      if(this.rs.yes){
        this.rs_yes = this.rs.yes
      }
      if(this.rs.no){
        this.rs_no = this.rs.no;
      }
      if(this.rs.info_msg_login_again){
        this.rs_info_msg_login_again = this.rs.info_msg_login_again;
      }
    }
  },
  methods:{
    goRouter(path) {
      this.$router.push({
        path
      });
    },
    goBack(){
      this.goRouter('/')
    },
    validatorBlur(key) {
      validator(this.validatorSet, this.formData,key);
    },
    ResetPassword(){
      this.submit_d = true;
       if (allvalidator(this.validatorSet, this.formData)) {
        this.submit_d = false;
        return;
      }
      if(this.formData.confirm_password != this.formData.password){
        this.errorMsg = 'password_confirm'
        this.submit_d = false;
        setTimeout(() => {
          this.errorMsg = ''
        }, 3000);
        return
      }
      if(this.formData.password.length<8){
        this.errorMsg = 'password_not'
        this.submit_d = false;
        setTimeout(() => {
          this.errorMsg = ''
        }, 3000);
        return
      }
      userForgoResetPassword(this.formData).then(res=>{
        if(res.data.success){
           this.$message({
                message: 'Your password has changed successfully. Please sign in with new password.',
                type: 'success'
              }); 
          let key = this.formData.email +'forgotPassword'
          localStorage.removeItem(key)
          this.goRouter('/')
        }else{
          this.submit_d = false;
          this.$message({message:res.data.data[0].message,type:'error'});
        }
      })
    },
  }
}
</script>

<style scoped>
 .btn_text {
  cursor: pointer;
}
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
  min-height: 474px;
}
.login_box_msg{
  text-align: left;
  padding: 10px 40px;
  font-size: 16px;
}
.M_bott{
  height: 60px;
  text-align:left;
}
.el_inp_w{
   padding: 0 40px;
}
/* @media (max-width:769px){
  .login_box_body{
    width: 80%;
  }
} */
</style>