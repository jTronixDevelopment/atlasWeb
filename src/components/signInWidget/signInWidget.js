import React, { Component } from 'react';
import { FormGroup, Form, FormFeedback, Input ,Label ,Container, Card, Button, CardHeader, CardBody,
  CardTitle } from 'reactstrap';

class App extends Component {

  constructor(auth){
    super(auth);
    this.auth = this.props.auth;
  }
  signInUser(){
    this.auth.signIn(this.getSignInInfo())
  }

  getSignInInfo(){
    return {
      email : document.getElementById('signInEmail').value,
      password : document.getElementById('signInPassword').value,
      errorHandler : this.errorHandler.bind(this),
      sucessHandler : this.sucessHandler.bind(this)
    }
  }

  errorHandler(error){
    console.log('Error');
  }

  sucessHandler(){
    console.log("sucess")
  }

  render() {
    return (
      <Container>
        <Card>
          <CardHeader>Logo</CardHeader>
          <CardBody>
            <CardTitle>Sign in</CardTitle>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input id='signInEmail' autoComplete='on' type="email" name="email" placeholder="Email" />
                <FormFeedback valid>Sweet! that name is available</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input id='signInPassword' autoComplete='on' type="password" name="password" placeholder="Password" />
                <FormFeedback valid>Sweet! that name is available</FormFeedback>
              </FormGroup>
              <Button color='success' onClick = { this.signInUser.bind(this) }>Submit</Button>
            </Form>
            <br/>
            <p>Not a member?<a href='/signup'>Click here!</a></p>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default App;
