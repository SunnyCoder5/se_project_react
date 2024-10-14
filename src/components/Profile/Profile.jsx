import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ addButtonClick }) {
  return (
    <div className="profile">
      <section className="profile-sidebar">
        <SideBar />
      </section>
      <section className="profile-clothes">
        <ClothesSection
          addButtonClick={addButtonClick}
        />
      </section>
    </div>
  );
}

export default Profile;
