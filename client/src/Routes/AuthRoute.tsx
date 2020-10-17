import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthState } from "../store";

const AuthRoute = ({ component: Component, ...rest }: RouteProps) => {
  const isAuth = useAuthState((state) => state.isAuthenticated);
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AuthRoute;
