import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ addButtonClick, clothingItems, handleCardClick }) {
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
        {clothingItems.map((item) => (
          <ItemCard
            item={item}
            key={item.id || item.name}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
