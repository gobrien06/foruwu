import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Fade } from "react-reveal";
import { useUserStore } from "../store";

const Signin = () => {
  const history = useHistory();
  const isAuth = useUserStore((state) => state.isAuthenticated);
  const errors = useUserStore((state) => state.errors);
  const login = useUserStore((state) => state.login);
  const setLoading = useUserStore((state) => state.setLoading);

  const [state, setState] = useState({
    email: "",
    pass: "",
  });

  const checkAuth = () => {
    if (isAuth) {
      setLoading(false);
      history.push("/bazaar");
    }
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: state.email,
      password: state.password,
    };
    await login(user);
    setState({
      email: "",
      password: "",
    });
  };

  useEffect(()=>{
    let isCancelled = false;
    const getData =  () => {
      try {
        setLoading(true);
        if (!isCancelled) checkAuth();
      } catch (error) {
        if (!isCancelled) console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    return () => {
      isCancelled = true;
    };
  }, [isAuth]);

  return (
    <>
      <Fade top>
        <h1>Sign In</h1>
        <div className="inputContain">
          <br />
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
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
            <br />

            <center>
              <button className="submitButton" type="submit">
                Sign In
              </button>
            </center>
          </form>
          <p>
            Need an account?{" "}
            <Link
              to={"/signup"}
              style={{ color: `var(--blue)`, textDecoration: `underline` }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </Fade>
      {errors}
      <Fade bottom>
        <img src="/shopart.svg" className="botRight" alt="creditcard" />
      </Fade>
    </>
  );
};

export default Signin;
