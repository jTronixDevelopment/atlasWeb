const initialState = {
  loggedIn: false,
  emailError: 'Check Email',
  firebase: '',
};

const SignIn = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_AUTH_STATUS':
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};

export default SignIn;
