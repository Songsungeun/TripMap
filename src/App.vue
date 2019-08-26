<template>
  <v-app class="body_wrap">
    <nav-bar/>

    <app-header></app-header>    

    <v-content>
      <map-area class="map_body"></map-area>
      <v-btn
        text
        small
        @click="refresh"
      > 
        <v-img
          :src="require('./assets/refresh.svg')"
          class="my-3"
          contain
          height="20"
          width="20"
          id="refresh_btn"
        ></v-img>
      </v-btn>
    </v-content>
  </v-app>
</template>

<script>
import appHeader from './components/Header'
import navBar from './components/NavBar'
import mapArea from './components/Map'

export default {
  name: 'App',
  components: {
    appHeader,
    navBar,
    mapArea,
  },
  data: () => ({
  })
};
</script>