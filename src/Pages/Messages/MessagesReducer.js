
const initialState = {
  tag: 'Post',
  firebase: '',
};

const Messages = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_AUTH_STATUS':
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};

export default Messages;
