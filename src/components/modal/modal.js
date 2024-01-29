const documentEscHandle = (event) => {
  // Закрываем если кликнули на ESC
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};

export const openModal = (element, callBack) => {
  element.classList.add("popup_is-opened");

  document.addEventListener("keydown", documentEscHandle);

  if (callBack) {
    callBack();
  }
};

export const closeModal = (element) => {
  element.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", documentEscHandle);
};
