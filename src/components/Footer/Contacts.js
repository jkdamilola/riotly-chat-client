
import React, { Component } from 'react';

import './style.scss';
import Switch from '../Switch';

export default class Filter extends Component {
    // Improve filter performance
    timer;

    doFilter(text = '') {
      text = text.trim();

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.filter(text);
      }, 300);
    }

    handleShowGroup(e) {
      this.props.toggleGroup(e.target.checked);
      this.doFilter(this.refs.filter.value);
    }

    componentWillUnmount() {
      // this.props.filter();
    }

    render() {
      return (
        <div className="contacts">
          <input
            onInput={e => this.doFilter(e.target.value)}
            placeholder="Type something to search..."
            ref="filter"
            type="text"
          />

          <div className="action_group">
            <label htmlFor="showGroup">
              <span className="options">Show Groups</span>
              <Switch
                defaultChecked={this.props.showGroup}
                id="showGroup"
                onClick={e => this.handleShowGroup(e)} 
                />
              </label>
            </div>
        </div>
      );
    }
}
