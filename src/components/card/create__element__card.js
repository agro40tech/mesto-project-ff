import cardTemplate from "./blocks/card__template";

// Функция создания элемента карточки
const createElementCard = () => {
  return cardTemplate.querySelector(".places__item").cloneNode(true);
};

export default createElementCard;
