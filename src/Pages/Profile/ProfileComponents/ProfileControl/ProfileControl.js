import React, { Component } from 'react';

import { Jumbotron , Modal, ModalBody, ModalFooter,
  ModalHeader, InputGroup, Button, Row, Col } from 'reactstrap';

import { SettingsIcon, PostIcon } from './../../../../imgs/icons';

//=== Component ================================================================
import ModalComponent from '../../../../Components/Modal/Modal';
import PostWidget from '../../../../Components/PostWidget/PostWidget';
import EditProfile from './../EditProfile/EditProfile';

//=== Styling ==================================================================
import './ProfileControl.css';

export default class ProfileControl extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.profileData)
    this.state = {
      modalShown : false,
      modalBody : <PostWidget firebase={this.props.firebase}/>
    };
  }

  toggleModal(){
    this.setState({ modalShown: !this.state.modalShown })
  }

  showPostComponent(){
    this.setState({
      modalShown : true,
      modalBody : <PostWidget firebase={this.props.firebase} profileData={this.props.profileData}/>
    })
  }

  postNewItem(){
    
  }

  showEditComponent(){
    this.setState({
      modalShown : true,
      modalBody : <EditProfile firebase={this.props.firebase} profileData={this.props.profileData}/>
      modalAction : this.editUserInfo.bind(this)
    })
  }

  editUserInfo(){

  }

  //=== Component Lifecycle ====================================================

  render(){
    return (
      <div>
        <ModalComponent modalShown ={ this.state.modalShown } modalAction = { ()=>{}} ModalBody={ this.state.modalBody } reset={this.toggleModal.bind(this)}/>
        <ul className="flex-container profile-control-container" >
          <li className="flex-item profile-control-item" onClick={this.showPostComponent.bind(this)}>
            <p className='clear-style'>Post New</p>
            <img alt='postItem' src={ PostIcon } className='profile-control-icon'/>
          </li>
          <li className="flex-item profile-control-item" onClick={this.showEditComponent.bind(this)}>
            <p className='clear-style'>Edit Profile</p>
            <img alt='edit' src={ SettingsIcon } className='profile-control-icon'/>
          </li>
        </ul>
      </div>
    )
  }
}
