import { useState, useEffect } from "react";
import axios from "axios";
import KakaoMap from "@comp/KakaoMap";
import StoreInfo from "@comp/StoreInfo";
import SwipeVerticalSection from "@comp/SwipeVerticalSection";

export default function Home() {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/stores")
      .then((response) => {
        setStoreList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main-section page-home">
      <KakaoMap storeList={storeList} />
      <SwipeVerticalSection>
        <ul className="store-list">
          {storeList.map((store) => (
            <StoreInfo store={store} key={`${store.id}`} />
          ))}
        </ul>
      </SwipeVerticalSection>
    </div>
  );
}
