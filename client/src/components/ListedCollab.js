import { Link } from "react-router-dom";
import moment from "moment";

function ListedCollab({ owner, name, tracks, _id, createdAt }) {
  return (
    <div key={_id} className="listedCollab">
      <div className="collabOwner">
        <Link to={"/profile/" + owner}>
          <h6>@{owner}</h6>
        </Link>
      </div>
      <Link to={"/collab/id/" + _id}>
        <div className="collabName">
          <h5>{name}</h5>
        </div>
      </Link>
      <div className="collabTracks">
        {tracks.map((el) => {
          if (el.url)
            return (
              <img
                className="listedPictures"
                key={el.url}
                width="160"
                height="160"
                alt=""
                src={
                  el.url[el.url.length - 1] === "m"
                    ? el.url.slice(0, -4) + "jpg"
                    : el.url.slice(0, -3) + "jpg"
                }
              ></img>
            );
        })}
      </div>
      <div className="createdAt">
        <h6 className="dateStyle">
          {moment(createdAt).format("MMMM Do YYYY")}
        </h6>
      </div>
    </div>
  );
}

export default ListedCollab;
