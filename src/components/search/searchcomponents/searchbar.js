//Search SearchResults
import React, { Component } from 'react'
import './../search.css'

import SearchIcon from './../../icons/search.png';

import { Container, FormGroup, Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
      <Form>
        <FormGroup>
        <InputGroup className='search-bar'>
          <Input/>
          <InputGroupAddon addonType="append">
            <Button>
              <img alt='searchIcon' className='search-bar-icon' src={ SearchIcon }/>
            </Button>
          </InputGroupAddon>
        </InputGroup>
        </FormGroup>
        </Form>
      </Container>
    );
  }ac
}

export default App;
