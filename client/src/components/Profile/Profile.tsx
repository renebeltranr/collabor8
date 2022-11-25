import React, { useEffect, useState, useContext } from "react";
import authApiService from "../../utilities/authApiService";
import collabApiService from "../../utilities/collabApiService";
import CollabList from "../CollabList/CollabList";
import ListedCollab from "../ListedCollab/ListedCollab";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Profile.css";
import { ICollab, IUser } from "../../utilities/types";
import { FaPlusCircle, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

const initialState: IUser = {
  username: "",
  password:"",
  country: "",
  bio: "",
  owncollabs: [],
};

function Profile() {
  //const navigate = useNavigate();
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

/*   function goToNewCollab() {
    navigate("/collab/newCollab"); //is this needed?
  } */

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
    <>
      <div className="profile">
        <div className="left">
          <div className="myCollabsHeader"><h2> Hi @{state.username}!</h2></div>
        

        <div className="myprofile">
          {ctx.username === username ? (
            <FaPen/>
          ) : (
            ""
          )}
          <p
            contentEditable={ctx.username === username}
            onBlur={handleCountryUpdate}
          >
            {state.country}
          </p>
          <p
            contentEditable={ctx.username === username}
            onBlur={handleBioUpdate}
          >
            {state.bio}
          </p>
            <h4>Click on the fields to edit</h4>
        </div>
      </div>

      <div className="right">
       
          <div className="myCollabsHeader">
            <h2>My Collabs</h2>
            {ctx.username === username ? (

               <Link to="/collab/newCollab" data-cy="new-collab" style={{pointerEvents: ctx.isAuthenticated ? 'auto' : 'none'}}>
              <FaPlusCircle color="#6b6cfb" fontSize="2rem"/>
              </Link>

    
            ) : (
              ""
            )}
          </div>

           <div className="mycollabs">
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
    </>
  );
}

export default Profile;
