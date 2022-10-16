const BASE_URL = 'https://mesto.front.fmn.nomoredomains.icu/';

const checkResponse = (response) =>
  response.ok ?
    response.json()
    : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));

const headers = {
  'Content-type': "application/json",
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  })
    .then(res => checkResponse(res));
};

export const authorize = ({ email, password }) =>     {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: "POST",
    headers,
    body: JSON.stringify({ email, password })
  })
    .then(res => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    },
  })
    .then(res => checkResponse(res));
};