import { Link} from 'react-router-dom';


function ListedCollab({ owner, name, tracks, _id}) {

  return (

      <div key={_id} className="listedCollab">
        <div className="collabOwner">
        <Link to={"/profile/" + owner}>
        <h6>@{owner}</h6>
        </Link>
        </div>
        <Link to={"/collab/id/" + _id}>
        <div className="collabName">
        </div>
        </Link>
        <h5>{name}</h5>
        <div className="collabTracks">
        {tracks.map(el => {
          if (el.length >20) return (<img key={el} width='80' height='80' alt='' src={el.slice(0,-4)+'jpg'}></img>)
        })}
        </div>
      </div>
    
  );
}

export default ListedCollab;
