import React from "react";
import { Route, Switch } from 'react-router-dom';
import Login from "./components/Login/Login";
import DisplayFiles from "./components/displayFiles";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar />
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/files" component={DisplayFiles} exact={true} />
      </Switch>
    </>
  );
}

export default App;
