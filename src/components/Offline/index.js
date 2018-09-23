
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import offlineImg from '../../assets/images/offline.png';
import './style.scss';

export default class Offline extends Component {
  render() {
    if (!this.props.show) return false;

    return (
      <div className="offline_container">
        <div>
          <img
            className="disabledDrag"
            src={offlineImg}
            alt="disabled"
          />

          <h1>Oops, seems like you are offline!</h1>

          <button onClick={e => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }
}

Offline.propTypes = {
  show: PropTypes.bool.isRequired,
}

Offline.defaultProps = {
  show: false,
};