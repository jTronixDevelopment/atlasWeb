import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInWidget from './components/signInWidget/signInWidget';
import SignUpWidget from './components/signUpWidget/signUpWidget';

import Profile from './components/profile/profile';
import Places from './components/places/places';
import Search from './components/search/search';

import Header from './components/header/header';
import Navigation from './components/navigation/navigation';

import FeedItem from './components/places/places'

import { DB , Auth, Firebase } from './firebase/setup';

class App extends Component {
  constructor(){
    super();
    this.db = new DB(Firebase);
    this.auth = new Auth(Firebase);
    this.test;
  }
  getSignUpPage(){
  }

  componentWillMount(){
  }

  render() {
    return (
      <div>
        <Switch>
            <Route path='*' component={ Header }/>
        </Switch>
        <Switch>
            <Route exact path='/' component={ SignInWidget }/>
            <Route path='/signup' render={ props => ( <SignUpWidget auth={this.auth} /> )} />
            <Route path='/signin' component={ SignInWidget }/>
            <Route path='/places' component={ Places }/>
            <Route path='/search' component={ Search }/>
            <Route path='/profile' component={ Profile }/>
        </Switch>
        <Switch>
          <Route exact path='/places' component={ FeedItem }/>
        </Switch>
        <Switch>
          <Route path='/places' component={ Navigation }/>
          <Route path='/search' component={ Navigation }/>
          <Route path='/profile' component={ Navigation }/>
        </Switch>
      </div>
    );
  }
}

export default App;
