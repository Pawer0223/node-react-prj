import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import landingPage from './components/views/LandingPage/LandingPage'
import temp1 from './components/views/temp1/temp1'
import temp2 from './components/views/temp2/temp2'

function App() {
  return (
    <Router>
    <div>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/"  component={landingPage} />
        <Route exact path="/temp1"  component={temp1} />
        <Route exact path="/temp2"  component={temp2} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
