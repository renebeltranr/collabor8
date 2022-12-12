import React, { useState } from "react";
import collabApiService from "../../utilities/collabApiService";
import { GlobalContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./NewCollab.css";
import { ICollab, IError } from "../../utilities/types";
import { FaGuitar } from "react-icons/fa";

function NewCollab() {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    URL: "",
  };
  const [state, setState] = useState(initialState);
  const ctx = React.useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const cb: ICollab = {
      name: state.name,
      tracks: [state.URL],
    };
    const res: any = await collabApiService.newCollab(cb) as any;
      if (res.status === 400) {
      const errorResponse = res as IError
      alert(`${errorResponse.message}`);
      setState(initialState);
    } else {
      navigate(`/profile/${ctx.username}`);
    }
  };

  const validateForm = () => {
    return !state.name || !state.URL;
  };

  return (
    <>
      <div className="newCollab">


        <form className="newCollabForm" onSubmit={handleSubmit}>

          <div className="header">
            <h3>Create your New Collab</h3>
            
          </div>

          <div>
            <div className="newCollabName">
              <h5>Pick a cool Collab name. Other users will see it!</h5>
              <input
                className="default-input"
                type="text"
                placeholder="Cool Collab Name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
            </div>

            <div className="newCollabVid">
              <h5>
                Paste the code you find in a Youtube's video URL that will serve
                as a base track for your Collab. Example:{" "}
                <p>
                  https://www.youtube.com/watch?v=
                  <span className="highlighted">OS8taasZl8k</span>
                </p>
              </h5>
              <input
                className="default-input"
                type="text"
                placeholder="Youtube Video CODE"
                name="URL"
                value={state.URL}
                onChange={handleChange}
              />
            </div>
              <h5>
                Once you see your Youtube Video embeded on the player, you're
                ready to create it!
              </h5>
           
            <button
              className="create"
              type="submit"
              disabled={validateForm()}
              data-cy="new-collab"
            >
              Create
            </button>
          </div>

          <div>
            <div className="videoDiv">
              <iframe
                title="test"
                width="190"
                height="110"
                src={"https://www.youtube-nocookie.com/embed/" + state.URL}
              ></iframe>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewCollab;
