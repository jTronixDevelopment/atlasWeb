import React, { Component } from 'react';

import { FormGroup, Form, Input ,Label ,Container, Card,
  Button, CardHeader, CardBody, FormFeedback } from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';

import Auth from './../../Classes/Firebase/Auth/Auth';

export default class App extends Component {
  constructor(auth){
    super(auth);
    this.auth = new Auth();
    this.state={
      signedUp : false
    }
  }

  createUser() {
    var { email , password, passwordConfirm } = this.getUserInfo();
    console.log(this.isValidEmail(email),this.isValidPassword(password,passwordConfirm))
    if(this.isValidEmail(email)&&this.isValidPassword(password,passwordConfirm)){
      console.log("Valid Sign Up")
      this.auth.signUp(this.getUserInfo())
    } else {
      this.checkEmail(email)
      this.checkPassWord(password,passwordConfirm)
    }
  }

  getUserInfo(){
    return {
      email : this.signUpEmail.value,
      password : this.signUpPassword.value,
      passwordConfirm : this.signUpPassword.value,
      errorHandler : this.errorHandler.bind(this),
      successHandler : this.successHandler.bind(this),
      firebase: this.props.firebase
    }
  }
  // Email verification

  checkEmail(email){
    if(!this.isValidEmail(email)){
      this.showEmailErrors()
    } else {
      this.showEmailSucess()
    }
  }

  showEmailErrors(){
    this.signUpEmail.classList.remove('is-valid')
    this.signUpEmail.classList.remove('is-invalid')
    this.signUpEmail.classList.add('is-invalid')
  }

  showEmailSucess(){
    this.signUpEmail.classList.remove('is-valid')
    this.signUpEmail.classList.remove('is-invalid')
    this.signUpEmail.classList.add('is-valid')
  }

  isValidEmail(email){
    return /^\w+([-+.'] w+)*@\w+([-. ]\w+)*\.\w+([-. ]\w+)*$/.test(email)?true:false
  }

  // Password verification

  checkPassWord(p1,p2){
    if((p1 === p2)&&(p1!== '')){
      this.showPasswordEqual()
    } else {
      this.showPasswordNotEqual()
    }

    if(this.passWordRegex.test(p1)){
      this.showPasswordStrongEnough()
    } else {
      this.showPasswordNotStrongEnough();
    }

  }

  showPasswordNotEqual(){
    this.signUpPasswordConfirm.classList.remove('is-valid')
    this.signUpPasswordConfirm.classList.remove('is-invalid')
    this.signUpPasswordConfirm.classList.add('is-invalid')
  }

  showPasswordEqual(){
    this.signUpPasswordConfirm.classList.remove('is-valid')
    this.signUpPasswordConfirm.classList.remove('is-invalid')
    this.signUpPasswordConfirm.classList.add('is-valid')
  }

  showPasswordNotStrongEnough(){
    this.signUpPassword.classList.remove('is-valid')
    this.signUpPassword.classList.remove('is-invalid')
    this.signUpPassword.classList.add('is-invalid')
  }

  showPasswordStrongEnough(){
    this.signUpPassword.classList.remove('is-valid')
    this.signUpPassword.classList.remove('is-invalid')
    this.signUpPassword.classList.add('is-valid')
  }

  isValidPassword(p1,p2){
    console.log(p1)
    console.log(p1 !=="")
    return (p1 === p2)&&(p1!== '')&&this.passWordRegex.test(p1)
  }

  // Server Errors

  showServerEmailError(){

  }

  showPasswordEmailError(){

  }

  errorHandler(error){
    switch (error) {
      case "expression":
        console.log("Doing Something");
        break;
      default:

    }
  }

  successHandler(){
    this.saveFireBase(this.auth.firebase);
    console.log("cool")
    this.setState({ signedUp : true })
  }

  // Life Cycle Events

  componentDidMount(){
    this.signUpPassword = document.getElementById('signUpPassword');
    this.signUpPasswordConfirm = document.getElementById('signUpPasswordConfirm');
    this.signUpEmail = document.getElementById('signUpEmail');
    this.passWordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
  }

  render() {
    if (this.state.signedUp === true) {
      return ( <Redirect to='/signin' push/> )
    }
    return (
      <Container>
        <Card>
          <CardHeader>Sign Up</CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id='signUpEmail' type="email" autoComplete='on' name="email" placeholder="Email Address" />
                <FormFeedback invalid=''>Please check you email.</FormFeedback>
                <FormFeedback valid>Everything looks good.</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="password1">Password</Label>
                <Input id='signUpPassword' autoComplete='on' type="password" name="password1" placeholder="Enter password" />
                <FormFeedback valid>Password fits criteria.</FormFeedback>
                <FormFeedback invalid=''>Password should be at least 7 letters, contain one special character, and atleast one upper and lower case letter.</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="password2">Confirm Password</Label>
                <Input id='signUpPasswordConfirm' autoComplete='on' type="password" name="password2" placeholder="Confirm Password" />
                <FormFeedback valid>Passwords are equal.</FormFeedback>
                <FormFeedback invalid=''>Passwords Do Not Match</FormFeedback>
              </FormGroup>
              <Button color='success' onClick = { this.createUser.bind(this) }>Submit</Button>
            </Form>
            <br/>
            <p>Already a member?<Link to={'/signin'}>Click here!</Link></p>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
