import throwErrorMessage from "../errors/throw__error";
import useEventListener from "../hooks/use__event__listener";
import cardHandler from "../handlers/card__handler";

// Функция наполнения каротчки данными
const fillCard = (cardElement, cardImage, cardTitle) => {
  const cardAlt = "Картинка " + cardTitle;

  cardElement.querySelector(".card__image").src =
    cardImage || throwErrorMessage("Error: image src variable is empty");

  cardElement.querySelector(".card__image").alt = cardAlt;

  cardElement.querySelector(".card__title").textContent =
    cardTitle || throwErrorMessage("Error: title variable is empty");

  useEventListener(cardElement, cardHandler, cardElement, true);

  return cardElement;
};

export default fillCard;
