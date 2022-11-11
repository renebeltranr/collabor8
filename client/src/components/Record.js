import apiService from "./../utilities/ApiService";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import ReactPlayer from 'react-player/lazy'
import { upAudioToCloudinary } from "../utilities/Cloudinary";

const initialState = {
  name: "",
  tracks: [],
  user: {
    username: "",
  },
};

function Record() {
  const ctx = useContext(GlobalContext);
  const [devices, setDevices] = useState([]);
  const [state, setState] = useState(initialState);
  const [uploaded, setUploaded] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devs) => {
      setDevices(devs.filter((d) => d.kind === "audioinput"));
    });
    const getCollab = async () => {
      const collabInfo = await apiService.getCollab(id);
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
  }, []);


  const stopButton = document.getElementById("stop");
  const submitButton = document.getElementById("submit");
  const player = document.getElementById("player");
  
  const handleSuccess = function (stream) {
    const options = { mimeType: "audio/webm" };
    const mediaRecorder = new MediaRecorder(stream, options);
    const chunks = [];
    mediaRecorder.addEventListener("dataavailable", function (e) {
      if (e.data.size > 0) chunks.push(e.data);
    });
    mediaRecorder.addEventListener("stop", function () {
      let blob = new Blob(chunks);
      let audioURL = window.URL.createObjectURL(blob);
      player.src = audioURL;
    });
    stopButton.addEventListener("click", function () {
      mediaRecorder.stop();
    });
    submitButton.addEventListener("click", function () {
        console.log('submitting audio: ', chunks[0])
        const result = upAudioToCloudinary(chunks[0])
        result.then((data)=>{
          submitButton.disabled=true;
          console.log(data)
          const ret = apiService.saveTrack({url: data.secure_url, cid: id});
          ret.then(data=>console.log(data))
        })
        .catch((err)=>console.log(err))
    }
    )
    mediaRecorder.start();
  };

  function startHandler(){
    let constraintObj = { 
      audio: true, 
      video: { 
          facingMode: "user", 
          width: { min: 480, ideal: 480, max: 480 },
          height: { min: 480, ideal: 480, max: 480 } 
      } 
  }; 
    navigator.mediaDevices
      .getUserMedia(constraintObj)
      .then(handleSuccess);
  }

  return (
    <div className="record">
      <div className="collabName">
        <h5>{state.name}</h5>
        <span>@{state.user.username}</span>
        {ctx.userId === state.user._id ? (
          <div className="recordArea">
            <h5>Select the device to record with:</h5>
            <select name="devices" id="devices">
              {devices.length
                ? devices.map((d) => {
                    return (
                      <option key={d.label} value={d.label}>
                        {d.label}
                      </option>
                    );
                  })
                : null}
            </select>
            <h5>Listen to your recorded track before submitting</h5>
            <audio id="player" controls></audio>
            <h6>
              Play the video to start recording. Once you're done, press the Stop
              button to listen to the preview. If you're happy with it, press
              submit to upload it to your Collab!
            </h6>
            <div className="recButtons">
              <button id="stop">Stop</button>
              <button id="submit">Submit</button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="collabTracks">
        <ReactPlayer
          id="baseTrack"
          title="test"
          width="420"
          height="180"
          url={"https://www.youtube-nocookie.com/embed/" + state.tracks[0]}
          onStart={startHandler}
        />
      </div>
    </div>
  );
}

export default Record;
