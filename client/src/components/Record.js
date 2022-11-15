import collabApiService from "../utilities/collabApiService";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import ReactPlayer from "react-player/lazy";
import { upVideoToCloudinary } from "../utilities/Cloudinary";

const initialState = {
  name: "",
  tracks: [],
  user: {
    username: "",
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
    const getCollab = async () => {
      const collabInfo = await collabApiService.getCollab(id);
      if (collabInfo) {
        const { name, tracks } = collabInfo[0];
        const user = collabInfo[0].owner;
        setState((prevState) => {
          return {
            ...prevState,
            name,
            tracks,
            user,
          };
        });
      } else {
        console.log(`Couldn't retrieve collab info`);
      }
    };
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
      if (e.data.size > 0) chunks.push(e.data);
    });
    stopButton.addEventListener("click", function () {
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
          const ret = collabApiService.saveTrack({
            url: data.secure_url,
            cid: id,
            username: ctx.username,
          });
          ret.then((data) => {
            navigate(`/collab/id/${id}`);
          });
        })
        .catch((err) => console.log(err));
    });
    mediaRecorder.start();
  };

  return (
    <div className="record">
      {ctx.userId ? (
        <div className="recordArea">
          <div className="deviceSelect">
            <div className="collabName">
              <h5>{state.name}</h5>
              <h6>@{state.user.username}</h6>
            </div>
            <h5>Select the devices to record with:</h5>
            <select
              onChange={handleAudioSelection}
              name="audiodevices"
              id="devices"
            >
              {audioDevices.length
                ? audioDevices.map((d) => {
                    return (
                      <option key={d.deviceId} value={d.deviceId}>
                        {d.label}
                      </option>
                    );
                  })
                : null}
            </select>
            <select
              onChange={handleVideoSelection}
              name="videodevices"
              id="devices"
            >
              {videoDevices.length
                ? videoDevices.map((d) => {
                    return (
                      <option key={d.deviceId} value={d.devideId}>
                        {d.label}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <h5>
            Play the video to start recording. Once you're done, press the Stop
            button to listen to the preview. If you're happy with it, press
            submit to upload it to your Collab!
          </h5>
          <div className="recButtons">
            <button className="default-btn" id="stop">
              Stop
            </button>
            {
              <button className="default-btn" id="submit">
                Submit
              </button>
            }
            {ctx.userId !== state.user._id ? (
              <h6>
                *Keep in mind the owner will need to review your submission and
                should not be accepted right away.
              </h6>
            ) : (
              ""
            )}
          </div>
          <div className="selfListen">
            <h6>Listen to your recorded track before submitting</h6>
            <audio id="audioPlayer" controls></audio>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="baseTrackAndVid">
        <ReactPlayer
          id="baseTrack"
          title="test"
          width="180"
          height="180"
          url={"https://www.youtube-nocookie.com/embed/" + state.tracks[0]}
          onStart={startHandler}
        />
        <video
          controls
          id="videoPlayer"
          title="test"
          width="180"
          height="180"
        />
      </div>
    </div>
  );
}

export default Record;
