import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useUserStore } from "../store";

const AuthRoute = ({ component: Component, ...rest }: RouteProps) => {
  const isAuth = useUserStore((state) => state.isAuthenticated);
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default AuthRoute;
