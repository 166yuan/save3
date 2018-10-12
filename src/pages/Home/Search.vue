<template>
	<div class="common-wrap">
		<header class="search-header">
		    <div class="pos-left" @click="back()"><i class="iconfont icon-fanhui" style="font-size: 24px;"></i></div>
		    <div class="pos-right" @click="toSeach()">
				<i class="iconfont icon-sousuo" style="font-size: 24px;"></i>&nbsp;<div style="display:inline-block;vertical-align: top;">搜索</div>
			</div>
			<div style="margin-top: 4px;">
				<input type="text" class="search-input" v-model="goodsName" placeholder="请输入商品名称" />
				<i class="iconfont icon-qingkong" @click="clearSearch()"></i>
			</div>
			
		</header>
		<div class="searchBucket" v-if="!isEmpty">
			<ul class="bucket-list">
		      <li class="bucket-list-item" v-for="item in bucketList">
		        <a class="link-wraper">
		          <div class="img-wraper">
		            <img class="product-img" :src="item.picUrl"/>
		          </div>
		           <div class="info-wraper">
		              <div class="product-title">{{item.name}}</div>
		              <div class="product-price">¥{{item.prForWaUs}}</div>
		           </div>
		           <div class="op-box">
		             <span class="collection" v-if="!item.disposable" @click="collectionChange(item,true)">收藏</span>
		             <span class="collection" v-if="item.disposable" @click="collectionChange(item,false)">已收藏</span>
		             <div class="buy-cart" @click="addToCart(item)"> <i style="font-size: 20px;" class="iconfont icon-gouwuche" ></i> 购物车</div>
		           </div> 
		        </a>
		      </li>
	    	</ul>
		</div>
		<div v-if="isEmpty" class="empty_info_wraper">
			<div class="empty_box">
            	<img src="../../assets/empty_search.png">
         	 </div>
          <p class="empty_info">还没有搜到商品哦</p>
		</div>
	</div>
</template>

<script>
import storageUtil from '../../util/storageUtil.js'
export default {
	name: 'search',
    data(){
    	return {
    		goodsName :'',
    		bucketList:[],
    		isEmpty:true
    	}
    },methods: {
    	collectionChange(obj,type){
        	obj.isCollection = type;
      	},
    	addToCart(item){
        var cartList = {};
        var cart_amount = {};
        cart_amount = storageUtil.getStorage("cart_amount")
        if(cart_amount==null){ //为存任何的购物数据
            cart_amount = {}
            cart_amount[item.bucketTypeId] = 1;
            cartList[item.bucketTypeId] = item
            storageUtil.setStorage("cart_list",JSON.stringify(cartList))
        }else{
            cart_amount = JSON.parse(cart_amount);
            if(cart_amount[item.bucketTypeId]==undefined){
              cart_amount[item.bucketTypeId] = 1
              cartList = JSON.parse(storageUtil.getStorage("cart_list"))
              cartList[item.bucketTypeId] = item
              storageUtil.setStorage("cart_list",JSON.stringify(cartList))
            }else{
              var num = cart_amount[item.bucketTypeId]
              cart_amount[item.bucketTypeId] = num+1
            }
        }
        storageUtil.setStorage("cart_amount",JSON.stringify(cart_amount))
      },
    	toSeach(){
	       var _this = this;
	       var host = this.$bus.data.host;
	       var port = this.$bus.data.port;
	       var getUrl = "http://"+host+":"+port+"/waterBucket/getWaterBucketsByNameWithoutToken";
	       var formData = new FormData();
        	formData.append("pageNum", 1);
        	formData.append("pageSize", 10);
        	formData.append("keyName", _this.goodsName);  
	       var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        	}

	        this.$http.post(getUrl,formData,config).then(function(res){
	            if(!res.data.success){
	              MessageBox('错误',res.data.msg.split(":")[1])
	            }else{
	              var bucketData = res.data.obj;
	              if(bucketData.length==0){
	              	_this.isEmpty = true;
	              }else{
	              	_this.isEmpty = false;
	              }
	              _this.bucketList = bucketData;
	            }
	        });
    	},
    	clearSearch(){
    		this.goodsName = "";
    		this.bucketList = [];
    		this.isEmpty = true;
    	},
    	back(){
    		this.$router.go(-1);
    	}
	}

}
</script>

<style>
	.search-header{
		position: relative;
	    padding: 10px 16px;
	}
	.pos-left{
		float: left;
	}
	.pos-right{
		float: right;
	}
	.search-input{
		font-size: 16px;
		border: none;
		width: 64%;
		outline:none;
	}
	.searchBucket{
		position: relative;
		max-height: 90%;
		overflow: scroll;
	}
</style>