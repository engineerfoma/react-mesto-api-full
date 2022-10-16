class Api {
    constructor(url) {
        this._url = url;
        this._headers = {
            'Content-Type': 'application/json',
            authorization: this._token
        }
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    setUserInfo(data) {
        const body = {
            name: data.name,
            about: data.about
        };
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, like) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            credentials: 'include',
            method: like ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    addCard(data) {
        const body = {
            name: data.title,
            link: data.link
        };
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    setAvatar(data) {
        const body = {
            avatar: data.avatar
        }
        return fetch(`${this._url}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api('https://mesto.front.fmn.nomoredomains.icu');
export default api;