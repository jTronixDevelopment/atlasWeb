import React, { Component } from 'react';

import { FormGroup, Form, FormFeedback, Input ,Label ,Container,
  Card, Button, CardHeader, CardBody, CardTitle } from 'reactstrap';

import { FacebookIcon } from './../../imgs/icons.js';

import Auth from './../../Classes/Firebase/Auth/Auth';

import { Link, Redirect } from 'react-router-dom';

import './signin.css'

export default class App extends Component {

  constructor(props){
    super(props);
    this.auth = new Auth();
    this.saveFireBase = this.props.saveFireBase;
    this.state = {
      emailError : "Check Email",
      loggedIn : false
    }
  }

  isValidEmail(email){
    return new RegExp(/^\w+([-+.'] w+)*@\w+([-. ]\w+)*\.\w+([-. ]\w+)*$/).test(email)?true:false;
  }

  signInUser(){
    if(this.isValidEmail(this.signInEmail.value)){
      console.log('is Valid email')
      this.showEmailSucess();
      this.auth.signIn(this.getSignInInfo())
    } else {
      this.showEmailErrors("Badly Formated Email.")
    }
  }

  showEmailErrors(error){
    this.setState({ emailError : error })
    this.signInEmail.classList.remove('is-valid')
    this.signInEmail.classList.remove('is-invalid')
    this.signInEmail.classList.add('is-invalid')
  }

  showEmailSucess(){
    this.signInEmail.classList.remove('is-valid')
    this.signInEmail.classList.remove('is-invalid')
    this.signInEmail.classList.add('is-valid')
  }

  getSignInInfo(){
    return {
      email : document.getElementById('signInEmail').value,
      password : document.getElementById('signInPassword').value,
      errorHandler : this.errorHandler.bind(this),
      successHandler : this.successHandler.bind(this),
      firebase: this.props.firebase
    }
  }

  errorHandler(error){
    this.showEmailErrors(error.message)
  }

  successHandler(){
    this.saveFireBase(this.props.firebase);
    this.setState({ loggedIn:true })
  }

  signInWithFacebook(){
    this.auth.signInWithFacebook({
      errorHandler: this.errorHandler.bind(this),
      successHandler: this.successHandler.bind(this),
      firebase: this.props.firebase
    })
  }

  checkAuthStatus(){
    console.log('checking')
  }

  componentDidMount(){
    this.signInEmail = document.getElementById('signInEmail');
    console.log('in')
    this.checkAuthStatus.bind(this)
    this.props.firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
        // ...
        console.log(error)
    });
  }

  render() {
    if (this.state.loggedIn === true) {
      return ( <Redirect to='/profile' push/> )
    }
    return (
      <Container>
        <Card className='sign-in-card' >
          <CardHeader>Logo</CardHeader>
          <CardBody>
            <CardTitle>Sign in</CardTitle>
            <Form>
              <FormGroup>
                <FormFeedback invalid=''>{ this.state.emailError }</FormFeedback>
                <Label for="exampleEmail">Email</Label>
                <Input id='signInEmail' autoComplete='on' type="email" name="email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input id='signInPassword' autoComplete='on' type="password" name="password" placeholder="Password" />
                <FormFeedback invalid=''>Sweet! that name is available</FormFeedback>
              </FormGroup>
              <Button color='success' onClick = { this.signInUser.bind(this) }>Submit</Button>
            </Form>
            <br/>
            <p className='text-center'>
            -or-
            </p>
            <div className='text-center'>
              <Button className='fb-icon' onClick={this.signInWithFacebook.bind(this)}>
                <img alt='fbLogIn' className='icon' src={ FacebookIcon }/>
                <b> Login With Facebook</b>
              </Button>
            </div>
            <hr/>
            <p>Not a member?<Link to={'/signup'}>Click here!</Link></p>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
