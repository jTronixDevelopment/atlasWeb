import React, { Component } from 'React'
import { Alert } from 'reactstrap';
export default class ErrorList extends Component {
  constructor(){
    
  }
  reder(){
    return (
      this.props.msgs.map((msg)=><Alert color='danger'>{msg}</Alert>)
    )
  }
}
