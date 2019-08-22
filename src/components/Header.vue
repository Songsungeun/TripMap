<template>
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
        <v-img
          :src="require('../assets/header_icon/airplane.svg')"
          class="my-3"
          contain
          height="30"
          width="30"
        ></v-img>
      </v-btn>

      <!-- 구글 숙박 검색 링크 -->
        <v-btn
        text
        href="https://www.google.com/search?ei=kqZcXcXBNc6noATxuanQBg&q=%EC%88%99%EB%B0%95&oq=tnrq&gs_l=psy-ab.3.0.0l10.194497.195453..196565...1.2..0.101.557.5j1....2..0....1..gws-wiz.....10..0i71j35i39j0i20i263j0i131j0i67j0i10.52tBCEeZ3Lo"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-img
          :src="require('../assets/header_icon/bed.svg')"
          class="my-3"
          contain
          height="30"
          width="25"
        ></v-img>
      </v-btn>

      <!-- AccuWeather 링크 -->
        <v-btn
        text
        href="https://www.accuweather.com/ko/search-locations"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-img
          :src="require('../assets/header_icon/sun.svg')"
          class="my-3"
          contain
          height="20"
          width="20"
        ></v-img>
      </v-btn>

      <!-- Daum 환율 링크 -->
        <v-btn
        text
        href="https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&q=%ED%99%98%EC%9C%A8"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-img
          :src="require('../assets/header_icon/currency.svg')"
          class="my-3"
          contain
          height="20"
          width="20"
        ></v-img>
      </v-btn>

      <!-- Tripadvisor 링크 -->
        <v-btn
        text
        href="https://www.tripadvisor.co.kr/?fid=6712a8f3-fe2c-4841-906b-6ae31d0189e5"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-img
          :src="require('../assets/header_icon/binoculars.svg')"
          class="my-3"
          contain
          height="20"
          width="20"
        ></v-img>
      </v-btn>

      <!-- 구글번역 링크 -->
        <v-btn
        text
        href="https://translate.google.co.kr/?hl=ko"
        target="_blank"
        class="header_btn_icon"
        small
      > 
        <v-img
          :src="require('../assets/header_icon/translation.svg')"
          class="my-3"
          contain
          height="20"
          width="20"
        ></v-img>
      </v-btn>
      
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/Songsungeun/TripMap"
        target="_blank"
        class="ma-2 header_btn"
      >
        <v-img
          :src="require('../assets/header_icon/github.svg')"
          class="my-3"
          contain
          height="20"
          width="20"
        ></v-img>
        <span class="mr-2">Github</span>
      </v-btn>
    </v-app-bar>
</template>
<script>
export default {
    
}
</script>