import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store";
import "./Navigation.css";

const Navigation = () => {
  const loggedIn = useUserStore((state) => state.isAuthenticated);

  return (
    <div className="bar">
      {loggedIn ? (
        <Link to="/bazaar">
          <img src="./truck.svg" className="headerIcon" alt="headerIcon" />
        </Link>
      ) : (
        <Link to="/">
          <img src="./truck.svg" className="headerIcon" alt="headerIcon" />
        </Link>
      )}
      <h1 className="headerText">ForUwU</h1>
      <div className="holdRight">
        {loggedIn ? (
          <Link to="/profile">
            <img
              src="./profile.svg"
              className="profileIcon"
              alt="profileIcon"
            />
          </Link>
        ) : (
          <div>
            <Link to="/signup">
              <h3>Sign Up</h3>{" "}
            </Link>
            <h3>|</h3>{" "}
            <Link to="/signin">
              <h3>Log In</h3>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
