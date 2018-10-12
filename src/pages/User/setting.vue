<template>
	<div class="common-wrap2">
    <top headType="5" stateInfo="设置"></top>
    <div>
      <div style="margin-top: 10px;">
       <mt-cell title="意见反馈"></mt-cell>
       <mt-cell title="服务条款"></mt-cell>
       <mt-cell title="关于我们"></mt-cell>
     </div>
     <div class="logout" @click="logout()" style="margin-top: 10px;">
       退出账号
     </div>
    </div>
	</div>
</template>

<script>
  import Top from '../../components/Header.vue'
  import storageUtil from '../../util/storageUtil.js'
  import { MessageBox } from 'mint-ui';
  export default {
  name: 'setting',
  components: {
      Top
  },
  data () {
    return {
      
    }
  },
  methods: {
    logout(){
      var _this = this;
        MessageBox({
        title: '',
        message: '确定要退出登录？',
        showCancelButton:true,
        confirmButtonText:'再逛逛',
        cancelButtonText:'确定'
     }).then(action => {
        storageUtil.removeStorage("uid");
        storageUtil.removeStorage("token");
        _this.$router.push({path:"/"})
     })
    }
  }
}
</script>

<style>
  .logout{
    background: #fff;
    color: #e92837;
    font-size: 14px;
    padding: 16px 0px;
    border-bottom: 1px solid #eeeeee; 
  }
</style>