import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  NotFoundCover as NotFoundCoverView,
  HomePage as HomePage
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <HomePage />} />
      <Route
        exact
        path="/not-found-cover"
        render={() => <NotFoundCoverView />}
      />
      <Redirect to="/not-found-cover" />
    </Switch>
  );
};

export default Routes;
