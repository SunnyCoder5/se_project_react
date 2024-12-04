import React, { useState, useContext, useEffect } from "react";

import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  addButtonClick,
  clothingItems,
  handleCardClick,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile-sidebar">
        <SideBar />
      </section>
      <section className="profile-clothes">
        <ClothesSection
          addButtonClick={addButtonClick}
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
