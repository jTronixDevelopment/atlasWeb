import React, { Component } from 'react';

import {
  InputGroup, Button, Row, Col,
} from 'reactstrap';

import Storage from '../../Classes/Firebase/CloudStorage/CloudStorage';
import DB from '../../Classes/Firebase/Database/Database';

import './PostWidget.css';

export default class PostWidget extends Component {
  constructor(props) {
    super(props);
    const {
      firebase,
    } = this.props;
    this.firebase = firebase;
    this.db = new DB(this.firebase);
    this.storage = new Storage(this.firebase);
  }

  //= == Checking for valid Inputs ==============================================

  componentDidMount() {
    this.postContent = document.getElementById('postContent');
    this.postImageInput = document.getElementById('postPhoto');
  }

  getPostInfo() {
    return {
      ownerId: this.firebase.auth().currentUser.uid,
      data: new Date(),
      content: document.getElementById('postContent').value,
      imageURL: 'none',
      location: { test: 'test' },
    };
  }

  checkPostUserIsAuthorized() {
    return !!this.firebase.auth().currentUser;
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

  updatePostAfterImageUpload(data) {
    // set the post : postImg to the correct thing corresponding imgUrl
    console.log(data);
    this.db.edit({
      collection: 'posts',
      doc: data.id,
      successHandler: () => { console.log('Good'); },
      errorHandler: () => { console.log('Bad'); },
      data: {
        imageURL: data.id,
      },
    });
  }

  postItem() {
    this.db.add({
      successHandler: this.postSuccessHandler.bind(this),
      errorHandler: this.postErrorHandler.bind(this),
      data: this.getPostInfo(),
      collection: 'posts',
      firebase: this.firebase,
      docId: 'testin',
    });
  }

  postSuccessHandler(data) {
    console.log('Post made!');
    this.storage.upload({
      file: document.getElementById('postWidgetProfilePhotoInput').files[0],
      path: `postImages/${data.id}`,
      data,
      successHandler: this.updatePostAfterImageUpload.bind(this),
      errorHandler: this.postErrorHandler.bind(this),
    });
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

  showImgPreview() {
    const input = document.getElementById('postWidgetProfilePhotoInput');
    const profilePicturePreview = document.getElementById('postWidgetProfilePicturePreview');
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicturePreview.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }

  render() {
    return (
      <div className="post-widget-container">
        <div className="post-widget">
          <img alt="preview" id="postWidgetProfilePicturePreview" />
          <InputGroup>
            <textarea id="postContent" placeholder="Share" />
            <Row className="post-widget-options full-width">
              <Col xs="6" sm="6">
                <div className="upload-btn-wrapper">
                  <button type="button" className="btn">Add Photo</button>
                  <input id="postWidgetProfilePhotoInput" type="file" name="myfile" onChange={this.showImgPreview.bind(this)} />
                </div>
              </Col>
              <Col xs="6" sm="6">
                <button type="button" className="btn">Pin Location</button>
              </Col>
            </Row>
            <Button onClick={this.postItem.bind(this)}>Post</Button>
          </InputGroup>
        </div>
      </div>
    );
  }
}
