import { closeModal } from "../modal";

const closeModalHandler = (element, event) => {
  // Закрываем если кликнули на крестик
  if (event.target.classList.contains("popup__close")) {
    closeModal(element);
  }

  // Закрываем если кликнули на оверлей
  if (event.target.classList.contains("popup")) {
    closeModal(element);
  }

  // Закрываем если кликнули на ESC
  if (event.key === "Escape") {
    closeModal(element);
  }
};

export default closeModalHandler;
