import React, { Component } from 'react';
import { Container } from 'reactstrap';

import FeedItem from './FeedItem/FeedItem';

import './Feed.css'

export default class App extends Component {

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    }, function() {});
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    }, function() {});
  }

  render() {
    return (
      <Container className='feed-container'>
        <FeedItem/>
        <FeedItem/>
        <FeedItem/>
      </Container>
    );
  }
}
