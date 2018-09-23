import { combineReducers } from 'redux';
import * as types from '../constants';

const intialState = {
  isLoading: {
    login: false,
    logout: false,
    recieveAuth: false,
    allRooms: false,
    myRooms: false,
    room: false,
    createRoom: false,
    joinRoom: false,
    leaveRoom: false,
    deleteRoom: false,
    sockets: false,
    editUser: false,
  },
  errors: {
    auth: null,
    chat: null,
  },
  isConnected: false,
  searching: false,
};

export const isLoading = (state = intialState.isLoading, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, login: true };
    case types.LOGOUT_REQUEST:
      return { ...state, logout: true };
    case types.RECIEVE_AUTH_REQUEST:
      return { ...state, recieveAuth: true };
    case types.FETCH_ALL_ROOMS_REQUEST:
      return { ...state, allRooms: true };
    case types.FETCH_MY_ROOMS_REQUEST:
      return { ...state, myRooms: true };
    case types.FETCH_ROOM_REQUEST:
      return { ...state, room: true };
    case types.CREATE_ROOM_REQUEST:
      return { ...state, createRoom: true };
    case types.JOIN_ROOM_REQUEST:
      return { ...state, joinRoom: true };
    case types.LEAVE_ROOM_REQUEST:
      return { ...state, leaveRoom: true };
    case types.DELETE_ROOM_REQUEST:
      return { ...state, deleteRoom: true };
    case types.SOCKETS_CONNECTION_REQUEST:
      return { ...state, sockets: true };

    case types.LOGIN_SUCCESS:
    case types.LOGIN_FAILURE:
      return { ...state, login: false };
    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_FAILURE:
      return { ...state, logout: false };
    case types.RECIEVE_AUTH_SUCCESS:
    case types.RECIEVE_AUTH_FAILURE:
      return { ...state, recieveAuth: false };
    case types.FETCH_ALL_ROOMS_SUCCESS:
    case types.FETCH_ALL_ROOMS_FAILURE:
      return { ...state, allRooms: false };
    case types.FETCH_MY_ROOMS_SUCCESS:
    case types.FETCH_MY_ROOMS_FAILURE:
      return { ...state, myRooms: false };
    case types.FETCH_ROOM_SUCCESS:
    case types.FETCH_ROOM_FAILURE:
      return { ...state, room: false };
    case types.CREATE_ROOM_SUCCESS:
    case types.CREATE_ROOM_FAILURE:
      return { ...state, createRoom: false };
    case types.JOIN_ROOM_SUCCESS:
    case types.JOIN_ROOM_FAILURE:
      return { ...state, joinRoom: false };
    case types.LEAVE_ROOM_SUCCESS:
    case types.LEAVE_ROOM_FAILURE:
      return { ...state, leaveRoom: false };
    case types.DELETE_ROOM_SUCCESS:
    case types.DELETE_ROOM_FAILURE:
      return { ...state, deleteRoom: false };
    case types.SOCKETS_CONNECTION_SUCCESS:
    case types.SOCKETS_CONNECTION_FAILURE:
      return { ...state, sockets: false };
    default:
      return state;
  }
};

export const errors = (state = intialState.errors, action) => {
  switch (action.type) {
    case types.LOGIN_FAILURE:
    case types.LOGOUT_FAILURE:
      // Used for internal needs
      // case types.RECIEVE_AUTH_FAILURE:
      return { ...state, auth: action.payload };

    case types.LOGIN_SUCCESS:
    case types.LOGOUT_SUCCESS:
      // Used for internal needs
      // case types.RECIEVE_AUTH_SUCCESS:
      return { ...state, auth: null };

    case types.FETCH_ALL_ROOMS_FAILURE:
    case types.FETCH_MY_ROOMS_FAILURE:
    case types.FETCH_ROOM_FAILURE:
    case types.CREATE_ROOM_FAILURE:
    case types.JOIN_ROOM_FAILURE:
    case types.LEAVE_ROOM_FAILURE:
    case types.DELETE_ROOM_FAILURE:
    case types.SOCKETS_CONNECTION_FAILURE:
      return { ...state, room: action.payload };
    case types.FETCH_ALL_ROOMS_SUCCESS:
    case types.FETCH_MY_ROOMS_SUCCESS:
    case types.FETCH_ROOM_SUCCESS:
    case types.CREATE_ROOM_SUCCESS:
    case types.JOIN_ROOM_SUCCESS:
    case types.LEAVE_ROOM_SUCCESS:
    case types.DELETE_ROOM_SUCCESS:
    case types.SOCKETS_CONNECTION_SUCCESS:
      return { ...state, room: null };
    default:
      return state;
  }
};

export const isConnected = (state = intialState.isConnected, action) => {
  switch (action.type) {
    case types.SOCKETS_CONNECTION_MISSING:
    case types.SOCKETS_CONNECTION_FAILURE:
      return false;
    case types.SOCKETS_CONNECTION_SUCCESS:
      return true;
    default:
      return state;
  }
};

export const searching = (state = intialState.searching, action) => {
  switch (action.type) {
    case types.TOGGLE_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  isLoading,
  errors,
  isConnected,
  searching,
});