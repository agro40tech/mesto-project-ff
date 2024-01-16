const useEventListener = (element, callback, parametrs, event = false, type = "click") => {
  element.addEventListener(type, (e) => {
    event ? callback(parametrs, e) : callback(parametrs);
  });
};

export default useEventListener;
