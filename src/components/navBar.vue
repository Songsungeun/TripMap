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
            <v-list-item-title class="nav_text">어디로 가시겠어요?</v-list-item-title>
              <v-text-field
                label="목적지를 입력하세요"
                single-line
                outlined
                :hide-details=true
                style="margin-top:10px;"
              ></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click=""
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-bottom-navigation
      scroll-target="#scroll-area-1"
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
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mode: false
      }
    },
    computed: {
        ...mapGetters(['devMode'])
    },
    methods: {
      changeDebug() {
        this.mode = !this.mode;
        this.$store.commit('changeDevMode', this.mode);
      }
    }
  }
</script>