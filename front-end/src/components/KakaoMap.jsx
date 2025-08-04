import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import imgBreadMarker from "@assets/bread-marker.png";

export default function BasicMap({ width, height, storeList }) {
  const mapWidth = width || "100%";
  const mapHeight = height || "100%";
  const defaultLocation = { lat: 37.5662957, lng: 126.9779451 }; // 기본으로 서울 시청 위치
  const [map, setMap] = useState();
  const [state, setState] = useState({
    center: defaultLocation,
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!map) return;

    // 현재 위치 조회 → 지도 초기화
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: pos.coords.latitude, // 위도
              lng: pos.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          console.warn("geolocation error:", err);
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // geolocation 지원 안 될 때 기본 위치
      setState((prev) => ({
        ...prev,
        center: defaultLocation,
        isLoading: false,
      }));
    }
  }, [map]);

  return (
    <div className="map-container">
      <Map
        id="map"
        center={state.center}
        style={{
          width: mapWidth,
          height: mapHeight,
        }}
        level={2}
        onCreate={setMap}
      >
        {storeList.map((pos) => (
          <MapMarker
            position={pos.latlng}
            key={`${pos.id}`}
            image={{
              src: imgBreadMarker,
              size: { width: 45, height: 38 },
            }}
          />
        ))}
      </Map>
    </div>
  );
}
