import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import Search from "../Search";
import "../../styles/reset.scss";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
