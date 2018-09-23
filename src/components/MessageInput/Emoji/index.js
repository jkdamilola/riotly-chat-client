
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classname';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import './style.scss';

export default class Emoji extends Component {
  constructor(props) {
    super(props);
    this.selectEmoji = this.selectEmoji.bind(this);
    this.listener = this.listener.bind(this);
  }

  listener(event) {
    const path = event.path;
    const filteredPath = path.filter(p => {
      return p.matches && p.matches('.emoji_container');
    });
    if (filteredPath.length > 0 || event.target.matches('.icon-ion-ios-heart')) {
      return;
    }
    this.props.close();
  }

  componentDidMount() {
    window.addEventListener('click', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.listener);
  }

  componentDidUpdate() {
    if (this.props.show) {
      this.refs.container.focus();
    }
  }

  selectEmoji(emoji) {
    this.props.output(emoji.native);
  }

  render() {
      return (
        <div
          ref="container"
          tabIndex="-1"
          className={clazz('emoji_container', {
            'show': this.props.show
          })}
        >
          <Picker title='Pick your emoji…' emoji='point_up' onSelect={this.selectEmoji} />
      </div>
    );
  }
}

Emoji.propTypes = {
  output: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
