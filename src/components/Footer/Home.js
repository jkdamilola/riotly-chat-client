
import React, { Component } from 'react';

import MessageInput from '../MessageInput';

export default class Home extends Component {
  render() {
    const { isRoomMember, sendMessage, activeRoom, joinRoom } = this.props;

    return (
      <MessageInput {...{
        isRoomMember,
        sendMessage,
        activeRoom,
        joinRoom,
      }} />
    );
  }
}
