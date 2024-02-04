// Темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Обертка для карточек
export const cardsWrapper = document.querySelector(".places__list");

// Функция создания элемента карточки
const createElementCard = () => {
  return cardTemplate.querySelector(".places__item").cloneNode(true);
};

// Функция создания карточки
export const createCard = (
  cardImage,
  cardTitle,
  deleteCard,
  cardLikeHandle,
  cardPopUpHandle,
  arrLikes,
  isOwner,
  cardID,
  setLike,
  unSetLike,
  isLike
) => {
  const cardElement = createElementCard();

  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementLikeCount = cardElement.querySelector(".card__like-count");
  const cardElementDeleteButton = cardElement.querySelector(".card__delete-button");

  const cardAlt = "Картинка " + cardTitle;

  cardElementImage.src = cardImage;
  cardElementImage.alt = cardAlt;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  if (arrLikes.length > 0) {
    cardElementLikeCount.textContent = arrLikes.length;
  }

  // Вешаем слушатель на картинку карточки
  cardElementImage.addEventListener("click", () => {
    cardPopUpHandle(cardImage, cardTitle);
  });

  if (!isOwner) {
    cardElementDeleteButton.remove();
  } else {
    // Вешаем слушатель на кнопку удаления карточки
    cardElementDeleteButton.addEventListener("click", () => {
      deleteCard(cardID)
        .then(() => {
          cardElement.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  if (isLike) {
    cardLikeHandle(cardElement);
  }

  // Вешаем слушатель на кнопку лайка карточки
  cardElement.querySelector(".card__like-button").addEventListener("click", (event) => {
    if (event.target.classList.contains("card__like-button_is-active")) {
      unSetLike(cardID)
        .then((result) => {
          cardLikeHandle(cardElement, result.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLike(cardID)
        .then((result) => {
          cardLikeHandle(cardElement, result.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return cardElement;
};

// Хендлер для ивента лайка карточки
export const cardLikeHandle = (cardElement, arrLikes) => {
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCountElement = cardElement.querySelector(".card__like-count");

  cardLikeButton.classList.toggle("card__like-button_is-active");

  if (arrLikes) {
    if (arrLikes.length > 0) {
      cardLikeCountElement.textContent = arrLikes.length;
    } else {
      cardLikeCountElement.textContent = "";
    }
  }
};
