import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import Login from "./components/Login/Login";

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} exact={true} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
