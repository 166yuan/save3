import Vue from 'vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/iconfont/iconfont.css'
import App from './App.vue'
import axios from 'axios'
import cAMap from 'vue-amap';
import VeeValidate from 'vee-validate'
import VueBus from './config/vue-bus.js';

Vue.use(VueBus);
Vue.use(MintUI)
Vue.use(cAMap)
cAMap.initAMapApiLoader({
  // 高德的key
  key: '9dd9d19b79ad130e786b9187d21d6e3e',
  // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','Geocoder']
});


axios.defaults.baseURL = 'http://localhost:3000'  // 配置axios默认的baseURL
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
