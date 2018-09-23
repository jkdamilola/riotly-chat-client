
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Avatar from 'react-avatar';
import clazz from 'classname';

import './style.scss';

import * as fromRooms from '../../../redux/room/reducers';
import { redirect } from '../../../redux/actions';

class Chats extends Component {
  chatTo(room) {
    const to = `/rooms/${room._id}`;
    this.props.redirect(to);
  }

  render() {
    const { loading, rooms } = this.props;
    console.log(rooms);

    if (loading) return false;

    return (
      <div className="chats_container">
        <div
          className="chats"
          ref="container"
        >
          { 
            !this.props.searching &&
            rooms.my.map((e, index) => {
              if (!e) return null;
              
              return (
                <div
                  className={clazz('chat', {
                    'active': Boolean(rooms.active && rooms.active._id === e._id)
                  })}
                  key={index}
                  onClick={ev => this.chatTo(e)}
                >
                  <div className="inner">
                    <div className="dot">
                      <Avatar name={e.topic} size="40" round={true} />
                    </div>

                    <div className="info">
                      <p
                        className="username"
                        dangerouslySetInnerHTML={{ __html: e.topic }} />

                      <span
                        className="message"
                        dangerouslySetInnerHTML={{ __html: `${e.members.length + 1} member(s)` }} />
                    </div>
                  </div>

                  <span className="times">{moment(e.createdAt).fromNow()}</span>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Chats.propTypes = {
  rooms: PropTypes.shape({
    active: PropTypes.object,
    my: PropTypes.array.isRequired,
    all: PropTypes.array.isRequired,
  }).isRequired,
  isConnected: PropTypes.bool.isRequired,
  searching: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  redirect: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const activeRoom = fromRooms.getRoomById(state.room, state.room.activeRoom);

  return {
    isConnected: state.api.isConnected,
    searching: state.api.searching,
    loading: state.api.isLoading.myRooms,
    rooms: {
      active: activeRoom,
      my: fromRooms.getRoomByIds(state.room, state.room.myRooms),
      all: fromRooms.getRoomByIds(state.room, state.room.allRooms),
    },
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirect,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Chats);