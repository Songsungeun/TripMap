<template>
  <v-app>
    <v-app-bar app height="45">
      <v-toolbar-title class="headline text-uppercase">
        <span>Trip Map</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/Songsungeun/TripMap"
        target="_blank"
        class="ma-2"
      >
        <v-icon dark left>mdi-github-circle</v-icon>
        <span class="mr-2">Github</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <navBar/>
    </v-content>
  </v-app>
</template>

<script>
import navBar from './components/navBar';

export default {
  name: 'App',
  components: {
    navBar
  },
  data: () => ({
    //
  }),
};
</script>
