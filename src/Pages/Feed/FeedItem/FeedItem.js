import React, { Component } from 'react';
import { Card, Button, CardBody, CardImg  } from 'reactstrap';
import './FeedItem.css';

import { LikeIcon , DislikeIcon } from './../../../imgs/icons';

import Storage from './../../../Classes/Firebase/CloudStorage/CloudStorage';

import Thumbnail from './../../../Components/Thumbnail/Thumbnail';

export default class App extends Component {

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
    console.log(this.props.post.data())
  }

  // Thumbnail
  getThumbnail(){
    this.storage.getImgURL({
      successHandler : this.showThumbnail.bind(this),
      errorHandler : (err)=>{console.log(err)},
      path : "profilePics",
      id : this.props.post.data().ownerId
    })
  }

  showThumbnail(url){
    this.setState({ thumbnailImg: url })
  }

  // Post Image

  getPostImage(){
    this.storage.getImgURL({
      successHandler : this.showPostImg.bind(this),
      errorHandler : (err)=>{console.log(err)},
      path : "postImages",
      id : this.props.post.data().imageURL
    })
  }

  showPostImg(url){
    console.log(url)
    this.setState({ postImg: url })
  }

  // Comments

  getComments(){

  }

  // Component Lifecycle

  componentDidMount(){
    this.getThumbnail()
    this.getPostImage()
    this.setState({
      content : this.props.post.data().content
    })
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
