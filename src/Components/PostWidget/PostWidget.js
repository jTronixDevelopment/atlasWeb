import React, { Component } from 'react';

import { InputGroup, Button, Row, Col } from 'reactstrap';

import Thumbnail from './../Thumbnail/Thumbnail';

import Storage from './../../Classes/Firebase/CloudStorage/CloudStorage'
import DB from './../../Classes/Firebase/Database/Database'

import './PostWidget.css'

export default class PostWidget extends Component{

  constructor(props){
    super(props);
    this.firebase = this.props.firebase
    this.db = new DB(this.firebase)
    this.storage = new Storage(this.firebase)
    this.state = {
      postWidgetIsHidden : 'none'
    }
  }

  postItem(){
    this.db.add({
      successHandler: this.postSuccessHandler.bind(this),
      errorHandler : this.postErrorHandler.bind(this),
      data : this.getPostInfo(),
      collection : 'posts',
      firebase : this.firebase,
      docId : 'testin'
    })
  }

  postSuccessHandler(data){
    console.log('Data', data.id)
    this.storage.upload({
      file: document.getElementById('postWidgetProfilePhotoInput').files[0],
      path: 'postImages/' +  data.id,
      data: data,
      firebase : this.props.firebase,
      successHandler : this.updatePostAfterImageUpload.bind(this),
      errorHandler: this.postErrorHandler.bind(this)
    })
  }

  updatePostAfterImageUpload(data){
    // set the post : postImg to the correct thing corresponding imgUrl
    console.log(data)
    this.db.edit({
      collection: 'posts',
      doc: data.id,
      successHandler:()=>{console.log("Good")},
      errorHandler: ()=>{console.log("Bad");},
      data : {
        imageURL: data.id
      }
    })
  }

  postErrorHandler(err){
    console.log(err)
  }

  //=== Checking for valid Inputs ==============================================

  checkPostImage(){
    if(this.postImageInput){
      if(this.postImageInput.files[0]){
        return true;
      } else {
        console.log("Post image exists but not image.")
        return false;
      }
    } else{
      console.log("Post image does not exist.")
      return false;
    }
  }

  checkPostContent(){
    if(this.postContent){
      if(this.postContent.value && this.postContent.value !== 0){
        return true;
      } else {
        console.log("Post content exists but not image.")
        return false;
      }
    } else{
      console.log("Post content does not exist.")
      return false;
    }
  }

  checkPostUserIsAuthorized(){
    return this.firebase.auth().currentUser?true:false;
  }

  checkPostItems(){
    console.log('testing')
  }

  getPostInfo(){
    return {
      ownerId : this.firebase.auth().currentUser.uid,
      data : new Date(),
      content : document.getElementById('postContent').value,
      imageURL : "none",
      location : { test : 'test'},
    }
  }

  showImgPreview(){
    var input = document.getElementById('postWidgetProfilePhotoInput');
    var profilePicturePreview = document.getElementById('postWidgetProfilePicturePreview');
    var reader = new FileReader();
    reader.onload = function (e) {
      profilePicturePreview.src = e.target.result
    }
    reader.readAsDataURL(input.files[0]);
  }

  //=== Component Lifecycle ====================================================

  componentDidMount(){
    this.postContent = document.getElementById('postContent')
    this.postImageInput = document.getElementById('postPhoto')
  }

  render(){
    return(
      <div className='post-widget-container'>
        <div className='post-widget'>
          <img alt='preview' id='postWidgetProfilePicturePreview'/>
          <InputGroup>
            <textarea id='postContent' placeholder='Share'/>
            <Row className='post-widget-options full-width'>
              <Col xs='6' sm='6'>
                <div className="upload-btn-wrapper">
                  <button className="btn">Add Photo</button>
                  <input id='postWidgetProfilePhotoInput' type="file" name="myfile" onChange={this.showImgPreview.bind(this)}/>
                </div>
              </Col>
              <Col xs='6' sm='6'>
                  <button className="btn">Pin Location</button>
              </Col>
            </Row>
            <Button  onClick={ this.postItem.bind(this) }>Post</Button>
          </InputGroup>
        </div>
      </div>
    )
  }
}
