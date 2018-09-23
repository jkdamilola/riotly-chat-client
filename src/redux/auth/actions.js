import * as types from './constants';
import request from '../utils/request';
import { redirect } from '../api/actions';

export function login(accessToken) {
  return (dispatch, getState) => {
    const { isLoading } = getState().api;

    if (isLoading.login) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGIN_REQUEST,
    });

    const params = {
      access_token: accessToken,
    };

    return request('google-login', undefined, { method: 'POST' }, params).then((json) => {
      if (!json.token) {
        throw new Error('Token has not been provided!');
      }

      // Save JWT to localStorage
      localStorage.setItem('token', json.token);

      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: json,
      });
    })
    .catch(reason =>
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: reason,
      }));
  };
}

export function logout() {
  return (dispatch, getState) => {
    const { isLoading } = getState().api;

    if (isLoading.logout) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGOUT_REQUEST,
    });

    localStorage.removeItem('token');

    dispatch({
      type: types.LOGOUT_SUCCESS,
    });

    dispatch(redirect('/'));
  };
}

export function recieveAuth() {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch({
      type: types.RECIEVE_AUTH_REQUEST,
    });

    return request('users/me', token, { method: 'GET' })
      .then(json =>
        dispatch({
          type: types.RECIEVE_AUTH_SUCCESS,
          payload: json,
        }))
      .catch(reason =>
        dispatch({
          type: types.RECIEVE_AUTH_FAILURE,
          payload: reason,
        }));
  };
}