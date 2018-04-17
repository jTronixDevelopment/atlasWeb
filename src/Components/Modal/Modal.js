import React, { Component } from 'react'

import './Modal.css';

import { Jumbotron , Modal, ModalBody, ModalFooter, Button,
   ModalHeader , InputGroup } from 'reactstrap'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { modal: this.props.modalShown };
    this.reset = this.props.reset.bind(this);
    this.action = this.props.modalAction.bind(this);
    this.ModalBody = this.props.ModalBody
  }
  render() {
    return (
      <Modal isOpen={this.props.modalShown} toggle={this.reset} className={this.props.className}>
        <ModalBody>
          { this.props.ModalBody }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.action}>Save</Button>
          <Button color="secondary" onClick={this.reset}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
