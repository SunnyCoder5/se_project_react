import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="side-bar">
      <img
        src={currentUser.avatar}
        alt={currentUser.name}
        className="side-bar__avatar"
      />
      <p className="side-bar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;
