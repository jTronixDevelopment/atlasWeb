//Search SearchResults
import React, { Component } from 'react'
import './../search.css'

import SearchIcon from './../../icons/search.png';
import { Container, FormGroup, Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <Container>
        <FormGroup>
        <InputGroup className='search-bar'>
          <Input/>
          <InputGroupAddon addonType="append">
            <Button>
              <img className='search-bar-icon' src={ SearchIcon }/>
            </Button>
          </InputGroupAddon>
        </InputGroup>
        </FormGroup>
      </Container>
    );
  }ac
}

export default App;
