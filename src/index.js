import "./pages/index.css";

import { createCard, cardsWrapper, cardLikeHandle } from "./components/card/card";
import { openModal, closeModal } from "./components/modal/modal";
import {
  clearValidation,
  enableValidation,
  toggleSubmitButton,
  validationConfig,
} from "./components/validation/validation";
import {
  addNewCard,
  changeAvatar,
  changeUserData,
  deleteCard,
  getInitialCards,
  getUserData,
  setLike,
  unSetLike,
} from "./components/api/api";
import { defaultMessage, loadingMessage } from "./components/data/constants";

// Объявляем элементы popup-ов
const elementPopUpEdit = document.querySelector(".popup_type_edit");
const elementPopUpAddCard = document.querySelector(".popup_type_new-card");
const elementImagePopUp = document.querySelector(".popup_type_image");
const elementAvatarPopUp = document.querySelector(".popup_type_avatar");

// Объявляем элементы popup-а карточки
const popUpImage = document.querySelector(".popup__image");
const popUpCaption = document.querySelector(".popup__caption");

// Объявляем элементы кнопок открытия popup-ов
const buttonOpenPopUpEdit = document.querySelector(".profile__edit-button");
const buttonOpenPopUpAddCard = document.querySelector(".profile__add-button");
const buttonOpenPopUpAvatar = document.querySelector(".profile__change-avatar-button");

// Объявляем элементы форм
const formPopUpEdit = document.forms.namedItem("edit-profile");
const nameInput = formPopUpEdit.elements.name;
const jobInput = formPopUpEdit.elements.description;

const formNewPlace = document.forms.namedItem("new-place");
const nameNewPlace = formNewPlace.elements.namedItem("place-name");
const linkNewPlace = formNewPlace.elements.link;

const formChangeAvatar = document.forms.namedItem("change-avatar");
const linkNewAvatar = formChangeAvatar.elements.link;

// Объявляем элементы заголовков профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Добавляем класс animated на все popup-ы
elementPopUpEdit.classList.add("popup_is-animated");
elementPopUpAddCard.classList.add("popup_is-animated");
elementImagePopUp.classList.add("popup_is-animated");
elementAvatarPopUp.classList.add("popup_is-animated");

// Объявление промисов запросов
const promiseGetUserData = new Promise((resolve) => {
  const data = getUserData();
  resolve(data);
});

const promiseGetCards = new Promise((resolve) => {
  const data = getInitialCards();
  resolve(data);
});

const deleteCardHandle = (cardID, cardElement) => {
  deleteCard(cardID)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const requestLikeHandle = (isActiveLike, cardID, cardElement) => {
  if (isActiveLike) {
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
};

// Делаем запросы
Promise.all([promiseGetUserData, promiseGetCards])
  .then(([resultGetUserData, resultGetCards]) => {
    // Меняем данные профя
    profileAvatar.style.backgroundImage = `url(${resultGetUserData.avatar})`;
    profileTitle.textContent = resultGetUserData.name;
    profileDescription.textContent = resultGetUserData.about;

    // Вызываем сборку всех карточек
    resultGetCards.forEach((element) => {
      let isOwner = false;
      let isLike = false;

      // Смотрим этот ли пользователь создал карточку
      if (element.owner._id === resultGetUserData._id) {
        isOwner = true;
      }

      // Смотрим лайкнул ли этот пользователь карточку
      element.likes.forEach((element) => {
        if (element._id === resultGetUserData._id) {
          isLike = true;
        }
      });

      const card = createCard(
        element.link,
        element.name,
        deleteCardHandle,
        requestLikeHandle,
        cardPopUpHandle,
        element.likes,
        isOwner,
        element._id,
        isLike,
        cardLikeHandle
      );

      cardsWrapper.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Хендлер для открытия popUp-а карточки
const cardPopUpHandle = (cardImage, cardTitle) => {
  openModal(elementImagePopUp);

  popUpImage.src = cardImage;
  popUpImage.alt = cardTitle;
  popUpCaption.textContent = cardTitle;
};

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  const popupForm = popup.querySelector(".popup__form");

  button.addEventListener("click", () => {
    closeModal(popup);
    clearValidation(popupForm, validationConfig, toggleSubmitButton);
  });

  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(popup);
      clearValidation(popupForm, validationConfig, toggleSubmitButton);
    }
  });
});

buttonOpenPopUpAvatar.addEventListener("click", () => {
  openModal(elementAvatarPopUp);
});

// Вешаем слушатель открытия popup-а редактирования профиля
buttonOpenPopUpEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(elementPopUpEdit);
});

// Вешаем слушатель открытия popup-а добавления новой карточки
buttonOpenPopUpAddCard.addEventListener("click", () => {
  openModal(elementPopUpAddCard);
});

// Добавление обработчика событий к форме редактирование имени пользователя
formPopUpEdit.addEventListener("submit", (event) => {
  event.preventDefault();

  const buttonSubmit = formPopUpEdit.querySelector(".button");

  buttonSubmit.textContent = loadingMessage;

  // Отправляем запрос на смену данных и меняем их на сайте
  changeUserData(nameInput.value, jobInput.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmit.textContent = defaultMessage;
    });

  //   Закрываем модальное окно
  closeModal(elementPopUpEdit);
  clearValidation(elementPopUpEdit, validationConfig, toggleSubmitButton);
});

// Добавление обработчика событий к форме добавления новой карточки
formNewPlace.addEventListener("submit", (event) => {
  event.preventDefault();

  const buttonSubmit = formNewPlace.querySelector(".button");

  buttonSubmit.textContent = loadingMessage;

  // Делаем запрос на создание новой карточки
  addNewCard(nameNewPlace.value, linkNewPlace.value)
    .then((result) => {
      //   Создаем карточку и пушим в начало обертки карточек
      const card = createCard(
        result.link,
        result.name,
        deleteCardHandle,
        requestLikeHandle,
        cardPopUpHandle,
        result.likes,
        true,
        result._id,
        false,
        cardLikeHandle
      );

      cardsWrapper.prepend(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmit.textContent = defaultMessage;
    });

  formNewPlace.reset();

  closeModal(elementPopUpAddCard);
  clearValidation(elementPopUpAddCard, validationConfig, toggleSubmitButton);
});

formChangeAvatar.addEventListener("submit", (event) => {
  event.preventDefault();

  const buttonSubmit = formChangeAvatar.querySelector(".button");

  buttonSubmit.textContent = loadingMessage;

  changeAvatar(linkNewAvatar.value)
    .then((result) => {
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmit.textContent = defaultMessage;
    });

  formChangeAvatar.reset();

  closeModal(elementAvatarPopUp);
  clearValidation(elementAvatarPopUp, validationConfig, toggleSubmitButton);
});

enableValidation(validationConfig, toggleSubmitButton);
