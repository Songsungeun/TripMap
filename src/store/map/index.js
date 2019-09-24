import loadScriptOnce from 'load-script-once'
const state = {
  map: null,
  place: null,
  placeSearchResult: null,
  infoWindow: null,
  markers: [],
  pagination: null
}

const getters = {
  map: state => {
    return state.map;
  },
  place: state => {
    return state.place;
  },
  getInfoWindow: state => {
    return state.infoWindow;
  },
  getMarkers: state => {
    return state.markers;
  },
  getPagination: state => {
    return state.pagination;
  },
  getPlaceSearchResult: state => {
    return state.placeSearchResult;
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
      state.place.keywordSearch(keyword, (result, status, pagination) => {
        commit('setPlaceSearchData', result); // 검색 결과값 저장
        commit('setPlacePositionInMap'); // 맵에 표시
        commit('setPagination', pagination); // mutations에서 별도로 pagination작업해주기위해 state에 pagination object 저장
        switch ( status ) {
          case kakao.maps.services.Status.OK: resolve(); break;
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
  setPlacePositionInMap( state ) {
    this.commit('removeMarkers');
    let bounds = new kakao.maps.LatLngBounds();
    state.placeSearchResult.forEach(place => {
      this.commit('setDisplayMarker', place)
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    });
    state.map.setBounds(bounds);
  },
  setDisplayMarker( state, place ) {
    // var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',  
    // let imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_normal.png',
    // imageSize = new kakao.maps.Size(64, 69), 
    // imageOption = {offset: new kakao.maps.Point(360, 198, 410, 162)}; 
    // let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
    // let paramObj = {map: state.map, position: new kakao.maps.LatLng(place.y, place.x), image: markerImage}
    
    let paramObj = {map: state.map, position: new kakao.maps.LatLng(place.y, place.x)}
    let marker = new kakao.maps.Marker(paramObj);
    marker.setTitle(place.id); // NavBar에서 비교를 위해 title에 place id 값 넣어줌
    state.markers.push(marker); // 마커 배열에 별도 저장

    // event Listener 등록
    this.commit('addEventListener', 
      { target: marker, 
        eventName: 'mouseover', 
        handler: () => {
          this.commit('setInfoWindowContents', place);
          state.infoWindow.open(state.map, marker);
        }
      })
      
    this.commit('addEventListener', { target: marker, eventName: 'mouseout', handler: () => {state.infoWindow.close();} });
  },

  /* infoWindow용 make&set Content 함수
    param: place Object,  return: String for HTML
  */
  setInfoWindowContents( state, place ) {
    let html = `<div style="padding:5px;font-size:12px;">
                  <div>장소:  ${place.place_name}</div>
                  <div>홈페이지:<a href="${place.place_url || '#'}">  ${place.place_url || '없음'}</a></div>
                  <div>Tel:  ${place.phone || '등록안됨'}</div>
                  <div>주소:  ${place.road_address_name || '등록안됨'}</div>
                </div>`;
    state.infoWindow.setContent(html);
  },

  /* kakao EventListener 등록
    param: obj {target, eventName, handler}
  */
  addEventListener( state, obj) {
    if(!obj.target && !obj.eventName && !obj.handler) {
      state.dev && console.error('addEventListener func is required (target, eventName, handler).');
      state.dev && console.log('your option is');
      state.dev && console.log(obj); 
      alert('event 등록 옵션값을 확인해주세요.'); 
      return;
    }
    kakao.maps.event.addListener(obj.target, obj.eventName, obj.handler);
  },
  removeMarkers( state ) {
    state.markers.forEach((marker) => {
      marker.setMap(null)
    })
    state.markers = [];
    state.pagination = null;
  },
  setPlaceSearchData( state, searchResult ) {
    state.placeSearchResult = searchResult;
  },
  setPagination( state, pageObject ) {
    state.pagination = pageObject;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}