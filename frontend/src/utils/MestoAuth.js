
export const BASE_URL = 'https://api.mestominsk.nomoredomainsmonster.ru';

export const register = (password, email) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
   }).then((response) => {
      try {
         if (response.ok){
            return response.json();
         }
      } catch(e){
         return (e)
      }
   }).then((res) => {
      return res;
   }).catch((err) => {
      return err;
   });
}

export const login = (email, password) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
   })
   .then((response => response.json()))
   .then((data) => {
      if (data.token){
         localStorage.setItem('token', data.token);
         return data;
      }
   })
   .catch(err => console.log(err))
}

export const checkToken = (token) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
      }
   })
   .then(res => res.json())
   .then(data => data)
}
