import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  onClose,
  isOpen,
  onSubmit,
  buttonClass = "modal__form-button",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className={`"modal__content" ${
          title === "Log In" || title === "Change Profile Data"
            ? "modal__content_type_login"
            : "modal__content"
        }`}
      >
        <p className="modal__title">{title}</p>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
