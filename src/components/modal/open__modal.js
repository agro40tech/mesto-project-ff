import useEventListener from "../hooks/use__event__listener";
import closeModalHandler from "../handlers/close__modal__handler";

const openModal = (element) => {
  const html = document;
  element.style.display = "flex";
  useEventListener(element, closeModalHandler, element, true);
  useEventListener(html, closeModalHandler, element, true, "keydown");
};

export default openModal;
