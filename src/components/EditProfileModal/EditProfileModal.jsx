import { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, closeModal, onEditProfileSubmit }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatarUrl] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value || "");
  };

  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value || "");
  };

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfileSubmit({ name, avatar });
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      buttonText="Save Changes"
      buttonClass="modal__form-button"
      title="Change Profile Data"
      isOpen={isOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      name={"editprofile"}
    >
      <label className="modal__label">
        Name*{" "}
        <input
          required
          value={name}
          type="text"
          className="modal__input"
          id="name"
          placeholder={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Avatar*{" "}
        <input
          required
          value={avatar}
          type="url"
          className="modal__input modal__input-avatar"
          id="avatar"
          placeholder={avatar}
          onChange={handleAvatarChange}
        />
      </label>
      <button
        type="submit"
        className="modal__form-button modal__form-button_save-changes"
      >
        Save changes
      </button>
    </ModalWithForm>
  );
};
export default EditProfileModal;
