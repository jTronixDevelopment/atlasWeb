import React, { Component } from 'react';

import {
  InputGroup,
  Button,
  Row,
  Col,
  Container,
} from 'reactstrap';

import MapComponent from '../../Components/Maps/Map/Map';

import Storage from '../../Classes/Firebase/CloudStorage/CloudStorage';
import DB from '../../Classes/Firebase/Database/Database';

// === Style ====================================================================
import './Post.css';

export default class Post extends Component {
  constructor(props) {
    super(props);
    const { firebase } = this.props;
    this.firebase = firebase;
    this.db = new DB(firebase);
    this.storage = new Storage(firebase);
    this.state = {
      mapVisability: 'none',
    };

    console.log(this.props);
  }

  //= == Checking for valid Inputs ==============================================

  componentDidMount() {
    this.postContent = document.getElementById('postContent');
    this.postImageInput = document.getElementById('postImageInput');
    this.postImagePreview = document.getElementById('postImagePreview');
    this.mapPreview = document.getElementById('mapContainer');
    this.postImagePreview.style.display = 'none';
    this.mapPreview.style.display = 'none';
  }

  getPostInfo() {
    return {
      ownerId: this.firebase.auth().currentUser.uid,
      data: new Date(),
      content: this.postContent.value,
      imageURL: 'none',
      location: { test: 'test' },
      comments: [],
      likes: 0,
    };
  }

  checkPostImage() {
    if (this.postImageInput) {
      if (this.postImageInput.files[0]) {
        return true;
      }
      console.log('Post image exists but not image.');
      return false;
    }
    console.log('Post image does not exist.');
    return false;
  }

  checkPostContent() {
    if (this.postContent) {
      if (this.postContent.value && this.postContent.value !== 0) {
        return true;
      }
      console.log('Post content exists but not image.');
      return false;
    }
    console.log('Post content does not exist.');
    return false;
  }

  postItem() {
    this.db.add({
      successHandler: this.postSuccessHandler.bind(this),
      errorHandler: (err) => { console.log(err); },
      data: this.getPostInfo(),
      collection: 'posts',
    });
  }

  checkPostUserIsAuthorized() {
    return !!this.firebase.auth().currentUser;
  }

  postSuccessHandler(data) {
    this.storage.upload({
      file: this.postImageInput.files[0],
      path: `/postImages/${data.id}`,
      data,
      successHandler: () => { console.log('workign'); },
      errorHandler: (err) => { console.log(err); },
    });

    this.db.edit({
      collection: 'posts',
      docId: data.id,
      successHandler: () => { console.log('Image Successfully handaled.'); },
      errorHandler: () => { console.log('Image did not upload.'); },
      data: { imageURL: data.id },
    });
  }

  showImgPreview() {
    const reader = new FileReader();
    reader.onload = (e) => { this.postImagePreview.src = e.target.result; };
    reader.readAsDataURL(this.postImageInput.files[0]);
    this.postImagePreview.style.display = '';
  }

  pinLocation() {
    this.showMapPreview();
  }

  showMapPreview() {
    const { mapVisability } = this.state;
    console.log(mapVisability);
    this.setState({
      mapVisability: mapVisability === 'none' ? '' : 'none',
    });
  }

  updatePostAfterImageUpload(data) {
    // set the post : postImg to the correct thing corresponding imgUrl
    this.db.edit({
      collection: 'posts',
      docId: this.lastPostId,
      successHandler: () => { console.log('Image Successfully handaled.'); },
      errorHandler: () => { console.log('Image did not upload.'); },
      data: { imageURL: data },
    });
  }

  render() {
    return (
      <Container>
        <h4 className="text-center">Post New Item</h4>
        <div className="post-widget">
          <img alt="preview" id="postImagePreview" />
          <InputGroup>
            <textarea id="postContent" placeholder="Share" />
            <Row className="full-width text-center">
              <Col xs="6" sm="6">
                <div className="upload-btn-wrapper">
                  <button type="button" className="btn post-widget-button">Add Photo</button>
                  <input id="postImageInput" type="file" name="myfile" onChange={this.showImgPreview.bind(this)} />
                </div>
              </Col>
              <Col xs="6" sm="6">
                <button type="button" className="btn post-widget-button" onClick={this.pinLocation.bind(this)}>Pin Location</button>
              </Col>
            </Row>
          </InputGroup>
          <MapComponent isHidden={this.state.mapVisability} />
          <Button id="postButton" className="btn post-widget-button" onClick={this.postItem.bind(this)}>Post</Button>
        </div>
      </Container>
    );
  }
}
