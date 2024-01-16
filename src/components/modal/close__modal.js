import useEventListener from "../hooks/use__event__listener";
import closeModalHandler from "../handlers/close__modal__handler";

const closeModal = (element) => {
  element.style.display = "none";
  element.removeEventListener("click", useEventListener(element, closeModalHandler, element, true));
};

export default closeModal;
