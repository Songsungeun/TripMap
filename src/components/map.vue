<template>
  <v-container fluid>
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      class="loading_bar"
      v-show="isLoading"
    ></v-progress-circular>

    <v-btn
      text
      small
      @click="refresh"
    > 
      <v-img
        :src="require('../assets/refresh.svg')"
        class="my-3"
        contain
        height="20"
        width="20"
        id="refresh_btn"
      ></v-img>
    </v-btn>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex"
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      isLoading: true,
      lat: null,
      lng: null
    }
  },
  computed: {
    ...mapGetters(['dev'])
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      try {
        this.isLoading = true;
        await this.loadMap();
        await this.setCenterPosition();
        await this.renderMap(this.lat, this.lng);
        this.isLoading = false;
      } catch (err) {
        this.dev && console.log(err);
      }
    },
    async loadMap() {
      await this.$store.dispatch('loadMapScript');
    },
    async setCenterPosition() {
      let position = await this.getLocation();
      this.lat = position.lat || 33.450701, this.lng = position.lng || 126.570667;
      this.dev && console.log(`lat = ${this.lat}, lng = ${this.lng}`);
    },
    renderMap(lat, lng) {
      kakao.maps.load(() => {
        let options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 3
        };
        this.$store.commit('setMapObj', {el: this.$el, option: options});
        this.$store.commit('setPlaceObj');
      })
    },
    getLocation() {
      return new Promise(( resolve, reject ) => {
        this.dev && console.log("위치정보 로딩중")
        navigator.geolocation.getCurrentPosition(function( position ) {
          resolve( {lat: position.coords.latitude, lng: position.coords.longitude} );
        }, (err) => {
          this.dev && console.log("위치 정보를 읽어오지 못했습니다.");
          reject(err)
        });
      });
    },
    refresh() {
      this.isLoading = true;
      this.setCenterPosition();
      this.renderMap(this.lat, this.lng);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
    
  }
}
</script>