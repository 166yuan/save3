<template>
  <div class="common-wrap2">
     <div>
       <div class="avatarWrap">
         <img class="avatar" :src="avatarUrl" @click="toPersonal()">
         <p v-if="isLogin">{{userName}}</p>
         <p v-if="!isLogin"><button class="login-btn" @click="toLogin()">立即登录</button></p>
       </div>
       <div style="margin-top:10px;">
         <mt-cell title="收货地址" to="/address" is-link>
            <i style="font-size: 22px;" class="iconfont icon-shouhuodizhi" slot="icon"></i>
         </mt-cell>
       </div>
       <div style="margin-top:10px;">
         <mt-cell title="我的押金" :value="deposit" is-link>
            <i style="font-size: 22px;" class="iconfont icon-yajin" slot="icon"></i>
         </mt-cell>
          <mt-cell title="我的钱包" :value="userMoney" is-link>
            <i style="font-size: 22px;" class="iconfont icon-tixian" slot="icon"></i>
         </mt-cell>
          <mt-cell title="我的收藏" is-link>
            <i style="font-size: 22px;" class="iconfont icon-shoucang" slot="icon"></i>
         </mt-cell>
       </div>
       <div style="margin-top:10px;">
          <mt-cell title="设置" to="/setting" is-link>
            <i style="font-size: 22px;" class="iconfont icon-shezhi" slot="icon"></i>
         </mt-cell>
       </div>
     </div>
     <tab tabState="user"></tab> 
  </div>

</template>

<script>
import Tab from '../../components/Tabbar.vue'
import storageUtil from '../../util/storageUtil.js'
    export default {
    name: 'user',
    components: {
      Tab
    },
    data(){
      return{
       avatarUrl:"http://ot0dkoop4.bkt.clouddn.com/logo.png",
       userName:'',
       isLogin:false,
       userMoney:'0元',
       deposit:'0元'
      }
    },
     methods: {
      toLogin(){
        this.$router.push({ path:'/login' }) 
      },
      getMoneyInfo(){
        var token = storageUtil.getStorage("token")
        var uid = storageUtil.getStorage("uid")
        var _this = this;
        var host = this.$bus.data.host;
        var port = this.$bus.data.port;
        var getUrl = "http://"+host+":"+port+"/moneyUser/getDeposit";
        var getMoneyUrl = "http://"+host+":"+port+"/moneyUser/getMoney";
        var formData = new FormData();
        formData.append("userId", uid);
        formData.append("token", token);
        var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        this.$http.post(getUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              _this.deposit = res.data.obj+'元';
            }
        });
         this.$http.post(getMoneyUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              _this.userMoney = res.data.obj+'元';
            }
        });
      },
      toPersonal(){
        this.$router.push({path:"/personal"})
      }
    },
    created(){

      var token = storageUtil.getStorage("token")
      var uid = storageUtil.getStorage("uid")
      var userInfo = storageUtil.getStorage("userInfo")
      if(token!=null){
        userInfo = JSON.parse(userInfo);
        this.isLogin = true;
        this.userName = userInfo.name;
        if(userInfo.portraitUrl == ""){
          
        }else{
          this.avatarUrl = userInfo.portraitUrl;
        }
      }
      this.getMoneyInfo();
    }
  }
</script>

<style>
  .user-bg{
    height: 100%;
    background: #fafafa;
  }
  .avatarWrap{
    color: #999;
    background: url("../../assets/user-bg.png") no-repeat;
    background-size:cover;
    padding: 15px 0;
  }
  .avatarWrap>p{
    color: #fff;
    margin: 5px 0px;
  }
  .avatar{
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
  .mint-cell-text {
    vertical-align: text-top!important;
}
.login-btn{
  background: none;
  border: 1px solid #fff;
  color: #fff;
  font-size: 16px;
}
</style>