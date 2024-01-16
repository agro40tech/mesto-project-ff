import closeModal from "../modal/close__modal";

const closeModalHandler = (element, event) => {
  if (event.target.classList.contains("popup__close")) {
    closeModal(element);
  }

  // Закрываем popUp если кликнули на оверлей
  if (event.target.classList.contains("popup")) {
    closeModal(element);
  }
};

export default closeModalHandler;
