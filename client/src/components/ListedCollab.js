import { Link} from 'react-router-dom';


function ListedCollab({ owner, name, tracks, _id}) {

  return (
    <Link to={"/collab/id/" + _id}>
      <div key={_id} className="listedCollab">
        <div className="collabOwner">
        <h6>@{owner}</h6>
        </div>
        <div className="collabName">
        <h5>{name}</h5>
        </div>
        <div className="collabTracks">
        {tracks.map(el => {
          if (el.length >20) return (<img key={el} width='80' height='80' alt='' src={el.slice(0,-4)+'jpg'}></img>)
        })}
        </div>
      </div>
    </Link>
  );
}

export default ListedCollab;
