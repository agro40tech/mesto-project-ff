import useEventListener from "../hooks/use__event__listener";
import closeModalHandler from "../handlers/close__modal__handler";

const openModal = (element) => {
  element.style.display = "flex";
  useEventListener(element, closeModalHandler, element, true);
};

export default openModal;
