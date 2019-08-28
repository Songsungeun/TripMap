import loadScriptOnce from 'load-script-once'

const state = {
  
}

const getters = {
  
}

const actions = {
  async loadMapScript () {
    await loadScriptOnce(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7c4d00c6529a86c577db80f7fd63e840&libraries=services`);
    
  }
}

const mutations = {
  
}

export default {
  state,
  getters,
  actions,
  mutations
}