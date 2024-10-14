import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="side-bar">
      <img src={avatar} alt="User avatar" className="side-bar__avatar" />
      <p className="side-bar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
