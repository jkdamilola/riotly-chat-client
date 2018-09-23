import * as types from './constants';
import request from '../utils/request';
import { redirect } from '../api/actions';

export function createModal(toggle) {
  return (dispatch) => {
    dispatch({
      type: types.TOGGLE_CREATE_MODAL,
      payload: toggle,
    });
  };
}

export function toggleMembers(toggle) {
  return (dispatch) => {
    dispatch({
      type: types.TOGGLE_MEMBERS,
      payload: toggle,
    });
  };
}

export function search(toggle) {
  return (dispatch) => {
    dispatch({
      type: types.TOGGLE_SEARCH,
      payload: toggle,
    });
  };
}

export function createRoom(topic) {
  return (dispatch, getState) => {
    const state = getState();
    const { isLoading } = state.api;
    const { token } = state.auth;

    if (isLoading.createRoom) {
      return Promise.resolve();
    }

    dispatch({
      type: types.CREATE_ROOM_REQUEST,
      payload: { topic },
    });

    const params = {
      data: { topic },
    }

    return request('chatrooms', token, { method: 'POST' }, params).then(({ chatroom }) => {
      dispatch({
        type: types.CREATE_ROOM_SUCCESS,
        payload: { chatroom },
      });
      dispatch(createModal(false));

      dispatch(redirect(`/rooms/${chatroom._id}`));

      return chatroom;
    }).catch(reason =>
      dispatch({
        type: types.CREATE_ROOM_FAILURE,
        payload: reason,
      }));
  }
}

export function fetchAllRooms() {
  return (dispatch, getState) => {
    const state = getState();
    const { isLoading } = state.api;
    const { token } = state.auth;

    if (isLoading.allRooms) {
      return Promise.resolve();
    }

    dispatch({
      type: types.FETCH_ALL_ROOMS_REQUEST,
    });

    return request('chatrooms', token, { method: 'GET' })
      .then(data =>
        dispatch({
          type: types.FETCH_ALL_ROOMS_SUCCESS,
          payload: data,
        }))
      .catch(reason =>
        dispatch({
          type: types.FETCH_ALL_ROOMS_FAILURE,
          payload: reason,
        }));
  };
}

export function fetchMyRooms() {
  return (dispatch, getState) => {
    const state = getState();
    const { isLoading } = state.api;
    const { token } = state.auth;

    if (isLoading.myRooms) {
      return Promise.resolve();
    }

    dispatch({
      type: types.FETCH_MY_ROOMS_REQUEST,
    });

    return request('chatrooms/my', token, { method: 'GET' })
      .then(data =>
        dispatch({
          type: types.FETCH_MY_ROOMS_SUCCESS,
          payload: data,
        }))
      .catch(reason =>
        dispatch({
          type: types.FETCH_MY_ROOMS_FAILURE,
          payload: reason,
        }));
  };
}

export function fetchRoom(roomId) {
  return (dispatch, getState) => {
    const state = getState();
    const { isLoading } = state.api;
    const { token } = state.auth;

    if (isLoading.room) {
      return Promise.resolve();
    }

    dispatch({
      type: types.FETCH_ROOM_REQUEST,
    });

    return request(`chatrooms/${roomId}`, token, { method: 'GET' })
      .then((data) => {
        dispatch({
          type: types.FETCH_ROOM_SUCCESS,
          payload: data,
        });

        return data;
      })
      .catch((reason) => {
        dispatch({
          type: types.FETCH_ROOM_FAILURE,
          payload: reason,
        });

        dispatch(redirect('/rooms'));
      });
  };
}

export function setActiveRoom(roomId) {
  return dispatch =>
    dispatch(fetchRoom(roomId)).then((data) => {
      if (!data) {
        dispatch(redirect('/rooms'));

        return dispatch({
          type: types.UNSET_ACTIVE_ROOM,
        });
      }

      dispatch({
        type: types.SET_ACTIVE_ROOM,
        payload: data,
      });

      return dispatch(redirect(`/rooms/${data.chatroom._id}`));
    });
}

export function joinRoom(roomId) {
  return (dispatch, getState) => {
    const state = getState();
    const { isLoading } = state.api;
    const { token } = state.auth;

    if (isLoading.joinRoom) {
      return Promise.resolve();
    }

    dispatch({
      type: types.JOIN_ROOM_REQUEST,
      payload: { roomId },
    });

    return request(`chatrooms/${roomId}/join`, token, { method: 'GET' })
      .then(({ chatroom }) => {
        dispatch({
          type: types.JOIN_ROOM_SUCCESS,
          payload: { chatroom },
        });

        dispatch(redirect(`/rooms/${chatroom._id}`));

        return chatroom;
      })
      .catch(reason =>
        dispatch({
          type: types.JOIN_ROOM_FAILURE,
          payload: reason,
        }));
  };
}

export function leaveRoom(roomId) {
  return (dispatch, getState) => {
    const state = getState();
    const { isLoading } = state.api;
    const { token } = state.auth;

    if (isLoading.leaveRoom) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LEAVE_ROOM_REQUEST,
      payload: { roomId },
    });

    return request(`chatrooms/${roomId}/leave`, token, { method: 'GET' })
      .then((data) => {
        dispatch({
          type: types.LEAVE_ROOM_SUCCESS,
          payload: data,
        });

        dispatch(redirect('/rooms'));

        dispatch({
          type: types.UNSET_ACTIVE_ROOM,
        });

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.LEAVE_ROOM_FAILURE,
          payload: reason,
        }));
  };
}

export function deleteRoom(roomId) {
  return (dispatch, getState) => {
    const state = getState();
    const { isLoading } = state.api;
    const { token } = state.auth;

    if (isLoading.deleteRoom) {
      return Promise.resolve();
    }

    dispatch({
      type: types.DELETE_ROOM_REQUEST,
      payload: { roomId },
    });

    return request(`chatrooms/${roomId}`, token, { method: 'DELETE' })
      .then((data) => {
        dispatch({
          type: types.DELETE_ROOM_SUCCESS,
          payload: data,
        });

        dispatch(redirect('/rooms'));

        dispatch({
          type: types.UNSET_ACTIVE_ROOM,
        });

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.DELETE_ROOM_FAILURE,
          payload: reason,
        }));
  };
}