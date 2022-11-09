import React, { useState, useEffect } from "react";
import CollabList from './CollabList';
import Collab from './Collab';
import apiService from "./../utilities/ApiService";


function Home(){
  const [state, setState] = useState([]);

  async function fetchCollabs() {
    const res = await apiService.getCollabs();
    setState(res);
  }

  useEffect(() => {
    fetchCollabs();
  }, []);

  return (
    <div className='home'>
      <h2>
        MOST VIEWED COLLABS&nbsp;
        <span role="img">
          🏠
        </span>
      </h2>
      <CollabList>
          {state.map((el) => {
            return (
              <Collab
                owner={el.owner}
                name={el.name}
                tracks={el.tracks}
              />
            );
          })}
        </CollabList>
    </div>
  );
};

export default Home;
