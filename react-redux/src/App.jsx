import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainPage from './components/views/MainPage/MainPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
    <div>
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        <Route exact path="/" component={Auth(MainPage, false, false, 'Main')} />
        <Route exact path="/login" component={Auth(LoginPage, true)} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;