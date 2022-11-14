import collabApiService from "../utilities/collabApiService";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

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

  useEffect(() => {
    const getCollab = async () => {
      const collabInfo = await collabApiService.getCollab(id);
      if (collabInfo) {
        const { name, tracks, pendingtracks } = collabInfo[0];
        const user = collabInfo[0].owner;
        setCollab((prevState) => {
          return {
            ...prevState,
            name,
            tracks,
            pendingtracks,
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
    const deletion = await collabApiService.deleteCollab({
      uid: collab.user._id,
      cid: id,
    });
    console.log(deletion);
    navigate(`/profile/${ctx.username}`);
  }

  return (
    <div className="collab">
      <div className="collabCard">
        <div className="collabName">
          <h5>{collab.name}</h5>
          <span>
            <h6>@{collab.user.username}</h6>
          </span>
          <div className="collabButtons">
            <button className="default-btn" onClick={handlePlay}>
              Play
            </button>
            {ctx.userId === collab.user._id ? (
              <>
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
            {ctx.userId !== collab.user._id ? (
              <>
                <button className="default-btn" onClick={handleClick}>
                  Submit Recording
                </button>
              </>
            ) : (
              <div></div>
            )}
          </div>

          <div>{collab.pendingtracks.length > 0 && collab.pendingtracks.find(el => el.username === ctx.username) ? <h6>You have already submitted tracks for review in this Collab</h6> : ''}</div>
        </div>
        {collab.tracks.length === 1 ? (
          <h6>There's no user tracks, be the first one to collaborate!</h6>
        ) : (
          ""
        )}
        <div className="collabTracks">
          {collab.tracks.length === 1 ? (
            <>
              <iframe
                title="yt"
                width="300"
                height="200"
                src={
                  "https://www.youtube-nocookie.com/embed/" + collab.tracks[0]
                }
              ></iframe>
            </>
          ) : (
            ""
          )}
          {collab.tracks.map((el) => {
            if (el.url && el.url[0] === "h" && el.url[1] === "t")
              return (
                <div className="videoTrack">
                  <video className="trackPlayer" height="200" width="200">
                    <source src={el.url} type="video/webm"></source>
                  </video>
                    <div className="userOnTrack">@{el.username}</div>
                </div>
              );
          })}
          

          {(collab.pendingtracks.length > 0 &&  ctx.userId === collab.user._id) ? collab.pendingtracks.map((el) => {
            if (el.url && el.url[0] === "h" && el.url[1] === "t")
              return (
                <div className="videoTrack">
                  <video className="trackPlayer" height="200" width="200">
                    <source src={el.url} type="video/webm"></source>
                  </video>
                    <div className="trackStatus">Pending track</div>
                    <div className="userOnTrack">@{el.username}</div>
                </div>
              );
          }) : ''}
        </div>
      </div>
    </div>
  );
};
