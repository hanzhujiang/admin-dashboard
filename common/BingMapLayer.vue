<template>
  <div class="map-container">
    <div  :id="id"></div>
  </div>
</template>
 
<script>
 
import bingMap from '../assets/js/BingMap.js'

export default {
  data () {
    return {
      map: null
    }
  },
  created: function () { 
    bingMap.init()
    .then((Microsoft) => {
      this.initMap();
      if (this.onInitSuccess !== null) {
        this.onInitSuccess();
      }
    })
  },
  props: {
    id: {
      default: 'localMap'
    },
    singleAddress: {},
    multiAddress: {},
    isCoordinate: {
      default: true
    },
    isClickable: {
      default: false
    },
    callback: {},
    onInitSuccess: {}
  },
  methods: {
    initMap () {
      this.map = bingMap.createMap('#'+this.id, null);
      if (this.isClickable != null && this.isClickable) {
        bingMap.onClick(this.map, this.getClickLocation);
      }
    },
    getClickLocation (e) {
      let loc = bingMap.getClickLocation(e);
      bingMap.setPushPin(this.map, [{latitude: loc.latitude,longitude: loc.longitude}])
      this.callback('', e.pageX, e.pageY, loc.latitude, loc.longitude);
    },
  },
  watch: {
    singleAddress: {
      handler: function(val, oldVal) {
        if (this.isCoordinate) {
          if (val.latitude && val.longitude) {
            bingMap.showLocation(this.map, [val], this.callback)  
          }
        } else {
          bingMap.searchAddress(this.map, val, this.callback);
        }
      }, 
      deep:true
    }, 
    multiAddress: {
      handler: function(val, oldVal) {
        if (this.isCoordinate) {
          bingMap.showLocation(this.map, val, this.callback)  
        } else {
          bingMap.searchMultiAddress(this.map, val, this.callback);
        }
      }, 
      deep:true
    } 
  }
}
</script>
 
<style scoped>
  .map-container {
    width: 100%;
    height: 400px;
    border: 1px solid #000;
  }
</style>