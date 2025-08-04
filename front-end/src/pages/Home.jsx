import axios from "axios";
import KakaoMap from "@comp/KakaoMap";
import StoreInfo from "@comp/StoreInfo";
import SwipeVerticalSection from "@comp/SwipeVerticalSection";
import { useState } from "react";

export default function Home() {
  async function getData() {
    await axios
      .get("http://localhost:4000/stores")
      .then((response) => {
        setStoreList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getData();

  const [storeList, setStoreList] = useState([]);

  function onShowStoreList(ev) {
    console.log(ev);
  }

  return (
    <div className="main-section page-home">
      <KakaoMap storeList={storeList} />
      <SwipeVerticalSection>
        <ul className="store-list" onDrag={onShowStoreList}>
          {storeList.map((store) => (
            <StoreInfo store={store} key={`${store.id}`} />
          ))}
        </ul>
      </SwipeVerticalSection>
    </div>
  );
}
