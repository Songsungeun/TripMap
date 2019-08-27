import loadScriptOnce from 'load-script-once'

const state = {
  devMode: false
}

const getters = {
  devMode: state => {
    return state.devMode;
  }
}

const actions = {
  async loadMapScript () {
    await loadScriptOnce(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7c4d00c6529a86c577db80f7fd63e840&libraries=services`);
  }
}

const mutations = {
  changeDevMode ( state, payload ) {
    state.devMode = payload;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}