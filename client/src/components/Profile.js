import React, { useEffect, useState, useContext, useRef } from 'react';
import apiService from './../utilities/ApiService';
import CollabList from './CollabList';
import ListedCollab from './ListedCollab';
import { useNavigate, useParams } from "react-router-dom";
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
  const { username } = useParams();
  const user = state.username || 'Noname';
  const country = state.country || 'Nowhere';
  const bio = state.bio || 'Nothing';
  const owncollabs = state.owncollabs || []

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile(username);
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
        const test = await apiService.getUserCollabs(_id);
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

  function handleCountryUpdate(e) {
    console.log(e.target.innerText)
  }

  function handleBioUpdate(e) {
    console.log(e.target.innerText)
  }

  return (
    <div className="profile">
      <div className="myprofile">
      {ctx.username === username ? <h6>✏️ Click on the fields to edit ✏️</h6> : ''}<h3>Profile</h3>
        <h4>@{user}</h4>
        <h5 contentEditable={ctx.username === username} onBlur={handleCountryUpdate}>{country}</h5>
        <h5 contentEditable={ctx.username === username} onBlur={handleBioUpdate}>{bio}</h5>
      </div>
      <div className="mycollabs">
        <div className="myCollabsHeader">
        <h3>@{user} Collabs</h3>
        </div>
        {ctx.username === username ? <button onClick={goToNewCollab} className="default-btn">New Collab</button> : ''}
        {owncollabs.length > 0 ? 
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
          })
          }
        </CollabList>
      : ''}
      </div>
    </div>
  );
};

export default Profile;
