const formSubmitHandler = (event, arrWhere, arrData) => {
  let iter = 0;

  event.preventDefault();

  arrWhere.forEach((element) => {
    element.textContent = arrData[iter];
    iter++;
  });
};

export default formSubmitHandler;
