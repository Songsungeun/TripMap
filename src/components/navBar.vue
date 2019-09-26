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
    <v-tabs
      v-model="tab"
      background-color="#69A2DD"
      centered
      dark
      icons-and-text
      style="height: 60px;"
    >
    
      <v-tab href="#search_place" @click="changeTab('search')">
        검색 장소
        <v-icon>mdi-magnify</v-icon>
      </v-tab>

      <v-tab href="#saved_place" @click="changeTab('save')">
        저장 장소
        <v-icon>mdi-content-save</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- 첫번째 탭 - 장소 검색 결과 리스트 노출 영역 -->
      <v-tab-item value="search_place">
        <v-list dense class="search_result_wrap">
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(place, index) in getPlaceSearchResult"
              :key="place.id"
            >
              <v-list-item-content>
                <v-list-item-title style="font-size: medium;">
                  <v-flex>
                    <a @click="selectPlace(place)" @mouseover="showInfoWindow(place, index)" @mouseout="hideInfoWIndow" style="color: black !important;" class="search_item">
                      <span class="search_index">{{index + 1}}.</span>{{ place.place_name }}
                    </a>
                    <v-icon color="purple" style="float:right;" @click="savePlace(place)">mdi-plus</v-icon>
                  </v-flex>
                  
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <pagination v-if="getPagination"></pagination>

      </v-tab-item>
      
      <!-- 두번째 탭 - 유저가 저장한 장소 리스트 출력 영역 -->
      <v-tab-item value="saved_place">
        <v-list dense class="search_result_wrap">
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(place, index) in getSavedPlaceList"
              :key="place.id"
            >
              <v-list-item-content>
                <v-list-item-title style="font-size: medium;">
                  <v-flex>
                    <a @click="selectPlace(place)" @mouseover="showInfoWindow(place, index)" @mouseout="hideInfoWIndow" style="color: black !important;" class="search_item">
                      <span class="search_index">{{index + 1}}.</span>{{ place.place_name }}
                    </a>
                    <v-icon color="grey" style="float:right;" @click="deletePlace(place)">mdi-delete</v-icon>
                  </v-flex>
                  
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-btn text color="deep-purple accent-4" @click="deleteAllPlace">
          <v-icon color="grey" style="float:right;">mdi-delete</v-icon>
          <span>전체 삭제</span>
        </v-btn>
      </v-tab-item>
    </v-tabs-items>
    

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
        tab:null,
        places: [],
        mode: false,
        inputPlace: '',
        targetMarker: null,
        savePlaceLimit: 15
      }
    },
    computed: {
        ...mapGetters(['dev', 'map', 'getInfoWindow', 'getMarkers', 'getPagination', 'getPlaceSearchResult', 'getSavedPlaceList'])
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
      savePlace(place) {
        let hasPlace = this.getSavedPlaceList.some((savedPlace) => {
          return savedPlace.id === place.id;
        })
        
        if (hasPlace) {
          alert("이미 등록되어있어요."); 
          return; 
        };

        if (this.getSavedPlaceList.length < this.savePlaceLimit) {
          this.$store.commit('setPlaceInSavedList', place);
        } else {
          alert("장소 저장은 15개까지 가능해요.");
        }

      },
      deletePlace(place) {
        this.$store.commit('removeOneSavedPlace', place);
      },
      deleteAllPlace() {
        this.$store.commit('removeAllSavedPlace');
      },
      showInfoWindow(place, index) { // 검색 결과 리스트에서 element에 mouseover시 실행되는 이벤트
        this.targetMarker = this.getMarkers.find((mark) => {
          return mark.getTitle() === place.id;
        })

        kakao.maps.event.trigger(this.targetMarker, 'mouseover');
      },
      hideInfoWIndow() { // 검색 결과 리스트에서 element에 mouseoout시 실행되는 이벤트
        kakao.maps.event.trigger(this.targetMarker, 'mouseout');
      },
      changeTab(tabType) {
        this.$store.commit('setPlacePositionInMap', tabType);
      }
    }
  }
</script>