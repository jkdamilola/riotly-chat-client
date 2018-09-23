
import React, { Component } from 'react';

import './style.scss';

export default class Settings extends Component {
  render() {
    return (
      <div className="settings">
        <a
          className="button"
          href="mailto:var.darling@gmail.com?Subject=WeWeChat%20Feedback"
          target="_blank"
          rel="noopener noreferrer"
        >
          Send feedback
          <i className="icon-ion-ios-email-outline" />
        </a>

        <a
          className="button"
          href="https://github.com/trazyn/weweChat"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fork on Github
          <i className="icon-ion-social-github" />
        </a>
      </div>
    );
  }
}
