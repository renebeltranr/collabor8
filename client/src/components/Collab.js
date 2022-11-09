function Collab({ owner, name, tracks}) {
  return (
    <div className="collab">
      <div className='collabOwner'>{owner}</div>
      <div className='collabName'>{name}</div>
      <div className='collabTracks'>{tracks.length}</div>
    </div>
  );
}

export default Collab;
