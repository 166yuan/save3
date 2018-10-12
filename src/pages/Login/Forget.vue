<template>
  <div style="padding: 0 15px;">
     <div class="back" @click="toLogin()">
        <i style="font-size: large" class="iconfont icon-fanhui"></i>
        <span>返回登录</span>
     </div>
     <div id="step1" v-if="step==1">
        <div class='info-wraper'>
          请输入要找回的账号
        </div>
       <div class="info-wraper2">
        <mt-field label="账号" placeholder="手机号/飞滴号" v-model='phone'></mt-field>
       </div>
        <div>
            <mt-button type="primary" size="large" @click="toNext(2)">下一步</mt-button>
        </div>
     </div>
     <div id="step2" v-if="step==2">    
         <div class='info-wraper'>
           正在往{{phone}}发送短信验证码
         </div>
         <div class="info-wraper2">
           <mt-field label="验证码" placeholder="输入短信验证码" v-model='validateCode'>
            <mt-button size="small" type="primary" plain>重新发送</mt-button>
           </mt-field>
         </div>
         <div>
           <mt-button size="large" type="primary" @click="toNext(3)">下一步</mt-button>
         </div>
     </div>
     <div id="step3" v-if="step==3">
        <div class='info-wraper'>
          重设账号密码
        </div>
        <div class="info-wraper2">
          <mt-field label="密码" placeholder="设置新密码" :type=inputType v-model="newPass">
               <i style="font-size: 26px;" class="iconfont icon-xianshimima" @click="switchPassShow()"></i>
          </mt-field>
        </div>
        <div>
            <mt-button type="primary" size="large">进入飞滴</mt-button>
        </div>
     </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    name: 'forget',
    data(){
      return{
        step:1,
        phone:'',
        validateCode:'',
        newPass:'',
        inputType:'password'
      }
    },
     methods: {
      showError(){
        Toast({
          message: '账号不存在，请重新输入或注册新账号',
          duration: 5000
        });
      },
       toNext(step){
        this.step=step
      },
      switchPassShow(){
        this.inputType = 'text'
      },
      toLogin(){
        this.$router.push({ path:'/login' }) 
      }
    }
  }
</script>

<style>
  .info-wraper{
    font-size: 24px;
  }
  .info-wraper2{
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>