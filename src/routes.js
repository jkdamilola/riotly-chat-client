import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { Layout, Home /* Settings, Contacts, Home */ } from './pages';

const Main = withRouter(props => <Layout {...props} />);

export default () => {
  /* eslint-disable */
  return (
    <Main>
      <Switch>
        <Route exact path="/(rooms)?" component={Home} />
        <Route path="/rooms/:roomId" component={Home} />
      </Switch>
    </Main>
  );
  /* eslint-enable */
};