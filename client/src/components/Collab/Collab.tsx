import React from "react";
import collabApiService from "../../utilities/collabApiService";
import VolumeSlider from "../VolumeSlider/VolumeSlider";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Collab.css";
import { ICollab } from "../../utilities/types";
import { IUser } from "../../utilities/types";
import Spinner from "../Spinner/Spinner";

/* const initialCollabState = {
  name: "",
  tracks: [],
  pendingtracks: [],
  owner: {
    username: "",
  },
}; */

export const Collab = function () {
  let navigate = useNavigate();
  const ctx = useContext(GlobalContext);
  const [collab, setCollab] = useState();
  const { id } = useParams();
  const playAll = document.getElementsByClassName("trackPlayer");
  let trackCounter = 0;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCollab = async () => {
      const collabArray = await collabApiService.getCollab(id);
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
      const collabObj: ICollab = collabArray[0];
      console.log(collabObj);
      if (collabObj) {
        const { name, tracks, pendingtracks, owner } = collabObj;
        //const user = collabObj.owner;
        setCollab((collabObj: ICollab) => {});
      } else {
        console.log(`Couldn't retrieve collab info`);
      }
    };
    getCollab();
  }, [id]);

  if (isLoading) return <Spinner />;

  function handleClick() {
    navigate("/record/" + id);
  }

  function handlePlay() {
    for (let i = 0; i < playAll.length; i++) {
      playAll[i].play();
    }
  }

  function handlePause() {
    for (let i = 0; i < playAll.length; i++) {
      playAll[i].pause();
    }
  }

  async function handleDelete() {
    //TO DO: add confirmation before deletion
    await collabApiService.deleteCollab({
      uid: collab.owner._id,
      cid: id,
    });
    navigate(`/profile/${ctx.username}`);
  }

  async function acceptTrack(url: string) {
    const result = await collabApiService.acceptTrack({ url: url, cid: id });
    if (result) window.location.reload();
  }
  async function denyTrack(url: string) {
    const result = await collabApiService.denyTrack({ url: url, cid: id });
    if (result) window.location.reload();
  }
  async function deleteTrack(url: string) {
    const result = await collabApiService.deleteTrack({ url: url, cid: id });
    if (result) window.location.reload();
  }
  async function handleSaveSettings() {
    const result = await collabApiService.saveSettings({
      cid: id,
      collab: collab,
    });
    if (result) window.location.reload();
  }

  function goToUser(id: string) {
    navigate("/profile/" + id);
  }

  return (
    <div className="main">
      <div className="collab">
        <div className="collabCard">
          <div className="collabName">
            <h5>{collab.name}</h5>
            <span>
              <Link to={"/profile/" + collab.owner.username}>
                <h6>@{collab.owner.username}</h6>
              </Link>
            </span>
            <div className="collabButtons">
              <button className="default-btn" onClick={handlePlay}>
                Play
              </button>
              <button className="default-btn" onClick={handlePause}>
                Pause
              </button>
              {ctx.userId === collab.owner._id ? (
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
              {ctx.userId !== collab.owner._id ? (
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
            {collab.tracks.map((el: any) => {
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
                    {ctx.userId === collab.owner._id ? (
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

            {collab.pendingtracks.length > 0 && ctx.userId === collab.owner._id
              ? collab.pendingtracks.map((el: any) => {
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
