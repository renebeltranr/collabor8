var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import collabApiService from "../../utilities/collabApiService";
import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import ReactPlayer from "react-player/lazy";
import { upVideoToCloudinary } from "../../utilities/Cloudinary";
import "./Record.css";
const initialState = {
    name: "",
    tracks: [],
    user: {
        username: "",
        _id: undefined,
    },
};
function Record() {
    const ctx = useContext(GlobalContext);
    const navigate = useNavigate();
    const [audioDevices, setAudioDevices] = useState([]);
    const [videoDevices, setVideoDevices] = useState([]);
    const [selectedAudioDevice, setSelectedAudioDevice] = useState("");
    const [selectedVideoDevice, setSelectedVideoDevice] = useState("");
    const [state, setState] = useState(initialState);
    const { id } = useParams();
    function handleAudioSelection(e) {
        setSelectedAudioDevice(e.target.value);
    }
    function handleVideoSelection(e) {
        setSelectedVideoDevice(e.target.value);
    }
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devs) => {
            setAudioDevices(devs.filter((d) => d.kind === "audioinput"));
            setVideoDevices(devs.filter((d) => d.kind === "videoinput"));
        });
        const getCollab = () => __awaiter(this, void 0, void 0, function* () {
            const collabInfo = yield (collabApiService.getCollab
                && collabApiService.getCollab(id));
            if (collabInfo) {
                const { name, tracks } = collabInfo[0];
                const user = collabInfo[0].owner;
                setState((prevState) => {
                    return Object.assign(Object.assign({}, prevState), { name,
                        tracks,
                        user });
                });
            }
            else {
                console.log(`Couldn't retrieve collab info`);
            }
        });
        getCollab();
    }, [id]);
    const stopButton = document.getElementById("stop");
    const submitButton = document.getElementById("submit");
    const audioPlayer = document.getElementById("audioPlayer");
    const videoPlayer = document.getElementById("videoPlayer");
    function startHandler() {
        let constraintObj = {
            audio: { deviceId: selectedAudioDevice },
            video: {
                deviceId: selectedVideoDevice,
                facingMode: "user",
                width: { min: 480, ideal: 480, max: 480 },
                height: { min: 480, ideal: 480, max: 480 },
            },
        };
        navigator.mediaDevices.getUserMedia(constraintObj).then(handleSuccess);
    }
    const handleSuccess = function (stream) {
        const options = {
            mimeType: "audio/webm",
            AudioBitsPerSecond: 256000,
            videoBitsPerSecond: 256000,
        };
        const mediaRecorder = new MediaRecorder(stream, options);
        const chunks = [];
        mediaRecorder.addEventListener("dataavailable", function (e) {
            if (e.data.size > 0)
                chunks.push(e.data);
        });
        stopButton === null || stopButton === void 0 ? void 0 : stopButton.addEventListener("click", function () {
            mediaRecorder.stop();
        });
        mediaRecorder.addEventListener("stop", function () {
            let blob = new Blob(chunks);
            let audioURL = window.URL.createObjectURL(blob);
            audioPlayer.src = audioURL;
            videoPlayer.src = audioURL;
            submitButton.disabled = false;
        });
        submitButton.addEventListener("click", function () {
            const result = upVideoToCloudinary(chunks[0]);
            result
                .then((data) => {
                submitButton.disabled = true;
                const ret = (collabApiService.saveTrack &&
                    collabApiService.saveTrack({
                        url: data.secure_url,
                        cid: id,
                        username: ctx.username,
                    }));
                ret === null || ret === void 0 ? void 0 : ret.then((data) => {
                    navigate(`/collab/id/${id}`);
                });
            })
                .catch((err) => console.log(err));
        });
        mediaRecorder.start();
    };
    return (React.createElement("div", { className: "main" },
        React.createElement("div", { className: "record" },
            ctx.userId ? (React.createElement("div", { className: "recordArea" },
                React.createElement("div", { className: "deviceSelect" },
                    React.createElement("div", { className: "collabName" },
                        React.createElement("h5", null, state.name),
                        React.createElement("h6", null,
                            "@",
                            state.user.username)),
                    React.createElement("h5", null, "Select the devices to record with:"),
                    React.createElement("select", { onChange: handleAudioSelection, name: "audiodevices", id: "devices" }, audioDevices.length
                        ? audioDevices.map((d) => {
                            return (React.createElement("option", { key: d.deviceId, value: d.deviceId }, d.label));
                        })
                        : null),
                    React.createElement("select", { onChange: handleVideoSelection, name: "videodevices", id: "devices" }, videoDevices.length
                        ? videoDevices.map((d) => {
                            return (React.createElement("option", { key: d.deviceId, value: d.deviceId }, d.label));
                        })
                        : null)),
                React.createElement("h5", null, "Play the video to start recording. Once you're done, press the Stop button to listen to the preview. If you're happy with it, press submit to upload it to your Collab!"),
                React.createElement("div", { className: "recButtons" },
                    React.createElement("button", { className: "default-btn", id: "stop" }, "Stop"),
                    React.createElement("button", { className: "default-btn", id: "submit" }, "Submit"),
                    ctx.userId !== state.user._id ? (React.createElement("h6", null, "*Keep in mind the owner will need to review your submission and should not be accepted right away.")) : ("")),
                React.createElement("div", { className: "selfListen" },
                    React.createElement("h6", null, "Listen to your recorded track before submitting"),
                    React.createElement("audio", { id: "audioPlayer", controls: true })))) : (React.createElement("div", null)),
            React.createElement("div", { className: "baseTrackAndVid" },
                React.createElement(ReactPlayer, { id: "baseTrack", title: "test", width: "180", height: "180", url: "https://www.youtube-nocookie.com/embed/" + state.tracks[0], onStart: startHandler }),
                React.createElement("video", { controls: true, id: "videoPlayer", title: "test", width: "180", height: "180" })))));
}
export default Record;
//# sourceMappingURL=Record.js.map