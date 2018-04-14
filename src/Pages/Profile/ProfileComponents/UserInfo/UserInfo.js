import React, { Component } from 'react'

import { Jumbotron , Container } from 'reactstrap';

import './userinfo.css'

export default class App extends Component {
  render() {
    return (
      <Jumbotron fluid className='profile-jumbotron'>
        <Container fluid>
          <h1 className="display-3">Your Profile</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
    );
  }
}
