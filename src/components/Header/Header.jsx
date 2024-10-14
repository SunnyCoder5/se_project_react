import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  addButtonClick,
  weatherData,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header ">
      {" "}
      <Link to="/">
        {!isMobileMenuOpened && (
          <img className="header__logo" src={logo} alt="App logo" />
        )}
      </Link>
      {!isMobileMenuOpened && (
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      )}
      {!isMobileMenuOpened && (
        <button
          type="button"
          className="header__menu_mobile-button"
          onClick={toggleMobileMenu}
        ></button>
      )}
      <div
        className={` ${
          isMobileMenuOpened ? "header__menu_mobile" : "header__menu"
        }`}
      >
        <ToggleSwitch />
        <button
          onClick={addButtonClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add clothes
        </button>
        <button
          type="button"
          className="header__menu_mobile-close"
          onClick={toggleMobileMenu}
        ></button>
        <Link to="/profile" className="header__profile-link">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img src={avatar} alt="User avatar" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
