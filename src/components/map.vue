<template>
    <v-container fluid></v-container>
</template>

<script>
import loadScriptOnce from 'load-script-once';
import { mapGetters } from "vuex";

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['devMode'])
    },
    mounted() {
        this.loadMapAPI(this.devMode);
    },
    methods: {
        async loadMapAPI(dev) {
            await loadScriptOnce(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7c4d00c6529a86c577db80f7fd63e840`)
            navigator.geolocation.getCurrentPosition(function( position ) {
                dev && console.log(position)
            }, function( err ) {
                console.log(err)
            })
            kakao.maps.load(() => {
                let options = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3
                };
                var map = new kakao.maps.Map(this.$el, options);
            })
        }
    }
}
</script>