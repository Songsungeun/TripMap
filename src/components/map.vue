<template>
  <v-container fluid></v-container>
</template>
<script>
import loadScriptOnce from 'load-script-once'
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      lat: null,
      lng: null
    }
  },
  computed: {
    ...mapGetters(['devMode'])
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      try {
        await loadScriptOnce(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7c4d00c6529a86c577db80f7fd63e840`);
        await this.setCenterPosition();
        await this.renderMap(this.lat, this.lng);
      } catch (err) {
        this.devMode && console.log(err);
      }
    },
    async setCenterPosition() {
      let position = await this.getLocation();
      this.lat = position.lat || 33.450701, this.lng = position.lng || 126.570667;
      this.devMode && console.log(`lat = ${this.lat}, lng = ${this.lng}`);
    },
    renderMap(lat, lng) {
      kakao.maps.load(() => {
        let options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 3
        };
        var map = new kakao.maps.Map(this.$el, options);
      })
    },
    getLocation() {
      return new Promise(function( resolve, reject ) {
        navigator.geolocation.getCurrentPosition(function( position ) {
          resolve( {lat: position.coords.latitude, lng: position.coords.longitude} );
        }, function ( err ) {
          this.devMode && console.log("위치 정보를 읽어오지 못했습니다.");
          reject(err)
        });
      });
    }
    
  }
}
</script>