<template>
  
    <v-navigation-drawer
      absolute
      permanent
      width="300"
      class="nav_wrap"
    >
      <template v-slot:prepend>
        <v-list-item class="nav_list">
          <v-list-item-content>
            <!-- <v-list-item-title class="nav_text">어디로 가시겠어요?</v-list-item-title> -->
              <v-text-field
                label="어디로 가시겠어요?"
                single-line
                outlined
                :hide-details=true
                style="margin-top:10px;"
                v-model="inputPlace"
                append-icon="mdi-magnify"
                :autofocus="true"
                @keyup.enter="searchPlace"
              ></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense class="search_result_wrap">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(place, index) in getPlaceSearchResult"
            :key="place.id"
          >
            <!-- <v-list-item-icon>
              <v-icon>{{ place.icon }}</v-icon>
            </v-list-item-icon> -->

            <v-list-item-content>
              <v-list-item-title style="font-size: medium;">
                <v-flex>
                  <a @click="selectPlace(place)" @mouseover="showInfoWindow(place, index)" @mouseout="hideInfoWIndow" style="color: black !important;" class="search_item">
                  <span class="search_index">{{index + 1}}.</span>{{ place.place_name }}</a>

                   <v-icon color="purple" style="float:right;">mdi-plus</v-icon>
                </v-flex>
                
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <pagination v-if="getPagination"></pagination>

      <v-bottom-navigation
      hide-on-scroll
      absolute
      horizontal
      >
        <v-btn text color="deep-purple accent-4" @click="changeDebug" v-model="mode">
          <span>Debug Mode</span>
          <v-img
          :src="require('../assets/header_icon/bug.svg')"
          class="my-3"
          contain
          height="15"
          width="15"
        ></v-img>
        </v-btn>
      </v-bottom-navigation>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex"
import pagination from "./Pagination"

  export default {
    components: {
      pagination
    },
    data () {
      return {
        places: [],
        mode: false,
        inputPlace: '',
        targetMarker: null,
      }
    },
    computed: {
        ...mapGetters(['dev', 'map', 'getInfoWindow', 'getMarkers', 'getPagination', 'getPlaceSearchResult'])
    },
    methods: {
      changeDebug() {
        this.mode = !this.mode;
        this.$store.commit('changeDevMode', this.mode);
      },
      async searchPlace() {
        try {
          this.$store.dispatch('searchPlace', this.inputPlace); // 장소 검색 
        } catch (err) {
          alert(err)
        }
      },
      selectPlace(place) {
        console.log(place);
      },
      showInfoWindow(place, index) { // 검색 결과 리스트에서 element에 mouseover시 실행되는 이벤트
        this.targetMarker = this.getMarkers.find((mark) => {
          return mark.getTitle() === place.id;
        })

        kakao.maps.event.trigger(this.targetMarker, 'mouseover');
      },
      hideInfoWIndow() { // 검색 결과 리스트에서 element에 mouseoout시 실행되는 이벤트
        kakao.maps.event.trigger(this.targetMarker, 'mouseout');
      }
    }
  }
</script>