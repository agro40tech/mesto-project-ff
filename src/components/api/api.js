const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "ebbc5865-cadb-468a-956d-895b283bb723",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
