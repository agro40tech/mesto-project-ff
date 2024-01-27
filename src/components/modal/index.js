import closeModalHandler from "../handlers/close__modal__handler";
import useQuerySelector from "../hooks/use__query__selector";
import useEventListener from "../hooks/use__event__listener";

export const closeModal = (element) => {
  element.classList.remove("popup_is-opened");
  setTimeout(() => {
    element.classList.remove("popup_is-animated");
  }, 300);

  element.removeEventListener("click", useEventListener(element, closeModalHandler, element, true));
  element.removeEventListener(
    "keydown",
    useEventListener(document, closeModalHandler, element, true, "keydown")
  );
};

export const openModal = (element, event = false) => {
  element.classList.add("popup_is-animated");
  setTimeout(() => {
    element.classList.add("popup_is-opened");
  }, 200);
  useEventListener(element, closeModalHandler, element, true);
  useEventListener(document, closeModalHandler, element, true, "keydown");

  // Если открыли popUp редактирования профиля
  if (element.className.indexOf("popup_type_edit")) {
    const formEditProfile = document.forms.namedItem("edit-profile");
    const formInputName = formEditProfile.elements.name;
    const formInputDescription = formEditProfile.elements.description;

    const profileTitle = useQuerySelector(".profile__title");
    const profileDescription = useQuerySelector(".profile__description");

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
