import React, { Component } from 'react';

import { FormGroup, Form, Input ,Label ,Container, Card,
  Button, CardHeader, CardBody, FormFeedback } from 'reactstrap';

import Auth from './../../Classes/Firebase/Auth/Auth';
import DB from './../../Classes/Firebase/Database/Database';

export default class App extends Component {
  constructor(auth){
    super(auth);
    this.auth = new Auth();
    this.db = new DB();
  }

  getInputs(){
    return {
      userName: document.getElementById('userName').value,
      likes: document.getElementById('content').value,
      content: document.getElementById('dislikes').value,
      dislikes: document.getElementById('likes').value
      // files: document.getElementById('files').files[0]
    }
  }

  sendData(){
    console.log(this.getInputs())
    this.db.add({
      data : this.getInputs(),
      sucessHandler : (id)=>{ console.log(id)},
      errorHandler : (error)=>{ console.log(error)},
      firebase : this.props.firebase,
      collection : 'posts'
    })
  }

  getData(){
    console.log(this.props.firebase)
    this.db.query({firebase : this.props.firebase})
  }

  render() {
    return (
      <Container>
        <Input id='userName' placeholder='UserName' />
        <Input id='likes' placeholder='likes' />
        <Input id='content' placeholder='Content' />
        <Input id='dislikes' placeholder='dislikes' />
        <Input id='files' type='file' />
        <Button onClick={ this.sendData.bind(this) } >Send</Button>
        <br/>
        <Button onClick={ this.getData.bind(this) } >GetData</Button>

      </Container>
    );
  }
}
