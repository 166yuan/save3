<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  methods: {
    routerChange () {
        
      }
  },
  created () {
      this.routerChange()
  },
  watch: {
      '$route': function () {
        this.routerChange()
      }
    }
}
</script>

<style>

html,body{
  height: 100%;
  padding: 0;
  margin:0;
  overflow-x: hidden;
  background: #fafafa;
}

#app {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 50px;*/
  height: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin:0;
}

p{
  margin: 0;
  padding: 0;
}
.common-wrap{
  height: 100%;
  background: #fff;
}
.common-wrap2{
  height: 100%;
}

input:input-placeholder {
　　color:#fff;
}

.mint-button--primary {
    color: #fff;
    background-color: #3f83ef;
}
.mint-tab-item-label {
    font-size: 14px;
 }
 .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #26a2ff;
    color: #26a2ff;
     margin-bottom: 0px; 
}
</style>
