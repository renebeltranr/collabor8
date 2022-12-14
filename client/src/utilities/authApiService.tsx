import { IAuthApiService, Credentials } from "./types";
const URL = "http://localhost:3001";
const authApiService: IAuthApiService = {};

authApiService.register = (user: Credentials) => {
  return fetch(`${URL}/register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

authApiService.login = (user: Credentials) => {
  return fetch(`${URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

authApiService.profile = (username: string) => {
  return fetch(`${URL}/profile/${username}`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json().then((json) => json))
    .catch((err) => console.log(err));
};

authApiService.me = () => {
  return fetch(`${URL}/me`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json().then((json) => json))
    .catch((err) => console.log(err));
};

authApiService.logout = () => {
  return fetch(`${URL}/logout`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

authApiService.profileUpdate = (data) => {
  return fetch(`${URL}/profileupdate/${data._id}`, {
    method: "PUT",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default authApiService;
