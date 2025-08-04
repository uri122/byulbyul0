// import KakaoMap from "@comp/KakaoMap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Map } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import imgBreadMarker from "@assets/bread-marker.png";
// import iBackBtn from "@assets/back-button.svg";

export default function AddStore() {
  const [map, setMap] = useState();
  // const defaultLocation = { lat: 37.5665, lng: 126.978 }; // 기본으로 서울 시청 위치
  const defaultLoc = { lat: 37.5562308, lng: 126.9355188 };
  const [state, setState] = useState({
    center: { lat: 37.5665, lng: 126.978 },
    errMsg: null,
    isLoading: true,
  });
  const [storePos, setStorePos] = useState();
  const [storeAddr, setStoreAddr] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeContact, setStoreContact] = useState(["", "", ""]);
  const [storeOpenHours, setStoreOpenHours] = useState(["", ""]);
  const [storeClosedHours, setStoreClosedHours] = useState(["", ""]);
  const [storeBestBread, setStoreBestBread] = useState("");

  /************ 지도 제어 시작  **************/
  useEffect(() => {
    if (!map) return;
    // 현재 위치 조회 → 지도 초기화
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
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
        center: defaultLoc,
        isLoading: false,
      }));
    }
  }, [map]);

  // 좌표를 주소로 변환
  function onCoord2Address(map) {
    const latLng = map.getCenter();
    setStorePos({ lat: latLng.getLat(), lng: latLng.getLng() });

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(
      latLng.getLng(),
      latLng.getLat(),
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setStoreAddr(
            !!result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name // 건물이 아닌곳은 도로명 없음
          );
        }
      }
    );
  }
  /************ 지도 제어 끝  **************/

  /************ 폼 저장 시작  **************/
  async function onSaveStoreInfo() {
    if (!storeName || !storeAddr) {
      alert("필수 입력란을 채워주세요!!");
      return;
    }

    const savedList = {
      name: storeName,
      latlng: storePos,
      addr: storeAddr,
      contact: storeContact,
      openHours: storeOpenHours,
      closedHours: storeClosedHours,
      bestBread: storeBestBread,
    };

    await axios
      .post("http://localhost:4000/stores", savedList)
      .then(() => {
        alert("가게 추가에 성공했습니다! 홈에서 확인하세요.");
      })
      .catch((error) => {
        console.log(error);
        alert("가게 추가에 실패했습니다. 다시 시도해주세요.");
      });
  }

  return (
    <section className="main-section page-add-store">
      <header>
        {/* <button className="btn-back">
          <img src={iBackBtn} />
        </button> */}
        <span className="page-title">빵집 추가</span>
      </header>
      <div className="page-contents">
        {/* <KakaoMap
          height="200px"
          isCenterMarkerView={true}
          setCurPos={setCurPos}
          setStoreInfo={setStoreInfo}
        /> */}
        <div className="map-container">
          <Map
            id="map"
            center={defaultLoc}
            style={{
              width: "100%",
              height: "300px",
            }}
            level={2} // 지도의 확대 레벨
            onCreate={setMap}
            onIdle={onCoord2Address}
          />
          <img src={imgBreadMarker} className="center-Maker" />
        </div>

        <div>
          <label>
            빵집 주소
            <span className="require"></span>
            <input
              type="text"
              value={storeAddr}
              readOnly
              placeholder="지도를 움직여 주소를 입력해주세요"
            />
          </label>
        </div>
        <div>
          <label>
            빵집 이름
            <span className="require"></span>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value.trim())}
            />
          </label>
        </div>
        <div>
          <label>
            전화번호
            <div className="flx mt8">
              <input
                type="text"
                className="ta-c"
                value={storeContact[0]}
                onChange={(e) => {
                  const newContract = { ...storeContact };
                  newContract[0] = e.target.value.trim();
                  setStoreContact(newContract);
                }}
              />
              <span>-</span>
              <input
                type="text"
                className="ta-c"
                value={storeContact[1]}
                onChange={(e) => {
                  const newContract = { ...storeContact };
                  newContract[1] = e.target.value.trim();
                  setStoreContact(newContract);
                }}
              />
              <span>-</span>
              <input
                type="text"
                className="ta-c"
                value={storeContact[2]}
                onChange={(e) => {
                  const newContract = { ...storeContact };
                  newContract[2] = e.target.value.trim();
                  setStoreContact(newContract);
                }}
              />
            </div>
          </label>
        </div>
        <div>
          <label>
            영업 시간
            <div className="flx mt8">
              <input
                type="text"
                className="ta-c"
                value={storeOpenHours[0]}
                onChange={(e) => {
                  const newHours = { ...storeOpenHours };
                  newHours[0] = e.target.value.trim();
                  setStoreOpenHours(newHours);
                }}
              />
              <span>:</span>
              <input
                type="text"
                className="ta-c"
                value={storeOpenHours[1]}
                onChange={(e) => {
                  const newHours = { ...storeOpenHours };
                  newHours[1] = e.target.value.trim();
                  setStoreOpenHours(newHours);
                }}
              />
              <span>~</span>
              <input
                type="text"
                className="ta-c"
                value={storeClosedHours[0]}
                onChange={(e) => {
                  const newHours = { ...storeClosedHours };
                  newHours[0] = e.target.value.trim();
                  setStoreClosedHours(newHours);
                }}
              />
              <span>:</span>
              <input
                type="text"
                className="ta-c"
                value={storeClosedHours[1]}
                onChange={(e) => {
                  const newHours = { ...storeClosedHours };
                  newHours[1] = e.target.value.trim();
                  setStoreClosedHours(newHours);
                }}
              />
            </div>
          </label>
        </div>
        <div>
          <label>
            추천 빵
            <input
              type="text"
              placeholder="예) 소금빵, 크로와상"
              value={storeBestBread}
              onChange={(e) => setStoreBestBread(e.target.value.trim())}
            />
          </label>
        </div>
        <button className="btn-save mt30" onClick={onSaveStoreInfo}>
          추가
        </button>
      </div>
    </section>
  );
}
