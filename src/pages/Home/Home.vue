<template>
<div class="common-wrap">
  <top headType="2" stateInfo="首页"></top>
<div>
  <div class="searchWrap">
    <div class="search-warper aline-life" @click="toSearch()">
        <i class="iconfont icon-sousuo" style="color:#999;font-size: 20px;"></i>
        <span>搜索商品名称</span>
      </div>
      <div class="filter" @click="filter()">
      <i class="iconfont icon-shaixuan" style="font-size: 20px;"></i>
        筛选
      </div>
  </div>
  <div>
    <ul class="bucket-list">
      <li class="bucket-list-item" v-for="(item,index) in bucketList">
        <a class="link-wraper">
          <div class="img-wraper">
            <img class="product-img" :src="item.picUrl"/>
          </div>
           <div class="info-wraper">
              <div class="product-title">{{item.name}}</div>
              <div class="product-price">¥{{item.prForWaUs}}</div>
           </div>
           <div class="op-box">
             <span class="collection" v-if="!item.isCollection" @click="collectionChange(item,true)">收藏</span>
             <span class="collection" v-if="item.isCollection" @click="collectionChange(item,false)">已收藏</span>
             <div class="buy-cart" @click="addToCart(item,index)" v-if="!item.isCart"> <i style="font-size: 20px;" class="iconfont icon-gouwuche" ></i> 购物车</div>
              <div class="buy-cart selected" v-if="item.isCart"> 已在购物车</div>
           </div> 
        </a>
      </li>
    </ul>
  </div>
  <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2013;" v-if="isFilter">
   <div class="mint-msgbox">
      <div class="mint-msgbox-header">
      <div class="mint-msgbox-title">筛选</div>
    </div>
    <div class="mint-msgbox-content">
      <div>
         价格区间&nbsp;&nbsp;&nbsp;&nbsp;<span class="filter-input-wrap"><input type="text" class="filter-input" v-model="minPrice" />元</span> 至 <span class="filter-input-wrap"><input type="text" class="filter-input" v-model="maxPrice"/>元</span>
      </div>
      <div class="price-range">
        <span :class="priceRage.isA" @click="changePrice('isA',0,20)">0元-20元</span>
        <span :class="priceRage.isB" @click="changePrice('isB',20,40)">20元-40元</span>
        <span :class="priceRage.isC" @click="changePrice('isC',40,60)">40元-60元</span>
      </div>
    </div>

     <div class="mint-msgbox-btns">
        <button class="mint-msgbox-btn mint-msgbox-confirm " @click="filterByType()">提交</button>
      </div>
   </div>

  </div>

  <div class="v-modal" style="z-index: 2012;" v-if="isFilter"></div>
  <tab tabState="home"></tab> 
</div>
</div>
</template>

<script>
import Top from '../../components/Header.vue'
import Tab from '../../components/Tabbar.vue'
import storageUtil from '../../util/storageUtil.js'
import { MessageBox } from 'mint-ui';
  export default {
    name: 'home',
    components: {
      Top,
      Tab
    },
    data(){
    	return{
    		bucketList:[{
          bucketTypeId:'123',
          name:'怡宝桶装水5加仑',
          prForWaUs:'19.9',
          disposable:false,
          picUrl:'http://ot0dkoop4.bkt.clouddn.com/product.png',
          isCart:false   
        }],
        isFilter:false,
        minPrice:0,
        maxPrice:0,
        priceRage:{
          isA:'',
          isB:'',
          isC:''
        }
    	}
    },
     methods: {
      collectionChange(obj,type){
        obj.isCollection = type;
      },
      filter(){
        this.isFilter = true;
      },
      filterByType(){
        this.isFilter = false;
      },
      changePrice(type,low,high){
        this.minPrice = low;
        this.maxPrice = high;
        switch(type) {
          case 'isA':
            this.priceRage.isA = "active";
            this.priceRage.isB = "";
            this.priceRage.isC = "";
            break;
          case 'isB':
            this.priceRage.isA = "";
            this.priceRage.isB = "active";
            this.priceRage.isC = "";
            break;
          case 'isC':
            this.priceRage.isA = "";
            this.priceRage.isB = "";
            this.priceRage.isC = "active";
            break;  
        }
      },
      addToCart(item,index){
        console.log(index);
        this.bucketList[index].isCart = true; 
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
        storageUtil.setStorage("cart_amount",JSON.stringify(cart_amount));
      },
      toSearch(){
        this.$router.push({ path:'/search' })
      }
    },
    created(){
       var _this = this;
       var host = this.$bus.data.host;
       var port = this.$bus.data.port;
       var getUrl = "http://"+host+":"+port+"/waterBucket/homePage";
       var formData = new FormData();
        formData.append("pageNum", 1);
        formData.append("pageSize", 3);
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
              for (var i = 0; i < bucketData.length; i++) {
                bucketData[i].isCart = false;
              }
              _this.bucketList = bucketData;
            }
        });

    }
  }
