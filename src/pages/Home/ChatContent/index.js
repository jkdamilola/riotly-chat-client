
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Avatar from 'react-avatar';
import clazz from 'classname';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import 'react-mfb/mfb.css';

import UserAvatar from '../../../components/Avatar';

import './style.scss';
import noselected from '../../../assets/images/noselected.png';

import * as fromRooms from '../../../redux/room/reducers';
import * as fromState from '../../../redux/reducers';
import { leaveRoom, deleteRoom, toggleMembers } from '../../../redux/actions';

class ChatContent extends Component {
  handleLeaveRoom() {
    const { activeRoom, leaveRoom } = this.props;

    leaveRoom(activeRoom._id);
  }

  handleDeleteRoom() {
    const { activeRoom, deleteRoom } = this.props;

    deleteRoom(activeRoom._id);
  }

  handleShowMembers() {
    const { toggleMembers } = this.props;

    toggleMembers(true);
  }

  renderMessages(list, activeUser) {
    return list.map((e, index) => {
      const status = e.status;

      if (status) {
        return (
          <div
            key={index}
            className={clazz('unread', 'msg', 'system', 'appMessage')}
          >
            <span dangerouslySetInnerHTML={{ __html: `${e.sender.name} ${e.message}` }} /><br />
            <span className="times">{moment(e.createdAt).fromNow()}</span>
          </div>
        );
      }

      return (
        <div className={clazz('unread', 'msg', {
          'isme': e.sender._id === activeUser._id,
          'isText': true,
        })} key={index}>
          <div>
            <UserAvatar
              src={e.sender.picture}
              className="avatar"
            />

            <p
              className="username"
              dangerouslySetInnerHTML={{ __html: e.sender.name }}
            />

            <div className="content">
              <p dangerouslySetInnerHTML={{ __html: e.message }} />

              <span className="times">{moment(e.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { activeRoom, messages, activeUser } = this.props;
    return (
      <div className="chat_content_container">
        {
          activeRoom ? (
            <div>
              <header>
                <Avatar name={activeRoom.topic} size="40" round={true} />
                <div className="info">
                  <p
                    dangerouslySetInnerHTML={{ __html: activeRoom.topic }}
                    title={activeRoom.topic} />

                  <span
                    className="signature"
                    dangerouslySetInnerHTML={{ __html: `${activeRoom.members.length + 1} member(s)` }}
                  />
                </div>

                <Menu effect="slidein" method='click' position="tr">
                  <MainButton iconResting="icon-ion-more" iconActive="icon-ion-close-round" />
                  <ChildButton
                    onClick={() => this.handleShowMembers()}
                    icon="icon-ion-ios-people"
                    label="View Members"  
                  />
                  {
                    activeUser.isCreator ? (
                      <ChildButton
                        onClick={() => this.handleDeleteRoom()}
                        icon="icon-ion-android-delete"
                        label="Delete Chat Room" />
                    ) : !activeUser.isCreator && activeUser.isMember ? (
                      <ChildButton
                        onClick={() => this.handleLeaveRoom()}
                        icon="icon-ion-android-exit"
                        label="Leave Chat Room"
                      />
                    ) : <span />
                  }
                </Menu>

              </header>

              <div
                className="messages"
                onScroll={e => Function/* this.handleScroll(e) */}
                ref="viewport"
              >
                {this.renderMessages(messages, activeUser)}
              </div>
            </div>
          ) : (
              <div className={clazz({
                'noselected': !Boolean(activeRoom),
              })}>
                <img
                  className="disabledDrag"
                  src={noselected} />
                <h1>No Room selected :(</h1>
              </div>
            )
        }
      </div>
    );
  }
}

ChatContent.propTypes = {
  activeRoom: PropTypes.object,
  activeUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isRoomMember: PropTypes.bool.isRequired,
  }).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    chatroomId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    sender: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  toggleMembers: PropTypes.func.isRequired, 
};

ChatContent.propTypes = {
  activeRoom: null,
}

const mapStateToProps = state => {
  const activeRoom = fromRooms.getRoomById(state.room, state.room.activeRoom);

  return {
    loading: state.api.isLoading.myRooms,
    activeRoom,
    activeUser: {
      ...state.auth.user,
      isMember: fromState.isMember(state, activeRoom),
      isCreator: fromState.isOwner(state, activeRoom),
      isRoomMember: fromState.isRoomMember(state, activeRoom),
    },
    messages: state.room.messages
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      leaveRoom,
      deleteRoom,
      toggleMembers,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);