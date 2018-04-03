import React, { Component } from 'react';
import { Container } from 'reactstrap';
import FeedItem from './placescomponents/placesItem'

export default class App extends Component {

  render() {
    return (
      <Container>
        <h1>Places Feed</h1>
        <FeedItem userName='Ryan' dislikes='4' likes='5'/>
        <FeedItem userName='Ryan' />
        <FeedItem userName='Ryan' />
        <FeedItem userName='Ryan' />
        <FeedItem userName='Ryan' />
        <FeedItem userName='Ryan' />
      </Container>
    );
  }
}
