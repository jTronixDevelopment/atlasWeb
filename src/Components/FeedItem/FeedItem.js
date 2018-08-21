import React, { Component } from 'react';
import {
  Card, Button, CardBody, CardImg,
} from 'reactstrap';

import './FeedItem.css';

import { LikeIcon } from '../../imgs/icons';

import Storage from '../../Classes/Firebase/CloudStorage/CloudStorage';

import Thumbnail from '../Thumbnail/Thumbnail';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    const {
      firebase,
    } = this.props;
    this.storage = new Storage(firebase);
    this.state = {
      thumbnailImg: 'https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_1280.jpg',
      content: '...Loading',
      postImg: 'https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_1280.jpg',
      likes: 0,
      comments: [],
    };
  }

  componentDidMount() {
    const {
      post,
    } = this.props;
    this.getThumbnail();
    this.getPostImage();
    this.setState({
      content: post.data().content,
    });
  }

  // Thumbnail
  getThumbnail() {
    const {
      post,
    } = this.props;
    this.storage.getImgURL({
      successHandler: this.showThumbnail.bind(this),
      errorHandler: (err) => { console.log(err); },
      path: 'profilePics',
      id: post.data().ownerId,
    });
  }

  // Post Image

  getPostImage() {
    const {
      post,
    } = this.props;
    this.storage.getImgURL({
      successHandler: this.showPostImg.bind(this),
      errorHandler: (err) => { console.log(err); },
      path: 'postImages',
      id: post.data().imageURL,
    });
  }

  showThumbnail(url) {
    this.setState({ thumbnailImg: url });
  }

  showPostImg(url) {
    this.setState({ postImg: url });
  }

  render() {
    const {
      thumbnailImg,
      postImg,
      comments,
      content,
      likes,
    } = this.state;
    return (
      <Card className="feed-item">
        <Thumbnail src={thumbnailImg} />
        <CardImg src={postImg} />
        <CardBody>
          <p>{content}</p>
          <p>
            <button type="button" className="blank-button">
              <img className="icon" src={LikeIcon} alt="img" />
            </button>
            {likes}
          </p>
          <p>
            There are
            {' '}
            { comments.length }
            {' '}
            comments
          </p>
          <textarea placeholder="Comment" />
          <Button>Comment</Button>
        </CardBody>
      </Card>
    );
  }
}
