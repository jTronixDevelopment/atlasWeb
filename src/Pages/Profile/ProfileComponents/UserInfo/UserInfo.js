import React, { Component } from 'react'

import { Jumbotron , Container, Modal, ModalBody, ModalFooter, Button,
   ModalHeader , InputGroup, Input,
 } from 'reactstrap';

import { SettingsIcon } from './../../../../imgs/icons';

import './userinfo.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
            <div className='upload-btn-wrapper full-width'>
              <Button block>Upload Photo</Button>
              <input type='file'/>
            </div>
            <InputGroup className='text-center'>
              <label for='profileBio' >Bio</label>
              <textarea name='profileBio' />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Jumbotron fluid className='profile-jumbotron'>
          <Container className='profile-jumbotron' fluid>
            <img className='icon profile-settings-icon' onClick={this.toggle} src= { SettingsIcon } />
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
