import React, { useEffect, useState, useContext } from "react";
import authApiService from "../../utilities/authApiService";
import collabApiService from "../../utilities/collabApiService";
import CollabList from "../CollabList/CollabList";
import ListedCollab from "../ListedCollab/ListedCollab";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Profile.css";
import { ICollab, IUser } from "../../utilities/types";

const initialState: IUser = {
  username: "",
  password:"",
  country: "",
  bio: "",
  owncollabs: [],
};

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  initialState.username = username as string;
  const [state, setState] = useState<IUser>(initialState);
  const ctx = useContext(GlobalContext);

  useEffect(() => {
    const getProfile = async () => {
      if (authApiService.profile) {
        const userInfo: IUser | Response = (await authApiService.profile(
          username as string
        )) as Response | IUser;
        if (userInfo) {
          const user = userInfo as IUser;
          const { username, country, bio, _id } = user;
          setState((prevState) => {
            return {
              ...prevState,
              username,
              country,
              bio,
            };
          });
          const test: string[] = (await (collabApiService.getUserCollabs &&
            collabApiService.getUserCollabs(_id as string))) as any as string[];
          setState((prevState: IUser) => {
            return {
              ...prevState,
              owncollabs: test,
            };
          });
        } else {
          console.log(`Couldn't retrieve user info`);
        }
      }
    };
    getProfile();
  }, [username]);

  function goToNewCollab() {
    navigate("/collab/newCollab"); //is this needed?
  }

  async function handleCountryUpdate(e) {
    try {
      if (authApiService.profileUpdate)
        await authApiService.profileUpdate({
          _id: ctx.userId,
          country: e.target.innerText,
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBioUpdate(e) {
    try {
      if (authApiService.profileUpdate)
        await authApiService.profileUpdate({
          _id: ctx.userId,
          bio: e.target.innerText,
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main">
      <div className="profile">
        <div className="myprofile">
          {ctx.username === username ? (
            <h6>✏️ Click on the fields to edit ✏️</h6>
          ) : (
            ""
          )}
          <h4>@{state.username}</h4>
          <h5
            contentEditable={ctx.username === username}
            onBlur={handleCountryUpdate}
          >
            {state.country}
          </h5>
          <h5
            contentEditable={ctx.username === username}
            onBlur={handleBioUpdate}
          >
            {state.bio}
          </h5>
        </div>
        <div className="mycollabs">
          <div className="myCollabsHeader">
            <h3>@{state.username} Collabs</h3>
            {ctx.username === username ? (
              <button onClick={goToNewCollab} className="default-btn" data-cy="new-collab">
                New Collab
              </button>
            ) : (
              ""
            )}
          </div>
          {state.owncollabs.length > 0 ? (
            <CollabList>
              {(state.owncollabs as ICollab[]).map((el) => {
                el as any as ICollab;
                return (
                  <ListedCollab
                    owner={username}
                    name={el.name}
                    tracks={el.tracks}
                    _id={el._id}
                    key={el._id}
                    createdAt={el.createdAt}
                  />
                );
              })}
            </CollabList>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
