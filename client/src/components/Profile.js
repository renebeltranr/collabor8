import React, { useEffect, useState } from 'react';
import apiService from './../utilities/ApiService';
import { Link } from 'react-router-dom';
import CollabList from './CollabList';
import Collab from './Collab';

const initialState = {
  username: '',
  country: '',
  bio: '',
  owncollabs: []
};

function Profile () {
  const [state, setState] = useState(initialState);

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

  return (
    <div className="profile">
      <div className="myprofile">
        <h2>My Profile</h2>
        <h3>@{username}</h3>
        <h4>{country}</h4>
        <h4>{bio}</h4>
      </div>
      <div className="mycollabs">
        <div className="myCollabsHeader">
        <h2> MY COLLABS</h2>
          <Link to="/collab/newCollab">
            <button className="default-btn">New Collab</button>
          </Link>
        </div>
        <CollabList>
          {owncollabs.map((el) => {
            return (
              <Collab
                owner={username}
                name={el.name}
                tracks={el.tracks}
              />
            );
          })}
        </CollabList>
      </div>
    </div>
  );
};

export default Profile;
