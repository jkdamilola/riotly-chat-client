export const TOGGLE_CREATE_MODAL = Symbol('room/TOGGLE_CREATE_MODAL');
export const TOGGLE_MEMBERS = Symbol('room/TOGGLE_MEMBERS');

export const CREATE_ROOM_REQUEST = Symbol('room/CREATE_ROOM_REQUEST');
export const CREATE_ROOM_SUCCESS = Symbol('room/CREATE_ROOM_SUCCESS');
export const CREATE_ROOM_FAILURE = Symbol('room/CREATE_ROOM_FAILURE');

export const SET_ACTIVE_ROOM = Symbol('room/SET_ACTIVE_ROOM');
export const UNSET_ACTIVE_ROOM = Symbol('room/UNSET_ACTIVE_ROOM');

export const JOIN_ROOM_REQUEST = Symbol('room/JOIN_ROOM_REQUEST');
export const JOIN_ROOM_SUCCESS = Symbol('room/JOIN_ROOM_SUCCESS');
export const JOIN_ROOM_FAILURE = Symbol('room/JOIN_ROOM_FAILURE');

export const LEAVE_ROOM_REQUEST = Symbol('room/LEAVE_ROOM_REQUEST');
export const LEAVE_ROOM_SUCCESS = Symbol('room/LEAVE_ROOM_SUCCESS');
export const LEAVE_ROOM_FAILURE = Symbol('room/LEAVE_ROOM_FAILURE');

export const DELETE_ROOM_REQUEST = Symbol('room/DELETE_ROOM_REQUEST');
export const DELETE_ROOM_SUCCESS = Symbol('room/DELETE_ROOM_SUCCESS');
export const DELETE_ROOM_FAILURE = Symbol('room/DELETE_ROOM_FAILURE');

export const FETCH_ALL_ROOMS_REQUEST = Symbol('room/FETCH_ALL_ROOMS_REQUEST');
export const FETCH_ALL_ROOMS_SUCCESS = Symbol('room/FETCH_ALL_ROOMS_SUCCESS');
export const FETCH_ALL_ROOMS_FAILURE = Symbol('room/FETCH_ALL_ROOMS_FAILURE');

export const FETCH_MY_ROOMS_REQUEST = Symbol('room/FETCH_MY_ROOMS_REQUEST');
export const FETCH_MY_ROOMS_SUCCESS = Symbol('room/FETCH_MY_ROOMS_SUCCESS');
export const FETCH_MY_ROOMS_FAILURE = Symbol('room/FETCH_MY_ROOMS_FAILURE');

export const FETCH_ROOM_REQUEST = Symbol('room/FETCH_ROOM_REQUEST');
export const FETCH_ROOM_SUCCESS = Symbol('room/FETCH_ROOM_SUCCESS');
export const FETCH_ROOM_FAILURE = Symbol('room/FETCH_ROOM_FAILURE');

export const TOGGLE_SEARCH = Symbol('room/TOGGLE_SEARCH');


// SOCKET CONSTANTS
export const SOCKETS_CONNECTION_REQUEST = Symbol('sockets/SOCKETS_CONNECTION_REQUEST');
export const SOCKETS_CONNECTION_SUCCESS = Symbol('sockets/SOCKETS_CONNECTION_SUCCESS');
export const SOCKETS_CONNECTION_FAILURE = Symbol('sockets/SOCKETS_CONNECTION_FAILURE');
export const SOCKETS_CONNECTION_MISSING = Symbol('sockets/SOCKETS_CONNECTION_MISSING');

export const MOUNT_ROOM = Symbol('sockets/MOUNT_ROOM');
export const UNMOUNT_ROOM = Symbol('sockets/UNMOUNT_ROOM');

export const SEND_MESSAGE = Symbol('sockets/SEND_MESSAGE');
export const RECIEVE_MESSAGE = Symbol('sockets/RECIEVE_MESSAGE');
export const RECIEVE_NEW_ROOM = Symbol('sockets/RECIEVE_NEW_ROOM');
export const RECIEVE_DELETED_ROOM = Symbol('sockets/RECIEVE_DELETED_ROOM');
