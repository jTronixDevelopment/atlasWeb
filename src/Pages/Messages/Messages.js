import React, { Component } from 'react';

import { Container , Row, Col } from 'reactstrap';

import MessageThumbnail from './MessageThumbnail/MessageThumbnail';

import './Messages.css'

export default class Messages extends Component{
  render(){
    return(
      <Container>
        <MessageThumbnail/>
        <MessageThumbnail/>
        <MessageThumbnail/>
      </Container>
    )
  }
}
