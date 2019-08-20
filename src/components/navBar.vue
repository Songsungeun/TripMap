<template>
  
    <v-navigation-drawer
      absolute
      permanent
      width="350"
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
    </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
      }
    },
  }
</script>

<style scoped>
.nav_text {
  font-size: 1.25rem !important;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em !important;
}

.nav_list {
  margin-top:10px;
}
</style>