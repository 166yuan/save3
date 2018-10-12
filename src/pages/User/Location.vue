 <template>
   <div class="common-wrap">
     <top headType="5" stateInfo="返回"></top>
     <div class="map-wrapper">
        <div class="amap-container">
          <el-amap-search-box class="search-box"  :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
          <el-amap vid="amap" ref="map" :center="mapCenter" :zoom="zoom" :events="events" class="amap">
            <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
          </el-amap>
        </div>
     </div>
   </div>
	
 </template>

 <script>
let pos = {};
let geo; 
import Top from '../../components/Header.vue'
import storageUtil from '../../util/storageUtil.js'
export default {
  name: 'location',
  components: {
      Top
  },
  data () {
    let self = this;
    return {
         searchResult:'', 
         geocoder:{},
         addressData:"",
         basicData: {
          latitude: '',
          longitude: ''
         },
         zoom:12,
         markers: [
              [113.256874, 23.18562]
         ],
         searchOption: {
            city: '广东',
            citylimit: true
         },
          mapCenter: [113.256874, 23.18562],
          events: {
            init(o) {
              geo = new AMap.Geocoder({
              radius: 1000,
              extensions: 'all'
            });
          },
          'click': (e) => {
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;
              geo.getAddress([lng ,lat], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress;
                    console.log(result.regeocode)
                    console.log(self.address);
                  }
                }
              });         
        }  
      },
      lng:0,
      lat:0,
      address:''
    }
  },
  methods: {
    onSearchResult(pois) {
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
            this.markers[0] = [center.lng, center.lat];

            this.basicData.longitude = center.lng;
            this.basicData.latitude = center.lat;
            
          }
        }
  },
  created () {
    var addressTemp = storageUtil.getStorage("newAddress")
    if(addressTemp!=undefined){
      addressTemp = JSON.parse(addressTemp);
      self.addressData = addressTemp;
    }
    
  },
  mounted(){
    //绑定点击事件
    var Ul = document.querySelector(".search-tips ul");
    Ul.onclick = function(e){
      if(e.target.nodeName=='LI'){
        var address = e.target.innerText;
        geo.getLocation("北京市海淀区苏州街", function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
             var geoInfo = result.geocodes[0]
             self.addressData.district = geoInfo.addressComponent.district;
             self.addressData.longitude = geoInfo.location.lng;
             self.addressData.latitude = geoInfo.location.lat;
             self.addressData.road = geoInfo.addressComponent.street;
             console.log(self.addressData);
             storageUtil.setStorage("newAddress",JSON.stringify(self.addressData))
          }else{
              //获取经纬度失败
              console.error("获取经纬度失败");
          }
        }); 
      }
    }

  },
  watch:{
  }
}
 </script>

 <style>
 .map-wrapper{
  height: inherit;
 }
 .el-vue-search-box-container{
    margin:0 auto;
 }
 .amap-container{
  position: relative;
   height: 100%;
 }
 .amap {
        width: 660px;
        height: 240px;
 }
 .el-vue-search-box-container .search-tips{
  width: 99%;
 }
 </style>