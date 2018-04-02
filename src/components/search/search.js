import React, { Component } from 'react'

import { FormGroup, Form, Button, Input } from 'reactstrap';

import SearchBar from './searchcomponents/searchbar';
import SearchResults from './searchcomponents/searchresults';

class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <SearchBar/>
        <SearchResults/>
      </div>
    );
  }ac
}

export default App;
