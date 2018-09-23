
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-addons-css-transition-group';
import clazz from 'classname';

import './style.scss';

export default class Loader extends Component {
  renderContent() {
    if (!this.props.show) {
      return;
    }

    return (
      <div className={clazz('Loader', this.props.className, {
        'Loader--fullscreen': this.props.fullscreen
      })}>
        <svg className="Loader-circular">
          <circle
            className="Loader-path"
            cx="50"
            cy="50"
            fill="none"
            r="20"
            strokeWidth="5"
            strokeMiterlimit="10" />
        </svg>
      </div>
    );
  }

  render() {
    return (
      <Transition
        transitionName="Loader"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {this.renderContent()}
      </Transition>
    );
  }
}

Loader.propTypes = {
  show: PropTypes.bool,
  fullscreen: PropTypes.bool,
};

Loader.defaultProps = {
  show: false,
  fullscreen: false,
};