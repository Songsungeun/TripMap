<template>
  <div class="text-center">
    <v-pagination
      v-model="getPagination.current"
      :length="getPagination.last"
      circle
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

  export default {
    data () {
      return {
      }
    },
    computed: {
        ...mapGetters(['dev', 'getPagination']),
    },
    updated() {
        this.getPagination.gotoPage(this.getPagination.current)
    }
  }
</script>