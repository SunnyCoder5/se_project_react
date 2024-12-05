import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  closeModal,
  isOpen,
  buttonClass = "modal__form-button",
  openLoginModal,
  onSignUp,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ email, password, name, avatar });
  };

  useEffect(() => {
    setIsButtonActive(
      email.trim() !== "" &&
        password.trim() !== "" &&
        name.trim() !== "" &&
        avatar.trim() !== ""
    );
  }, [email, password, name, avatar]);

  return (
    <ModalWithForm
      title="Sign up"
      onClose={closeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonClass={`modal__form-button ${
        isButtonActive ? "modal__form-button_active" : ""
      }`}
      handleCloseModal={closeModal}
    >
      <label className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Name*{""}
        <input
          type="text"
          className="modal__input"
          id="registerName"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL*{""}
        <input
          type="url"
          className="modal__input modal__input_signUp "
          id="avatarUrl"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
      <div className="modal__buttons-wrapper">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__form-button_filled" : ""
          }`}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="modal__or-login-button"
          onClick={openLoginModal}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
