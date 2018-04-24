import React, { Component } from 'react'

import './Modal.css';

import { Modal, ModalBody, ModalHeader } from 'reactstrap'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { modal: this.props.modalShown };
    this.reset = this.props.reset.bind(this);
    this.modalBody = this.props.modalBody;
    console.log(this.props.modalTitle)
  }
  render() {
    return (
      <Modal isOpen={this.props.modalShown} toggle={this.reset} className={this.props.className}>
        <ModalHeader toggle={this.reset}>{(this.props.modalTitle)?this.props.modalTitle:(<div>Poo</div>)}</ModalHeader>
        <ModalBody>
          { this.props.modalBody }
        </ModalBody>
      </Modal>
    );
  }
}
