import throwErrorMessage from "../errors/throw__error";
import useEventListener from "../hooks/use__event__listener";
import cardHandler from "../handlers/card__handler";

// Темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Обертка для карточек
export const cardsWrapper = document.querySelector(".places__list");

// Функция создания элемента карточки
const createElementCard = () => {
  return cardTemplate.querySelector(".places__item").cloneNode(true);
};

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

// Функция создания карточки
export const createCard = (cardImage, cardTitle) => {
  const cardElement = createElementCard();
  fillCard(cardElement, cardImage, cardTitle);

  return cardElement;
};

// Функция удаления карточки
export const deleteCard = (button) => {
  const listItem = button.closest(".places__item");
  listItem.remove();
};

// Функция размещения всех карточек в html
export const summonCards = (arr) => {
  if (arr) {
    arr.forEach((element) => {
      const card = createCard(element.link, element.name);
      return cardsWrapper.append(card);
    });
  } else {
    throwErrorMessage("Error: arr cards is not a valid");
  }
};
