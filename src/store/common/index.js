const state = {
  devMode: false
}

const getters = {
  devMode: state => {
    return state.devMode
  }
}

const actions = {}

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