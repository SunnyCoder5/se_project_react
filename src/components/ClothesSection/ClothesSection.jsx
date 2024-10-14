import "./ClothesSection.css";
import avatar from "../../assets/avatar.svg";

function ClothesSection({ addButtonClick, clothingItems }) {
  const profileCards = clothingItems;
  return (
    <div className="user-clothes">
      <p className="user-clothes__items">Your items</p>
      <button
        onClick={addButtonClick}
        type="button"
        className="user-clothes__add-clothes-button"
      >
        + Add new
      </button>
      <div className="card__items">
        {profileCards.map((item) => (
          <ItemCard item={item} onSelectCard={onSelectCard} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
