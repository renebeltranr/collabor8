import React from "react";
import collabApiService from "../../utilities/collabApiService";
import VolumeSlider from "../VolumeSlider/VolumeSlider";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Collab.css";

const initialCollabState: any = {
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
    const getCollab = async () => {
      const collabInfo = await 
      (collabApiService.getCollab && collabApiService.getCollab(id));
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
      let video = playAll[i] as HTMLVideoElement | null;
      video?.play();
    }
  }

  function handlePause() {
    for (let i = 0; i < playAll.length; i++) {
      let video = playAll[i] as HTMLVideoElement | null;
      video?.pause();
    }
  }

  async function handleDelete() {
    //add confirmation before deletion
    await (collabApiService.deleteCollab && 
      collabApiService.deleteCollab
    ({
      uid: collab.user._id,
      cid: id,
    }));
    navigate(`/profile/${ctx.username}`);
  }

  async function acceptTrack(url) {
    const result = await (collabApiService.acceptTrack && collabApiService.acceptTrack({ url: url, cid: id }));
    if (result) window.location.reload();
  }
  async function denyTrack(url) {
    const result = await (collabApiService.denyTrack && collabApiService.denyTrack({ url: url, cid: id }));
    if (result) window.location.reload();
  }
  async function deleteTrack(url) {
    const result = await (collabApiService.deleteTrack && collabApiService.deleteTrack({ url: url, cid: id }));
    if (result) window.location.reload();
  }
  async function handleSaveSettings() {
    const result = await (collabApiService.saveSettings && collabApiService.saveSettings({
      cid: id,
      collab: collab,
    }));
    if (result) window.location.reload();
  }

  function goToUser(id) {
    navigate("/profile/" + id);
  }

  return (
    <div className="main">
      <div className="collab">
        <div className="collabCard">
          <div className="collabName">
            <h5>{collab.name}</h5>
            <span>
              <Link to={"/profile/" + collab.user.username}>
                <h6>@{collab.user.username}</h6>
              </Link>
            </span>
            <div className="collabButtons">
              <button className="default-btn" onClick={handlePlay}>
                Play
              </button>
              <button className="default-btn" onClick={handlePause}>
                Pause
              </button>
              {ctx.userId === collab.user._id ? (
                <>
                  <button className="default-btn" onClick={handleClick}>
                    Record
                  </button>
                  <button className="default-btn" onClick={handleDelete}>
                    Delete
                  </button>
                  <button
                    id="saveSettings"
                    className="default-btn"
                    onClick={handleSaveSettings}
                  >
                    Save Settings
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

            <div>
              {collab.pendingtracks.length > 0 &&
              collab.pendingtracks.find(
                (el) => el.username === ctx.username
              ) ? (
                <h6>*You already have submitted tracks pending review</h6>
              ) : (
                ""
              )}
            </div>
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
                    <video
                      id={"t" + String(trackCounter)}
                      className="trackPlayer"
                      height="240"
                      width="240"
                    >
                      <source src={el.url} type="video/webm"></source>
                    </video>
                    <VolumeSlider
                      id={"t" + String(trackCounter)}
                      volume={el.volume}
                      setCollab={setCollab}
                      url={el.url}
                    />
                    <div
                      onClick={() => {
                        goToUser(el.username);
                      }}
                      className="userOnTrack"
                    >
                      @{el.username}
                    </div>
                    <div hidden>{trackCounter++}</div>
                    {ctx.userId === collab.user._id ? (
                      <div className="pendingButtons">
                        <button
                          onClick={() => deleteTrack(el.url)}
                          id="denyTrack"
                          className="default-btn"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              return null;
            })}

            {collab.pendingtracks.length > 0 && ctx.userId === collab.user._id
              ? collab.pendingtracks.map((el) => {
                  if (el.url && el.url[0] === "h" && el.url[1] === "t")
                    return (
                      <div className="videoTrack">
                        <video
                          id={"p" + String(trackCounter)}
                          className="trackPlayer"
                          height="240"
                          width="240"
                        >
                          <source src={el.url} type="video/webm"></source>
                        </video>
                        <VolumeSlider
                          id={"p" + String(trackCounter)}
                          volume={0}
                          setCollab={setCollab}
                          url={el.url}
                        />
                        <div className="trackStatus">
                          <h5>Pending track</h5>
                        </div>
                        <div
                          onClick={() => {
                            goToUser(el.username);
                          }}
                          className="userOnTrack"
                        >
                          @{el.username}
                        </div>
                        <div className="pendingButtons">
                          <button
                            onClick={() => acceptTrack(el.url)}
                            id="acceptTrack"
                            className="default-btn"
                          >
                            OK
                          </button>
                          <button
                            onClick={() => denyTrack(el.url)}
                            id="denyTrack"
                            className="default-btn"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    );
                  return null;
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
