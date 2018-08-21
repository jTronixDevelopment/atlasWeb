import React, { Component } from 'react';

import {
  Input,
  Container,
  Button,
} from 'reactstrap';

import Auth from '../../Classes/Firebase/Auth/Auth';
import DB from '../../Classes/Firebase/Database/Database';

export default class App extends Component {
  constructor(auth) {
    super(auth);
    const { firebase } = this.props;
    this.firebase = firebase;
    this.auth = new Auth();
    this.db = new DB();
    this.getData = this.getData.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  getInputs() {
    return {
      userName: document.getElementById('userName').value,
      likes: document.getElementById('content').value,
      content: document.getElementById('dislikes').value,
      dislikes: document.getElementById('likes').value,
    };
  }

  getData() {
    console.log(this.firebase);
    this.db.query({ firebase: this.firebase });
  }

  sendData() {
    this.db.add({
      data: this.getInputs(),
      sucessHandler: (id) => { console.log(id); },
      errorHandler: (error) => { console.log(error); },
      firebase: this.firebase,
      collection: 'posts',
    });
  }

  render() {
    return (
      <Container>
        <Input id="userName" placeholder="UserName" />
        <Input id="likes" placeholder="likes" />
        <Input id="content" placeholder="Content" />
        <Input id="dislikes" placeholder="dislikes" />
        <Input id="files" type="file" />
        <Button onClick={this.sendData}>Send</Button>
        <br />
        <Button onClick={this.getData}>GetData</Button>

      </Container>
    );
  }
}
