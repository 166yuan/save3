<template>
<div class="common-wrap">
  <div class="login-box">
    <div>
      <img class="logo" src="../../assets/logo.png">
    </div>
    <div>
      <mt-field label="账号" v-model="account" placeholder="手机号/飞滴号"></mt-field>
      <mt-field label="密码" v-model="password" placeholder="请输入账号密码"></mt-field>
    </div>
    <div class="btn-wraper">
      <mt-button type="primary" size="large" @click="login()">登录</mt-button>
      <br>
      <mt-button plain type="primary" size="large" @click="toRegister()">注册</mt-button>
    </div>
    <div class="forget-box">
      <router-link to="/forget">忘记密码?</router-link>
    </div>
  </div>
</div>
  
</template>

<script>
import { MessageBox } from 'mint-ui';
import storageUtil from '../../util/storageUtil.js'
import md5 from 'blueimp-md5'
  export default {
    name: 'login',
    data(){
      return{
        account:'',
        password:''
      }
    },
     methods: {
     showMessageBox(){
         MessageBox({
          title: '',
          message: '账号或者密码输入错误',
          showCancelButton:true,
          confirmButtonText:'重新输入',
          cancelButtonText:'忘记密码'
          }).then(action => {
            switch(action) {
              case 'cancel':
                
                break;
              case 'confirm':
                
                break;
            }
          })
     },
     toRegister(){
      this.$router.push({ path:'/register' }) 
     },
     login(){
        var _this = this;
        var host = this.$bus.data.host;
        var port = this.$bus.data.port;
        var getCodeUrl = "http://"+host+":"+port+"/user/login";
        var formData = new FormData();
        formData.append("imei", this.getImei());
        formData.append("account", this.account);
        formData.append("password", md5(this.password));
        var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        this.$http.post(getCodeUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              console.log('登录成功');
              var loginInfo = res.data.obj.loginInfo;
              var userInfo = res.data.obj.user;
              storageUtil.setStorage("token",loginInfo.token);
              storageUtil.setStorage("uid",loginInfo.uid);
              storageUtil.setStorage("userInfo",JSON.stringify(userInfo))
              _this.$router.push({ path:'/' })
            }
        });

     },
     getImei(){
        var len = 24;
    　　var $chars = '012345678';
        var maxPos = $chars.length;
　　    var pwd = '';
    　　for (var i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
　　    return pwd;
     }
    },
    created(){
      
    }
  }
</script>

<style type="text/css">
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
color: #999; 
} 
input:-moz-placeholder, textarea:-moz-placeholder { 
color: #999; 
} 
input::-moz-placeholder, textarea::-moz-placeholder { 
color: #999; 
} 
input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
color: #999; 
} 
.login-box{
  padding: 30px 10px 0 10px;
}
  .logo{
    height: 100px;
    width: 100px;
  }
  .mint-cell-wrapper{
    background-image: none !important;
    border-bottom: 1px solid #d9d9d9;
    text-align: left;
  }
  .btn-wraper{
    margin-top: 10px;
  }
  .forget-box{
    position: fixed;
    bottom: 16px;
    left: 0;
    right: 0;
  }
  .forget-box a{
     text-decoration: none;
     color: #347cf1;
  }
</style>