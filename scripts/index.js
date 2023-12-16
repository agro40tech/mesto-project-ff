// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Обертка для карточек
const cardsWrapper = document.querySelector(".places__list");

// Функция сообщения об ошибки
const errorMessage = (message = "Error: empty message") => {
  throw new Error(message);
};

// Функция создания элемента карточки
const createElementCard = () => {
  return cardTemplate.querySelector(".places__item").cloneNode(true);
};

// Функция наполнения каротчки данными
const fillCard = (cardElement, cardImage, cardTitle) => {
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardAlt = "Картинка " + cardTitle;

  cardElement.querySelector(".card__image").src =
    cardImage || errorMessage("Error: image src variable is empty");

  cardElement.querySelector(".card__image").alt = cardAlt;

  cardElement.querySelector(".card__title").textContent =
    cardTitle || errorMessage("Error: title variable is empty");

  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });

  return cardElement;
};

// Функция создания карточки
const createCard = (cardImage, cardTitle) => {
  const cardElement = createElementCard();
  fillCard(cardElement, cardImage, cardTitle);

  return cardElement;
};

// Функция удаления карточки
const deleteCard = (button) => {
  const listItem = button.closest(".places__item");
  listItem.remove();
};

// Функция размещения всех карточек в html
const summonCards = (arr) => {
  if (arr) {
    arr.forEach((element) => {
      const card = createCard(element.link, element.name);
      return cardsWrapper.append(card);
    });
  } else {
    errorMessage("Error: arr cards is not a valid");
  }
};

// Вызваем сборку и вывод всех карточек в html
summonCards(initialCards);
