
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Form,
  FormFeedback,
  Input,
  Label,
  Container,
  Card,
  Button,
  CardHeader,
  CardBody,
  CardTitle,
} from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';
import Auth from '../../Classes/Firebase/Auth/Auth';

import './SignIn.css';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    const { firebase } = this.props;
    this.auth = new Auth(firebase);
    this.signInUser = this.signInUser.bind(this);
    this.signInWithFacebook = this.signInWithFacebook.bind(this);
  }

  componentDidMount() {
    this.signInEmail = document.getElementById('signInEmail');
  }

  getSignInInfo() {
    const { firebase } = this.props;
    return {
      email: document.getElementById('signInEmail').value,
      password: document.getElementById('signInPassword').value,
      errorHandler: this.errorHandler.bind(this),
      successHandler: this.successHandler.bind(this),
      firebase,
    };
  }

  showEmailErrors(error) {
    // this.setState({ emailError: error });
    console.log(error);
    this.signInEmail.classList.remove('is-valid');
    this.signInEmail.classList.remove('is-invalid');
    this.signInEmail.classList.add('is-invalid');
  }

  signInUser() {
    if (this.isValidEmail(this.signInEmail.value)) {
      this.showEmailSucess();
      this.auth.signIn(this.getSignInInfo());
    } else {
      this.showEmailErrors('Badly Formated Email.');
    }
  }

  showEmailSucess() {
    this.signInEmail.classList.remove('is-valid');
    this.signInEmail.classList.remove('is-invalid');
    this.signInEmail.classList.add('is-valid');
  }

  isValidEmail(email) {
    // return !!new RegExp(/^\w+([-+.'] w+)*@\w+([-. ]\w+)*\.\w+([-. ]\w+)*$/).test(email);
  }


  errorHandler(error) {
    this.showEmailErrors(error.message);
  }

  successHandler() {
    const { changeAuthStatus } = this.props;
    changeAuthStatus(true);
  }

  signInWithFacebook() {
    const { firebase } = this.props;
    this.auth.signInWithFacebook({
      errorHandler: this.errorHandler.bind(this),
      successHandler: this.successHandler.bind(this),
      firebase,
    });
  }

  render() {
    const {
      loggedIn,
      emailError,
    } = this.props;
    if (loggedIn === true) {
      return (<Redirect to="/profile" push />);
    }
    return (
      <Container>
        <Card className="sign-in-card">
          <CardHeader>Logo</CardHeader>
          <CardBody>
            <CardTitle>Sign in</CardTitle>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input id="signInEmail" autoComplete="on" type="email" name="email" placeholder="Email" />
                <FormFeedback invalid="">{ emailError }</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input id="signInPassword" autoComplete="on" type="password" name="password" placeholder="Password" />
                <FormFeedback invalid="">Sweet! that name is available</FormFeedback>
              </FormGroup>
              <Button color="success" onClick={this.signInUser}>Submit</Button>
            </Form>
            <br />
            <p className="text-center">
            -or-
            </p>
            <div className="text-center">
              <Button className="fb-icon" onClick={this.signInWithFacebook}>
                <b> Login With Facebook</b>
              </Button>
            </div>
            <hr />
            <p>
              Not a member?
              <Link to="/signup">Click here!</Link>
            </p>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

SignIn.propTypes = {
  emailError: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  firebase: PropTypes.string.isRequired,
  changeAuthStatus: PropTypes.func.isRequired,
};
