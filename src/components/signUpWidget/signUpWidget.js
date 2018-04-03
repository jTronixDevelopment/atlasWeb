import React, { Component } from 'react';

import { FormGroup, Form, Input ,Label ,Container, Card, Button, CardHeader, CardBody,
  CardTitle, FormFeedback, FormText } from 'reactstrap';

export default class App extends Component {
  constructor(auth){
    super(auth);
    this.auth = this.props.auth;
    console.log(this.auth)
  }

  createUser() {
    var {email} = this.getCreateUserInfo();
    if(this.isValidEmail(email)){
      document.getElementById('signUpEmail').classList.remove('is-invalid')
      document.getElementById('signUpEmail').classList.add('is-valid')
      if(this.isValidPassword()){
        this.auth.signUp(this.getCreateUserInfo())
      } else {
        // show bad passwords
      }
    } else {
      document.getElementById('signUpEmail').classList.add('is-invalid')
      document.getElementById('signUpEmail').classList.remove('is-valid')
    }
      console.log(`Email is Valid : ${ this.isValidEmail(email) }, Password is Valid ${ this.isValidPassword() }`);
  }

  getCreateUserInfo(){
    return {
      email : document.getElementById('signUpEmail').value,
      password : document.getElementById('signUpPassword').value,
      errorHandler : this.errorHandler.bind(this)
    }
  }

  errorHandler(error){
    console.log(error)
  }

  isValidEmail(email){
    return /^\w+([-+.']\ w+)*@\w+([-. ]\w+)*\.\w+([-. ]\w+)*$/.test(email)?true:false;
  }

  isValidPassword(){
    var signUpPassword = document.getElementById('signUpPassword')
    var signUpPasswordConfirm = document.getElementById('signUpPasswordConfirm')
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if(signUpPassword.value===signUpPasswordConfirm.value){
      if(strongRegex.test(signUpPassword.value)){
          signUpPassword.classList.remove('is-invalid')
          signUpPasswordConfirm.classList.remove('is-invalid')
          signUpPassword.classList.add('is-valid')
          signUpPasswordConfirm.classList.add('in-valid')
          return true;
      } else {
        return false;
      }
    } else{
      signUpPassword.classList.remove('is-valid')
      signUpPasswordConfirm.classList.remove('is-valid')
      signUpPassword.classList.add('is-invalid')
      signUpPasswordConfirm.classList.add('is-invalid')
      return false;
    }
  }

  render() {
    return (
      <Container>
        <Card>
          <CardHeader>Logo</CardHeader>
          <CardBody>
            <CardTitle>Sign Up</CardTitle>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id='signUpEmail' type="email" autoComplete='on' name="email" placeholder="Email Address" />
                <FormFeedback invalid=''>Please check you email.</FormFeedback>
                <FormFeedback valid>Everything looks good.</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password1">Password</Label>
                <FormText>Password should be at least 7 letters, contain one special character, and atleast one upper and lower case letter.</FormText>
                <Input id='signUpPassword' autoComplete='on' type="password" name="password1" placeholder="Enter password" />
                <FormFeedback valid>Everything looks good.</FormFeedback>
                <FormFeedback invalid=''>Passwords Do Not Match</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password2">Confirm Password</Label>
                <Input id='signUpPasswordConfirm' autoComplete='on' type="password" name="password2" placeholder="Confirm Password" />
                <FormFeedback valid>Everything looks good.</FormFeedback>
                <FormFeedback invalid=''>Sweet! that name is available</FormFeedback>
              </FormGroup>
              <Button color='success' onClick = { this.createUser.bind(this) }>Submit</Button>
            </Form>
            <br/>
            <p>Already a member?<a href="/"> Click here!</a></p>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
