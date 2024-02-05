const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "ebbc5865-cadb-468a-956d-895b283bb723",
    "Content-Type": "application/json",
  },
};

const validResData = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return validResData(res);
  });
};

export const addNewCard = async (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return validResData(res);
  });
};

export const deleteCard = async (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return validResData(res);
  });
};

export const setLike = async (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard} `, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return validResData(res);
  });
};

export const unSetLike = async (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard} `, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return validResData(res);
  });
};

export const getUserData = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return validResData(res);
  });
};

export const changeUserData = async (changeName, changeAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: changeName,
      about: changeAbout,
    }),
  }).then((res) => {
    return validResData(res);
  });
};

export const changeAvatar = async (linkAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar,
    }),
  }).then((res) => {
    return validResData(res);
  });
};
