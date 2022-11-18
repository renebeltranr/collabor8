var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect } from "react";
import CollabList from "../CollabList/CollabList";
import ListedCollab from "../ListedCollab/ListedCollab";
import collabApiService from "../../utilities/collabApiService";
import Spinner from "../Spinner/Spinner";
import "./Home.css";
function Home() {
    const [state, setState] = useState([]); // need more descriptive name for this state
    const [isLoading, setIsLoading] = useState(true);
    function fetchCollabs() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield collabApiService.getCollabs();
            setState(res);
            setTimeout(() => {
                setIsLoading(false);
            }, 700);
        });
    }
    useEffect(() => {
        fetchCollabs();
    }, []);
    if (isLoading)
        return React.createElement(Spinner, null);
    return (React.createElement("div", { className: "main" },
        React.createElement("div", { className: "home" },
            React.createElement("div", { className: "homeTitle" },
                React.createElement("h3", null, "LATEST COLLABS")),
            React.createElement(CollabList, null, state.map((el) => {
                return (React.createElement(ListedCollab, { owner: el.owner.username, name: el.name, tracks: el.tracks, _id: el._id, key: el._id, createdAt: el.createdAt }));
            })))));
}
export default Home;
//# sourceMappingURL=Home.js.map