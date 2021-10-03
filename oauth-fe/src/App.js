import React from "react";
import { Route, Switch } from 'react-router-dom';
import Login from "./components/Login/Login";
import DisplayFiles from "./components/displayFiles";
import Signin from "./components/signin";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/files" component={DisplayFiles} exact={true} />
        <Route path="/signin" component={Signin} exact={true} />
      </Switch>
    </>
  );
}

export default App;
