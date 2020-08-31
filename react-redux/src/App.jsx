import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainPage from './components/views/MainPage/MainPage'
import TestPage from './components/views/TestPage/Test'
// import LoginPage from './components/views/LoginPage/LoginPage'
// import RegisterPage from './components/views/RegisterPage/RegisterPage'
// import Auth from './hoc/auth'

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
        <Route exact path="/" component={MainPage} />
        <Route exact path="/test" component={TestPage} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;