import React, { Component } from 'react';
import { Container } from 'reactstrap';

import FeedItem from './FeedItem/FeedItem';

//== Classes ===================================================================
import DB from './../../Classes/Firebase/Database/Database';

import './Feed.css'

export default class App extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
  }

  componentDidMount() {
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
