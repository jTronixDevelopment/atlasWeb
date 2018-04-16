import React, { Component } from 'react'

import { Jumbotron , Modal, ModalBody, ModalFooter, Button,
   ModalHeader , InputGroup
 } from 'reactstrap';

import { SettingsIcon } from './../../../../imgs/icons';

import './userinfo.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
            <div className='upload-btn-wrapper full-width'>
              <Button block>Upload Photo</Button>
              <input id="profilePic" type='file'/>
            </div>
            <InputGroup className='text-center'>
              <label>Bio</label>
              <textarea id='profile-bio' name='profileBio' />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.savePhoto.bind(this)}>Save</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Jumbotron fluid className='profile-jumbotron text-center'>
          <img alt='settingIcon' className='icon profile-settings-icon' onClick={this.toggle} src= { SettingsIcon } />
          <img alt='profileIcon' className='icon' src= { this.props.profileData.profilePic } />
          <div className='profile-bio'>
            <b>Bio</b>
            <p>{ `${this.props.profileData.firstName} ${this.props.profileData.lastName}` }</p>
            <b>About me</b>
            <p>{ this.props.profileData.bio }</p>
            <b>Hometown</b>
            <p>{ this.props.profileData.homeTown }</p>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
