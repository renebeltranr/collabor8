import { ICollabApiService, ICollab, ISaveTrack } from "./types";

const URL = "http://localhost:3001";
const collabApiService: ICollabApiService = {

  getCollabs: () => {
    return fetch(`${URL}/collab/getAll`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json",
      },
    })
      .then((res) => res.json() as Promise<Response>)
      .catch((err) => console.log(err));
  },
  
  newCollab : async (cb: ICollab) => {
    try {
      console.log(JSON.stringify(cb))
      const res = await fetch(`${URL}/collab/newCollab`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(cb),
      });
      return await res.json();
    } catch (err) {
      return console.log(err);
    }
  },
  
  getUserCollabs : (id) => {
    return fetch(`${URL}/collab/getUserCollabs/${id}`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  
  getCollab : (id) => {
    return fetch(`${URL}/collab/id/${id}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  
  saveTrack : (data: ISaveTrack) => {
    return fetch(`${URL}/collab/saveTrack`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: data.url,
        cid: data.cid,
        username: data.username,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  
  saveSettings : (data: any) => {
    return fetch(`${URL}/collab/id/${data.cid}/saveSettings`, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.collab),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  
  acceptTrack : (data) => {
    return fetch(`${URL}/collab/id/${data.cid}/acceptTrack`, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data.url }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  
  denyTrack : (data) => {
    return fetch(`${URL}/collab/id/${data.cid}/denyTrack`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data.url }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  
  deleteTrack : (data) => {
    return fetch(`${URL}/collab/id/${data.cid}/deleteTrack`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data.url }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  
  deleteCollab : (data) => {
    return fetch(`${URL}/collab/delete/${data.cid}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: data.uid }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
};


export default collabApiService;
