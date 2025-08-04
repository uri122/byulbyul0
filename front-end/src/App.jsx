import Router from "./router.jsx";
import { NavLink } from "react-router-dom";
import iHome from "@assets/home.svg";
import iAdd from "@assets/add.svg";
import iNoti from "@assets/notification.svg";
import iProfile from "@assets/profile.svg";

export default function App() {
  return (
    <>
      <Router />
      <ul className="tool-bar">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={iHome} />
            <span>홈</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-store"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={iAdd} />
            <span>추가</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/noti-list"
            className={({ isActive }) => (isActive ? "active" : "")}
            disabled
          >
            <img src={iNoti} />
            <span>알림</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={iProfile} />
            <span>마이</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}
