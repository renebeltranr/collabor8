import apiService from "./../utilities/ApiService";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

const initialState = {
  name: "",
  tracks: [],
  user: {
    username: "",
  },
};

export const Collab = function () {
  let navigate = useNavigate();
  const ctx = useContext(GlobalContext);
  const [state, setState] = useState(initialState);
  const { id } = useParams();
  const playAll = document.getElementsByClassName("videoTrack");

  useEffect(() => {
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

  function handleClick() {
    navigate("/record/" + id);
  }

  function handlePlay() {
    for (let i = 0; i < playAll.length; i++) {
      playAll[i].play();
      playAll[i].volume = 0.9;
    }
  }

  return (
    <div className="collab">
      <div className="collabName">
        <h5>{state.name}</h5>
        <span>
        <h6>@{state.user.username}</h6>
        </span>
        <div className="collabButtons">
        <button className="default-btn" onClick={handlePlay}>Play</button>
        {ctx.userId === state.user._id ? (
          <button className="default-btn" onClick={handleClick}>
            Record
          </button>
        ) : (
          <div></div>
        )}
        </div>
      </div>
      <div className="collabTracks">
        {state.tracks.length === 1 ? (
          <iframe
            title="yt"
            width="300"
            height="300"
            src={"https://www.youtube-nocookie.com/embed/" + state.tracks[0]}
          ></iframe>
        ) : (
          ""
        )}
        {state.tracks.map((el) => {
          if (el[0] === "h" && el[1] === "t")
            return (
              <video className="videoTrack" height="200" width="200" >
                <source
                  src={el}
                  type="video/webm"
                ></source>
              </video>
            );
        })}
      </div>
    </div>
  );
};
