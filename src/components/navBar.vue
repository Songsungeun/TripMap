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
                @keyup.enter="searchPlace"
              ></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(place, index) in places"
            :key="place.id"
          >
            <!-- <v-list-item-icon>
              <v-icon>{{ place.icon }}</v-icon>
            </v-list-item-icon> -->

            <v-list-item-content>
              <v-list-item-title style="font-size: medium;">
                <a @click="selectPlace" style="color: black !important;">
                <span class="search_index">{{index + 1}}.</span>{{ place.place_name }}</a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

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
import { mapGetters } from "vuex";
  export default {
    data () {
      return {
        places: [],
        mode: false,
        inputPlace: ''
      }
    },
    computed: {
        ...mapGetters(['Mode', 'dev'])
    },
    methods: {
      changeDebug() {
        this.mode = !this.mode;
        this.$store.commit('changeDevMode', this.mode);
      },
      async searchPlace() {
        try {
          this.dev && console.log(this.places);
          this.places = await this.$store.dispatch('searchPlace', this.inputPlace);
          this.$store.commit('setPlacePositionInMap', this.places);
        } catch (err) {
          this.dev && console.log(err);
          alert("Error 발생! Debug Mode: On 후에 콘솔창 확인하세요.")
        }
      },
      selectPlace() {
        console.log("select");
      }
    }
  }
</script>