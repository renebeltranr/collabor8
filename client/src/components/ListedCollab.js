import { Link} from 'react-router-dom';


function ListedCollab({ owner, name, tracks, _id}) {

  return (
    <Link to={"/collab/id/" + _id}>
      <div className="listedCollab">
        <div className="collabOwner">@{owner}</div>
        <div className="collabName">{name}</div>
        <div className="collabTracks">Current tracks: {tracks.length}</div>
      </div>
    </Link>
  );
}

export default ListedCollab;
