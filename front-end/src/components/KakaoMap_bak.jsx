// import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect, useRef } from "react";
import iconCenterMarker from "@assets/location.svg";

export default function KakaoMap({
  width,
  height,
  isCurBtnView,
  isCenterMarkerView,
  setCurPos,
  setStoreInfo,
}) {
  const mapWidth = width || "100%";
  const mapHeight = height || "100%";
  const mapContainer = useRef(null);
  // const [placeName, setPlaceName] = useState(
  //   "지도에서 클릭한 위치의 상호명이 이곳에 표시됩니다."
  // );

  useEffect(() => {
    if (!window.kakao) return;
    const { kakao } = window;

    // 지도 생성 및 클릭 이벤트 등록 함수
    const initializeMap = ({ lat, lng }) => {
      // 1) 지도 생성 (현재 위치 또는 기본 위치)
      const map = new kakao.maps.Map(mapContainer.current, {
        center: new kakao.maps.LatLng(lat, lng),
        level: 2,
      });

      // 2) Places 서비스 객체 생성
      const places = new kakao.maps.services.Places();

      // 재사용 마커 & 인포윈도우
      const marker = new kakao.maps.Marker({ map });
      const infoWindow = new kakao.maps.InfoWindow();

      // 키워드 리스트
      const keywords = ["제과", "베이커리", "카페"];

      // 순차적 키워드 검색 함수
      const searchByKeywords = (idx, clickPos) => {
        const keyword = keywords[idx];
        places.keywordSearch(
          keyword,
          (results, status) => {
            // 정상 처리 & 결과 있음
            if (status === kakao.maps.services.Status.OK && results.length) {
              const best = results[0];
              const position = new kakao.maps.LatLng(best.y, best.x);
              console.log(best);

              marker.setPosition(position);
              marker.setMap(map);

              infoWindow.setContent(
                `<div class="store-info">
                <p>${best.place_name}</p>
                <p>${best.address_name}</p>
                <a href=` +
                  best.place_url +
                  `>More Info</a>
                </div>`
              );

              infoWindow.open(map, marker);

              // setPlaceName(
              //   `가장 가까운 상호명 (${keyword}): ${best.place_name}`
              // );
            }
            // 결과 없음 → 다음 키워드 시도 or 최종 “검색 결과가 없습니다.”
            else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              if (idx + 1 < keywords.length) {
                searchByKeywords(idx + 1, clickPos);
              } else {
                marker.setMap(null);
                infoWindow.close();
                // setPlaceName("검색 결과가 없습니다.");
              }
            }
            // 오류
            else {
              marker.setMap(null);
              infoWindow.close();
              // setPlaceName("검색 중 오류가 발생했습니다.");
            }
          },
          {
            location: clickPos,
            radius: 10,
            sort: kakao.maps.services.SortBy.DISTANCE,
          }
        );
      };

      // 지도 클릭 이벤트
      kakao.maps.event.addListener(map, "click", (mouseEvent) => {
        const clickPos = mouseEvent.latLng;
        // setPlaceName("검색 중..."); // 로딩 상태 메시지
        marker.setMap(null); // 이전 마커 제거
        infoWindow.close();

        // 상위 컴포넌트에서 쓰일 좌표 저장
        setCurPos(clickPos);

        // 첫 키워드부터 순차 검색 시작
        searchByKeywords(0, clickPos);
      });
    };

    // 현재 위치 조회 → 지도 초기화
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          initializeMap({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("geolocation error:", err);
          // 권한 거부 또는 오류 시 기본 서울 시청 위치 사용
          initializeMap({ lat: 37.5665, lng: 126.978 });
        }
      );
    } else {
      // geolocation 지원 안 될 때 기본 위치
      initializeMap({ lat: 37.5665, lng: 126.978 });
    }
  }, []);

  return (
    <>
      <div className="map-container">
        <div
          id="map"
          ref={mapContainer}
          style={{ width: mapWidth, height: mapHeight }}
          onDragEnd={(map) => {
            setStoreInfo(map.getCenter());
            console.log(map.getCenter());
          }}
        />
        {isCurBtnView ? <button className="cur-pos">현</button> : ""}
        {isCenterMarkerView ? (
          <img src={iconCenterMarker} className="center-Maker" />
        ) : (
          ""
        )}
        {/* <div style={{ marginTop: "8px", fontSize: "16px" }}>{placeName}</div> */}
      </div>
    </>
  );
}
