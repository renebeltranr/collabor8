import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./ListedCollab.css";

function ListedCollab({ owner, name, tracks, _id, createdAt }) {
  return (
    <div key={_id} className="listedCollab">
      <div className="collab-tracks">
        {tracks.map((el) => {
          if (el.url)
            return (
              <img
                className="listedPictures"
                key={el.url}
                width="50"
                height="50"
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
     

     <div className="collab-info">
        <Link to={"/collab/id/" + _id}>
            <h2>{name}</h2>
        </Link>
      
        <Link to={"/profile/" + owner}>
          <p> created by @{owner}</p>
        </Link>

        <h6>
          {moment(createdAt).format("MMM Do YY")}
        </h6>
    </div>

  </div>
  );
}

export default ListedCollab;
