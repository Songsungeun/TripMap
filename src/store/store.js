import Vue from 'vue'
import Vuex from 'vuex'

// modules
import global from './common/index'
import place from './place/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dev: false
  },
  getters: {
    dev: state => {
      return state.dev;
    }
  },
  actions: {
    
  },
  mutations: {
    changeDevMode ( state, payload ) {
      state.dev = payload;
    }
  },
  modules: {
    global,
    place
  }
})
