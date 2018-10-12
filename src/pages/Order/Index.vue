<template>
    <div>
    <top stateInfo="订单" headType="2"></top>
    <download ref="child"></download>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">待付款</mt-tab-item>
        <mt-tab-item id="2">待接收</mt-tab-item>
        <mt-tab-item id="3">待收货</mt-tab-item>
        <mt-tab-item id="4">已完成</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="waiting">
               <ul class="order-list">
                  <li class="order-list-item" v-for="item in unpayList">
                    
                    <div>
                      <div class="info-bar-top clearfix">
                        <div class="info-left">订单号 {{item.orderUserId}}</div>
                        <div class="info-right">等待买家付款</div>
                      </div>
                      <a class="link-wraper" v-for="cell in item.orderWaBuOrUsList">
                        <div class="img-wraper">
                          <img class="product-img" :src="cell.picUrl"/>
                        </div>
                         <div class="info-wraper">
                            <div class="product-title">{{cell.brandName}}</div>
                         </div>
                         <div class="op-box">
                            <p class="order-price">¥{{cell.producerPriceTotal}}</p>
                            <p class="order-num">X{{cell.quantity}}</p>
                         </div> 
                      </a>
                    </div>
                    <div class="order-op-box text-right">
                      <!-- <i style="font-size: 20px;" class="iconfont icon-daojishi"></i>14:59后自动取消订单 -->
                       <button class="order-op-btn disabled">取消订单</button> &nbsp;&nbsp;&nbsp;&nbsp; <button class="order-op-btn primary" @click="toPay()">付款</button>
                    </div>
                    
                  </li>
              </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <div class="waiting">
               <ul class="order-list">
                  <li class="order-list-item" v-for="item in waitAcceptList">
                   <div>
                    <div class="info-bar-top clearfix">
                      <div class="info-left">订单号 {{item.orderUserId}}</div>
                      <div class="info-right">等待送水工接单</div>
                    </div>
                    <a class="link-wraper">
                      <div class="img-wraper">
                        <img class="product-img" :src="item.bucketUrl"/>
                      </div>
                       <div class="info-wraper">
                          <div class="product-title">{{item.bucketName}}</div>
                       </div>
                       <div class="op-box">
                            <p class="order-price">¥{{item.price}}</p>
                            <p class="order-num">X{{item.num}}</p>
                       </div> 
                    </a>
                   </div>
                   <div class="order-op-box text-right">
                      <button class="order-op-btn disabled">取消订单</button>
                   </div> 
                  </li>
              </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
             <div class="waiting">
               <ul class="order-list">
                  <li class="order-list-item" v-for="item in waitConfirmList">
                    <div>  
                      <div class="info-bar-top clearfix">
                        <div class="info-left">订单号 {{item.orderUserId}}</div>
                        <div class="info-right">等待买家确认收货</div>
                      </div>
                      <a class="link-wraper" v-for="cell in item.orderWaBuOrUsList">
                        <div class="img-wraper">
                          <img class="product-img" :src="cell.picUrl"/>
                        </div>
                         <div class="info-wraper">
                            <div class="product-title">{{cell.brandName}}-{{cell.name}}</div>
                         </div>
                         <div class="op-box">
                              <p class="order-price">¥{{cell.producerPriceTotal}}</p>
                              <p class="order-num">X{{cell.quantity}}</p>
                         </div> 
                      </a>
                    </div>
                    <div class="order-op-box text-right">
                      <button class="order-op-btn disabled">配送信息</button>&nbsp;&nbsp;&nbsp;&nbsp;
                      <button class="order-op-btn warn">补交押金</button>
                   </div>   
                  </li>
              </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
            <div class="waiting">
               <ul class="order-list">
                  <li class="order-list-item" v-for="item in finishList">
                    <div>  
                      <div class="info-bar-top clearfix">
                        <div class="info-left">订单号 {{item.orderUser}}</div>
                        <div class="info-right">已完成</div>
                      </div>
                      <a class="link-wraper">
                        <div class="img-wraper">
                          <img class="product-img" :src="item.bucketUrl"/>
                        </div>
                         <div class="info-wraper">
                            <div class="product-title">{{item.bucketName}}</div>
                         </div>
                         <div class="op-box">
                              <p class="order-price">¥{{item.price}}</p>
                              <p class="order-num">X{{item.num}}</p>
                         </div> 
                      </a>
                    </div>
                    <div class="order-op-box text-right">
                      <button class="order-op-btn primary">评价</button>
                   </div>   
                  </li>
              </ul>
          </div>
        </mt-tab-container-item>
        <!-- <mt-tab-container-item id="5">
           <div class="empty_info_wraper">
            <div class="empty_box">
              <img src="../../assets/empty_order.png">
            </div>
            <p class="empty_info">还没有订单哦</p>
           </div>
        </mt-tab-container-item> -->
      </mt-tab-container>
      <tab tabState="order"></tab>  
    </div>
