import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__card-delete-button ${
    !isOwn && "modal__card-delete-button_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__caption">
            <h2 className="modal__card-name">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            type="button"
            className={itemDeleteButtonClassName}
            id="card-delete-button"
            onClick={onDelete}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
