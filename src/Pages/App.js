import React from 'react';

// === Routing ==================================================================
import { Route, Switch } from 'react-router-dom';

// === Pages ====================================================================
import SignInWidget from './SignIn/SignInContainer';
import SignUpWidget from './SignUp/SignUpContainer';
import Profile from './Profile/ProfileContainer';
import Places from './Places/PlacesContainer';
import Messages from './Messages/MessagesContainer';
import People from './People/PeopleContainer';
import Post from './Post/PostContainer';
import Settings from './Settings/SettingsContainer';
import ViewProfile from './ViewProfile/ViewProfileContainer';

import Testing from './Testing/Testing';

// === Components ===============================================================
import Header from '../Components/Header/Header';
import Navigation from '../Components/Navigation/Navigation';

// === Database =================================================================

// === Styles ===================================================================
import './App.css';

export default () => (
  <div>
    <Switch>
      <Route path="*" component={Header} />
    </Switch>
    <Switch>
      <Route exact path="/" component={SignInWidget} />
      <Route path="/signup" component={SignUpWidget} />
      <Route path="/signin" component={SignInWidget} />
      <Route path="/profile" component={Profile} />
      <Route path="/testing" component={Testing} />
      <Route path="/places" component={Places} />
      <Route path="/messages" component={Messages} />
      <Route path="/people" component={People} />
      <Route path="/post" component={Post} />
      <Route path="/setting" component={Settings} />
      <Route path="/viewprofile" component={ViewProfile} />
    </Switch>
    <Switch>
      <Route path="/signin" />
      <Route path="/signup" />
      <Route path="/" />
      <Route path="*" component={Navigation} />
    </Switch>
  </div>
);
