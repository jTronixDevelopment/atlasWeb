const initialState = {
  loggedIn: false,
  emailError: 'Check Email',
  firebase: '',
};

const Settings = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_AUTH_STATUS':
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};

export default Settings;
