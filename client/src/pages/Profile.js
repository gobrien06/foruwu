import { stat } from "fs";
import React from "react";
import { Fade } from "react-reveal";
import { useUserStore } from "../store";

const DisplayItems = () => {};

const Profile = () => {
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state);
  const addItem = useUserStore((state) => state.addItem);
  
  return (
    <Fade top>
      <h1>Your Account</h1>
      <hr className="portalDivide"/>
      <h2> Account Details </h2>
      <h3>Name: ${user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Location: {user.location}</h3>
      <button type="button" className="submitButton" onClick={logout}>
        Logout
      </button>
      <br/>
      <br/>
      <br/>
      <h2> Your Store </h2>
      <hr className="portalDivide" />
      {user.store ? (
        { DisplayItems }
      ) : (
        <h3>
          You don't seem to be offering any items to forward. Try adding some!
        </h3>
      )}
      <br />
      <button type="button" className="addButton" onClick={addItem}>
        +
      </button>
    </Fade>
  );
};

export default Profile;
