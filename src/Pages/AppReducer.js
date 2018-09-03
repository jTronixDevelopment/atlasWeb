import Firebase from '../Classes/Firebase/setup';
const initialState = {
  firebase: Firebase,
  loggedIn: false,
};
const app = (state = { ...initialState }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default app;
