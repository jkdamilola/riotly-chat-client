import * as types from '../constants';

const initialState = {
  show: false,
  text: '',
};

export default function alert(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MESSAGE:
      return {
        ...state,
        show: true,
        text: action.payload.message,
      };
    case types.HIDE_MESSAGE:
      return {
        ...state,
        show: false,
        text: '',
      };
    default:
      return state;
  }
}