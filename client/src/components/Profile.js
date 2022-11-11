import React, { useEffect, useState, useContext } from 'react';
import apiService from './../utilities/ApiService';
import CollabList from './CollabList';
import ListedCollab from './ListedCollab';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

const initialState = {
  username: '',
  country: '',
  bio: '',
  owncollabs: [],
};

function Profile () {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const ctx = useContext(GlobalContext);

  const username = state.username || 'Noname';
  const country = state.country || 'Nowhere';
  const bio = state.bio || 'Nothing';
  const owncollabs = state.owncollabs || 'None'

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile();
      if (userInfo) {
        const { username, country, bio, _id } = userInfo;
        setState((prevState) => {
          return {
            ...prevState,
            username,
            country,
            bio,
          };
        });
        const test = await apiService.getUserCollabs(_id)
        setState(prevState => {
          return {
            ...prevState,
            owncollabs: test
          }
        })
      } else {
        console.log(`Couldn't retrieve user info`);
      }
    };
    getProfile();
  }, []);

  function goToNewCollab () {
    navigate('/collab/newCollab');
  }

  return (
    <div className="profile">
      <div className="myprofile">
      {ctx.isAuthenticated ? '✏️' : ''}<h3>My Profile</h3>
        <h4>@{username}</h4>
        <h5 contentEditable='true'>{country}</h5>
        <h5 contentEditable='true'>{bio}</h5>
      </div>
      <div className="mycollabs">
        <div className="myCollabsHeader">
        <h3>My Collabs</h3>
            <button onClick={goToNewCollab} className="default-btn">New Collab</button>
        </div>
        <CollabList>
          {owncollabs.map((el) => {
            return (
              <ListedCollab
                owner={username}
                name={el.name}
                tracks={el.tracks}
                _id={el._id}
                key={el._id}
              />
            );
          })}
        </CollabList>
      </div>
    </div>
  );
};

export default Profile;
