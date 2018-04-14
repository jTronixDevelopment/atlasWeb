import React, { Component } from 'react';

import SignInWidget from './SignIn/signInWidget';
import SignUpWidget from './SignUp/SignUpWidget';

export default class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      authType : <SignInWidget firebase={ this.props.firebase } saveFireBase = { this.saveFireBase.bind(this) }/>
    }
  }

  render(){
    return(
      <div>
        { this.state.authType }
      </div>
    )
  }
}
