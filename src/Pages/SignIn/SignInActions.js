import axios from 'axios';
import {
  dispatch,
} from 'redux';

export const test2 = title => ({
  type: 'CHANGE_TITLE',
  payload: title,
});

export const changeAuthStatus = status => ({
  type: 'CHANGE_AUTH_STATUS',
  payload: status,
});

export const showEmailError = () => ({
  type: 'SHOW_EMAIL_ERROR',
  payload: true,
});

export const showPasswordError = () => ({
  type: 'SHOW_PASSWORD_ERROR',
  payload: true,
});

export const signInUser = (data) => {
  axios.post('/someURL', data)
    .then((response) => {
      dispatch(changeAuthStatus(response.data));
    })
    .catch(() => dispatch(changeAuthStatus(false)));
};
