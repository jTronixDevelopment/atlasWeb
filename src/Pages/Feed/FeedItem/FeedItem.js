import React, { Component } from 'react';
import {  Card, Button, CardBody, CardImg  } from 'reactstrap';
import './FeedItem.css';

import { LikeIcon , DislikeIcon } from './../../../imgs/icons'

import Storage from './../../../Classes/Firebase/CloudStorage/CloudStorage'

import Thumbnail from './../../../Components/Thumbnail/Thumbnail'
class App extends Component {
  constructor(props){
    super(props);
    this.storage = new Storage(this.props.firebase);
    this.state = {
      thumbnailImg : 'https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_1280.jpg',
      content : "...Loading",
      ownerUser : "...Loading",
      postImg : 'https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_1280.jpg',
      likes : 0,
      dislikes : 0
    }
  }

  getThumbnail(){
    this.storage.getImgURL({
      successHandler : this.showThumbnail.bind(this),
      errorHandler : (err)=>{console.log(err)},
      path : "postImages",
      id : this.props.post.imgUrl
    })
  }

  showThumbnail(url){
    this.setState({ thumbnailImg: url })
  }

  getPostImage(){

  }

  getComments(){

  }

  componentDidMount(){
    this.getThumbnail()
  }

  render() {
    return (
        <Card className='feed-item'>
          <Thumbnail src ={ this.state.thumbnailImg }/>
          <CardImg src={ this.state.postImg }/>
          <CardBody>
              <p>{ this.state.content }</p>
              <p>
                <button className='blank-button'>
                  <img className='icon' src={ LikeIcon } alt='img'/>
                </button>
                  { this.state.likes }
                <button className='blank-button'>
                  <img className='icon' src={ DislikeIcon } alt='imgIcon'/>
                </button>
                  { this.state.likes }
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
