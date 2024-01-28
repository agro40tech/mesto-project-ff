// Темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Обертка для карточек
export const cardsWrapper = document.querySelector(".places__list");

// Функция сообщения об ошибки
const throwErrorMessage = (message = "Error: empty message") => {
  throw new Error(message);
};

// Функция создания элемента карточки
const createElementCard = () => {
  return cardTemplate.querySelector(".places__item").cloneNode(true);
};

// Функция наполнения каротчки данными
const fillCard = (cardElement, cardImage, cardTitle, openModal) => {
  const cardAlt = "Картинка " + cardTitle;

  cardElement.querySelector(".card__image").src =
    cardImage || throwErrorMessage("Error: image src variable is empty");

  cardElement.querySelector(".card__image").alt = cardAlt;

  cardElement.querySelector(".card__title").textContent =
    cardTitle || throwErrorMessage("Error: title variable is empty");

  cardElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("card__delete-button")) {
      deleteCard(cardElement);
    }

    if (event.target.classList.contains("card__image")) {
      const imagePopUp = document.querySelector(".popup_type_image");
      openModal(imagePopUp, event);
    }

    if (event.target.classList.contains("card__like-button")) {
      const buttonCardLike = cardElement.querySelector(".card__like-button");

      if (buttonCardLike.classList.contains("card__like-button_is-active")) {
        buttonCardLike.classList.remove("card__like-button_is-active");
      } else {
        buttonCardLike.classList.add("card__like-button_is-active");
      }
    }
  });

  return cardElement;
};

// Функция создания карточки
export const createCard = (cardImage, cardTitle, openModal) => {
  const cardElement = createElementCard();
  fillCard(cardElement, cardImage, cardTitle, openModal);

  return cardElement;
};

// Функция удаления карточки
export const deleteCard = (button) => {
  const listItem = button.closest(".places__item");
  listItem.remove();
};

// Функция размещения всех карточек в html
export const summonCards = (arr, openModal) => {
  if (arr) {
    arr.forEach((element) => {
      const card = createCard(element.link, element.name, openModal);
      return cardsWrapper.append(card);
    });
  } else {
    throwErrorMessage("Error: arr cards is not a valid");
  }
};
