export default function StoreInfo({ store }) {
  return (
    <li className="store-info">
      <h3 className="store-name">{store.name}</h3>
      <p>주소 - {store.addr}</p>
      <p>연락처 - {store.contact}</p>
      <p>
        영업시간 - {store.openHours} ~ {store.closedHours}
      </p>
      <p>추천 - {store.bestBread}</p>
    </li>
  );
}
