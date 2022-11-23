var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState, useContext } from "react";
import authApiService from "../../utilities/authApiService";
import collabApiService from "../../utilities/collabApiService";
import CollabList from "../CollabList/CollabList";
import ListedCollab from "../ListedCollab/ListedCollab";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Profile.css";
const initialState = {
    username: "",
    password: "",
    country: "",
    bio: "",
    owncollabs: [],
};
function Profile() {
    const navigate = useNavigate();
    const { username } = useParams();
    initialState.username = username;
    const [state, setState] = useState(initialState);
    const ctx = useContext(GlobalContext);
    useEffect(() => {
        const getProfile = () => __awaiter(this, void 0, void 0, function* () {
            if (authApiService.profile) {
                const userInfo = (yield authApiService.profile(username));
                if (userInfo) {
                    const user = userInfo;
                    const { username, country, bio, _id } = user;
                    setState((prevState) => {
                        return Object.assign(Object.assign({}, prevState), { username,
                            country,
                            bio });
                    });
                    const test = (yield (collabApiService.getUserCollabs &&
                        collabApiService.getUserCollabs(_id)));
                    setState((prevState) => {
                        return Object.assign(Object.assign({}, prevState), { owncollabs: test });
                    });
                }
                else {
                    console.log(`Couldn't retrieve user info`);
                }
            }
        });
        getProfile();
    }, [username]);
    function goToNewCollab() {
        navigate("/collab/newCollab"); //is this needed?
    }
    function handleCountryUpdate(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (authApiService.profileUpdate)
                    yield authApiService.profileUpdate({
                        _id: ctx.userId,
                        country: e.target.innerText,
                    });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    function handleBioUpdate(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (authApiService.profileUpdate)
                    yield authApiService.profileUpdate({
                        _id: ctx.userId,
                        bio: e.target.innerText,
                    });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    return (React.createElement("div", { className: "main" },
        React.createElement("div", { className: "profile" },
            React.createElement("div", { className: "myprofile" },
                ctx.username === username ? (React.createElement("h6", null, "\u270F\uFE0F Click on the fields to edit \u270F\uFE0F")) : (""),
                React.createElement("h4", null,
                    "@",
                    state.username),
                React.createElement("h5", { contentEditable: ctx.username === username, onBlur: handleCountryUpdate }, state.country),
                React.createElement("h5", { contentEditable: ctx.username === username, onBlur: handleBioUpdate }, state.bio)),
            React.createElement("div", { className: "mycollabs" },
                React.createElement("div", { className: "myCollabsHeader" },
                    React.createElement("h3", null,
                        "@",
                        state.username,
                        " Collabs"),
                    ctx.username === username ? (React.createElement("button", { onClick: goToNewCollab, className: "default-btn", "data-cy": "new-collab" }, "New Collab")) : ("")),
                state.owncollabs.length > 0 ? (React.createElement(CollabList, null, state.owncollabs.map((el) => {
                    el;
                    return (React.createElement(ListedCollab, { owner: username, name: el.name, tracks: el.tracks, _id: el._id, key: el._id, createdAt: el.createdAt }));
                }))) : ("")))));
}
export default Profile;
//# sourceMappingURL=Profile.js.map