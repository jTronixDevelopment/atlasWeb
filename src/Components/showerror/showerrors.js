import React from 'React';
import { Alert } from 'reactstrap';

export default () => {
  this.props.msgs.map(msg => <Alert color="danger">{msg}</Alert>);
};
