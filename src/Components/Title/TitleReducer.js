const initialState = {
  title: 'Todo List',
  names: 'Ryan Johnson',
  age: 35,
  testing: 'cool',
};

const title = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

export default title;
