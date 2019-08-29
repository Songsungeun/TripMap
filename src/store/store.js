import Vue from 'vue'
import Vuex from 'vuex'

// modules
import mapStore from './map/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dev: false,
  },
  getters: {
    // 코딩 사용성을 위해 get텍스트 붙이지 않음.
    dev: state => {
      return state.dev;
    }
  },
  actions: {
    
  },
  mutations: {
    changeDevMode( state, payload ) {
      state.dev = payload;
    }
  },
  modules: {
    mapStore
  }
})
