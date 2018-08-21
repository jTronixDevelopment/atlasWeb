import { combineReducers } from 'redux';
import title from '../Components/Title/TitleReducer';
import signIn from '../Pages/SignIn/SignInReducer';
import signUp from '../Pages/SignUp/SignUpReducer';
import profile from '../Pages/Profile/ProfileReducer';
import post from '../Pages/Post/PostReducer';
import messages from '../Pages/Messages/MessagesReducer';
import people from '../Pages/People/PeopleReducer';
import places from '../Pages/Places/PlacesReducer';
import search from '../Pages/Search/SearchReducer';
import settings from '../Pages/Settings/SettingsReducer';
import viewprofile from '../Pages/ViewProfile/ViewProfileReducer';

export default combineReducers({
  title,
  signIn,
  signUp,
  profile,
  post,
  messages,
  people,
  places,
  search,
  settings,
  viewprofile,
});
