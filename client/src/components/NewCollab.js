import React, { useState } from "react";
import apiService from "./../utilities/ApiService";
import { GlobalContext } from "../App";

function NewCollab(props) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cb = {
      name: state.name,
      tracks: [state.URL]
    }
    console.log("cb:", cb)
    const res = await apiService.newCollab(cb);
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      console.log("collab created successfully: ", cb);
    }
  };

  const validateForm = () => {
    return !state.name || !state.URL;
  };

  return (
    <div className="newCollab">
        <h3>Create your New Collab</h3>
        <form className="newCollabForm" onSubmit={handleSubmit}>
          <h5>Pick a cool Collab name. Other users will see it!</h5>
          <input
            className="default-input"
            type="text"
            placeholder="Cool Collab Name"
            name="name"
            value={state.username}
            onChange={handleChange}
          />
          <h5>
            Paste the code you find in a Youtube's video URL that will serve as a base track for your
            Collab.
            Example: <p>https://www.youtube.com/watch?v=<span className='highlighted'>OS8taasZl8k</span></p>
          </h5>
          <input
            className="default-input"
            type="text"
            placeholder="Youtube Video CODE"
            name="URL"
            value={state.URL}
            onChange={handleChange}
          />
          <button
            className="default-btn"
            type="submit"
            disabled={validateForm()}
          >
            &nbsp;Create&nbsp;
          </button>
        <h5>
            Once you see your Youtube Video embeded on the player, you're ready to create it!
          </h5>
        </form>
      <iframe 
        title="test"
        width="420"
        height="315"
        src={"https://www.youtube-nocookie.com/embed/"+state.URL}
      ></iframe>
    </div>
  );
}

export default NewCollab;
