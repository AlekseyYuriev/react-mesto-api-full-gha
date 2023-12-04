class Api {
   constructor({ url }) {
      this._url = url;
   }

   _getResponseData(response) {
      if(response.ok) {
         return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
   }

   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
         }
      }).then((response) => this._getResponseData(response));
   }

   getUserData() {
      return fetch(`${this._url}/users/me`, {
         headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
         }
      }).then((response) => this._getResponseData(response));
   }

   setUserData(data) {
      return fetch(`${this._url}/users/me`, {
         method: 'PATCH',
         headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
         name: data.name,
         about: data.about
         })
      }).then((response) => this._getResponseData(response));
   }

   createNewCard(data) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
         name: data.name,
         link: data.link
         })
      }).then((response) => this._getResponseData(response));
   }

   updateAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
         avatar: data.link
         })
      }).then((response) => this._getResponseData(response));
   }

   deleteCard(cardID) {
      return fetch(`${this._url}/cards/${cardID}`, {
         method: 'DELETE',
         headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
         }
      })
         .then((response) => this._getResponseData(response));
   }

   setLike(cardID) {
      return fetch(`${this._url}/cards/${cardID}/likes`, {
         method: 'PUT',
         headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
         }
      })
         .then((response) => this._getResponseData(response));
   }

   deleteLike(cardID) {
      return fetch(`${this._url}/cards/${cardID}/likes`, {
         method:'DELETE',
         headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
         }
      })
         .then((response) => this._getResponseData(response));
   }
}

//создаём экземпляр класса Api
const api = new Api({
   url: "https://api.mestominsk.nomoredomainsmonster.ru",
})

export default api;
