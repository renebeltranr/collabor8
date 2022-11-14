const URL = 'http://localhost:3001';
const collabApiService = {};

collabApiService.getCollabs = () => {
  return fetch(`${URL}/collab/getAll`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

collabApiService.newCollab = (cb) => {
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

collabApiService.getUserCollabs = (id) => {
  return fetch(`${URL}/collab/getUserCollabs/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

collabApiService.getCollab = (id) => {
  return fetch(`${URL}/collab/id/${id}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

collabApiService.saveTrack = (data) => {
  return fetch(`${URL}/collab/saveTrack`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({url: data.url, cid: data.cid, username: data.username})
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

collabApiService.deleteCollab = (data) => {
  return fetch(`${URL}/collab/delete/${data.cid}`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({uid: data.uid})
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default collabApiService;
