import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';
import {
  Input,
  Card,
  Button,
  CardContent,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import Auth from '../../Classes/Firebase/Auth/Auth';
import DB from '../../Classes/Firebase/Database/Database';

export default class SignUp extends Component {
  constructor(auth) {
    super(auth);
    const {
      firebase,
      showPasswordNotEqual,
      showPasswordEqual,
      showEmailError,
      showEmailSucess,
      showPasswordIsNotStrong,
      showPasswordIsStrong,
    } = this.props;

    this.firebase = firebase;
    this.auth = new Auth(firebase);
    this.db = new DB(firebase);

    // functions
    this.successHandler = this.successHandler.bind(this);
    this.createUser = this.createUser.bind(this);
    this.showPasswordNotEqual = showPasswordNotEqual;
    this.showPasswordEqual = showPasswordEqual;
    this.showEmailError = showEmailError;
    this.showEmailSucess = showEmailSucess;
    this.showPasswordStrongEnough = showPasswordIsStrong;
    this.showPasswordNotStrongEnough = showPasswordIsNotStrong;
    // refs
    this.emailInputRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.birthdayRef = React.createRef();
    this.password1Ref = React.createRef();
    this.password2Ref = React.createRef();
  }

  getUserInfo() {
    return {
      email: this.emailInput,
      password: this.password1,
      passwordConfirm: this.password2,
      errorHandler: (err) => { console.log(err); },
      successHandler: this.successHandler,
      firebase: this.firebase,
      birthday: this.birthday,
      firstName: this.lastName,
      lastName: this.firstName,
    };
  }
  // Email verification

  checkEmail(email) {
    if (EmailValidator.validate(email)) {
      this.showEmailSucess();
    } else {
      this.showEmailError();
    }
  }

  // Password verification

  checkPassWord(p1, p2) {
    if ((p1 === p2) && (p1 !== '')) {
      this.showPasswordEqual();
    } else {
      this.showPasswordNotEqual();
    }

    if (this.passwordRegex.test(p1)) {
      this.showPasswordNotStrongEnough();
    } else {
      this.showPasswordStrongEnough();
    }
  }

  isValidPassword(p1, p2) {
    return (p1 === p2) && (p1 !== '') && this.passwordRegex.test(p1);
  }

  createUser() {
    const { email, password, passwordConfirm } = this.getUserInfo();
    if (this.isValidEmail(email) && this.isValidPassword(password, passwordConfirm)) {
      this.auth.signUp(this.getUserInfo());
    } else {
      this.checkEmail(email);
      this.checkPassWord(password, passwordConfirm);
    }
  }

  successHandler(success) {
    const {
      firstName, lastName, birthday, email,
    } = { ...this.getUserInfo() };

    this.db.addWithID({
      successHandler: () => { console.log('Good'); },
      errorHandler: () => { console.log('error'); },
      data: {
        id: success.uid,
        firstName,
        lastName,
        homeTown: 'Everytown, USA',
        bio: 'Express youself!',
        profilePic: 'none',
        email,
        birthday,
        friends: [],
        places: [],
      },
      collection: 'users',
      docId: this.firebase.auth().currentUser.uid,
    });
  }

  render() {
    const {
      passwordNotEqual,
      emailStatus,
    } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardContent>
            <Input
              inputRef={this.emailInputRef}
              onChange={() => {
                this.emailInput = this.emailInputRef.current.value;
              }}
              autoComplete="on"
              placeholder="Email Address"
              error={emailStatus}
            />

            <Input
              inputRef={this.firstNameRef}
              onChange={() => {
                this.firstName = this.firstNameRef.current.value;
              }}
              autoComplete="on"
              placeholder="First Name"
            />

            <Input
              inputRef={this.lastNameRef}
              onChange={() => {
                this.lastName = this.lastNameRef.current.value;
              }}
              autoComplete="on"
              placeholder="Last Name"
            />

            <Input
              inputRef={this.birthdayRef}
              onChange={() => {
                this.birthday = this.birthdayRef.current.value;
              }}
              autoComplete="on"
              placeholder="Birthday"
            />

            <Input
              inputRef={this.password1Ref}
              onChange={() => {
                this.password1 = this.password1Ref.current.value;
              }}
              autoComplete="on"
              type="password"
              placeholder="Enter password"
              error={passwordNotEqual}
            />

            <Input
              inputRef={this.password2Ref}
              onChange={() => {
                this.password2 = this.password2Ref.current.value;
              }}
              autoComplete="on"
              type="password"
              placeholder="Confirm Password"
              error={passwordNotEqual}
            />
            <br />
            <Button
              variant="contained"
              onClick={this.createUser}
            >
              Submit
            </Button>
            <br />
            <p>
              Already a member?
              <Link to="/signin">Click here!</Link>
            </p>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}
SignUp.propTypes = {
  firebase: PropTypes.shape.isRequired,
  passwordNotEqual: PropTypes.bool.isRequired,
  showPasswordNotEqual: PropTypes.func.isRequired,
  showPasswordEqual: PropTypes.func.isRequired,
  showEmailError: PropTypes.func.isRequired,
  showEmailSucess: PropTypes.func.isRequired,
  emailStatus: PropTypes.bool.isRequired,
  showPasswordIsNotStrong: PropTypes.func.isRequired,
  showPasswordIsStrong: PropTypes.func.isRequired,
};
