import React, { Component } from 'react';
import {  Card, Button, CardHeader, CardBody,
  CardTitle, CardImg  } from 'reactstrap';
import './styles.css';

import Image from './image.png';
import Like from './like.png';
import Dislike from './dislike.png';
class App extends Component {

  render() {
    return (
        <Card>
          <CardHeader>{ this.props.userName }</CardHeader>
          <CardImg style={{"borderRadius":0}} src={Image}/>
          <CardBody>
            <CardTitle></CardTitle>
              <p>{ this.props.caption }</p>
              <p>
                <button className='blank-button'><img alt='img' className='icon' src = {Like}/></button>{ this.props.likes }
                <button className='blank-button'><img alt='img' className='icon' src = {Dislike}/></button>{ this.props.likes }
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
