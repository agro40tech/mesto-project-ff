export const closeModal = (element) => {
  element.classList.remove("popup_is-opened");
  setTimeout(() => {
    element.classList.remove("popup_is-animated");
  }, 300);

  element.removeEventListener(
    "click",
    element.addEventListener("click", (event) => {
      // Закрываем если кликнули на крестик
      if (event.target.classList.contains("popup__close")) {
        closeModal(element);
      }

      // Закрываем если кликнули на оверлей
      if (event.target.classList.contains("popup")) {
        closeModal(element);
      }
    })
  );

  element.removeEventListener(
    "keydown",
    document.addEventListener("keydown", (event) => {
      // Закрываем если кликнули на ESC
      if (event.key === "Escape") {
        closeModal(element);
      }
    })
  );
};

export const openModal = (element, event = false) => {
  element.classList.add("popup_is-animated");
  setTimeout(() => {
    element.classList.add("popup_is-opened");
  }, 200);

  element.addEventListener("click", (event) => {
    // Закрываем если кликнули на крестик
    if (event.target.classList.contains("popup__close")) {
      closeModal(element);
    }

    // Закрываем если кликнули на оверлей
    if (event.target.classList.contains("popup")) {
      closeModal(element);
    }
  });

  document.addEventListener("keydown", (event) => {
    // Закрываем если кликнули на ESC
    if (event.key === "Escape") {
      closeModal(element);
    }
  });

  // Если открыли popUp редактирования профиля
  if (element.className.indexOf("popup_type_edit")) {
    const formEditProfile = document.forms.namedItem("edit-profile");
    const formInputName = formEditProfile.elements.name;
    const formInputDescription = formEditProfile.elements.description;

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    formInputName.value = profileTitle.textContent;
    formInputDescription.value = profileDescription.textContent;
  }

  // Если открыли popUp карточки
  if (element.className.indexOf("popup__content_content_image")) {
    const popUpImage = element.querySelector(".popup__image");
    const popUpCaption = element.querySelector(".popup__caption");
    if (event) {
      popUpImage.src = event.target.currentSrc;
      popUpCaption.textContent =
        event.target.offsetParent.querySelector(".card__title").textContent;
    }
  }
};
