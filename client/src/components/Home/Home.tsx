import React, { useState, useEffect } from "react";
import CollabList from "../CollabList/CollabList";
import ListedCollab from "../ListedCollab/ListedCollab";
import collabApiService from "../../utilities/collabApiService";
import Spinner from "../Spinner/Spinner";
import "./Home.css";
import { ICollab } from "../../utilities/types";
import img from "../../assets/collab.png";
import {Link} from 'react-router-dom';

function Home() {
  const [collabs, setCollabs] = useState<ICollab[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCollabs() {
    const res: ICollab[] = await 
    (collabApiService.getCollabs && 
      collabApiService.getCollabs()) as any as ICollab[];
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
    <>
      <div className="home">
      <div className="title-section">
        
        <img id="heading" src={img} alt="musicians playing" /> 
        <Link to="/register">
        <button className="collaborate">Join</button>
        </Link>
        <h1 id="page-title">Play with fellow musicians around the world</h1>
      </div>
      <div className="explore-section">
        <div className="explore-title">
          <h3>Latest Collabs</h3>
        </div>
        <CollabList>
          {collabs.map((el: ICollab) => {
            return (
              <ListedCollab
                owner={el?.owner?.username}
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
    </>
  );
}

export default Home;
