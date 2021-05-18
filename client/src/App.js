import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import SignOut from "./components/SignOut";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/log-out" component={SignOut} />
      </Switch>
    </Router>
  );
}

export default App;
