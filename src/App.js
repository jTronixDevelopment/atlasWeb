import React, { Component } from 'react';

//=== Modules ==================================================================
import { Route, Switch } from 'react-router-dom';

//=== Pages ====================================================================
import SignInWidget from './Pages/SignIn/SignIn';
import SignUpWidget from './Pages/SignUp/SignUp';
import Profile from './Pages/Profile/Profile';
import Places from './Pages/Places/Places';
import Search from './Pages/Search/Search';
import Messages from './Pages/Messages/Messages';
import Testing from './Pages/Testing/Testing';
import People from './Pages/People/People';
import Post from './Pages/Post/Post';
import Settings from './Pages/Settings/Settings';

//=== Components ===============================================================
import Header from './Components/Header/Header';
import Navigation from './Components/Navigation/Navigation';

//=== Database =================================================================
import { Firebase } from './Classes/Firebase/setup';

//=== Styles ===================================================================
import './App.css'

export default class App extends Component {
  constructor(){
    super();
    this.firebase = Firebase;
  }

  saveData(){}

  render() {
    return (
      <div>
        <Switch>
            <Route path='*' component={ Header }/>
        </Switch>
        <Switch>
          <Route exact path='/' render={ props => ( <SignInWidget firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
          <Route path='/signup' render={ props => ( <SignUpWidget firebase={this.firebase} saveData={this.saveData.bind(this)}/> )} />
          <Route path='/signin' render={ props => ( <SignInWidget firebase={this.firebase} saveData={this.saveData.bind(this)}/> )} />
          <Route path='/profile' render={ props => ( <Profile firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
          <Route path='/testing' render={ props => ( <Testing firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
          <Route path='/places' render={ props => ( <Places firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
          <Route path='/search' render={ props => ( <Search firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
          <Route path='/messages' render={ props => ( <Messages firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
          <Route path='/people' render={ props => ( <People firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
          <Route path='/post' render={ props => ( <Post firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
          <Route path='/post' render={ props => ( <Settings firebase={this.firebase} saveData={this.saveData.bind(this)}/> )}/>
        </Switch>
        <Switch>
          <Route path='/profile' component={ Navigation }/>
          <Route path='/testing' component={ Navigation }/>
          <Route path='/places' component={ Navigation }/>
          <Route path='/search' component={ Navigation }/>
          <Route path='/messages' component={ Navigation }/>
          <Route path='/post' component={ Navigation }/>
          <Route path='/people' component={ Navigation }/>
        </Switch>
      </div>
    );
  }
}
