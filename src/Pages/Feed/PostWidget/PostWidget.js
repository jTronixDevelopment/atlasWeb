import React, { Component } from 'react';

import {  InputGroup, Button, Row, Col } from 'reactstrap';

import Thumbnail from './../../../Components/Thumbnail/Thumbnail';
import Storage from './../../../Classes/Firebase/CloudStorage/CloudStorage'
import DB from './../../../Classes/Firebase/Database/Database'

import './PostWidget.css'

export default class PostWidget extends Component{

  constructor(props){
    super(props);
    this.firebase = this.props.firebase;
    this.db = new DB();
    this.storage = new Storage();
    this.state = {
      postWidgetIsHidden : 'none'
    }
  }

  togglePostWidget(){
    if(this.state.postWidgetIsHidden==="none"){
      this.setState({ postWidgetIsHidden: 'block' })
    } else {
      this.setState({ postWidgetIsHidden: 'none' })
    }
  }

  postItem(){
    console.log(this.getPostInfo())
    this.db.add({
      successHandler: this.successHandler.bind(this),
      errorHandler : this.errorHandler.bind(this),
      data : this.getPostInfo(),
      collection : 'posts',
      firebase : this.firebase,
      docId : 'testin'
    })
  }

  successHandler(){
    console.log('good')
  }

  errorHandler(err){
    console.log(err)
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

  render(){
    return(
      <div className='post-widget-container' >
        <Button className='btn btn-success post-widget-button' onClick={ this.togglePostWidget.bind(this) } block>Post</Button>
        <div style={{ display : this.state.postWidgetIsHidden }} className='post-widget' >
          <Thumbnail src = "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=0&oh=d130135c52915fd36bd4d7db5dbed825&oe=5B685759" title="test"/>
          <InputGroup>
            <textarea id='postContent' placeholder='Share' />
            <Row className='post-widget-options full-width'>
              <Col xs='6' sm='6' >
                <div className="upload-btn-wrapper">
                  <button className="btn">Add Photo</button>
                  <input id='postPhoto' type="file" name="myfile" />
                  </div>
              </Col>
              <Col xs='6' sm='6' >
                <div className="upload-btn-wrapper">
                  <button className="btn">Pin Location</button>
                  <input id='postLocation' type="file" name="myfile" />
                </div>
              </Col>
            </Row>
            <Button className='post-widget-button' onClick={ this.postItem.bind(this) } block>Post</Button>
          </InputGroup>
        </div>
      </div>

    )
  }
}
