import React, { useState, useEffect } from "react";
import CollabList from "./CollabList";
import ListedCollab from "./ListedCollab";
import collabApiService from "../utilities/collabApiService";
import Spinner from "./styles//Spinner";

function Home() {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCollabs() {
    const res = await collabApiService.getCollabs();
    setState(res);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }

  useEffect(() => {
    fetchCollabs();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="home">
      <div className="homeTitle">
        <h3>LATEST COLLABS</h3>
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
              createdAt={el.createdAt}
            />
          );
        })}
      </CollabList>
    </div>
  );
}

export default Home;
