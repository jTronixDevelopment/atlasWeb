import React, { Component } from 'react';
import {  Card, Button, CardHeader, CardBody,
  CardTitle, CardImg  } from 'reactstrap';
import './styles.css';

import Image from './image.png';
import Like from './like.png';
import Dislike from './dislike.png';

import Thumbnail from './../../../Components/Thumbnail/Thumbnail'
class App extends Component {

  render() {
    return (
        <Card className='feed-item'>
          <Thumbnail src = "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=0&oh=d130135c52915fd36bd4d7db5dbed825&oe=5B685759" title="User"/>
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
