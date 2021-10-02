import React from "react";
import { Route, Switch } from 'react-router-dom';
import Login from "./components/Login/Login";
import DisplayFiles from "./components/displayFiles";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/" component={DisplayFiles} exact={true} />
      </Switch>
    </>
  );
}

export default App;
