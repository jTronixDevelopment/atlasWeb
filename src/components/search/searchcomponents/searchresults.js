//Search SearchResults
import React, { Component } from 'react'

import SearchIcon from './../../icons/search.png';
import { Container, Button, Input } from 'reactstrap';

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
