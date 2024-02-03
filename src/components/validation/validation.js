export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const toggleSubmitButton = (isVaild, buttonElemnt, inactiveButtonClass) => {
  if (isVaild) {
    buttonElemnt.classList.remove(inactiveButtonClass);
    buttonElemnt.disabled = false;
  } else {
    buttonElemnt.classList.add(inactiveButtonClass);
    buttonElemnt.disabled = true;
  }
};

export const enableValidation = (validationConfig, toggleSubmitButton) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const submitButtonElement = form.querySelector(validationConfig.submitButtonSelector);

    toggleSubmitButton(false, submitButtonElement, validationConfig.inactiveButtonClass);

    inputList.forEach((input) => {
      const errorElement = form.querySelector(`.${input.name}-input-error`);

      input.addEventListener("input", () => {
        const isValid = inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });

        if (isValid) {
          toggleSubmitButton(false, submitButtonElement, validationConfig.inactiveButtonClass);
        } else {
          toggleSubmitButton(true, submitButtonElement, validationConfig.inactiveButtonClass);
        }

        if (!input.validity.valid) {
          if (input.validity.patternMismatch) {
            input.setCustomValidity(input.dataset.errorMessage);
          } else {
            input.setCustomValidity("");
          }
          errorElement.textContent = input.validationMessage;
          input.classList.add(validationConfig.inputErrorClass);
        } else {
          input.classList.remove(validationConfig.inputErrorClass);
          errorElement.textContent = "";
        }
      });
    });
  });
};

export const clearValidation = (form, validationConfig, toggleSubmitButton) => {
  if (!form) {
    return;
  }

  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButtonElement = form.querySelector(validationConfig.submitButtonSelector);

  toggleSubmitButton(false, submitButtonElement, validationConfig.inactiveButtonClass);

  inputList.forEach((input) => {
    const errorElement = form.querySelector(`.${input.name}-input-error`);

    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = "";
  });
};
