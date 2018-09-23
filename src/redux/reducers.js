import { combineReducers } from 'redux';

import api from './api/reducers';
import auth from './auth/reducers';
import room from './room/reducers';

export default combineReducers({
  api,
  auth,
  room,
});

// eslint-disable-next-line
export const getUserId = user => user._id;
export const getActiveUser = state => state.auth.user;

export const isOwner = (state, room) => {
  try {
    return getUserId(room.owner) === getUserId(getActiveUser(state));
  } catch (e) {
    return false;
  }
};

export const isMember = (state, room) => {
  try {
    return room.members.some(member => getUserId(member) === getUserId(getActiveUser(state)));
  } catch (e) {
    return false;
  }
};

export const isRoomMember = (state, room) => isOwner(state, room) || isMember(state, room);