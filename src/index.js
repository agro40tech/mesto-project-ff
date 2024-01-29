import "./pages/index.css";

import initialCards from "./components/card/cards";

import { createCard, deleteCard, cardsWrapper, summonCards } from "./components/card/card";
import { openModal, closeModal } from "./components/modal/modal";

// Объявляем элементы popup-ов
const elementPopUpEdit = document.querySelector(".popup_type_edit");
const elementPopUpAddCard = document.querySelector(".popup_type_new-card");
const elementImagePopUp = document.querySelector(".popup_type_image");

// Объявляем элементы popup-а карточки
const popUpImage = document.querySelector(".popup__image");
const popUpCaption = document.querySelector(".popup__caption");

// Объявляем элементы кнопок открытия popup-ов
const buttonOpenPopUpEdit = document.querySelector(".profile__edit-button");
const buttonOpenPopUpAddCard = document.querySelector(".profile__add-button");

// Объявляем элементы форм
const formPopUpEdit = document.forms.namedItem("edit-profile");
const nameInput = formPopUpEdit.elements.name;
const jobInput = formPopUpEdit.elements.description;

const formNewPlace = document.forms.namedItem("new-place");
const nameNewPlace = formNewPlace.elements.namedItem("place-name");
const linkNewPlace = formNewPlace.elements.link;

// Объявляем элементы заголовков профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Добавляем класс animated на все popup-ы
elementPopUpEdit.classList.add("popup_is-animated");
elementPopUpAddCard.classList.add("popup_is-animated");
elementImagePopUp.classList.add("popup_is-animated");

// Вешаем слушатели закрытий на все popup-ы
elementPopUpEdit.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup__close")) {
    closeModal(elementPopUpEdit);
  }

  if (event.target.classList.contains("popup")) {
    closeModal(elementPopUpEdit);
  }
});

elementPopUpAddCard.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup__close")) {
    closeModal(elementPopUpAddCard);
  }

  if (event.target.classList.contains("popup")) {
    closeModal(elementPopUpAddCard);
  }
});

elementImagePopUp.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup__close")) {
    closeModal(elementImagePopUp);
  }

  if (event.target.classList.contains("popup")) {
    closeModal(elementImagePopUp);
  }
});

// Хендлер для ивента лайка карточки
const cardLikeHandle = (cardElement) => {
  cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
};

// Хендлер для открытия popUp-а карточки
const cardPopUpHandle = (event) => {
  openModal(elementImagePopUp);

  popUpImage.src = event.target.currentSrc;
  popUpImage.alt = event.target.alt;
  popUpCaption.textContent = event.target.offsetParent.querySelector(".card__title").textContent;
};

// Вызываем сборку всех карточек
initialCards.forEach((element) => {
  const card = createCard(element.link, element.name, deleteCard, cardLikeHandle, cardPopUpHandle);

  summonCards(card);
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

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  //   Закрываем модальное окно
  closeModal(elementPopUpEdit);
});

// Добавление обработчика событий к форме добавления новой карточки
formNewPlace.addEventListener("submit", (event) => {
  event.preventDefault();

  //   Создаем карточку и пушим в начало обертки карточек
  const card = createCard(
    linkNewPlace.value,
    nameNewPlace.value,
    deleteCard,
    cardLikeHandle,
    cardPopUpHandle
  );

  cardsWrapper.prepend(card);

  linkNewPlace.value = "";
  nameNewPlace.value = "";

  closeModal(elementPopUpAddCard);
});
