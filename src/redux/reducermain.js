import { combineReducers } from 'redux';
import { LOG_IN } from './actions/authactions.js';
 
function login(state = LOG_IN, action) {
  switch (action.type) {
    case LOG_IN:
    console.log(state)
      return action.authorized
    default:
      return state
  }
}
 
 
const RedducersMain = combineReducers({
  login
})
 
export default RedducersMain
