<template>
	<div class="common-wrap2">
		 <top :stateInfo="stateInfo" headType="5"></top>
	   <div>
       <div class="address-box1">
          <span class="mint-checkbox"  @click="setDefault()"><input type="checkbox" class="mint-checkbox-input" v-model="defaultAddress"> <span class="mini mint-checkbox-core"></span></span> &nbsp;&nbsp;
          设为默认地址
       </div>
       <div class="address-box2">
         <div class="cell-wrapper">
          <div class="cell-title">
            <span>姓名</span>
          </div>
          <div class="cell-value">
            <input placeholder="请输入联系人" v-model='name'/>
          </div>
         </div>
         <div class="cell-wrapper">
          <div class="cell-value" style="margin-left: 52px;">
            <span class="mint-checkbox" @click="selectSex(1)"><input type="checkbox" class="mint-checkbox-input" v-model="man" value="1"> <span class="mini mint-checkbox-core"></span></span> &nbsp; &nbsp;
            先生
          </div>
          <div class="cell-value" style="margin-left: 52px;">
            <span class="mint-checkbox" @click="selectSex(0)"><input type="checkbox" class="mint-checkbox-input" v-model="woman" value="0"> <span class="mini mint-checkbox-core"></span></span>  &nbsp; &nbsp;
            女士
          </div>
         </div> 
         <div class="cell-wrapper">
            <div class="cell-title">
              <span>联系电话</span>
            </div>
            <div class="cell-value">
              <input placeholder="请输入电话" v-model="phoneNumber"/>
            </div>
         </div>
         <div class="cell-wrapper">
            <div class="cell-title">
              <span>收货地址</span>
            </div>
            <div class="cell-value">
             
            </div>
         </div>
          <div class="cell-wrapper">
            <div class="cell-title">
              <span>详细地址</span>
            </div>
            <div class="cell-value">
              <input placeholder="请输入地址" v-model="detailAddress"/>
            </div>
         </div>
         </div>
       </div>
       <div class="address-box3">
         <mt-button type="primary" size="large" @click="updateAddress()">保存</mt-button>
       </div>
     </div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import Top from '../../components/Header.vue'
import storageUtil from '../../util/storageUtil.js'
export default {
  name: 'newAddress',
  components: {
      Top
  },
  data () {
    return {
      curState:1,
      stateInfo:'修改地址',
      man:false,
      woman:false,
      defaultAddress:false,
      name:'',
      phoneNumber:'',
      detailAddress:'',
      longitude :0,
      latitude:0,
      token:'',
      uid:'',
      city:'广州',
      district:'',
      road:'',
      userAddressId:''
    }
  },
  methods: {
    setDefault(){
      this.defaultAddress =  !this.defaultAddress;
    },
    selectSex(type){
      switch(type) {
        case 1:
          this.man = true;
          this.woman = false;
          break;
        case 0:
          this.man = false;
          this.woman = true;
          break;
      }
    
    },
    updateAddress(){
       var isOk = this.filterData();
       if(isOk){
       var _this = this;
       var host = this.$bus.data.host;
       var port = this.$bus.data.port;
       var getUrl = "http://"+host+":"+port+"/user/updateUserAddress";
       var formData = new FormData();
       formData.append("userId", _this.uid);
       formData.append("token", _this.token);
       formData.append("address",_this.detailAddress);
       formData.append("name",_this.name);
       formData.append("sex",_this.man==true?'男':'女');
       formData.append("phoneNumber",_this.phoneNumber);
       formData.append("city",_this.city);
       formData.append("district",_this.district);
       formData.append("road",_this.road);
       formData.append("longitude",_this.longitude)
       formData.append("latitude",_this.latitude)
       formData.append("defaultAddress",_this.defaultAddress)
       formData.append("userAddressId",_this.userAddressId)
        var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        _this.$http.post(getUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              _this.$router.push({ path:'/manaAddress'  })
            }
        });
       }else{
        Toast('亲，请完善以上信息再保存');
       }
       
    },
    filterData(){
      var isFinish = true;
      if(this.name.trim()=='')isFinish = false;
      if(this.phoneNumber.trim()=='')isFinish = false;
      if(this.detailAddress.trim()=='')isFinish = false;
      return isFinish;
    }
  },
  created () {
        this.token = storageUtil.getStorage("token")
        this.uid = storageUtil.getStorage("uid")
        var address = storageUtil.getStorage("addressEdit")
        address = JSON.parse(address)
        this.name = address.name
        this.man = address.sex=='男'?true:false;
        this.woman = address.sex=='女'?true:false;
        this.phoneNumber = address.phoneNumber
        this.detailAddress = address.address
        this.defaultAddress = address.defaultAddress
        this.longitude = address.longitude;
        this.latitude = address.latitude;
        this.userAddressId = address.userAddressId;
        this.road = address.road;
        this.district = address.district;
        this.city = address.city;
  }
}
</script>

<style>
 
</style>