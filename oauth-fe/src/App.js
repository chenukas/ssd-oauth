import React from "react";
import { Route, Switch } from 'react-router-dom';
import DisplayFiles from "./components/displayFiles";
import Signin from "./components/signin";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Signin} exact={true} />
        <Route path="/files" component={DisplayFiles} exact={true} />
      </Switch>
    </>
  );
}

export default App;
