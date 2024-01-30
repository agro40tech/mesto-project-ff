// Темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Обертка для карточек
export const cardsWrapper = document.querySelector(".places__list");

// Функция создания элемента карточки
const createElementCard = () => {
  return cardTemplate.querySelector(".places__item").cloneNode(true);
};

// Функция создания карточки
export const createCard = (cardImage, cardTitle, deleteCard, cardLikeHandle, cardPopUpHandle) => {
  const cardElement = createElementCard();
  const cardAlt = "Картинка " + cardTitle;
  const cardElementImage = cardElement.querySelector(".card__image");

  cardElementImage.src = cardImage;
  cardElementImage.alt = cardAlt;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  // Вешаем слушатель на картинку карточки
  cardElementImage.addEventListener("click", () => {
    cardPopUpHandle(cardImage, cardTitle);
  });

  // Вешаем слушатель на кнопку удаления карточки
  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    deleteCard(cardElement);
  });

  // Вешаем слушатель на кнопку лайка карточки
  cardElement.querySelector(".card__like-button").addEventListener("click", () => {
    cardLikeHandle(cardElement);
  });

  return cardElement;
};

// Функция удаления карточки
export const deleteCard = (element) => {
  element.remove();
};

// Хендлер для ивента лайка карточки
export const cardLikeHandle = (cardElement) => {
  cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
};
