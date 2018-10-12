<template>
	<div class="header">
		<!--蓝色带搜索-->
		<header class="custom-header fixed" v-if="headType==1">
			<div class="search-warper aline-life">
				<img src="../assets/search.png">
				<input type="search" placeholder="搜索商品名称" />
			</div>
			<div class="filter" @click="filterGood()">
				筛选
			</div>
		</header>
		<!--蓝色标题-->
		<header class="custom-header" v-if="headType==2">
			<div class="topic-head">
				<span>{{stateInfo}}</span>
			</div>
		</header>
		<!--白色可返回前进-->
		<header class="white-header" v-if="headType==3">
			<div class="back" @click="back()">
				<i class="iconfont icon-fanhui"></i> {{stateInfo}}
			</div>
			<div class="forward" @click="forward(toPath)">
				<i class="iconfont icon-shouhuodizhi" style="font-size: 20px;"></i> 管理
			</div>
		</header>
		<!--白色可返回和操作-->
		<header class="white-header" v-if="headType==4">
			<div class="back" @click="back()">
				<i class="iconfont icon-fanhui"></i>&nbsp;&nbsp;{{stateInfo}}
			</div>
			<div class="forward" >
				完成
			</div>
		</header>
		<!--白色仅返回-->
		<header class="white-header" v-if="headType==5">
			<div class="back" @click="back()">
				<i class="iconfont icon-fanhui"></i> {{stateInfo}}
			</div>
		</header>
		<!--蓝色带操作-->
		<header class="custom-header" v-if="headType==6">
			<div class="topic-head">
				<span>{{stateInfo}}</span>
			</div>
		</header>

	</div>
</template>

<script>
  export default {
    name: 'head',
    data(){
    	return{
    		home_search:""
    	}
    },
    props:["stateInfo","headType","toPath"],
    methods: {
 		forward(url){
 			this.$router.push({ path:url}) 
 		},
 		back(){
 			this.$router.go(-1) 
 		}
 	},
 	created () {
  	}    
  }
</script>

<style>
.fixed{
		top: 0;
	    right: 0;
	    left: 0;
	    position: fixed;
	    z-index: 1;
}
.aline-life{
		margin-left: 10px;
}
.mint-tabbar{
	background-color: #fff;
}
.mint-tab-item-label{
	color: #999999;
}
.topic-head{
	line-height: 50px;
	color: #fff;
	font-size: 17px;
	text-align: left;
	padding-left: 10px;
}
	.custom-header{
		align-items: center;
    	background-color: #3f83ef;
		font-size: 14px;
    	height: 50px;
	}
	.white-header{
		align-items: center;
	    background-color: #fff;
	    font-size: 14px;
	    height: 50px;
	    //border-bottom: 1px solid #eeeeee;
	}
	.back{
    font-size: 18px;
    left: 10px;
    position: fixed;
    top: 15px;
  }
  .forward{
  	font-size: 18px;
    right: 10px;
    position: fixed;
    top: 15px;
  }
  input:input-placeholder {
　　color:#fff;
}
</style>