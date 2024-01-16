// Функция сообщения об ошибки
const throwErrorMessage = (message = "Error: empty message") => {
  throw new Error(message);
};

export default throwErrorMessage;
