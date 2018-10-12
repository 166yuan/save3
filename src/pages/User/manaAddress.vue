<template>
	<div class="common-wrap2">
    <top headType="4" stateInfo="管理收货地址"></top>
    <div>
      <div class="address-wrap" v-if="!isEmpty">
        <div class="address-box" v-for="(item,index) in addressList">
          <div>
             <p class="main-info">{{item.name}}&nbsp;&nbsp;{{item.sex}}&nbsp;&nbsp;{{item.phoneNumber}}</p>
             <p class="sub-info">{{item.address}}</p>
          </div>
          <div class="address-edit clearfix">
            <span class="mint-checkbox" @click="switchDefault(item,index)"><input type="checkbox" class="mint-checkbox-input"  v-model="item.defaultAddress"> <span class="mint-checkbox-core"></span></span>
            &nbsp;&nbsp;&nbsp;&nbsp;设为默认地址
            <span class="addresss-op-box">
              <a class="delete" @click="confirmDele(item,index)">删除</a>&nbsp;&nbsp;
              <a class="edit" @click="toEdit(item)">编辑</a>
            </span>
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
import { MessageBox } from 'mint-ui';
export default {
  name: 'manaAddress',
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
    showAlert(){
     
    },
     toAdd(){
        this.$router.push({ path:'/newAddress' }) 
    },
    toEdit(item){
      var storeString = JSON.stringify(item);
      storageUtil.setStorage("addressEdit",storeString);
      this.$router.push({path:'/editAddress'})
    },
    switchDefault(item,index){
      item.defaultAddress = !item.defaultAddress;
      this.updateAddress(item);
      if(item.defaultAddress==true){
        for (var i = 0;i<this.addressList.length;i++ ) {
          if(i==index) continue;
          this.addressList[i].defaultAddress = false;
        }
      }
    },
    updateAddress(item){
       var host = this.$bus.data.host;
       var port = this.$bus.data.port;
       var getUrl = "http://"+host+":"+port+"/user/updateUserAddress";
       var formData = new FormData();
        formData.append("token", this.token);
        formData.append("userId", this.uid);

        formData.append("userAddressId", item.userAddressId);
        formData.append("address", item.address);
        formData.append("longitude", item.longitude);
        formData.append("latitude", item.latitude);
        formData.append("name", item.name);
        formData.append("sex", item.sex);
        formData.append("phoneNumber", item.phoneNumber);
        formData.append("city", item.city);
        formData.append("district", item.district);
        formData.append("road", item.road);
        formData.append("defaultAddress", item.defaultAddress);

        var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        this.$http.post(getUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              
            }
        });
    },
    deleteAddress(item,index){
       var _this = this;
       var host = this.$bus.data.host;
       var port = this.$bus.data.port;
       var getUrl = "http://"+host+":"+port+"/user/deleteUserAddress";
       var formData = new FormData();
        formData.append("token", this.token);
        formData.append("userId", this.uid);
        formData.append("userAddressId",item.userAddressId);
         var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        this.$http.post(getUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              _this.addressList.splice(index,1);
            }
        });
    },
    confirmDele(item,index){
       MessageBox({
        title: '',
        message: '确定要删除该收货地址',
        showCancelButton:true,
        confirmButtonText:'再想想',
        cancelButtonText:'删除'
     }).then(action => {
        this.deleteAddress(item,index)
     })
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
  .address-edit{
    font-size: 12px;
    padding-top: 10px;
    border-top: 1px solid #eeeeee;
  }
  .addresss-op-box{
    float: right;
    font-size: 14px;
  }
  a.delete{
    color: #e92837;
  }
  a.edit{
    display: inline-block;
    color: #347cf1;
    border:1px solid #347cf1;
    padding: 1px 14px; 
  }
</style>