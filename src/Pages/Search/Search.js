import React, { Component } from 'react';

import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import SearchBar from './SearchComponents/SearchBar';

import FeedItem from '../../Components/FeedItem/FeedItem';
import PersonItem from '../../Components/PersonItem/PersonItem';

export default class Search extends Component {
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
            peopleResults.map(post => <PersonItem key={post} userInfo={post} />)
          }
        </div>
        <div className="search-horizontal-scroll">
          {
            placesResults.map(post => <FeedItem key={post} userInfo={post} />)
          }
        </div>
      </Container>
    );
  }
}

Search.propTypes = {
  firebase: PropTypes.shape.isRequired,
};