</script>

<style>
.bucket-list-item{
    position: relative;
    background-color: #fff;
    padding: 6px 8px;
}
.link-wraper{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: 4px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    z-index: 1;
    left: 0;
    top: 0;
}
  .product-img{
    height: 88px;
    width: 88px;
  }
  .img-wraper{
    margin-right: 20px;
    background-size: cover;
    background-position: center;
    width: 88px;
    height: 88px;
    background-color: #fff;
    overflow: hidden;
    position: relative;
  }
  .img-wraper img{
    display: block;
    width: 100%;
    height: auto;
    position: absolute;
  }
  .info-wraper{
   -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .product-title{
    padding: 0;
    margin: 0;
    text-align: left;
    font-size: 14px;
    height: 42px;
    overflow: hidden;
    color: #111;
    line-height: 20px;
    margin-bottom: 5px;
  }
  .product-price{
    color: #e92837;
    font-weight: 600;
    font-size: 20px;
    text-align: left;
  }
  .op-box{
    position: relative;
    width: 62px;
    text-align: center;
    height: 80px;
  }
  .op-box-left{
     height: 40px;
     text-align: center;
     margin-top: 25px;
     margin-right: 16px;
  }
  .collection{
    font-size: 14px;
    display: block;
    color: #3f83ef;
    vertical-align: middle;
    margin: 0 0 8px 0;
  }
  .buy-cart{
    color: #347cf1;
    border-radius: 4px;
    position: absolute;
    display: block;
    bottom: 0;
    z-index: 2;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    right: 2px;
    width: 80px;
    border: 1px solid #3f83ef;
  }
  .buy-cart.selected{
    background: #347cf1;
    color: #fff;
  }
  .filter-input-wrap{
    background: #f3f3f3;
    font-size: 14px;
    color: #999;
    padding: 4px;
  }
  .filter-input{
    width: 60px;
    border: none;
    background: none;
    color: #000;
  }
  .price-range{
    margin-top:10px;
    padding: 16px;
  }
  .price-range span{
    background: none;
    font-size: 12px;
    color: #3f83ef;
    border:1px solid #3f83ef;
    display: inline-block;
    padding: 6px 9px;
    margin-right: 12px;
    border-radius: 2px;
  }
  .price-range span.active{
    background: #3f83ef;
    color: #fff;
  }
  .mint-msgbox-content{
    min-height: inherit !important;
  }
  .mint-msgbox-content{
    padding: 0!important;
    margin-top: 10px;
  }
  .mint-msgbox-wrapper{
    position: fixed;
    width: 340px;
    
    left: 0;
    right: 0;
    margin:0 auto;
    padding: 12px;
    padding-top: 20px;
    z-index: 2013;
  }
  .msgbox{
  position: relative; 
  }
  .close{
    position: absolute;
    top: 0;
    right: 0;
  }
.clearfix {zoom:1;}   
.clearfix:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.search-warper{
    padding: 0 10px;
    width: 70%;
    padding: 2px 10px;
    margin-top: 15px;
    border-radius: 3px;
    color: #fff;
    text-align: center;
    background: #f3f3f3;
  }
  .search-warper span{
   color: #999999;
   font-size: 14px;
  }
  .filter{
  color: #3f83ef;
  position: fixed;
  top: 64px;
  right: 14px;
} 
.searchWrap{
  margin-bottom: 10px;
}
</style>