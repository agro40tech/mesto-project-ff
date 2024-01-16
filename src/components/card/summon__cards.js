import throwErrorMessage from "../errors/throw__error";
import createCard from "./create__card";
import cardsWrapper from "./blocks/cards__wrapper";

// Функция размещения всех карточек в html
const summonCards = (arr) => {
  if (arr) {
    arr.forEach((element) => {
      const card = createCard(element.link, element.name);
      return cardsWrapper.append(card);
    });
  } else {
    throwErrorMessage("Error: arr cards is not a valid");
  }
};

export default summonCards;
