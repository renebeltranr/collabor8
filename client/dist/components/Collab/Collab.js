var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import collabApiService from "../../utilities/collabApiService";
import VolumeSlider from "../VolumeSlider/VolumeSlider";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Collab.css";
const initialCollabState = {
    name: "",
    tracks: [],
    pendingtracks: [],
    user: {
        username: "",
    },
};
export const Collab = function () {
    let navigate = useNavigate();
    const ctx = useContext(GlobalContext);
    const [collab, setCollab] = useState(initialCollabState);
    const { id } = useParams();
    const playAll = document.getElementsByClassName("trackPlayer");
    let trackCounter = 0;
    useEffect(() => {
        const getCollab = () => __awaiter(this, void 0, void 0, function* () {
            const collabInfo = yield (collabApiService.getCollab && collabApiService.getCollab(id));
            if (collabInfo) {
                const { name, tracks, pendingtracks } = collabInfo[0];
                const user = collabInfo[0].owner;
                setCollab((prevState) => {
                    return Object.assign(Object.assign({}, prevState), { name,
                        tracks,
                        pendingtracks,
                        user });
                });
            }
            else {
                console.log(`Couldn't retrieve collab info`);
            }
        });
        getCollab();
    }, [id]);
    function handleClick() {
        navigate("/record/" + id);
    }
    function handlePlay() {
        for (let i = 0; i < playAll.length; i++) {
            let video = playAll[i];
            video === null || video === void 0 ? void 0 : video.play();
        }
    }
    function handlePause() {
        for (let i = 0; i < playAll.length; i++) {
            let video = playAll[i];
            video === null || video === void 0 ? void 0 : video.pause();
        }
    }
    function handleDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            //add confirmation before deletion
            yield (collabApiService.deleteCollab &&
                collabApiService.deleteCollab({
                    uid: collab.user._id,
                    cid: id,
                }));
            navigate(`/profile/${ctx.username}`);
        });
    }
    function acceptTrack(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (collabApiService.acceptTrack
                && collabApiService.acceptTrack({ url: url, cid: id }));
            if (result)
                window.location.reload();
        });
    }
    function denyTrack(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (collabApiService.denyTrack && collabApiService.denyTrack({ url: url, cid: id }));
            if (result)
                window.location.reload();
        });
    }
    function deleteTrack(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (collabApiService.deleteTrack && collabApiService.deleteTrack({ url: url, cid: id }));
            if (result)
                window.location.reload();
        });
    }
    function handleSaveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (collabApiService.saveSettings && collabApiService.saveSettings({
                cid: id,
                collab: collab,
            }));
            if (result)
                window.location.reload();
        });
    }
    function goToUser(id) {
        navigate("/profile/" + id);
    }
    return (React.createElement("div", { className: "main" },
        React.createElement("div", { className: "collab" },
            React.createElement("div", { className: "collabCard" },
                React.createElement("div", { className: "collabName" },
                    React.createElement("h5", null, collab.name),
                    React.createElement("span", null,
                        React.createElement(Link, { to: "/profile/" + collab.user.username },
                            React.createElement("h6", null,
                                "@",
                                collab.user.username))),
                    React.createElement("div", { className: "collabButtons" },
                        React.createElement("button", { className: "default-btn", onClick: handlePlay }, "Play"),
                        React.createElement("button", { className: "default-btn", onClick: handlePause }, "Pause"),
                        ctx.userId === collab.user._id ? (React.createElement(React.Fragment, null,
                            React.createElement("button", { className: "default-btn", onClick: handleClick }, "Record"),
                            React.createElement("button", { className: "default-btn", onClick: handleDelete }, "Delete"),
                            React.createElement("button", { id: "saveSettings", className: "default-btn", onClick: handleSaveSettings }, "Save Settings"))) : (React.createElement("div", null)),
                        ctx.userId !== collab.user._id ? (React.createElement(React.Fragment, null,
                            React.createElement("button", { className: "default-btn", onClick: handleClick }, "Submit Recording"))) : (React.createElement("div", null))),
                    React.createElement("div", null, collab.pendingtracks.length > 0 &&
                        collab.pendingtracks.find((el) => el.username === ctx.username) ? (React.createElement("h6", null, "*You already have submitted tracks pending review")) : (""))),
                collab.tracks.length === 1 ? (React.createElement("h6", null, "There's no user tracks, be the first one to collaborate!")) : (""),
                React.createElement("div", { className: "collabTracks" },
                    collab.tracks.length === 1 ? (React.createElement(React.Fragment, null,
                        React.createElement("iframe", { title: "yt", width: "300", height: "200", src: "https://www.youtube-nocookie.com/embed/" + collab.tracks[0] }))) : (""),
                    collab.tracks.map((el) => {
                        if (el.url && el.url[0] === "h" && el.url[1] === "t")
                            return (React.createElement("div", { className: "videoTrack" },
                                React.createElement("video", { id: "t" + String(trackCounter), className: "trackPlayer", height: "240", width: "240" },
                                    React.createElement("source", { src: el.url, type: "video/webm" })),
                                React.createElement(VolumeSlider, { id: "t" + String(trackCounter), volume: el.volume, setCollab: setCollab, url: el.url }),
                                React.createElement("div", { onClick: () => {
                                        goToUser(el.username);
                                    }, className: "userOnTrack" },
                                    "@",
                                    el.username),
                                React.createElement("div", { hidden: true }, trackCounter++),
                                ctx.userId === collab.user._id ? (React.createElement("div", { className: "pendingButtons" },
                                    React.createElement("button", { onClick: () => deleteTrack(el.url), id: "denyTrack", className: "default-btn" }, "X"))) : ("")));
                        return null;
                    }),
                    collab.pendingtracks.length > 0 && ctx.userId === collab.user._id
                        ? collab.pendingtracks.map((el) => {
                            if (el.url && el.url[0] === "h" && el.url[1] === "t")
                                return (React.createElement("div", { className: "videoTrack" },
                                    React.createElement("video", { id: "p" + String(trackCounter), className: "trackPlayer", height: "240", width: "240" },
                                        React.createElement("source", { src: el.url, type: "video/webm" })),
                                    React.createElement(VolumeSlider, { id: "p" + String(trackCounter), volume: 0, setCollab: setCollab, url: el.url }),
                                    React.createElement("div", { className: "trackStatus" },
                                        React.createElement("h5", null, "Pending track")),
                                    React.createElement("div", { onClick: () => {
                                            goToUser(el.username);
                                        }, className: "userOnTrack" },
                                        "@",
                                        el.username),
                                    React.createElement("div", { className: "pendingButtons" },
                                        React.createElement("button", { onClick: () => acceptTrack(el.url), id: "acceptTrack", className: "default-btn" }, "OK"),
                                        React.createElement("button", { onClick: () => denyTrack(el.url), id: "denyTrack", className: "default-btn" }, "X"))));
                            return null;
                        })
                        : "")))));
};
//# sourceMappingURL=Collab.js.map