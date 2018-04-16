import React, { Component } from 'react';
import {  Card, Button, CardBody, CardImg  } from 'reactstrap';
import './FeedItem.css';

import { ImageIcon , LikeIcon , DislikeIcon } from './../../../imgs/icons'

import Thumbnail from './../../../Components/Thumbnail/Thumbnail'
class App extends Component {

  render() {
    return (
        <Card className='feed-item'>
          <Thumbnail src = {ImageIcon}/>
          <CardImg src={ImageIcon}/>
          <CardBody>
              <p>{ this.props.caption }</p>
              <p>
                <button className='blank-button'>
                  <img className='icon' src={ LikeIcon } alt='img'/>
                </button>
                  { this.props.likes }
                <button className='blank-button'>
                  <img className='icon' src={ DislikeIcon } alt='img'/>
                </button>
                  { this.props.likes }
              </p>
              <textarea placeholder="Comment"></textarea>
              <Button>Comment</Button>
          </CardBody>
        </Card>
    );
  }
}
App.defaultProps = {
    userName : "Username",
    content : "Text",
    caption : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
export default App;
