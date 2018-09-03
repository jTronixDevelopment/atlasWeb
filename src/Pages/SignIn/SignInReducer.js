const initialState = {
  loggedIn: false,
  emailError: false,
  passwordError: false,
};

const SignIn = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case 'CHANGE_AUTH_STATUS':
      return { ...state, loggedIn: action.payload };
    case 'SHOW_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SHOW_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    default:
      return state;
  }
};

export default SignIn;
