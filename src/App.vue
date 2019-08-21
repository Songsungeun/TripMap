<template>
  <v-app class="body_wrap">
    <navBar/>

    <v-app-bar app height="45" class="header_wrap">
      <v-toolbar-title class="headline text-uppercase">
        <span class="header_title">Trip Map</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
        <!-- 구글 항공권 검색 링크 -->
        <v-btn
        text
        href="https://www.google.com/search?q=%ED%95%AD%EA%B3%B5%EA%B6%8C&oq=gkdrhd&aqs=chrome.1.69i57j0l5&sourceid=chrome&ie=UTF-8"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-icon dark left>mdi-airplane-takeoff</v-icon>
      </v-btn>

      <!-- 구글 숙박 검색 링크 -->
        <v-btn
        text
        href="https://www.google.com/search?ei=kqZcXcXBNc6noATxuanQBg&q=%EC%88%99%EB%B0%95&oq=tnrq&gs_l=psy-ab.3.0.0l10.194497.195453..196565...1.2..0.101.557.5j1....2..0....1..gws-wiz.....10..0i71j35i39j0i20i263j0i131j0i67j0i10.52tBCEeZ3Lo"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-icon dark left>mdi-hotel</v-icon>
      </v-btn>

      <!-- AccuWeather 링크 -->
        <v-btn
        text
        href="https://www.accuweather.com/ko/search-locations"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-icon dark left>mdi-weather-partly-cloudy</v-icon>
      </v-btn>

      <!-- Daum 환율 링크 -->
        <v-btn
        text
        href="https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&q=%ED%99%98%EC%9C%A8"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-icon dark left>mdi-currency-usd</v-icon>
      </v-btn>

      <!-- Tripadvisor 링크 -->
        <v-btn
        text
        href="https://www.tripadvisor.co.kr/?fid=6712a8f3-fe2c-4841-906b-6ae31d0189e5"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-icon dark left>mdi-binoculars</v-icon>
      </v-btn>

      <!-- 구글번역 링크 -->
        <v-btn
        text
        href="https://translate.google.co.kr/?hl=ko"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-icon dark left>mdi-google-translate</v-icon>
      </v-btn>
      
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
.header_title {
  margin-right: 20px;
}
.header_btn_icon {
  margin: 0;
}
.header_btn_icon:first {
  margin-left: 50px !important;
}
</style>
