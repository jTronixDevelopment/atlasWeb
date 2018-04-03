import React, { Component } from 'react'

import { Jumbotron , Container } from 'reactstrap';

export default class App extends Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Fluid</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
    );
  }
}
