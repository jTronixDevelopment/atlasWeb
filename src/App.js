import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInWidget from './components/signInWidget/signInWidget';
import SignUpWidget from './components/signUpWidget/signUpWidget';

import Profile from './components/profile/profile';
import Places from './components/places/places';
import Search from './components/search/search';

import Header from './components/header/header';
import Navigation from './components/navigation/navigation';

import FeedItem from './components/places/places';

import { DB , Auth, Firebase } from './firebase/setup';


import { LOG_IN } from './redux/actions/authactions'

export default class App extends Component {
  constructor(){
    super();
    this.db = new DB(Firebase);
    this.auth = new Auth(Firebase);
  }

  saveFireBase(firebase){
    this.db.firebase = firebase;
    this.auth.firebase = firebase;
  }

  componentDidMount(){
  }

  render() {
    return (
      <div>
        <Switch>
            <Route path='*' component={ Header }/>
        </Switch>
        <Switch>
            <Route exact path='/' render={ props => ( <SignInWidget auth={ this.auth } saveFireBase={this.saveFireBase.bind(this)}/> )}/>
            <Route path='/signup' render={ props => ( <SignUpWidget auth={ this.auth } saveFireBase={this.saveFireBase.bind(this)}/> )} />
            <Route path='/signin' render={ props => ( <SignInWidget auth={ this.auth } saveFireBase={this.saveFireBase.bind(this)}/> )} />
            <Route path='/places' component={ Places }/>
            <Route path='/search' component={ Search }/>
            <Route path='/profile' render={ props => ( <Profile auth={ this.auth } saveFireBase={this.saveFireBase.bind(this)} /> )}/>
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
