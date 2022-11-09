import React, { useEffect, useState } from 'react';
import apiService from './../utilities/ApiService';
import { Link } from 'react-router-dom';

const initialState = {
  username: '',
  country: '',
  bio: '',
};

function Profile () {
  const [state, setState] = useState(initialState);

  const username = state.username || 'Noname';
  const country = state.country || 'Nowhere';
  const bio = state.bio || 'Nothing';

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile();
      if (userInfo) {
        const { username, country, bio } = userInfo;
        setState((prevState) => {
          return {
            ...prevState,
            username,
            country,
            bio,
          };
        });
      } else {
        console.log(`Couldn't retrieve user info`);
      }
    };
    getProfile();
  }, []);

  return (
    <div className='profile'>
    <div className='myprofile'>
      <h2>My Profile</h2>
      <h3>
        @{username}
      </h3>
      <h4>{country}</h4>
      <h4>{bio}</h4>
    </div>
    <div className='mycollabs'>
    MY COLLABS
    <Link to="/collab/newCollab">
    <button className="default-btn">Create Collab</button>
    </Link>
    </div>
</div>
  );
};

export default Profile;
