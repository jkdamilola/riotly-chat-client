
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classname';

import './style.scss';
import Emoji from './Emoji';

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEmoji: false
    };
  }

  handleEnter(e) {
    const message = this.refs.input.value.trim();

    if (
      false
      || !message
      || e.charCode !== 13
    ) return;

    this.props.sendMessage(message);


    this.refs.input.value = '';
  }

  handleJoin() {
    const { joinRoom, activeRoom } = this.props;
    joinRoom(activeRoom._id);
  }

  toggleEmoji(show) {
    this.setState({ showEmoji: show });
  }

  writeEmoji(emoji) {
    const input = this.refs.input;

    input.value += emoji;
    input.focus();
  }

  render() {
    if (!Boolean(this.props.activeRoom)) {
      return null;
    }

    if (!this.props.isRoomMember) {
      return (
        <div className="message_input_container" style={{justifyContent: 'center'}}>
          <button 
            className="join"
            onClick={() => this.handleJoin()}>Join</button>
        </div>
      )
    }

    return (
      <div
        className={
          clazz(
            'message_input_container',
            this.props.className,
          )
        }
      >
        <input
          id="messageInput"
          ref="input"
          type="text"
          placeholder="Type something to send..."
          onKeyPress={e => this.handleEnter(e)}
        />

        <div className="action">
          <i
            className="icon-ion-ios-heart"
            id="showEmoji"
            onClick={e => this.toggleEmoji(!this.state.showEmoji)}
            style={{
              color: 'red',
            }}
          />
          <Emoji
            close={e => setTimeout(() => this.toggleEmoji(false), 100)}
            output={emoji => this.writeEmoji(emoji)}
            show={this.state.showEmoji}
          />
        </div>
      </div>
    );
  }
}

MessageInput.propTypes = {
  isRoomMember: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  activeRoom: PropTypes.object,
  joinRoom: PropTypes.func.isRequired,
};

MessageInput.propTypes = {
  activeRoom: {},
};

export default MessageInput;