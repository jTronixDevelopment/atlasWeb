//Search SearchResults
import React, { Component } from 'react'
import './../search.css'

import { SearchIcon } from './../../../imgs/icons.js';

import { FormGroup, Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
