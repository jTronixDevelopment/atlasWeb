import React, { Component } from 'react';
import { FormGroup, Form, FormFeedback, Input ,Label ,Container, Card, Button, CardHeader, CardBody,
  CardTitle } from 'reactstrap';

import { Link } from 'react-router-dom';

class App extends Component {

  constructor(auth){
    super(auth);
    this.auth = this.props.auth;
    this.state = {
      emailError : "Check Email",
      auth : this.props.auth
    }
  }


  isValidEmail(email){
    return /^\w+([-+.']\ w+)*@\w+([-. ]\w+)*\.\w+([-. ]\w+)*$/.test(email)?true:false;
  }

  signInUser(){
    if(this.isValidEmail(this.signInEmail.value)){
      console.log('is Valid')
      this.showEmailSucess();
      console.log(this.auth)
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
      successHandler : this.successHandler.bind(this)
    }
  }

  errorHandler(error){
    this.showEmailErrors(error.message)
  }

  successHandler(){
    console.log("sucess")
  }

  componentDidMount(){
    this.signInEmail = document.getElementById('signInEmail');
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
                <FormFeedback invalid=''>{ this.state.emailError }</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input id='signInPassword' autoComplete='on' type="password" name="password" placeholder="Password" />
                <FormFeedback invalid=''>Sweet! that name is available</FormFeedback>
              </FormGroup>
              <Button color='success' onClick = { this.signInUser.bind(this) }>Submit</Button>
            </Form>
            <br/>
            <p>Not a member?<Link to={'/signup'}>Click here!</Link></p>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default App;
