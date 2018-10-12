<template>
	<div>
		 <div class="mint-msgbox-wrapper" v-if="showDownload">
          <div class="msgbox">
             <div class="msgimg">
               <img src="../assets/empty_buy.png">
             </div>
             <p style="margin:20px 0px;">请下载飞滴送水进行更多操作</p>
             <mt-button type="primary" size="large" @click="closeDownload()">立即下载</mt-button>
             <p style="margin:10px 0px;color:#d9d9d9;" @click="closeDownload()">下次再说</p>
              <a class="close" @click="closeDownload()">X</a>
          </div>
      </div>
      <div class="v-modal" style="z-index: 2012;" v-if="showDownload"></div> 
	</div>
</template>

<script>
  export default {
    name: 'download',
    data(){
    	return{
    		showDownload:false
    	}	
    },
    methods: {
    	show(){
    		this.showDownload = true;
    	},
 		closeDownload(){
 			this.showDownload = false;
 		}
 	},
 	created () {
  	}    
  }
</script>

<style>

</style>