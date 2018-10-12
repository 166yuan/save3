<template>
	<div class="common-wrap2">
     <div>
       <top headType="5" stateInfo="个人信息"></top>
       <div>
        <div class="personal-info">
        <input type="file" id="uploadAvatar" accept="image/*" capture="camera" @change="upload" style="display:none;" />
          <mt-cell title="头像" @click.native="trigger()" is-link>
            <img :src="avatarUrl" class="avatar-small">
          </mt-cell>
          <mt-cell title="昵称" value="路人甲乙丙"></mt-cell>
          <mt-cell title="飞滴号" value="Feidi123"></mt-cell>
       </div> 
       <div class="personal-info2">
          <mt-cell title="修改密码"></mt-cell>
       </div> 
     </div> 
     </div>
	</div>
</template>

<script>
  import Top from '../../components/Header.vue'
  import storageUtil from '../../util/storageUtil.js'
  //import qiniu from "qiniu.js"
  export default {
  name: 'personal',
  components: {
      Top
  },
  data () {
    return {
      avatarUrl:'http://ot0dkoop4.bkt.clouddn.com/avator.png',
      uid:'',
      token:'',
      qiniuToken:'',
      userInfo:''
    }
  },
  methods: {
     trigger(){
        document.getElementById('uploadAvatar').click()
     },
     upload (e) {
        let files = e.target.files || e.dataTransfer.files;
        console.log(files)  
        if (!files.length) return;    
     }
  },
  created(){
      this.token = storageUtil.getStorage("token")
      this.uid = storageUtil.getStorage("uid")
      this.userInfo = JSON.parse(storageUtil.getStorage("userInfo"))
      
      var _this = this;
      var host = this.$bus.data.host;
      var port = this.$bus.data.port;
      var getUrl = "http://"+host+":"+port+"/user/getUpToken";
      var formData = new FormData();
      formData.append("userId", this.uid);
      formData.append("token", this.token);
      var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
        this.$http.post(getUrl,formData,config).then(function(res){
            if(!res.data.success){
              MessageBox('错误',res.data.msg.split(":")[1])
            }else{
              _this.qiniuToken = res.data.obj;
            }
        });
   console.log(qiniu);

  }
}
</script>

<style type="text/css">
  .personal-info{
    margin-top: 10px;
  }
  .personal-info2{
    margin-top:30px;
  }
  .avatar-small{
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
</style>