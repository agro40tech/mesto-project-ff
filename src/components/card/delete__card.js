// Функция удаления карточки
const deleteCard = (button) => {
  const listItem = button.closest(".places__item");
  listItem.remove();
};

export default deleteCard;
