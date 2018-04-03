import React, { Component } from 'react'

import SearchBar from './searchcomponents/searchbar';
import SearchResults from './searchcomponents/searchresults';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <SearchResults/>
      </div>
    );
  }
}
