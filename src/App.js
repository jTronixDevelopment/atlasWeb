import React, { Component } from 'react';

//=== Modules ==================================================================
import { Route, Switch } from 'react-router-dom';

//=== Pages ====================================================================
import SignInWidget from './Pages/SignIn/signInWidget';
import SignUpWidget from './Pages/SignUp/signUpWidget';
import Profile from './Pages/Profile/profile';
import Feed from './Pages/Feed/Feed';
import Search from './Pages/Search/Search';
import Messages from './Pages/Messages/Messages';
import Testing from './Pages/Testing/testing';

//=== Components ===============================================================
import Header from './Components/header/header';
import Navigation from './Components/navigation/navigation';

import { Firebase } from './Classes/Firebase/setup';
import './App.css'

// import { LOG_IN } from './redux/actions/authactions'

export default class App extends Component {
  constructor(){
    super();
    this.firebase = Firebase;
  }

  saveFireBase(firebase){
    console.log('Firebase was saved with : ', firebase)
    this.firebase = firebase;
  }

  render() {
    return (
      <div>
        <Switch>
            <Route path='*' component={ Header }/>
        </Switch>
        <Switch>
          <Route exact path='/' render={ props => ( <SignInWidget firebase={this.firebase} saveFireBase={this.saveFireBase.bind(this)}/> )}/>
          <Route path='/signup' render={ props => ( <SignUpWidget firebase={this.firebase}  saveFireBase={this.saveFireBase.bind(this)}/> )} />
          <Route path='/signin' render={ props => ( <SignInWidget firebase={this.firebase}  saveFireBase={this.saveFireBase.bind(this)}/> )} />
          <Route path='/profile' render={ props => ( <Profile firebase={this.firebase} saveFireBase={this.saveFireBase.bind(this)} /> )}/>
          <Route path='/testing' render={ props => ( <Testing firebase={this.firebase} saveFireBase={this.saveFireBase.bind(this)} /> )}/>
          <Route path='/places' render={ props => ( <Feed firebase={this.firebase} saveFireBase={this.saveFireBase.bind(this)} /> )}/>
          <Route path='/search' render={ props => ( <Search firebase={this.firebase} saveFireBase={this.saveFireBase.bind(this)} /> )}/>
          <Route path='/messages' render={ props => ( <Messages firebase={this.firebase} saveFireBase={this.saveFireBase.bind(this)} /> )}/>
        </Switch>
        <Switch>
          <Route path='/profile' component={ Navigation }/>
          <Route path='/testing' component={ Navigation }/>
          <Route path='/places' component={ Navigation }/>
          <Route path='/search' component={ Navigation }/>
          <Route path='/messages' component={ Navigation }/>
        </Switch>
      </div>
    );
  }
}
