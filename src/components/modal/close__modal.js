import useEventListener from "../hooks/use__event__listener";
import closeModalHandler from "../handlers/close__modal__handler";

const closeModal = (element) => {
  element.classList.remove("popup_is-opened");
  setTimeout(() => {
    element.classList.remove("popup_is-animated");
  }, 300);

  element.removeEventListener("click", useEventListener(element, closeModalHandler, element, true));
  element.removeEventListener(
    "keydown",
    useEventListener(document, closeModalHandler, element, true, "keydown")
  );
};

export default closeModal;
