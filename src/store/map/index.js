import loadScriptOnce from 'load-script-once'
const state = {
  map: null,
  place: null
}

const getters = {
  map: state => {
    return state.map;
  },
  place: state => {
    return state.place;
  }
}

const actions = {
  async loadMapScript() {
    await loadScriptOnce(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7c4d00c6529a86c577db80f7fd63e840&libraries=services`);
  },
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
  },
  setMapObj( state, payload ) {
    state.map = new kakao.maps.Map(payload.el, payload.option);
  },
  setPlaceObj( state ) {
    state.place = new kakao.maps.services.Places();
  },
  setPlacePositionInMap( state, placeList ) {
    let bounds = new kakao.maps.LatLngBounds();
    placeList.forEach(place => {
      this.commit('setDisplayMarker', place)
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    });
    state.map.setBounds(bounds);
  },
  setDisplayMarker( state, place) {
    let paramObj = {map: state.map, position: new kakao.maps.LatLng(place.y, place.x)}
    let marker = new kakao.maps.Marker(paramObj);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}