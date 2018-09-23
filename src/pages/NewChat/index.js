
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

import { Modal, ModalBody } from '../../components/Modal';

import { createModal, createRoom } from '../../redux/actions';

import './style.scss';

class NewChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
    }
  }

  close() {
    this.props.close(false);
  }

  setTopic(topic) {
    this.setState({
      topic,
    });
  }

  create() {
    this.props.createRoom(this.state.topic);
  }

  render() {
    return (
      <Modal
        fullscreen={true}
        onCancel={e => this.props.close(false)}
        show={this.props.show}>
        <ModalBody className="container">
          New Chat Room

          <div className="input_container">
            <input
              autoFocus
              onInput={e => this.setTopic(e.target.value)}
              placeholder="Room Topic"
              ref="input"
              type="text" />
          </div>

          <div>
            <button
              disabled={this.state.topic.length <= 0}
              onClick={e => this.create()}>
              Create
            </button>

            <button onClick={e => this.close()}>Cancel</button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

NewChat.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    show: state.room.createModal,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      close: createModal,
      createRoom,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(NewChat);