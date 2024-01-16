const useEventListener = (element, callback, parametrs, event = false) => {
  element.addEventListener("click", (e) => {
    event ? callback(parametrs, e) : callback(parametrs);
  });
};

export default useEventListener;
