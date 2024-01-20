import "./pages/index.css";

import initialCards from "./components/data/cards";
import summonCards from "./components/card/summon__cards";
import openModal from "./components/modal/open__modal";

import useEventListener from "./components/hooks/use__event__listener";
import useQuerySelector from "./components/hooks/use__query__selector";
import formSubmitHandler from "./components/handlers/form__submit__handler";
import closeModal from "./components/modal/close__modal";
import createCard from "./components/card/create__card";
import cardsWrapper from "./components/card/blocks/cards__wrapper";

// Edit profile Popup
const elementPopUpEdit = useQuerySelector(".popup_type_edit");
const buttonOpenPopUpEdit = useQuerySelector(".profile__edit-button");

// Add card Popup
const elementPopUpAddCard = useQuerySelector(".popup_type_new-card");
const buttonOpenPopUpAddCard = useQuerySelector(".profile__add-button");

// Вызываем сборку всех карточек
summonCards(initialCards);

// Вешаем слушатель открытия popup редактирования профиля
useEventListener(buttonOpenPopUpEdit, openModal, elementPopUpEdit);

// Вешаем слушатель открытия popup добавления новой карточки
useEventListener(buttonOpenPopUpAddCard, openModal, elementPopUpAddCard);

const formPopUpEdit = document.forms.namedItem("edit-profile");

const nameInput = formPopUpEdit.elements.name;
const jobInput = formPopUpEdit.elements.description;

const profileTitle = useQuerySelector(".profile__title");
const profileDescription = useQuerySelector(".profile__description");

const arrProfileInfo = [];
const arrFormValue = [];

// Добавление обработчика событий к форме редактирование имени пользователя
formPopUpEdit.addEventListener("submit", (e) => {
  // Чистим массив
  arrProfileInfo.length = 0;
  arrFormValue.length = 0;

  // Пушим данные
  arrProfileInfo.push(profileTitle, profileDescription);
  arrFormValue.push(nameInput.value, jobInput.value);

  //   Меняем данные
  formSubmitHandler(e, arrProfileInfo, arrFormValue);

  //   Закрываем модальное окно
  closeModal(elementPopUpEdit);
});

const formNewPlace = document.forms.namedItem("new-place");

const nameNewPlace = formNewPlace.elements.namedItem("place-name");
const linkNewPlace = formNewPlace.elements.link;

// Добавление обработчика событий к форме добавления новой карточки
formNewPlace.addEventListener("submit", (e) => {
  e.preventDefault();

  //   Создаем карточку и пушим в начало обертки карточек
  const card = createCard(linkNewPlace.value, nameNewPlace.value);
  cardsWrapper.prepend(card);

  closeModal(elementPopUpAddCard);
});
