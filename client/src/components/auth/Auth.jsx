import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import "./Auth.css";

import AuthIllustration from "../../img1/illustration.png";

import Register from "./Register/Register";
import Login from "./Login/Login";

const Auth = () => {
  return (
    <Fragment>
      <img className="authIllustration" src={AuthIllustration} />
      <div className="authBlock">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Auth;
