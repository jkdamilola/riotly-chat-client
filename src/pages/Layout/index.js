import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

import './style.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Login from '../Login';
import NewChat from '../NewChat';
import Members from '../Members';
import Loader from '../../components/Loader';
import Offline from '../../components/Offline';

import { socketsConnect, logout, recieveAuth, sendMessage, joinRoom } from '../../redux/actions';
import * as fromRooms from '../../redux/room/reducers';
import  * as fromStates from '../../redux/reducers';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offline: false,
    };
  }

  componentDidMount() {
    window.addEventListener('offline', () => {
      this.setState({
        offline: true,
      });
    });

    window.addEventListener('online', () => {
      // Reconnect to wechat
      this.setState({
        offline: false,
      });

      if (this.props.isAuthenticated) {
        this.props.socketsConnect();
      }
    });

    if (this.props.isAuthenticated) {
      this.props.recieveAuth();
    }
  }

  render() {
    const { isAuthenticated, loading, isRoomMember, rooms, location, logout, sendMessage, joinRoom } = this.props;

    if (!window.navigator.onLine) {
      return (
        <Offline show={true} style={{ top: 0, paddingTop: 30 }} />
      );
    }

    if (!isAuthenticated) {
      return <Login />;
    }

    return (
      <div>
        <Loader show={loading} />
        <Header location={location} />
        <div className="layout_container" ref="viewport">{this.props.children}</div>
        <Footer
          location={location}
          logout={logout}
          ref="footer"
          isRoomMember={isRoomMember}
          activeRoom={rooms.active}
          sendMessage={sendMessage}
          joinRoom={joinRoom}
        />
        <NewChat />
        <Members />
      </div>
    );
  }
}

Layout.propTypes = {
  rooms: PropTypes.shape({
    active: PropTypes.object,
    my: PropTypes.array.isRequired,
    all: PropTypes.array.isRequired,
  }).isRequired,

  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isRoomMember: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  recieveAuth: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  joinRoom: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const activeRoom = fromRooms.getRoomById(state.room, state.room.activeRoom);
  const isRoomMember = fromStates.isRoomMember(state, activeRoom);

  return {
    isRoomMember,
    rooms: {
      active: activeRoom,
      my: fromRooms.getRoomByIds(state.room, state.room.myRooms),
      all: fromRooms.getRoomByIds(state.room, state.room.allRooms),
    },
    loading: state.api.isLoading.login,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.api.errors.auth,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      socketsConnect,
      logout,
      recieveAuth,
      sendMessage,
      joinRoom,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Layout);