//Search SearchResults
import React, { Component } from 'react'

import { Container } from 'reactstrap';

class App extends Component {
  constructor(){
    super();
    this.results = "No Results";
  }

  render() {
    return (
      <Container>
        <div>
          { this.results }
        </div>
      </Container>
    );
  }ac
}

export default App;
