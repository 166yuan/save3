<template>
  <div class="common-wrap">
  <top headType="5" stateInfo="返回登录"></top>
    <div class="register-box">
        <div id="step1" v-if="step==1">
     
      <div class="info-wraper">
       用手机号注册飞滴
      </div>
      <div>
         <mt-field label="手机号" placeholder="输入您的手机号" v-model="phone" ref="input" @blur="phoneInput()"></mt-field>

      </div>
      <div class="btn-wraper">
        <mt-button type="primary" size="large" :disabled='phoneNext' @click="startSendCode()">下一步</mt-button>
      </div> 
   </div>
   <div id="step2" v-if="step==2">
    <div style="padding: 0 15px;">
     <div class='info-wraper'>
       正在往{{phone}}发送短信验证码
     </div>
     <div class="info-wraper2">
       <mt-field label="验证码" v-model="verificationCode" placeholder="输入短信验证码">
        <mt-button @click="startSendCode()" size="small" type="primary" :disabled="sendCode" plain>重新发送<span v-show="showSecond">{{time}}s</span></mt-button>
       </mt-field>
     </div>
     <div>
       <mt-button size="large" type="primary" @click="toNext(3)">下一步</mt-button>
     </div>
    </div>
   </div>  
    <div id="step3" v-if="step==3">
      <div style="padding: 0 15px;">
        <div class='info-wraper'>
              设置账号密码
        </div>
        <div class="info-wraper2">
          <mt-field label="密码" placeholder="设置" v-model='password' :type=inputType>
            <i style="font-size: 26px;" class="iconfont icon-xianshimima" @click="switchPassShow()"></i>
          </mt-field>
        </div>
         <div>
            <mt-button size="large" type="primary" @click="register()">完成</mt-button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import Top from '../../components/Header.vue'
import md5 from 'blueimp-md5'
  export default {
    name: 'register',
    components: {
      Top
    },
    data(){
      return{
        phone:'',
        verificationCode:'',
        phoneNext:true,
        sendCode:true,
        showSecond:true,
        step:1,
        time:2,
        password:'',
        inputType:'password'
      }
    },
     methods: {
       toLogin(){
        this.$router.push({ path:'/login' }) 
      },
      toNext(step){
        this.step=step
      },
      switchPassShow(){
        this.inputType = 'text'
      },
      phoneInput(){
        alert('blur')
      },
      countDown(){
        var _this = this;
        _this.sendCode = true;
        _this.showSecond = true;
        var interval = window.setInterval(function() {
          if ((_this.time--) <= 0) {
            _this.time = 2;
            _this.sendCode = false;
            _this.showSecond = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      startSendCode(){
        var _this = this
        this.countDown();
        var host = this.$bus.data.host;
        var port = this.$bus.data.port;
        var getCodeUrl = "http://"+host+":"+port+"/user/getVerificationCode";
        var formData = new FormData();
        formData.append("phone", this.phone);
        var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        this.$http.post(getCodeUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              _this.toNext(2)
            }
        });
      },
      register(){
        var host = this.$bus.data.host;
        var port = this.$bus.data.port;
        var getCodeUrl = "http://"+host+":"+port+"/user/register";
        var formData = new FormData();
        formData.append('phoneNumber', this.phone);
        formData.append('password', md5(this.password));
        formData.append('verificationCode', this.verificationCode);
        var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        
        this.$http.post(getCodeUrl,formData,config).then(function(res){
            if(res.data.success){
               MessageBox.alert('注册成功，返回登录界面','消息').then(action => {
          this.$router.push({ path:'/login'}) 
      });
            }else{
              MessageBox('失败', res.msg);
            }
        });
      }
    },
    created(){
     
    },
    watch:{
        phone:function(){
          var reg = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$";
          if(this.phone.match(reg)!=null){
            this.phoneNext = false;
          }else{
            this.phoneNext = true;
          }         
        }
    }
  }
</script>

<style type="text/css">
.register-box{
  padding: 0 10px;
}
   .info-wraper{
    font-size: 24px;
  }
  .info-wraper2{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .icon-xianshimima{
    font-size: large;
  }
</style>