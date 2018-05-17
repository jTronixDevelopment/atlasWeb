import React, { Component } from 'react'

import { Container } from 'reactstrap'

import SearchBar from './SearchComponents/SearchBar';

import FeedItem from './../../Components/FeedItem/FeedItem';
import PersonItem from './../../Components/PersonItem/PersonItem';

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        peopleResults:[],
        placesResults: []
      };
    }

    showResults(posts){
      this.setState({
        peopleResults : posts
      })
    }

  render() {
    return (
      <Container>
        <SearchBar firebase={this.props.firebase} showResults={this.showResults.bind(this)}/>
        <div className='search-horizontal-scroll'>
          {
            this.state.peopleResults.map((post,i)=><PersonItem  key={i} userInfo={post}/>)
          }
        </div>
        <div className='search-horizontal-scroll'>
          { this.state.placesResults.map((post,i)=><FeedItem key={i} userInfo={post}/>) }
        </div>
      </Container>
    );
  }
}
