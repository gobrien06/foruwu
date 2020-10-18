import React from "react";
import Spinner from "react-spinkit";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "./Routes/AuthRoute";
import Navigation from "./components/Navigation/Navigation";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Bazaar from "./pages/Bazaar";
import StorePage from './pages/StorePage';
import { useUserStore } from "./store";
import "./pages/PageStyles.css";
import "./App.css";

function App() {
  const loading = useUserStore((state) => state.loadingProfile);
  return (
    <div className="App">
      <Navigation />
      {loading && <Spinner name="cube-grid" className="loader" />}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <AuthRoute exact path="/bazaar" component={Bazaar} />
        <AuthRoute exact path="/products" component={Products} />
        <AuthRoute exact path="/profile" component={Profile} />
        <AuthRoute path="/user/:id" component={StorePage}/>
      </Switch>
    </div>
  );
}

export default App;
