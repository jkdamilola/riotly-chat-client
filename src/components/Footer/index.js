
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clazz from 'classname';

import './style.scss';
import Home from './Home';

export default class Footer extends Component {
  render() {
    const pathname = this.props.location.pathname;
    if (pathname === '/logout') {
      this.props.logout();
    }

    let component = Home;

    return (
      <footer className="footer">
        <nav>
          <Link
            className="link"
            tabIndex="-1"
            title="My Rooms"
            to="/">
            <span className={clazz({
              'active': true
            })}>
              <i className="icon-ion-android-chat" />
            </span>
          </Link>
          <Link
            className="link"
            tabIndex="-1"
            to="/logout"
            title="Logout"
          >
            <span className={clazz({
              'active': pathname === '/logout'
            })}>
              <i className="icon-ion-log-out" />
            </span>
          </Link>
        </nav>

        <div className="footer-right">{React.createElement(component, this.props)}</div>
      </footer>
    );
  }
}
