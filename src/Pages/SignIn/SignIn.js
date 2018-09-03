
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';
import {
  Card,
  CardContent,
  Input,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';

import { Link, Redirect } from 'react-router-dom';
import Auth from '../../Classes/Firebase/Auth/Auth';

import './SignIn.css';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    const {
      firebase,
      showEmailError,
      changeAuthStatus,
    } = this.props;
    this.auth = new Auth(firebase);
    this.signInUser = this.signInUser.bind(this);
    this.showEmailError = showEmailError;
    this.changeAuthStatus = changeAuthStatus;
    // refs
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  getSignInInfo() {
    const { firebase } = this.props;
    return {
      email: this.emailInput,
      password: this.passwordInput,
      errorHandler: (err) => { console.log(err); },
      successHandler: this.changeAuthStatus,
      firebase,
    };
  }

  signInUser() {
    if (EmailValidator.validate(this.emailInput)) {
      this.auth.signIn(this.getSignInInfo());
    } else {
      this.showEmailError();
    }
  }

  render() {
    const {
      loggedIn,
      emailError,
      passwordError,
    } = this.props;
    if (loggedIn === true) {
      return (<Redirect to="/profile" push />);
    }
    return (
      <Grid container justify="center">
        <Grid item className="sign-in-card">
          <Card>
            <CardContent>
              <Typography variant="display1" component="h2">Sign In</Typography>
              <Input
                style={{ width: '100%', margin: '5px 0 5px 0' }}
                inputRef={this.emailInputRef}
                onChange={() => {
                  this.emailInput = this.emailInputRef.current.value;
                }}
                autoComplete="on"
                placeholder="Email"
                error={emailError}
              />
              <Input
                style={{ width: '100%', margin: '5px 0 5px 0' }}
                inputRef={this.passwordInputRef}
                onChange={() => {
                  this.passwordInput = this.passwordInputRef.current.value;
                }}
                autoComplete="on"
                placeholder="Password"
                error={passwordError}
              />
              <br />
              <Button variant="contained" color="primary" onClick={this.signInUser}>Submit</Button>
              <br />
              <p>
              Not a member?
                <Link to="/signup">Click here!</Link>
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  passwordError: PropTypes.bool.isRequired,
  emailError: PropTypes.bool.isRequired,
  firebase: PropTypes.shape.isRequired,
  changeAuthStatus: PropTypes.func.isRequired,
  showEmailError: PropTypes.func.isRequired,
};
