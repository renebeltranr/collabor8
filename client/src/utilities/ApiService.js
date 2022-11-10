const URL = 'http://localhost:3001';
const apiService = {};

apiService.register = (user) => {
  return fetch(`${URL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.login = (user) => {
  return fetch(`${URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.profile = () => {
  return fetch(`${URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json()
    .then((json) => json))
    .catch((err) => console.log(err))
};

apiService.logout = () => {
  return fetch(`${URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getCollabs = () => {
  return fetch(`${URL}/collab/getAll`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.newCollab = (cb) => {
  return fetch(`${URL}/collab/newCollab`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cb)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getUserCollabs = () => {
  return fetch(`${URL}/collab/getUserCollabs`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getCollab = (id) => {
  return fetch(`${URL}/collab/id/${id}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.saveTrack = (data) => {
  return fetch(`${URL}/collab/saveTrack`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({url: data.url, cid: data.cid})
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;
