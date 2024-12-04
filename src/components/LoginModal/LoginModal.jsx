import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "../ModalWithForm/ModalWithForm.css";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  buttonClass = "modal__form-button",
  onLogIn,
  openRegisterModal,
  closeModal,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setData({ email: "", password: "" });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(data);
  };

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="user-email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input modal__input-password"
          id="user-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          required
        />
      </label>
      <div className="modal__buttons-wrapper">
        <button type="modal__form-button">Log In</button>
        <button
          type="button"
          className="modal__or-signup-button"
          onClick={openRegisterModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
