import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInWidget from './components/signInWidget/signInWidget';
import SignUpWidget from './components/signUpWidget/signUpWidget';

import Profile from './components/profile/profile';
import Places from './components/places/places';

import Header from './components/header/header';
import Header0 from './components/header0/header';
import Footer from './components/footer/footer';

import FeedItem from './components/places/places'

import { DB , Auth, Firebase } from './firebase/setup';

class App extends Component {
  constructor(){
    super();
    this.db = new DB(Firebase);
    this.auth = new Auth(Firebase)
  }

  render() {
    return (
      <div>
        <Switch>
            <Route exact path='/profile' component={ Header }/>
            <Route exact path='/' component={ Header0 }/>
            <Route path='/signup' component={ Header }/>
            <Route path='/signin' component={ Header }/>
            <Route path='/places' component={ Header }/>
        </Switch>
        <Switch>
            <Route exact path='/' component={ SignInWidget }/>
            <Route path='/signup' component={ SignUpWidget }/>
            <Route path='/signin' component={ SignInWidget }/>
            <Route path='/home' component={ SignInWidget }/>
            <Route path='/places' component={ Places }/>
            <Route path='/people' component={ SignInWidget }/>
            <Route path='/profile' component={ Profile }/>
        </Switch>
        <Switch>
          <Route exact path='/places' component={ FeedItem }/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
