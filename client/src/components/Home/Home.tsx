import React, { useState, useEffect } from "react";
import CollabList from "../CollabList/CollabList";
import ListedCollab from "../ListedCollab/ListedCollab";
import collabApiService from "../../utilities/collabApiService";
import Spinner from "../Spinner/Spinner";
import "./Home.css";

type Collab = {
  createdAt: string;
  name: string;
  owner: { username: string };
  _id: string;
  tracks: string[];
};

function Home() {
  const [collabs, setCollabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCollabs() {
    const res = await collabApiService.getCollabs();
    setCollabs(res);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }

  useEffect(() => {
    fetchCollabs();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="main">
      <div className="home">
        <div className="homeTitle">
          <h3>LATEST COLLABS</h3>
        </div>
        <CollabList>
          {collabs.map((el: Collab) => {
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
    </div>
  );
}

export default Home;
