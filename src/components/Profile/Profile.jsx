import React, { useState, useContext, useEffect } from "react";

import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  addButtonClick,
  clothingItems,
  handleCardClick,
  isLoggedIn,
  handleProfileEditClick,
  onCardLike,
  handleLogout,
}) {
  return (
    <div className="profile">
      <section className="profile-sidebar">
        <SideBar
          handleProfileEditClick={handleProfileEditClick}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile-clothes">
        <ClothesSection
          addButtonClick={addButtonClick}
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
