import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store";
import { useHistory } from "react-router-dom";
import { Fade } from "react-reveal";

const Signup = () => {
  const [state, setState] = useState({ email: "", password: "", location: "United States of America" });
  const history = useHistory();
  const isAuth = useUserStore((state) => state.isAuthenticated);
  const errors = useUserStore((state) => state.errors);
  const register = useUserStore((state) => state.register);
  const setLoading = useUserStore((state) => state.setLoading);
  const setForm = useUserStore((state) => state.setForm);
  const token = useUserStore((state) => state.token);

  const checkAuth = () => {
    console.log("MY TOKEN IS " + token);
    if (isAuth) {
      setLoading(false);
      history.push("/bazaar");
    }
  };

  /*
  const getLocation = () => {
    let nav = navigator.geolocation;
    let latlng;
      nav.getCurrentPosition((pos) => {
        console.log("pos" + [pos.coords.latitude, pos.coords.longitude]);
        latlng =  [pos.coords.latitude, pos.coords.longitude];
      });
    return latlng;
  };
*/
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectorChange = (event) =>{
    setState({location: event.target.value});
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const user = {
      name: state.first + " " + state.last,
      location: state.location,
      email: state.email,
      password: state.password,
    };
    await setForm(user);
    console.log("user in component" + user);
    await register(user);
    setState({
      first: '',
      last: '',
      location: '',
      email:'',
      password:'',
    })
    setLoading(false);
  };

  useEffect(checkAuth, [isAuth]);

  //add <h3>Let's get started.</h3> later
  return (
    <>
      <Fade top>
      <h1>Sign Up</h1>
      <div className="inputContain">
        <form onSubmit={handleSubmit}>
          <input
            name="first"
            placeholder="First Name"
            onChange={handleInputChange}
            value={state.name}
            required
          />
          <br />
          <input
            name="last"
            placeholder="Last Name"
            value={state.name}
            onChange={handleInputChange}
            required
          />
          <br />
          <input 
          type="location"
          name="location"
          onChange={handleInputChange}
          value={state.location}
          required/>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={state.email}
            required
          />
          <br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />

          <center>
            <button className="submitButton" type="submit">
              Sign Up
            </button>
          </center>
        </form>

        <p>{errors}</p>
        <p>{token}</p>
        <center>
          <br />
          <p>
            Already have an account?{" "}
            <Link
              to={"/signin"}
              style={{ color: `var(--blue)`, textDecoration: `underline` }}
            >
              Login
            </Link>
          </p>
        </center>
      </div>
      </Fade>

      <Fade bottom>
        <img src="/creditcard.svg" className="botLeft" alt="creditcard" />
      </Fade>
    </>
  );
};

export default Signup;
