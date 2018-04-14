import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import Thumbnail from './../../../Components/Thumbnail/Thumbnail'


import './MessageThumbnail.css'

export default class MessageThumbnail extends Component{

  componentDidMount(){
    var ch = document.getElementsByClassName('center-height');
    [...ch].forEach((el)=>{
      var containerEl = el.parentElement.offsetHeight;
      console.log(containerEl)
      el.style.top = containerEl/2
    })
  }

  showMessageModal(){
    console.log("cool")
  }

  render(){
    return(
      <Row className='message-thumbnail-container' onClick={ this.showMessageModal.bind(this) }>
        <Col>
          <Thumbnail src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=0&oh=d130135c52915fd36bd4d7db5dbed825&oe=5B685759" title="test" />
        </Col>
        <Col className='center-height'>
          OMG FUCK ME
        </Col>
      </Row>
    )
  }
}
