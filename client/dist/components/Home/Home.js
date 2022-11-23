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
import img from "../../assets/collab.png";
function Home() {
    const [collabs, setCollabs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    function fetchCollabs() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (collabApiService.getCollabs &&
                collabApiService.getCollabs());
            setCollabs(res);
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "home" },
            React.createElement("div", { className: "title-section" },
                React.createElement("img", { id: "heading", src: img, alt: "musicians playing" }),
                React.createElement("button", { className: "collaborate" }, "Join"),
                React.createElement("h1", { id: "page-title" }, "Play with fellow musicians around the world")),
            React.createElement("div", { className: "explore-section" },
                React.createElement("div", { className: "homeTitle" },
                    React.createElement("h3", null, "Latest Collabs")),
                React.createElement(CollabList, null, collabs.map((el) => {
                    var _a;
                    return (React.createElement(ListedCollab, { owner: (_a = el === null || el === void 0 ? void 0 : el.owner) === null || _a === void 0 ? void 0 : _a.username, name: el.name, tracks: el.tracks, _id: el._id, key: el._id, createdAt: el.createdAt }));
                }))))));
}
export default Home;
//# sourceMappingURL=Home.js.map