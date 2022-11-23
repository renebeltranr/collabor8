import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./ListedCollab.css";
function ListedCollab({ owner, name, tracks, _id, createdAt }) {
    return (React.createElement("div", { key: _id, className: "listedCollab" },
        React.createElement("div", { className: "collabTracks" }, tracks.map((el) => {
            if (el.url)
                return (React.createElement("img", { className: "listedPictures", key: el.url, width: "120", height: "120", alt: "", src: el.url[el.url.length - 1] === "m"
                        ? el.url.slice(0, -4) + "jpg"
                        : el.url.slice(0, -3) + "jpg" }));
            return null;
        })),
        React.createElement("div", { className: "collabOwner" },
            React.createElement(Link, { to: "/profile/" + owner },
                React.createElement("h6", null,
                    "@",
                    owner))),
        React.createElement(Link, { to: "/collab/id/" + _id },
            React.createElement("div", { className: "collabName" },
                React.createElement("h3", null, name))),
        React.createElement("div", { className: "createdAt" },
            React.createElement("h6", { className: "dateStyle" }, moment(createdAt).format("MMMM Do YYYY")))));
}
export default ListedCollab;
//# sourceMappingURL=ListedCollab.js.map