import React, { useState, useEffect } from "react";
import CollabList from './CollabList';
import ListedCollab from './ListedCollab';
import collabApiService from "../utilities/collabApiService";


function Home(){
  const [state, setState] = useState([]);

  async function fetchCollabs() {
    const res = await collabApiService.getCollabs();
    setState(res);
  }

  useEffect(() => {
    fetchCollabs();
  }, []);

  return (
    <div className='home'>
      <div className="homeTitle"><h2>
        MOST VIEWED COLLABS&nbsp;
        <span role="img">
          🏠
        </span>
      </h2>
      </div>
      <CollabList>
          {state.map((el) => {
            return (
              <ListedCollab
                owner={el.owner.username}
                name={el.name}
                tracks={el.tracks}
                _id={el._id}
                key={el._id}
              />
            );
          })}
        </CollabList>
    </div>
  );
};

export default Home;
