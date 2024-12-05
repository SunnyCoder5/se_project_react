import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ handleProfileEditClick, handleLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="side-bar">
      <div className="side-bar__user">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="side-bar__user-avatar"
        />
        <p className="side-bar__user-name">{currentUser.name}</p>
      </div>
      <div className="sidebar__button-container">
        <button className="sidebar__button" onClick={handleProfileEditClick}>
          Change Profile Data
        </button>
        <button className="sidebar__button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
