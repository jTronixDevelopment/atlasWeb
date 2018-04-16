import React, { Component } from 'react';
import { Container } from 'reactstrap';

import FeedItem from './FeedItem/FeedItem';
import PostWidget from './PostWidget/PostWidget';

import './Feed.css'

export default class App extends Component {

  render() {
    return (
      <Container className='feed-container'>
        <PostWidget firebase={ this.props.firebase } />
        <FeedItem/>
      </Container>
    );
  }
}
