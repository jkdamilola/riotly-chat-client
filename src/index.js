import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import getRoutes from './routes';
import configureStore from './redux';
import history from './redux/utils/history';

// import 'sanitize.css/sanitize.css';
import './assets/fonts/icomoon/style.css';
import './index.scss';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
            { getRoutes() }
        </Router>
      </Provider>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
