<template>
    <div class="common-wrap2">
     <top stateInfo="购物车" headType="6"></top>
      <div>
        <div v-if="isEmpty" class="empty_info_wraper"> 
          <div class="empty_box">
            <img src="../../assets/empty_cart.png">
          </div>
          <p class="empty_info">还没有任何商品哦</p>
          <mt-button type="primary" size="large" style="margin-top: 16px;" @click="toHome()">去购物</mt-button>
        </div>
        <download ref="child"></download>
        <div v-if="!isEmpty">
          <ul class="bucket-list">
            <li class="bucket-list-item" v-for="item in bucketList">
              <a class="link-wraper">
                 <div class="op-box-left">
                    <span  class="mint-checkbox" @click="checked(item)"><input type="checkbox" class="mint-checkbox-input" v-model="item.pick"> <span class="mint-checkbox-core"></span></span>
                 </div>
                 <div class="img-wraper">
                   <img class="product-img" :src="item.picUrl"/>
                 </div>
                 <div class="info-wraper">
                    <div class="product-title">{{item.name}}</div>
                    <div class="product-price">¥{{item.prForWaUs}}</div>
                 </div>
                 <div class="op-box">
                    <i @click="addNum(item)" class="iconfont icon-array_up" style="font-size: 34px;color:#d9d9d9;"></i>
                    <div>
                      {{item.num}}
                    </div>
                    <i @click="reduceNum(item)" class="iconfont icon-array_down" style="font-size: 32px;color:#d9d9d9;"></i>
                 </div> 
              </a>
            </li>
          </ul>
        </div>        
      </div>
      <div class="sum-box" v-if="!isEmpty">
          <div class="sum_select">
            <span class="mint-checkbox" @click="selectedAll()"><input type="checkbox" class="mint-checkbox-input" v-model="isSelectAll"> <span class="mint-checkbox-core"></span></span> 已选
          </div>
          <div class="price_tag">
            ¥{{formatPrice}}
          </div>
          <div class="sum_btn" @click="buy()">
            结算
          </div>
      </div>
      <tab tabState="cart"></tab>
      
    </div>
</template>

<script>
import Top from '../../components/Header.vue'
import Tab from '../../components/Tabbar.vue'
import Download from '../../components/Download.vue'
import storageUtil from '../../util/storageUtil.js'
export default {
    name: 'order',
    components: {
      Top,
      Tab,
      Download
    },
    data(){
      return{
        isEmpty:false,
        bucketList:[],
        total_price:0,
        isSelectAll:false
      }
    },
     methods: {
      loadCart(){
        var cartList = {};
        var cart_amount = {};
        var temp = []
        cart_amount = storageUtil.getStorage("cart_amount")
        cartList = storageUtil.getStorage("cart_list")
        if(cartList!=null){
          cartList = JSON.parse(cartList);
          cart_amount = JSON.parse(cart_amount);
          for (var prop in cartList) {
            temp = cartList[prop]
            temp.num = cart_amount[prop]
            temp.pick = false;
            this.bucketList.push(temp)
          }

        }else{
          this.isEmpty = true;
        }
      },
      toHome(){
         this.$router.push({ path:'/' }) 
      },
      addNum(item){
        item.num = item.num + 1
         if(item.pick){
            this.total_price += parseFloat(item.prForWaUs);
          }
      },
      reduceNum(item){
        if(item.num>1){
          item.num = item.num - 1
          if(item.pick){
            this.total_price -= parseFloat(item.prForWaUs);
          }
        }
      },
      updateNum(item){
        var cart_amount = {};
        cart_amount = storageUtil.getStorage("cart_amount")
        cart_amount = JSON.parse(cart_amount)
      },
      checked(item){
        item.pick = !item.pick
        switch(item.pick) {
          case true:
            this.total_price += parseFloat(item.prForWaUs)*item.num;
            break;
          case false:
            this.total_price -= parseFloat(item.prForWaUs)*item.num;
            break;
        }
        this.isSelectAll = false;
      },
      selectedAll(){
        this.isSelectAll = !this.isSelectAll;
        switch(this.isSelectAll) {
          case true:
          var temp_price = 0;
            for (var i =0;i<this.bucketList.length;i++ ) {
              this.bucketList[i].pick = true;
              temp_price += this.bucketList[i].prForWaUs * this.bucketList[i].num;
            }
            this.total_price = temp_price
            break;
          case false:
            for (var i =0;i<this.bucketList.length;i++ ) {
              this.bucketList[i].pick = false;
            }
            this.total_price = 0;
            break;
        }
      },
      buy(){
        var child = this.$refs.child;
        child.show();   
      }
    },
    created () {
      this.loadCart()
    },
    computed:{
      formatPrice:function(){
        return parseFloat(this.total_price.toFixed(2))
     }
   }   
  }
</script>

<style type="text/css">
  .empty_box img{
    margin-top: 100px;
    width: 200px;
    height: auto;
  }
  .empty_info{
    margin-top: 100px;
    font-size: 16px;
    color: #999;
  }
  .empty_info_wraper{
    padding: 0px 16px;
  }
  .sum-box{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: fixed;
    bottom: 42px;
    width: 100%;
    background: #fff;
  }
  .sum_select{
    width: 33.3%;
    font-size: 14px;
    padding: 10px 0px;
  }
  .price_tag{
   width: 33.3%;
   padding: 10px 0px;
   color: #43a5f5;
  }
  .sum_btn{
    width: 33.3%;
    background: #347cf1;
    color: #fff;
    font-size: 16px;
    padding: 10px 0px;
  }
  .msgbox{
    background: #fff;
    padding: 10px;
  }
</style>