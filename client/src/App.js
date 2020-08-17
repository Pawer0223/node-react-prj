import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import Temp1 from './components/views/Temp1/Temp1'
import Temp2 from './components/views/Temp2/Temp2'
import Modal from './components/views/Modal/Modal'
import Modal2 from './components/views/Modal/Modal2'


function Appc() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/temp1" component={Temp1} />
        <Route exact path="/temp2" component={Temp2} />
        <Route exact path="/Modal" component={Modal} />
        <Route exact path="/Modal2" component={Modal2} />
      </Switch>
    </Router>
  );
}

export default Appc;
