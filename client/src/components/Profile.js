import React, { useEffect, useState, useContext } from 'react';
import authApiService from '../utilities/authApiService';
import collabApiService from '../utilities/collabApiService';
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
  const { username } = useParams();
  initialState.username = username;
  const [state, setState] = useState(initialState);
  const ctx = useContext(GlobalContext);

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await authApiService.profile(username);
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
        const test = await collabApiService.getUserCollabs(_id);
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
  }, [username]);

  function goToNewCollab () {
    navigate('/collab/newCollab');
  }

  async function handleCountryUpdate(e) {
    console.log(e.target.innerText)
    const result = await authApiService.profileUpdate({_id: ctx.userId, country: e.target.innerText});
  }

  async function handleBioUpdate(e) {
    console.log(e.target.innerText)
    const result = await authApiService.profileUpdate({_id: ctx.userId, bio: e.target.innerText});
  }

  return (
    <div className="profile">
      <div className="myprofile">
      {ctx.username === username ? <h6>✏️ Click on the fields to edit ✏️</h6> : ''}
        <h4>@{state.username}</h4>
        <h5 contentEditable={ctx.username === username} onBlur={handleCountryUpdate}>{state.country}</h5>
        <h5 contentEditable={ctx.username === username} onBlur={handleBioUpdate}>{state.bio}</h5>
      </div>
      <div className="mycollabs">
        <div className="myCollabsHeader">
        <h3>@{state.username} Collabs</h3>
        {ctx.username === username ? <button onClick={goToNewCollab} className="default-btn">New Collab</button> : ''}
        </div>
        {state.owncollabs.length > 0 ? 
        <CollabList>
          {state.owncollabs.map((el) => {
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
