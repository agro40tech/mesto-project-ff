import "./pages/index.css";

import initialCards from "./components/data/cards";
import summonCards from "./components/card/summon__cards";
import openModal from "./components/modal/open__modal";

import useEventListener from "./components/hooks/use__event__listener";

// Edit profile Popup
const editProfilePopUp = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");

// Add card Popup
const addCardPopUp = document.querySelector(".popup_type_new-card");
const addCardPopUpButton = document.querySelector(".profile__add-button");

// Вызываем сборку всех карточек
summonCards(initialCards);

// Вешаем слушатель открытия popup редактирования профиля
useEventListener(editProfileButton, openModal, editProfilePopUp);

// Вешаем слушатель открытия popup добавления новой карточки
useEventListener(addCardPopUpButton, openModal, addCardPopUp);
