import { deleteCard } from "../card";
import { openModal } from "../modal";

const cardHandler = (element, event) => {
  if (event.target.classList.contains("card__delete-button")) {
    deleteCard(element);
  }

  if (event.target.classList.contains("card__image")) {
    const imagePopUp = document.querySelector(".popup_type_image");
    openModal(imagePopUp, event);
  }

  if (event.target.classList.contains("card__like-button")) {
    const buttonCardLike = element.querySelector(".card__like-button");

    if (buttonCardLike.classList.contains("card__like-button_is-active")) {
      buttonCardLike.classList.remove("card__like-button_is-active");
    } else {
      buttonCardLike.classList.add("card__like-button_is-active");
    }
  }
};

export default cardHandler;
