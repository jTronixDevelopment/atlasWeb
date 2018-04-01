import React, { Component } from 'react';
import { FormGroup, Form, Input ,Label ,Container, Card, Button, CardHeader, CardBody,
  CardTitle } from 'reactstrap';

export default class App extends Component {
  constructor(auth){
    super(auth);
    this.auth = this.props.auth;
  }

  createUser() {
    if(this.isValidEmail()&&this.isValidPassword())
      this.auth.signUp(this.getCreateUserInfo())
    else
      this.showError()
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
    return email.match(new RegExp('/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/','g'))
  }

  isValidPassword(password){

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
                <Label for="exampleEmail">Email</Label>
                <Input id='signUpEmail' type="email" name="email" placeholder="Email Address" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input id='signUpPassword' type="password" name="password" placeholder="Enter password" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input id='signUpPasswordConfirm' type="password" name="passwordConfirm" placeholder="Confirm Password" />
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
