import React, { Component } from 'react';

import './Modal.css';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    const {
      reset,
    } = this.props;
    this.reset = reset.bind(this);
  }

  render() {
    const {
      modalShown,
      className,
      modalTitle,
      modalBody,
    } = this.props;
    return (
      <Modal isOpen={modalShown} toggle={this.reset} className={className}>
        <ModalHeader toggle={this.reset}>{modalTitle || (<div>Poo</div>)}</ModalHeader>
        <ModalBody>
          { modalBody }
        </ModalBody>
      </Modal>
    );
  }
}
