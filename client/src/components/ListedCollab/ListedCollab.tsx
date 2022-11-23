import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./ListedCollab.css";

function ListedCollab({ owner, name, tracks, _id, createdAt }) {
  return (
    <div key={_id} className="listedCollab">
      <div className="collabTracks">
        {tracks.map((el) => {
          if (el.url)
            return (
              <img
                className="listedPictures"
                key={el.url}
                width="120"
                height="120"
                alt=""
                src={
                  el.url[el.url.length - 1] === "m"
                    ? el.url.slice(0, -4) + "jpg"
                    : el.url.slice(0, -3) + "jpg"
                }
              ></img>
            );
          return null;
        })}
      </div>
      <div className="collabOwner">
        <Link to={"/profile/" + owner}>
          <h6>@{owner}</h6>
        </Link>
      </div>
      <Link to={"/collab/id/" + _id}>
        <div className="collabName">
          <h3>{name}</h3>
        </div>
      </Link>
      
      <div className="createdAt">
        <h6 className="dateStyle">
          {moment(createdAt).format("MMMM Do YYYY")}
        </h6>
      </div>
    </div>
  );
}

export default ListedCollab;
