/* eslint no-underscore-dangle: 0 */
import SocketIOClient from 'socket.io-client';
import * as types from './constants';
import { redirect } from '../api/actions';
import config from '../../config';

let socket = null;

export function missingSocketConnection() {
  return {
    type: types.SOCKETS_CONNECTION_MISSING,
    payload: new Error('Missing connection!'),
  };
}

export function socketsConnect() {
  return (dispatch, getState) => {
    const state = getState();
    const { isLoading } = state.api;
    const { token } = state.auth;

    if (isLoading.sockets) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SOCKETS_CONNECTION_REQUEST,
    });

    socket = SocketIOClient(config.SOCKETS_URI, {
      query: { token },
    });

    socket.on('connect', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_SUCCESS,
      });
    });

    socket.on('error', (error) => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
        payload: new Error(`Connection: ${error}`),
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
        payload: new Error('We have lost a connection :('),
      });
    });

    socket.on('new-message', (message) => {
      dispatch({
        type: types.RECIEVE_MESSAGE,
        payload: message,
      });
    });

    socket.on('new-chatroom', ({ chatroom }) => {
      dispatch({
        type: types.RECIEVE_NEW_ROOM,
        payload: { chatroom },
      });
    });

    socket.on('deleted-chatroom', ({ chatroom }) => {
      const { activeRoom } = getState().room;

      dispatch({
        type: types.RECIEVE_DELETED_ROOM,
        payload: { chatroom },
      });

      if (activeRoom === chatroom._id) {
        dispatch(redirect('/rooms'));
      }
    });

    return Promise.resolve();
  };
}

export function sendMessage(content) {
  return (dispatch, getState) => {
    const { activeRoom } = getState().room;

    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit(
      'send-message',
      {
        roomId: activeRoom,
        content,
      },
      () => {
        dispatch({
          type: types.SEND_MESSAGE,
          payload: {
            roomId: activeRoom,
            content,
          },
        });
      },
    );
  };
}

export function mountRoom(roomId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('mount-chatroom', roomId);

    dispatch({
      type: types.MOUNT_ROOM,
      payload: { roomId },
    });
  };
}
export function unmountRoom(roomId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('unmount-chatroom', roomId);

    dispatch({
      type: types.UNMOUNT_ROOM,
      payload: { roomId },
    });
  };
}