</template>

<script>
import Top from '../../components/Header.vue'
import Tab from '../../components/Tabbar.vue'
import Download from '../../components/Download.vue'
import storageUtil from '../../util/storageUtil.js'
import { MessageBox } from 'mint-ui';
export default {
    name: 'order',
    components: {
      Top,
      Tab,
      Download
    },
    data(){
      return{
        selected: "1",
        unpayList:[],
        waitAcceptList:[],
        waitConfirmList:[],
        finishList:[],
        uid:'',
        token:"",
        isEmpty:false
      }
    },
     methods: {
      toPay(){
        var child = this.$refs.child;
        child.show();   
      },
      getOrderByStatus(status){

         var _this = this;
         var host = this.$bus.data.host;
         var port = this.$bus.data.port;

         var getUrl = "http://"+host+":"+port+"/orderUser/userOrderUsersByStatus";
         var formData = new FormData();
          formData.append("pageNum", 1);
          formData.append("pageSize", 3);
          formData.append("token", this.token);
          formData.append("userId",this.uid);
          formData.append("status",status);
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
                if(bucketData.lenght!=0){
                  switch(status) {
                    case 0:
                      _this.unpayList = bucketData;
                      break;
                    case 1:
                      _this.waitAcceptList = bucketData;
                      break;
                    case 2:
                      _this.waitConfirmList = bucketData;
                      break;
                    case 4:
                      _this.finishList = bucketData;
                      break;    
                  }
                  
                }
              }
          });

      } 
    },
    created(){
        this.token = storageUtil.getStorage("token")
        this.uid = storageUtil.getStorage("uid")
        this.getOrderByStatus(0);
    },
    watch:{
      selected:function(old,val){
        this.getOrderByStatus(old)
      }
    } 
  }
</script>

<style type="text/css">
  .order-list{
    margin-top: 10px;
  }
  .order-list-item{
    background: #fff;
    padding: 10px;
  }
  .info-bar-top{
   position: relative;
    padding: 4px;
  }
  .info-bar-top .info-left{
    font-size: 12px;
    color: #999;
    float: left;
  }
  .info-bar-top .info-right{
    font-size: 12px;
    color: #212121;
    float: right;
  }
  .order-price{
    font-size: 14px;
    text-align: right;
  }
  .order-num{
    font-size: 12px;
    color: #999;
    text-align: right;
  }
  .order-op-box{
    padding: 6px 8px;
    font-size: 12px;
    color:#347cf1; 
  }
  .text-left{
    text-align: left;
  }
  .text-right{
    text-align: right;
  }
  .order-op-btn{
    background: #fff;
    border: 1px solid #5a5a5a;
    background-color: transparent;
    box-shadow: none;
    min-width: 70px;
  }
  .order-op-btn.primary{
    color: #347cf1;
    border: 1px solid #347cf1;
  }
  .order-op-btn.disabled{
    color: #999;
    border: 1px solid #999;
  }
  .order-op-btn.warn{
    color: #ee6352;
    border: 1px solid #ee6352;
  }
</style>