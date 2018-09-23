
import React, { Component } from 'react';

import './style.scss';

export default class Header extends Component {
  getTitle() {
    switch (this.props.location.pathname) {
      case '/browse-rooms':
        return 'Browse Rooms - Riotly Chat';

      default:
        return 'Riotly Chat';
    }
  }

  render() {
      return (
          <header className="header_container">
              <h1>{this.getTitle()}</h1>
          </header>
      );
  }
}
