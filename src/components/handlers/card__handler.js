import deleteCard from "../card/delete__card";
import openModal from "../modal/open__modal";

const cardHandler = (element, event) => {
  const imagePopUp = document.querySelector(".popup_type_image");

  if (event.target.classList.contains("card__delete-button")) {
    deleteCard(element);
  }

  if (event.target.classList.contains("card__image")) {
    openModal(imagePopUp);
  }
};

export default cardHandler;
