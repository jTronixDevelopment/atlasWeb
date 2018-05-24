import React, { Component } from 'react';

import { InputGroup, Button, Row, Col, Container } from 'reactstrap';

import MapComponent from './../../Components/Maps/Map/Map';

import Storage from './../../Classes/Firebase/CloudStorage/CloudStorage'
import DB from './../../Classes/Firebase/Database/Database'

//=== Style ====================================================================
import './Post.css'

export default class Post extends Component{

  constructor(props){
    super(props)
    this.firebase = this.props.firebase
    this.db = new DB(this.firebase)
    this.storage = new Storage(this.firebase)
    this.state = {
      postWidgetIsHidden : 'none',
      mapVisability : 'none'
    }
  }

  postItem(){
    this.db.add({
      successHandler: this.postSuccessHandler.bind(this),
      errorHandler : this.postErrorHandler.bind(this),
      data : this.getPostInfo(),
      collection : 'posts'
    })
  }

  postSuccessHandler(data){
    this.storage.upload({
      file: this.postImageInput.files[0],
      path: '/postImages/' + data.id,
      data: data,
      successHandler : ()=>{console.log("workign")},
      errorHandler: this.postErrorHandler.bind(this)
    })

    this.db.edit({
      collection: 'posts',
      docId: data.id,
      successHandler:()=>{console.log("Image Successfully handaled.")},
      errorHandler: ()=>{console.log("Image did not upload.")},
      data : { imageURL:  data.id }
    })
  }

  updatePostAfterImageUpload(data){
    // set the post : postImg to the correct thing corresponding imgUrl
    this.db.edit({
      collection: 'posts',
      docId: this.lastPostId,
      successHandler:()=>{console.log("Image Successfully handaled.")},
      errorHandler: this.postErrorHandler.bind(this),
      data : { imageURL:  data }
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
  }

  getPostInfo(){
    return {
      ownerId : this.firebase.auth().currentUser.uid,
      data : new Date(),
      content : this.postContent.value,
      imageURL : "none",
      location : { test : 'test'},
      comments : [],
      likes : 0
    }
  }

  showImgPreview(){
    var reader = new FileReader();
    reader.onload = (e)=>{ this.postImagePreview.src = e.target.result };
    reader.readAsDataURL(this.postImageInput.files[0]);
    this.postImagePreview.style.display = '';
  }

  pinLocation(){
    this.showMapPreview()
  }

  showMapPreview(){
    this.setState({ mapVisability: this.state.mapVisability==='none'?'':'none' })
  }

  //=== Component Lifecycle ====================================================

  componentDidMount(){
    this.postContent = document.getElementById('postContent');
    this.postImageInput = document.getElementById('postImageInput');
    this.postImagePreview = document.getElementById('postImagePreview');
    this.mapPreview = document.getElementById('mapContainer')
    this.postImagePreview.style.display = 'none';
    this.mapPreview.style.display = 'none';
  }

  render(){
    return(
      <Container>
        <h4 className='text-center'>Post New Item</h4>
        <div className='post-widget'>
          <img alt='preview' id='postImagePreview'/>
          <InputGroup>
            <textarea id='postContent'  placeholder='Share'/>
            <Row className='full-width text-center'>
              <Col xs='6' sm='6'>
                <div className="upload-btn-wrapper">
                  <button className="btn post-widget-button">Add Photo</button>
                  <input id='postImageInput' type="file" name="myfile" onChange={this.showImgPreview.bind(this)}/>
                </div>
              </Col>
              <Col xs='6' sm='6'>
                <button className="btn post-widget-button" onClick={ this.pinLocation.bind(this) }>Pin Location</button>
              </Col>
            </Row>
          </InputGroup>
          <MapComponent isHidden={this.state.mapVisability} />
          <Button id='postButton' className='btn post-widget-button' onClick={ this.postItem.bind(this) }>Post</Button>
        </div>
      </Container>
    )
  }

}
