import React, { Component } from 'react';

import { Container } from 'reactstrap';

import SearchBar from './SearchComponents/SearchBar';

import FeedItem from '../../Components/FeedItem/FeedItem';
import PersonItem from '../../Components/PersonItem/PersonItem';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleResults: [],
      placesResults: [],
    };
    this.showResults = this.showResults.bind(this);
  }

  showResults(posts) {
    this.setState({
      peopleResults: posts,
    });
  }

  render() {
    const {
      firebase,
    } = this.props;
    const {
      peopleResults,
      placesResults,
    } = this.state;
    return (
      <Container>
        <SearchBar firebase={firebase} showResults={this.showResults} />
        <div className="search-horizontal-scroll">
          {
            peopleResults.map((post, i) => <PersonItem key={i} userInfo={post} />)
          }
        </div>
        <div className="search-horizontal-scroll">
          { placesResults.map((post, i) => <FeedItem key={i} userInfo={post} />) }
        </div>
      </Container>
    );
  }
}
