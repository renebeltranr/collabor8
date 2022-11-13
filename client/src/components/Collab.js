import collabApiService from "../utilities/collabApiService";
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

  function handleClick() {
    navigate("/record/" + id);
  }

  function handlePlay() {
    for (let i = 0; i < playAll.length; i++) {
      playAll[i].play();
    }
  }

  async function handleDelete() {
    //add confirmation before deletion
    console.log()
    const deletion = await collabApiService.deleteCollab({uid: state.user._id , cid: id})
    console.log(deletion);
    navigate(`/profile/${ctx.username}`)
  }

  return (
    <div className="collab">
    <div className="collabCard">
      <div className="collabName">
        <h5>{state.name}</h5>
        <span>
          <h6>@{state.user.username}</h6>
        </span>
        <div className="collabButtons">
          <button className="default-btn" onClick={handlePlay}>
            Play
          </button>
          {ctx.userId === state.user._id ? (<>
            <button className="default-btn" onClick={handleClick}>
              Record
            </button>
            <button className="default-btn" onClick={handleDelete}>
              Delete
            </button>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {state.tracks.length === 1 ? <h6>There's no user tracks, be the first one to collaborate!</h6> : ''}
      <div className="collabTracks">
        {state.tracks.length === 1 ? (<>

          <iframe
            title="yt"
            width="300"
            height="200"
            src={"https://www.youtube-nocookie.com/embed/" + state.tracks[0]}
          ></iframe>
          </>
        ) : (
          ""
        )}
        {state.tracks.map((el) => {
          if (el[0] === "h" && el[1] === "t")
            return (
              <video className="videoTrack" height="200" width="200">
                <source src={el} type="video/webm"></source>
              </video>
            );
        })}
      </div>
      </div>
    </div>
  );
};
