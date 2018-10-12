<template>
	<mt-tabbar v-model="changeType">
    <mt-tab-item id="home">
      <i class="iconfont icon-zhuye"></i><br>
      首页
    </mt-tab-item>
    <mt-tab-item id="cart">
      <i class="iconfont icon-gouwuche"></i><br>
      购物车
    </mt-tab-item>
    <mt-tab-item id="order">
      <i class="iconfont icon-dingdan"></i><br>
      订单
    </mt-tab-item>
    <mt-tab-item id="user">
     <i class="iconfont icon-gerenzhongxin"></i><br>
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>


<script>
  export default {
    name: 'tab',
    data(){
    	return{
        changeType:'home'
    	}
    },
    props:["tabState"],
    methods:{
      
    },
    watch:{
       changeType: function (val, oldVal) {
         this.$router.push({ path:'/'+val }) 
      }
    },
    created(){
      this.changeType= this.tabState
    }
  }
</script>

<style type="text/css">
  .mint-tab-item.is-selected {
    background-color: inherit;
  }
 .is-selected .mint-tab-item-label{
   color: #347cf1!important;
 }
</style>