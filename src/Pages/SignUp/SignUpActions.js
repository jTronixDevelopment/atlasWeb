export const test2 = title => ({
  type: 'CHANGE_TITLE',
  payload: title,
});

export const showPasswordsNotEqual = () => ({
  type: 'SHOW_PASSWORDS_NOT_EQUAL',
  payload: true,
});

export const showPasswordsEqual = () => ({
  type: 'SHOW_PASSWORDS_EQUAL',
  payload: false,
});

export const showPasswordIsStrong = () => ({
  type: 'SHOW_PASSWORDS_STRONG',
  payload: false,
});

export const showPasswordIsNotStrong = () => ({
  type: 'SHOW_PASSWORDS_NOT_STRONG',
  payload: true,
});

export const changeAuthStatus = status => ({
  type: 'CHANGE_AUTH_STATUS',
  payload: status,
});

export const showEmailError = () => ({
  type: 'SHOW_EMAIL_ERROR',
  payload: true,
});

export const showEmailSuccess = () => ({
  type: 'SHOW_EMAIL_SUCCESS',
  payload: false,
});
