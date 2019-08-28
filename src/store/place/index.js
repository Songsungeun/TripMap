const state = {
  place: undefined
}

const getters = {

}

const actions = {
  
  searchPlace( { state, commit }, keyword) {
    if (!kakao) return;
    this.state.dev && console.log(`search keyword is ${keyword}`);
    commit('initPlace');
    
    return new Promise( (resolve, reject) => {
      state.place.keywordSearch(keyword, (result, status) => {
        switch ( status ) {
          case kakao.maps.services.Status.OK: resolve(result); break;
          case kakao.maps.services.Status.ZERO_RESULT: reject("검색 결과가 없습니다."); break;
          case kakao.maps.services.Status.ERROR: reject("오류가 발생했습니다."); break;
        }
      });

    }); 
  }
}

const mutations = {
  initPlace( state ) {
    state.place = new kakao.maps.services.Places();
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}