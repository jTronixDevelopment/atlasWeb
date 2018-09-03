const initialState = {
  passwordNotEqual: false,
  emailStatus: false,
  passwordStong: false,
};

const SignUp = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_AUTH_STATUS':
      return { ...state, loggedIn: action.payload };
    case 'SHOW_PASSWORD_NOT_EQUAL':
      return { ...state, passwordNotEqual: action.payload };
    case 'SHOW_EMAIL_ERROR':
      return { ...state, emailStatus: action.payload };
    case 'SHOW_EMAIL_SUCCESS':
      return { ...state, emailStatus: action.payload };
    case 'SHOW_PASSWORDS_STRONG':
      return { ...state, passwordIsStrong: action.payload };
    case 'SHOW_PASSWORDS_NOT_STRONG':
      return { ...state, passwordIsStrong: action.payload };
    default:
      return state;
  }
};

export default SignUp;
