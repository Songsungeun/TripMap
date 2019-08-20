<template>
  <v-app class="body_wrap">
    <navBar/>

    <v-app-bar app height="45" class="header_wrap">
      <v-toolbar-title class="headline text-uppercase">
        <span>Trip Map</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/Songsungeun/TripMap"
        target="_blank"
        class="ma-2 header_btn"
      >
        <v-icon dark left>mdi-github-circle</v-icon>
        <span class="mr-2">Github</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <map style="width: 600px; height: 600px;"></map>
    </v-content>
  </v-app>
</template>

<script>
import navBar from './components/navBar';
import map from './components/map';

export default {
  name: 'App',
  components: {
    navBar,
    map
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
