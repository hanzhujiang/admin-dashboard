<template>
<div class="login_box">
    <div style="background: rgba(0,0,0,.4);height:100%">
      <div class="login_box_body">
        <div class="right_login">
          <div style="margin-bottom:20px">
            <img style="wdith:170;height:53px;margin-top:40px" src="../assets/imgs/logo@2x.png"  alt="" />
          </div>
            <p class="login_box_msg" style="font-weight: bold;">Forgot Your Password?</p>
            <p class="login_box_msg">Please enter your email address to request a password reset.</p>
             <div class="el_inp_w">
            <div class="M_bott "  style="padding-top:10px">
            <el-input
              placeholder="email"
              suffix-icon="fa fa-envelope-o"
              clearable
              v-model="formData.email" @blur="validatorBlur('email')">
            </el-input>
            <p class="validator" style="margin-top:3px;color:red" v-show="validatorSet.email.flg">{{rs[validatorSet.email.msg]}}</p>
          </div>
        <el-row>
          <div class="M_bott" style="height:55px">
            <el-button type="primary"   class="bg_blue" style="width:100%" @click="setEmail">Submit</el-button>
          </div>
        </el-row>
        <div >
            <span class="btn_text" style="font-size:14px" @click="goBack">Back to sign in</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userForgoPassword } from "@/api/userApi.js";
// import { validate, validateForm } from "../assets/js/validator.js";
import { validator, allvalidator } from '@/validator/validator.js'

export default {
  data(){
    return{
      submit_d:false,
      formData: {
        email: "",
        // logintype:'02'
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
    this.formData.email = this.$route.query.email;
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
    setEmail(){
      this.submit_d = true;
      let key = this.formData.email+'forgotPassword'
       if (allvalidator(this.validatorSet, this.formData)) {
          this.submit_d = false;
          return;
        }
      // this.goRouter('/resetPassword')
      let timestamp = Date.parse(new Date())

      if(localStorage.getItem(key)){
        if(timestamp - localStorage.getItem(key)<5*60*1000){
             this.$message({
                message: 'A reset email has been sent to you. Please check.',
                type: 'success'
              }); 
         this.$router.push({name:"resetPassword",query:{email:this.formData.email}})  
         return
        }else{
          userForgoPassword(this.formData).then(res=>{
            if(res.data.success){
              localStorage.setItem(key,timestamp)
               this.$message({
                message: 'A reset email has been sent to you. Please check.',
                type: 'success'
              }); 
              this.$router.push({name:"resetPassword",query:{email:this.formData.email}})  
            }else{
              setTimeout(() => {
                this.submit_d = false;
               this.$message({message:res.data.data[0].message,type:'error'});
              }, 5000);
            }
          })
        }
      }else{
        userForgoPassword(this.formData).then(res=>{
          if(res.data.success){
            localStorage.setItem(key,timestamp)
            this.$router.push({name:"resetPassword",query:{email:this.formData.email}})  
          }else{
            setTimeout(() => {
              this.submit_d = false;
              this.$message({message:res.data.data[0].message,type:'error'});
            }, 5000);
          }
        })
      }
     
    }
  
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
  height: 404px;
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
.l_height{
  line-height: 60px;
}
/* @media (max-width:769px){
  .login_box_body{
    width: 80%;
  }
} */
</style>