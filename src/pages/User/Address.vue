<template>
	<div class="common-wrap2">
    <div>
        <top headType="3" stateInfo="收货地址" toPath="/manaAddress"></top>
     <div class="address-wrap" v-if="!isEmpty">
      <div class="address-box" v-for="item in addressList">
        <p class="main-info">{{item.name}}&nbsp;&nbsp;{{item.sex}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.phoneNumber}}</p>
        <p class="sub-info">{{item.road}}</p>
        <div class="default-box" v-if="item.defaultAddress">
          默认地址
        </div>
      </div>
     </div>
     <div v-if="isEmpty" class="empty_info_wraper">
         <div class="empty_box">
            <img src="../../assets/empty_location.png">
          </div>
          <p class="empty_info">还没有收货地址哦</p>
     </div>
       <div class="add-address" @click="toAdd()">
      ＋&nbsp;新建收货地址
       </div>
    </div>
	</div>
</template>

<script>
import Top from '../../components/Header.vue'
import storageUtil from '../../util/storageUtil.js'
export default {
  name: 'address',
  components: {
      Top
  },
  data () {
    return {
      addressList:[{
      	name:'大乌龟',
      	sex:'男',
    		phoneNumber:'1235336238',
    		address:'广东省广州市天河区五山路华南农业大学123号',
    		defaultAddress:true
      }],
      isEmpty:false,
      token:'',
      uid:''
    }
  },
  methods: {
    toAdd(){
      this.$router.push({ path:'/newAddress' }) 
    }
  },
  created () {
       this.token = storageUtil.getStorage("token")
       this.uid = storageUtil.getStorage("uid")
       var _this = this;
       var host = this.$bus.data.host;
       var port = this.$bus.data.port;
       var getUrl = "http://"+host+":"+port+"/user/getUserAddressById";
       var formData = new FormData();
        formData.append("token", this.token);
        formData.append("userId", this.uid);
        var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        this.$http.post(getUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              var addressData = res.data.obj;
              if(addressData.length==0){
                _this.isEmpty = true;
              }else{
                _this.addressList = addressData;
              }
              
            }
        });

  }
}
</script>

<style>
	.address-wrap{
		height: 93%;
		background: #fafafa;
		overflow-x: scroll;
	}
	.address-box{
		padding: 10px 15px;
		background: #fff;
		margin-top: 10px;
		text-align: left;
		position: relative;
	}
  .main-info{
    color:#212121;
  }
	.default-box{
		font-size: 8px;
		background: #347cf1;
		color: #fff;
		position: absolute;
		right: 15px;
		top: 10px;
		padding: 2px 8px;
		border-radius: 2px;
	}
	.sub-info{
		font-size: 14px;
		color: #999;
	}
	.add-address{
		font-size: 16px;
		color: #fff;
		background: #347cf1;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 12px 0;
	}
</style>