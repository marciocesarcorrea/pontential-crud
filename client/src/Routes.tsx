import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";

import { history } from "./configs/history";

import { Home } from "./pages/Home";
import { Developer } from "./pages/Developer";

export const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/developers" component={Home} />
          <Route exact path="/developer/:id" component={Developer} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};
