<template>
	<div class="common-wrap2">
		<top headType="5" stateInfo="订单详情"></top>
		<div class="info-bar mg-top6 clearfix">
			<div class="info-bar-left">订单状态</div>
			<div class="info-bar-right">等待买家付款</div>	
		</div>
		<div class="info-body mg-top6">
			<p class="body-title">金先生 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18922221685</p>
			<p class="body-subtitle">广州市天河区五山路483号 华南农业大学
×</p>
		</div>
		<div class="info-bar mg-top6 clearfix">
			<div class="info-bar-left">配送时间</div>
			<div class="info-bar-right">7月14日 15:00-20:00</div>	
		</div>

		<div class="info-body mg-top6">
			<a class="link-wraper" style="padding:0;border:0;"><div class="img-wraper"><img src="http://ot0dkoop4.bkt.clouddn.com/product.png" class="product-img"></div> <div class="info-wraper"><div class="product-title">农夫山泉矿物桶装水(待付款)</div></div> <div class="op-box"><p class="order-price">¥19.9</p> <p class="order-num">X2</p></div></a>
		</div>
		
		<div class="price-box mg-top6">
			<div class="info-bar-inner clearfix">
				<div class="info-bar-left">商品</div>
				<div class="info-bar-right red">¥98</div>	
			</div>
			<div class="info-bar-inner clearfix">
				<div class="info-bar-left">需补交押金</div>
				<div class="info-bar-right red">¥98</div>	
			</div>
			<div class="info-bar-inner clearfix">
				<div class="info-bar-left">配送费</div>
				<div class="info-bar-right red">¥98</div>	
			</div>
			<div class="info-bar-inner clearfix" style="border-top: 1px solid #eee;">
				<div class="info-bar-left">合计</div>
				<div class="info-bar-right red">¥98</div>	
			</div>
		</div>

		<div class="info-bar mg-top6 clearfix">
			<div class="info-bar-left">备注</div>
			<div class="info-bar-right">无备注</div>	
		</div>
		<div class="info-bar mg-top6 clearfix">
			<div class="info-bar-left">订单号</div>
			<div class="info-bar-right">1234545</div>	
		</div>
	</div>
</template>

<script>
import Top from '../../components/Header.vue'
export default {
	name: 'orderDetail',
    components: {
      Top
    },data(){
    	return{

    	}
    }, methods: {

    }		
}
</script>

<style type="text/css">
    .mg-top6{
		margin-top: 6px;
    }
    .info-body,.info-bar,.price-box{
    	border-top: 1px solid #eeeeee;
		border-bottom: 1px solid #eeeeee;
    }	
	.info-bar{
		background: #fff;
		padding: 10px;
	}
	.info-bar-inner{
		background: #fff;
		padding: 6px 10px;
	}
	.info-bar-left{
		float: left;
		font-size: 14px;
	}
	.info-bar-right{
		float: right;
		font-size: 14px;
		color: #999;
	}
	.info-bar-right.red{
		color: #e92837;
	}
	.info-body{
		background: #fff;
		padding: 10px;
	}
	.body-title{
		font-size: 16px;
		text-align: left;
		margin-bottom: 4px;
	}
	.body-subtitle{
		font-size: 12px;
		color: #999;
		text-align: left;
	}
</style>

