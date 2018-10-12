<template>
	<div class="common-wrap2">
		 <top :stateInfo="stateInfo" headType="5"></top>
	   <div>
       <div class="address-box1">
          <span class="mint-checkbox"  @click="setDefault()"><input type="checkbox" class="mint-checkbox-input" v-model="isDefault"> <span class="mini mint-checkbox-core"></span></span> &nbsp;&nbsp;
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
            <span class="mint-checkbox" @click="selectSex(1)"><input type="checkbox" class="mint-checkbox-input" v-model="man" value="男"> <span class="mini mint-checkbox-core"></span></span> &nbsp; &nbsp;
            先生
          </div>
          <div class="cell-value" style="margin-left: 52px;">
            <span class="mint-checkbox" @click="selectSex(0)"><input type="checkbox" class="mint-checkbox-input" v-model="woman" value="女"> <span class="mini mint-checkbox-core"></span></span>  &nbsp; &nbsp;
            女士
          </div>
         </div> 
         <div class="cell-wrapper">
            <div class="cell-title">
              <span>联系电话</span>
            </div>
            <div class="cell-value">
              <input placeholder="请输入电话" v-model="phone"/>
            </div>
         </div>
         <div class="cell-wrapper" @click="toLocation()">
            <div class="cell-title">
              <span>收货地址</span>
            </div>
            <div class="cell-operator">
              <span style="font-size: 14px;color:#999;"> ({{addressState}})</span> <i class="iconfont icon-ziyuan2"></i>
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
         <mt-button type="primary" size="large" @click="addAddress()">保存</mt-button>
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
      stateInfo:'新建地址',
      man:true,
      woman:false,
      isDefault:false,
      name:'',
      phone:'',
      detailAddress:'',
      longitude :0,
      latitude:0,
      token:'',
      uid:'',
      city:'广州',
      district:'',
      road:'',
      addressState:'未选择'
    }
  },
  methods: {
    setDefault(){
      this.isDefault =  !this.isDefault;
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
    addAddress(){
       var isOk = this.filterData();
       if(isOk){
       var _this = this;
       var host = this.$bus.data.host;
       var port = this.$bus.data.port;
       var getUrl = "http://"+host+":"+port+"/user/addUserAddress";
       var formData = new FormData();
       formData.append("userId", _this.uid);
       formData.append("token", _this.token);
       formData.append("address",_this.detailAddress);
       formData.append("name",_this.name);
       formData.append("sex",_this.man==true?'男':'女');
       formData.append("phoneNumber",_this.phone);
       formData.append("city",_this.city);
       formData.append("district",_this.district);
       formData.append("road",_this.road);
       formData.append("longitude",_this.longitude)
       formData.append("latitude",_this.latitude)
       formData.append("defaultAddress",_this.isDefault)
        var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        _this.$http.post(getUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              storageUtil.removeStorage("newAddress");
              _this.$router.push({ path:'/address'  })
            }
        });
       }else{
        Toast('亲，请完善以上信息再保存');
       }
       
    },
    filterData(){
      var isFinish = true;
      if(this.name.trim()=='')isFinish = false;
      if(this.phone.trim()=='')isFinish = false;
      if(this.detailAddress.trim()=='')isFinish = false;
      if(this.latitude==0)isFinish = false;
      return isFinish;
    },
    toLocation(){
      var addressTemp = {};
      addressTemp.isDefault = this.isDefault;
      addressTemp.name = this.name;
      addressTemp.phone = this.phone;
      addressTemp.detailAddress = this.detailAddress;
      addressTemp.sex = this.man;
      addressTemp.longitude = this.longitude;
      addressTemp.latitude = this.latitude;
      addressTemp.district = this.district;
      addressTemp.road = this.road;
      storageUtil.setStorage("newAddress",JSON.stringify(addressTemp));
      this.$router.push({path:"/location"})
    }
  },
  created () {
        this.token = storageUtil.getStorage("token")
        this.uid = storageUtil.getStorage("uid")
        var addressData = storageUtil.getStorage("newAddress");
        if(addressData!=undefined){
          this.addressState = "已选择"
          addressData = JSON.parse(addressData);
          console.log(addressData)
          this.longitude = addressData.longitude;
          this.latitude = addressData.latitude;
          this.road = addressData.road;
          this.district = addressData.district;
          this.name = addressData.name;
          this.phone = addressData.phone;
          this.detailAddress = addressData.detailAddress;
          this.isDefault = addressData.isDefault;
          this.man = addressData.sex==true?true:false;
          this.woman = addressData.sex==true?false:true;
        }
  }
}
</script>

<style>
  .address-box1{
    background: #fff;
    margin-top: 5px;
    color: #999999;
    font-size: 14px;
    padding: 10px 0px;
  }
  .mini.mint-checkbox-core{
    width: 14px;
    height: 14px;
  }
  .address-box2{
    margin-top: 5px;
    background: #fff;
  }
  .cell-wrapper{
    padding:10px 12px;
    border-bottom: 1px solid #eeeeee;
    align-items: center;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    width: 100%;
 }
 .cell-title{
    width: 105px;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    font-size: 14px;
    color: #999;
 }
 .cell-value{
  -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
 }
 .cell-value input{
     -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    width: 100%;
 }
 .cell-operator{
  width: 80%;
  text-align: right;
 }
 .address-box3{
  margin-top: 20px;
  padding: 0px 20px; 
 }
</style>