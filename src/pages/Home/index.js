
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './style.scss';
import Loader from '../../components/Loader';
import SearchBar from './SearchBar';
import Chats from './Chats';
import ChatContent from './ChatContent';

import { createModal, socketsConnect, fetchAllRooms, fetchMyRooms, setActiveRoom, mountRoom, unmountRoom } from '../../redux/actions';

class Home extends Component {
  componentDidMount() {
    const {
      match,
      isAuthenticated,
      fetchAllRooms,
      fetchMyRooms,
      setActiveRoom,
      socketsConnect,
      mountRoom,
    } = this.props;

    if (!isAuthenticated) {
      return;
    }

    Promise.all([fetchAllRooms(), fetchMyRooms()])
      .then(() => socketsConnect())
      .then(() => {
        const { roomId } = match.params;
        // If we pass a rootId, then fetch messages from chat
        if (roomId) {
          setActiveRoom(roomId);
          mountRoom(roomId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params }, setActiveRoom, unmountRoom, mountRoom, isAuthenticated
    } = this.props;
    const { params: nextParams } = nextProps.match;

    // If we change route, then fetch messages from chat by chatID
    if (isAuthenticated && nextParams.roomId && params.roomId !== nextParams.roomId) {
      setActiveRoom(nextParams.roomId);
      unmountRoom(params.roomId);
      mountRoom(nextParams.roomId);
    }
  }

  render() {
    return (
      <div className="home_container">
        <Loader
          fullscreen={true}
          show={this.props.loading} />
        <div className="inner">
          <div className="left">
            <SearchBar />
            <Chats />

            <div
              className="addChat"
              alt="Add Chat"
              onClick={() => this.props.toggleCreateModal(true)}
            >
              <i className="icon-ion-android-add" />
            </div>
          </div>

          <div className="right">
            <ChatContent />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  toggleCreateModal: PropTypes.func.isRequired,
  socketsConnect: PropTypes.func.isRequired,
  fetchAllRooms: PropTypes.func.isRequired,
  fetchMyRooms: PropTypes.func.isRequired,
  setActiveRoom: PropTypes.func.isRequired,
  mountRoom: PropTypes.func.isRequired,
  unmountRoom: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    loading: state.api.isLoading.myRooms,
    isAuthenticated: state.auth.isAuthenticated
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleCreateModal: createModal,
      socketsConnect,
      fetchAllRooms,
      fetchMyRooms,
      setActiveRoom,
      mountRoom,
      unmountRoom,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);