import { stat } from "fs";
import React from "react";
import { Fade } from "react-reveal";
import { useUserStore } from "../store";

const Profile = () => {
  const logout = useUserStore((state) => state.logout);
  return (
    <Fade top>
      <h1>Your Account</h1>
      <button type="button" className="submitButton" onClick={logout}>
        Logout
      </button>
    </Fade>
  );
};

export default Profile;
