const initialState = {
  Tag: 'Places',
  emailError: 'Check Email',
  firebase: '',
};

const Places = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_AUTH_STATUS':
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};

export default Places;
