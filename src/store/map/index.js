import loadScriptOnce from 'load-script-once'
const state = {
  map: null,
  place: null,
  infoWindow: null
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
    state.infoWindow = new kakao.maps.InfoWindow({zIndex:1});
  },
  setPlacePositionInMap( state, placeList ) {
    let bounds = new kakao.maps.LatLngBounds();
    placeList.forEach(place => {
      this.commit('setDisplayMarker', place)
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    });
    state.map.setBounds(bounds);
  },
  setDisplayMarker( state, place ) {
    // var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',  
    let imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_normal.png',
    imageSize = new kakao.maps.Size(64, 69), 
    imageOption = {offset: new kakao.maps.Point(360, 198, 410, 162)}; 
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    let paramObj = {map: state.map, position: new kakao.maps.LatLng(place.y, place.x), image: markerImage}
    let marker = new kakao.maps.Marker(paramObj);
    
    kakao.maps.event.addListener(marker, 'click', () => {
      state.infoWindow.setContent(
        `<div style="padding:5px;font-size:12px;">
          <div>장소:  ${place.place_name}</div>
          <div>홈페이지:<a href="${place.place_url || '#'}">  ${place.place_url || '없음'}</a></div>
          <div>Tel:  ${place.phone || '등록안됨'}</div>
          <div>주소:  ${place.road_address_name || '등록안됨'}</div>
        </div>`
      );
      state.infoWindow.open(state.map, marker)
    })
  },
  
}

export default {
  state,
  getters,
  actions,
  mutations
}