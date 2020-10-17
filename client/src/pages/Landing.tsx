import React from "react";
import { Fade } from "react-reveal";
import "./PageStyles.css";

const Landing = () => {
  return (
    <>
      <Fade bottom>
        <div className="landingContainer">
          <h1 style={{ textAlign: `center`, color: `var(--blue)` }}>
            Our job? Connect the globe.{" "}
          </h1>

          <h3 style={{}}>
            Tired of waiting on large forwarding companies? So are we.{" "}
          </h3>
          <p>
            <b>ForUwU</b> allows you to connect with individual, personal
            forwarders. Browse their stores and know that your goods are handled
            by a person passionate about their storefront.
          </p>
          <br />
          <div className="scene">
            <div className="upper">
              <div className="moon">
                <div className="crater1"></div>
                <div className="crater2"></div>
              </div>
              <div className="star1"></div>
              <div className="star2"></div>
              <div className="star3"></div>
              <div className="cloud1">
                <div className="circle"></div>
                <div className="filler"></div>
              </div>
              <div className="cloud2">
                <div className="circle"></div>
                <div className="filler"></div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Landing;
