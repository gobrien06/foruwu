import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";

const Signin = () => {
  return (
    <>
      <Fade top>
        <h1>Sign In</h1>
        <br />
        <p>
          Need an account?{" "}
          <Link
            to={"/signup"}
            style={{ color: `var(--blue)`, textDecoration: `underline` }}
          >
            Sign up
          </Link>
        </p>
      </Fade>
      <Fade bottom>
        <img src="/shopart.svg" className="botRight" alt="creditcard" />
      </Fade>
    </>
  );
};

export default Signin;
