import { combineReducers } from 'redux';
import * as types from '../constants';

const initialState = {
  createModal: false,
  showMembers: false,
  activeRoom: null,
  allRooms: [],
  myRooms: [],
  roomByIds: {},
  messages: [],
};

const createModal = (state = initialState.createModal, action) => {
  switch (action.type) {
    case types.TOGGLE_CREATE_MODAL:
      return action.payload;
    default:
      return state;
  }
}

const showMembers = (state = initialState.showMembers, action) => {
  switch (action.type) {
    case types.TOGGLE_MEMBERS:
      return action.payload;
    default:
      return state;
  }
}

const activeRoom = (state = initialState.activeRoom, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_ROOM:
      return getRoomId(action.payload.chatroom);
    case types.JOIN_ROOM_SUCCESS:
      return getRoomId(action.payload.chatroom);
    case types.UNSET_ACTIVE_ROOM:
      return null;
    case types.DELETE_ROOM_SUCCESS:
      return null;
    case types.RECIEVE_DELETED_ROOM:
      return state === getRoomId(action.payload.chatroom) ? null : state;
    default:
      return state;
  }
}

const allRooms = (state = initialState.allRooms, action) => {
  switch (action.type) {
    case types.FETCH_ALL_ROOMS_SUCCESS:
      return action.payload.chatrooms.map(getRoomId);
    case types.RECIEVE_NEW_ROOM:
      return [...state, getRoomId(action.payload.chatroom)];
    case types.RECIEVE_DELETED_ROOM:
    case types.DELETE_ROOM_SUCCESS:
      return state.filter(roomId => roomId !== getRoomId(action.payload.chatroom));
    default:
      return state;
  }
};

const myRooms = (state = initialState.myRooms, action) => {
  switch (action.type) {
    case types.FETCH_MY_ROOMS_SUCCESS:
      return action.payload.chatrooms.map(getRoomId);
    case types.CREATE_ROOM_SUCCESS:
    case types.JOIN_ROOM_SUCCESS:
      return [...state, getRoomId(action.payload.chatroom)];
    case types.LEAVE_ROOM_SUCCESS:
    case types.RECIEVE_DELETED_ROOM:
    case types.DELETE_ROOM_SUCCESS:
      return state.filter(roomId => roomId !== getRoomId(action.payload.chatroom));
    default:
      return state;
  }
};

const roomByIds = (state = initialState.roomByIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_ROOMS_SUCCESS:
    case types.FETCH_MY_ROOMS_SUCCESS:
      return {
        ...state,
        ...action.payload.chatrooms.reduce(
          (ids, chatroom) => ({
            ...ids,
            [getRoomId(chatroom)]: chatroom,
          }),
          {},
        ),
      };
    case types.JOIN_ROOM_SUCCESS:
    case types.LEAVE_ROOM_SUCCESS:
    case types.RECIEVE_NEW_ROOM:
      return {
        ...state,
        [getRoomId(action.payload.chatroom)]: action.payload.chatroom,
      };
    case types.DELETE_ROOM_SUCCESS:
    case types.RECIEVE_DELETED_ROOM: {
      const newState = { ...state };
      delete newState[getRoomId(action.payload.chatroom)];
      return newState;
    }
    default:
      return state;
  }
};

const messages = (state = initialState.messages, action) => {
  switch (action.type) {
    case types.RECIEVE_MESSAGE:
      return [...state, action.payload.message];
    case types.FETCH_ROOM_SUCCESS:
      return action.payload.messages;
    default:
      return state;
  }
};

export default combineReducers({
  createModal,
  showMembers,
  activeRoom,
  allRooms,
  myRooms,
  roomByIds,
  messages,
});

// eslint-disable-next-line
export const getRoomId = room => room._id;
export const getRoomById = (state, id) => state.roomByIds[id];
export const getRoomByIds = (state, ids) => ids.map(id => getRoomById(state, id));