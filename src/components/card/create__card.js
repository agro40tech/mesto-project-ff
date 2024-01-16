import createElementCard from "./create__element__card";
import fillCard from "./fill__card";

// Функция создания карточки
const createCard = (cardImage, cardTitle) => {
  const cardElement = createElementCard();
  fillCard(cardElement, cardImage, cardTitle);

  return cardElement;
};

export default createCard;
