import React from "react";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import { useUserStore } from "../store";


const Profile = () => {
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state);
  const addItem = useUserStore((state) => state.addItem);
  
  return (
    <Fade top>
      <h1>Your Account</h1>
      <hr className="portalDivide" />
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Location: {user.location}</h3>
      <br/>
      <br/>
      <Link to={`/user/${user.id}`}>
      <button type="button" className="addButton" onClick={() => addItem}>
        Your Store
      </button>
      </Link>
      <br /> 
      <br />
      <button type="button" className="submitButton" onClick={() => logout}>
        Logout
      </button>
    </Fade>
  );
};

export default Profile;
