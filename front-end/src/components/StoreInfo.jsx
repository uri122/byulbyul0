export default function StoreInfo({ store }) {
  return (
    <li className="store-info">
      <h3 className="store-name">{store.name}</h3>
      <p>주소 - {store.addr}</p>
      {store.contact[0] ? <p>연락처 - {store.contact.join("-")}</p> : ""}
      {store.openHours[0] ? (
        <p>
          영업시간 - {store.openHours.join(":")} ~ {store.closedHours.join(":")}
        </p>
      ) : (
        ""
      )}
      {store.bestBread ? <p>추천 - {store.bestBread}</p> : ""}
    </li>
  );
}
