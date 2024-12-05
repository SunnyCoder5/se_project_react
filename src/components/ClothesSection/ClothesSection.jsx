import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  addButtonClick,
  clothingItems,
  onCardLike,
  handleCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="user-clothes">
      <div className="user-clothes__section">
        <p className="user-clothes__items">Your items</p>
        <button
          onClick={addButtonClick}
          type="button"
          className="user-clothes__add-clothes-button"
        >
          + Add new
        </button>
      </div>
      <ul className="user-clothes__list">
        {clothingItems &&
          clothingItems
            .filter((item) => item.owner === currentUser._id)
            .map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item._id}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
      </ul>
    </div>
  );
}

export default ClothesSection;
