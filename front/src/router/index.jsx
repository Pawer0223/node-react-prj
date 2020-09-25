import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import * as Pages from "../pages";


const Router = () => {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Pages.Calendar} />
      </Switch>
    </div>
  </BrowserRouter>
  );
};

export default Router;