import React, { useState } from "react";
import auth from "../utilities/Auth";
import apiService from "./../utilities/ApiService";
import { useNavigate } from "react-router-dom";

function NewCollab(props) {
  const initialState = {
    name: "",
  };
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = state;
    const cb = name ;
    const res = await apiService.newCollab(cb);
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      console.log("collab created successfully: ", cb)
    }
  };

  const validateForm = () => {
    return !state.name;
  };

  return (
    <div className='newCollab'>
    <section>
      <h2>Create</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cool Collab Name"
          name="name"
          value={state.username}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </section>
    </div>
  );
}

export default NewCollab;