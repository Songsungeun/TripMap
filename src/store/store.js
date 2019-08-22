import Vue from 'vue'
import Vuex from 'vuex'

// modules
import global from './common/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global
  }
})
