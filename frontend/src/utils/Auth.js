const BASE_URL = 'https://mesto.front.fmn.nomoredomains.icu';

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

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: "POST",
    headers,
    body: JSON.stringify({ email, password })
  })
    .then(res => checkResponse(res));
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'GET',
  })
    .then((res => checkResponse(res)
    ));
}