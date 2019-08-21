<template>
  <v-app class="body_wrap">
    <nav-bar/>

    <app-header></app-header>    

    <v-content>
      <map-area style="left: 300px; height: 100%; background-color: black; position: absolute"></map-area>
    </v-content>
  </v-app>
</template>

<script>
import appHeader from './components/Header';
import navBar from './components/NavBar';
import mapArea from './components/Map';

export default {
  name: 'App',
  components: {
    appHeader,
    navBar,
    mapArea,
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.body_wrap {
  font-family: "Roboto", sans-serif;
}
</style>
