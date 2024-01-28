import "./pages/index.css";

import initialCards from "./components/card/cards";

import { createCard, cardsWrapper, summonCards } from "./components/card/card";
import { openModal, closeModal } from "./components/modal/modal";

// Edit profile Popup
const elementPopUpEdit = document.querySelector(".popup_type_edit");
const buttonOpenPopUpEdit = document.querySelector(".profile__edit-button");

// Add card Popup
const elementPopUpAddCard = document.querySelector(".popup_type_new-card");
const buttonOpenPopUpAddCard = document.querySelector(".profile__add-button");

// Вызываем сборку всех карточек
summonCards(initialCards, openModal);

// Вешаем слушатель открытия popup-а редактирования профиля
buttonOpenPopUpEdit.addEventListener("click", () => {
  openModal(elementPopUpEdit);
});

// Вешаем слушатель открытия popup-а добавления новой карточки
buttonOpenPopUpAddCard.addEventListener("click", () => {
  openModal(elementPopUpAddCard);
});

const formPopUpEdit = document.forms.namedItem("edit-profile");

const nameInput = formPopUpEdit.elements.name;
const jobInput = formPopUpEdit.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Добавление обработчика событий к форме редактирование имени пользователя
formPopUpEdit.addEventListener("submit", (event) => {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  //   Закрываем модальное окно
  closeModal(elementPopUpEdit);
});

const formNewPlace = document.forms.namedItem("new-place");

const nameNewPlace = formNewPlace.elements.namedItem("place-name");
const linkNewPlace = formNewPlace.elements.link;

// Добавление обработчика событий к форме добавления новой карточки
formNewPlace.addEventListener("submit", (event) => {
  event.preventDefault();

  //   Создаем карточку и пушим в начало обертки карточек
  const card = createCard(linkNewPlace.value, nameNewPlace.value, openModal);
  cardsWrapper.prepend(card);

  linkNewPlace.value = "";
  nameNewPlace.value = "";

  closeModal(elementPopUpAddCard);
});
