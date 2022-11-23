var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const URL = "http://localhost:3001";
const collabApiService = {
    getCollabs: () => {
        return fetch(`${URL}/collab/getAll`, {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    },
    newCollab: (cb) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(JSON.stringify(cb));
            const res = yield fetch(`${URL}/collab/newCollab`, {
                method: "POST",
                credentials: "include",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cb),
            });
            return yield res.json();
        }
        catch (err) {
            return console.log(err);
        }
    }),
    getUserCollabs: (id) => {
        return fetch(`${URL}/collab/getUserCollabs/${id}`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    },
    getCollab: (id) => {
        return fetch(`${URL}/collab/id/${id}`, {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    },
    saveTrack: (data) => {
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
    saveSettings: (data) => {
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
    acceptTrack: (data) => {
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
    denyTrack: (data) => {
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
    deleteTrack: (data) => {
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
    deleteCollab: (data) => {
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
//# sourceMappingURL=collabApiService.js.map