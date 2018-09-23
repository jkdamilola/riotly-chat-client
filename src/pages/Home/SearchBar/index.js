
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Avatar from 'react-avatar';
import clazz from 'classname';

import './style.scss';

import { search, redirect } from '../../../redux/actions';

import * as fromChats from '../../../redux/room/reducers';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredRooms: [],
    }
  }

  chatTo(room) {
    const to = `/rooms/${room._id}`;
    this.props.redirect(to);
  }

  filterRooms = (searchValue) => {
    if (searchValue.length === 0) {
      this.props.search(false);
      return;
    }

    this.props.search(true);

    const { rooms } = this.props;
    const allRooms = rooms.all;

    const filteredRooms = allRooms.filter(room => room.topic.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((one, two) => (one.topic.toLowerCase() <= two.topic.toLowerCase() ? -1 : 1));

    this.setState({ filteredRooms });
  };

  renderRoom(room) {
    const activeRoom = this.props.rooms.active;
    return (
      <div
        className={clazz('user', {
          'active': Boolean(activeRoom && activeRoom._id === room._id)
        })}
        onClick={e => this.chatTo(room)} 
        data-userid={room._id}
      >
        <Avatar name={room.topic} size="40" round={true} />

        <div className="info">
          <p
            className="username"
            dangerouslySetInnerHTML={{__html: room.topic}} />

          <span
            className="signature"
            dangerouslySetInnerHTML={{__html: moment(room.createdAt).fromNow()}} />
        </div>
      </div>
    );
  }

  renderList() {
    const list = this.state.filteredRooms;
    if (!list.length) return false;

    return (
      <div>
        {
          list.map((e, index) => {
            return (
              <div key={index}>
                {this.renderRoom(e)}
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="search_bar_container">
        <i className="icon-ion-ios-search-strong" />
        <input
          id="search"
          onChange={e => this.filterRooms(e.target.value)}
          placeholder="Search ..."
          ref="search"
          type="text" />

          {this.props.searching && this.renderList()}
      </div>
    );
  }
}

SearchBar.propTypes = {
  rooms: PropTypes.shape({
    active: PropTypes.object,
    my: PropTypes.array.isRequired,
    all: PropTypes.array.isRequired,
  }).isRequired,
  isConnected: PropTypes.bool.isRequired,
  searching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const activeRoom = fromChats.getRoomById(state.room, state.room.activeRoom);

  return {
    isConnected: state.api.isConnected,
    searching: state.api.searching,
    rooms: {
      active: activeRoom,
      my: fromChats.getRoomByIds(state.room, state.room.myRooms),
      all: fromChats.getRoomByIds(state.room, state.room.allRooms),
    },
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      search,
      redirect,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);